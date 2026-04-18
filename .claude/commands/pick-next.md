---
description: Print the next unchecked backlog item that's unblocked
---

You are executing the `/pick-next` workflow. Goal: read `docs/BACKLOG.md`, find the top unchecked item whose prerequisites are all complete, and print its id, title, and full brief. This is PURELY INFORMATIONAL — do not start any work, do not create branches, do not modify any files.

## Step 1 — Read the backlog

Use the Read tool on `docs/BACKLOG.md` (absolute path from the repo root). Read the whole file — it's short enough to fit.

## Step 2 — Parse items

Each backlog item uses this format:

```
### [ ] X.Y — Title (depends on: A.B, C.D)
**Brief**: ...
**Done when**: ...
**Do not touch**: ...
```

- `[ ]` means unchecked (not yet done).
- `[x]` means complete.
- Heading level is `###`. Item id is the token like `0.5`, `1.1`, `2.3`.
- The `(depends on: ...)` clause lists prerequisite item ids. An item with no `(depends on: ...)` clause has no prereqs.
- Some items say `(no dependency)` — treat those as having no prereqs.

Parse all `###` lines in the Tier sections (skip Protocol, Invariants, Standing authorizations, Nice-to-haves).

## Step 3 — Filter

An item is READY if:

1. Its checkbox is `[ ]` (unchecked).
2. Every item id in its `depends on:` clause has checkbox `[x]` in the same file.
3. It's in a Tier that is unblocked — Tier 0 items can always run; Tier 1+ items require all of Tier 0 to be checked. Check the "requires: Tier 0 complete" note on each tier heading.

Preserve file order when filtering — tiers are ordered (0 → 1 → 2 → …) and items within a tier are ordered by priority.

## Step 4 — Pick the top

Take the FIRST ready item in file order. This is the next recommended item.

If no items are ready (everything checked, or everything still blocked):

- If all unchecked items are blocked: print "All unchecked items have unmet prereqs — waiting on: {list the blocking item ids}".
- If no unchecked items remain: print "Backlog is complete — no unchecked items found".

## Step 5 — Print

Output format (terse, no filler prose):

```
Next: {id} — {title}

Depends on: {list, or "none"}
Status of deps: {e.g. "0.1 ✓, 0.2 ✓, 0.3 ✓" — show whether each is done}

Brief: {full Brief text, verbatim from file}
Done when: {full Done-when text, verbatim}
Do not touch: {full Do-not-touch text, verbatim}
```

If there are other ready items behind the top pick, list them in a one-line "Also ready: {id1}, {id2}, ..." footer. Users find this useful when they want to parallelize manually.

## Guardrails

- This command is READ-ONLY. Do not edit `docs/BACKLOG.md`. Do not stage, commit, or push. Do not create branches or worktrees. Do not launch subagents.
- Do not invoke the autonomous-fire protocol — that's a separate workflow (cron-driven). `/pick-next` just tells the human "here's what's next if you want to work on it".
- If the user asks a follow-up like "now implement it", treat that as a new task — don't chain from `/pick-next` automatically.
