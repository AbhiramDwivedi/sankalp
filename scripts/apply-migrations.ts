#!/usr/bin/env tsx
// scripts/apply-migrations.ts
//
// Applies every SQL file under supabase/migrations/ in lexicographic order
// to the Postgres database pointed at by POSTGRES_URL_NON_POOLING (populated
// by the Vercel + Supabase integration). Idempotent — the migration files
// use `create ... if not exists` / `drop ... if exists` so re-running is
// safe.
//
// Run with:  npx tsx scripts/apply-migrations.ts
//
// This exists so a developer can set up the schema from the command line
// without clicking into the Supabase dashboard SQL editor. For production
// schema management we'll move to `supabase db push` once the Supabase CLI
// becomes part of the dev loop.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { Client } from 'pg'

// Minimal .env.local loader — we don't ship dotenv as a dep for a one-off
// script. Only handles KEY=VALUE lines with optional surrounding quotes,
// which is all the Vercel + Supabase integration produces.
function loadEnvLocal() {
  const path = join(process.cwd(), '.env.local')
  if (!existsSync(path)) return
  const raw = readFileSync(path, 'utf8')
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvLocal()

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL

if (!connectionString) {
  console.error(
    'No Postgres connection string. Expected POSTGRES_URL_NON_POOLING (or POSTGRES_URL) in .env.local.',
  )
  process.exit(1)
}

async function main(connectionString: string) {
  const migrationsDir = join(process.cwd(), 'supabase', 'migrations')
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  if (files.length === 0) {
    console.log('No migration files found in supabase/migrations/.')
    return
  }

  // Supabase requires SSL but uses an intermediate CA that Node's default
  // bundle doesn't include. Strip any sslmode= from the URL so our explicit
  // ssl option below (which allows the Supabase CA) takes effect — newer
  // pg-connection-string treats sslmode=require as verify-full, which rejects
  // the cert. The transport is still encrypted.
  const cleaned = connectionString.replace(/[?&]sslmode=[^&]*/g, '')
  const client = new Client({
    connectionString: cleaned,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  try {
    for (const file of files) {
      const sql = readFileSync(join(migrationsDir, file), 'utf8')
      process.stdout.write(`Applying ${file} … `)
      await client.query(sql)
      console.log('ok')
    }
    console.log(`\nApplied ${files.length} migration${files.length === 1 ? '' : 's'}.`)
  } finally {
    await client.end()
  }
}

main(connectionString).catch((err) => {
  console.error('\nMigration failed:', err.message)
  process.exit(1)
})
