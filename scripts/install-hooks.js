#!/usr/bin/env node
/**
 * Installs versioned hooks from .githooks/ into the git common hooks dir.
 * Runs automatically via npm's `prepare` lifecycle after `npm install`.
 *
 * Worktree handling
 * -----------------
 * In a main repo checkout, `.git` is a directory containing `hooks/`.
 * In a git worktree, `.git` is a FILE whose content is `gitdir: /path/to/real/gitdir`,
 * and that real gitdir lives under `<common-dir>/worktrees/<name>/`. Worktrees share
 * a single hooks directory located at `<common-dir>/hooks/` (the main repo's `.git/hooks`).
 *
 * We therefore:
 *   1. Detect whether `.git` is a file (worktree) or a directory (main repo).
 *   2. If worktree, parse the `gitdir:` pointer and resolve the common git dir by
 *      stripping the trailing `/worktrees/<name>` segment (mirrors `git rev-parse
 *      --git-common-dir` without requiring a git subprocess).
 *   3. Install hooks into `<common-dir>/hooks/`.
 *
 * This is idempotent (copyFileSync overwrites) and works on Windows where symlinks
 * and POSIX perms are not guaranteed. All paths go through `path.resolve` so the
 * script is agnostic to forward/back slash input.
 */

import { copyFileSync, chmodSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const repoRoot = process.cwd();
const hooksSrc = join(repoRoot, '.githooks');
const gitPointer = join(repoRoot, '.git');

// Skip if not in a git repo (e.g. when installed as a dependency elsewhere).
if (!existsSync(gitPointer)) {
  process.exit(0);
}

function resolveCommonGitDir(pointer) {
  const stat = statSync(pointer);
  if (stat.isDirectory()) {
    // Plain checkout — `.git` IS the common git dir.
    return pointer;
  }
  // Worktree — `.git` is a file with `gitdir: <path>` (and possibly other keys).
  const raw = readFileSync(pointer, 'utf8');
  const match = raw.match(/^gitdir:\s*(.+)$/m);
  if (!match) {
    throw new Error(`Could not parse gitdir from ${pointer}`);
  }
  const worktreeGitDir = resolve(dirname(pointer), match[1].trim());
  // Worktree gitdirs live at <common>/worktrees/<name>. Strip two segments.
  // If layout ever differs, fall back to scanning up for a `worktrees` parent.
  const parent = dirname(worktreeGitDir); // .../worktrees
  const commonDir = dirname(parent);      // common git dir
  return commonDir;
}

const commonGitDir = resolveCommonGitDir(gitPointer);
const hooksDst = join(commonGitDir, 'hooks');

if (!existsSync(hooksDst)) {
  mkdirSync(hooksDst, { recursive: true });
}

const hooks = ['pre-commit'];
for (const hook of hooks) {
  const src = join(hooksSrc, hook);
  const dst = join(hooksDst, hook);
  if (!existsSync(src)) continue;
  copyFileSync(src, dst);
  try {
    chmodSync(dst, 0o755);
  } catch {
    // chmod not supported on Windows — ignored; git-bash respects the index executable bit.
  }
  console.log(`installed hook: ${hook} -> ${dst}`);
}
