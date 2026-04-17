import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L2 DEEP DIVE — Food (खाना और व्यंजन)
// Complements L1-12 (restaurants, ordering, "I ate X"). This pack pushes
// toward Intermediate-Mid by adding cooking process, regional cuisine
// vocabulary, opinion + comparison structures, and the causative (कराना/बनवाना).
// New vocabulary set — does not overlap with L1-12.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-03-food',
  level: 2,
  themeGroup: 'ModernSociety',
  order: 15,
  titleHindi: 'खाना और व्यंजन',
  titleEnglish: 'Food (Level 2 Deep Dive)',
  hook: 'Level 2 moves beyond ordering — it teaches the student to describe cooking a dish, compare regional cuisines, and state opinions about food. Opinions + comparisons are where IM essays are made.',
  heroPrompt: composeHeroPrompt(
    'An Indian kitchen counter mid-cooking — roti dough being rolled on a wooden chakla, a steel kadhai with onions browning in ghee, a masala dabba open showing turmeric and jeera, a grandmother\'s hand stirring, warm late-morning light',
  ),

  rationale: {
    fcpsSubTopics: [
      'Food (FCPS Level 2 — Home Life): preparing meals, family recipes',
      'Cultural practices around food, regional cuisine',
      'Opinions and comparisons about food and daily routines',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate cooking a dish step by step using पहले / फिर / इसके बाद / अंत में across four clauses',
      'Compare two regional cuisines using ज़्यादा / कम / सबसे structures correctly',
      'State a food opinion using मुझे लगता है कि + reason clause, not a one-word adjective',
      'Use the causative बनवाना / खिलाना to show who made whom do what',
      'Shift cleanly between past (a meal cooked with family), present (weekly routine), and future (a dish they want to learn)',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '90 min reading + 45 min essay',
    ifSkippedRisk:
      'L1-12 gets the student to describe restaurant meals. Without this pack the student has no vocabulary for cooking process or regional identity, and FCPS Home-Life food prompts ("a dish your family makes") collapse back to restaurant-style answers — costing Topic Coverage.',
  },

  objectives: [
    {
      text: 'Sequence a 4-step cooking process in Hindi using at least 3 sequence connectors.',
      trains: ['TextType'],
    },
    {
      text: 'Name at least 4 regional cuisines and 2 signature dishes of each.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Use the causative बनवाना / खिलाना correctly in one sentence about a family elder.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Write one comparison sentence using यह उससे ज़्यादा ___ है and one opinion sentence using मुझे लगता है कि ___।',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Include at least two ingredient names (हल्दी, जीरा, प्याज़...) and one cooking verb (भूनना, उबालना) in the essay — specificity is the IM signal.',
      trains: ['TopicCoverage'],
    },
  ],

  vocabulary: [
    // Regional cuisines
    { hindi: 'पंजाबी खाना', transliteration: 'panjaabi khaana', english: 'Punjabi cuisine', exampleHindi: 'पंजाबी खाना ज़्यादा तैलीय होता है।', exampleEnglish: 'Punjabi food is oilier.', emoji: '🫓', partOfSpeech: 'phrase', subgroup: 'Regional cuisines' },
    { hindi: 'दक्षिण भारतीय', transliteration: 'dakshin bhaarateey', english: 'South Indian', exampleHindi: 'दक्षिण भारतीय नाश्ते में डोसा और इडली होते हैं।', exampleEnglish: 'South Indian breakfast has dosa and idli.', emoji: '🥞', partOfSpeech: 'adjective', subgroup: 'Regional cuisines' },
    { hindi: 'बंगाली', transliteration: 'bangaali', english: 'Bengali', exampleHindi: 'बंगाली लोग मछली बहुत खाते हैं।', exampleEnglish: 'Bengalis eat a lot of fish.', emoji: '🐟', partOfSpeech: 'adjective', subgroup: 'Regional cuisines' },
    { hindi: 'गुजराती', transliteration: 'gujaraati', english: 'Gujarati', exampleHindi: 'गुजराती थाली में थोड़ा मीठापन होता है।', exampleEnglish: 'A Gujarati thali has a slight sweetness.', emoji: '🍯', partOfSpeech: 'adjective', subgroup: 'Regional cuisines' },
    { hindi: 'व्यंजन', transliteration: 'vyanjan', english: 'dish / cuisine', exampleHindi: 'हर प्रदेश का अपना व्यंजन होता है।', exampleEnglish: 'Every state has its own cuisine.', emoji: '🍛', partOfSpeech: 'noun', subgroup: 'Regional cuisines' },

    // Cooking actions
    { hindi: 'काटना', transliteration: 'kaatna', english: 'to chop / cut', exampleHindi: 'पहले मैंने प्याज़ काटा।', exampleEnglish: 'First I chopped the onion.', emoji: '🔪', partOfSpeech: 'verb', subgroup: 'Cooking actions' },
    { hindi: 'उबालना', transliteration: 'ubaalna', english: 'to boil', exampleHindi: 'दाल को आधे घंटे उबालना पड़ता है।', exampleEnglish: 'Daal has to be boiled for half an hour.', emoji: '♨️', partOfSpeech: 'verb', subgroup: 'Cooking actions' },
    { hindi: 'भूनना', transliteration: 'bhoonna', english: 'to roast / sauté', exampleHindi: 'माँ ने प्याज़ सुनहरा भूना।', exampleEnglish: 'Mother sautéed the onion till golden.', emoji: '🧅', partOfSpeech: 'verb', subgroup: 'Cooking actions' },
    { hindi: 'तलना', transliteration: 'talna', english: 'to deep-fry', exampleHindi: 'पकौड़े गरम तेल में तले जाते हैं।', exampleEnglish: 'Pakoras are fried in hot oil.', emoji: '🍤', partOfSpeech: 'verb', subgroup: 'Cooking actions' },
    { hindi: 'पकाना', transliteration: 'pakaana', english: 'to cook (till done)', exampleHindi: 'सब्ज़ी को धीमी आँच पर पकाइए।', exampleEnglish: 'Cook the vegetable on low flame.', emoji: '🔥', partOfSpeech: 'verb', subgroup: 'Cooking actions' },
    { hindi: 'मसाला डालना', transliteration: 'masaala daalna', english: 'to add spices', exampleHindi: 'अंत में मसाला डालना मत भूलिए।', exampleEnglish: "Don't forget to add the spices at the end.", emoji: '🌶️', partOfSpeech: 'phrase', subgroup: 'Cooking actions' },
    { hindi: 'बेलना', transliteration: 'belna', english: 'to roll (dough)', exampleHindi: 'दादी रोटी बहुत पतली बेलती हैं।', exampleEnglish: 'Grandma rolls rotis very thin.', emoji: '🫓', partOfSpeech: 'verb', subgroup: 'Cooking actions' },

    // Ingredients
    { hindi: 'तेल', transliteration: 'tel', english: 'oil', exampleHindi: 'कड़ाही में तेल गरम कीजिए।', exampleEnglish: 'Heat oil in the kadhai.', emoji: '🫗', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'घी', transliteration: 'ghee', english: 'clarified butter', exampleHindi: 'दाल में थोड़ा घी अच्छा लगता है।', exampleEnglish: 'A little ghee tastes good in daal.', emoji: '🧈', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'प्याज़', transliteration: 'pyaaz', english: 'onion', exampleHindi: 'प्याज़ हर सब्ज़ी में जाता है।', exampleEnglish: 'Onion goes into every sabzi.', emoji: '🧅', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'लहसुन', transliteration: 'lahsun', english: 'garlic', exampleHindi: 'लहसुन के बिना दाल अधूरी है।', exampleEnglish: 'Daal is incomplete without garlic.', emoji: '🧄', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'अदरक', transliteration: 'adrak', english: 'ginger', exampleHindi: 'चाय में अदरक डालने से स्वाद बढ़ जाता है।', exampleEnglish: 'Adding ginger to tea increases the taste.', emoji: '🫚', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'हल्दी', transliteration: 'haldi', english: 'turmeric', exampleHindi: 'हल्दी सेहत के लिए अच्छी होती है।', exampleEnglish: 'Turmeric is good for health.', emoji: '🟡', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'जीरा', transliteration: 'jeera', english: 'cumin', exampleHindi: 'जीरा तेल में चटकाना पड़ता है।', exampleEnglish: 'Cumin has to be crackled in oil.', emoji: '🌿', partOfSpeech: 'noun', subgroup: 'Ingredients' },
    { hindi: 'धनिया', transliteration: 'dhaniya', english: 'coriander', exampleHindi: 'ऊपर से ताज़ा धनिया डाल दीजिए।', exampleEnglish: 'Sprinkle fresh coriander on top.', emoji: '🌱', partOfSpeech: 'noun', subgroup: 'Ingredients' },

    // Equipment
    { hindi: 'कड़ाही', transliteration: 'kadhaai', english: 'wok / kadhai', exampleHindi: 'लोहे की कड़ाही सबसे अच्छी होती है।', exampleEnglish: 'An iron kadhai is the best.', emoji: '🍳', partOfSpeech: 'noun', subgroup: 'Equipment' },
    { hindi: 'तवा', transliteration: 'tavaa', english: 'flat griddle', exampleHindi: 'रोटी तवे पर सेकी जाती है।', exampleEnglish: 'Roti is cooked on a tava.', emoji: '⚫', partOfSpeech: 'noun', subgroup: 'Equipment' },
    { hindi: 'चाकू', transliteration: 'chaaku', english: 'knife', exampleHindi: 'तेज़ चाकू से सब्ज़ी जल्दी कटती है।', exampleEnglish: 'A sharp knife cuts vegetables quickly.', emoji: '🔪', partOfSpeech: 'noun', subgroup: 'Equipment' },
    { hindi: 'कूकर', transliteration: 'kookar', english: 'pressure cooker', exampleHindi: 'कूकर में दाल दस मिनट में बनती है।', exampleEnglish: 'Daal is made in ten minutes in the cooker.', emoji: '🍲', partOfSpeech: 'noun', subgroup: 'Equipment' },
    { hindi: 'चम्मच', transliteration: 'chammach', english: 'spoon / ladle', exampleHindi: 'एक बड़ा चम्मच घी डालिए।', exampleEnglish: 'Add one big spoon of ghee.', emoji: '🥄', partOfSpeech: 'noun', subgroup: 'Equipment' },

    // Meal descriptors
    { hindi: 'संतुलित', transliteration: 'santulit', english: 'balanced', exampleHindi: 'संतुलित खाना रोज़ ज़रूरी है।', exampleEnglish: 'Balanced food is necessary every day.', emoji: '⚖️', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'पौष्टिक', transliteration: 'paushtik', english: 'nutritious', exampleHindi: 'दाल-चावल सबसे पौष्टिक भोजन है।', exampleEnglish: 'Daal-rice is the most nutritious meal.', emoji: '💪', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'तैलीय', transliteration: 'taileey', english: 'oily', exampleHindi: 'बाहर का खाना अक्सर तैलीय होता है।', exampleEnglish: 'Food outside is often oily.', emoji: '🫗', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'हल्का', transliteration: 'halka', english: 'light (food)', exampleHindi: 'रात में हल्का खाना अच्छा है।', exampleEnglish: 'Light food at night is good.', emoji: '🥗', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
  ],
  vocabularyNote: {
    why:
      'This is a different 30-word set from L1-12. L1 taught "I ate a thali." L2 teaches "I chopped the onion, sautéed it in ghee with cumin, then added turmeric." Process vocabulary + regional identity words are what let an FCPS Home-Life food prompt reach Benchmark 5 instead of plateauing at 4.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Are there concrete details, or only generic words?"',
  },

  grammar: [
    {
      title: 'Process sequencing: पहले ... फिर ... इसके बाद ... अंत में',
      rule:
        'A cooking essay begs for a four-step sequence. Use पहले for step 1, फिर for step 2, इसके बाद for step 3, and अंत में for the final step. This single scaffold converts a paragraph from "strings of sentences" (B4) to "connected sentences that cannot be rearranged" (B5).',
      examples: [
        { hindi: 'पहले मैंने प्याज़ काटा।', transliteration: 'pahle maine pyaaz kaata.', english: 'First I chopped the onion.' },
        { hindi: 'फिर मैंने उसे घी में भूना।', transliteration: 'phir maine use ghee mein bhoona.', english: 'Then I sautéed it in ghee.' },
        { hindi: 'इसके बाद हल्दी और जीरा डाला।', transliteration: 'iske baad haldi aur jeera daala.', english: 'After this, I added turmeric and cumin.' },
        { hindi: 'अंत में ताज़ा धनिया ऊपर डाल दिया।', transliteration: 'ant mein taaza dhaniya oopar daal diya.', english: 'Finally, I sprinkled fresh coriander on top.' },
      ],
      pitfall:
        'Students often use पहले and फिर twice instead of cycling through four distinct connectors. Raters read that as a thin vocabulary. Use each sequence connector only once per paragraph.',
      whyItMatters:
        'Text-Type Benchmark 5 literally says "sentences cannot be rearranged." A four-step sequence is rearrangement-proof by construction. This is the highest-leverage scaffold in the pack.',
    },
    {
      title: 'Causative verbs: बनवाना / खिलाना / कराना',
      rule:
        'Hindi has a second causative layer: बनाना (to make) → बनवाना (to have someone make it). खाना (to eat) → खिलाना (to feed someone). Use this when an elder had the meal prepared, or fed the family. It is a grammatical structure that almost no Novice-High essay contains.',
      examples: [
        { hindi: 'दादी ने मुझसे रोटी बनवाई।', transliteration: 'daadi ne mujhse roti banvaayi.', english: 'Grandma had me make the roti.' },
        { hindi: 'माँ ने सबको खाना खिलाया।', transliteration: 'maa ne sabko khaana khilaaya.', english: 'Mother fed everyone.' },
        { hindi: 'पिताजी ने बहन से सब्ज़ी कटवाई।', transliteration: 'pitaji ne bahan se sabzi katvaayi.', english: 'Father had my sister chop the vegetables.' },
      ],
      pitfall:
        'Students often say "दादी ने रोटी बनाई" (Grandma made roti) even when they mean "Grandma had me make roti." The direct verb erases the relationship the student is trying to describe.',
      whyItMatters:
        'One correct causative in an essay signals a Language Control level well above Average. Raters notice. This is how Intermediate-Mid distinguishes itself from Intermediate-Low on the same topic.',
    },
    {
      title: 'Comparison: यह उससे ज़्यादा / कम / सबसे ___ है',
      rule:
        'To compare two cuisines or dishes, use ___ से ज़्यादा (more than), ___ से कम (less than), or सबसे (most of all). Adjectives agree in gender with the thing being compared. Comparison is an explicit Text-Type signal for Intermediate-Mid.',
      examples: [
        { hindi: 'पंजाबी खाना दक्षिण भारतीय से ज़्यादा तैलीय है।', transliteration: 'panjaabi khaana dakshin bhaarateey se zyaada taileey hai.', english: 'Punjabi food is oilier than South Indian.' },
        { hindi: 'गुजराती व्यंजन बाकी व्यंजनों से थोड़ा मीठा होता है।', transliteration: 'gujaraati vyanjan baaki vyanjanon se thoda meetha hota hai.', english: 'Gujarati cuisine is slightly sweeter than other cuisines.' },
        { hindi: 'दादी की दाल सबसे स्वादिष्ट है।', transliteration: 'daadi ki daal sabse svaadisht hai.', english: "Grandma's daal is the most delicious of all.", },
      ],
      pitfall:
        'Students drop the से and write "पंजाबी खाना ज़्यादा तैलीय है" — which is grammatically incomplete and reads as "Punjabi food is more oily" (more than what?). The से anchors the comparison.',
      whyItMatters:
        'Comparisons are on every Intermediate-Mid rubric checklist. One clean comparison sentence is worth more than three generic "X अच्छा है" sentences.',
    },
    {
      title: 'Opinion with reason: मुझे लगता है कि ___, क्योंकि ___',
      rule:
        'Never state an opinion bare. Pair मुझे लगता है कि with क्योंकि to give a reason. This two-clause structure is how IM essays earn the "groupings of ideas" rubric phrase.',
      examples: [
        { hindi: 'मुझे लगता है कि घर का खाना सबसे पौष्टिक है, क्योंकि उसमें कम तेल होता है।', transliteration: 'mujhe lagta hai ki ghar ka khaana sabse paushtik hai, kyonki usmen kam tel hota hai.', english: 'I think home-cooked food is most nutritious, because it has less oil.' },
        { hindi: 'मुझे लगता है कि चाट बहुत स्वादिष्ट है, क्योंकि उसमें खट्टा, मीठा, तीखा — सब है।', transliteration: 'mujhe lagta hai ki chaat bahut svaadisht hai, kyonki usmen khatta, meetha, teekha — sab hai.', english: 'I think chaat is very delicious, because it has sour, sweet, and spicy — everything.' },
      ],
      pitfall:
        'Writing a standalone "मुझे दाल पसंद है।" is a Novice-High sentence. Upgrading to "मुझे लगता है कि दाल सबसे अच्छी है, क्योंकि वह पौष्टिक है।" is a Benchmark 5 sentence on the same content.',
      whyItMatters:
        'An opinion + reason pair is the single highest-value sentence shape for IM writing. Put at least one in every essay.',
    },
  ],
  grammarNote: {
    why:
      'These four structures — sequence, causative, comparison, opinion+reason — are the grammar moves that separate an Intermediate-Low food essay from an Intermediate-Mid one. Drill until each comes to hand without thought.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'antMein',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'mujheLagta',
  ]),
  connectorsNote: {
    why:
      'L2 widens from the L1 starter set by adding मुझे लगता है कि — the opinion connector that powers the "groupings of ideas" rubric phrase. Pair any sequence (पहले/फिर/इसके बाद/अंत में) with reasoning (क्योंकि/इसलिए) and at least one opinion clause, and the essay meets Text-Type 5 by structure alone.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'दादी के साथ आलू-गोभी · Aloo-Gobhi with Grandma',
    hindi:
      'पिछले रविवार को मैंने पहली बार दादी के साथ आलू-गोभी बनाई। पहले हमने प्याज़, लहसुन और अदरक काटा। फिर दादी ने कड़ाही में थोड़ा तेल और घी गरम किया। इसके बाद उन्होंने जीरा डाला, और जब जीरा चटका, तब प्याज़ सुनहरा भूना। मैंने बगल में खड़े होकर सब देखा, क्योंकि मैं हर कदम याद रखना चाहता था। उसके बाद उन्होंने हल्दी, नमक, और कटी हुई सब्ज़ी डाली, और धीमी आँच पर पकाई। मुझे लगता है कि दादी का खाना सबसे स्वादिष्ट है, क्योंकि वे हर मसाला सही समय पर डालती हैं। अंत में ताज़ा धनिया ऊपर डाला। जब मैंने पहला चम्मच खाया, तो मेरे मुँह में पानी आ गया। अगले महीने मैं अकेले यह व्यंजन बनाऊँगा।',
    transliteration:
      'pichhle ravivaar ko maine pahli baar daadi ke saath aaloo-gobhi banaayi. pahle humne pyaaz, lahsun aur adrak kaata. phir daadi ne kadhaai mein thoda tel aur ghee garam kiya. iske baad unhonne jeera daala, aur jab jeera chatka, tab pyaaz sunahra bhoona. maine bagal mein khade hokar sab dekha, kyonki main har kadam yaad rakhna chaahta tha. uske baad unhonne haldi, namak, aur kati hui sabzi daali, aur dheemi aanch par pakaayi. mujhe lagta hai ki daadi ka khaana sabse svaadisht hai, kyonki ve har masaala sahi samay par daalti hain. ant mein taaza dhaniya oopar daala. jab maine pahla chammach khaaya, to mere munh mein paani aa gaya. agle mahine main akele yah vyanjan banaoonga.',
    english:
      'Last Sunday, for the first time, I made aloo-gobhi with Grandma. First we chopped the onion, garlic, and ginger. Then Grandma heated a little oil and ghee in the kadhai. After that she added cumin, and when the cumin crackled, she sautéed the onion till golden. I stood beside her and watched everything, because I wanted to remember every step. After that, she added turmeric, salt, and the chopped vegetable, and cooked it on a low flame. I think Grandma\'s food is the most delicious, because she adds every spice at the right time. Finally, she sprinkled fresh coriander on top. When I ate the first spoonful, my mouth watered. Next month I will make this dish on my own.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors, each used exactly once. This scaffold makes the paragraph rearrangement-proof — Text-Type 5.' },
      { term: 'जब जीरा चटका, तब प्याज़ भूना', note: 'जब...तब construction inside a past narrative — a reliable Intermediate-Mid marker.' },
      { term: 'मुझे लगता है कि ... क्योंकि ...', note: 'Opinion + reason pair. This single sentence is worth three generic adjective sentences.' },
      { term: 'हल्दी, नमक, कटी हुई सब्ज़ी', note: 'Concrete ingredient vocabulary. "Spices" is Novice; naming them is IM.' },
      { term: 'पिछले रविवार / अगले महीने ... बनाऊँगा', note: 'Past frame opens, future frame closes — two time shifts in 140 words.' },
    ],
    comprehensionQuestions: [
      { q: 'What did the narrator cook, and with whom?', a: 'आलू-गोभी, दादी के साथ (aloo-gobhi with Grandma).' },
      { q: 'What three things did they chop first?', a: 'प्याज़, लहसुन, और अदरक (onion, garlic, ginger).' },
      { q: 'What went into the kadhai before the cumin?', a: 'तेल और घी (oil and ghee).' },
      { q: 'Why does the narrator think Grandma\'s food is most delicious?', a: 'क्योंकि वे हर मसाला सही समय पर डालती हैं (because she adds every spice at the right time).' },
      { q: 'What went on top of the dish at the end?', a: 'ताज़ा धनिया (fresh coriander).' },
      { q: 'Identify the future-tense sentence and translate it.', a: '"अगले महीने मैं अकेले यह व्यंजन बनाऊँगा" — "Next month I will make this dish on my own."' },
      { q: 'Find one causative or "जब...तब" construction in the passage.', a: 'जब जीरा चटका, तब प्याज़ भूना.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is the target shape for this pack\'s essays: a past-tense cooking narrative with named ingredients, a four-step sequence, one opinion+reason pair, and a future-tense closer. Read it three times, then attempt Prompt 1.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'सप्ताह की रसोई योजना · Weekly Kitchen Plan',
      hindi:
        'सोमवार — दाल, चावल, भिंडी की सब्ज़ी\nमंगलवार — राजमा, रोटी, दही\nबुधवार — दक्षिण भारतीय: सांभर, इडली\nगुरुवार — कढ़ी-चावल, आलू की सब्ज़ी\nशुक्रवार — पंजाबी: छोले, पूरी\nशनिवार — हल्का खाना: खिचड़ी\nरविवार — दादी की पसंदीदा थाली',
      transliteration:
        'somvaar — daal, chaaval, bhindi ki sabzi | mangalvaar — raajma, roti, dahi | budhvaar — dakshin bhaarateey: saambhar, idli | guruvaar — kadhi-chaaval, aaloo ki sabzi | shukravaar — panjaabi: chhole, poori | shanivaar — halka khaana: khichdi | ravivaar — daadi ki pasandeeda thaali',
      english:
        'Monday — daal, rice, bhindi sabzi · Tuesday — rajma, roti, yogurt · Wednesday — South Indian: sambhar, idli · Thursday — kadhi-rice, aloo sabzi · Friday — Punjabi: chole, poori · Saturday — light meal: khichdi · Sunday — Grandma\'s favorite thali',
    },
    {
      kind: 'diary',
      title: 'रसोई में पहला दिन · First Day in the Kitchen',
      hindi:
        'आज मैंने पहली बार अकेले सब्ज़ी बनाई। पहले मैंने प्याज़ काटा, और मेरी आँखों में पानी आ गया। फिर मैंने घी में जीरा डाला, लेकिन थोड़ा जल गया। मुझे लगता है कि अगली बार मैं धीमी आँच रखूँगा। फिर भी माँ ने कहा कि स्वाद अच्छा था।',
      transliteration:
        'aaj maine pahli baar akele sabzi banaayi. pahle maine pyaaz kaata, aur meri aankhon mein paani aa gaya. phir maine ghee mein jeera daala, lekin thoda jal gaya. mujhe lagta hai ki agli baar main dheemi aanch rakhoonga. phir bhi maa ne kaha ki svaad achchha tha.',
      english:
        'Today I made a sabzi on my own for the first time. First I chopped the onion, and my eyes watered. Then I added cumin to the ghee, but it burned a little. I think next time I will keep a lower flame. Still, Mother said the taste was good.',
    },
    {
      kind: 'sms',
      title: 'बहन को संदेश · Message to Sister',
      hindi:
        'दीदी, आप जो बंगाली मछली करी बनाती हैं, उसकी विधि भेजिए न! मैं आज शाम बनाना चाहता हूँ। सरसों का तेल कितना डालना चाहिए? 🐟',
      transliteration:
        'deedi, aap jo bangaali machhli curry banaati hain, uski vidhi bhejiye na! main aaj shaam banaana chaahta hoon. sarson ka tel kitna daalna chaahiye? 🐟',
      english:
        'Didi, please send the recipe for the Bengali fish curry you make! I want to make it this evening. How much mustard oil should I add?',
    },
    {
      kind: 'review',
      title: 'व्यंजन तुलना · Cuisine Comparison',
      hindi:
        'मुझे पंजाबी और गुजराती दोनों व्यंजन पसंद हैं, लेकिन मुझे लगता है कि गुजराती थाली ज़्यादा संतुलित है। पंजाबी खाना स्वादिष्ट तो है, पर उसमें तेल और घी बहुत होता है। इसलिए मैं हफ़्ते में एक बार पंजाबी खाता हूँ, और बाकी दिन हल्का।',
      transliteration:
        'mujhe panjaabi aur gujaraati donon vyanjan pasand hain, lekin mujhe lagta hai ki gujaraati thaali zyaada santulit hai. panjaabi khaana svaadisht to hai, par usmen tel aur ghee bahut hota hai. isliye main hafte mein ek baar panjaabi khaata hoon, aur baaki din halka.',
      english:
        'I like both Punjabi and Gujarati cuisines, but I think the Gujarati thali is more balanced. Punjabi food is delicious, but it has a lot of oil and ghee. So I eat Punjabi once a week, and on other days I eat light.',
    },
  ],
  modelTextsNote: {
    why:
      'A schedule (organizational text), a diary entry (personal narrative), an SMS (casual register), and a comparison review (evaluative) — four registers the student must be able to imitate. Each uses this pack\'s new vocabulary, not L1-12\'s restaurant words.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'The Regional Map of Indian Food',
      body:
        'There is no single "Indian cuisine." Punjab = wheat, ghee, dairy-rich curries (मक्के दी रोटी, सरसों दा साग). South India = rice, coconut, fermented batters (डोसा, इडली, सांभर). Bengal = fish, mustard oil, rice (मछली-भात, शुक्तो). Gujarat = sweet-savory thalis (ढोकला, खांडवी). Naming a region in a food essay is an instant Topic-Coverage lift.',
      emoji: '🗺️',
    },
    {
      title: 'Grandmother\'s Recipes — दादी की विधि',
      body:
        'Indian recipes are rarely written down — they pass mother to daughter, grandmother to grandchild, by watching and repeating. A student who says "मैंने दादी से यह विधि सीखी" signals authentic cultural participation, not textbook knowledge.',
      emoji: '👵',
    },
    {
      title: 'Sunday Family Cooking',
      body:
        'Weekday meals are often rushed. Sundays are when multi-generational families cook together — grandparents sitting at the counter, parents at the stove, children washing and chopping. The kitchen becomes the room where the family actually talks. Referencing this is more specific than "family time."',
      emoji: '👨‍👩‍👧',
    },
    {
      title: 'The Street-Food Universe',
      body:
        'चाट, गोलगप्पे (or पानी पूरी), पाव भाजी, वड़ा पाव, भेल पूरी — street food is its own food culture, with its own vocabulary. "खट्टा-मीठा" (sour-sweet), "चटपटा" (tangy-spicy), "तीखा-मीठा पानी" (spicy-sweet water) describe tastes that home food rarely has. One street-food name in an essay adds instant specificity.',
      emoji: '🥙',
    },
    {
      title: 'Cooking as Bonding — रसोई का रिश्ता',
      body:
        'Elders teach recipes not to document them but to spend time with the next generation. The lesson is never only "how to cook dal" — it is an hour of conversation about family, neighbors, and the past. An essay that captures this adds emotional depth raters reward.',
      emoji: '❤️',
    },
  ],
  culturalNote: {
    why:
      'L1-12 covered thali structure, chai rituals, and festival foods. This pack moves deeper: regional cuisine identity, intergenerational recipe transmission, and the street-food universe. Pick one per essay — never more than one — to keep the narrative focused.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'नमक-मिर्च लगाना',
      literal: 'to apply salt and pepper',
      meaning: 'To exaggerate a story or add spicy details.',
      example: 'वह हर बात में नमक-मिर्च लगाकर बताता है।',
      exampleEnglish: 'He tells every story with salt and pepper added (exaggerated).',
    },
    {
      phrase: 'घी के दिये जलाना',
      literal: 'to light lamps of ghee',
      meaning: 'To celebrate joyfully (when something long-awaited finally happens).',
      example: 'जब बेटा पास हुआ, तो माँ ने घी के दिये जलाए।',
      exampleEnglish: 'When the son passed, Mother lit lamps of ghee (celebrated joyfully).',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms use food/kitchen imagery but are about speech and celebration, not cooking itself. This keeps the muhavara set distinct from L1-12 (दाल में कुछ काला, मुँह में पानी आना) while staying topic-adjacent. One idiom per essay, never two.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt: 'अपने परिवार के किसी बुज़ुर्ग के साथ खाना बनाने के अनुभव को तीन अनुच्छेदों में लिखिए। (In three paragraphs, write about the experience of cooking with an elder in your family.)',
      novice:
        'मैंने दादी के साथ खाना बनाया। खाना अच्छा था। मुझे पसंद है।',
      intermediateMid:
        'पिछले रविवार को दादी ने मुझसे पहली बार आलू-गोभी बनवाई। पहले हमने प्याज़, लहसुन और अदरक काटा। फिर दादी ने कड़ाही में थोड़ा घी गरम किया, और जब घी गरम हुआ, तब जीरा डाला। इसके बाद उन्होंने मुझे प्याज़ भूनने दिया, क्योंकि वे चाहती थीं कि मैं खुद सीखूँ।\n\nजब प्याज़ सुनहरा हुआ, तब हल्दी, नमक और कटी सब्ज़ी डाली। मैंने ध्यान से हर कदम देखा। दादी बीच-बीच में कहतीं, "धीमी आँच रखो, नहीं तो मसाला जल जाएगा।" अंत में ताज़ा धनिया ऊपर डाला। रसोई में खुशबू इतनी अच्छी थी कि मेरे मुँह में पानी आ गया।\n\nमुझे लगता है कि दादी का खाना सबसे स्वादिष्ट है, क्योंकि वे हर मसाला सही समय पर डालती हैं, और साथ में कहानियाँ भी सुनाती हैं। अगले महीने मैं अकेले यह व्यंजन बनाऊँगा, और दादी को खिलाऊँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले रविवार को', note: 'Past frame opens. Specific time marker, not a vague "एक दिन".' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'दादी ने मुझसे ... बनवाई', note: 'Causative बनवाना used correctly — Grandma HAD me make it, not simply made it. Language Control above Average.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... जब ... तब ... इसके बाद', note: 'Five connectors across four sentences. Rearrangement-proof paragraph = Text-Type 5.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'हल्दी, नमक, कटी सब्ज़ी, धनिया', note: 'Four concrete ingredients in one paragraph. Topic Coverage signal.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'धीमी आँच रखो, नहीं तो मसाला जल जाएगा', note: 'Reported speech inside a narrative — very IM-level move.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'मुँह में पानी आ गया', note: 'Food-idiom embedded in the scene, not appended.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... क्योंकि ...', note: 'Opinion + reason pair — the single highest-value IM sentence shape.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... बनाऊँगा ... खिलाऊँगा', note: 'Future tense + causative खिलाना in the closer. Three time frames confirmed.' },
      ],
      wordCount: 148,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'जब... तब', 'इसके बाद', 'क्योंकि', 'अंत में', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three paragraphs, each one cohesive around a phase (setup / cooking / reflection). Sentences inside each cannot be rearranged — Text-Type 5 met.',
          'Causative बनवाना in paragraph 1 and खिलाऊँगा in paragraph 3 are grammatical moves almost no Novice essay contains. Language Control well above Average.',
          'Four specific ingredients (हल्दी, नमक, प्याज़, जीरा) + a cooking verb (भूना) + a region-free but authentic dish (आलू-गोभी) = strong Topic Coverage.',
          'Opinion + reason pair ("मुझे लगता है कि ... क्योंकि ...") provides the "groupings of ideas" rubric phrase in one sentence.',
          'Past (बनवाई, भूना, देखा), present (पसंद है), and future (बनाऊँगा, खिलाऊँगा) all present within 148 words.',
        ],
        gotchas: [
          'If a student writes "दादी ने बनाई" instead of "बनवाई" the causative move is lost and the essay drops toward Intermediate-Low.',
          'Replacing named ingredients with "मसाले" (spices) would collapse Topic Coverage — specificity is the point.',
        ],
      },
    },
    {
      prompt:
        'भारत के किन्हीं दो प्रांतीय व्यंजनों की तुलना कीजिए, और बताइए आप कौन सा ज़्यादा पसंद करते हैं — तीन अनुच्छेदों में। (Compare any two regional cuisines of India, and say which you prefer more — in three paragraphs.)',
      novice:
        'पंजाबी खाना अच्छा है। दक्षिण भारतीय भी अच्छा है। मुझे दोनों पसंद है।',
      intermediateMid:
        'भारत में हर प्रांत का अपना व्यंजन है, लेकिन मेरे परिवार में पंजाबी और दक्षिण भारतीय दोनों पकते हैं। पंजाबी खाने में ज़्यादा घी, मक्खन और मलाई होती है, इसलिए वह भारी और तैलीय लगता है। दक्षिण भारतीय खाने में चावल, नारियल और इमली ज़्यादा होते हैं, इसलिए वह हल्का और संतुलित लगता है।\n\nजब मैं छोटा था, तब हम रविवार को हमेशा छोले-पूरी खाते थे। लेकिन पिछले साल माँ ने डोसा बनाना सीखा, और अब हम हफ़्ते में एक बार डोसा-सांभर भी बनाते हैं। मुझे याद है, पहली बार जब मैंने घर पर बना डोसा खाया, तो मुझे लगा कि इतना कुरकुरा डोसा बाहर भी नहीं मिलता।\n\nमुझे लगता है कि दक्षिण भारतीय खाना पंजाबी से ज़्यादा पौष्टिक है, क्योंकि उसमें तेल कम होता है और सब्ज़ियाँ ज़्यादा। इसके अलावा, डोसा और इडली दोनों बिना तले बनते हैं। फिर भी, सर्दियों में गरम छोले-पूरी से बेहतर कुछ नहीं। अगले महीने मैं खुद इडली का घोल बनाना सीखूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'पंजाबी ... में ज़्यादा घी ... दक्षिण भारतीय में चावल, नारियल', note: 'Direct comparison across two cuisines with specific ingredients. Topic Coverage in one sentence.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए ... इसलिए', note: 'Cause-effect structure used on both sides of the comparison — parallelism.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'जब मैं छोटा था ... पिछले साल ... अब हफ़्ते में एक बार', note: 'Three time references in one paragraph: childhood habit → past event → current routine.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'डोसा-सांभर', note: 'Named South Indian pairing, not generic "दक्षिण भारतीय खाना".' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'दक्षिण भारतीय खाना पंजाबी से ज़्यादा पौष्टिक है', note: 'Textbook comparison form: X से ज़्यादा Y है. Language Control confirmed.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'इसके अलावा ... फिर भी', note: 'Add/contrast pair — two advanced connectors in a single paragraph without overreach.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... सीखूँगा', note: 'Future tense closer — third frame sealed.' },
      ],
      wordCount: 149,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'इसलिए', 'जब... तब', 'क्योंकि', 'इसके अलावा', 'फिर भी', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Opens with a full comparison paragraph using X से ज़्यादा Y है structure correctly on both directions. Text-Type 5 requirement of "grouped ideas" met in the first paragraph itself.',
          'Three time frames handled in one paragraph (childhood → past-year event → current weekly routine) — well beyond "some control of past, present, future" the rubric asks for.',
          'Six different connectors across three paragraphs, including advanced ones (इसके अलावा, फिर भी) used in context, not listed.',
          'Specific foods named on both sides: घी, मक्खन, मलाई (Punjabi) vs चावल, नारियल, इमली, डोसा, सांभर, इडली (South Indian). Topic Coverage High.',
          'Ends with a concrete future commitment ("इडली का घोल बनाना सीखूँगा") — not a generic "मुझे यह पसंद है" closer.',
        ],
        gotchas: [
          'Dropping the से in comparisons ("पंजाबी ज़्यादा भारी है" without से) would reduce Language Control immediately.',
          'If the student writes only "दक्षिण भारतीय खाना अच्छा है" without an ingredient list, Topic Coverage collapses to generic.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two IM-level essays showing the two highest-value patterns this pack trains: a first-person cooking narrative (Essay 1) and a two-cuisine comparison (Essay 2). Together they cover the full grammar set — sequence, causative, opinion, comparison.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने परिवार के किसी सदस्य से कोई एक व्यंजन बनाना सीखने के अनुभव के बारे में तीन अनुच्छेदों में लिखिए। विधि, कठिनाई, और अंत में आपको कैसा लगा — तीनों बताइए।',
      english:
        'Write three paragraphs about learning to cook one dish from a family member. Include the recipe steps, a difficulty, and how you felt at the end.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में', 'क्योंकि'],
        vocab: ['काटना', 'भूनना', 'हल्दी', 'कड़ाही', 'स्वादिष्ट'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'भारत के दो अलग-अलग प्रांतीय व्यंजनों की तुलना कीजिए — आपको कौन सा ज़्यादा पसंद है और क्यों? तीन अनुच्छेदों में लिखिए।',
      english:
        'Compare two different regional cuisines of India — which do you prefer more and why? Write in three paragraphs.',
      hint: {
        connectors: ['लेकिन', 'इसके अलावा', 'मुझे लगता है कि', 'क्योंकि'],
        vocab: ['पंजाबी', 'दक्षिण भारतीय', 'संतुलित', 'तैलीय', 'पौष्टिक'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'सड़क का खाना (चाट, गोलगप्पे, पाव भाजी) घर के खाने से कैसे अलग है? तीन अनुच्छेदों में अपनी राय दीजिए।',
      english:
        'How is street food (chaat, golgappe, pav bhaji) different from home food? Give your opinion in three paragraphs.',
      hint: {
        connectors: ['जबकि', 'क्योंकि', 'इसलिए', 'मुझे लगता है कि'],
        vocab: ['चाट', 'गोलगप्पे', 'तैलीय', 'हल्का', 'स्वादिष्ट'],
        tenses: ['present', 'past'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 trains the cooking narrative (Essay 1 pattern). Prompt 2 trains regional comparison (Essay 2 pattern). Prompt 3 pushes comparison further into the street-food vs home-food space. All three require at least two time frames and an opinion.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay you write here. If you cannot point to a causative, a comparison, an opinion+reason pair, AND a sequence chain in your essay, it is not yet Benchmark 5. Add what is missing before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
