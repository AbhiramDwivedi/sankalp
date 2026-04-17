// Shared image-generation template. Each TopicPack.heroPrompt supplies only
// the "scene" clause; this wrapper keeps art direction consistent across all
// 26 hero illustrations.

export const HERO_IMAGE_STYLE = [
  'Warm, stylized illustration',
  'painted in soft gouache style with visible brush texture',
  'subtle Indian cultural flourishes (simple paisley, rangoli motifs, brass tones)',
  'no text or letterforms anywhere in the image',
  'no prominent faces; people rendered from behind or in silhouette',
  'earthy palette: terracotta, saffron, emerald, deep indigo, cream',
  'flat, layered composition',
  'generous negative space on the left third for overlaid title',
  '1200x600 aspect ratio landscape',
  'suitable for a children\'s educational textbook cover',
].join(', ');

export function composeHeroPrompt(scene: string): string {
  return `${scene}. Style: ${HERO_IMAGE_STYLE}.`;
}
