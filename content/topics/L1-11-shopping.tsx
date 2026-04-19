import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

// -----------------------------------------------------------------------------
// SHOPPING (बाज़ार और ख़रीदारी) - FCPS Level 1, Community Life
// Transactional Hindi is dense: polite requests, numbers, prices, quantities,
// bargaining. Ideal FCPS essay territory - naturally fits past (a shopping
// memory), present (habitual shopping), and future (plans for what to buy).
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-11-shopping',
  level: 1,
  themeGroup: 'ModernSociety',
  topicTheme: 'shopping',
  order: 11,
  heroMotif: 'bazaar',
  titleHindi: 'बाज़ार और ख़रीदारी',
  titleEnglish: 'Shopping',
  hook: 'Transactional Hindi - polite requests, numbers, prices. Dense, practical, easy essay territory.',
  heroPrompt: composeHeroPrompt(
    "A bustling Indian bazaar stall piled with spices in brass bowls, fabrics hanging, a vendor's hand weighing produce on a balance, warm ochre light",
  ),

  rationale: {
    fcpsSubTopics: [
      'Shopping (FCPS Level 1 - Community Life)',
      'Markets, stores, and transactions (FCPS Level 1)',
      'Numbers, prices, and polite requests (FCPS Level 1 - Language Functions)',
    ],
    trains: ['TopicCoverage', 'LanguageControl', 'TextType'],
    afterThisPackStudentCan: [
      'Describe a shopping trip in three connected paragraphs with prices and quantities',
      'Ask about prices politely using कितने का / कितनी की and answer with rupee amounts',
      'Use comparatives सस्ता / महँगा / ज़्यादा / कम to contrast two shops or items',
      'Mention at least one cultural specific - मोल-भाव, सब्ज़ी मंडी, UPI, त्योहार की ख़रीदारी',
      'Sustain gender agreement across feminine shopping nouns (दुकान, कीमत, सब्ज़ी) and masculine ones (बाज़ार, पैसे, दाम)',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Shopping, markets, and transactional prompts come up in almost every FCPS Level-1 test set. Without this vocabulary the student defaults to "मैंने एक चीज़ ख़रीदी" over and over - flat Topic Coverage and no connector opportunities.',
  },

  objectives: [
    {
      text: 'Name at least 15 shopping-related nouns (place, item, money) and 5 transaction verbs without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Ask a price politely using "यह कितने का है?" / "यह कितनी की है?" with correct gender.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Write a 3-paragraph account of a shopping trip using past, present, AND a future purchase plan.',
      trains: ['TextType'],
    },
    {
      text: 'Use two comparatives (सस्ता/महँगा, ज़्यादा/कम) correctly in one essay to contrast shops or items.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Add one cultural specific - bargaining (मोल-भाव), a festival-season market, or paying by UPI - to lift Topic Coverage.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Places
    { hindi: 'बाज़ार', transliteration: 'baazaar', english: 'market / bazaar', exampleHindi: 'हमारा बाज़ार घर के पास है।', exampleEnglish: 'Our market is near our house.', emoji: '🏬', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'दुकान', transliteration: 'dukaan', english: 'shop / store', exampleHindi: 'यह दुकान बहुत पुरानी है।', exampleEnglish: 'This shop is very old.', emoji: '🏪', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'सब्ज़ी मंडी', transliteration: 'sabzi mandi', english: 'vegetable market', exampleHindi: 'माँ सुबह सब्ज़ी मंडी जाती हैं।', exampleEnglish: 'Mother goes to the vegetable market in the morning.', emoji: '🥕', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'माल', transliteration: 'maal', english: 'mall', exampleHindi: 'शनिवार को हम माल जाते हैं।', exampleEnglish: 'On Saturday we go to the mall.', emoji: '🏢', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'बेकरी', transliteration: 'bakery', english: 'bakery', exampleHindi: 'बेकरी से हम ताज़ा ब्रेड लेते हैं।', exampleEnglish: 'We get fresh bread from the bakery.', emoji: '🥖', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'दुकानदार', transliteration: 'dukaandaar', english: 'shopkeeper', exampleHindi: 'दुकानदार बहुत दयालु हैं।', exampleEnglish: 'The shopkeeper is very kind.', emoji: '🧑\u200d💼', partOfSpeech: 'noun', subgroup: 'Places' },

    // Items
    { hindi: 'कपड़े', transliteration: 'kapde', english: 'clothes', exampleHindi: 'मुझे नए कपड़े चाहिए।', exampleEnglish: 'I need new clothes.', emoji: '👕', partOfSpeech: 'noun', subgroup: 'Items' },
    { hindi: 'किताबें', transliteration: 'kitaabein', english: 'books', exampleHindi: 'मैंने दो किताबें ख़रीदीं।', exampleEnglish: 'I bought two books.', emoji: '📚', partOfSpeech: 'noun', subgroup: 'Items' },
    { hindi: 'खिलौने', transliteration: 'khilaune', english: 'toys', exampleHindi: 'बच्चों को खिलौने पसंद हैं।', exampleEnglish: 'Children like toys.', emoji: '🧸', partOfSpeech: 'noun', subgroup: 'Items' },
    { hindi: 'फल', transliteration: 'phal', english: 'fruits', exampleHindi: 'मौसमी फल सस्ते होते हैं।', exampleEnglish: 'Seasonal fruits are cheap.', emoji: '🍎', partOfSpeech: 'noun', subgroup: 'Items' },
    { hindi: 'सब्ज़ियाँ', transliteration: 'sabziyaan', english: 'vegetables', exampleHindi: 'हरी सब्ज़ियाँ ताज़ा हैं।', exampleEnglish: 'The green vegetables are fresh.', emoji: '🥦', partOfSpeech: 'noun', subgroup: 'Items' },
    { hindi: 'थैला', transliteration: 'thaila', english: 'bag / tote', exampleHindi: 'माँ कपड़े का थैला ले जाती हैं।', exampleEnglish: 'Mother takes a cloth bag.', emoji: '🛍️', partOfSpeech: 'noun', subgroup: 'Items' },

    // Money & Price
    { hindi: 'पैसे', transliteration: 'paise', english: 'money', exampleHindi: 'मेरे पास आज पैसे नहीं हैं।', exampleEnglish: 'I do not have money today.', emoji: '💵', partOfSpeech: 'noun', subgroup: 'Money & Price' },
    { hindi: 'रुपये', transliteration: 'rupaye', english: 'rupees', exampleHindi: 'यह शर्ट पाँच सौ रुपये की है।', exampleEnglish: 'This shirt is for five hundred rupees.', emoji: '💰', partOfSpeech: 'noun', subgroup: 'Money & Price' },
    { hindi: 'कीमत', transliteration: 'keemat', english: 'price', exampleHindi: 'इस किताब की कीमत ज़्यादा है।', exampleEnglish: 'The price of this book is high.', emoji: '🏷️', partOfSpeech: 'noun', subgroup: 'Money & Price' },
    { hindi: 'दाम', transliteration: 'daam', english: 'cost / price', exampleHindi: 'फलों के दाम बढ़ गए हैं।', exampleEnglish: 'The prices of fruits have gone up.', emoji: '💱', partOfSpeech: 'noun', subgroup: 'Money & Price' },
    { hindi: 'सस्ता', transliteration: 'sasta', english: 'cheap / inexpensive', exampleHindi: 'यह दुकान उससे सस्ती है।', exampleEnglish: 'This shop is cheaper than that one.', emoji: '🟢', partOfSpeech: 'adjective', subgroup: 'Money & Price' },
    { hindi: 'महँगा', transliteration: 'mahanga', english: 'expensive', exampleHindi: 'माल में सब कुछ महँगा है।', exampleEnglish: 'Everything in the mall is expensive.', emoji: '🔴', partOfSpeech: 'adjective', subgroup: 'Money & Price' },

    // Quantity
    { hindi: 'एक किलो', transliteration: 'ek kilo', english: 'one kilo', exampleHindi: 'कृपया एक किलो टमाटर दीजिए।', exampleEnglish: 'Please give one kilo of tomatoes.', emoji: '⚖️', partOfSpeech: 'phrase', subgroup: 'Quantity' },
    { hindi: 'आधा किलो', transliteration: 'aadha kilo', english: 'half a kilo', exampleHindi: 'मुझे आधा किलो आलू चाहिए।', exampleEnglish: 'I need half a kilo of potatoes.', emoji: '🥔', partOfSpeech: 'phrase', subgroup: 'Quantity' },
    { hindi: 'दर्जन', transliteration: 'darjan', english: 'dozen', exampleHindi: 'एक दर्जन केले कितने के हैं?', exampleEnglish: 'How much is one dozen bananas?', emoji: '🍌', partOfSpeech: 'noun', subgroup: 'Quantity' },
    { hindi: 'ज़्यादा', transliteration: 'zyaada', english: 'more / too much', exampleHindi: 'आज भीड़ ज़्यादा है।', exampleEnglish: 'Today the crowd is too much.', emoji: '⬆️', partOfSpeech: 'adjective', subgroup: 'Quantity' },
    { hindi: 'थोड़ा', transliteration: 'thoda', english: 'a little', exampleHindi: 'थोड़ा धनिया मुफ़्त दे दीजिए।', exampleEnglish: 'Please give a little coriander for free.', emoji: '🌿', partOfSpeech: 'adjective', subgroup: 'Quantity' },

    // Transaction verbs
    { hindi: 'ख़रीदना', transliteration: 'khareedna', english: 'to buy', exampleHindi: 'मैंने एक नई किताब ख़रीदी।', exampleEnglish: 'I bought a new book.', emoji: '🛒', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'बेचना', transliteration: 'bechna', english: 'to sell', exampleHindi: 'वह ताज़े फल बेचते हैं।', exampleEnglish: 'He sells fresh fruit.', emoji: '🧾', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'माँगना', transliteration: 'maangna', english: 'to ask for / request', exampleHindi: 'मैंने दुकानदार से थैला माँगा।', exampleEnglish: 'I asked the shopkeeper for a bag.', emoji: '🙋', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'चुनना', transliteration: 'chunna', english: 'to choose / pick', exampleHindi: 'माँ ने अच्छे टमाटर चुने।', exampleEnglish: 'Mother picked the good tomatoes.', emoji: '🤏', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'देना', transliteration: 'dena', english: 'to give', exampleHindi: 'मैंने दुकानदार को पैसे दिए।', exampleEnglish: 'I gave the money to the shopkeeper.', emoji: '🤝', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'मोल-भाव करना', transliteration: 'mol-bhaav karna', english: 'to bargain', exampleHindi: 'माँ हमेशा थोड़ा मोल-भाव करती हैं।', exampleEnglish: 'Mother always bargains a little.', emoji: '💬', partOfSpeech: 'verb', subgroup: 'Verbs' },

    // Polite / question
    { hindi: 'कितने का', transliteration: 'kitne ka', english: 'how much (m.)', exampleHindi: 'यह आम कितने का है?', exampleEnglish: 'How much is this mango?', emoji: '❓', partOfSpeech: 'question', subgroup: 'Polite speech' },
    { hindi: 'कितनी की', transliteration: 'kitni ki', english: 'how much (f.)', exampleHindi: 'यह किताब कितनी की है?', exampleEnglish: 'How much is this book?', emoji: '❔', partOfSpeech: 'question', subgroup: 'Polite speech' },
  ],
  vocabularyNote: {
    why:
      'These 32 words cover the four boxes every shopping essay must check: place, item, money, and transaction verb. Every word here shows up in the anchor, a model text, or a model essay - learn this list first and Topic Coverage is guaranteed.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Asking prices: कितने का / कितनी की with gender agreement',
      rule:
        'To ask "how much is this?" match the question word to the gender and number of the item. Masculine singular → "कितने का है?". Feminine singular → "कितनी की है?". Plural items use "कितने के हैं?" (m.pl) or "कितनी की हैं?" (f.pl).',
      examples: [
        { hindi: 'यह आम कितने का है?', transliteration: 'yah aam kitne ka hai?', english: 'How much is this mango? (m.sg)' },
        { hindi: 'यह किताब कितनी की है?', transliteration: 'yah kitaab kitni ki hai?', english: 'How much is this book? (f.sg)' },
        { hindi: 'ये सेब कितने के हैं?', transliteration: 'ye seb kitne ke hain?', english: 'How much are these apples? (m.pl)' },
        { hindi: 'ये सब्ज़ियाँ कितनी की हैं?', transliteration: 'ye sabziyaan kitni ki hain?', english: 'How much are these vegetables? (f.pl)' },
      ],
      pitfall:
        'Students often freeze "कितने का" and use it for everything, producing "यह किताब कितने का है?" - a gender mismatch raters flag immediately.',
      whyItMatters:
        'Price questions are the highest-frequency transactional move in any shopping essay. Getting the gender wrong on the question word four times in one essay drops Language Control straight to Low.',
    },
    {
      title: 'Polite requests: कृपया + quantity + noun + दीजिए',
      rule:
        'To ask a vendor for something politely, use कृपया + quantity + item + दीजिए/दे दीजिए. This is the register FCPS rewards. Avoid casual "मुझे दो" in essays - it reads as Novice.',
      examples: [
        { hindi: 'कृपया एक किलो टमाटर दीजिए।', transliteration: 'kripaya ek kilo tamaatar deejiye.', english: 'Please give one kilo of tomatoes.' },
        { hindi: 'कृपया आधा किलो आलू दे दीजिए।', transliteration: 'kripaya aadha kilo aaloo de deejiye.', english: 'Please give half a kilo of potatoes.' },
        { hindi: 'कृपया थोड़ा धनिया मुफ़्त में दे दीजिए।', transliteration: 'kripaya thoda dhaniya muft mein de deejiye.', english: 'Please give a little coriander for free.' },
      ],
      pitfall:
        'Writing "मुझे टमाटर दो" in a shopping essay sounds like a child ordering a sibling. Raters read it as register failure.',
      whyItMatters:
        'Polite register is itself a Text-Type signal. Three correct कृपया ... दीजिए forms in one essay tell the rater "this student knows target-language norms" before the content is even scanned.',
    },
    {
      title: 'Comparatives: X, Y से सस्ता / महँगा है',
      rule:
        'To compare two items or shops, use "X, Y से [adjective] है". से marks the thing being compared against. The adjective must agree with X (the subject).',
      examples: [
        { hindi: 'यह दुकान माल से सस्ती है।', transliteration: 'yah dukaan maal se sasti hai.', english: 'This shop is cheaper than the mall. (f.)' },
        { hindi: 'आम सेब से महँगे हैं।', transliteration: 'aam seb se mahange hain.', english: 'Mangoes are more expensive than apples. (m.pl)' },
        { hindi: 'आज कीमत कल से ज़्यादा है।', transliteration: 'aaj keemat kal se zyaada hai.', english: 'Today the price is more than yesterday.' },
      ],
      pitfall:
        'Forgetting the से marker ("यह दुकान माल सस्ती है") or using the wrong gender ("यह दुकान ... सस्ता है") - both errors confuse meaning.',
      whyItMatters:
        'Comparatives are an Intermediate-Mid discourse move. One comparison sentence per essay signals the rater that the student can handle more than simple listing.',
    },
    {
      title: 'Past transitive with ने: "मैंने ... ख़रीदा/ख़रीदी/ख़रीदे/ख़रीदीं"',
      rule:
        'To narrate a past shopping trip - required for Intermediate-Mid - use मैंने/हमने + object + perfective verb. The verb agrees in gender AND number with the OBJECT, not the subject.',
      examples: [
        { hindi: 'मैंने एक किताब ख़रीदी।', transliteration: 'maine ek kitaab khareedi.', english: 'I bought a book. (f.sg object)' },
        { hindi: 'मैंने दो आम ख़रीदे।', transliteration: 'maine do aam khareede.', english: 'I bought two mangoes. (m.pl object)' },
        { hindi: 'हमने तीन किताबें ख़रीदीं।', transliteration: 'humne teen kitaabein khareedeen.', english: 'We bought three books. (f.pl object)' },
      ],
      pitfall:
        'Students write "मैं ख़रीदा" (no ने) or "मैंने ख़रीदा" regardless of object. Both errors are immediately visible to raters.',
      whyItMatters:
        'A Benchmark 5 essay must display "some control" of past, present, and future. One clean ने-construction past sentence anchors the past frame and is often what tips the essay from Benchmark 4 to 5.',
    },
  ],
  grammarNote: {
    why:
      'These four rules account for most errors on shopping essays. Nail the price question, the polite request, one comparative, and one past ने-construction, and Language Control stabilizes at Average - enough for Intermediate-Mid.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'kyonki',
    'lekin',
    'isliye',
  ]),
  connectorsNote: {
    why:
      'पहले / फिर / इसके बाद structures a shopping trip chronologically - exactly how FCPS prompts frame the task. क्योंकि gives the reason ("because the mangoes were fresh"), लेकिन adds contrast ("but they were expensive"), and इसलिए draws the consequence ("so we only bought half a kilo"). Six STARTER connectors are plenty for Benchmark 5 on this topic.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'शनिवार की सब्ज़ी मंडी · Saturday at the Vegetable Market',
    hindi:
      'हर शनिवार को माँ और मैं सब्ज़ी मंडी जाते हैं। पहले हम घर से कपड़े का थैला लेकर निकलते हैं, क्योंकि माँ प्लास्टिक पसंद नहीं करतीं। मंडी में बहुत भीड़ होती है, लेकिन ताज़ी सब्ज़ियाँ सस्ती मिलती हैं। माँ पूछती हैं, "भैया, टमाटर कितने के हैं?" दुकानदार कहते हैं, "चालीस रुपये किलो।" फिर माँ थोड़ा मोल-भाव करती हैं और हमें पैंतीस रुपये में एक किलो मिल जाता है। इसके बाद हम आधा किलो आलू और एक दर्जन केले भी ख़रीदते हैं। अंत में दुकानदार मुफ़्त में थोड़ा हरा धनिया दे देते हैं, इसलिए माँ मुस्कुरा देती हैं। हम UPI से पैसे देते हैं और भारी थैला लेकर घर लौटते हैं।',
    transliteration:
      'har shanivaar ko maa aur main sabzi mandi jaate hain. pahle hum ghar se kapde ka thaila lekar nikalte hain, kyonki maa plastic pasand nahin karteen. mandi mein bahut bheed hoti hai, lekin taazi sabziyaan sasti milti hain. maa poochhti hain, "bhaiya, tamaatar kitne ke hain?" dukaandaar kahte hain, "chaalees rupaye kilo." phir maa thoda mol-bhaav karti hain aur humein paintees rupaye mein ek kilo mil jaata hai. iske baad hum aadha kilo aaloo aur ek darjan kele bhi khareedte hain. ant mein dukaandaar muft mein thoda hara dhaniya de dete hain, isliye maa muskura deti hain. hum UPI se paise dete hain aur bhaari thaila lekar ghar lautte hain.',
    english:
      'Every Saturday, Mother and I go to the vegetable market. First we leave home with a cloth bag, because Mother does not like plastic. The market is very crowded, but fresh vegetables are cheap there. Mother asks, "Brother, how much are the tomatoes?" The shopkeeper says, "Forty rupees a kilo." Then Mother bargains a little and we get one kilo for thirty-five rupees. After this we also buy half a kilo of potatoes and a dozen bananas. In the end the shopkeeper gives us some green coriander for free, so Mother smiles. We pay by UPI and return home carrying the heavy bag.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors scaffold the whole trip. Sentences cannot be rearranged - that is Text-Type 5.' },
      { term: 'क्योंकि / लेकिन / इसलिए', note: 'Three reasoning connectors add the cause, contrast, and consequence raters reward.' },
      { term: 'टमाटर कितने के हैं? / चालीस रुपये किलो', note: 'Authentic price-question with m.pl agreement, plus a realistic rupee answer. Topic Coverage at its best.' },
      { term: 'मोल-भाव / UPI / कपड़े का थैला', note: 'Three cultural specifics in one paragraph - bargaining, digital payment, and anti-plastic bag use. Raters love this density.' },
      { term: 'एक किलो / आधा किलो / एक दर्जन', note: 'Three different quantity expressions in one passage - rare and rubric-rewarding.' },
    ],
    comprehensionQuestions: [
      { q: 'When do Mother and the narrator go to the market?', a: 'हर शनिवार को (every Saturday).' },
      { q: 'Why do they take a cloth bag?', a: 'क्योंकि माँ प्लास्टिक पसंद नहीं करतीं (because Mother does not like plastic).' },
      { q: 'What was the first price the shopkeeper quoted for tomatoes?', a: 'चालीस रुपये किलो (forty rupees a kilo).' },
      { q: 'What price did Mother finally pay for one kilo of tomatoes?', a: 'पैंतीस रुपये (thirty-five rupees) - after bargaining.' },
      { q: 'Name three items they bought.', a: 'एक किलो टमाटर, आधा किलो आलू, और एक दर्जन केले (one kilo tomatoes, half a kilo potatoes, a dozen bananas).' },
      { q: 'What did the shopkeeper give for free?', a: 'थोड़ा हरा धनिया (a little green coriander).' },
      { q: 'How did they pay?', a: 'UPI से (by UPI).' },
      { q: 'Identify one connector and explain what it does.', a: 'Any of पहले, फिर, इसके बाद, अंत में, क्योंकि, लेकिन, इसलिए - each links ideas in time or reasoning.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a template shopping essay. It hits every box: four sequence connectors, three reasoning connectors, price questions, bargaining, cultural markers, and three quantity expressions - all in 110 words. Read it aloud three times before writing a prompt; the sentence shapes will start to feel automatic.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'sign',
      title: 'सब्ज़ी वाले का दाम-सूची · Vegetable Seller\'s Price List',
      hindi:
        'आलू - ₹30 किलो\nटमाटर - ₹40 किलो\nप्याज़ - ₹35 किलो\nहरी मिर्च - ₹80 किलो\nधनिया - ₹10 गड्डी\nकेले - ₹50 दर्जन\nसेब - ₹180 किलो\nआम - ₹120 किलो\nUPI स्वीकार है ✅',
      transliteration:
        'aaloo - 30 kilo | tamaatar - 40 kilo | pyaaz - 35 kilo | hari mirch - 80 kilo | dhaniya - 10 gaddi | kele - 50 darjan | seb - 180 kilo | aam - 120 kilo | UPI sveekaar hai',
      english:
        'Potatoes ₹30/kg · Tomatoes ₹40/kg · Onions ₹35/kg · Green chilies ₹80/kg · Coriander ₹10/bunch · Bananas ₹50/dozen · Apples ₹180/kg · Mangoes ₹120/kg · UPI accepted',
    },
    {
      kind: 'sms',
      title: 'माँ को संदेश · Message to Mother',
      hindi:
        'माँ, मैं बाज़ार पहुँच गया हूँ। आलू कितने किलो लूँ? दुकानदार कह रहे हैं कि आज टमाटर थोड़े महँगे हैं, इसलिए मैं सिर्फ़ आधा किलो लूँगा। धनिया मुफ़्त मिल गया 🌿',
      transliteration:
        'maa, main baazaar pahunch gaya hoon. aaloo kitne kilo loon? dukaandaar kah rahe hain ki aaj tamaatar thode mahange hain, isliye main sirf aadha kilo loonga. dhaniya muft mil gaya.',
      english:
        'Mom, I have reached the market. How many kilos of potatoes should I get? The shopkeeper is saying tomatoes are a little expensive today, so I will only get half a kilo. Got coriander for free.',
    },
    {
      kind: 'diary',
      title: 'मेरी डायरी · My Diary',
      hindi:
        'आज हम दिवाली की ख़रीदारी के लिए माल गए। वहाँ बहुत भीड़ थी और हर चीज़ महँगी थी। मैंने अपने छोटे भाई के लिए एक खिलौना और माँ के लिए एक साड़ी ख़रीदी। बिल देखकर मेरे होश उड़ गए, लेकिन त्योहार पर यह सब ज़रूरी है।',
      transliteration:
        'aaj hum divaali ki khareedaari ke liye maal gaye. vahaan bahut bheed thi aur har cheez mahangi thi. maine apne chhote bhai ke liye ek khilauna aur maa ke liye ek saari khareedi. bill dekhkar mere hosh ud gaye, lekin tyohaar par yah sab zaroori hai.',
      english:
        'Today we went to the mall for Diwali shopping. There was a huge crowd and everything was expensive. I bought a toy for my little brother and a saree for Mother. My senses flew when I saw the bill, but all of this is necessary for the festival.',
    },
    {
      kind: 'review',
      title: 'ऑनलाइन समीक्षा · Online Review',
      hindi:
        'शर्मा जी की दुकान बहुत अच्छी है। सब्ज़ियाँ ताज़ी होती हैं और दाम उचित हैं। दुकानदार मुस्कुराकर बात करते हैं और थोड़ा मोल-भाव भी मान लेते हैं। UPI भी स्वीकार है। मंडी से नज़दीक - ज़रूर जाइए। ⭐⭐⭐⭐⭐',
      transliteration:
        'sharma ji ki dukaan bahut achchhi hai. sabziyaan taazi hoti hain aur daam uchit hain. dukaandaar muskuraakar baat karte hain aur thoda mol-bhaav bhi maan lete hain. UPI bhi sveekaar hai. mandi se nazdeek - zaroor jaaiye. paanch taare.',
      english:
        "Sharma ji's shop is very good. The vegetables are fresh and the prices are fair. The shopkeeper speaks with a smile and even accepts a little bargaining. UPI is accepted too. Close to the market - definitely go. Five stars.",
    },
  ],
  modelTextsNote: {
    why:
      'A price list, a parent-message, a festival diary entry, and a shop review - four different registers the student may need to imitate. Each uses the same core vocabulary but shifts in tone, showing that Hindi does not sound the same in every situation.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'मोल-भाव - Bargaining is Expected',
      body:
        'In local markets and sabzi mandis, a small amount of polite bargaining is normal and expected - not rude. A vendor quotes a slightly high price, the customer counter-offers, and they meet in the middle. Malls and supermarkets are fixed-price (MRP). Mentioning मोल-भाव in an essay signals real cultural fluency.',
      emoji: '💬',
    },
    {
      title: 'The Brass Balance (तराज़ू)',
      body:
        'Street vendors still weigh vegetables on a simple two-pan brass balance (तराज़ू) with iron weights - not a digital scale. The image of the vendor adding a handful of extra chilies to "make weight" is iconic and sensory.',
      emoji: '⚖️',
    },
    {
      title: 'UPI Has Replaced Cash',
      body:
        'Even the smallest sabzi-wala now has a printed UPI QR code taped to the cart. Paying ₹35 for tomatoes by phone-scan is as Indian now as paying in coins used to be. Writing "मैंने UPI से पैसे दिए" is modern and specific.',
      emoji: '📱',
    },
    {
      title: 'Festival Shopping Rush',
      body:
        'Before Diwali, Eid, Rakhi, or Karva Chauth, markets are packed into the night. Families shop for sweets, clothes, gifts, and decorations. Essays about त्योहार की ख़रीदारी (festival shopping) almost write themselves - crowd, lights, bargaining, a final bill that shocks everyone.',
      emoji: '🪔',
    },
    {
      title: 'Free Dhaniya as Goodwill',
      body:
        'A loyal sabzi vendor will toss a free bunch of हरा धनिया (coriander) or a couple of मिर्च (chilies) into your bag as a thank-you gesture. This tiny detail - "दुकानदार ने धनिया मुफ़्त दे दिया" - reads as extremely authentic to raters.',
      emoji: '🌿',
    },
  ],
  culturalNote: {
    why:
      'Shopping essays are easy to make generic ("I went to the store and bought things"). A concrete Indian detail - bargaining, a brass balance, UPI payment, a free bunch of coriander - lifts the essay out of that pile instantly. Zero grammar cost, pure Text-Type and Topic Coverage gain.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'पानी की तरह पैसा बहाना',
      literal: 'to pour money like water',
      meaning: 'To spend money recklessly, as though it were limitless.',
      example: 'त्योहार पर लोग पानी की तरह पैसा बहाते हैं।',
      exampleEnglish: 'During festivals people spend money like water.',
    },
    {
      phrase: 'जेब ढीली होना',
      literal: "one's pocket becoming loose",
      meaning: 'To have to spend a lot of money - wallet-lightening.',
      example: 'माल में एक साड़ी ख़रीदते ही मेरी जेब ढीली हो गई।',
      exampleEnglish: 'The moment I bought a saree at the mall, my pocket got loose.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are money-themed and fit shopping essays naturally. One well-placed idiom inside a past-tense narrative reads as register mastery. Two in one essay is overkill - pick one per response.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Last shopping trip',
      prompt:
        'अपनी पिछली ख़रीदारी के अनुभव के बारे में तीन अनुच्छेदों में लिखो। बताओ कि तुम कहाँ गए, क्या ख़रीदा, और कितने पैसे लगे। (Write three paragraphs about your last shopping experience. Describe where you went, what you bought, and how much money it cost.)',
      novice:
        'मैं बाज़ार गया। मैंने फल ख़रीदे। दाम ज़्यादा थे।',
      intermediateMid:
        'पिछले शनिवार को मैं और माँ सब्ज़ी मंडी गए। पहले हमने कपड़े का थैला लिया, क्योंकि माँ प्लास्टिक पसंद नहीं करतीं। मंडी में बहुत भीड़ थी, लेकिन सब्ज़ियाँ ताज़ी और सस्ती थीं।\n\nमाँ ने दुकानदार से पूछा, "भैया, टमाटर कितने के हैं?" दुकानदार ने कहा, "चालीस रुपये किलो।" फिर माँ ने थोड़ा मोल-भाव किया, इसलिए हमें पैंतीस रुपये में एक किलो मिला। इसके बाद हमने आधा किलो आलू और एक दर्जन केले भी ख़रीदे। अंत में दुकानदार ने मुफ़्त में हरा धनिया दे दिया।\n\nकुल मिलाकर हमने दो सौ रुपये ख़र्च किए और मैंने UPI से पैसे दिए। मुझे लगता है कि मंडी में ख़रीदारी करना माल से अच्छा है, क्योंकि यहाँ सब कुछ ताज़ा मिलता है। अगले हफ़्ते मैं अकेले जाऊँगा और पहली बार ख़ुद मोल-भाव करूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले शनिवार को', note: 'Opens in past tense - anchors one time frame from the first sentence.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले / क्योंकि / लेकिन', note: 'Three connectors in the opening paragraph - immediate Text-Type signal.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'कपड़े का थैला / सब्ज़ियाँ ताज़ी', note: 'Specific items with correct gender agreement (थैला m., सब्ज़ियाँ f.pl).' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'टमाटर कितने के हैं? / चालीस रुपये किलो', note: 'Authentic price question with m.pl agreement, realistic answer - peak Topic Coverage.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'फिर / इसलिए / इसके बाद / अंत में', note: 'Four sequence connectors in one paragraph structure the transaction.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'मोल-भाव / मुफ़्त में धनिया', note: 'Two cultural specifics - bargaining and the free coriander gesture.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मंडी में ख़रीदारी करना माल से अच्छा है', note: 'Comparative with से - an Intermediate-Mid discourse move.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले हफ़्ते ... जाऊँगा / करूँगा', note: 'Future tense arrives in the closing - three time frames in one essay = clean Benchmark 5.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'क्योंकि', 'लेकिन', 'फिर', 'इसलिए', 'इसके बाद', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs where sentences cannot be rearranged - Text-Type 5 met.',
          'Uses past (गए, ख़रीदे, दिए), present (मिलता है, अच्छा है), and future (जाऊँगा, करूँगा) within 138 words - satisfies "some control of major time frames" for IM.',
          'Seven distinct connectors deployed correctly - far above the three-connector threshold raters look for.',
          'Gender agreement is clean across both genders: कपड़े का थैला (m), सब्ज़ियाँ ताज़ी (f.pl), हरा धनिया (m), एक किलो (m). Language Control stabilizes at Average or High.',
          'Concrete cultural details (मोल-भाव, UPI, मुफ़्त धनिया, कपड़े का थैला) push Topic Coverage above generic shopping answers.',
        ],
        gotchas: [
          'If a student writes "यह टमाटर कितनी की है?" (wrong gender on price question), Language Control drops.',
          'Skipping the comparative (माल से अच्छा) would flatten the essay to Benchmark 4.',
        ],
      },
    },
    {
      shortLabel: 'Diwali shopping',
      prompt:
        'दिवाली की ख़रीदारी के बारे में अपने परिवार के साथ अपने अनुभव को तीन अनुच्छेदों में वर्णित करो। (Describe in three paragraphs your experience of Diwali shopping with your family.)',
      novice:
        'हम बाज़ार गए। हमने मिठाई ख़रीदी। दिवाली अच्छी थी।',
      intermediateMid:
        'पिछले साल दिवाली से एक हफ़्ते पहले, हमारा पूरा परिवार माल गया। वहाँ बहुत भीड़ थी, क्योंकि सब लोग त्योहार की ख़रीदारी कर रहे थे। चारों तरफ़ लाइटें जल रही थीं और हर दुकान के बाहर लंबी कतारें थीं।\n\nपहले माँ ने अपने लिए एक नई साड़ी चुनी, जो थोड़ी महँगी थी लेकिन बहुत सुंदर थी। फिर मैंने अपने छोटे भाई के लिए एक खिलौना और पिताजी के लिए एक कमीज़ ख़रीदी। इसके बाद हम मिठाई की दुकान गए और दो किलो मिठाई ली। अंत में जब पिताजी ने बिल देखा, तो उनकी जेब ढीली हो गई - लगभग पाँच हज़ार रुपये!\n\nमुझे लगता है कि दिवाली पर लोग पानी की तरह पैसा बहाते हैं, लेकिन परिवार की ख़ुशी सबसे ज़रूरी है। अगले साल मैं अपने जेब-ख़र्च से पिताजी को एक छोटा-सा तोहफ़ा ज़रूर ख़रीदूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले साल दिवाली से एक हफ़्ते पहले', note: 'Precise past time marker - opens the past frame cleanly.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि', note: 'Explains the crowd - cause connector early.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'लाइटें जल रही थीं / लंबी कतारें', note: 'Sensory, specific Diwali-market detail, not generic.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors structure the shopping trip chronologically.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'एक नई साड़ी / एक खिलौना / एक कमीज़ / दो किलो मिठाई', note: 'Four specific items with correct gender and a quantity - Topic Coverage dense.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'जेब ढीली हो गई', note: 'Shopping-idiom placed inside the narrative, not appended - Intermediate-Mid move.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'पानी की तरह पैसा बहाते हैं', note: 'Second idiom used as generalization - reflective closing.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल ... ख़रीदूँगा', note: 'Future tense in the closing - third time frame sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'परिवार की ख़ुशी सबसे ज़रूरी है', note: 'Reflective generalization - raters specifically reward this discourse move.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'पहले', 'लेकिन', 'फिर', 'इसके बाद', 'अंत में', 'जब... तब'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Seven connectors used across three paragraphs, including the "जब ... तो" construction - Text-Type 5 confirmed.',
          'Past (गए, चुनी, ख़रीदी), present (बहाते हैं, ज़रूरी है), and future (ख़रीदूँगा) all appear - three time frames in 142 words.',
          'Both idioms (जेब ढीली / पानी की तरह पैसा बहाना) placed inside narrative context, not as list items - Language Control high.',
          'Specific items, specific rupee amount (पाँच हज़ार), specific festival - Topic Coverage extremely dense.',
          'Reflective closing (परिवार की ख़ुशी सबसे ज़रूरी है) generalizes beyond the event - Intermediate-Mid hallmark.',
        ],
        gotchas: [
          'Using two idioms sometimes reads as overreach - one would still earn Benchmark 5.',
          'If the student forgets ने on "माँ ने साड़ी चुनी" (writes "माँ चुनी"), Language Control drops to Low.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked model essays at Intermediate-Mid - a weekend sabzi-mandi trip and a Diwali mall trip. Study them until you can reproduce the sentence shapes without looking. The verdict cards show exactly which rubric boxes each sentence ticks.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपनी पिछली बाज़ार की यात्रा के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप किसके साथ गए, आपने क्या-क्या ख़रीदा, और दुकानदार से कैसे बात की।',
      english:
        'Write three paragraphs about your last trip to the market. Describe who you went with, what you bought, and how you spoke with the shopkeeper.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसलिए'],
        vocab: ['बाज़ार', 'दुकानदार', 'कृपया', 'एक किलो', 'ख़रीदना'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अपने त्योहार की ख़रीदारी के अनुभव को तीन अनुच्छेदों में वर्णित कीजिए। मिठाई, कपड़े, तोहफ़े, और बिल के बारे में लिखिए।',
      english:
        'Describe your festival shopping experience in three paragraphs. Write about sweets, clothes, gifts, and the bill.',
      hint: {
        connectors: ['इसके बाद', 'लेकिन', 'अंत में'],
        vocab: ['मिठाई', 'कपड़े', 'महँगा', 'कीमत', 'परिवार'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगर आपको अपनी ख़ुद की एक छोटी दुकान खोलनी हो, तो वह कैसी होगी? तीन अनुच्छेदों में लिखिए - क्या बेचेंगे, कीमत कैसी रखेंगे, और ग्राहकों से कैसे व्यवहार करेंगे।',
      english:
        'If you were to open your own small shop, what would it be like? Write three paragraphs - what you would sell, how you would price it, and how you would treat customers.',
      hint: {
        connectors: ['अगर... तो', 'क्योंकि', 'इसलिए'],
        vocab: ['दुकान', 'बेचना', 'सस्ता', 'दुकानदार', 'UPI'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt maps to the FCPS shape: three cohesive paragraphs, personal or hypothetical, with room for past/present/future. The hint strip is a language-goal target, not an answer. Hit two connectors, five vocab items, and both named tenses and the rubric tilts toward Benchmark 5.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every essay you write on shopping. If fewer than three boxes are "Pass", go back and add: (a) one price question with correct gender, (b) one comparative with से, (c) one cultural specific (मोल-भाव, UPI, or a festival). That trio is almost always what tips the essay from Benchmark 4 to 5.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
