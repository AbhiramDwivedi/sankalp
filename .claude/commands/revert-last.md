---
description: Soft-reset HEAD~1 (preserve working tree)
---

You are executing the `/revert-last` workflow. Goal: soft-reset the most recent commit on the CURRENT branch, preserving the working tree so the user can re-stage and re-commit. Print clearly what was undone.

## Step 1 — Read current branch and HEAD

Run in parallel:

- `git branch --show-current`
- `git log -1 --format=%H%n%s%n%an%n%ad` — the commit about to be undone (sha, subject, author, date).
- `git log -1 --stat --format=` — the files changed in that commit.

If HEAD has no parent (initial commit), abort: "Cannot revert — this is the initial commit."

## Step 2 — Check if the commit was pushed

Determine whether the commit exists on the remote. Run:

```
git fetch origin
```

Then check if the commit is reachable from the remote tracking branch for the current branch. Two approaches:

- If on `main`: `git log origin/main..HEAD` — if the target commit appears, it's LOCAL ONLY (safe to soft-reset cleanly). If it does NOT appear, it's ALREADY PUSHED.
- If on `auto/*` or any other branch: `git log origin/<branch>..HEAD` if that remote branch exists. If the remote branch doesn't exist, the commit is local only.

Record whether the commit is local-only or already-pushed. Both are still revertible locally, but the warning message differs.

## Step 3 — Soft reset

Run:

```
git reset --soft HEAD~1
```

This moves HEAD back one commit but leaves the index and working tree as they were — so the files from the reverted commit are now staged again, ready to be re-committed or unstaged by the user.

## Step 4 — Report

Print a terse summary. Include:

1. **Commit undone**: `{sha}` — `{subject}` by `{author}` on `{date}`.
2. **Files that were in it**: list them (from the earlier `git log -1 --stat`).
3. **Current state**: "Changes are now staged. Use `git status` to review, `git reset HEAD <file>` to unstage, or re-commit after edits."
4. **Push status**:
   - If local-only: "Commit was local-only — soft reset is complete, no remote action needed."
   - If already pushed: "WARNING — this commit was already pushed to `origin/{branch}`. A soft reset locally does NOT undo the remote. Options:
     - If the branch is a feature branch (`auto/*` or similar) and no one else is using it, you can `git push --force-with-lease origin {branch}` after re-committing or discarding.
     - If the branch is `main` or shared, you should NOT force-push. Instead, create a forward revert: `git reset --hard HEAD@{1}` to restore the original commit, then `git revert <sha>` to create a new commit that inverses it, then push normally.
     - Ask the user which path they want before force-pushing anything."

## Guardrails

- Use `--soft`, never `--hard`. Hard reset discards the working tree, which destroys work.
- Never automatically force-push. Always ask the user before `push --force-with-lease`, and NEVER force-push to `main` or a shared branch without explicit confirmation.
- Do not run `git revert` automatically — only suggest it in the warning text. The user decides.
- Do not chain into `/ship` or any other command after reverting. Stop after the report.
