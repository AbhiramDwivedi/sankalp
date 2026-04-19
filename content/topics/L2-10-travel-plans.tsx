import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

export const pack: TopicPack = {
  id: 'L2-10-travel-plans',
  level: 2,
  themeGroup: 'ModernSociety',
  topicTheme: 'travel',
  order: 22,
  heroMotif: 'suitcase',
  titleHindi: 'यात्रा की योजनाएँ',
  titleEnglish: 'Travel Plans & Activities',
  hook: 'Future tense + "if...then" conditionals - unavoidable on any travel prompt.',
  heroPrompt: composeHeroPrompt(
    'A vintage suitcase covered in stickers of Indian cities - Jaipur, Varanasi, Kerala - a map unfurled behind it, a paper boat and a train ticket resting on a wooden table, morning light',
  ),

  rationale: {
    fcpsSubTopics: [
      'Travel Plans and Activities (FCPS Level 2 - Vacation & Travel)',
      'Describing vacations and trips using past and future (FCPS Level 2)',
      'Comparing places and making choices (FCPS Level 2 - Modern Society)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Write a 3-paragraph trip plan using future tense correctly across masculine and feminine verbs',
      'Use at least two conditional sentences (अगर ... तो ...) in a single essay',
      'Compare two destinations (hill station vs. beach) using लेकिन, जबकि, और इसलिए',
      'Anchor a travel essay with one culturally specific Indian destination (Shimla, Goa, Varanasi) rather than generic "a nice place"',
      'Shift cleanly between past (last vacation), present (planning now), and future (next trip) inside 150 words',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Travel is one of the three prompt families FCPS raters choose from. Without future-tense + conditional control, a student defaults to a past-only "last summer we went" narrative - which caps at Benchmark 4 (2 credits).',
  },

  objectives: [
    {
      text: 'Name at least 15 places, transport modes, and travel nouns in Hindi without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Conjugate the simple future of जाना, घूमना, and करना correctly for मैं / हम / वे.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Produce two well-formed अगर ... तो ... sentences in a single essay.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Compare two destinations in one paragraph using at least two contrast connectors.',
      trains: ['TextType'],
    },
    {
      text: 'Include one concrete Indian destination (hill station, beach, or pilgrimage city) rather than "a nice place."',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Places - general
    { hindi: 'पहाड़', transliteration: 'pahaad', english: 'mountain', exampleHindi: 'हम गर्मियों में पहाड़ जाएँगे।', exampleEnglish: 'In summer, we will go to the mountains.', emoji: '⛰️', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'समुद्र तट', transliteration: 'samudra tat', english: 'beach / seashore', exampleHindi: 'मुझे समुद्र तट पर घूमना बहुत पसंद है।', exampleEnglish: 'I really like walking on the beach.', emoji: '🏖️', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'जंगल', transliteration: 'jangal', english: 'forest / jungle', exampleHindi: 'जंगल में कई जानवर रहते हैं।', exampleEnglish: 'Many animals live in the forest.', emoji: '🌳', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'शहर', transliteration: 'shahar', english: 'city', exampleHindi: 'दिल्ली एक बड़ा शहर है।', exampleEnglish: 'Delhi is a big city.', emoji: '🏙️', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'गाँव', transliteration: 'gaanv', english: 'village', exampleHindi: 'मेरे दादाजी गाँव में रहते हैं।', exampleEnglish: 'My grandfather lives in a village.', emoji: '🏡', partOfSpeech: 'noun', subgroup: 'Places' },

    // Places - specific destinations
    { hindi: 'हिमालय', transliteration: 'himaalay', english: 'the Himalayas', exampleHindi: 'हिमालय की चोटियाँ बहुत ऊँची हैं।', exampleEnglish: 'The peaks of the Himalayas are very high.', emoji: '🏔️', partOfSpeech: 'noun', subgroup: 'Destinations' },
    { hindi: 'गोवा', transliteration: 'goa', english: 'Goa', exampleHindi: 'गोवा में सुंदर समुद्र तट हैं।', exampleEnglish: 'Goa has beautiful beaches.', emoji: '🌴', partOfSpeech: 'noun', subgroup: 'Destinations' },
    { hindi: 'केरल', transliteration: 'keral', english: 'Kerala', exampleHindi: 'केरल को भगवान का अपना देश कहते हैं।', exampleEnglish: "Kerala is called God's Own Country.", emoji: '🥥', partOfSpeech: 'noun', subgroup: 'Destinations' },
    { hindi: 'राजस्थान', transliteration: 'raajasthaan', english: 'Rajasthan', exampleHindi: 'राजस्थान में बहुत पुराने किले हैं।', exampleEnglish: 'There are very old forts in Rajasthan.', emoji: '🏰', partOfSpeech: 'noun', subgroup: 'Destinations' },
    { hindi: 'आगरा', transliteration: 'aagra', english: 'Agra', exampleHindi: 'आगरा में ताजमहल है।', exampleEnglish: 'The Taj Mahal is in Agra.', emoji: '🕌', partOfSpeech: 'noun', subgroup: 'Destinations' },

    // Transport
    { hindi: 'ट्रेन', transliteration: 'tren', english: 'train', exampleHindi: 'हम ट्रेन से जयपुर जाएँगे।', exampleEnglish: 'We will go to Jaipur by train.', emoji: '🚆', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'हवाई जहाज़', transliteration: 'hawai jahaaz', english: 'airplane', exampleHindi: 'पापा हवाई जहाज़ से मुंबई गए।', exampleEnglish: 'Father went to Mumbai by airplane.', emoji: '✈️', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'बस', transliteration: 'bas', english: 'bus', exampleHindi: 'बस स्टेशन घर के पास है।', exampleEnglish: 'The bus station is near the house.', emoji: '🚌', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'कार', transliteration: 'kaar', english: 'car', exampleHindi: 'हम कार से पहाड़ जाएँगे।', exampleEnglish: 'We will go to the mountains by car.', emoji: '🚗', partOfSpeech: 'noun', subgroup: 'Transport' },
    { hindi: 'टैक्सी', transliteration: 'taiksi', english: 'taxi', exampleHindi: 'होटल से स्टेशन तक टैक्सी लेंगे।', exampleEnglish: 'We will take a taxi from the hotel to the station.', emoji: '🚕', partOfSpeech: 'noun', subgroup: 'Transport' },

    // Trip nouns
    { hindi: 'यात्रा', transliteration: 'yaatra', english: 'journey / trip', exampleHindi: 'हमारी यात्रा बहुत लंबी थी।', exampleEnglish: 'Our journey was very long.', emoji: '🧳', partOfSpeech: 'noun', subgroup: 'Trip' },
    { hindi: 'छुट्टी', transliteration: 'chhutti', english: 'vacation / holiday', exampleHindi: 'गर्मियों की छुट्टी में हम नानी के घर जाएँगे।', exampleEnglish: "In summer vacation we will go to grandmother's house.", emoji: '🌞', partOfSpeech: 'noun', subgroup: 'Trip' },
    { hindi: 'सामान', transliteration: 'saamaan', english: 'luggage / belongings', exampleHindi: 'मैंने अपना सामान बैग में रखा।', exampleEnglish: 'I put my luggage in the bag.', emoji: '🧳', partOfSpeech: 'noun', subgroup: 'Trip' },
    { hindi: 'टिकट', transliteration: 'tikat', english: 'ticket', exampleHindi: 'पापा ने ट्रेन के टिकट खरीदे।', exampleEnglish: 'Father bought the train tickets.', emoji: '🎫', partOfSpeech: 'noun', subgroup: 'Trip' },
    { hindi: 'होटल', transliteration: 'hotal', english: 'hotel', exampleHindi: 'होटल समुद्र तट के पास है।', exampleEnglish: 'The hotel is near the beach.', emoji: '🏨', partOfSpeech: 'noun', subgroup: 'Trip' },
    { hindi: 'पासपोर्ट', transliteration: 'paasport', english: 'passport', exampleHindi: 'विदेश जाने के लिए पासपोर्ट चाहिए।', exampleEnglish: 'A passport is needed to go abroad.', emoji: '🛂', partOfSpeech: 'noun', subgroup: 'Trip' },

    // Activity verbs
    { hindi: 'घूमना', transliteration: 'ghoomna', english: 'to roam / sightsee', exampleHindi: 'हम शहर में दिन भर घूमेंगे।', exampleEnglish: 'We will roam around the city all day.', emoji: '🚶', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'फ़ोटो लेना', transliteration: 'photo lena', english: 'to take photos', exampleHindi: 'मैंने ताजमहल के सामने फ़ोटो ली।', exampleEnglish: 'I took a photo in front of the Taj Mahal.', emoji: '📸', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'खरीदारी करना', transliteration: 'khareedaari karna', english: 'to shop', exampleHindi: 'हम बाज़ार में खरीदारी करेंगे।', exampleEnglish: 'We will shop in the market.', emoji: '🛍️', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'स्वाद लेना', transliteration: 'svaad lena', english: 'to taste / try (food)', exampleHindi: 'केरल में हम नारियल पानी का स्वाद लेंगे।', exampleEnglish: 'In Kerala we will taste coconut water.', emoji: '🥥', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'जाना', transliteration: 'jaana', english: 'to go', exampleHindi: 'अगले महीने हम गोवा जाएँगे।', exampleEnglish: 'Next month we will go to Goa.', emoji: '➡️', partOfSpeech: 'verb', subgroup: 'Activities' },

    // Useful adjectives
    { hindi: 'महँगा', transliteration: 'mahanga', english: 'expensive', exampleHindi: 'हवाई जहाज़ का टिकट महँगा होता है।', exampleEnglish: 'An airplane ticket is expensive.', emoji: '💸', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
    { hindi: 'सस्ता', transliteration: 'sasta', english: 'cheap / inexpensive', exampleHindi: 'बस का सफ़र सस्ता है।', exampleEnglish: 'Bus travel is cheap.', emoji: '🪙', partOfSpeech: 'adjective', subgroup: 'Descriptors' },
  ],
  vocabularyNote: {
    why:
      'These 28 words are the narrow set FCPS travel prompts pull from. Places give Topic-Coverage, transport words let you move characters through the essay, and the activity verbs (घूमना, फ़ोटो लेना) naturally take future-tense endings - which is where the rubric points live at Level 2.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme (travel)?"',
  },

  grammar: [
    {
      title: 'Simple future tense - जाऊँगा / जाएँगे / जाएगी',
      rule:
        'Hindi simple future is formed by adding -ऊँगा/ऊँगी (मैं), -ओगे/ओगी (तुम), -एगा/एगी (वह), -एँगे/एँगी (हम, वे) to the verb stem. Gender matters: masculine narrator says जाऊँगा; feminine says जाऊँगी.',
      examples: [
        { hindi: 'मैं अगले महीने शिमला जाऊँगा।', transliteration: 'main agle mahine shimla jaaoonga.', english: 'I (m.) will go to Shimla next month.' },
        { hindi: 'हम सब मिलकर घूमेंगे।', transliteration: 'hum sab milkar ghoomenge.', english: 'We will all roam around together.' },
        { hindi: 'मेरी बहन फ़ोटो लेगी।', transliteration: 'meri bahan photo legi.', english: 'My sister will take photos.' },
      ],
      pitfall:
        'Writing "मैं जाऊँगी" as a male narrator (or vice versa) is an instant Language-Control flag. Pick one gender for the narrator and stay with it across all three paragraphs.',
      whyItMatters:
        'The STAMP rubric at Benchmark 5 expects "some control of past, present, AND future." Travel essays are the easiest place to hit future tense - but only if the ending agrees with the subject. One consistent जाऊँगा/जाऊँगी anchors the whole future frame.',
    },
    {
      title: 'Conditionals with अगर ... तो (if ... then)',
      rule:
        'To plan, speculate, or compare options - exactly what travel essays demand - use अगर + clause, तो + clause. Both halves usually sit in the future: अगर मौसम अच्छा होगा, तो हम जाएँगे.',
      examples: [
        { hindi: 'अगर गर्मी ज़्यादा होगी, तो हम पहाड़ जाएँगे।', transliteration: 'agar garmee zyaada hogi, to hum pahaad jaayenge.', english: 'If the heat is too much, then we will go to the mountains.' },
        { hindi: 'अगर टिकट सस्ते होंगे, तो हम हवाई जहाज़ से जाएँगे।', transliteration: 'agar tikat saste honge, to hum hawai jahaaz se jaayenge.', english: 'If the tickets are cheap, then we will go by airplane.' },
        { hindi: 'अगर समय मिलेगा, तो मैं ताजमहल भी देखूँगा।', transliteration: 'agar samay milega, to main tajmahal bhi dekhoonga.', english: 'If I get time, then I will also see the Taj Mahal.' },
      ],
      pitfall:
        'Dropping तो, or putting both clauses in present tense ("अगर गर्मी है, हम जाते हैं") collapses the hypothetical into a habitual statement. The rater then counts it as present, not future.',
      whyItMatters:
        'Conditionals are the single highest-yield structure on travel prompts. Two clean अगर ... तो sentences in one essay signal "complex sentence control" - that moves Text-Type from Benchmark 4 (strings of sentences) to Benchmark 5 (connected ideas with planning).',
    },
    {
      title: 'Plan expressions - सोच रहा हूँ / चाहता हूँ / वाला है',
      rule:
        'Travel essays blend firm future (जाएँगे) with softer planning language. Three high-yield frames: (1) मैं ... का सोच रहा हूँ (I am thinking about ...), (2) मैं ... जाना चाहता हूँ (I want to go to ...), (3) हम ... जाने वाले हैं (we are about to go to ...).',
      examples: [
        { hindi: 'मैं इस बार केरल जाने का सोच रहा हूँ।', transliteration: 'main is baar keral jaane ka soch raha hoon.', english: 'This time I am thinking about going to Kerala.' },
        { hindi: 'मेरी माँ राजस्थान घूमना चाहती हैं।', transliteration: 'meri maa raajasthaan ghoomna chaahti hain.', english: 'My mother wants to travel around Rajasthan.' },
        { hindi: 'हम अगले हफ़्ते गोवा जाने वाले हैं।', transliteration: 'hum agle hafte goa jaane waale hain.', english: 'We are about to go to Goa next week.' },
      ],
      pitfall:
        'Mixing frames mid-sentence ("मैं जाना सोच रहा हूँ" without का) breaks the construction. Memorize each frame whole: verb-infinitive + का सोच रहा हूँ; verb-infinitive + चाहता हूँ; verb-infinitive + वाले हैं.',
      whyItMatters:
        'These three frames give the essay rhythm. Instead of five sentences all ending in जाएँगे, the writer varies: "I am thinking ... my mother wants ... we are about to." That variety is exactly what Text-Type 5 describes as "groupings of ideas."',
    },
  ],
  grammarNote: {
    why:
      'Future-tense agreement, अगर ... तो, and the planning frames are the three structures that decide whether a travel essay lands at Benchmark 4 or Benchmark 5. Drill each one separately before combining them - the conditional especially rewards slow, correct practice.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'antMein',
    'kyonki',
    'lekin',
    'isliye',
    'agarTo',
    'iskeAlawa',
  ]),
  connectorsNote: {
    why:
      'Travel essays live or die on अगर ... तो - without it the writer cannot plan. Sequence connectors (पहले / फिर / अंत में) scaffold the day-by-day itinerary paragraph. लेकिन and इसलिए handle the "mountains vs. beach" comparison raters reward.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'शीतकालीन यात्रा की योजना · Planning a Winter Trip',
    hindi:
      'इस साल हमारे परिवार की सर्दियों की छुट्टी आने वाली है, इसलिए मैं अभी से योजना बना रहा हूँ। पहले हम सब मिलकर नक्शा देखेंगे और तय करेंगे कि कहाँ जाना है। मेरी माँ शिमला जाना चाहती हैं, क्योंकि वहाँ बर्फ़ गिरती है, लेकिन पापा का सोचना है कि मनाली ज़्यादा सुंदर है। अगर मौसम अच्छा होगा, तो हम ट्रेन से चंडीगढ़ तक जाएँगे, और फिर वहाँ से टैक्सी लेंगे। मैंने इंटरनेट पर एक सस्ता होटल भी देखा है जो पहाड़ के पास है। इसके अलावा, हम रास्ते में आगरा भी रुकेंगे, क्योंकि मेरी छोटी बहन ने अभी तक ताजमहल नहीं देखा है। अंत में, मुझे लगता है कि यह यात्रा हम सबके लिए यादगार होगी।',
    transliteration:
      'is saal hamaare parivaar ki sardiyon ki chhutti aane waali hai, isliye main abhi se yojana bana raha hoon. pahle hum sab milkar naksha dekhenge aur tay karenge ki kahaan jaana hai. meri maa shimla jaana chaahti hain, kyonki vahaan barf girti hai, lekin papa ka sochna hai ki manaali zyaada sundar hai. agar mausam achchha hoga, to hum tren se chandigarh tak jaayenge, aur phir vahaan se taiksi lenge. maine internet par ek sasta hotal bhi dekha hai jo pahaad ke paas hai. iske alawa, hum raaste mein aagra bhi rukenge, kyonki meri chhoti bahan ne abhi tak tajmahal nahin dekha hai. ant mein, mujhe lagta hai ki yah yaatra hum sab ke liye yaadgaar hogi.',
    english:
      'This year our family winter vacation is coming up, so I am already making a plan. First, we will all look at the map together and decide where to go. My mother wants to go to Shimla because it snows there, but Father thinks Manali is more beautiful. If the weather is good, we will go by train up to Chandigarh, and then take a taxi from there. I have also seen a cheap hotel online that is near the mountain. Besides this, we will also stop at Agra on the way, because my little sister has not yet seen the Taj Mahal. In the end, I think this trip will be memorable for all of us.',
    highlights: [
      { term: 'अगर ... तो ... जाएँगे', note: 'Conditional + future in one sentence. This single structure is what pushes a travel essay from Benchmark 4 to Benchmark 5.' },
      { term: 'पहले / फिर / अंत में', note: 'Three sequence connectors scaffold the itinerary. Sentences cannot be reordered - that is Text-Type 5.' },
      { term: 'क्योंकि / लेकिन / इसके अलावा', note: 'Reasoning, contrast, and addition in a single paragraph - raters reward this density.' },
      { term: 'शिमला / मनाली / चंडीगढ़ / आगरा', note: 'Four specific Indian destinations. Generic "nice place" is replaced by cultural specifics → Topic Coverage bump.' },
      { term: 'सर्दियों की छुट्टी / बर्फ़ गिरना', note: 'Seasonal cultural anchor - winter vacation + snowfall frames the whole trip authentically.' },
    ],
    comprehensionQuestions: [
      { q: 'What season is the family planning for?', a: 'सर्दियों की छुट्टी (winter vacation).' },
      { q: 'Which two hill stations are being compared, and by whom?', a: 'Shimla (माँ prefers it) and Manali (पापा thinks it is more beautiful).' },
      { q: 'What two forms of transport are mentioned?', a: 'ट्रेन (train) up to Chandigarh, then टैक्सी (taxi) from there.' },
      { q: 'Why does the family want to stop at Agra?', a: 'Because the narrator\'s little sister has not yet seen the Taj Mahal.' },
      { q: 'Find the conditional sentence and translate it.', a: '"अगर मौसम अच्छा होगा, तो हम ट्रेन से चंडीगढ़ तक जाएँगे" - "If the weather is good, we will go by train up to Chandigarh."' },
      { q: 'Identify one connector and explain what it does.', a: 'Any of पहले / फिर / अंत में (sequence), क्योंकि / इसलिए (reason), लेकिन (contrast), इसके अलावा (addition).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a one-paragraph blueprint for the full 3-paragraph essay the student must produce. Notice how the conditional, the comparison (Shimla vs. Manali), and the specific destinations all coexist naturally. Read it aloud until the अगर ... तो frame feels automatic.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'गोवा यात्रा का कार्यक्रम · Goa Trip Itinerary',
      hindi:
        'दिन 1: सुबह हवाई जहाज़ से गोवा पहुँचेंगे। होटल में सामान रखेंगे।\nदिन 2: सुबह समुद्र तट पर जाएँगे। शाम को खरीदारी करेंगे।\nदिन 3: पुराने चर्च और किले देखेंगे।\nदिन 4: मछली का स्वाद लेंगे। रात को वापस घर।',
      transliteration:
        'din 1: subah hawai jahaaz se goa pahunchenge. hotal mein saamaan rakhenge. din 2: subah samudra tat par jaayenge. shaam ko khareedaari karenge. din 3: puraane charch aur kile dekhenge. din 4: machhli ka svaad lenge. raat ko vaapas ghar.',
      english:
        'Day 1: We will arrive in Goa by plane in the morning. Put luggage at the hotel. Day 2: We will go to the beach in the morning. Shop in the evening. Day 3: We will see old churches and forts. Day 4: We will taste the fish. Return home at night.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'यार! अगले हफ़्ते हम केरल जाने वाले हैं 🌴 अगर तुम भी आना चाहो तो जल्दी बताओ - टिकट अभी सस्ते हैं। वापसी सोमवार को है।',
      transliteration:
        'yaar! agle hafte hum keral jaane waale hain. agar tum bhi aana chaaho to jaldi batao - tikat abhi saste hain. vaapsi somvaar ko hai.',
      english:
        'Dude! Next week we are about to go to Kerala. If you also want to come, tell me quickly - tickets are cheap right now. Return is on Monday.',
    },
    {
      kind: 'email',
      title: 'होटल को ईमेल · Email to a Hotel',
      hindi:
        'नमस्ते,\nमैं 15 दिसंबर से 18 दिसंबर तक अपने परिवार के साथ शिमला आना चाहता हूँ। कृपया बताइए कि उन तारीख़ों में दो कमरे मिल सकते हैं या नहीं। साथ ही कमरों का दाम भी भेज दीजिए।\nधन्यवाद,\nरोहित',
      transliteration:
        'namaste, main 15 disambar se 18 disambar tak apne parivaar ke saath shimla aana chaahta hoon. kripaya bataaiye ki un taareekhon mein do kamre mil sakte hain ya nahin. saath hi kamron ka daam bhi bhej deejiye. dhanyavaad, Rohit.',
      english:
        'Hello, I would like to come to Shimla with my family from December 15 to 18. Please let me know whether two rooms are available on those dates. Also, please send the price of the rooms. Thank you, Rohit.',
    },
    {
      kind: 'review',
      title: 'ऑनलाइन होटल समीक्षा · Online Hotel Review',
      hindi:
        'यह होटल मनाली में बर्फ़ के पहाड़ के एकदम पास है। कमरा साफ़ था और खिड़की से नज़ारा बहुत सुंदर था। खाना थोड़ा महँगा था, लेकिन स्वादिष्ट था। अगर आप परिवार के साथ जा रहे हैं, तो यह होटल सही है। चार तारे। ⭐⭐⭐⭐',
      transliteration:
        'yah hotal manaali mein barf ke pahaad ke ekdam paas hai. kamra saaf tha aur khidki se nazara bahut sundar tha. khaana thoda mahanga tha, lekin svaadisht tha. agar aap parivaar ke saath jaa rahe hain, to yah hotal sahi hai. chaar taare.',
      english:
        'This hotel in Manali is right next to the snowy mountain. The room was clean and the view from the window was very beautiful. The food was a little expensive, but delicious. If you are going with family, this hotel is right. Four stars.',
    },
  ],
  modelTextsNote: {
    why:
      'An itinerary, an SMS, a hotel email, and a review cover the four registers a travel writer lives in. Each one forces a different tense - the schedule is pure future, the SMS is future-imminent, the email is polite future-request, and the review is past-reflective. Mastering all four means the student can pivot to whichever the prompt asks for.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Hill Stations Are the Default Summer Escape',
      body:
        'When North Indian plains hit 45°C in May–June, families head to hill stations - Shimla, Manali, Mussoorie, Nainital, Darjeeling. Naming one specifically (not "a cold place") is a free Topic-Coverage point.',
      emoji: '🏔️',
    },
    {
      title: 'Goa & Kerala for Beaches',
      body:
        'Goa is the Hindi speaker\'s shorthand for beach vacation; Kerala is the "God\'s Own Country" backwater alternative - greener, quieter, coconut-based cuisine. Picking one tells the rater you know the Indian travel map, not just "ocean."',
      emoji: '🏖️',
    },
    {
      title: 'Pilgrimage Travel is Travel Too',
      body:
        'Haridwar, Varanasi, Vaishno Devi, Tirupati - for many Indian families "छुट्टी" means a tirth-yatra (pilgrimage). Mentioning तीर्थयात्रा or Varanasi ghats in an essay shows cultural literacy raters notice immediately.',
      emoji: '🕉️',
    },
    {
      title: 'Summer Vacation = गर्मी की छुट्टी Tradition',
      body:
        'School summer break (late May to early July) is when entire extended families converge on grandparents in गाँव or head together to the hills. The prompt "describe a family trip" almost always expects this seasonal frame.',
      emoji: '🌞',
    },
    {
      title: 'महँगा vs. सस्ता - Travel Economics',
      body:
        'Indian travel conversation is peppered with cost: "हवाई जहाज़ महँगा है, ट्रेन सस्ती है" is a near-reflex sentence. Budget-consciousness is not embarrassing in Hindi - it is realistic and reads authentic.',
      emoji: '💸',
    },
  ],
  culturalNote: {
    why:
      'Travel prompts sort essays into two piles: "I went to a nice place" (generic, Benchmark 4) vs. "we went to Manali because it snows" (specific, Benchmark 5). Every cultural marker in this section is a free lift on the Topic-Coverage axis - pick one per essay and use it.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'घर से दूर घर',
      literal: 'a home away from home',
      meaning: 'A place where one feels as comfortable as at home.',
      example: 'नानी का गाँव मेरे लिए घर से दूर घर है।',
      exampleEnglish: "Grandmother's village is a home away from home for me.",
    },
    {
      phrase: 'हवा से बातें करना',
      literal: 'to talk with the wind',
      meaning: 'To move very fast - used for vehicles or trips that fly by.',
      example: 'राजधानी एक्सप्रेस हवा से बातें करती है।',
      exampleEnglish: 'The Rajdhani Express moves incredibly fast.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are travel-native: one for the emotional side (destination-as-home), one for the kinetic side (fast transport). Drop one into a 3-paragraph essay and it reads as register control, not idiom-dumping.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Next vacation',
      prompt:
        'अपने परिवार की अगली छुट्टी की योजना के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप कहाँ जाएँगे, क्यों, और वहाँ क्या करेंगे। (Write three paragraphs about your family\'s next vacation plan. Explain where you will go, why, and what you will do there.)',
      novice:
        'हम छुट्टी पर जाएँगे। गोवा अच्छा है। मैं खुश हूँ।',
      intermediateMid:
        'इस बार गर्मियों की छुट्टी में मेरा परिवार शिमला जाने का सोच रहा है। पिछले साल हम गोवा गए थे, वहाँ बहुत गर्मी थी, इसलिए इस साल माँ ने कहा कि हम पहाड़ पर जाएँगे। मुझे भी यह विचार अच्छा लगा, क्योंकि मुझे बर्फ़ देखने का बहुत शौक़ है।\n\nपहले हम दिल्ली से कालका तक ट्रेन से जाएँगे, और फिर वहाँ से टॉय ट्रेन लेंगे। अगर मौसम अच्छा होगा, तो हम माल रोड पर पैदल घूमेंगे और जाखू मंदिर भी जाएँगे। इसके अलावा, पापा ने एक सस्ता होटल बुक किया है जो पहाड़ के एकदम पास है।\n\nमुझे लगता है कि यह यात्रा यादगार होगी। मैं हर जगह की फ़ोटो लूँगा और अपनी डायरी में लिखूँगा। अगर समय मिलेगा, तो हम कुफ़री भी जाएँगे, जहाँ मेरी छोटी बहन पहली बार बर्फ़ में खेलेगी।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले साल ... गए थे / इस साल ... जाएँगे', note: 'Past and future in a single paragraph - the Benchmark 5 tense-variety signal, delivered early.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'जाने का सोच रहा है', note: 'Planning frame (not just flat future) - variety that raters mark as "complex sentence control."' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए / क्योंकि', note: 'Consequence + reason in back-to-back sentences.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर', note: 'Sequential itinerary - sentences cannot be rearranged. Text-Type 5.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'अगर मौसम अच्छा होगा, तो ... घूमेंगे', note: 'Full conditional in future - the highest-yield structure on travel prompts.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'टॉय ट्रेन / माल रोड / जाखू मंदिर', note: 'Three specific Shimla references = Topic-Coverage lift. Generic "a mountain" cannot do this.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर समय मिलेगा, तो ... खेलेगी', note: 'Second conditional, closing paragraph - two अगर ... तो in one essay is the quality marker.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मैं ... लूँगा और ... लिखूँगा', note: 'Two first-person futures in parallel - clean verb-agreement under complexity.' },
      ],
      wordCount: 136,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['इसलिए', 'क्योंकि', 'पहले', 'फिर', 'अगर... तो', 'इसके अलावा'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Two अगर ... तो conditionals correctly conjugated (होगा/मिलेगा in the if-clause, घूमेंगे/जाएँगे in the then-clause) - the defining Level-2 travel structure.',
          'Three time frames in 136 words: past (गए थे), present (सोच रहा है), future (जाएँगे, लूँगा). STAMP rubric requires "some control" of all three for Benchmark 5.',
          'Six different connectors (इसलिए, क्योंकि, पहले, फिर, अगर ... तो, इसके अलावा) - well above the 3-connector threshold that separates Text-Type 4 from Text-Type 5.',
          'Cultural specifics (Shimla, toy train, Mall Road, Jakhoo Mandir, Kufri) replace generic "mountain" - Topic Coverage lifts from Average to High.',
          'Planning frame (जाने का सोच रहा है) varies sentence shape, preventing the monotone "हम जाएँगे, हम देखेंगे, हम खाएँगे" that flattens weaker essays.',
        ],
        gotchas: [
          'If the narrator is female and writes लूँगा / लिखूँगा instead of लूँगी / लिखूँगी, Language Control drops immediately. Stay consistent.',
          'Dropping the तो in a conditional ("अगर मौसम अच्छा होगा, हम घूमेंगे") makes the rater re-parse the sentence - avoid.',
        ],
      },
    },
    {
      shortLabel: 'Showing India',
      prompt:
        'अगर आपको अपने किसी दोस्त को भारत में एक जगह दिखानी हो, तो आप कहाँ ले जाएँगे और क्यों? तीन अनुच्छेदों में लिखिए। (If you had to show a friend one place in India, where would you take them and why? Write in three paragraphs.)',
      novice:
        'मैं दोस्त को गोवा ले जाऊँगा। गोवा अच्छा है। हम खाएँगे।',
      intermediateMid:
        'अगर मुझे अपने अमेरिकी दोस्त को भारत में एक जगह दिखानी हो, तो मैं उसे केरल ले जाऊँगा। केरल को लोग "भगवान का अपना देश" कहते हैं, क्योंकि वहाँ नारियल के पेड़, हरे-भरे खेत और शांत नदियाँ हैं। मेरा दोस्त शहर में रहता है, इसलिए उसके लिए यह जगह बिल्कुल नई होगी।\n\nहम कोच्चि से शुरू करेंगे। पहले हम हाउसबोट में एक रात रुकेंगे, फिर मुन्नार के चाय बागानों में घूमेंगे। अगर मौसम ठीक रहेगा, तो हम हाथी अभयारण्य भी जाएँगे। मेरा दोस्त शाकाहारी है, लेकिन केरल में शाकाहारी खाना बहुत स्वादिष्ट मिलता है, इसलिए उसे कोई परेशानी नहीं होगी।\n\nमुझे लगता है कि यह यात्रा उसके लिए घर से दूर घर जैसी होगी। अंत में, हम समुद्र तट पर बैठकर नारियल पानी का स्वाद लेंगे और ढेर सारी फ़ोटो लेंगे, जिन्हें वह अपने परिवार को अमेरिका में दिखाएगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'अगर ... हो, तो ... ले जाऊँगा', note: 'Prompt is itself a conditional - the essay answers in matching conditional form. Elegant.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'भगवान का अपना देश / नारियल के पेड़', note: 'Kerala\'s own tagline in Hindi + a concrete image. Topic Coverage signals "the student knows this place."' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / इसलिए', note: 'Reason + consequence frame the destination choice.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... अगर ... तो', note: 'Itinerary + conditional in one paragraph - dense connector stack.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'मेरा दोस्त शाकाहारी है, लेकिन ... इसलिए', note: 'Contrast + consequence inside one sentence - Intermediate-Mid hallmark.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'घर से दूर घर', note: 'Travel-native idiom placed naturally - one idiom per essay is plenty.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'लेंगे ... दिखाएगा', note: 'Future-chain - closing reaches forward beyond the trip itself, reflective touch raters reward.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'फ़ोटो लेंगे, जिन्हें वह ... दिखाएगा', note: 'Relative clause (जिन्हें) - a Level-2 complexity marker above simple future.' },
      ],
      wordCount: 141,
      tenseUsed: ['present', 'future'],
      connectorsUsed: ['अगर... तो', 'क्योंकि', 'इसलिए', 'पहले', 'फिर', 'लेकिन', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Opens with a conditional that mirrors the prompt (अगर ... हो, तो ... ले जाऊँगा) - shows the student parsed the prompt structurally, not just lexically.',
          'Two distinct conditionals (अगर ... हो, तो ... / अगर मौसम ठीक रहेगा, तो ...) - satisfies the "two अगर ... तो" travel quality bar.',
          'Relative clause (फ़ोटो ... जिन्हें वह ... दिखाएगा) is an above-level complexity marker; raters notice this and push Language Control to High.',
          'Cultural density: Kochi, houseboat, Munnar tea gardens, elephant sanctuary, coconut water - five specifics in 141 words. Topic Coverage is fully earned.',
          'Idiom घर से दूर घर is placed in context (closing reflection), not listed - this is the Intermediate-Mid way to use idioms.',
        ],
        gotchas: [
          'Past tense is absent in this essay. The student got away with it because the prompt itself is hypothetical-future - but if the prompt had asked for a remembered trip, this essay would lose the "three time frames" point.',
          'If the narrator switches gender mid-essay (ले जाऊँगा → लूँगी), Language Control drops. Pick one at the top and hold it.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Essay 1 is the safe-play: plan a family vacation, three tenses, two conditionals. Essay 2 is the stretch: hypothetical, one conditional prompt answered with matching conditional form, relative clause, idiom. Study both until you can reproduce the conditional structure without thinking.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपनी अगली छुट्टी की योजना के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप कहाँ जाना चाहते हैं, कैसे पहुँचेंगे, और वहाँ क्या-क्या करेंगे।',
      english:
        'Write three paragraphs about your next vacation plan. Explain where you want to go, how you will get there, and what you will do.',
      hint: {
        connectors: ['पहले', 'फिर', 'अगर... तो', 'क्योंकि'],
        vocab: ['छुट्टी', 'ट्रेन', 'होटल', 'घूमना', 'फ़ोटो लेना'],
        tenses: ['present', 'future'],
      },
    },
    {
      hindi:
        'अपनी पिछली किसी यादगार यात्रा के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप कहाँ गए थे, क्या देखा, और अगली बार कहाँ जाना चाहते हैं।',
      english:
        'Write three paragraphs about a memorable past trip. Explain where you went, what you saw, and where you want to go next.',
      hint: {
        connectors: ['जब... तब', 'लेकिन', 'इसलिए', 'अंत में'],
        vocab: ['यात्रा', 'सामान', 'स्वादिष्ट', 'महँगा', 'यादगार'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'अगर आपको पहाड़ और समुद्र तट में से एक चुनना हो, तो आप किसे चुनेंगे और क्यों? तीन अनुच्छेदों में तुलना कीजिए।',
      english:
        'If you had to choose between the mountains and the beach, which would you choose and why? Compare the two in three paragraphs.',
      hint: {
        connectors: ['अगर... तो', 'लेकिन', 'जबकि', 'इसके अलावा'],
        vocab: ['पहाड़', 'समुद्र तट', 'ठंडा', 'गरम', 'सुंदर'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 is the bread-and-butter future-planning essay. Prompt 2 forces a past-present-future pivot inside one response - the three-tense rubric target in its purest form. Prompt 3 is the comparison essay, where जबकि and लेकिन carry the load. Pick one and write; do not skip the हिंट strip.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every travel essay on three questions: (1) Did I use at least one अगर ... तो correctly? (2) Did I name a specific Indian place, not "a nice place"? (3) Does my future-tense ending match my gender across all three paragraphs? If any answer is no, fix that before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
