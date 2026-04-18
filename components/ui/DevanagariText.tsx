import React from 'react';
import { ScriptText, type ScriptTextProps } from './ScriptText';

// Thin backwards-compatible alias over the generic ScriptText primitive.
// All existing call sites continue to work; new code should prefer
// ScriptText with an explicit `script` prop.
export type DevanagariTextProps = Omit<ScriptTextProps, 'script'>;

export const DevanagariText: React.FC<DevanagariTextProps> = (props) => (
  <ScriptText {...props} script="Devanagari" />
);
