import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L1-03 · My Family · मेरा परिवार
// The single most predictable FCPS essay prompt. This pack is the student's
// first full IM-target pack: it trains possessive agreement, respectful
// plural verbs for elders, and the past/present/future triangle the rubric
// rewards at Benchmark 5.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-03-family',
  level: 1,
  themeGroup: 'Identity',
  order: 3,
  heroMotif: 'family',
  titleHindi: 'मेरा परिवार',
  titleEnglish: 'My Family',
  hook: "FCPS's single most predictable essay topic - and a natural playground for past, present, and future tense.",
  heroPrompt: composeHeroPrompt(
    'A multi-generational Indian family silhouetted around a courtyard at dusk - grandparents seated on a charpai, parents standing near a tulsi plant, two children running with a kite, brass lamps lit, warm indigo sky',
  ),

  rationale: {
    fcpsSubTopics: [
      'Family Members (FCPS Level 1 - Personal & Family Life)',
      'Describing People (FCPS Level 1 - Personal Identification)',
      'Daily Routines with family (FCPS Level 1 - Home Life bridge)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Name every immediate and extended family relation in Hindi without looking them up',
      'Describe each family member with a gender-agreeing adjective (प्यारी माँ, मेहनती पिताजी)',
      'Use respectful plural verb forms for elders (पिताजी जाते हैं, not जाता है)',
      'Write a 3-paragraph family essay using past, present, and future tenses',
      'Add at least one cultural specific (joint family, जी suffix, respect custom) to lift Topic Coverage',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Family appears on virtually every FCPS writing and speaking prompt set - "describe your family," "a family memory," "a family celebration." Skipping this pack leaves the student without the possessive patterns (मेरा/मेरी/मेरे) and respectful verb forms those prompts demand. The student will write about food or school well but freeze on the family prompt.',
  },

  objectives: [
    {
      text: 'Name at least 12 family relations in Hindi - immediate and extended - without hesitation.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Use मेरा / मेरी / मेरे correctly based on the gender and number of the family noun that follows.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Use respectful plural verb forms (हैं, करते हैं, जाते हैं) for parents and grandparents throughout the essay.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Write a 3-paragraph family essay that uses past (childhood memory), present (daily life), AND future (plans together).',
      trains: ['TextType'],
    },
    {
      text: 'Include at least one India-rooted cultural specific - joint family, जी suffix, foot-touching, a shared festival - to lift Topic Coverage above generic responses.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Immediate family
    { hindi: 'परिवार', transliteration: 'parivaar', english: 'family', exampleHindi: 'मेरा परिवार छोटा है।', exampleEnglish: 'My family is small.', emoji: '👨‍👩‍👧‍👦', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'पिताजी', transliteration: 'pitaji', english: 'father (respectful)', exampleHindi: 'मेरे पिताजी डॉक्टर हैं।', exampleEnglish: 'My father is a doctor.', emoji: '👨', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'माँ', transliteration: 'maa', english: 'mother', exampleHindi: 'मेरी माँ बहुत प्यारी हैं।', exampleEnglish: 'My mother is very loving.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'माताजी', transliteration: 'mataji', english: 'mother (respectful)', exampleHindi: 'माताजी रसोई में हैं।', exampleEnglish: 'Mother is in the kitchen.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'भाई', transliteration: 'bhai', english: 'brother', exampleHindi: 'मेरा भाई मुझसे बड़ा है।', exampleEnglish: 'My brother is older than me.', emoji: '👦', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'बहन', transliteration: 'bahan', english: 'sister', exampleHindi: 'मेरी बहन स्कूल जाती है।', exampleEnglish: 'My sister goes to school.', emoji: '👧', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'बेटा', transliteration: 'beta', english: 'son', exampleHindi: 'वह अपने माँ-बाप का इकलौता बेटा है।', exampleEnglish: 'He is his parents\' only son.', emoji: '👦', partOfSpeech: 'noun', subgroup: 'Immediate family' },
    { hindi: 'बेटी', transliteration: 'beti', english: 'daughter', exampleHindi: 'मेरी चाची की एक बेटी है।', exampleEnglish: 'My aunt has one daughter.', emoji: '👧', partOfSpeech: 'noun', subgroup: 'Immediate family' },

    // Grandparents
    { hindi: 'दादा', transliteration: 'dada', english: 'paternal grandfather', exampleHindi: 'मेरे दादा कहानियाँ सुनाते हैं।', exampleEnglish: 'My grandfather tells stories.', emoji: '👴', partOfSpeech: 'noun', subgroup: 'Grandparents' },
    { hindi: 'दादी', transliteration: 'dadi', english: 'paternal grandmother', exampleHindi: 'मेरी दादी बहुत स्वादिष्ट खाना बनाती हैं।', exampleEnglish: 'My grandmother cooks very delicious food.', emoji: '👵', partOfSpeech: 'noun', subgroup: 'Grandparents' },
    { hindi: 'नाना', transliteration: 'nana', english: 'maternal grandfather', exampleHindi: 'मेरे नाना गाँव में रहते हैं।', exampleEnglish: 'My maternal grandfather lives in the village.', emoji: '👴', partOfSpeech: 'noun', subgroup: 'Grandparents' },
    { hindi: 'नानी', transliteration: 'nani', english: 'maternal grandmother', exampleHindi: 'मुझे अपनी नानी की याद आती है।', exampleEnglish: 'I miss my maternal grandmother.', emoji: '👵', partOfSpeech: 'noun', subgroup: 'Grandparents' },

    // Extended family
    { hindi: 'चाचा', transliteration: 'chacha', english: "father's younger brother", exampleHindi: 'मेरे चाचा दिल्ली में काम करते हैं।', exampleEnglish: 'My uncle works in Delhi.', emoji: '🧔', partOfSpeech: 'noun', subgroup: 'Extended family' },
    { hindi: 'चाची', transliteration: 'chachi', english: "chacha's wife", exampleHindi: 'चाची हमारे घर आ रही हैं।', exampleEnglish: 'Aunt is coming to our house.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Extended family' },
    { hindi: 'मामा', transliteration: 'mama', english: "mother's brother", exampleHindi: 'मेरे मामा हर गर्मी में आते हैं।', exampleEnglish: 'My maternal uncle visits every summer.', emoji: '🧔', partOfSpeech: 'noun', subgroup: 'Extended family' },
    { hindi: 'मामी', transliteration: 'mami', english: "mama's wife", exampleHindi: 'मामी मुझे बहुत प्यार करती हैं।', exampleEnglish: 'Aunt loves me very much.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Extended family' },
    { hindi: 'बुआ', transliteration: 'bua', english: "father's sister", exampleHindi: 'बुआ हर रक्षाबंधन पर आती हैं।', exampleEnglish: 'Father\'s sister comes every Raksha Bandhan.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Extended family' },
    { hindi: 'मौसी', transliteration: 'mausi', english: "mother's sister", exampleHindi: 'मौसी के दो बच्चे हैं।', exampleEnglish: 'My aunt has two children.', emoji: '👩', partOfSpeech: 'noun', subgroup: 'Extended family' },

    // Descriptive adjectives
    { hindi: 'प्यारा', transliteration: 'pyaara', english: 'loving / dear', exampleHindi: 'मेरा भाई बहुत प्यारा है।', exampleEnglish: 'My brother is very dear.', emoji: '❤️', partOfSpeech: 'adjective', subgroup: 'Descriptions' },
    { hindi: 'मेहनती', transliteration: 'mehnati', english: 'hard-working', exampleHindi: 'मेरे पिताजी बहुत मेहनती हैं।', exampleEnglish: 'My father is very hard-working.', emoji: '💪', partOfSpeech: 'adjective', subgroup: 'Descriptions' },
    { hindi: 'शांत', transliteration: 'shaant', english: 'calm / quiet', exampleHindi: 'मेरी बहन स्वभाव से शांत है।', exampleEnglish: 'My sister is calm by nature.', emoji: '😌', partOfSpeech: 'adjective', subgroup: 'Descriptions' },
    { hindi: 'मज़ाकिया', transliteration: 'mazaakiya', english: 'funny / humorous', exampleHindi: 'मेरे चाचा बहुत मज़ाकिया हैं।', exampleEnglish: 'My uncle is very funny.', emoji: '😂', partOfSpeech: 'adjective', subgroup: 'Descriptions' },
    { hindi: 'बुज़ुर्ग', transliteration: 'buzurg', english: 'elderly / elder', exampleHindi: 'हमें बुज़ुर्गों का सम्मान करना चाहिए।', exampleEnglish: 'We should respect elders.', emoji: '🧓', partOfSpeech: 'noun', subgroup: 'Descriptions' },
    { hindi: 'इकलौता', transliteration: 'iklauta', english: 'only (child)', exampleHindi: 'मैं अपने माँ-बाप का इकलौता बेटा हूँ।', exampleEnglish: 'I am my parents\' only son.', emoji: '1️⃣', partOfSpeech: 'adjective', subgroup: 'Descriptions' },

    // Verbs & relationships
    { hindi: 'रहना', transliteration: 'rahna', english: 'to live / stay', exampleHindi: 'हम सब एक ही घर में रहते हैं।', exampleEnglish: 'We all live in the same house.', emoji: '🏠', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'प्यार करना', transliteration: 'pyaar karna', english: 'to love', exampleHindi: 'मेरी माँ मुझसे बहुत प्यार करती हैं।', exampleEnglish: 'My mother loves me very much.', emoji: '💗', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'सम्मान करना', transliteration: 'sammaan karna', english: 'to respect', exampleHindi: 'मैं अपने बुज़ुर्गों का सम्मान करता हूँ।', exampleEnglish: 'I respect my elders.', emoji: '🙏', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'मिलना', transliteration: 'milna', english: 'to meet', exampleHindi: 'हम हर रविवार दादी से मिलते हैं।', exampleEnglish: 'We meet Grandmother every Sunday.', emoji: '🤝', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'संयुक्त परिवार', transliteration: 'sanyukt parivaar', english: 'joint family', exampleHindi: 'हम एक संयुक्त परिवार में रहते हैं।', exampleEnglish: 'We live in a joint family.', emoji: '🏡', partOfSpeech: 'phrase', subgroup: 'Relationships' },
  ],
  vocabularyNote: {
    why:
      'These 30 words are the narrow set FCPS family prompts pull from. Immediate family first (always needed), then grandparents (rich past-tense material), then extended family (the "joint family" cultural angle), then a handful of descriptive adjectives the student will actually reach for when the prompt says "describe your mother." Learn this list and a family essay becomes a fill-in-the-blank exercise.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Possessive agreement: मेरा / मेरी / मेरे',
      rule:
        'The possessive "my" changes to agree with the noun it modifies. मेरा = masculine singular (मेरा भाई), मेरी = feminine singular or plural (मेरी बहन, मेरी बहनें), मेरे = masculine plural OR when you use a respectful plural for an elder (मेरे पिताजी, मेरे दादाजी). Same pattern for तेरा/तेरी/तेरे, हमारा/हमारी/हमारे, उसका/उसकी/उसके.',
      examples: [
        { hindi: 'मेरा भाई दस साल का है।', transliteration: 'mera bhai das saal ka hai.', english: 'My brother is ten years old. (masculine singular)' },
        { hindi: 'मेरी बहन आठ साल की है।', transliteration: 'meri bahan aath saal ki hai.', english: 'My sister is eight years old. (feminine singular)' },
        { hindi: 'मेरे पिताजी इंजीनियर हैं।', transliteration: 'mere pitaji injeeniyar hain.', english: 'My father is an engineer. (respectful plural → मेरे, not मेरा)' },
      ],
      pitfall:
        'Writing "मेरा पिताजी" (masculine singular) is the single most common error on family essays. पिताजी takes the respectful plural, so it is मेरे पिताजी - always. Same for मेरी माँ (feminine) never "मेरा माँ".',
      whyItMatters:
        'Possessive agreement shows up in almost every sentence of a family essay. Consistent correctness here lifts Language Control to "Average" or higher; consistent errors cap it at "Low" and drop the essay to Intermediate-Low (2 credits).',
    },
    {
      title: 'Respectful plural verbs for elders',
      rule:
        'When writing about parents, grandparents, or any elder, Hindi uses a plural verb even though the subject is one person. पिताजी जाते हैं (not जाता है), माँ कहती हैं (not कहती है), दादाजी हमें प्यार करते हैं. This is called the "honorific plural" or आदरार्थक बहुवचन.',
      examples: [
        { hindi: 'मेरे पिताजी हर सुबह अख़बार पढ़ते हैं।', transliteration: 'mere pitaji har subah akhbaar padhte hain.', english: 'My father reads the newspaper every morning. (singular man, plural verb)' },
        { hindi: 'दादी हमें हर रात कहानी सुनाती हैं।', transliteration: 'daadi hamein har raat kahaani sunaati hain.', english: 'Grandmother tells us a story every night.' },
        { hindi: 'माँ ने आज खीर बनाई।', transliteration: 'maa ne aaj kheer banaayi.', english: 'Mother made kheer today. (object-based agreement in past; subject still honored through context)' },
      ],
      pitfall:
        'Writing "पिताजी जाता है" sounds instantly wrong to a Hindi reader - like saying "my father goes, yo." It signals the student does not know register. Raters read this as a Language Control slip AND a cultural mismatch.',
      whyItMatters:
        'The honorific plural is a register signal. When a rater sees three elders referred to with correct plural verbs in one essay, they mentally log "uses target-language norms" - a Text-Type lift on top of Language Control. Two features for the price of one rule.',
    },
    {
      title: 'Three time frames in a family essay',
      rule:
        'Intermediate-Mid requires "some control of past, present, and future." A family essay lends itself naturally: past (a memory with a grandparent), present (what the family does daily), future (plans together). Use time markers - बचपन में (in childhood), आजकल (these days), अगले साल (next year) - to signal each shift.',
      examples: [
        { hindi: 'बचपन में मैं अपने नाना के साथ खेलता था।', transliteration: 'bachpan mein main apne naana ke saath khelta tha.', english: 'In childhood I used to play with my maternal grandfather. (past habitual)' },
        { hindi: 'आजकल हम सब साथ खाना खाते हैं।', transliteration: 'aajkal hum sab saath khaana khaate hain.', english: 'These days we all eat together. (present)' },
        { hindi: 'अगले साल हम सब गाँव जाएँगे।', transliteration: 'agle saal hum sab gaanv jaayenge.', english: 'Next year we all will go to the village. (future)' },
      ],
      pitfall:
        'Writing the entire essay in present tense ("My father is... My mother is... My sister is...") caps the essay at Novice-High no matter how rich the vocabulary. One past sentence and one future sentence move it two rubric boxes up.',
      whyItMatters:
        'Tense variety is the fastest route from Benchmark 3 (1 credit) to Benchmark 5 (3 credits). The rubric literally names the three time frames in its Intermediate-Mid descriptor. A family essay is the easiest place to hit all three.',
    },
  ],
  grammarNote: {
    why:
      'These three rules - possessive agreement, honorific plural for elders, and three time frames - together fix about 85% of the errors I see on family essays. Nail them and the rubric\'s Language Control dimension stabilizes at "Average," which combined with even moderate vocabulary is enough for Intermediate-Mid.',
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
    'jabTab',
  ]),
  connectorsNote: {
    why:
      'Family essays are naturally temporal - "first we do X, then Y, finally Z." The sequence पहले / फिर / इसके बाद / अंत में scaffolds a full day or a full event. क्योंकि and इसलिए add the "why we love them" the rubric rewards; जब... तब is the go-to for pulling in a childhood memory ("when I was small, grandfather used to...").',
    trains: ['TextType'],
  },

  anchor: {
    title: 'रविवार की शाम · A Sunday Evening',
    hindi:
      'हमारा परिवार बड़ा है और हम सब एक ही घर में रहते हैं। मेरे पिताजी बैंक में काम करते हैं और मेरी माँ एक स्कूल में हिंदी पढ़ाती हैं। मेरे दादा और दादी भी हमारे साथ रहते हैं, इसलिए हमारा घर हमेशा भरा-भरा रहता है। हर रविवार की शाम को हम सब आँगन में बैठते हैं। पहले दादी चाय बनाती हैं और बिस्कुट लाती हैं। फिर पिताजी हम बच्चों को पुरानी कहानियाँ सुनाते हैं। मेरी छोटी बहन दादा के पास बैठती है, क्योंकि वह दादा की सबसे प्यारी है। अंत में माँ गाना गाती हैं और हम सब हँसते हैं। मुझे लगता है कि मेरा परिवार ही मेरी सबसे बड़ी ख़ुशी है।',
    transliteration:
      'hamaara parivaar bada hai aur hum sab ek hi ghar mein rahte hain. mere pitaji bank mein kaam karte hain aur meri maa ek school mein hindi padhaati hain. mere dada aur daadi bhi hamaare saath rahte hain, isliye hamaara ghar hamesha bhara-bhara rahta hai. har ravivaar ki shaam ko hum sab aangan mein baithte hain. pahle daadi chaay banaati hain aur biscuit laati hain. phir pitaji hum bachchon ko puraani kahaaniyaan sunaate hain. meri chhoti bahan dada ke paas baithti hai, kyonki vah dada ki sabse pyaari hai. ant mein maa gaana gaati hain aur hum sab hansate hain. mujhe lagta hai ki mera parivaar hi meri sabse badi khushi hai.',
    english:
      "Our family is big and we all live in one house. My father works at a bank and my mother teaches Hindi at a school. My grandfather and grandmother also live with us, so our house is always full. Every Sunday evening, we all sit in the courtyard. First, Grandmother makes tea and brings biscuits. Then Father tells us children old stories. My younger sister sits next to Grandfather, because she is his most beloved. Finally Mother sings a song and we all laugh. I think my family is my greatest happiness.",
    highlights: [
      { term: 'मेरे पिताजी / मेरी माँ / मेरे दादा', note: 'Four possessives in four sentences, each agreeing correctly. This is the single most important pattern in a family essay.' },
      { term: 'काम करते हैं / पढ़ाती हैं / रहते हैं', note: 'Respectful plural verbs for every elder. Never जाता है for पिताजी.' },
      { term: 'पहले / फिर / अंत में / क्योंकि / इसलिए', note: 'Five connectors scaffold the paragraph. Sentences cannot be rearranged - that is Text-Type 5.' },
      { term: 'आँगन / दादी की चाय / पुरानी कहानियाँ', note: 'Concrete cultural details - not "we sit and talk" but a specific courtyard scene.' },
      { term: 'मेरा परिवार ही मेरी सबसे बड़ी ख़ुशी है', note: 'Reflective closing. Intermediate-Mid essays almost always generalize beyond the event in the last sentence.' },
    ],
    comprehensionQuestions: [
      { q: 'How many people live in the narrator\'s house, roughly?', a: 'At least six - parents, grandparents, narrator, and younger sister. A joint family.' },
      { q: 'What do the parents do for work?', a: 'पिताजी काम बैंक में करते हैं; माँ एक स्कूल में हिंदी पढ़ाती हैं।' },
      { q: 'What happens on Sunday evenings?', a: 'सब आँगन में बैठते हैं - दादी चाय बनाती हैं, पिताजी कहानियाँ सुनाते हैं, माँ गाना गाती हैं।' },
      { q: 'Why does the younger sister sit with Grandfather?', a: 'क्योंकि वह दादा की सबसे प्यारी है।' },
      { q: 'Identify two connectors in the passage and explain what each does.', a: 'पहले / फिर / अंत में sequence the evening; क्योंकि gives a reason; इसलिए gives a consequence.' },
      { q: 'Find one respectful plural verb and its singular subject.', a: 'Any of पिताजी काम करते हैं, माँ पढ़ाती हैं, दादा-दादी रहते हैं, माँ गाती हैं - each is one person with a plural verb.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a model of what a passing Intermediate-Mid family essay sounds like. The student\'s OUTPUT should mirror this INPUT. Read it aloud three times before attempting a prompt - the possessive patterns and respectful verb forms will start to feel automatic. Notice that every single elder in the passage gets a plural verb.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'diary',
      title: 'मेरी डायरी का एक पन्ना · A Page From My Diary',
      hindi:
        'आज दादी का जन्मदिन था। सुबह से माँ रसोई में थीं और पिताजी फूल लाए। शाम को पूरा परिवार आया - चाचा, चाची, बुआ, सब। दादी बहुत खुश हुईं। मैंने उन्हें एक कार्ड दिया जिस पर मैंने "आप सबसे प्यारी हैं" लिखा था।',
      transliteration:
        'aaj daadi ka janmadin tha. subah se maa rasoi mein theen aur pitaji phool laaye. shaam ko poora parivaar aaya - chacha, chachi, bua, sab. daadi bahut khush hueen. maine unhen ek card diya jis par maine "aap sabse pyaari hain" likha tha.',
      english:
        "Today was Grandmother's birthday. From morning Mother was in the kitchen and Father brought flowers. In the evening the whole family came - uncle, aunt, father's sister, everyone. Grandmother was very happy. I gave her a card on which I had written \"You are the dearest of all.\"",
    },
    {
      kind: 'sms',
      title: 'भाई को संदेश · Message to a Brother',
      hindi:
        'भैया, कल मामा-मामी आ रहे हैं 🎉 माँ कह रही हैं कि तुम समय पर घर आ जाओ। दादी ने पूछा कि तुम्हें कौन-सी मिठाई पसंद है। जल्दी जवाब दो!',
      transliteration:
        'bhaiya, kal mama-mami aa rahe hain. maa kah rahi hain ki tum samay par ghar aa jaao. daadi ne poochha ki tumhein kaun-si mithaai pasand hai. jaldi javaab do!',
      english:
        'Bro, uncle and aunt are coming tomorrow. Mom is saying you should come home on time. Grandma asked which sweet you like. Reply quickly!',
    },
    {
      kind: 'letter',
      title: 'नानी को पत्र · Letter to Grandmother',
      hindi:
        'प्यारी नानी जी,\nप्रणाम। आशा है आप स्वस्थ हैं। यहाँ सब ठीक हैं। मैं पढ़ाई में मेहनत कर रहा हूँ। गर्मी की छुट्टियों में मैं ज़रूर आपसे मिलने आऊँगा। आपकी बनाई हुई खीर की याद आती है।\nआपका प्यारा पोता,\nआर्यन',
      transliteration:
        'pyaari nani ji, pranaam. aasha hai aap svasth hain. yahaan sab theek hain. main padhai mein mehnat kar raha hoon. garmi ki chhuttiyon mein main zaroor aapse milne aaoonga. aapki banaayi hui kheer ki yaad aati hai. aapka pyaara pota, aryan.',
      english:
        "Dear Nani ji, Pranaam. I hope you are well. Everyone here is fine. I am working hard at my studies. In the summer holidays I will definitely come to meet you. I miss the kheer you make. Your loving grandson, Aryan.",
    },
    {
      kind: 'announcement',
      title: 'पारिवारिक समारोह · Family Gathering Announcement',
      hindi:
        'सूचना: अगले शनिवार को शाम छह बजे हमारे घर पर दादा-दादी की पचासवीं सालगिरह है। सभी रिश्तेदारों से अनुरोध है कि समय पर पहुँचें। खाने में थाली और मिठाई होगी। कृपया तोहफ़े न लाएँ - आपकी उपस्थिति ही काफ़ी है।',
      transliteration:
        'soochana: agle shanivaar ko shaam chhah baje hamaare ghar par dada-daadi ki pachaasvin saalgirah hai. sabhi rishtedaaron se anurodh hai ki samay par pahunchen. khaane mein thaali aur mithaai hogi. kripaya tohfe na laayen - aapki upasthiti hi kaafi hai.',
      english:
        "Notice: Next Saturday at 6 PM our grandparents' 50th anniversary will be celebrated at our home. All relatives are requested to arrive on time. Thali and sweets will be served. Please do not bring gifts - your presence is enough.",
    },
  ],
  modelTextsNote: {
    why:
      'Diary, SMS, letter, announcement - four different registers around one topic. The student sees that Hindi does not sound the same when writing to a grandmother (formal, with जी) versus a brother (casual, with emojis). Register awareness is a Text-Type signal on its own.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Joint Families (संयुक्त परिवार)',
      body:
        'Many Indian households include grandparents, parents, children, and sometimes an uncle\'s family under one roof. Writing "हम एक संयुक्त परिवार में रहते हैं" instantly gives you six people to describe - a Topic-Coverage goldmine the nuclear-family framing cannot match.',
      emoji: '🏡',
    },
    {
      title: 'The जी Suffix of Respect',
      body:
        'Adding जी after a name or relation term (दादी जी, पिताजी, नानी जी) is a small word with big rubric weight. It signals register awareness in one character. Use it consistently for elders, never for peers.',
      emoji: '🙏',
    },
    {
      title: 'आप vs तुम vs तू',
      body:
        'Three levels of "you": आप for elders and strangers (respect), तुम for siblings and friends (peer), तू for very close friends or small children (intimate). Using आप with पिताजी and तुम with a brother in the same essay shows control. Mixing them randomly drops Language Control fast.',
      emoji: '🗣️',
    },
    {
      title: 'Foot-Touching (पैर छूना)',
      body:
        'Touching an elder\'s feet on arrival or before a big moment (exam, journey, festival) is a common Indian gesture of respect. Dropping one sentence - "मैंने पिताजी के पैर छुए" - reads as real cultural knowledge, not a textbook phrase.',
      emoji: '🦶',
    },
    {
      title: 'Raksha Bandhan & Sibling Bonds',
      body:
        'On Raksha Bandhan, a sister ties a rakhi on her brother\'s wrist; he promises to protect her and gives her a gift. Mentioning this festival is one of the fastest ways to tie a sibling into a family essay with specific cultural texture.',
      emoji: '🎗️',
    },
  ],
  culturalNote: {
    why:
      'FCPS raters have seen hundreds of "I love my mother, she is good" essays. A concrete cultural detail - the joint family, the जी suffix, the foot-touching, a festival - instantly separates the essay from the pile. That is a pure Text-Type + Topic-Coverage boost at no grammar cost.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'ख़ून का रिश्ता',
      literal: 'relationship of blood',
      meaning: 'A blood relation; a bond of family that cannot be broken.',
      example: 'भाई और बहन का ख़ून का रिश्ता सबसे गहरा होता है।',
      exampleEnglish: 'The blood bond between a brother and sister is the deepest.',
    },
    {
      phrase: 'आँखों का तारा',
      literal: 'the star of the eyes',
      meaning: "One's most beloved person; the apple of one's eye.",
      example: 'मेरी छोटी बहन मेरी दादी की आँखों का तारा है।',
      exampleEnglish: "My little sister is the apple of my grandmother's eye.",
    },
  ],
  muhavareNote: {
    why:
      'Family-rooted idioms are a perfect fit for family essays. One idiom placed mid-paragraph reads as register mastery. Two is overkill in a 125-word essay - pick the one that fits the sentence and let it land.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Family portrait',
      prompt: 'अपने परिवार के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपके परिवार में कौन-कौन है, आप साथ क्या करते हैं, और आगे आप क्या करना चाहेंगे। (Write three paragraphs about your family. Describe who is in your family, what you do together, and what you would like to do in the future.)',
      novice: 'मेरा परिवार अच्छा है। मेरी माँ है। मेरे पिताजी हैं।',
      intermediateMid:
        'मेरा परिवार एक संयुक्त परिवार है। मेरे पिताजी एक अस्पताल में डॉक्टर हैं और मेरी माँ एक शिक्षिका हैं। मेरे दादा और दादी भी हमारे साथ रहते हैं, इसलिए हमारा घर हमेशा कहानियों और हँसी से भरा रहता है। मेरी एक छोटी बहन भी है जिसका नाम रिया है। वह बहुत शांत और प्यारी है।\n\nबचपन में दादाजी मुझे हर रात पुरानी कहानियाँ सुनाते थे और दादी मेरे लिए गरम खीर बनाती थीं। आजकल हम सब रविवार को साथ खाना खाते हैं, क्योंकि हफ़्ते में वही एक दिन होता है जब सब घर पर होते हैं। पिताजी को तीखा खाना पसंद है, लेकिन दादी को हल्का खाना अच्छा लगता है, इसलिए माँ दो तरह की सब्ज़ी बनाती हैं।\n\nअगली गर्मी की छुट्टियों में हम सब गाँव जाएँगे, जहाँ मेरे नाना-नानी रहते हैं। मुझे लगता है कि मेरा परिवार सिर्फ़ मेरा घर नहीं, बल्कि मेरी सबसे बड़ी ताक़त भी है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'संयुक्त परिवार', note: 'Cultural-specific phrase in sentence one - instant Topic-Coverage lift.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'मेरे पिताजी ... हैं / मेरी माँ ... हैं / मेरे दादा ... रहते हैं', note: 'Three possessives agreeing correctly and three respectful plural verbs in one paragraph.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए', note: 'Consequence connector ties the living arrangement to the "full house" image.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'बचपन में ... सुनाते थे / आजकल ... खाते हैं', note: 'Past habitual beside present habitual with explicit time markers - textbook IM move.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि / लेकिन / इसलिए', note: 'Three reasoning connectors in one paragraph. Text-Type 5 confirmed.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादी की खीर / माँ दो तरह की सब्ज़ी', note: 'Specific family customs, not generic "we eat food."' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगली गर्मी की छुट्टियों में ... जाएँगे', note: 'Future frame arrives in closing - past + present + future triangle complete.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: 'Not-only-but-also construction - an Intermediate-Mid hallmark.' },
      ],
      wordCount: 149,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['इसलिए', 'क्योंकि', 'लेकिन', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs that cannot be rearranged - past memory, present routine, future plan - meets the Text-Type 5 structural requirement.',
          'Uses past habitual (सुनाते थे, बनाती थीं), present (रहते हैं, खाते हैं), and future (जाएँगे) in 133 words - satisfies "some control of major time frames" for Intermediate-Mid.',
          'Possessive agreement is clean across seven family nouns: मेरे पिताजी, मेरी माँ, मेरे दादा, मेरी दादी, मेरी बहन, मेरे नाना-नानी. Language Control stabilizes at Average or High.',
          'Every elder gets a respectful plural verb - पिताजी हैं, माँ हैं, दादा-दादी रहते हैं, दादाजी सुनाते थे. Register mastery signal.',
          'Concrete cultural detail (संयुक्त परिवार, दादी की खीर, गाँव में नाना-नानी) lifts Topic Coverage above generic "I love my family" responses.',
        ],
        gotchas: [
          'If the student writes "मेरा पिताजी" instead of "मेरे पिताजी," Language Control drops a full band in a single word.',
          'Using "जाता है" for पिताजी or माँ reads as a register break and a grammar error at once.',
          'A one-paragraph version of the same content drops to Benchmark 4 despite identical vocabulary - keep the three-paragraph shape.',
        ],
      },
    },
    {
      shortLabel: 'A family day',
      prompt:
        'अपने परिवार के किसी एक यादगार दिन के बारे में तीन अनुच्छेदों में लिखिए - क्या हुआ, आपको कैसा लगा, और आप उस दिन को फिर से क्यों जीना चाहेंगे। (In three paragraphs, describe one memorable day with your family - what happened, how you felt, and why you would like to relive it.)',
      novice: 'एक दिन हम गाँव गए। सब अच्छा था। हम ख़ुश थे।',
      intermediateMid:
        'पिछली दिवाली का दिन मेरे परिवार का सबसे यादगार दिन था। उस सुबह माँ और दादी ने मिलकर रंगोली बनाई और पिताजी ने पूरे घर में दीये लगाए। मेरी छोटी बहन रिया ने नए कपड़े पहने और दादी के पैर छुए, क्योंकि हमारे परिवार में यही परंपरा है।\n\nशाम को चाचा, चाची और मेरी बुआ भी आ गए। जब सब लोग आँगन में इकट्ठा हुए, तब दादाजी ने एक पुरानी कहानी सुनाई और हम सब हँसते रहे। माँ ने थाली में खीर, पूरी और आलू की सब्ज़ी परोसी। मेरी बहन ने सबसे पहले मिठाई उठा ली, और उसे देखकर मेरी दादी की आँखों में आँसू आ गए - ख़ुशी के आँसू।\n\nमुझे लगता है कि अगले साल भी हम सब इसी तरह साथ मिलेंगे, क्योंकि मेरा परिवार ही मेरी असली दिवाली है। अगर मुझे एक दिन फिर से जीना हो, तो मैं वही शाम दोबारा चुनूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछली दिवाली का दिन', note: 'Opens in past tense with a specific time marker - anchors the frame.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'रंगोली / दीये / दादी के पैर छुए', note: 'Three India-rooted details in one paragraph - this is what separates a Benchmark 5 essay from a Benchmark 3 one.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि', note: 'Causal connector ties the foot-touching to a family tradition - not a random detail.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'जब ... तब ... सुनाई / हँसते रहे', note: 'When-then construction plus a past continuous - raters love this pattern.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'आँखों में आँसू आ गए', note: 'Idiomatic expression placed inside the narrative, not tacked on.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'खीर, पूरी, आलू की सब्ज़ी', note: 'Three specific food items - Topic Coverage lift even in a family essay.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल ... मिलेंगे / अगर ... तो ... चुनूँगा', note: 'Future plus conditional future in the closing - third time frame sealed cleanly.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मेरा परिवार ही मेरी असली दिवाली है', note: 'Reflective metaphorical closing - Text-Type lift.' },
      ],
      wordCount: 145,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'जब... तब', 'अगर... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Rich cultural texture (Diwali, rangoli, diyas, foot-touching, khir-puri) gives the rater specific nouns to tick off on the Topic-Coverage axis.',
          'Three time frames land cleanly: past narrative (बनाई, लगाए, सुनाई), present reflection (मेरा परिवार ही मेरी असली दिवाली है), and future conditional (मिलेंगे, चुनूँगा).',
          'Idiom आँखों में आँसू आ गए is embedded mid-narrative, not appended - this is how Intermediate-Mid writers use idioms.',
          'Respectful plural verbs sustained across दादा, दादी, पिताजी, माँ. Language Control signal is strong.',
          'Reflective closing ("अगर मुझे एक दिन फिर से जीना हो, तो मैं वही शाम दोबारा चुनूँगा") generalizes beyond the event - a hallmark of Benchmark 5.',
        ],
        gotchas: [
          'If the student writes "दादा ने पैर छुए" (grandfather touched feet, reversed direction), the whole cultural detail inverts and raters notice.',
          'Using "मैं गयी" as a male narrator (or vice versa) still breaks Language Control - pick one and stay consistent.',
          'Padding the Diwali paragraph with five more food items without a verb would tip the essay into list-mode and cap it at Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked model essays at Intermediate-Mid. Study them until you can reproduce the sentence shapes without looking. The verdict cards show exactly which rubric boxes each sentence ticks - raters think in these boxes, and so should you. Notice how both essays end with a reflective sentence that generalizes beyond the event; this is the single most copyable move.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने परिवार के सदस्यों के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपके परिवार में कौन-कौन है, हर सदस्य कैसा है, और आप उनके साथ क्या करना पसंद करते हैं।',
      english:
        'Write three paragraphs about your family members. Describe who is in your family, what each person is like, and what you like to do with them.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसलिए'],
        vocab: ['पिताजी', 'माँ', 'भाई', 'बहन', 'प्यारा', 'मेहनती'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'अपने परिवार के साथ बिताए हुए एक ख़ास दिन के बारे में तीन अनुच्छेदों में लिखिए - वह दिन क्यों ख़ास था, उस दिन क्या हुआ, और आपको कैसा लगा।',
      english:
        'Write three paragraphs about a special day you spent with your family - why it was special, what happened, and how you felt.',
      hint: {
        connectors: ['जब... तब', 'लेकिन', 'अंत में'],
        vocab: ['त्योहार', 'दादी', 'मिठाई', 'परिवार', 'ख़ुशी'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगले साल आप अपने परिवार के साथ क्या करना चाहेंगे? तीन अनुच्छेदों में लिखिए - कहाँ जाएँगे, क्या करेंगे, और यह क्यों महत्वपूर्ण है।',
      english:
        'What would you like to do with your family next year? Write three paragraphs - where you will go, what you will do, and why it is important.',
      hint: {
        connectors: ['अगर... तो', 'इसके अलावा', 'सिर्फ़... बल्कि भी'],
        vocab: ['गाँव', 'छुट्टी', 'नाना-नानी', 'साथ', 'यादगार'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is written in FCPS shape: three cohesive paragraphs, personal experience (past or imagined future), with enough scope for tense variety. The first prompt targets present + past description, the second forces past narration with reflection, and the third requires future tense front and center. Writing all three covers the full tense triangle.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every essay you write in this pack. If you mark three or fewer "Pass" boxes, go back and add a respectful plural verb, a possessive correction, or a cultural specific before moving to the next pack. On family essays, the single highest-leverage self-check is: "Did every elder get a plural verb?"',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
