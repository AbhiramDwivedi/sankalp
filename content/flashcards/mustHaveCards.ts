// Hand-curated "must-know" overrides for the flashcard generator.
// Any card that matches one of these rules is promoted to priority 'must-know'
// regardless of the automatic classification.

// Grammar essentials - hand-authored mini-lessons that appear as flashcards in
// the grammar-essentials deck. These are the 25 Hindi control points that,
// if the student masters them, land the essay in Benchmark 5.

export interface GrammarEssentialCard {
  id: string;                 // becomes the flashcard id
  title: string;
  front: { prompt: string; hindi?: string };
  back: { english: string; example?: string; note?: string };
  priority: 'must-know' | 'core';
}

export const GRAMMAR_ESSENTIALS: GrammarEssentialCard[] = [
  {
    id: 'grammar-ne-perfective',
    title: 'ने construction',
    front: { prompt: 'When do you add ने to the subject in past tense?' },
    back: {
      english: 'With transitive verbs in the perfective past. The verb then agrees with the OBJECT, not the subject.',
      example: 'मैंने रोटियाँ खाईं। (Not: मैं रोटी खाया।)',
      note: 'Intransitive verbs (जाना, आना, बैठना, सोना) do NOT take ने.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-gender-noun-adj-verb',
    title: 'Gender agreement chain',
    front: { prompt: 'What must agree with a noun\'s gender?' },
    back: {
      english: 'Adjective ending, verb ending, and sometimes possessive pronoun.',
      example: 'बड़ा लड़का खाता है (m) · बड़ी लड़की खाती है (f)',
      note: 'In the same sentence, one mistake cascades - getting the noun wrong usually breaks both the adjective and the verb.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-postposition-oblique',
    title: 'Oblique case before postpositions',
    front: { prompt: 'What happens to a noun before को, से, में, पर, का?' },
    back: {
      english: 'It takes the oblique form. Masculine -ा → -े, feminine -ी stays -ी; plurals take -ों.',
      example: 'लड़का → लड़के को · लड़के → लड़कों को',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-possessive-ka-ki-ke',
    title: 'का / की / के',
    front: { prompt: 'How do you say "Ram\'s" in Hindi? Which form to use?' },
    back: {
      english: 'का + masc sing, की + fem (any number), के + masc plural or before postposition.',
      example: 'राम का भाई · राम की बहन · राम के दोस्त',
      note: 'This also encodes gender agreement - the possessive agrees with what is owned, not the owner.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-present-habitual',
    title: 'Present habitual (रोज़)',
    front: { prompt: 'How do you say "I eat every day"?' },
    back: {
      english: 'Verb stem + ता/ती/ते + हूँ/है/हैं. Indicates routine action.',
      example: 'मैं रोज़ खाना खाता हूँ। (m) · मैं रोज़ खाना खाती हूँ। (f)',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-present-continuous',
    title: 'Present continuous',
    front: { prompt: 'How do you say "I am eating right now"?' },
    back: {
      english: 'Verb stem + रहा/रही/रहे + हूँ/है/हैं.',
      example: 'मैं खाना खा रहा हूँ। / खा रही हूँ।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-simple-past',
    title: 'Simple past (perfective)',
    front: { prompt: 'What is the intransitive past form of जाना (to go)?' },
    back: {
      english: 'जाना → गया (m.sing) · गई (f.sing) · गए (m.pl) · गईं (f.pl). No ने.',
      example: 'मैं स्कूल गया। · वह घर गई।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-past-continuous',
    title: 'Past continuous',
    front: { prompt: 'How do you say "I was eating"?' },
    back: {
      english: 'Verb stem + रहा/रही/रहे + था/थी/थे.',
      example: 'मैं खाना खा रहा था। / रही थी।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-future',
    title: 'Future tense',
    front: { prompt: 'How do you say "I will go"?' },
    back: {
      english: 'Verb stem + ऊँगा/ऊँगी/एगा/एगी/एँगे/एँगी depending on person and gender.',
      example: 'मैं जाऊँगा / जाऊँगी · वह जाएगा / जाएगी · हम जाएँगे।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-conditional-agar-to',
    title: 'अगर ... तो',
    front: { prompt: 'How do you say "If it rains, we will not go"?' },
    back: {
      english: 'Pattern: अगर [condition], तो [result]. Condition usually in future or present; result in future.',
      example: 'अगर बारिश होगी, तो हम नहीं जाएँगे।',
      note: 'One conditional in an IM essay is a strong Language-Control signal.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-polite-imperative',
    title: 'Polite imperative (-इए)',
    front: { prompt: 'How do you politely say "Please sit"?' },
    back: {
      english: 'Verb stem + इए (formal) - कीजिए / बैठिए / बताइए.',
      example: 'कृपया बैठिए। · कृपया बताइए कि आप कौन हैं।',
      note: 'Use in dialogue within essays to show register awareness.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-jab-tab',
    title: 'जब ... तब',
    front: { prompt: 'Translate: "When I arrived, the sun was setting."' },
    back: {
      english: 'Pattern: जब [clause 1], तब [clause 2]. A dependent clause - sentences cannot be rearranged.',
      example: 'जब मैं पहुँचा, तब सूरज ढल रहा था।',
      note: 'This is the single biggest Intermediate-Low → Intermediate-Mid discriminator.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-reported-speech-ki',
    title: 'Reported speech with कि',
    front: { prompt: 'How do you say "She said that she was tired"?' },
    back: {
      english: 'Direct pattern: वह ने कहा कि ... - no tense shift, unlike English.',
      example: 'उसने कहा कि वह थकी हुई है।',
      note: 'Using reported speech once in an essay lifts the text-type ceiling.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-mujhe-lagta-hai',
    title: 'मुझे लगता है कि',
    front: { prompt: 'How do you start an opinion sentence?' },
    back: {
      english: '"I think / I feel that..." - the single safest way to open a reflective closing paragraph.',
      example: 'मुझे लगता है कि यह दिन मुझे याद रहेगा।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-mera-manna-hai',
    title: 'मेरा मानना है कि',
    front: { prompt: 'How do you open a stronger opinion statement?' },
    back: {
      english: '"My view is that..." - more formal than मुझे लगता है. Good for opinion essays.',
      example: 'मेरा मानना है कि संतुलन सबसे ज़रूरी है।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-kyonki',
    title: 'क्योंकि (because)',
    front: { prompt: 'How do you add a reason to a statement?' },
    back: {
      english: 'Use क्योंकि as a cause connector. Rubric-critical: Text-Type cannot be Intermediate-Mid without cause-effect links.',
      example: 'मुझे यह रेस्तराँ पसंद है, क्योंकि यहाँ खाना अच्छा है।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-lekin',
    title: 'लेकिन (but)',
    front: { prompt: 'How do you contrast two ideas?' },
    back: {
      english: 'Use लेकिन between two clauses. Contrast signals the rater that you can hold two ideas.',
      example: 'मैं थकी हुई थी, लेकिन मुझे जाने का मन नहीं था।',
    },
    priority: 'core',
  },
  {
    id: 'grammar-isliye',
    title: 'इसलिए (therefore)',
    front: { prompt: 'How do you draw a consequence?' },
    back: {
      english: 'इसलिए introduces a result from a previous statement. Pairs naturally with क्योंकि.',
      example: 'बाहर बारिश हो रही थी, इसलिए हम घर पर रहे।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-halaanki',
    title: 'हालाँकि (although)',
    front: { prompt: 'How do you show concession?' },
    back: {
      english: 'हालाँकि opens a concessive clause. This is a Benchmark-5 discriminator.',
      example: 'हालाँकि मैं थकी थी, मैंने होमवर्क पूरा किया।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-iske-alawa',
    title: 'इसके अलावा (moreover)',
    front: { prompt: 'How do you add another point?' },
    back: {
      english: '"Besides this / moreover" - use to build a paragraph to 4+ sentences.',
      example: 'इसके अलावा, मुझे गाना भी पसंद है।',
    },
    priority: 'core',
  },
  {
    id: 'grammar-sirf-nahi-balki',
    title: 'सिर्फ़ ... नहीं, बल्कि ... भी',
    front: { prompt: 'How do you say "not only X but also Y"?' },
    back: {
      english: 'Correlative construction - raises register considerably.',
      example: 'सिर्फ़ मुझे नहीं, बल्कि मेरी बहन को भी यह फ़िल्म पसंद है।',
      note: 'Using this once in an essay signals push-tier language control.',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-ek-or-doosri-or',
    title: 'एक ओर ... दूसरी ओर',
    front: { prompt: 'How do you structure a two-sided argument?' },
    back: {
      english: '"On one hand ... on the other hand" - formal discourse marker pair. Benchmark-6 register.',
      example: 'एक ओर पढ़ाई का बोझ है, दूसरी ओर परिवार की उम्मीदें।',
    },
    priority: 'core',
  },
  {
    id: 'grammar-compound-verbs-ja',
    title: 'Compound verbs with जाना',
    front: { prompt: 'What does खा जाना mean vs खाना?' },
    back: {
      english: 'खाना = to eat; खा जाना = to eat up / finish eating. Adds completion or intensity.',
      example: 'उसने पूरा खाना खा लिया। · सारी चाय पी जाओ।',
      note: 'Compound verbs are a Benchmark-6 marker. Don\'t force them; one per essay is enough.',
    },
    priority: 'core',
  },
  {
    id: 'grammar-apna-vs-mera',
    title: 'अपना vs मेरा',
    front: { prompt: 'When do you use अपना instead of मेरा?' },
    back: {
      english: 'अपना = "own" (reflexive, refers back to the subject). मेरा = fixed "my". Use अपना when the possessor is the subject of the sentence.',
      example: 'मैं अपनी माँ से मिला। (reflexive - correct) · ❌ मैं मेरी माँ से मिला।',
    },
    priority: 'must-know',
  },
  {
    id: 'grammar-participial-te-hi',
    title: '-ते ही (as soon as)',
    front: { prompt: 'How do you say "as soon as the bell rang"?' },
    back: {
      english: 'Verb stem + -ते ही - "as soon as X happens". Non-finite clause; syntactic variety for IM+.',
      example: 'घंटी बजते ही हम बाहर भागे।',
    },
    priority: 'core',
  },
];

// Auto-promotion: vocabulary entries whose Hindi word appears in ≥N packs are
// promoted to must-know by the generator. Tuning knob lives here.
export const VOCAB_MUST_KNOW_CROSS_PACK_THRESHOLD = 3;

// Connectors that are "must-know" regardless of pack count.
export const MUST_KNOW_CONNECTOR_KEYS = [
  'pahle',
  'phir',
  'iskeBaad',
  'antMein',
  'kyonki',
  'lekin',
  'isliye',
  'halaanki',
  'jabTab',
  'agarTo',
  'meraManna',
  'mujheLagta',
];
