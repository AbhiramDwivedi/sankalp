import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

// -----------------------------------------------------------------------------
// REFERENCE PACK
// This is the quality/shape anchor for every other topic in the library.
// Hand-authored Hindi content targeting Intermediate-Mid output (STAMP 5,
// 3 FCPS credits). All other packs should match the depth of sections here.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-12-restaurants-food',
  level: 1,
  themeGroup: 'ModernSociety',
  topicTheme: 'food',
  order: 12,
  heroMotif: 'thali',
  titleHindi: 'रेस्तराँ और खाना',
  titleEnglish: 'Restaurants & Food',
  hook: 'Culturally rich, vocabulary-dense, naturally uses connectors and past/present tenses - the ideal FCPS essay topic.',
  heroPrompt: composeHeroPrompt(
    'An Indian thali on a low wooden table - brass katoris filled with dal, sabzi, raita, chutneys, a pile of rotis, a tulsi plant in the corner, warm afternoon light',
  ),

  rationale: {
    fcpsSubTopics: [
      'Restaurants and Food (FCPS Level 1 - Community Life)',
      'Shopping at markets and ordering (FCPS Level 1)',
      'Bridges into Food (FCPS Level 2 - Home Life) for deeper treatment later',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Describe a meal in 3 connected paragraphs using past and present tense',
      'Order politely in Hindi using full sentences, not memorized phrases',
      'Compare two dishes or restaurants with at least three connectors',
      'Include one culturally specific detail (thali, chai, festival food) in an essay',
      'Use feminine/masculine agreement correctly across food-related nouns',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Food appears in almost every FCPS prompt set (picnic, restaurant, festival meal). Skipping this pack leaves the student without the vocabulary and connectors those prompts reward.',
  },

  objectives: [
    {
      text: 'Name at least 15 food items and 5 meal-related verbs in Hindi without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Order a meal politely using "कृपया" and full request forms (not one-word answers).',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Write a 3-paragraph account of a meal using past, present, AND at least two connectors.',
      trains: ['TextType'],
    },
    {
      text: 'Get gender and number agreement right across 10+ food nouns (रोटी is feminine, खाना is masculine).',
      trains: ['LanguageControl'],
    },
    {
      text: 'Add at least one cultural specific - a dish name, a festival food, or an eating custom - to lift Text-Type.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Meals & times
    { hindi: 'नाश्ता', transliteration: 'naashta', english: 'breakfast', exampleHindi: 'मैं रोज़ आठ बजे नाश्ता करता हूँ।', exampleEnglish: 'I have breakfast every day at 8.', emoji: '🍳', partOfSpeech: 'noun', subgroup: 'Meals' },
    { hindi: 'दोपहर का खाना', transliteration: 'dopahar ka khaana', english: 'lunch', exampleHindi: 'दोपहर का खाना स्कूल में होता है।', exampleEnglish: 'Lunch is at school.', emoji: '🍱', partOfSpeech: 'phrase', subgroup: 'Meals' },
    { hindi: 'रात का खाना', transliteration: 'raat ka khaana', english: 'dinner', exampleHindi: 'हम रात का खाना साथ खाते हैं।', exampleEnglish: 'We eat dinner together.', emoji: '🍲', partOfSpeech: 'phrase', subgroup: 'Meals' },
    { hindi: 'हल्का नाश्ता', transliteration: 'halka naashta', english: 'snack / light bite', exampleHindi: 'शाम को हल्का नाश्ता चाहिए।', exampleEnglish: 'An evening snack is needed.', emoji: '🥨', partOfSpeech: 'phrase', subgroup: 'Meals' },

    // Core foods
    { hindi: 'रोटी', transliteration: 'roti', english: 'flatbread', exampleHindi: 'माँ गरम रोटी बनाती हैं।', exampleEnglish: 'Mother makes hot rotis.', emoji: '🫓', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'चावल', transliteration: 'chaaval', english: 'rice', exampleHindi: 'मुझे चावल बहुत पसंद हैं।', exampleEnglish: 'I like rice very much.', emoji: '🍚', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'दाल', transliteration: 'daal', english: 'lentils', exampleHindi: 'दाल प्रोटीन से भरपूर होती है।', exampleEnglish: 'Daal is full of protein.', emoji: '🥣', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'सब्ज़ी', transliteration: 'sabzi', english: 'vegetable dish', exampleHindi: 'आज हरी सब्ज़ी बनी है।', exampleEnglish: 'Today a green sabzi was made.', emoji: '🥬', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'थाली', transliteration: 'thaali', english: 'platter meal', exampleHindi: 'थाली में छह चीज़ें होती हैं।', exampleEnglish: 'A thali has six items.', emoji: '🍽️', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'मिठाई', transliteration: 'mithaai', english: 'sweet / dessert', exampleHindi: 'दिवाली पर हम मिठाई बाँटते हैं।', exampleEnglish: 'On Diwali we distribute sweets.', emoji: '🍬', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'चाय', transliteration: 'chaay', english: 'tea', exampleHindi: 'पिताजी को दूध वाली चाय चाहिए।', exampleEnglish: 'Father wants milk tea.', emoji: '🍵', partOfSpeech: 'noun', subgroup: 'Foods' },
    { hindi: 'पानी', transliteration: 'paani', english: 'water', exampleHindi: 'कृपया एक गिलास पानी दीजिए।', exampleEnglish: 'Please give a glass of water.', emoji: '💧', partOfSpeech: 'noun', subgroup: 'Foods' },

    // Tastes
    { hindi: 'मीठा', transliteration: 'meetha', english: 'sweet', exampleHindi: 'यह आम बहुत मीठा है।', exampleEnglish: 'This mango is very sweet.', emoji: '🍭', partOfSpeech: 'adjective', subgroup: 'Tastes' },
    { hindi: 'तीखा', transliteration: 'teekha', english: 'spicy', exampleHindi: 'यह सब्ज़ी थोड़ी तीखी है।', exampleEnglish: 'This vegetable is a little spicy.', emoji: '🌶️', partOfSpeech: 'adjective', subgroup: 'Tastes' },
    { hindi: 'नमकीन', transliteration: 'namkeen', english: 'salty / savory', exampleHindi: 'नमकीन चीज़ें शाम को अच्छी लगती हैं।', exampleEnglish: 'Savory things feel good in the evening.', emoji: '🥟', partOfSpeech: 'adjective', subgroup: 'Tastes' },
    { hindi: 'स्वादिष्ट', transliteration: 'svaadisht', english: 'delicious', exampleHindi: 'दादी का खाना सबसे स्वादिष्ट होता है।', exampleEnglish: "Grandma's food is the most delicious.", emoji: '😋', partOfSpeech: 'adjective', subgroup: 'Tastes' },

    // Restaurant interactions
    { hindi: 'रेस्तराँ', transliteration: 'restaran', english: 'restaurant', exampleHindi: 'यह रेस्तराँ मेरे घर के पास है।', exampleEnglish: 'This restaurant is near my home.', emoji: '🏪', partOfSpeech: 'noun', subgroup: 'Restaurant' },
    { hindi: 'मेन्यू', transliteration: 'menu', english: 'menu', exampleHindi: 'कृपया मेन्यू दिखाइए।', exampleEnglish: 'Please show the menu.', emoji: '📋', partOfSpeech: 'noun', subgroup: 'Restaurant' },
    { hindi: 'बिल', transliteration: 'bill', english: 'bill', exampleHindi: 'कृपया बिल ले आइए।', exampleEnglish: 'Please bring the bill.', emoji: '🧾', partOfSpeech: 'noun', subgroup: 'Restaurant' },
    { hindi: 'वेटर', transliteration: 'veter', english: 'waiter', exampleHindi: 'वेटर ने पानी लाकर दिया।', exampleEnglish: 'The waiter brought water.', emoji: '👨‍🍳', partOfSpeech: 'noun', subgroup: 'Restaurant' },

    // Verbs
    { hindi: 'खाना', transliteration: 'khaana', english: 'to eat / food', exampleHindi: 'मैं फल खाता हूँ।', exampleEnglish: 'I eat fruit.', emoji: '🍎', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'पीना', transliteration: 'peena', english: 'to drink', exampleHindi: 'बच्चे दूध पीते हैं।', exampleEnglish: 'Children drink milk.', emoji: '🥛', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'ऑर्डर करना', transliteration: 'order karna', english: 'to order', exampleHindi: 'हमने दो थाली ऑर्डर कीं।', exampleEnglish: 'We ordered two thalis.', emoji: '📞', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'पसंद करना', transliteration: 'pasand karna', english: 'to like', exampleHindi: 'मुझे राजमा-चावल पसंद है।', exampleEnglish: 'I like rajma-rice.', emoji: '❤️', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'बनाना', transliteration: 'banana', english: 'to make / cook', exampleHindi: 'दादी ने खीर बनाई।', exampleEnglish: 'Grandma made kheer.', emoji: '🍳', partOfSpeech: 'verb', subgroup: 'Verbs' },

    // Polite request chunk
    { hindi: 'कृपया', transliteration: 'kripaya', english: 'please', exampleHindi: 'कृपया थोड़ा और चावल दीजिए।', exampleEnglish: 'Please give a little more rice.', emoji: '🙏', partOfSpeech: 'adverb', subgroup: 'Polite speech' },
    { hindi: 'धन्यवाद', transliteration: 'dhanyavaad', english: 'thank you', exampleHindi: 'खाने के लिए धन्यवाद।', exampleEnglish: 'Thank you for the food.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Polite speech' },
  ],
  vocabularyNote: {
    why:
      'These 27 words are the narrow set FCPS prompts on food and restaurants keep pulling from. Every one of them appears in the reading sample, the model texts, or the model essays. Learning this list first guarantees Topic-Coverage rubric points.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Gender agreement on food nouns',
      rule:
        'Most Hindi food nouns ending in ा are masculine (खाना, चावल, पानी) and most ending in ी are feminine (रोटी, दाल - note: दाल is feminine even though it ends in ल, a common irregular). Adjectives and verbs must agree.',
      examples: [
        { hindi: 'गरम रोटी अच्छी लगती है।', transliteration: 'garam roti achchhi lagti hai.', english: 'Hot roti feels/tastes good. (feminine)' },
        { hindi: 'गरम खाना अच्छा लगता है।', transliteration: 'garam khaana achchha lagta hai.', english: 'Hot food feels/tastes good. (masculine)' },
        { hindi: 'दाल बन गई है।', transliteration: 'daal ban gayi hai.', english: 'The daal has been made. (feminine verb form)' },
      ],
      pitfall:
        'Writing "अच्छा रोटी" (masculine adjective on feminine noun) is the single most common error on food-topic essays. Raters mark this down in Language Control immediately.',
      whyItMatters:
        'The STAMP rubric caps Language Control at "Low" if gender errors make meaning unclear. Low Language Control caps Text-Type at Intermediate-Low (2 credits). Getting agreement right is the difference between 2 and 3 credits.',
    },
    {
      title: 'Polite request forms with कृपया + दीजिए',
      rule:
        'To make a polite request (the register FCPS restaurant prompts expect), use कृपया + noun + दीजिए/लाइए. Avoid imperative मुझे दो - that is too casual for essays.',
      examples: [
        { hindi: 'कृपया एक गिलास पानी दीजिए।', transliteration: 'kripaya ek gilaas paani deejiye.', english: 'Please give a glass of water.' },
        { hindi: 'कृपया मेन्यू लाइए।', transliteration: 'kripaya menu laaiye.', english: 'Please bring the menu.' },
        { hindi: 'कृपया बिल भेज दीजिए।', transliteration: 'kripaya bill bhej deejiye.', english: 'Please send the bill.' },
      ],
      pitfall:
        'Dropping कृपया makes the sentence abrupt; dropping दीजिए/लाइए makes it incomplete. Both hurt the politeness register raters look for.',
      whyItMatters:
        'Polite register itself is a Text-Type signal. A rater who sees three correct polite requests in one essay mentally checks off "uses target-language norms" before reading further.',
    },
    {
      title: 'Past tense with perfective verbs (खाया / खाई / खाए / खाईं)',
      rule:
        'To narrate a past meal - which Intermediate-Mid essays require - use the perfective form. The verb changes by gender and number of the OBJECT (not the subject) when there is one, in the ने construction.',
      examples: [
        { hindi: 'मैंने रोटी खाई।', transliteration: 'maine roti khaayi.', english: 'I ate roti. (feminine singular object)' },
        { hindi: 'मैंने चावल खाए।', transliteration: 'maine chaaval khaaye.', english: 'I ate rice. (masculine plural)' },
        { hindi: 'हमने थालियाँ मँगाईं।', transliteration: 'humne thaaliyaan mangaaheen.', english: 'We ordered (feminine plural) thalis.' },
      ],
      pitfall:
        'Many students say "मैं खाया" (wrong - subject takes ने in past transitive). The correct form is "मैंने खाया".',
      whyItMatters:
        'Intermediate-Mid requires control of past, present, AND future. One unambiguous past-tense sentence anchors the tense shift the rubric rewards.',
    },
  ],
  grammarNote: {
    why:
      'These three rules account for about 80% of the errors I see on food-topic essays. Fix these and the rubric\'s Language Control dimension generally stabilizes at "Average", which is enough for Intermediate-Mid.',
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
    'iskeAlawa',
    'jabTab',
  ]),
  connectorsNote: {
    why:
      'The sequence पहले / फिर / इसके बाद / अंत में alone lets a student turn any meal description into a four-paragraph narrative, which is exactly what Text-Type 5 looks like. क्योंकि and लेकिन add the "why" and the "contrast" raters reward.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'रविवार की थाली · A Sunday Thali',
    hindi:
      'रविवार को मेरे घर में सब लोग देर से उठते हैं। पहले माँ और दादी रसोई में जाती हैं। फिर वे एक बड़ी थाली बनाती हैं। थाली में दाल, चावल, गरम रोटी और दो सब्ज़ियाँ होती हैं। पिताजी को तीखा खाना पसंद है, लेकिन मुझे थोड़ा मीठा अच्छा लगता है। इसलिए माँ एक कटोरी मीठा दही भी रखती हैं। हम सब साथ बैठकर खाते हैं। खाने के बाद हम मिठाई खाते हैं, क्योंकि यह हमारे परिवार की रविवार की परंपरा है। अंत में दादी चाय बनाती हैं। यह मेरा सबसे पसंदीदा दिन होता है।',
    transliteration:
      'ravivaar ko mere ghar mein sab log der se uthte hain. pahle maa aur daadi rasoi mein jaati hain. phir ve ek badi thaali banaati hain. thaali mein daal, chaaval, garam roti aur do sabziyaan hoti hain. pitaji ko teekha khaana pasand hai, lekin mujhe thoda meetha achchha lagta hai. isliye maa ek katori meetha dahi bhi rakhti hain. hum sab saath baithkar khaate hain. khaane ke baad hum mithaai khaate hain, kyonki yah hamaare parivaar ki ravivaar ki parampara hai. ant mein daadi chaay banaati hain. yah mera sabse pasandeeda din hota hai.',
    english:
      'On Sunday, everyone in my house wakes up late. First, Mother and Grandmother go to the kitchen. Then they make a large thali. The thali has daal, rice, hot roti, and two vegetables. Father likes spicy food, but I like something a little sweet. So Mother also keeps a bowl of sweet yogurt. We all sit and eat together. After eating, we have sweets, because this is our family\'s Sunday tradition. Finally, Grandmother makes tea. This is my favorite day.',
    highlights: [
      { term: 'पहले / फिर / अंत में', note: 'Three sequence connectors scaffold the paragraph. Notice how sentences cannot be rearranged - that is Text-Type 5.' },
      { term: 'लेकिन / इसलिए / क्योंकि', note: 'Three reasoning connectors add the "why" raters reward.' },
      { term: 'गरम रोटी (feminine) / तीखा खाना (masculine)', note: 'Adjective-noun agreement on both genders in a single paragraph - clean Language Control signal.' },
      { term: 'परिवार की परंपरा', note: 'Cultural specific. Raters bump Topic-Coverage when authentic customs appear.' },
    ],
    comprehensionQuestions: [
      { q: 'What time does the family wake up on Sunday?', a: 'देर से (late).' },
      { q: 'Who cooks the thali?', a: 'माँ and दादी.' },
      { q: 'Name four things in the thali.', a: 'दाल, चावल, गरम रोटी, और दो सब्ज़ियाँ.' },
      { q: 'Why does Mother keep sweet yogurt?', a: 'Because the narrator likes something a little sweet, even though Father likes spicy food.' },
      { q: 'What happens after the meal?', a: 'They eat sweets as a Sunday family tradition; then Grandmother makes tea.' },
      { q: 'Identify one connector and explain what it does.', a: 'Any of पहले, फिर, लेकिन, इसलिए, क्योंकि, अंत में - each links ideas in time or reasoning.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a model of what a passing Intermediate-Mid essay on food looks like. The student\'s OUTPUT should mirror this INPUT. Read it aloud three times before attempting a prompt - the sentence shapes will start to feel automatic.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'menu',
      title: 'एक छोटे रेस्तराँ का मेन्यू · A Small Restaurant Menu',
      hindi:
        'दाल चावल - ₹80\nछोले भटूरे - ₹120\nआलू पराठा - ₹60\nमसाला डोसा - ₹150\nथाली (शाकाहारी) - ₹200\nगुलाब जामुन (दो) - ₹40\nमसाला चाय - ₹30\nलस्सी (मीठी) - ₹50',
      transliteration:
        'daal chaaval - 80 | chhole bhature - 120 | aaloo paraatha - 60 | masala dosa - 150 | thaali (shaakaahaaree) - 200 | gulaab jaamun (do) - 40 | masala chaay - 30 | lassi (meethi) - 50',
      english:
        'Daal rice - ₹80 · Chole bhature - ₹120 · Aloo paratha - ₹60 · Masala dosa - ₹150 · Thali (vegetarian) - ₹200 · Gulab jamun (two pieces) - ₹40 · Masala tea - ₹30 · Lassi (sweet) - ₹50',
    },
    {
      kind: 'diary',
      title: 'मेरा डायरी पृष्ठ · My Diary Page',
      hindi:
        'आज हम नए रेस्तराँ गए। वहाँ की थाली बहुत स्वादिष्ट थी। लेकिन सब्ज़ी थोड़ी तीखी थी, इसलिए मैंने ज़्यादा चावल खाए। अंत में मीठा भी था - गुलाब जामुन। मैं फिर से वहाँ जाना चाहूँगा।',
      transliteration:
        'aaj hum naye restaran gaye. vahaan ki thaali bahut svaadisht thi. lekin sabzi thodi teekhi thi, isliye maine zyaada chaaval khaaye. ant mein meetha bhi tha - gulaab jaamun. main phir se vahaan jaana chaahoonga.',
      english:
        'Today we went to a new restaurant. The thali there was very delicious. But the sabzi was a little spicy, so I ate more rice. At the end there was dessert too - gulab jamun. I would like to go there again.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! कल तुम्हारे घर खाना खाने आऊँ क्या? माँ कह रही हैं कि मैं बहुत बाहर खाता हूँ 😂 तुम्हारे घर दाल चावल सबसे अच्छे बनते हैं।',
      transliteration:
        'are! kal tumhaare ghar khaana khaane aaoon kya? maa kah rahi hain ki main bahut baahar khaata hoon 😂 tumhaare ghar daal chaaval sabse achchhe bante hain.',
      english:
        'Hey! Can I come eat at your house tomorrow? Mom is saying that I eat out too much 😂 - daal and rice turn out best at your place.',
    },
    {
      kind: 'review',
      title: 'ऑनलाइन समीक्षा · Online Review',
      hindi:
        'इस रेस्तराँ की सेवा बहुत अच्छी है। वेटर जल्दी आते हैं और कृपया-धन्यवाद कहते हैं। खाना गरम मिलता है। दाल थोड़ी कम नमकीन थी, लेकिन रोटी एकदम सही थी। दाम भी ठीक है। चार तारे। ⭐⭐⭐⭐',
      transliteration:
        'is restaran ki seva bahut achchhi hai. veter jaldi aate hain aur kripaya-dhanyavaad kahte hain. khaana garam milta hai. daal thodi kam namkeen thi, lekin roti ekdam sahi thi. daam bhi theek hai. chaar taare.',
      english:
        "This restaurant's service is very good. The waiters come quickly and say please and thank you. The food arrives hot. The daal was slightly under-salted, but the roti was just right. The price is fair too. Four stars.",
    },
  ],
  modelTextsNote: {
    why:
      'Menus, diary entries, text messages, and reviews are the four text-types the student most often needs to imitate. Each shows a different register - formal, personal, casual, evaluative - so the student sees Hindi does not sound the same in every situation.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'The Thali is the Template',
      body:
        'An Indian thali is not a single dish but a carefully balanced meal: carb (rice or roti), protein (dal), two or three vegetables, a bit of yogurt, a pickle or chutney, and a small sweet. Writing "I ate a thali" lets you list six specific foods in one breath - huge Topic-Coverage win.',
      emoji: '🍽️',
    },
    {
      title: 'Atithi Devo Bhava (अतिथि देवो भव)',
      body:
        'A guest is treated like a deity. Indian hosts press food on visitors and take offense if you decline politely. Dropping this phrase or idea into a restaurant essay signals real cultural knowledge.',
      emoji: '🙏',
    },
    {
      title: 'Chai is a Ritual, Not Just a Drink',
      body:
        'Morning chai with family, 4 p.m. chai break at work, chai after dinner - it structures the day. Referencing चाय as a time marker ("चाय के बाद" = after chai) reads as authentic.',
      emoji: '🍵',
    },
    {
      title: 'Eating with Hands',
      body:
        'In most Indian households people eat rice + dal + sabzi with the right hand, not a fork. Mentioning this casually - "हम हाथ से खाते हैं" - adds a sensory, specific detail.',
      emoji: '✋',
    },
    {
      title: 'Festival Foods',
      body:
        'Diwali = mithai. Holi = gujiya. Eid = biryani and sheer korma. Karva Chauth = pre-dawn sargi. Tying food to a festival gives a ready-made 3-paragraph essay scaffold.',
      emoji: '🎉',
    },
  ],
  culturalNote: {
    why:
      'FCPS raters on Hindi essays will have seen hundreds of "I eat rice and it is good" answers. A concrete cultural detail - thali structure, the chai break, hand-eating, a festival sweet - instantly separates the essay from the pile. That is a pure Text-Type boost at no grammar cost.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'दाल में कुछ काला होना',
      literal: 'to be something black in the daal',
      meaning: 'Something suspicious is going on.',
      example: 'वह बहुत जल्दी-जल्दी घर लौटता है, दाल में कुछ काला है।',
      exampleEnglish: 'He keeps returning home hurriedly - something is fishy.',
    },
    {
      phrase: 'मुँह में पानी आना',
      literal: 'water coming to the mouth',
      meaning: "One's mouth waters (you really want to eat something).",
      example: 'दादी की खीर देखते ही मेरे मुँह में पानी आ गया।',
      exampleEnglish: "The moment I saw Grandma's kheer, my mouth watered.",
    },
  ],
  muhavareNote: {
    why:
      'Food-based idioms are unusually welcome in food essays - they fit the topic naturally. One idiom placed in a 3-paragraph essay reads as register mastery. Two is overkill; one is plenty.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Family meal',
      prompt: 'अपने परिवार के एक यादगार खाने के बारे में तीन अनुच्छेदों में लिखो। (Write in three paragraphs about a memorable family meal.)',
      novice:
        'मुझे खाना पसंद है। मेरी माँ अच्छी है। दाल अच्छी है।',
      intermediateMid:
        'पिछले रविवार को मेरे घर में सब लोग साथ थे। माँ ने एक बड़ी थाली बनाई। थाली में गरम रोटी, दाल, हरी सब्ज़ी और मीठा दही था। पिताजी को तीखा खाना पसंद है, लेकिन दादी को हल्का खाना अच्छा लगता है, इसलिए माँ दो तरह की सब्ज़ी बनाती हैं।\n\nहम सब साथ बैठकर खाते हैं। खाने के बाद दादी ने मुझे एक कहानी सुनाई। मेरी छोटी बहन ने एक गुलाब जामुन पूरा खा लिया और फिर मुझसे एक और माँगा। यह देखकर सबको हँसी आ गई।\n\nमुझे लगता है कि रविवार का खाना सिर्फ़ खाना नहीं है, बल्कि परिवार का समय भी है। अगले रविवार को मैं माँ के साथ रसोई में जाऊँगा और पहली बार रोटी बनाना सीखूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले रविवार को', note: 'Opens in past tense - anchors one time frame early.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'गरम रोटी, दाल, हरी सब्ज़ी, मीठा दही', note: 'Four distinct food items with correct gender agreement - Topic Coverage + Language Control.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'लेकिन / इसलिए', note: 'Contrast + consequence in one sentence. Text-Type lift.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'हम खाते हैं / दादी ने सुनाई', note: 'Present-habitual beside past-perfective - raters love seeing this within a single paragraph.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादी ने कहानी सुनाई', note: 'Specific family custom, not a generic statement.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... बल्कि ... भी', note: 'Not-only-but-also structure - an Intermediate-Mid hallmark.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले रविवार को ... सीखूँगा', note: 'Future tense arrives in the closing - three time frames in one essay = clean Benchmark 5.' },
      ],
      wordCount: 124,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'इसलिए', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs that cannot be rearranged - Text-Type 5 requirement met.',
          'Uses past (बनाई, सुनाई), present (खाते हैं), and future (सीखूँगा) within 124 words - satisfies the rubric\'s "some control of major time frames" for IM.',
          'Gender agreement is clean: गरम रोटी (f), हरी सब्ज़ी (f), मीठा दही (m), तीखा खाना (m). Language Control stabilizes at Average or High.',
          'Three different connectors (लेकिन, इसलिए, बल्कि) used correctly. Raters see this as explicit connectedness.',
          'Concrete cultural detail (दादी की कहानी, गुलाब जामुन) raises Topic Coverage above generic responses.',
        ],
        gotchas: [
          'If a student writes "खाए" with the wrong gender ending, Language Control drops fast.',
          'A one-paragraph version of the same content would drop to Benchmark 4 despite identical vocabulary.',
        ],
      },
    },
    {
      shortLabel: 'Restaurant outing',
      prompt:
        'एक रेस्तराँ में अपने दोस्त के साथ खाने के अनुभव को तीन अनुच्छेदों में लिखो। (In three paragraphs, describe an experience of eating at a restaurant with your friend.)',
      novice: 'हम रेस्तराँ गए। खाना अच्छा था। हम घर आए।',
      intermediateMid:
        'पिछले शनिवार को मैं और मेरा दोस्त अरुण हमारे पड़ोस के एक नए रेस्तराँ में गए। वेटर ने बहुत प्यार से हमें मेन्यू दिया। पहले हमने मसाला डोसा ऑर्डर किया, फिर एक थाली भी माँगी, क्योंकि हमें बहुत भूख लगी थी।\n\nजब खाना आया, तो सब कुछ गरम और स्वादिष्ट था। डोसा थोड़ा तीखा था, लेकिन थाली एकदम सही थी। हम दोनों ने कृपया-धन्यवाद कहा और साथ में हँसते हुए खाना खाया। मेरे दोस्त के मुँह में पानी आ गया जब उसने मिठाई देखी।\n\nअगर फिर कभी मौका मिलेगा, तो हम वहाँ ज़रूर जाएँगे। मुझे लगता है कि अच्छा खाना और अच्छा दोस्त, दोनों मिलकर किसी भी दिन को यादगार बना देते हैं।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले शनिवार को', note: 'Past frame opens the essay.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... क्योंकि', note: 'Three connectors in a single sentence build temporal + causal cohesion.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'जब ... तो', note: '"When...then" construction - a reliable Intermediate-Mid marker.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'कृपया-धन्यवाद', note: 'Polite register chunk used in context, not listed.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'मुँह में पानी आना', note: 'Food-idiom placed perfectly - one per essay is plenty.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर ... तो ... जाएँगे', note: 'Conditional + future in the closing - third time frame sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'दोनों मिलकर ... बना देते हैं', note: 'Reflective closing generalizes beyond the event - Text-Type lift.' },
      ],
      wordCount: 131,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'क्योंकि', 'लेकिन', 'जब... तब', 'अगर... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Six different connectors used - far above the 3-connector threshold. Text-Type 5 confirmed.',
          'Idiom मुँह में पानी आना is placed inside a past narrative, not appended - this is how Intermediate-Mid students use idioms.',
          'Conditional closing (अगर ... तो जाएँगे) adds the future frame and reflective tone raters specifically reward.',
          'Polite register is sustained (वेटर ने बहुत प्यार से, कृपया-धन्यवाद) - signals Language Control above Average.',
        ],
        gotchas: [
          'If the student writes "मैं गया" as a female narrator, drop in Language Control to Low.',
          'Using ज़्यादा casual English transliterations instead of Devanagari loses points - write in script throughout.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked model essays at Intermediate-Mid. Study them until you can reproduce the sentence shapes without looking. The verdict cards show exactly which rubric boxes each sentence ticks - raters think in these boxes, and so should you.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने परिवार के एक त्योहार के खाने के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि उस दिन क्या बना, किसने बनाया, और आपको क्या सबसे अच्छा लगा।',
      english:
        'Write three paragraphs about a festival meal with your family. Describe what was made, who made it, and what you liked best.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसलिए'],
        vocab: ['थाली', 'मिठाई', 'गरम', 'स्वादिष्ट', 'परिवार'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'एक नए रेस्तराँ में जाने के अपने अनुभव को तीन अनुच्छेदों में वर्णित कीजिए। वेटर, खाना, और बिल के बारे में लिखिए।',
      english:
        'Describe your experience of going to a new restaurant in three paragraphs. Write about the waiter, the food, and the bill.',
      hint: {
        connectors: ['जब... तब', 'लेकिन', 'अंत में'],
        vocab: ['रेस्तराँ', 'मेन्यू', 'ऑर्डर करना', 'कृपया', 'स्वादिष्ट'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगर आप एक रेस्तराँ खोलेंगे, तो वह कैसा होगा? तीन अनुच्छेदों में लिखिए - मेन्यू, सेवा, और खास बात।',
      english:
        'If you were to open a restaurant, what would it be like? Write three paragraphs - menu, service, and unique feature.',
      hint: {
        connectors: ['अगर... तो', 'इसके अलावा', 'सिर्फ़... बल्कि भी'],
        vocab: ['मेन्यू', 'थाली', 'सेवा', 'ग्राहक', 'स्वादिष्ट'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is written in the exact FCPS shape: three cohesive paragraphs, personal experience OR hypothetical experience, with enough scope for tense variety. The hint strip under each prompt is not "the answer" - it is the set of language goals the student should target.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every essay you write in this pack. If you mark three or fewer "Pass" boxes, go back and add connectors, tense variety, or specific vocabulary before moving to the next pack.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
