import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L1-02 — Descriptions, Personality, Feelings & Emotions
// Adjectives are the Novice → Intermediate bridge. This pack drills
// gender/number agreement, the मुझे + emotion + होना/लगना construction, and
// the comparative, so a student can describe a person in three full sentences
// at STAMP Benchmark 5 / FCPS 3 credits.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-02-descriptions-feelings',
  level: 1,
  themeGroup: 'Identity',
  order: 2,
  heroMotif: 'family',
  titleHindi: 'विवरण और भावनाएँ',
  titleEnglish: 'Descriptions, Personality, Feelings & Emotions',
  hook: 'Adjectives turn a list into a portrait — the shortest route from Novice to connected sentences.',
  heroPrompt: composeHeroPrompt(
    'A gallery-style arrangement of diverse silhouetted figures with warm emotion icons floating above each — heart, star, spark — in earthy tones',
  ),

  rationale: {
    fcpsSubTopics: [
      'Physical Descriptions and Personality Characteristics (FCPS Level 1 — Personal & Family Life)',
      'Feelings and Emotions (FCPS Level 1 — Personal & Family Life)',
      'Talking about friends and family (FCPS Level 1)',
    ],
    trains: ['LanguageControl', 'TopicCoverage', 'TextType'],
    afterThisPackStudentCan: [
      'Describe a person in three full sentences using physical, personality, and emotion adjectives',
      'Match adjective endings to masculine and feminine nouns without hesitation (लंबा लड़का / लंबी लड़की)',
      'Express feelings with the मुझे / उसे + noun + होना/लगना construction correctly',
      'Compare two people using से बेहतर and सबसे अच्छा',
      'Name at least 15 adjectives across physical, personality, and emotion categories',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Without adjective control, every essay in the course stays at Novice-High. The student can list nouns ("मेरा दोस्त, मेरी बहन") but cannot add the descriptive detail raters need to score Intermediate-Mid. This is the single most leverage-dense pack at Level 1.',
  },

  objectives: [
    {
      text: 'Use 10+ adjectives with correct gender agreement across masculine and feminine nouns.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Build 5 sentences with the मुझे/उसे + emotion + होना/लगना pattern (मुझे खुशी है, उसे डर लगता है).',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Write one full paragraph describing a person — physical, personality, AND how they make you feel.',
      trains: ['TextType', 'TopicCoverage'],
    },
    {
      text: 'Compare two people using से बेहतर / सबसे अच्छा in a single sentence.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Shift between present (he IS kind) and past (I FELT sad yesterday) within a single essay.',
      trains: ['TextType'],
    },
  ],

  vocabulary: [
    // Physical descriptors
    { hindi: 'लंबा', transliteration: 'lambaa', english: 'tall / long', exampleHindi: 'मेरा भाई बहुत लंबा है।', exampleEnglish: 'My brother is very tall.', emoji: '📏', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'छोटा', transliteration: 'chhotaa', english: 'short / small', exampleHindi: 'मेरी बहन मुझसे छोटी है।', exampleEnglish: 'My sister is shorter than me.', emoji: '🧒', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'पतला', transliteration: 'patlaa', english: 'thin / slim', exampleHindi: 'वह लड़का पतला और लंबा है।', exampleEnglish: 'That boy is thin and tall.', emoji: '🧍', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'मोटा', transliteration: 'motaa', english: 'heavy-set / thick', exampleHindi: 'हमारी बिल्ली थोड़ी मोटी है।', exampleEnglish: 'Our cat is a little plump.', emoji: '🐈', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'सुंदर', transliteration: 'sundar', english: 'beautiful / handsome', exampleHindi: 'यह बाग बहुत सुंदर है।', exampleEnglish: 'This garden is very beautiful.', emoji: '🌸', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'गोरा', transliteration: 'goraa', english: 'fair-skinned', exampleHindi: 'मेरी दादी का रंग गोरा है।', exampleEnglish: 'My grandmother has a fair complexion.', emoji: '👵', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'साँवला', transliteration: 'saanvla', english: 'wheat-toned / dusky', exampleHindi: 'मेरे पिताजी साँवले हैं।', exampleEnglish: 'My father has a wheat-toned complexion.', emoji: '👨', partOfSpeech: 'adjective', subgroup: 'Physical' },
    { hindi: 'काले बाल', transliteration: 'kaale baal', english: 'black hair', exampleHindi: 'मेरे काले बाल लंबे हैं।', exampleEnglish: 'My black hair is long.', emoji: '💇', partOfSpeech: 'phrase', subgroup: 'Physical' },
    { hindi: 'नीली आँखें', transliteration: 'neeli aankhen', english: 'blue eyes', exampleHindi: 'उसकी नीली आँखें चमकती हैं।', exampleEnglish: 'Her blue eyes sparkle.', emoji: '👁️', partOfSpeech: 'phrase', subgroup: 'Physical' },

    // Personality
    { hindi: 'अच्छा', transliteration: 'achchhaa', english: 'good / nice', exampleHindi: 'मेरा दोस्त बहुत अच्छा लड़का है।', exampleEnglish: 'My friend is a very good boy.', emoji: '👍', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'मेहनती', transliteration: 'mehnati', english: 'hardworking', exampleHindi: 'मेरी माँ बहुत मेहनती हैं।', exampleEnglish: 'My mother is very hardworking.', emoji: '💪', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'ईमानदार', transliteration: 'eemaandaar', english: 'honest', exampleHindi: 'वह एक ईमानदार इंसान है।', exampleEnglish: 'He is an honest person.', emoji: '🤝', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'दयालु', transliteration: 'dayaalu', english: 'kind', exampleHindi: 'हमारी शिक्षिका बहुत दयालु हैं।', exampleEnglish: 'Our teacher is very kind.', emoji: '💗', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'शांत', transliteration: 'shaant', english: 'calm / quiet', exampleHindi: 'मेरे पापा हमेशा शांत रहते हैं।', exampleEnglish: 'My dad always stays calm.', emoji: '😌', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'हँसमुख', transliteration: 'hansmukh', english: 'cheerful', exampleHindi: 'मेरी बहन बहुत हँसमुख है।', exampleEnglish: 'My sister is very cheerful.', emoji: '😄', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'मज़ाकिया', transliteration: 'mazaakiya', english: 'funny / joke-loving', exampleHindi: 'अरुण बहुत मज़ाकिया है।', exampleEnglish: 'Arun is very funny.', emoji: '🤣', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'शर्मीला', transliteration: 'sharmeelaa', english: 'shy', exampleHindi: 'छोटा भाई थोड़ा शर्मीला है।', exampleEnglish: 'My little brother is a little shy.', emoji: '🙈', partOfSpeech: 'adjective', subgroup: 'Personality' },
    { hindi: 'स्मार्ट', transliteration: 'smart', english: 'smart / sharp', exampleHindi: 'वह लड़की बहुत स्मार्ट है।', exampleEnglish: 'That girl is very smart.', emoji: '🧠', partOfSpeech: 'adjective', subgroup: 'Personality' },

    // Feelings & emotions
    { hindi: 'खुश', transliteration: 'khush', english: 'happy', exampleHindi: 'आज मैं बहुत खुश हूँ।', exampleEnglish: 'I am very happy today.', emoji: '😊', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'उदास', transliteration: 'udaas', english: 'sad', exampleHindi: 'कल मैं थोड़ा उदास था।', exampleEnglish: 'Yesterday I was a little sad.', emoji: '😢', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'गुस्सा', transliteration: 'gussa', english: 'anger', exampleHindi: 'मुझे कभी-कभी गुस्सा आता है।', exampleEnglish: 'Sometimes I feel angry.', emoji: '😠', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'डर', transliteration: 'dar', english: 'fear', exampleHindi: 'उसे कुत्तों से डर लगता है।', exampleEnglish: 'He is afraid of dogs.', emoji: '😨', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'परेशान', transliteration: 'pareshaan', english: 'worried / troubled', exampleHindi: 'वह परीक्षा से परेशान है।', exampleEnglish: 'She is worried about the exam.', emoji: '😟', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'थका हुआ', transliteration: 'thakaa huaa', english: 'tired', exampleHindi: 'पिताजी काम से थके हुए आए।', exampleEnglish: 'Father came home tired from work.', emoji: '😴', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'आश्चर्यचकित', transliteration: 'aashcharyachakit', english: 'surprised', exampleHindi: 'मैं यह खबर सुनकर आश्चर्यचकित रह गया।', exampleEnglish: 'I was stunned to hear this news.', emoji: '😲', partOfSpeech: 'adjective', subgroup: 'Feelings' },
    { hindi: 'गर्व', transliteration: 'garv', english: 'pride', exampleHindi: 'माँ को मुझ पर गर्व है।', exampleEnglish: 'Mother is proud of me.', emoji: '🦁', partOfSpeech: 'noun', subgroup: 'Feelings' },

    // Intensifiers
    { hindi: 'बहुत', transliteration: 'bahut', english: 'very', exampleHindi: 'यह किताब बहुत अच्छी है।', exampleEnglish: 'This book is very good.', emoji: '⬆️', partOfSpeech: 'adverb', subgroup: 'Intensifiers' },
    { hindi: 'थोड़ा', transliteration: 'thodaa', english: 'a little', exampleHindi: 'वह थोड़ा शर्मीला है।', exampleEnglish: 'He is a little shy.', emoji: '🤏', partOfSpeech: 'adverb', subgroup: 'Intensifiers' },
    { hindi: 'एकदम', transliteration: 'ekdam', english: 'completely / totally', exampleHindi: 'तुम्हारी बात एकदम सही है।', exampleEnglish: 'What you said is completely right.', emoji: '💯', partOfSpeech: 'adverb', subgroup: 'Intensifiers' },
    { hindi: 'काफ़ी', transliteration: 'kaafi', english: 'quite / enough', exampleHindi: 'वह काफ़ी मेहनती लड़की है।', exampleEnglish: 'She is quite a hardworking girl.', emoji: '📈', partOfSpeech: 'adverb', subgroup: 'Intensifiers' },
  ],
  vocabularyNote: {
    why:
      'These 30 words are the exact set FCPS prompts on personality, physical description, and feelings pull from. The split into Physical / Personality / Feelings / Intensifiers mirrors the three sentence-types the student must produce ("She looks like…", "She is…", "She makes me feel…"). Every word here appears in the anchor passage or a model essay.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Adjective-noun gender and number agreement',
      rule:
        'Adjectives ending in ा change form to match the noun. Masculine singular → ा (लंबा लड़का). Feminine singular → ी (लंबी लड़की). Masculine plural / oblique → े (लंबे लड़के). Adjectives NOT ending in ा (सुंदर, ईमानदार, शांत) do not change at all.',
      examples: [
        { hindi: 'लंबा लड़का खड़ा है।', transliteration: 'lambaa ladkaa khadaa hai.', english: 'The tall boy is standing. (masc. sing.)' },
        { hindi: 'लंबी लड़की खड़ी है।', transliteration: 'lambee ladki khadi hai.', english: 'The tall girl is standing. (fem. sing.)' },
        { hindi: 'लंबे लड़के खड़े हैं।', transliteration: 'lambe ladke khade hain.', english: 'The tall boys are standing. (masc. plural)' },
        { hindi: 'वह ईमानदार लड़की है।', transliteration: 'vah eemaandaar ladki hai.', english: 'She is an honest girl. (invariant adjective — no change.)' },
      ],
      pitfall:
        'Writing "अच्छा लड़की" (masculine adjective on feminine noun) is the #1 error on description essays. Also common: forgetting that invariant adjectives like सुंदर and ईमानदार do NOT take ी/े endings — writing "सुंदरी" is wrong.',
      whyItMatters:
        'Every single sentence that describes a person tests this rule. A rater reading "मेरी बहन अच्छा है" mentally tallies a Language Control error in the first sentence, and it colors everything after. Get this right and half the rubric is won.',
    },
    {
      title: 'मुझे / उसे / हमें + emotion + होना / लगना',
      rule:
        'Feelings are expressed with an indirect-object pronoun (मुझे, उसे, हमें, तुम्हें) + the emotion noun + होना (state) or लगना (to feel / to strike). Use होना for "I am happy / proud" (मुझे खुशी है). Use लगना for "I feel scared / angry" (मुझे डर लगता है). The subject of the sentence is NOT "I" — it is the emotion itself.',
      examples: [
        { hindi: 'मुझे बहुत खुशी है।', transliteration: 'mujhe bahut khushi hai.', english: 'I am very happy. (lit. "To me there is great happiness.")' },
        { hindi: 'उसे कुत्तों से डर लगता है।', transliteration: 'use kutton se dar lagtaa hai.', english: 'He is afraid of dogs. (lit. "To him fear strikes from dogs.")' },
        { hindi: 'माँ को मुझ पर गर्व है।', transliteration: 'maa ko mujh par garv hai.', english: 'Mom is proud of me.' },
        { hindi: 'मुझे कल बहुत गुस्सा आया।', transliteration: 'mujhe kal bahut gussaa aayaa.', english: 'I got very angry yesterday.' },
      ],
      pitfall:
        'Students often try to translate "I am happy" as "मैं खुश हूँ" — which works, but then trip when they try "I feel scared" and write "मैं डर हूँ" (wrong). The डर / गुस्सा / खुशी nouns take the indirect construction.',
      whyItMatters:
        'This single construction generates half the sentences in any feelings-topic essay. Controlling it moves Language Control from Low to Average and unlocks a second, more idiomatic time-frame shift (मुझे खुशी है / मुझे खुशी थी).',
    },
    {
      title: 'Comparative: से बेहतर / से अच्छा and superlative सबसे अच्छा',
      rule:
        'To compare two people, use [X] + से + [adjective] — "X से अच्छा" = "better than X". For the superlative (the best of all), prepend सबसे — "सबसे अच्छा" = "the best". The adjective still agrees with the subject being described.',
      examples: [
        { hindi: 'मेरा भाई मुझसे लंबा है।', transliteration: 'meraa bhaai mujhse lambaa hai.', english: 'My brother is taller than me.' },
        { hindi: 'वह मुझसे बेहतर गाती है।', transliteration: 'vah mujhse behtar gaati hai.', english: 'She sings better than me.' },
        { hindi: 'मेरी दोस्त सबसे दयालु है।', transliteration: 'meri dost sabse dayaalu hai.', english: 'My friend is the kindest of all.' },
        { hindi: 'यह किताब सबसे अच्छी है।', transliteration: 'yah kitaab sabse achchhi hai.', english: 'This book is the best.' },
      ],
      pitfall:
        'Forgetting the से — writing "मेरा भाई मैं लंबा है" is not just wrong, it is not Hindi. Also: applying सबसे to verbs ("सबसे गाती" means nothing — use "सबसे अच्छा गाती").',
      whyItMatters:
        'A single comparative sentence ("वह मेरी सबसे अच्छी दोस्त है") is a Benchmark 5 structural marker. Raters see comparatives as evidence of moving beyond one-clause description into relational thinking.',
    },
  ],
  grammarNote: {
    why:
      'Three rules cover 90% of the grammar a description essay needs. Drill agreement first (it appears in every sentence), then the indirect-object feelings construction (it appears in every paragraph), and finally the comparative (one well-placed comparative lifts an essay a whole benchmark).',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'pahle',
    'phir',
  ]),
  connectorsNote: {
    why:
      'This topic leans on reasoning connectors more than sequence ones: description essays answer "WHY do I like this person?" far more often than "WHAT happened in what order?". क्योंकि and इसलिए make the causal link between personality and feeling ("She is kind, so I feel safe"), and इसके अलावा lets the student add a second trait without starting a new paragraph.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरी सबसे अच्छी दोस्त · My Best Friend',
    hindi:
      'मेरी सबसे अच्छी दोस्त का नाम मीरा है। वह लंबी और पतली है, और उसके काले बाल बहुत सुंदर हैं। मीरा मुझसे एक साल छोटी है, लेकिन वह मुझसे बहुत समझदार है। वह पढ़ाई में मेहनती है, इसके अलावा वह खेल में भी अच्छी है। मीरा बहुत दयालु और हँसमुख है, इसलिए हर कोई उससे बात करना चाहता है। पहले मैं स्कूल में शर्मीली थी और किसी से बात नहीं करती थी। फिर मीरा आई और मुझसे दोस्ती की। जब मैं उदास होती हूँ, तो वह मुझे मज़ाकिया कहानियाँ सुनाती है और मुझे हँसाती है। मुझे उस पर बहुत गर्व है, क्योंकि वह एक ईमानदार और दयालु इंसान है। सच में, मीरा जैसी दोस्त होना मेरे लिए सबसे बड़ी खुशी है।',
    transliteration:
      'meri sabse achchhi dost kaa naam Meera hai. vah lambi aur patli hai, aur uske kaale baal bahut sundar hain. Meera mujhse ek saal chhoti hai, lekin vah mujhse bahut samajhdaar hai. vah padhaai mein mehnati hai, iske alawa vah khel mein bhi achchhi hai. Meera bahut dayaalu aur hansmukh hai, isliye har koi usse baat karna chaahtaa hai. pahle main school mein sharmeeli thi aur kisi se baat nahin karti thi. phir Meera aayi aur mujhse dosti ki. jab main udaas hoti hoon, to vah mujhe mazaakiya kahaaniyaan sunaati hai aur mujhe hansaati hai. mujhe us par bahut garv hai, kyonki vah ek eemaandaar aur dayaalu insaan hai. sach mein, Meera jaisi dost honaa mere liye sabse badi khushi hai.',
    english:
      'My best friend\'s name is Meera. She is tall and slim, and her black hair is very beautiful. Meera is one year younger than me, but she is much more sensible than I am. She is hardworking in her studies, and on top of that she is good at sports too. Meera is very kind and cheerful, so everyone wants to talk with her. Earlier I was shy at school and did not talk to anyone. Then Meera came and became friends with me. When I feel sad, she tells me funny stories and makes me laugh. I am very proud of her, because she is an honest and kind person. Truly, having a friend like Meera is the greatest happiness for me.',
    highlights: [
      { term: 'लंबी, पतली, हँसमुख, शर्मीली', note: 'Feminine-ending adjectives (ी) match the feminine narrator and friend — clean Language Control signal across sentences.' },
      { term: 'मुझसे छोटी / मुझसे समझदार', note: 'Two comparatives built from से. Raters flag comparatives as Intermediate-Mid structural markers.' },
      { term: 'मुझे उस पर गर्व है / मुझे खुशी है', note: 'The मुझे + noun + है pattern — exactly what the grammar section drills. See it land twice in one passage.' },
      { term: 'लेकिन, इसके अलावा, इसलिए, क्योंकि', note: 'Four reasoning connectors thread the paragraph — cohesion that cannot be rearranged.' },
      { term: 'पहले ... फिर ...', note: 'Sequence pair introduces a past narrative (I was shy → Meera came) inside a present-tense description — the tense shift Benchmark 5 requires.' },
    ],
    comprehensionQuestions: [
      { q: 'What does Meera look like physically?', a: 'लंबी, पतली, और उसके काले बाल सुंदर हैं (tall, slim, with beautiful black hair).' },
      { q: 'Who is older, the narrator or Meera?', a: 'The narrator — Meera is one year younger (मीरा मुझसे एक साल छोटी है).' },
      { q: 'Name two personality traits of Meera.', a: 'Any two of: मेहनती, दयालु, हँसमुख, ईमानदार.' },
      { q: 'What did the narrator used to be like before meeting Meera?', a: 'शर्मीली — shy, and she did not talk to anyone.' },
      { q: 'What does Meera do when the narrator feels sad?', a: 'She tells funny stories and makes the narrator laugh (मज़ाकिया कहानियाँ सुनाती है, हँसाती है).' },
      { q: 'Identify one sentence that uses a comparative and explain the structure.', a: '"मीरा मुझसे एक साल छोटी है" or "वह मुझसे बहुत समझदार है" — [person] + से + [adjective] = "-er than [person]".' },
      { q: 'Why is the narrator proud of Meera?', a: 'क्योंकि वह एक ईमानदार और दयालु इंसान है (because she is an honest and kind person).' },
    ],
  },
  anchorNote: {
    why:
      'Every sentence in this passage is a miniature of something the student must produce: physical descriptor with gender agreement, personality adjective in a क्योंकि clause, feelings construction with मुझे, comparative with से, time shift from present to past. Read it aloud three times before writing — the shapes will start to stick.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'sms',
      title: 'माँ को संदेश · Message to Mom',
      hindi:
        'माँ, मैं आज थोड़ा थकी हुई हूँ 😴 लेकिन चिंता मत करो। परीक्षा अच्छी गई, और मुझे बहुत खुशी है। रात को घर पर मिलते हैं ❤️',
      transliteration:
        'maa, main aaj thodaa thaki hui hoon 😴 lekin chintaa mat karo. pareeksha achchhi gayi, aur mujhe bahut khushi hai. raat ko ghar par milte hain ❤️',
      english:
        'Mom, I am a little tired today, but don\'t worry. The exam went well, and I am very happy. See you at home tonight.',
    },
    {
      kind: 'diary',
      title: 'डायरी का एक पन्ना · A Page from the Diary',
      hindi:
        'आज मुझे अपनी छोटी बहन पर बहुत गर्व हुआ। वह पहले बहुत शर्मीली थी, लेकिन आज उसने कक्षा में एक कविता सुनाई। सब बच्चों ने ताली बजाई। शाम को वह हँसमुख थी, और मैं भी एकदम खुश था।',
      transliteration:
        'aaj mujhe apni chhoti bahan par bahut garv huaa. vah pahle bahut sharmeeli thi, lekin aaj usne kakshaa mein ek kavitaa sunaai. sab bachchon ne taali bajaai. shaam ko vah hansmukh thi, aur main bhi ekdam khush thaa.',
      english:
        'Today I was very proud of my little sister. She used to be very shy, but today she recited a poem in class. All the children clapped. In the evening she was cheerful, and I was completely happy too.',
    },
    {
      kind: 'email',
      title: 'शिक्षिका को ईमेल · Email to a Teacher',
      hindi:
        'आदरणीय दीक्षित जी,\nनमस्ते। मेरा नाम अनिका है। मैं एक शांत लड़की हूँ, लेकिन पढ़ाई में मेहनती हूँ। मुझे हिंदी सीखने में बहुत खुशी होती है। क्या मैं आपकी कक्षा में आ सकती हूँ?\nधन्यवाद,\nअनिका।',
      transliteration:
        'aadarneey Dikshit ji,\nnamaste. meraa naam Anikaa hai. main ek shaant ladki hoon, lekin padhaai mein mehnati hoon. mujhe hindi seekhne mein bahut khushi hoti hai. kyaa main aapki kakshaa mein aa sakti hoon?\ndhanyavaad,\nAnikaa.',
      english:
        'Respected Dikshit Ji,\nHello. My name is Anika. I am a quiet girl, but I am hardworking in my studies. I feel very happy learning Hindi. May I join your class?\nThank you,\nAnika.',
    },
    {
      kind: 'poster',
      title: 'कक्षा का पोस्टर · Classroom Poster',
      hindi:
        'आज का विद्यार्थी: अरुण ⭐\nगुण: दयालु, मेहनती, मज़ाकिया\nकक्षा में सबसे हँसमुख लड़का!\nबधाई हो, अरुण — हमें तुम पर गर्व है 🏆',
      transliteration:
        'aaj kaa vidyaarthi: Arun ⭐\nguṇ: dayaalu, mehnati, mazaakiya\nkakshaa mein sabse hansmukh ladkaa!\nbadhaai ho, Arun — hamein tum par garv hai 🏆',
      english:
        'Student of the Day: Arun ⭐\nQualities: kind, hardworking, funny\nThe most cheerful boy in the class!\nCongratulations, Arun — we are proud of you 🏆',
    },
  ],
  modelTextsNote: {
    why:
      'SMS, diary, formal email, and classroom poster — four registers that all describe people and feelings, each in a different voice. The SMS keeps it casual and emoji-rich; the email stays polite and adjective-heavy; the diary models the past-tense feelings shift; the poster compresses three personality adjectives into one sentence. Copy the shapes, change the names.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Complimenting without body-talk',
      body:
        'In India, commenting directly on someone\'s body — weight, skin color, height — is considered rude, even when affectionate. Safer compliments target personality (दयालु, मेहनती) or energy (हँसमुख). In an essay, lead with personality before physical description, and you sound culturally fluent.',
      emoji: '🙏',
    },
    {
      title: '"Smart" means sharp, not well-dressed',
      body:
        'Hindi speakers have borrowed स्मार्ट from English, but it usually means "mentally sharp / quick-witted," not "well-dressed." Saying "वह बहुत स्मार्ट है" about a student is high praise for intelligence. Pair it with मेहनती for a classic Indian compliment.',
      emoji: '🧠',
    },
    {
      title: 'Praising elders: add "जी" and use the plural',
      body:
        'When describing a parent, teacher, or grandparent, grammatical plural verbs signal respect even for a singular person: "माँ दयालु हैं" not "माँ दयालु है". Dropping जी or the plural makes you sound disrespectful even if every other word is perfect.',
      emoji: '👵',
    },
    {
      title: 'नज़र लग जाना — the evil eye',
      body:
        'When praising a child, Indian elders often add "मशा-अल्लाह" or touch behind the ear to ward off नज़र (the evil eye). In essays, this superstition shows up as a natural hedge: "वह बहुत सुंदर है, नज़र न लगे।" Using it once marks the essay as authentic.',
      emoji: '🧿',
    },
    {
      title: 'Feelings are shared, not owned',
      body:
        'Indian conversation leans on collective feelings — "हमें खुशी है" ("we are happy") is more common in family talk than "मुझे खुशी है". When describing a family event, swapping मुझे for हमें once or twice reads as culturally attuned.',
      emoji: '👨‍👩‍👧',
    },
  ],
  culturalNote: {
    why:
      'A rater reading a description essay can tell in one paragraph whether the student is operating inside Indian cultural norms or translating American-English descriptions word-for-word. Leading with personality, using the respectful plural for elders, and dropping in one superstition or collective-feeling shift lifts Topic Coverage without adding any new grammar.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'दिल का साफ़ होना',
      literal: 'to be clean of heart',
      meaning: 'To be sincere and without malice — a common personality compliment.',
      example: 'मेरी दादी दिल की साफ़ हैं, इसलिए सब उन्हें प्यार करते हैं।',
      exampleEnglish: 'My grandmother is pure-hearted, which is why everyone loves her.',
    },
    {
      phrase: 'आँखों का तारा',
      literal: 'star of the eyes',
      meaning: 'The apple of one\'s eye — a beloved person.',
      example: 'छोटी बहन पूरे परिवार की आँखों का तारा है।',
      exampleEnglish: 'Little sister is the apple of the whole family\'s eye.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms describe people affectionately — the exact register description-essays need. One placed in a closing sentence ("वह मेरे आँखों का तारा है") reads as register mastery. Two is overkill; pick whichever fits the person you\'re describing.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने सबसे अच्छे दोस्त के बारे में तीन अनुच्छेदों में लिखो। उसका रूप, स्वभाव, और वह आपको कैसा महसूस कराता/कराती है। (Write three paragraphs about your best friend: appearance, personality, and how they make you feel.)',
      novice:
        'मेरा दोस्त अच्छा है। वह लंबा है। मुझे खुशी है।',
      intermediateMid:
        'मेरे सबसे अच्छे दोस्त का नाम अरुण है। वह मुझसे थोड़ा लंबा है और उसके बाल काले हैं। अरुण बहुत हँसमुख और मज़ाकिया है, इसलिए हमारी कक्षा में सब उससे बात करना चाहते हैं। वह पढ़ाई में भी मेहनती है, इसके अलावा वह खेल में भी अच्छा है।\n\nअरुण का स्वभाव बहुत दयालु है। पिछले साल जब मैं बीमार था, तब वह हर दिन मेरे घर आता था और मुझे होमवर्क समझाता था। वह कभी गुस्सा नहीं करता, और हमेशा शांत रहता है। एक बार मैं परीक्षा से बहुत परेशान था, लेकिन अरुण ने मज़ाकिया बातें करके मुझे हँसाया।\n\nमुझे अरुण पर बहुत गर्व है, क्योंकि वह एक ईमानदार और सच्चा दोस्त है। जब मैं उदास होता हूँ, तो उससे बात करने से मुझे एकदम अच्छा लगता है। मुझे लगता है कि अगले साल भी हम साथ पढ़ेंगे और यह दोस्ती हमेशा ऐसी ही बनी रहेगी।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मुझसे थोड़ा लंबा है', note: 'Comparative (मुझसे + adjective) in the opening sentence — a clean Benchmark 5 structural marker.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'हँसमुख, मज़ाकिया, मेहनती', note: 'Three personality adjectives in one sentence — Topic Coverage lift and clean gender agreement (masculine subject).' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए / इसके अलावा', note: 'Reasoning + addition. Ideas are linked, not listed.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले साल ... आता था ... समझाता था', note: 'Opens the second paragraph in past habitual — an Intermediate-Mid time frame that raters specifically reward.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'मेरे घर आता था और होमवर्क समझाता था', note: 'Concrete, culturally specific detail — friendship shown through action, not just adjective.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे अरुण पर बहुत गर्व है', note: 'The feelings construction (मुझे + noun + है) applied to a person — exactly the grammar focus of this pack.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल भी हम साथ पढ़ेंगे', note: 'Future tense in the closing — third time frame, sealing Benchmark 5.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['इसलिए', 'इसके अलावा', 'लेकिन', 'क्योंकि', 'जब ... तब', 'जब ... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs, each with its own job (appearance → personality → feeling) — paragraphs cannot be rearranged, which is the Text-Type 5 test.',
          'Uses past habitual (आता था, समझाता था), present (है, रहता है), and future (पढ़ेंगे) within 138 words — all three time frames raters want.',
          'Adjective-noun agreement is clean across 8+ adjectives in one essay — ईमानदार दोस्त, दयालु स्वभाव, मज़ाकिया बातें — Language Control stabilizes at Average or higher.',
          'One comparative (मुझसे थोड़ा लंबा) and two feelings constructions (मुझे गर्व है, मुझे अच्छा लगता है) — the exact structures this pack trains.',
          'Six different connectors used across the three paragraphs, including the reasoning pair क्योंकि / इसलिए — unambiguous Text-Type signal.',
        ],
        gotchas: [
          'If the narrator were female, "उदास होता हूँ" must become "उदास होती हूँ". One inconsistency here drops Language Control from Average to Low.',
          'Dropping the future-tense closing would collapse this from Benchmark 5 to Benchmark 4 despite identical vocabulary.',
        ],
      },
    },
    {
      prompt:
        'अपने परिवार के एक सदस्य का वर्णन तीन अनुच्छेदों में कीजिए। उनका रूप, स्वभाव, और आप उनसे कुछ क्यों सीखते हैं। (Describe a family member in three paragraphs: appearance, personality, and why you learn from them.)',
      novice:
        'मेरी माँ अच्छी हैं। वह दयालु हैं। मुझे वह पसंद हैं।',
      intermediateMid:
        'मेरी माँ का नाम सुनीता है। वह मध्यम कद की हैं, गोरी हैं, और उनके लंबे काले बाल हैं। वह हमेशा सादी साड़ी पहनती हैं। देखने में वह शांत लगती हैं, लेकिन असल में वह बहुत मेहनती और स्मार्ट हैं।\n\nमाँ का स्वभाव मुझसे बिल्कुल अलग है। मैं थोड़ा शर्मीला हूँ, जबकि वह हर किसी से खुलकर बात करती हैं। वह दिल की साफ़ हैं और कभी किसी पर गुस्सा नहीं करतीं। जब मैं छोटा था, तब हर रात वह मुझे कहानी सुनाती थीं। उनकी आवाज़ सुनकर मुझे एकदम नींद आ जाती थी।\n\nमुझे माँ पर बहुत गर्व है, क्योंकि वह पूरे दिन काम करती हैं और फिर भी हमारे लिए समय निकालती हैं। उनसे मैंने सीखा है कि ईमानदारी सबसे बड़ी चीज़ है। अगले महीने उनका जन्मदिन है, इसलिए मैं उनके लिए एक ख़ास तोहफ़ा ख़रीदूँगा। माँ जैसी इंसान मिलना मेरे लिए सबसे बड़ी खुशी है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'मध्यम कद, गोरी, लंबे काले बाल', note: 'Three physical descriptors with clean feminine/plural agreement — one sentence covers the whole physical brief.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'देखने में ... लेकिन असल में ...', note: '"Looks ... but actually ..." construction introduces contrast between appearance and personality — a Benchmark 5 complexity marker.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'जबकि', note: 'Contrastive connector "whereas" — elevates simple listing into comparison.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'दिल की साफ़', note: 'Culturally specific idiom used as a personality compliment — register lift.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'जब मैं छोटा था, तब ... सुनाती थीं', note: 'Past-habitual inside a memory paragraph — shifts cleanly from present to past and back.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे माँ पर बहुत गर्व है', note: 'Feelings construction (मुझे + गर्व + है) — the pack\'s target grammar, applied to a family member.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... ख़रीदूँगा', note: 'Future tense arrives in the closing — past / present / future all land inside a single essay.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'माँ हैं / करती हैं / निकालती हैं', note: 'Respectful plural verbs for mother throughout — cultural register maintained without a single slip.' },
      ],
      wordCount: 145,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'जबकि', 'क्योंकि', 'इसलिए', 'जब ... तब'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Respectful plural verbs (हैं, पहनती हैं, करतीं) sustained for मां across the entire essay — a register signal raters explicitly flag for Indian-language essays.',
          'The "देखने में शांत, असल में मेहनती" contrast is a compound structure that separates IM from IL — appearance vs essence in one breath.',
          'Five connectors including जबकि (whereas) — a connector rarely seen below Benchmark 5.',
          'Past habitual (सुनाती थीं), present habitual (करती हैं), and simple future (ख़रीदूँगा) all represented — the three time frames the rubric requires.',
          'Idiom दिल की साफ़ is placed inside a sentence, not appended — the way IM students use idioms.',
        ],
        gotchas: [
          'Using singular "है" for माँ even once ("माँ मेहनती है") would pull the cultural register from High to Low.',
          'If the comparative/contrast sentence were removed, the essay reads as Benchmark 4 — three adjectives listed side-by-side with no reasoning.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'The two essays drill the two most common description prompts — a friend and a family member — at Intermediate-Mid. Study the annotations: every one of them maps to a rubric box a rater is ticking. When you write your own essay, ask "which of those boxes am I ticking in this sentence?" If none, rewrite the sentence.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने सबसे अच्छे दोस्त का वर्णन तीन अनुच्छेदों में कीजिए। उसके रूप, स्वभाव, और वह आपको कैसा महसूस कराता/कराती है, इसके बारे में लिखिए।',
      english:
        'Describe your best friend in three paragraphs. Write about their appearance, their personality, and how they make you feel.',
      hint: {
        connectors: ['क्योंकि', 'इसलिए', 'लेकिन', 'इसके अलावा'],
        vocab: ['हँसमुख', 'दयालु', 'मेहनती', 'मुझे खुशी है', 'मुझे गर्व है'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'अपने परिवार के एक सदस्य के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह कैसे दिखते हैं, उनका स्वभाव कैसा है, और आप उनसे क्या सीखते हैं।',
      english:
        'Write three paragraphs about a member of your family. Describe how they look, what their personality is like, and what you learn from them.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसलिए'],
        vocab: ['शांत', 'मेहनती', 'ईमानदार', 'मुझे गर्व है', 'सबसे अच्छा'],
        tenses: ['present', 'past', 'future'],
      },
    },
    {
      hindi:
        'पिछले हफ़्ते एक ऐसा दिन याद कीजिए जब आपकी भावनाएँ बदल गईं। तीन अनुच्छेदों में बताइए कि पहले आपको कैसा लगा, फिर क्या हुआ, और अंत में आप क्यों खुश या उदास थे।',
      english:
        'Think of a day last week when your feelings changed. In three paragraphs describe how you felt at first, what happened, and finally why you were happy or sad.',
      hint: {
        connectors: ['पहले', 'फिर', 'लेकिन', 'क्योंकि'],
        vocab: ['खुश', 'उदास', 'परेशान', 'थका हुआ', 'मुझे ... लगा'],
        tenses: ['past', 'present'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 drills the "describe a person" format head-on. Prompt 2 forces the respectful plural for elders. Prompt 3 pushes past-tense feelings specifically, so the student has to use "मुझे उदास लगा / मुझे गुस्सा आया" rather than stay safely in the present. Rotate all three before the next pack.',
    trains: ['TextType', 'LanguageControl'],
  },

  rubricNote: {
    why:
      'Self-grade every essay with the rubric chart. For this pack, pay attention especially to: (1) adjective-noun agreement on every sentence, (2) whether feelings are expressed with मुझे + noun + है or incorrectly as मैं + noun, (3) whether the respectful plural is sustained for elders. Three "Pass" boxes or fewer means rewrite.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
