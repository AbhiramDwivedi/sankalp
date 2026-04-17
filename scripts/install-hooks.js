#!/usr/bin/env node
// Installs versioned hooks from .githooks/ into .git/hooks/.
// Runs automatically via npm's `prepare` lifecycle after `npm install`.

import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const hooksSrc = join(repoRoot, '.githooks');
const hooksDst = join(repoRoot, '.git', 'hooks');

// Skip if not in a git repo (e.g. when installed as a dependency elsewhere).
if (!existsSync(join(repoRoot, '.git'))) {
  process.exit(0);
}

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
  console.log(`installed hook: ${hook}`);
}
