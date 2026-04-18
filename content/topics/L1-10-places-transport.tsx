import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

// -----------------------------------------------------------------------------
// L1-10 · Cities, Places, Activities & Transportation (जगहें और यातायात)
// Postposition-first pack: से, तक, में, पर, के पास, के सामने get their first
// serious workout. Vocabulary spans cities, everyday places, transport modes,
// and direction words - the community-life cluster FCPS L1 prompts love.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-10-places-transport',
  level: 1,
  themeGroup: 'ModernSociety',
  order: 10,
  heroMotif: 'rickshaw',
  titleHindi: 'जगहें और यातायात',
  titleEnglish: 'Cities, Places, Activities & Transportation',
  hook: 'Postpositions (से, तक, में, पर, के पास) get their first workout here - grammar gold, and a natural fit for daily-commute and weekend-trip essays.',
  heroPrompt: composeHeroPrompt(
    'A stylized Indian cityscape with an auto-rickshaw, a bicycle, a Mumbai local train, and a Delhi metro arranged like a board-game route, terracotta rooftops in the distance, a temple dome and a small park on one side, warm morning light',
  ),

  rationale: {
    fcpsSubTopics: [
      'Cities, Places, Activities, and Transportation (FCPS Level 1 - Community Life)',
      'Daily routines involving travel to school and work (FCPS Level 1)',
      'Bridges into Travel and Vacations (FCPS Level 2) by introducing source-destination patterns early',
    ],
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Describe a daily commute using "X से Y तक" plus a transport postposition (बस से, मेट्रो से)',
      'Name at least 8 places in a neighborhood and 6 modes of transport without looking them up',
      'Use the postpositions में, पर, के पास, के सामने correctly for location',
      'Write a 3-paragraph essay combining daily commute (present) and a past trip (past) and a future plan (future)',
      'Add a culturally specific detail (auto-rickshaw bargaining, Mumbai local, Delhi metro) to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Postpositions are the hinge of Hindi sentence structure. Without deliberate practice on से / तक / में / पर / के पास here, every later pack (food, festivals, travel) will leak Language Control points on location and motion sentences.',
  },

  objectives: [
    {
      text: 'Use "X से Y तक" for source-destination in at least two sentences per essay.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Name at least 8 places and 6 transport modes in Hindi without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Pick the right postposition (में vs पर vs के पास) when describing where something is.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Shift tense cleanly between a habitual commute (present), a past trip, and a planned future visit.',
      trains: ['TextType'],
    },
    {
      text: 'Add one city-specific cultural detail (auto bargaining, Mumbai local, metro etiquette) to any essay.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Transport
    { hindi: 'कार', transliteration: 'kaar', english: 'car', exampleHindi: 'पिताजी कार से दफ़्तर जाते हैं।', exampleEnglish: 'Father goes to the office by car.', emoji: '🚗', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'बस', transliteration: 'bas', english: 'bus', exampleHindi: 'मैं रोज़ बस से स्कूल जाता हूँ।', exampleEnglish: 'I go to school by bus every day.', emoji: '🚌', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'ट्रेन', transliteration: 'train', english: 'train', exampleHindi: 'हम दिल्ली से आगरा तक ट्रेन से गए।', exampleEnglish: 'We went from Delhi to Agra by train.', emoji: '🚆', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'मेट्रो', transliteration: 'metro', english: 'metro', exampleHindi: 'दिल्ली की मेट्रो बहुत साफ़ है।', exampleEnglish: "Delhi's metro is very clean.", emoji: '🚇', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'ऑटो रिक्शा', transliteration: 'auto rikshaa', english: 'auto-rickshaw', exampleHindi: 'स्टेशन से घर तक हम ऑटो रिक्शा लेते हैं।', exampleEnglish: 'From the station to home, we take an auto-rickshaw.', emoji: '🛺', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'साइकिल', transliteration: 'saaikil', english: 'bicycle', exampleHindi: 'मेरी बहन साइकिल से बाज़ार जाती है।', exampleEnglish: 'My sister goes to the market by bicycle.', emoji: '🚲', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'पैदल', transliteration: 'paidal', english: 'on foot', exampleHindi: 'स्कूल पास में है, इसलिए मैं पैदल जाता हूँ।', exampleEnglish: 'The school is near, so I go on foot.', emoji: '🚶', partOfSpeech: 'adverb', subgroup: 'Transport' },
    { hindi: 'हवाई जहाज़', transliteration: 'havaai jahaaz', english: 'airplane', exampleHindi: 'हम हवाई जहाज़ से बेंगलुरु गए।', exampleEnglish: 'We went to Bengaluru by airplane.', emoji: '✈️', partOfSpeech: 'noun', subgroup: 'Transport' },

    // Places
    { hindi: 'पार्क', transliteration: 'paark', english: 'park', exampleHindi: 'हमारे घर के पास एक बड़ा पार्क है।', exampleEnglish: 'There is a big park near our home.', emoji: '🌳', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'स्कूल', transliteration: 'school', english: 'school', exampleHindi: 'मेरा स्कूल नौ बजे शुरू होता है।', exampleEnglish: 'My school starts at nine.', emoji: '🏫', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'मंदिर', transliteration: 'mandir', english: 'temple', exampleHindi: 'रविवार को हम मंदिर जाते हैं।', exampleEnglish: 'On Sunday we go to the temple.', emoji: '🛕', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'अस्पताल', transliteration: 'aspataal', english: 'hospital', exampleHindi: 'अस्पताल स्टेशन के सामने है।', exampleEnglish: 'The hospital is in front of the station.', emoji: '🏥', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'बैंक', transliteration: 'baink', english: 'bank', exampleHindi: 'बैंक डाकघर के पास है।', exampleEnglish: 'The bank is near the post office.', emoji: '🏦', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'डाकघर', transliteration: 'daakghar', english: 'post office', exampleHindi: 'डाकघर में चिट्ठी भेजते हैं।', exampleEnglish: 'We send letters at the post office.', emoji: '📮', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'सिनेमा हॉल', transliteration: 'cinema hall', english: 'cinema hall', exampleHindi: 'शनिवार को हम सिनेमा हॉल गए।', exampleEnglish: 'On Saturday we went to the cinema.', emoji: '🎬', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'बाज़ार', transliteration: 'baazaar', english: 'market', exampleHindi: 'माँ बाज़ार से सब्ज़ी लाती हैं।', exampleEnglish: 'Mother brings vegetables from the market.', emoji: '🛍️', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'स्टेशन', transliteration: 'steshan', english: 'station', exampleHindi: 'स्टेशन पर बहुत भीड़ थी।', exampleEnglish: 'There was a lot of crowd at the station.', emoji: '🚉', partOfSpeech: 'noun', subgroup: 'Places' },

    // Cities
    { hindi: 'दिल्ली', transliteration: 'Dilli', english: 'Delhi', exampleHindi: 'दिल्ली भारत की राजधानी है।', exampleEnglish: 'Delhi is the capital of India.', emoji: '🏛️', partOfSpeech: 'noun', subgroup: 'Cities' },
    { hindi: 'मुंबई', transliteration: 'Mumbai', english: 'Mumbai', exampleHindi: 'मुंबई में समुद्र है।', exampleEnglish: 'There is a sea in Mumbai.', emoji: '🌊', partOfSpeech: 'noun', subgroup: 'Cities' },
    { hindi: 'जयपुर', transliteration: 'Jaipur', english: 'Jaipur', exampleHindi: 'जयपुर को गुलाबी शहर कहते हैं।', exampleEnglish: 'Jaipur is called the Pink City.', emoji: '🏰', partOfSpeech: 'noun', subgroup: 'Cities' },
    { hindi: 'आगरा', transliteration: 'Aagra', english: 'Agra', exampleHindi: 'आगरा में ताजमहल है।', exampleEnglish: 'The Taj Mahal is in Agra.', emoji: '🕌', partOfSpeech: 'noun', subgroup: 'Cities' },

    // Direction words
    { hindi: 'बाएँ', transliteration: 'baayen', english: 'left', exampleHindi: 'बैंक के बाएँ एक पार्क है।', exampleEnglish: 'There is a park to the left of the bank.', emoji: '👈', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'दाएँ', transliteration: 'daayen', english: 'right', exampleHindi: 'स्कूल दाएँ मुड़ने पर है।', exampleEnglish: 'The school is after turning right.', emoji: '👉', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'सीधा', transliteration: 'seedha', english: 'straight', exampleHindi: 'सीधा जाइए, स्टेशन मिलेगा।', exampleEnglish: 'Go straight, you will find the station.', emoji: '⬆️', partOfSpeech: 'adverb', subgroup: 'Directions' },
    { hindi: 'आगे', transliteration: 'aage', english: 'ahead / in front', exampleHindi: 'मेरा घर थोड़ा आगे है।', exampleEnglish: 'My home is a little ahead.', emoji: '➡️', partOfSpeech: 'adverb', subgroup: 'Directions' },

    // Verbs
    { hindi: 'जाना', transliteration: 'jaana', english: 'to go', exampleHindi: 'हम हर रविवार मंदिर जाते हैं।', exampleEnglish: 'We go to the temple every Sunday.', emoji: '🚶', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'आना', transliteration: 'aana', english: 'to come', exampleHindi: 'मेरे दादाजी कल जयपुर से आए।', exampleEnglish: 'My grandfather came from Jaipur yesterday.', emoji: '🔙', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'घूमना', transliteration: 'ghoomna', english: 'to roam / tour', exampleHindi: 'हम आगरा में ताजमहल देखने घूमे।', exampleEnglish: 'We roamed in Agra to see the Taj Mahal.', emoji: '🗺️', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'पहुँचना', transliteration: 'pahunchana', english: 'to arrive / reach', exampleHindi: 'हम नौ बजे स्कूल पहुँचते हैं।', exampleEnglish: 'We reach school at nine.', emoji: '🏁', partOfSpeech: 'verb', subgroup: 'Verbs' },
  ],
  vocabularyNote: {
    why:
      'These 28 words cover the three vocabulary clusters FCPS commute/travel prompts pull from: transport modes, neighborhood places, and city names. Every word appears in the anchor, a model text, or a model essay - nothing is decorative.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Postpositions of location: में, पर, के पास, के सामने',
      rule:
        'Hindi uses postpositions (after the noun) instead of prepositions. For location: में = inside, पर = on / at (a point), के पास = near, के सामने = in front of. Pick the one that matches the actual spatial relationship - getting this right is half of Language Control on a location essay.',
      examples: [
        { hindi: 'किताब बैग में है।', transliteration: 'kitaab baig mein hai.', english: 'The book is in the bag.' },
        { hindi: 'हम स्टेशन पर मिले।', transliteration: 'hum steshan par mile.', english: 'We met at the station.' },
        { hindi: 'मेरा स्कूल मंदिर के पास है।', transliteration: 'mera school mandir ke paas hai.', english: 'My school is near the temple.' },
        { hindi: 'अस्पताल बैंक के सामने है।', transliteration: 'aspataal baink ke saamne hai.', english: 'The hospital is in front of the bank.' },
      ],
      pitfall:
        'Students often use में for everything ("स्टेशन में मिले") when they mean "at the station" - that needs पर. में is only for being INSIDE something enclosed.',
      whyItMatters:
        'One wrong postposition can make a sentence locate a person inside a building they are really standing in front of. The STAMP rubric flags this under Language Control as a breakdown in meaning, capping the score at Intermediate-Low.',
    },
    {
      title: 'Source and destination: X से Y तक',
      rule:
        'से = from (source). तक = until / up to (destination). Pair them to talk about routes: "घर से स्कूल तक" (from home to school). This is the single most useful frame for commute and trip essays.',
      examples: [
        { hindi: 'मैं घर से स्कूल तक बस से जाता हूँ।', transliteration: 'main ghar se school tak bas se jaata hoon.', english: 'I go from home to school by bus.' },
        { hindi: 'दिल्ली से आगरा तक ट्रेन दो घंटे लेती है।', transliteration: 'Dilli se Aagra tak train do ghante leti hai.', english: 'The train takes two hours from Delhi to Agra.' },
        { hindi: 'सुबह नौ से शाम चार तक स्कूल चलता है।', transliteration: 'subah nau se shaam chaar tak school chalta hai.', english: 'School runs from 9 AM to 4 PM.' },
      ],
      pitfall:
        'The transport mode also takes से (बस से, ट्रेन से), so one sentence can have से twice. Do not drop the second से - it signals HOW you travelled, not WHERE you came from.',
      whyItMatters:
        'X से Y तक is the signature Intermediate-Mid frame for motion. A rater who sees two correctly formed source-destination sentences in one essay will mark Language Control at Average or higher almost automatically.',
    },
    {
      title: 'Transport "से" - the instrumental use',
      rule:
        'To say "by bus / by train / by car", use the transport noun + से. "पैदल" (on foot) is the one exception - it is an adverb and takes NO से. Never say "कार से से" or "पैदल से".',
      examples: [
        { hindi: 'हम मेट्रो से दफ़्तर जाते हैं।', transliteration: 'hum metro se daftar jaate hain.', english: 'We go to the office by metro.' },
        { hindi: 'छोटी बहन साइकिल से स्कूल जाती है।', transliteration: 'chhoti bahan saaikil se school jaati hai.', english: 'Younger sister goes to school by bicycle.' },
        { hindi: 'स्कूल पास है, इसलिए मैं पैदल जाता हूँ।', transliteration: 'school paas hai, isliye main paidal jaata hoon.', english: 'School is near, so I go on foot.' },
      ],
      pitfall:
        'Beginners often say "मैं बस में जाता हूँ" thinking "in the bus". Hindi uses से here, not में. में would mean physically inside, as a comment on location, not the means of travel.',
      whyItMatters:
        'Transport-से is tested on almost every commute prompt. One clean "बस से जाता हूँ" anchors Topic Coverage AND Language Control in the same sentence.',
    },
    {
      title: 'Direction-giving frame: सीधा ___, फिर बाएँ/दाएँ',
      rule:
        'To give directions, chain direction adverbs with connectors: सीधा जाइए (go straight), फिर बाएँ मुड़िए (then turn left), दाएँ आपको ___ मिलेगा (on the right you will find ___). Using the polite imperative (जाइए, मुड़िए) matches essay register.',
      examples: [
        { hindi: 'सीधा जाइए, फिर बाएँ मुड़िए।', transliteration: 'seedha jaaiye, phir baayen mudiye.', english: 'Go straight, then turn left.' },
        { hindi: 'दाएँ आपको डाकघर मिलेगा।', transliteration: 'daayen aapko daakghar milega.', english: 'On the right, you will find the post office.' },
        { hindi: 'मेरा घर स्कूल के सामने थोड़ा आगे है।', transliteration: 'mera ghar school ke saamne thoda aage hai.', english: 'My home is a little ahead, in front of the school.' },
      ],
      pitfall:
        'Mixing casual imperatives (जा, मुड़) into an essay drops the register. Use the formal -इए forms in writing.',
      whyItMatters:
        'A two-sentence direction block inside a commute essay showcases the polite register raters look for under Text-Type. Cheap way to earn a point.',
    },
  ],
  grammarNote: {
    why:
      'Postpositions are where Hindi Language Control is won or lost. These four rules (में/पर/के पास, से/तक, transport-से, direction forms) together account for roughly 70% of the location-and-motion errors on FCPS commute essays. Drill these before anything else in this pack.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'antMein',
    'kyonki',
    'lekin',
    'isliye',
  ]),
  connectorsNote: {
    why:
      'A commute narrates time (पहले, फिर, इसके बाद, अंत में) and a trip narrates reasoning (क्योंकि, लेकिन, इसलिए). Both kinds show up in a single essay when a student describes the daily route AND a weekend trip. Master these seven and every prompt in this pack becomes writable.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरा रोज़ का रास्ता और एक छोटी यात्रा · My Daily Route and a Short Trip',
    hindi:
      'मैं दिल्ली में रहता हूँ। हमारा घर एक शांत गली में है, स्कूल के पास। पहले मैं सुबह सात बजे उठता हूँ, फिर नाश्ता करता हूँ। इसके बाद मैं बस से स्कूल जाता हूँ। स्कूल घर से लगभग तीन किलोमीटर दूर है, इसलिए पैदल जाना मुश्किल है। बस स्टेशन के सामने रुकती है।\n\nपिछले शनिवार को मेरा परिवार आगरा गया। हम दिल्ली से आगरा तक ट्रेन से गए, क्योंकि सड़क पर बहुत भीड़ थी। आगरा पहुँचकर हमने एक ऑटो रिक्शा लिया और ताजमहल घूमे। अंत में हम शाम को वापस दिल्ली आए। यह एक छोटी लेकिन बहुत अच्छी यात्रा थी।',
    transliteration:
      'main Dilli mein rahta hoon. hamaara ghar ek shaant gali mein hai, school ke paas. pahle main subah saat baje uthata hoon, phir naashta karta hoon. iske baad main bas se school jaata hoon. school ghar se lagbhag teen kilometre door hai, isliye paidal jaana mushkil hai. bas steshan ke saamne rukti hai.\n\npichhle shanivaar ko mera parivaar Aagra gaya. hum Dilli se Aagra tak train se gaye, kyonki sadak par bahut bheed thi. Aagra pahunchkar humne ek auto rikshaa liya aur Taj Mahal ghoome. ant mein hum shaam ko vaapas Dilli aaye. yah ek chhoti lekin bahut achchhi yaatraa thi.',
    english:
      'I live in Delhi. Our home is on a quiet lane, near the school. First, I wake up at seven in the morning, then I have breakfast. After this I go to school by bus. The school is about three kilometres from home, so going on foot is difficult. The bus stops in front of the station.\n\nLast Saturday, my family went to Agra. We went from Delhi to Agra by train, because there was too much traffic on the road. After reaching Agra, we took an auto-rickshaw and toured the Taj Mahal. In the end we came back to Delhi in the evening. It was a short but very nice trip.',
    highlights: [
      { term: 'घर ... स्कूल के पास / बस स्टेशन के सामने', note: 'Two different location postpositions (के पास, के सामने) in one paragraph - shows Language Control.' },
      { term: 'बस से स्कूल जाता हूँ / ट्रेन से गए', note: 'Transport से twice - present habitual and past perfective side by side.' },
      { term: 'दिल्ली से आगरा तक', note: 'The signature X से Y तक frame, planted in paragraph 2 for contrast with the daily commute.' },
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors scaffold two paragraphs - this is Text-Type 5 shape.' },
      { term: 'क्योंकि / इसलिए / लेकिन', note: 'Three reasoning connectors across the passage add the "why" raters reward.' },
      { term: 'पिछले शनिवार को ... वापस दिल्ली आए', note: 'Past-tense trip narrated cleanly with motion verbs (गया, गए, आए).' },
    ],
    comprehensionQuestions: [
      { q: 'Where does the narrator live?', a: 'दिल्ली में, स्कूल के पास एक शांत गली में.' },
      { q: 'How does the narrator go to school, and why not on foot?', a: 'बस से - स्कूल लगभग तीन किलोमीटर दूर है, इसलिए पैदल जाना मुश्किल है.' },
      { q: 'Where does the bus stop?', a: 'स्टेशन के सामने.' },
      { q: 'When did the family go to Agra and by what means?', a: 'पिछले शनिवार को, दिल्ली से आगरा तक ट्रेन से.' },
      { q: 'Why did they take the train and not the road?', a: 'क्योंकि सड़क पर बहुत भीड़ थी.' },
      { q: 'What did they use once they reached Agra?', a: 'एक ऑटो रिक्शा, ताजमहल घूमने के लिए.' },
      { q: 'Identify one postposition and say what it does.', a: 'के पास = near, के सामने = in front of, से = from / by, तक = up to, में = in, पर = at / on.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor deliberately fuses two FCPS-favourite sub-prompts into one passage: a habitual commute (paragraph 1, present) and a specific past trip (paragraph 2, past). That is the exact shape the model essays push students toward. Read it aloud three times - the postposition patterns will start to feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'मेरा हफ़्ते का रास्ता · My Weekly Route',
      hindi:
        'सोमवार – बस से स्कूल\nमंगलवार – बस से स्कूल\nबुधवार – पिताजी कार से छोड़ते हैं\nगुरुवार – बस से स्कूल\nशुक्रवार – बस से स्कूल\nशनिवार – साइकिल से पार्क\nरविवार – पैदल मंदिर',
      transliteration:
        'somvaar - bas se school | mangalvaar - bas se school | budhvaar - pitaji kaar se chhodte hain | guruvaar - bas se school | shukravaar - bas se school | shanivaar - saaikil se paark | ravivaar - paidal mandir',
      english:
        'Monday - bus to school · Tuesday - bus to school · Wednesday - father drops me by car · Thursday - bus to school · Friday - bus to school · Saturday - bicycle to the park · Sunday - on foot to the temple',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! मैं अभी मेट्रो में हूँ 🚇 स्टेशन से निकलकर तुम्हारे घर तक ऑटो रिक्शा लूँगा। दस मिनट में पहुँच जाऊँगा। बाहर ही मिलना, अंदर मत आना।',
      transliteration:
        'are! main abhi metro mein hoon. steshan se nikalkar tumhaare ghar tak auto rikshaa loonga. das minat mein pahunch jaaoonga. baahar hi milna, andar mat aana.',
      english:
        "Hey! I'm on the metro right now. After leaving the station, I'll take an auto-rickshaw to your place. I'll arrive in ten minutes. Just meet me outside, don't come inside.",
    },
    {
      kind: 'sign',
      title: 'मेट्रो स्टेशन पर सूचना · Notice at a Metro Station',
      hindi:
        'कृपया ध्यान दीजिए। दाएँ चलिए, बाएँ नहीं। ट्रेन में चढ़ने से पहले यात्रियों को उतरने दीजिए। सीट बुज़ुर्गों और बच्चों के लिए छोड़िए। धन्यवाद।',
      transliteration:
        'kripaya dhyaan deejiye. daayen chaliye, baayen nahin. train mein chadhne se pahle yaatriyon ko utarne deejiye. seat buzurgon aur bachchon ke liye chhodiye. dhanyavaad.',
      english:
        'Please note. Walk on the right, not the left. Before boarding the train, let passengers alight. Leave seats for the elderly and children. Thank you.',
    },
    {
      kind: 'diary',
      title: 'आगरा की यात्रा · A Trip to Agra',
      hindi:
        'आज हम दिल्ली से आगरा आए। पहले हमने स्टेशन पर नाश्ता किया, फिर ट्रेन में बैठे। ट्रेन दो घंटे में पहुँच गई। ताजमहल बहुत सुंदर था। अंत में हमने एक छोटे बाज़ार में मिठाई खाई। यह दिन मुझे हमेशा याद रहेगा।',
      transliteration:
        'aaj hum Dilli se Aagra aaye. pahle humne steshan par naashta kiya, phir train mein baithe. train do ghante mein pahunch gayi. Taj Mahal bahut sundar tha. ant mein humne ek chhote baazaar mein mithaai khaayi. yah din mujhe hamesha yaad rahega.',
      english:
        'Today we came from Delhi to Agra. First we had breakfast at the station, then we sat on the train. The train arrived in two hours. The Taj Mahal was very beautiful. In the end we ate sweets in a small market. I will always remember this day.',
    },
  ],
  modelTextsNote: {
    why:
      'A weekly schedule, a casual SMS, a station notice, and a diary entry - four registers, four uses of the same postposition set. Seeing से / तक / में / पर / के पास re-used across formal and informal texts cements the patterns better than any drill sheet.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'The Auto-Rickshaw and the Art of Bargaining',
      body:
        'In most Indian cities auto-rickshaws run on meters in theory but on negotiation in practice. "मीटर से चलेगा?" (Will it run by meter?) is the opening phrase of a daily commuter. Dropping this into an essay signals real-world familiarity, not tourist-brochure Hindi.',
      emoji: '🛺',
    },
    {
      title: 'The Mumbai Local - a City Inside a Train',
      body:
        'Mumbai\'s local trains carry more than 7 million people a day. There are separate compartments for women, for first class, and for luggage. Saying "मुंबई की लोकल में बहुत भीड़ होती है" is a dense, authentic detail that raters reward under Topic Coverage.',
      emoji: '🚆',
    },
    {
      title: 'Delhi Metro Etiquette',
      body:
        'Delhi\'s metro has a pink women-only coach, priority seats for the elderly, and an unspoken rule: stand on the right of the escalator, walk on the left. Referencing "पिंक कोच" or "बाएँ चलिए" lifts a commute essay above generic.',
      emoji: '🚇',
    },
    {
      title: 'Small-Town Bicycle Culture',
      body:
        'In towns like Allahabad, Ujjain, and Varanasi, the bicycle is still the commuter\'s vehicle - students, teachers, and milk-sellers all ride. Mentioning "मेरे दादाजी के गाँव में सब साइकिल से चलते हैं" ties modern transport to family memory.',
      emoji: '🚲',
    },
    {
      title: 'The Indian Family Road Trip',
      body:
        'A family car trip comes with its own ritual: packed पूरी-सब्ज़ी, a stop at a dhaba, antakshari (song-chain game) to pass the time. Naming any one of these - "हमने रास्ते में अंताक्षरी खेली" - anchors the essay in real Indian life.',
      emoji: '🚗',
    },
  ],
  culturalNote: {
    why:
      'Transport essays written without cultural specifics all read the same ("I went by bus, it was good"). The five items above each give the student a short, ready-made phrase to insert - auto bargaining, Mumbai local crowding, metro etiquette, cycle culture, antakshari on a drive - that separates their essay from the pile for pure Text-Type and Topic-Coverage lift.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'रास्ता साफ़ होना',
      literal: 'for the road to be clear',
      meaning: 'For the path / way to be open; for obstacles to clear.',
      example: 'परीक्षा ख़त्म हुई, अब मेरे लिए रास्ता साफ़ है।',
      exampleEnglish: 'The exam is over - now the way is clear for me.',
    },
    {
      phrase: 'पैर जमाना',
      literal: 'to plant one\'s feet',
      meaning: 'To establish oneself in a place (a job, a city).',
      example: 'मेरे चाचा ने मुंबई में पाँच साल में पैर जमा लिए।',
      exampleEnglish: 'My uncle established himself in Mumbai in five years.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are travel- and place-themed, so they fit a commute or relocation essay without feeling pasted in. One idiom, correctly placed in a Benchmark-5 essay, is a register-mastery signal - two is overkill.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Daily route',
      prompt:
        'अपने रोज़ के रास्ते और एक याद्दाश्त-भरी यात्रा के बारे में तीन अनुच्छेदों में लिखिए। (Write three paragraphs about your daily route and one memorable trip.)',
      novice:
        'मैं बस से स्कूल जाता हूँ। आगरा अच्छा है। मुझे पसंद है।',
      intermediateMid:
        'मैं दिल्ली में रहता हूँ, और हमारा घर एक पार्क के पास है। पहले मैं सुबह सात बजे उठता हूँ, फिर नाश्ता करता हूँ और बस से स्कूल जाता हूँ। स्कूल घर से लगभग तीन किलोमीटर दूर है, इसलिए पैदल जाना मुश्किल है। बस स्टेशन के सामने रुकती है, और मेरा स्कूल वहाँ से दाएँ है।\n\nपिछले शनिवार को मेरा परिवार आगरा गया। हम दिल्ली से आगरा तक ट्रेन से गए, क्योंकि सड़क पर बहुत भीड़ थी। स्टेशन पर पहुँचकर हमने एक ऑटो रिक्शा लिया। ऑटो वाले ने पहले ज़्यादा दाम माँगे, लेकिन पिताजी ने मीटर से चलने को कहा। इसके बाद हम ताजमहल घूमे।\n\nमुझे लगता है कि रोज़ का रास्ता और एक यात्रा, दोनों ज़रूरी हैं। अगले महीने हम जयपुर जाएँगे और वहाँ कार से घूमेंगे। अंत में, मैं सीखा कि शहर से शहर तक जाना सिर्फ़ यात्रा नहीं, बल्कि एक नई कहानी भी है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'पार्क के पास / स्टेशन के सामने / वहाँ से दाएँ', note: 'Three different location postpositions in one paragraph - clean Language Control signal.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... इसलिए', note: 'Time and reason connectors stacked - classic Intermediate-Mid sequencing.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'बस से स्कूल जाता हूँ', note: 'Transport-से used in the signature present-habitual commute frame.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले शनिवार को ... ट्रेन से गए', note: 'Switch to past-perfective with motion verb. Tense shift is obvious and controlled.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'दिल्ली से आगरा तक', note: 'The signature X से Y तक frame.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'मीटर से चलने को कहा', note: 'Auto-rickshaw bargaining detail - authentic cultural specific.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'ज़्यादा दाम माँगे ... मीटर से चलने को कहा', note: 'Real-world Hindi register used in a narrative, not as a drill.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... जाएँगे ... घूमेंगे', note: 'Future tense arrives in the closing - three time frames sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ यात्रा नहीं, बल्कि एक नई कहानी भी', note: 'Not-only-but-also structure - Intermediate-Mid hallmark, closing reflection.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'इसलिए', 'क्योंकि', 'लेकिन', 'इसके बाद', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three paragraphs, three time frames - present habitual commute, past Saturday trip, future Jaipur plan. Text-Type 5 criteria met.',
          'Five distinct postpositions used correctly (में, के पास, से, तक, पर, के सामने). Raters stabilize Language Control at Average or High.',
          'Transport-से appears four times in natural sentences (बस से, ट्रेन से, ऑटो रिक्शा, कार से) - dense Topic Coverage.',
          'The auto-rickshaw bargaining line ("मीटर से चलने को कहा") is a concrete cultural specific - pure Text-Type lift.',
          'Not-only-but-also closing ("सिर्फ़ यात्रा नहीं, बल्कि एक नई कहानी भी") is an Intermediate-Mid structural hallmark.',
        ],
        gotchas: [
          'A student who writes "स्कूल में जाता हूँ" (wrong - needs no postposition with motion verb to a destination noun in this construction; or uses direct form) may drop Language Control.',
          'Confusing के पास (near) and के सामने (in front of) flips meaning and counts as a Language-Control error.',
        ],
      },
    },
    {
      shortLabel: 'Special place',
      prompt:
        'अपने शहर में एक ख़ास जगह तक पहुँचने का रास्ता और वहाँ क्या करते हैं, तीन अनुच्छेदों में बताइए। (In three paragraphs, describe the route to a special place in your city and what you do there.)',
      novice: 'मैं पार्क जाता हूँ। पार्क अच्छा है। मैं खेलता हूँ।',
      intermediateMid:
        'मेरे शहर दिल्ली में एक बड़ा पार्क है, जिसका नाम "लोधी गार्डन" है। यह मेरे घर से लगभग पाँच किलोमीटर दूर है। मैं वहाँ हर रविवार जाता हूँ, क्योंकि वहाँ बहुत शांति मिलती है।\n\nघर से पार्क तक जाने के लिए पहले मैं मेट्रो लेता हूँ। मेट्रो स्टेशन हमारे घर के पास है, इसलिए मैं पैदल स्टेशन तक जाता हूँ। फिर जोर बाग़ स्टेशन पर उतरकर मैं दाएँ मुड़ता हूँ, सीधा चलता हूँ, और पार्क के सामने पहुँच जाता हूँ। पिछले रविवार को मैं और मेरी बहन वहाँ गए। हमने पार्क में साइकिल चलाई और एक पेड़ के नीचे बैठकर किताबें पढ़ीं।\n\nमुझे लगता है कि शहर में एक ख़ास जगह होना ज़रूरी है। अगले महीने मैं वहाँ अपने दोस्तों को भी ले जाऊँगा। अंत में, मैं कहूँगा कि यह जगह सिर्फ़ एक पार्क नहीं, बल्कि मेरे हफ़्ते का सबसे अच्छा हिस्सा है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'घर से ... पाँच किलोमीटर दूर', note: 'Distance-from frame using से. Natural Language Control anchor.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि वहाँ बहुत शांति मिलती है', note: 'Early reason clause sets the emotional stakes - Text-Type lift.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'घर से पार्क तक', note: 'X से Y तक deployed as the paragraph opener - the pack\'s signature frame.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'दाएँ मुड़ता हूँ, सीधा चलता हूँ, पार्क के सामने', note: 'Direction-giving chain - three direction words in two sentences. Dense Topic Coverage.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले रविवार को ... साइकिल चलाई ... पढ़ीं', note: 'Past perfective with correct feminine plural agreement (पढ़ीं) - Language Control signal.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... ले जाऊँगा', note: 'Future tense appears naturally in the closing - third time frame locked in.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ एक पार्क नहीं, बल्कि ... सबसे अच्छा हिस्सा', note: 'Reflective not-only-but-also closing - Intermediate-Mid hallmark.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'पहले', 'इसलिए', 'फिर', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Present-habitual paragraph 1 + past-perfective paragraph 2 + future paragraph 3 - three time frames in 138 words. Benchmark 5 shape.',
          'Direction-giving chain (दाएँ मुड़ता हूँ, सीधा चलता हूँ, के सामने) uses three pack vocabulary items in one sequence - Topic Coverage boost.',
          'Past perfective पढ़ीं with correct feminine plural agreement (for किताबें) - the kind of fine detail that pushes Language Control to Average or High.',
          'Closing "सिर्फ़ ... बल्कि ... भी" is the reflective IM structure raters consistently reward.',
        ],
        gotchas: [
          'Writing "मैं मेट्रो में लेता हूँ" instead of "मेट्रो लेता हूँ" (adding the wrong postposition) would drop Language Control.',
          'If पढ़ीं becomes पढ़ा (ignoring feminine-plural object agreement in ने construction), raters flag it under Language Control.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Both essays braid a habitual commute with a past trip and a future plan - the exact three-time-frame structure the rubric rewards. Study the annotations until you can reproduce the postposition patterns (से / तक / के पास / के सामने / पर) without thinking.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने रोज़ के स्कूल के रास्ते के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप कब निकलते हैं, किस साधन से जाते हैं, और रास्ते में क्या दिखता है।',
      english:
        'Write three paragraphs about your daily route to school. Describe when you leave, by what means you travel, and what you see on the way.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'क्योंकि'],
        vocab: ['बस', 'स्टेशन', 'के पास', 'के सामने', 'दाएँ', 'बाएँ'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'एक यादगार यात्रा के बारे में तीन अनुच्छेदों में लिखिए। आप कहाँ से कहाँ तक गए, किस साधन से, और वहाँ क्या देखा या किया - सब बताइए।',
      english:
        'Write three paragraphs about a memorable trip. Say where you went from and to, by what means, and what you saw or did there.',
      hint: {
        connectors: ['पहले', 'फिर', 'अंत में', 'लेकिन'],
        vocab: ['ट्रेन', 'ऑटो रिक्शा', 'से ... तक', 'घूमना', 'पहुँचना'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगर आप अगले साल भारत के किसी शहर में घूमने जाएँगे, तो कौन सा शहर चुनेंगे और क्यों? तीन अनुच्छेदों में लिखिए - शहर, साधन, और वहाँ क्या करेंगे।',
      english:
        'If you were to visit an Indian city next year, which one would you choose and why? Write three paragraphs - the city, the transport, and what you would do there.',
      hint: {
        connectors: ['अगर... तो', 'क्योंकि', 'इसलिए', 'अंत में'],
        vocab: ['दिल्ली', 'मुंबई', 'जयपुर', 'हवाई जहाज़', 'मेट्रो', 'घूमना'],
        tenses: ['future', 'present'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 locks in the present-habitual commute. Prompt 2 locks in the past trip with से / तक. Prompt 3 pushes into future + conditional (अगर...तो). Between the three, a student writing all of them will have practiced all three time frames and every postposition in the pack.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every essay. Look specifically for: at least two correct postpositions, at least one X से Y तक frame, transport-से used once, and a tense shift between paragraphs. If any of those four are missing, revise before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
