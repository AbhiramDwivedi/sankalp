// Pre-flight gate script.
// Runs type check, pack validation, flashcard build (+ sync check), and credit
// audit in order. Any failure exits non-zero with the underlying output visible.
// Run: `npm run check` (or `npx tsx scripts/check.ts`).

import { spawnSync, type SpawnSyncOptions } from 'node:child_process';

interface Stage {
  name: string;
  command: string;
  args: string[];
  // Optional extra step that runs after the command succeeds. Returns an error
  // message string on failure, or null on success.
  postCheck?: () => string | null;
}

function runStage(stage: Stage): void {
  process.stdout.write(`==> ${stage.name}\n`);
  const opts: SpawnSyncOptions = {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  };
  const result = spawnSync(stage.command, stage.args, opts);

  if (result.error) {
    process.stdout.write(`FAILED at ${stage.name}\n`);
    process.stdout.write(`${result.error.message}\n`);
    process.exit(1);
  }
  if (typeof result.status !== 'number' || result.status !== 0) {
    process.stdout.write(`FAILED at ${stage.name}\n`);
    process.exit(1);
  }

  if (stage.postCheck) {
    const err = stage.postCheck();
    if (err) {
      process.stdout.write(`FAILED at ${stage.name}\n`);
      process.stdout.write(`${err}\n`);
      process.exit(1);
    }
  }

  process.stdout.write(`ok: ${stage.name}\n`);
}

function flashcardsSyncCheck(): string | null {
  const result = spawnSync(
    'git',
    ['diff', '--exit-code', 'content/flashcards/generated.ts'],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );
  if (result.status !== 0) {
    return 'Flashcards out of sync — run `npx tsx scripts/build-flashcards.ts` and commit content/flashcards/generated.ts';
  }
  return null;
}

const stages: Stage[] = [
  { name: 'type check', command: 'npx', args: ['tsc', '--noEmit'] },
  { name: 'validate packs', command: 'npx', args: ['tsx', 'scripts/validate-packs.ts'] },
  {
    name: 'build flashcards',
    command: 'npx',
    args: ['tsx', 'scripts/build-flashcards.ts'],
    postCheck: flashcardsSyncCheck,
  },
  { name: 'credit audit', command: 'npx', args: ['tsx', 'scripts/credit-audit.ts'] },
  { name: 'smoke', command: 'npx', args: ['playwright', 'test'] },
];

for (const stage of stages) {
  runStage(stage);
}

process.stdout.write('All checks passed\n');
process.exit(0);
