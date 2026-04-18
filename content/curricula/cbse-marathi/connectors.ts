// NOT AUTHORED - stub for multi-curriculum seam proof. See ../README.md.
//
// This file mirrors the export shape of ../fcps-stamp-hindi/connectors.ts so
// a sibling curriculum can slot into the same ConnectorBank consumers once
// authored. Nothing in production code imports from this file today.
//
// To make this curriculum real, port the structure from
// ../fcps-stamp-hindi/connectors.ts and author a Marathi connector bank
// (आधी, नंतर, कारण, पण, म्हणून, ...).

import type { ConnectorEntry } from '../../schema';

export const CONNECTORS: Record<string, ConnectorEntry> = {};

export const STARTER_CONNECTOR_KEYS: string[] = [];

export const GROWING_CONNECTOR_KEYS: string[] = [];

export const IM_PUSH_CONNECTOR_KEYS: string[] = [];

export function pickConnectors(keys: string[]): ConnectorEntry[] {
  return keys.map((k) => {
    const c = CONNECTORS[k];
    if (!c) throw new Error(`Unknown connector key: ${k}`);
    return c;
  });
}
