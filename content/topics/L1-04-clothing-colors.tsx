import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L1-04 Clothing & Colors — कपड़े और रंग
// Foundations pack: trains adjective + noun gender/number agreement, the
// single highest-leverage Language Control drill at Level 1. Color words sit
// naturally beside clothing nouns and expose the student to ा/ी/े endings
// in every sentence they write.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-04-clothing-colors',
  level: 1,
  themeGroup: 'ModernSociety',
  order: 4,
  heroMotif: 'kurta',
  titleHindi: 'कपड़े और रंग',
  titleEnglish: 'Clothing & Colors',
  hook: 'Concrete nouns and adjectives that add texture and cultural specificity to any essay.',
  heroPrompt: composeHeroPrompt(
    'A rack of colorful Indian garments — kurta, saree, dupatta — arranged like a paint palette against a terracotta wall, brass hangers',
  ),

  rationale: {
    fcpsSubTopics: [
      'Clothing and Colors (FCPS Level 1 — Personal & Family Life)',
      'Describing People and Self (FCPS Level 1) — what I am wearing today',
      'Celebrations and Festivals (FCPS Level 1) — bridges into wedding/Diwali attire',
    ],
    trains: ['LanguageControl', 'TopicCoverage', 'TextType'],
    afterThisPackStudentCan: [
      'Name at least 10 Indian and Western garments with correct gender in Hindi.',
      'Apply color adjectives (लाल, नीला, पीला) with correct ा/ी/े endings for noun gender and number.',
      'Use पहनना (to wear) vs लगाना (to apply) correctly in a 3-paragraph essay.',
      'Describe what was worn at a past event, what is worn daily, and what will be bought — in three tense frames.',
      'Add one culturally specific garment detail (शेरवानी for a wedding, केसरिया for Diwali) to lift Topic Coverage.',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '80 min reading + 30 min essay',
    ifSkippedRisk:
      'Every FCPS prompt about festivals, daily routine, or describing people expects clothing and color vocabulary. Without this pack the student writes "मेरा कपड़ा अच्छा है" six times and caps at Benchmark 3. Gender agreement also never stabilizes without this color-adjective drill.',
  },

  objectives: [
    {
      text: 'Identify 10+ Indian and Western garments and their gender in Hindi without lookup.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Make color adjectives agree with noun gender and number across ा/ी/े endings.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Distinguish पहनना (clothing/accessories) from लगाना (mehndi, bindi, perfume).',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Write a 3-paragraph essay about dressing for a wedding using past, present AND future.',
      trains: ['TextType'],
    },
    {
      text: 'Include at least one culturally specific garment or color (saffron, red for bride, white for Holi) per essay.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Indian garments
    { hindi: 'कुर्ता', transliteration: 'kurta', english: 'kurta (long tunic)', exampleHindi: 'पिताजी सफ़ेद कुर्ता पहनते हैं।', exampleEnglish: 'Father wears a white kurta.', emoji: '👕', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'साड़ी', transliteration: 'saari', english: 'saree', exampleHindi: 'माँ की लाल साड़ी बहुत सुंदर है।', exampleEnglish: "Mother's red saree is very beautiful.", emoji: '🥻', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'दुपट्टा', transliteration: 'dupatta', english: 'long scarf / dupatta', exampleHindi: 'मेरी बहन ने पीला दुपट्टा लिया।', exampleEnglish: 'My sister took a yellow dupatta.', emoji: '🧣', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'सलवार-कमीज़', transliteration: 'salwar-kameez', english: 'salwar-kameez', exampleHindi: 'वह हरी सलवार-कमीज़ पहनकर आई।', exampleEnglish: 'She came wearing a green salwar-kameez.', emoji: '👗', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'शेरवानी', transliteration: 'shervaani', english: 'sherwani (formal menswear)', exampleHindi: 'दूल्हे ने सुनहरी शेरवानी पहनी।', exampleEnglish: 'The groom wore a golden sherwani.', emoji: '🤵', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'धोती', transliteration: 'dhoti', english: 'dhoti', exampleHindi: 'दादाजी सफ़ेद धोती पहनते हैं।', exampleEnglish: 'Grandfather wears a white dhoti.', emoji: '👘', partOfSpeech: 'noun', subgroup: 'Indian garments' },
    { hindi: 'पायजामा', transliteration: 'paayjaama', english: 'pyjama (loose trousers)', exampleHindi: 'कुर्ते के साथ पायजामा अच्छा लगता है।', exampleEnglish: 'Pyjama looks good with a kurta.', emoji: '🩳', partOfSpeech: 'noun', subgroup: 'Indian garments' },

    // Western garments
    { hindi: 'कमीज़', transliteration: 'kameez', english: 'shirt', exampleHindi: 'मेरी नई कमीज़ नीली है।', exampleEnglish: 'My new shirt is blue.', emoji: '👔', partOfSpeech: 'noun', subgroup: 'Western garments' },
    { hindi: 'पैंट', transliteration: 'paint', english: 'pants / trousers', exampleHindi: 'मैंने काली पैंट पहनी है।', exampleEnglish: 'I am wearing black pants.', emoji: '👖', partOfSpeech: 'noun', subgroup: 'Western garments' },
    { hindi: 'जैकेट', transliteration: 'jaiket', english: 'jacket', exampleHindi: 'सर्दियों में गरम जैकेट चाहिए।', exampleEnglish: 'A warm jacket is needed in winter.', emoji: '🧥', partOfSpeech: 'noun', subgroup: 'Western garments' },
    { hindi: 'टोपी', transliteration: 'topi', english: 'cap / hat', exampleHindi: 'भैया ने नीली टोपी पहनी।', exampleEnglish: 'Elder brother wore a blue cap.', emoji: '🧢', partOfSpeech: 'noun', subgroup: 'Western garments' },
    { hindi: 'जूते', transliteration: 'joote', english: 'shoes (m. pl.)', exampleHindi: 'मेरे काले जूते पुराने हो गए हैं।', exampleEnglish: 'My black shoes have gotten old.', emoji: '👞', partOfSpeech: 'noun', subgroup: 'Western garments' },
    { hindi: 'चप्पल', transliteration: 'chappal', english: 'sandals / slippers', exampleHindi: 'गर्मी में चप्पल आरामदायक है।', exampleEnglish: 'Sandals are comfortable in summer.', emoji: '🩴', partOfSpeech: 'noun', subgroup: 'Western garments' },

    // Colors
    { hindi: 'लाल', transliteration: 'laal', english: 'red', exampleHindi: 'दुल्हन लाल जोड़ा पहनती है।', exampleEnglish: 'The bride wears a red outfit.', emoji: '🔴', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'नीला', transliteration: 'neela', english: 'blue', exampleHindi: 'आसमान आज बहुत नीला है।', exampleEnglish: 'The sky is very blue today.', emoji: '🔵', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'पीला', transliteration: 'peela', english: 'yellow', exampleHindi: 'हल्दी की रस्म में पीले कपड़े पहनते हैं।', exampleEnglish: 'In the haldi ceremony people wear yellow clothes.', emoji: '🟡', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'हरा', transliteration: 'hara', english: 'green', exampleHindi: 'उसका हरा दुपट्टा सबको अच्छा लगा।', exampleEnglish: 'Everyone liked her green dupatta.', emoji: '🟢', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'सफ़ेद', transliteration: 'safed', english: 'white', exampleHindi: 'होली से पहले हम सफ़ेद कपड़े पहनते हैं।', exampleEnglish: 'Before Holi we wear white clothes.', emoji: '⚪', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'काला', transliteration: 'kaala', english: 'black', exampleHindi: 'मेरी काली जैकेट नई है।', exampleEnglish: 'My black jacket is new.', emoji: '⚫', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'सुनहरा', transliteration: 'sunahra', english: 'golden', exampleHindi: 'शादी में सुनहरी साड़ी चमकती है।', exampleEnglish: "At a wedding, a golden saree shines.", emoji: '🟨', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'गुलाबी', transliteration: 'gulaabi', english: 'pink', exampleHindi: 'मेरी छोटी बहन को गुलाबी रंग पसंद है।', exampleEnglish: 'My little sister likes the color pink.', emoji: '🩷', partOfSpeech: 'adjective', subgroup: 'Colors' },
    { hindi: 'केसरिया', transliteration: 'kesariya', english: 'saffron', exampleHindi: 'तिरंगे में केसरिया रंग सबसे ऊपर है।', exampleEnglish: 'In the tricolour, saffron is at the top.', emoji: '🟧', partOfSpeech: 'adjective', subgroup: 'Colors' },

    // Descriptors
    { hindi: 'नया', transliteration: 'naya', english: 'new', exampleHindi: 'मैंने नया कुर्ता खरीदा।', exampleEnglish: 'I bought a new kurta.', emoji: '✨', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'पुराना', transliteration: 'puraana', english: 'old', exampleHindi: 'यह कमीज़ पुरानी हो गई है।', exampleEnglish: 'This shirt has become old.', emoji: '🧺', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'ढीला', transliteration: 'dheela', english: 'loose', exampleHindi: 'यह पैंट मुझे थोड़ी ढीली है।', exampleEnglish: 'These pants are a little loose on me.', emoji: '📏', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'तंग', transliteration: 'tang', english: 'tight', exampleHindi: 'पिछले साल की कमीज़ अब तंग है।', exampleEnglish: "Last year's shirt is now tight.", emoji: '🎯', partOfSpeech: 'adjective', subgroup: 'Descriptors' },

    // Verbs
    { hindi: 'पहनना', transliteration: 'pahanna', english: 'to wear (clothes/shoes)', exampleHindi: 'मैं स्कूल में कमीज़ पहनता हूँ।', exampleEnglish: 'I wear a shirt to school.', emoji: '👚', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'लगाना', transliteration: 'lagaana', english: 'to apply (bindi/mehndi/perfume)', exampleHindi: 'बहन ने हाथों पर मेहँदी लगाई।', exampleEnglish: 'Sister applied mehndi on her hands.', emoji: '💅', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'खरीदना', transliteration: 'khareedna', english: 'to buy', exampleHindi: 'हम बाज़ार से कपड़े खरीदेंगे।', exampleEnglish: 'We will buy clothes from the market.', emoji: '🛍️', partOfSpeech: 'verb', subgroup: 'Verbs' },
  ],
  vocabularyNote: {
    why:
      'These 30 words cover the narrow set FCPS clothing prompts keep pulling from — garments, colors, three describers, and two verbs the student will confuse (पहनना vs लगाना). Every adjective here is ा-ending so the student drills gender agreement on every single example.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Color + noun gender agreement (the ा/ी/े drill)',
      rule:
        'Most color adjectives end in ा and inflect: ा for masculine singular, ी for feminine singular, े for masculine plural or oblique. Invariant colors (लाल, सफ़ेद, हरा-exception-cases, गुलाबी, केसरिया) do not change. So: लाल कुर्ता (m.sg) / लाल साड़ी (f.sg) / लाल कपड़े (m.pl), but काला कुर्ता / काली साड़ी / काले जूते.',
      examples: [
        { hindi: 'काला कुर्ता नया है।', transliteration: 'kaala kurta naya hai.', english: 'The black kurta is new. (m.sg)' },
        { hindi: 'काली साड़ी सुंदर है।', transliteration: 'kaali saari sundar hai.', english: 'The black saree is beautiful. (f.sg)' },
        { hindi: 'काले जूते पुराने हैं।', transliteration: 'kaale joote puraane hain.', english: 'The black shoes are old. (m.pl)' },
        { hindi: 'लाल साड़ी और लाल कुर्ता — रंग एक, रूप अलग।', transliteration: 'laal saari aur laal kurta — rang ek, roop alag.', english: 'Red saree and red kurta — same color word, different nouns. (लाल is invariant)' },
      ],
      pitfall:
        'Writing "काला साड़ी" (masculine adjective on feminine noun) or "काला जूते" (singular on plural) is the single most-graded error at L1. Every color essay produces a handful of these if the student does not drill the ा/ी/े triad.',
      whyItMatters:
        'STAMP caps Language Control at "Low" when gender/number errors are frequent enough to block meaning. Low Language Control forces Text-Type to Intermediate-Low (2 credits). Clean color-noun agreement is the cheapest path from 2 credits to 3.',
    },
    {
      title: 'पहनना vs लगाना (wear vs apply)',
      rule:
        'Use पहनना for things you put on your body: clothes, shoes, a cap, a ring, glasses. Use लगाना for things you apply onto the skin/surface: bindi, mehndi, perfume, lipstick, kajal. Mixing them up reads as L1-novice.',
      examples: [
        { hindi: 'मैंने कुर्ता पहना और बहन ने बिंदी लगाई।', transliteration: 'maine kurta pahna aur bahan ne bindi lagaayi.', english: 'I put on a kurta and my sister applied a bindi.' },
        { hindi: 'दूल्हे ने शेरवानी पहनी, फिर इत्र लगाया।', transliteration: 'doolhe ne shervaani pahni, phir itr lagaaya.', english: 'The groom wore the sherwani, then applied perfume.' },
        { hindi: 'ठंड है, इसलिए मैंने जैकेट पहनी है।', transliteration: 'thand hai, isliye maine jaiket pahni hai.', english: "It's cold, so I have put on a jacket." },
      ],
      pitfall:
        'Students often write "बिंदी पहनी" — wrong. Bindi is applied, not worn. The raters mark this in Language Control every time.',
      whyItMatters:
        'Choosing the right verb for wear-vs-apply is exactly the kind of precise lexical choice that pushes Language Control from Low to Average. It is a small edit with a large rubric payoff.',
    },
    {
      title: 'Comparative with "से" (A is better/bigger than B)',
      rule:
        'Hindi has no separate "than" word. Use [reference] + से + [adjective]. Pattern: "यह उससे अच्छा है" = This is better than that. Useful when comparing two outfits.',
      examples: [
        { hindi: 'यह कुर्ता उससे अच्छा है।', transliteration: 'yah kurta usse achchha hai.', english: 'This kurta is better than that one.' },
        { hindi: 'लाल साड़ी पीली साड़ी से सुंदर है।', transliteration: 'laal saari peeli saari se sundar hai.', english: 'The red saree is more beautiful than the yellow one.' },
        { hindi: 'मेरे जूते भाई के जूतों से नए हैं।', transliteration: 'mere joote bhai ke jooton se naye hain.', english: "My shoes are newer than my brother's shoes." },
      ],
      pitfall:
        'Students copy English word-order and write "यह है अच्छा उससे" — ungrammatical. The से chunk must come before the adjective.',
      whyItMatters:
        'Comparison is an Intermediate-Mid signal: a rubric rater specifically looks for whether the student can compare and contrast. One correct से comparison inside a clothing essay nudges Text-Type upward.',
    },
    {
      title: 'Demonstratives यह / वह / ये / वे',
      rule:
        'यह = this (near, sg), वह = that (far, sg), ये = these OR this-honorific (near, pl), वे = those OR that-honorific (far, pl). Verb agrees with the demonstrative. Clothing essays often point at specific items: "यह कुर्ता" / "वह साड़ी" / "ये जूते".',
      examples: [
        { hindi: 'यह कुर्ता नया है।', transliteration: 'yah kurta naya hai.', english: 'This kurta is new.' },
        { hindi: 'वह साड़ी बहुत महँगी थी।', transliteration: 'vah saari bahut mahngi thi.', english: 'That saree was very expensive.' },
        { hindi: 'ये जूते आरामदायक हैं।', transliteration: 'ye joote aaraamdaayak hain.', english: 'These shoes are comfortable.' },
      ],
      pitfall:
        'Using यह with a plural verb ("यह जूते हैं") breaks agreement. Plural shoes take ये: "ये जूते हैं।"',
      whyItMatters:
        'Demonstratives are short, high-frequency words — getting them right is low effort, high Language Control signal. Getting them wrong in every paragraph flags inconsistency.',
    },
  ],
  grammarNote: {
    why:
      'These four rules account for roughly 80% of the errors on L1 clothing prompts. The ा/ी/े drill is especially leveraged: every color sentence the student writes will test it. If the student leaves this pack still writing "काला साड़ी", no later pack will fix it.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
  ]),
  connectorsNote: {
    why:
      'Starter set for L1. पहले/फिर sequence the stages of getting dressed, क्योंकि/इसलिए supply the "why this outfit", लेकिन handles contrast ("I wanted red but chose yellow"), इसके अलावा lets the student add accessories as a separate idea. Six connectors are more than enough to pass Benchmark 5 on this topic.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'चचेरे भाई की शादी · My Cousin’s Wedding',
    hindi:
      'पिछले महीने मेरे चचेरे भाई की शादी थी। पहले हम सब बाज़ार गए और नए कपड़े खरीदे। मैंने एक सुनहरी शेरवानी पहनी, और मेरी बहन ने लाल साड़ी चुनी, क्योंकि शादी में लाल रंग शुभ माना जाता है। माँ ने पीला दुपट्टा लिया और पिताजी ने सफ़ेद कुर्ता-पायजामा। इसके अलावा, मेरी छोटी बहन ने हाथों पर मेहँदी भी लगाई।\n\nशादी के दिन हम सुबह जल्दी तैयार हुए। फिर हम दूल्हे के घर गए। दूल्हा बहुत सुंदर लग रहा था, लेकिन उसके जूते थोड़े तंग थे, इसलिए वह हँस रहा था। अंत में हमने खूब नाचा और मिठाई खाई। यह दिन मुझे हमेशा याद रहेगा।',
    transliteration:
      'pichhle mahine mere chachere bhai ki shaadi thi. pahle hum sab baazaar gaye aur naye kapde khareede. maine ek sunahri shervaani pahni, aur meri bahan ne laal saari chuni, kyonki shaadi mein laal rang shubh maana jaata hai. maa ne peela dupatta liya aur pitaji ne safed kurta-paayjaama. iske alawa, meri chhoti bahan ne haathon par mehndi bhi lagaayi.\n\nshaadi ke din hum subah jaldi taiyaar hue. phir hum doolhe ke ghar gaye. doolha bahut sundar lag raha tha, lekin uske joote thode tang the, isliye vah hans raha tha. ant mein humne khoob naacha aur mithaai khaayi. yah din mujhe hamesha yaad rahega.',
    english:
      "Last month was my cousin's wedding. First we all went to the market and bought new clothes. I wore a golden sherwani, and my sister chose a red saree, because red is considered auspicious at weddings. Mother took a yellow dupatta and Father a white kurta-pyjama. Besides this, my little sister also applied mehndi on her hands.\n\nOn the wedding day we got ready early in the morning. Then we went to the groom's house. The groom looked very handsome, but his shoes were a little tight, so he was laughing. In the end, we danced a lot and ate sweets. This is a day I will always remember.",
    highlights: [
      { term: 'सुनहरी शेरवानी / लाल साड़ी / पीला दुपट्टा', note: 'Three color+garment pairs in one sentence — each with correct gender ending. Language Control showcase.' },
      { term: 'पहनी / लगाई', note: 'पहनना is used for the sherwani (worn on the body), लगाना for mehndi (applied). Exactly the verb distinction this pack drills.' },
      { term: 'क्योंकि / लेकिन / इसलिए / इसके अलावा', note: 'Four connectors scaffold the cause-effect and contrast moves that push Text-Type to 5.' },
      { term: 'पिछले महीने ... याद रहेगा', note: 'Past-tense frame at the start, future-tense closer at the end — the two-tense shift raters look for.' },
      { term: 'शादी में लाल रंग शुभ', note: 'Cultural specific: red is auspicious for Indian weddings. One sentence, but it lifts Topic Coverage above generic "good color" answers.' },
    ],
    comprehensionQuestions: [
      { q: 'Whose wedding was it?', a: 'चचेरे भाई की (the narrator’s cousin’s).' },
      { q: 'What did the narrator wear, and what did the sister wear?', a: 'The narrator wore a सुनहरी शेरवानी (golden sherwani); the sister chose a लाल साड़ी (red saree).' },
      { q: 'Why did the sister choose red?', a: 'क्योंकि शादी में लाल रंग शुभ माना जाता है (because red is considered auspicious at weddings).' },
      { q: 'What did the little sister apply? Which verb is used?', a: 'मेहँदी — applied with लगाना, not पहनना.' },
      { q: 'Why was the groom laughing?', a: 'उसके जूते थोड़े तंग थे (his shoes were a little tight).' },
      { q: 'Identify one connector used in the second paragraph and explain its function.', a: 'Any of फिर (then, sequence), लेकिन (but, contrast), इसलिए (so, consequence), or अंत में (finally, closing).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor models what a Benchmark-5 wedding essay looks like. Every color adjective inflects correctly, पहनना and लगाना are both used in context, and two time frames (past + future) are set. Read it aloud three times before attempting a prompt — the सुनहरी/लाल/पीला/सफ़ेद sentence-shapes should start to feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'sms',
      title: 'बहन को संदेश · Message to Sister',
      hindi:
        'दीदी! कल शादी के लिए मैंने नीली कमीज़ ली है, पर पैंट थोड़ी तंग है 😅 तुम्हारी गुलाबी साड़ी तैयार है क्या? मेहँदी कब लगाओगी?',
      transliteration:
        'didi! kal shaadi ke liye maine neeli kameez li hai, par paint thodi tang hai 😅 tumhaari gulaabi saari taiyaar hai kya? mehndi kab lagaaogi?',
      english:
        "Sis! I got a blue shirt for the wedding tomorrow, but the pants are a little tight 😅 — is your pink saree ready? When will you apply mehndi?",
    },
    {
      kind: 'diary',
      title: 'दिवाली की शाम · Diwali Evening',
      hindi:
        'आज दिवाली है। मैंने केसरिया कुर्ता और सफ़ेद पायजामा पहना। माँ ने लाल साड़ी पहनी और सुनहरे गहने लगाए। छोटी बहन ने हाथों पर मेहँदी लगाई। सब मिलकर बहुत सुंदर लग रहे थे।',
      transliteration:
        'aaj diwali hai. maine kesariya kurta aur safed paayjaama pahna. maa ne laal saari pahni aur sunahre gahne lagaaye. chhoti bahan ne haathon par mehndi lagaayi. sab milkar bahut sundar lag rahe the.',
      english:
        'Today is Diwali. I wore a saffron kurta and white pyjama. Mother wore a red saree and put on golden jewellery. Little sister applied mehndi on her hands. All together we looked very beautiful.',
    },
    {
      kind: 'review',
      title: 'दुकान की ऑनलाइन समीक्षा · Online Shop Review',
      hindi:
        'इस दुकान के कपड़े अच्छे हैं। मैंने एक हरी सलवार-कमीज़ खरीदी। रंग एकदम सही है, लेकिन दुपट्टा थोड़ा छोटा है। दाम ठीक है। चार तारे। ⭐⭐⭐⭐',
      transliteration:
        'is dukaan ke kapde achchhe hain. maine ek hari salwar-kameez khareedi. rang ekdam sahi hai, lekin dupatta thoda chhota hai. daam theek hai. chaar taare.',
      english:
        "This shop's clothes are good. I bought a green salwar-kameez. The color is just right, but the dupatta is a little small. The price is fair. Four stars.",
    },
    {
      kind: 'poster',
      title: 'त्योहार का पोस्टर · Festival Poster',
      hindi:
        'होली मिलन — रविवार शाम 5 बजे\n🎨 कृपया सफ़ेद कपड़े पहनकर आइए\n🌈 रंग, मिठाई और संगीत\nसबका स्वागत है!',
      transliteration:
        'holi milan — ravivaar shaam 5 baje | kripaya safed kapde pahankar aaiye | rang, mithaai aur sangeet | sabka svaagat hai!',
      english:
        'Holi Meet — Sunday 5 PM · Please come wearing white clothes · Colors, sweets, and music · All are welcome!',
    },
  ],
  modelTextsNote: {
    why:
      'SMS shows casual register, diary shows personal narration, review shows evaluative language, and the poster shows a public-notice register. Together they expose the student to four different ways clothing vocabulary shows up in real Hindi — not just one textbook pattern.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Red = Auspicious, White = Purity',
      body:
        'Indian brides traditionally wear red or deep pink — the color symbolizes auspiciousness and prosperity. White, on the other hand, is reserved for Holi (to show the colors) or for mourning in many regions. A bride in white would be startling; a mourner in red would be inappropriate. Getting this right in an essay signals cultural fluency.',
      emoji: '🔴',
    },
    {
      title: 'Saffron (केसरिया) — More Than a Color',
      body:
        'The top band of the Indian flag is केसरिया. It represents courage and sacrifice, and it appears on many festival garments — especially during Diwali and Navratri. Writing "मैंने केसरिया कुर्ता पहना" instantly reads as more authentic than "मैंने नारंगी कुर्ता पहना".',
      emoji: '🟧',
    },
    {
      title: 'Holi: White In, Colors Out',
      body:
        'On Holi morning everyone wears a simple सफ़ेद कुर्ता or old white clothes. By afternoon they are covered in गुलाल — pink, green, yellow powder. Mentioning this before-and-after arc makes a Holi essay richer without needing any extra vocabulary.',
      emoji: '🌈',
    },
    {
      title: 'Wedding Dress Code — by Role',
      body:
        'Groom = शेरवानी (often cream or सुनहरी). Bride = red or maroon लहंगा / साड़ी. Groom’s side often wears coordinated colors; bride’s side another. Guests avoid white (looks like mourning) and black (looks like sadness). Knowing these roles lets you describe any wedding scene in three sentences.',
      emoji: '💒',
    },
    {
      title: 'Seasonal Fabrics',
      body:
        'Cotton (सूती) in summer because it breathes; wool (ऊनी) and shawls in winter; a छाता (umbrella) in monsoon. A sentence like "गर्मी में मैं सूती कुर्ता पहनता हूँ" layers vocabulary + weather + habit in one clean clause.',
      emoji: '☀️',
    },
  ],
  culturalNote: {
    why:
      'Raters on Hindi essays will have read a hundred "I wore a red shirt" answers. One sentence about why the bride wears red, or what saffron represents, or the white-to-colors arc of Holi, separates a Benchmark-5 essay from a Benchmark-3 one — no extra grammar required.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'रंग में भंग पड़ना',
      literal: 'disturbance falling in color',
      meaning: 'A joyful mood is suddenly spoiled; a celebration is ruined.',
      example: 'शादी में बारिश होने लगी और रंग में भंग पड़ गया।',
      exampleEnglish: 'It started raining at the wedding and spoiled the mood.',
    },
    {
      phrase: 'अपना रंग दिखाना',
      literal: 'to show one’s own color',
      meaning: 'To reveal one’s true nature (often negative, or sometimes surprising).',
      example: 'नई जैकेट ने एक बारिश में ही अपना रंग दिखा दिया — रंग निकल गया।',
      exampleEnglish: 'The new jacket showed its true nature in one rain — the color ran.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms use the literal word रंग (color), so they slot naturally into a clothing essay without feeling forced. One idiom, well-placed, reads as register mastery. Two in one essay is overkill — pick whichever fits the mood.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने परिवार में किसी शादी के लिए तैयार होने के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपने क्या पहना, क्यों पहना, और वह दिन कैसा रहा। (Write three paragraphs about getting ready for a wedding in your family. Describe what you wore, why, and how the day went.)',
      novice: 'मेरे भाई की शादी थी। मैंने कपड़े पहने। अच्छा दिन था।',
      intermediateMid:
        'पिछले महीने मेरे चचेरे भाई की शादी थी। पहले हम बाज़ार गए और नए कपड़े खरीदे। मैंने एक सुनहरी शेरवानी पहनी, क्योंकि माँ ने कहा कि शादी में चमकीले रंग अच्छे लगते हैं। मेरी बहन ने लाल साड़ी चुनी, और पिताजी ने सफ़ेद कुर्ता-पायजामा। इसके अलावा, छोटी बहन ने हाथों पर मेहँदी लगाई।\n\nशादी के दिन सुबह हम जल्दी तैयार हुए। दूल्हा बहुत सुंदर लग रहा था, लेकिन उसके जूते थोड़े तंग थे, इसलिए वह बार-बार हँसता रहा। हम सब मिलकर नाचे और खूब मिठाई खाई। मुझे लगता है कि उस दिन हमारा परिवार सबसे सुंदर दिख रहा था।\n\nअगले साल मेरी बड़ी बहन की भी शादी होगी। तब मैं एक केसरिया कुर्ता खरीदूँगा और नये काले जूते भी लूँगा। मैं सचमुच उस दिन का इंतज़ार कर रहा हूँ।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले महीने', note: 'Past frame anchored in the first sentence.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'सुनहरी शेरवानी / लाल साड़ी / सफ़ेद कुर्ता-पायजामा', note: 'Three color+garment pairs, each with correct gender agreement (f/f/m). Pure Language Control.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'पहनी ... लगाई', note: 'पहनना used for the sherwani, लगाना for mehndi — the precise verb distinction this pack trains.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / इसके अलावा', note: 'Reason + addition in one paragraph; raters read this as Intermediate-Mid connectedness.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'लेकिन / इसलिए', note: 'Contrast + consequence — the "why he was laughing" scaffold.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'मिठाई खाई / नाचे', note: 'Specific wedding customs, not generic "we enjoyed".' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल ... खरीदूँगा ... लूँगा', note: 'Future tense arrives in the closing — three time frames in 140 words = clean Benchmark 5.' },
        { paragraphIndex: 2, kind: 'vocab', highlight: 'केसरिया कुर्ता ... काले जूते', note: 'Invariant adjective (केसरिया) beside inflected adjective (काले, m.pl). Shows the student controls both patterns.' },
      ],
      wordCount: 140,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'क्योंकि', 'इसके अलावा', 'लेकिन', 'इसलिए'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs — sentences cannot be rearranged without breaking the day’s narrative. Text-Type 5 requirement met.',
          'Uses past (पहनी, खरीदे, नाचे), present (लग रहा था, लगता है), and future (खरीदूँगा, लूँगा) in 140 words — clean three-tense control for IM.',
          'Color-gender agreement is flawless: सुनहरी शेरवानी (f), लाल साड़ी (f), सफ़ेद कुर्ता (m), काले जूते (m.pl). Language Control stabilizes at Average or High.',
          'पहनना vs लगाना is used correctly — सहेरवानी is पहनी, मेहँदी is लगाई. This precise lexical choice is exactly what the rubric rewards.',
          'Cultural specific (sherwani, mehndi, wedding red/gold) raises Topic Coverage above "nice clothes, nice day" responses.',
        ],
        gotchas: [
          'If the student slips into "मेहँदी पहनी", Language Control drops — mehndi is applied (लगाई), not worn.',
          'If the essay collapses all three paragraphs into one block with no paragraph break, Text-Type drops to 4 even with the same words.',
        ],
      },
    },
    {
      prompt:
        'दिवाली या होली जैसे किसी त्योहार के दिन आप क्या पहनते हैं? तीन अनुच्छेदों में बताइए — कपड़े, रंग, और क्यों। (What do you wear on a festival day like Diwali or Holi? Explain in three paragraphs — clothes, colors, and why.)',
      novice: 'दिवाली पर मैं कुर्ता पहनता हूँ। रंग अच्छा है। मुझे दिवाली पसंद है।',
      intermediateMid:
        'हर साल दिवाली पर हमारे घर में सब लोग नए कपड़े पहनते हैं। मैं आमतौर पर केसरिया कुर्ता और सफ़ेद पायजामा पहनता हूँ, क्योंकि ये रंग त्योहार पर शुभ माने जाते हैं। मेरी माँ लाल साड़ी पहनती हैं और सुनहरे गहने लगाती हैं। मेरी छोटी बहन गुलाबी सलवार-कमीज़ चुनती है, और हाथों पर मेहँदी भी लगाती है।\n\nपिछले साल हम दिवाली से एक हफ़्ता पहले बाज़ार गए थे। वहाँ बहुत भीड़ थी, लेकिन रंग-बिरंगे कपड़े देखकर बहुत अच्छा लगा। मैंने एक नया कुर्ता खरीदा, जो मेरे पुराने कुर्ते से चमकीला था। पिताजी ने कहा कि त्योहार पर पुराने कपड़े अच्छे नहीं लगते, इसलिए नए कपड़े ज़रूरी हैं।\n\nइस साल मैं एक नीली जैकेट भी लूँगा, क्योंकि दिवाली के बाद सर्दी शुरू हो जाती है। मुझे लगता है कि कपड़े सिर्फ़ कपड़े नहीं हैं, बल्कि त्योहार की खुशी का एक हिस्सा हैं।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पहनते हैं / पहनता हूँ / पहनती हैं', note: 'Habitual present across three subjects — shows controlled conjugation.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'केसरिया कुर्ता / लाल साड़ी / गुलाबी सलवार-कमीज़', note: 'Three culturally anchored color+garment pairs. Mix of invariant (केसरिया, गुलाबी) and inflected (लाल). Topic Coverage lift.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'पहनता / पहनती / लगाती', note: 'पहनना for clothes, लगाना for mehndi + jewellery — both verbs in one paragraph.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले साल ... गए थे ... खरीदा', note: 'Past-perfective shift mid-essay; anchors the second paragraph in past time.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'नया कुर्ता, जो मेरे पुराने कुर्ते से चमकीला था', note: 'Relative clause + comparative "से" — an Intermediate-Mid hallmark.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'त्योहार पर पुराने कपड़े अच्छे नहीं लगते', note: 'Specific cultural reasoning, not generic "festivals are nice".' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'इस साल ... लूँगा', note: 'Future arrives in the closing — third time frame sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: '"Not only but also" — a reliable Benchmark-5 closing move.' },
      ],
      wordCount: 147,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'लेकिन', 'इसलिए', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Past (खरीदा, गए थे), habitual present (पहनते हैं), and future (लूँगा) all present in 147 words — satisfies IM "some control of major time frames".',
          'Comparative "मेरे पुराने कुर्ते से चमकीला" is exactly the kind of comparison raters check for at Benchmark 5.',
          'सिर्फ़ ... बल्कि ... भी closes the essay with reflection — a Text-Type signal IM students rarely use.',
          'Every color agrees: केसरिया कुर्ता (invariant + m), सफ़ेद पायजामा (invariant + m), लाल साड़ी (invariant + f), गुलाबी सलवार-कमीज़ (invariant + f), नीली जैकेट (inflected + f). Zero agreement errors.',
          'Cultural reasoning ("त्योहार पर पुराने कपड़े अच्छे नहीं लगते") is concrete and India-rooted, not generic.',
        ],
        gotchas: [
          'If the student writes "नीला जैकेट" instead of "नीली जैकेट" (जैकेट is feminine), Language Control drops immediately.',
          'If the student uses one tense throughout, even with the same vocabulary, Benchmark drops to 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked model essays — one narrative (wedding), one reflective (festival habit). Study both until the color+garment+verb patterns feel automatic. The verdict cards show exactly which sentences tick which rubric boxes; raters think in those boxes, and so should you.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने किसी पसंदीदा पोशाक के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह क्या है, किस रंग की है, और आप उसे कब पहनते हैं।',
      english:
        'Write three paragraphs about a favorite outfit of yours. Describe what it is, what color, and when you wear it.',
      hint: {
        connectors: ['क्योंकि', 'लेकिन', 'इसलिए'],
        vocab: ['कुर्ता', 'साड़ी', 'नीला', 'लाल', 'पहनना'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'किसी त्योहार (दिवाली, होली, ईद या रक्षाबंधन) के लिए तैयार होने का वर्णन तीन अनुच्छेदों में कीजिए। कपड़ों, रंगों और परंपरा के बारे में बताइए।',
      english:
        'In three paragraphs, describe getting ready for a festival (Diwali, Holi, Eid, or Rakshabandhan). Write about clothes, colors, and the tradition.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके अलावा'],
        vocab: ['केसरिया', 'सफ़ेद', 'मेहँदी', 'लगाना', 'सुनहरा'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगर आप अगले महीने कपड़ों की दुकान जाएँगे, तो आप क्या खरीदेंगे और क्यों? तीन अनुच्छेदों में लिखिए।',
      english:
        'If you were going to a clothing store next month, what would you buy and why? Write in three paragraphs.',
      hint: {
        connectors: ['अगर... तो', 'क्योंकि', 'इसके अलावा'],
        vocab: ['खरीदना', 'नया', 'पुराना', 'जैकेट', 'जूते'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is the exact FCPS shape: three cohesive paragraphs, personal or hypothetical experience, enough scope for two or three tenses. The hint strip is not "the answer" — it is the target set of connectors, vocabulary, and tenses the student should hit to land at Benchmark 5.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every essay you write in this pack. If you mark three or fewer "Pass" boxes, go back and add connectors, fix a gender ending, or swap "अच्छा" for a specific color before moving on. Color-noun agreement is the single box raters check first on this topic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
