This folder holds per-curriculum data. Each subfolder is one curriculum (e.g. `fcps-stamp-hindi/`). A curriculum folder contains:

- `rubric.ts` — benchmark/credit/axis definitions for this curriculum's exam
- `connectors.ts` — language-specific connective words
- `diagrams.tsx` — grammar diagrams specific to this curriculum's language

The `content/curriculum.ts` constant at the parent level picks which curriculum is active. Adding a second curriculum: create `content/curricula/{new-curriculum-id}/` with analogous files.
