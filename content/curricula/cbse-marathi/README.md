# cbse-marathi (NOT AUTHORED)

**This folder is a seam proof-of-concept. Do not reference it from production code.**

Its only job is to demonstrate that the multi-curriculum architecture built in backlog items 3.1–3.3 actually admits a second curriculum with zero structural changes to the app — the sibling folder compiles under `tsc --noEmit` and coexists peacefully with `../fcps-stamp-hindi/`.

## What's here

- `rubric.ts` — empty shells matching every export of `../fcps-stamp-hindi/rubric.ts`
- `connectors.ts` — empty shells matching every export of `../fcps-stamp-hindi/connectors.ts`

Both files are type-correct but contain no authored content. No pack, capstone, study plan, flashcard deck, component, or script imports from this folder, and `content/curriculum.ts` continues to point at `fcps-stamp-hindi`.

## To make this curriculum real

1. Port the structure from `../fcps-stamp-hindi/rubric.ts` and author Marathi/CBSE-specific rubric descriptors (benchmark labels, credit mapping, exam facts).
2. Port the structure from `../fcps-stamp-hindi/connectors.ts` and author a Marathi connector bank (आधी, नंतर, कारण, पण, म्हणून, ...).
3. Add `diagrams.tsx` if the grammar diagrams from the Hindi curriculum need Marathi-specific adaptation.
4. Build 26 Marathi topic packs, 10 capstones, 5 study plans — or whatever subset applies to the CBSE exam being targeted.
5. Update `content/curriculum.ts` to point at `cbse-marathi` (or introduce a curriculum picker if both curricula should coexist at runtime).
6. Wire the new curriculum into any script or component that currently hard-codes `fcps-stamp-hindi` path references.

Until steps 1–6 are complete, **do not import from this folder anywhere in production code**. The empty shells will not crash `tsc`, but any runtime consumer will see empty arrays / empty records and fail silently.
