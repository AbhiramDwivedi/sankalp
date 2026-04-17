---
description: Stage, run npm run check, commit + push current branch
---

You are executing the `/ship` workflow. Goal: stage current changes, run the gate, and commit + push on the CURRENT branch. Be terse — the user wants operational results, not prose.

## Step 1 — Read the current branch

Run:

```
git branch --show-current
```

Capture the branch name. Branch behavior varies:

- **`main`** → housekeeping only (backlog checkbox updates, AGENT_LOG entries, doc fixes). Commits go to `origin/main` directly.
- **`auto/*`** → feature work in progress for a backlog item. Commit stays on the branch; push goes to the branch (NEVER to `main`).
- **any other branch** → treat like `auto/*` (branch commit + push, no main commit).

## Step 2 — Stage

Run `git status --short` to see unstaged/untracked files. Stage only intended changes:

- Prefer named paths: `git add path/to/file1 path/to/file2`.
- Avoid `git add -A` / `git add .` unless the diff is small and obviously all-intended; it risks including `.env`, credential files, or large binaries.
- Do NOT stage `.claude/settings.json` or `.claude/settings.local.json` unless the user explicitly asked.
- Do NOT stage generated flashcards by hand — only regenerate via `scripts/build-flashcards.ts` and commit the regenerated output.

If there's nothing to stage, report "nothing to commit" and stop — don't create empty commits.

## Step 3 — Run the gate

Run:

```
npm run check
```

This is mandatory. If it exits non-zero:

- Report the failing stage (tsc, validate-packs, build-flashcards, credit-audit, smoke, visual).
- Do NOT commit.
- Abort the command with a clear "gate red, aborted" message and show the failing output.

If the pre-commit hook is installed (from item 0.7), `git commit` will run `npm run check` again — that's redundant but fine.

## Step 4 — Infer a commit message

Inspect the diff (`git diff --cached --stat` and `git diff --cached` for small changes) and infer a short, meaningful conventional-commit message. Never use a placeholder like "update" or "wip".

- Prefix by change type: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`, `style:`.
- On `auto/{item-id}` branches, include the item id: `feat(1.1): next-nav card in pack overlay`.
- On `main`, no item id prefix needed unless the change relates to a shipped item: `docs: update AGENT_LOG for fire #3`.
- Keep the subject line under 72 chars. Body only if genuinely needed.

Examples of inferred messages:

- Files changed: `components/DashboardView.tsx` on `auto/1.1-next-nav` → `feat(1.1): add next-nav card to dashboard`
- Files changed: `docs/BACKLOG.md`, `docs/AGENT_LOG.md` on `main` → `docs: tick 0.5 and log fire #4`
- Files changed: `content/flashcards/generated.ts` + a pack file on `auto/...` → `feat(X.Y): update pack <name> and regen flashcards`

## Step 5 — Commit

Use a HEREDOC to preserve formatting:

```
git commit -m "$(cat <<'EOF'
<inferred message>
EOF
)"
```

Do NOT pass `--no-verify`. Do NOT amend. If the commit fails because of the pre-commit hook, that means the gate went red between steps 3 and 5 — investigate and fix, don't bypass.

## Step 6 — Push

Branch-dependent:

- **On `main`**:
  - `git pull --rebase origin main` to pick up any remote changes.
  - `git push origin main`.
- **On `auto/*` or any other non-main branch**:
  - `git fetch origin`.
  - `git rebase origin/main` if possible. If conflicts are trivial (lockfile, imports), resolve and continue; otherwise abort the rebase and report as a blocker — the human reviewer will handle it.
  - `git push -u origin <branch-name>` (use `--force-with-lease` only if a rebase moved commits and the branch was previously pushed).
  - Do NOT push to `main`. Do NOT merge PRs. Do NOT use `gh pr merge`.

## Step 7 — Report

Print a terse summary:

- Branch name
- Commit SHA
- Commit message (first line)
- Files committed (count + names if <10)
- Gate result (should be green since we only commit on green)
- Push target (`origin/main` or `origin/<branch>`)

Stop there. Do not open PRs, do not merge, do not continue with other tasks unless the user asks.
