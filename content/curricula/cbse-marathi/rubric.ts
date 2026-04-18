// NOT AUTHORED - stub for multi-curriculum seam proof. See ../README.md.
//
// This file exists solely to prove that a second curriculum folder can be
// added alongside fcps-stamp-hindi/ without structural changes to the app.
// Every export mirrors the shape of ../fcps-stamp-hindi/rubric.ts so the
// type system guarantees parity, but the data is empty/placeholder.
//
// Nothing in production code imports from this file. To make this
// curriculum real, port the structure from ../fcps-stamp-hindi/rubric.ts
// and author Marathi/CBSE-specific rubric descriptors.

import type {
  FcpsCreditLevel,
  RubricAxis,
  StampBenchmark,
} from '../../schema';

export interface BenchmarkDescriptor {
  benchmark: StampBenchmark;
  actflLabel: string;
  textType: string;
  languageControl: string;
  credit: FcpsCreditLevel;
  creditCount: 0 | 1 | 2 | 3;
  inOneLine: string;
}

export const STAMP_BENCHMARKS: BenchmarkDescriptor[] = [];

export const TARGET_BENCHMARK: StampBenchmark = 5;

export interface RubricAxisInfo {
  id: RubricAxis;
  name: string;
  oneLiner: string;
  whatRatersLookFor: string[];
  howToTrain: string[];
}

export const RUBRIC_AXES: RubricAxisInfo[] = [];

export const FCPS_CREDIT_SUMMARY: Array<{
  level: FcpsCreditLevel;
  credits: number;
  label: string;
  description: string;
}> = [];

export const EXAM_FACTS = {
  examName: '',
  testVendor: '',
  sections: [] as Array<{
    name: string;
    prompts: number;
    timeMinutes: number;
    details: string;
  }>,
  noReadingSection: true,
  noListeningSection: true,
  creditWindow: '',
  targetForThreeCredits: '',
};
