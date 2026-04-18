import type { StudentProfile } from '../../types';
import type { StudyPlan, TopicPack, Capstone } from '../../content/schema';
import { TOPIC_PACKS_BY_ID } from '../../content';
import { CAPSTONES_BY_ID } from '../../content/capstones';
import {
  nextPlanItemAfter,
  planProgressFor,
  type PlanItemRef,
  type PlanProgress,
} from '../../content/studyPlans';

// -----------------------------------------------------------------------------
// Resolver for NextUpCard / OverlayProgress data. Centralizes the plan lookup
// so the three overlays (pack / capstone / deck) share one path.
//
// The returned `next` always refers to a pack or capstone - decks are not part
// of the study plan, so inside DeckRunner we surface whatever pack/capstone is
// next after the student's in-progress item (or the plan cursor's next).
// -----------------------------------------------------------------------------

export interface ResolvedNextUp {
  item: PlanItemRef | null;
  pack: TopicPack | null;
  capstone: Capstone | null;
  reason: string;
}

export function resolveNextUp(opts: {
  profile: StudentProfile;
  plan: StudyPlan;
  /** The id of the item the student is currently viewing (pack or capstone). For decks, pass the inProgress pack/capstone id if any. */
  currentItemId: string;
}): ResolvedNextUp {
  const { profile, plan, currentItemId } = opts;
  const next = nextPlanItemAfter(plan, currentItemId, {
    completedTopicIds: profile.completedTopicIds || [],
    completedCapstoneIds: profile.completedCapstoneIds || [],
    studentLevel: profile.currentLevel,
    deferredIds: profile.deferredIds || [],
  });

  if (!next) {
    return { item: null, pack: null, capstone: null, reason: '' };
  }

  if (next.kind === 'pack') {
    const pack = TOPIC_PACKS_BY_ID[next.id] || null;
    return {
      item: next,
      pack,
      capstone: null,
      reason: reasonForPack(pack),
    };
  }

  const capstone = CAPSTONES_BY_ID[next.id] || null;
  return {
    item: next,
    pack: null,
    capstone,
    reason: reasonForCapstone(capstone),
  };
}

function reasonForPack(pack: TopicPack | null): string {
  if (!pack) return 'Continue your plan.';
  // Prefer the first "afterThisPackStudentCan" bullet - it is always written
  // in the format "you will be able to X" which reads naturally after "Next:".
  const outcome = pack.rationale?.afterThisPackStudentCan?.[0];
  if (outcome) return outcome;
  if (pack.hook) return pack.hook;
  return 'Continue your plan.';
}

function reasonForCapstone(capstone: Capstone | null): string {
  if (!capstone) return 'Continue your plan.';
  if (capstone.whyThisCapstone) return capstone.whyThisCapstone;
  if (capstone.hook) return capstone.hook;
  return 'Continue your plan.';
}

export function getPlanProgress(
  plan: StudyPlan,
  profile: StudentProfile,
  currentItemId: string | null,
): PlanProgress {
  return planProgressFor(plan, currentItemId, {
    completedTopicIds: profile.completedTopicIds || [],
    completedCapstoneIds: profile.completedCapstoneIds || [],
    studentLevel: profile.currentLevel,
  });
}
