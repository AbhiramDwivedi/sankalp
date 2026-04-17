import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L2-08-shopping-advanced',
  level: 2,
  themeGroup: 'ModernSociety',
  order: 20,
  heroMotif: 'bazaar',
  titleHindi: 'ख़रीदारी (स्तर 2)',
  titleEnglish: 'Shopping (Level 2)',
  hook: 'Comparison, opinion, online vs mall — Level-2 shopping is where the student learns to argue, not just list.',
  heroPrompt: composeHeroPrompt(
    'A mall escalator scene with shoppers carrying branded bags from different boutiques, a food court visible, a mobile phone screen showing an online shopping cart in the foreground, cream and sage palette',
  ),

  rationale: {
    fcpsSubTopics: [
      'Shopping (FCPS Level 2 — Leisure Time; Level-2 deep dive)',
      'Consumer opinions and comparisons (FCPS Level 2)',
      'Online versus in-person shopping (FCPS Level 2 — contemporary life)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Compare two shopping experiences (online vs mall, festival vs regular) using से ज़्यादा / सबसे',
      'State an opinion using मुझे लगता है कि or मेरी राय में plus a reason',
      'Describe a problem-resolution story (returning a product) in past tense with ने-construction',
      'Name at least 5 online-shopping terms and 5 problem terms without lookup',
      'Include one India-specific detail (Flipkart Big Billion Day, UPI payment, Diwali offer) to lift Topic Coverage',
    ],
    positionOnArc: 'pushing-to-IM',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'FCPS Level-2 shopping prompts increasingly ask for opinion and comparison, not just a transaction report. Without the comparative and opinion structures in this pack, the student stays at a Level-1 "I bought X" pattern and caps at 2 credits.',
  },

  objectives: [
    { text: 'Produce three comparison sentences using से ज़्यादा / से कम / सबसे in one essay.', trains: ['LanguageControl', 'TextType'] },
    { text: 'Open at least one paragraph with an opinion marker (मुझे लगता है कि / मेरी राय में).', trains: ['TextType'] },
    { text: 'Describe a problem and its resolution (a defective product, a return) in past tense.', trains: ['LanguageControl'] },
    { text: 'Name 5+ online-specific terms (ऐप, डिलीवरी, रिव्यू, छूट, ऑफ़र) and 5+ problem terms.', trains: ['TopicCoverage'] },
    { text: 'Include one India-specific festival-sale reference per essay.', trains: ['TopicCoverage', 'TextType'] },
  ],

  vocabulary: [
    // Comparative vocabulary
    { hindi: 'सस्ता', transliteration: 'sasta', english: 'cheap / inexpensive', exampleHindi: 'यह दुकान उस मॉल से सस्ती है।', exampleEnglish: 'This shop is cheaper than that mall.', emoji: '🟢', partOfSpeech: 'adjective', subgroup: 'Comparison' },
    { hindi: 'महँगा', transliteration: 'mahanga', english: 'expensive', exampleHindi: 'ब्रांडेड कपड़े बहुत महँगे होते हैं।', exampleEnglish: 'Branded clothes are very expensive.', emoji: '🔴', partOfSpeech: 'adjective', subgroup: 'Comparison' },
    { hindi: 'बेहतर', transliteration: 'behtar', english: 'better', exampleHindi: 'ऑनलाइन ख़रीदारी समय के लिहाज़ से बेहतर है।', exampleEnglish: 'Online shopping is better in terms of time.', emoji: '⬆️', partOfSpeech: 'adjective', subgroup: 'Comparison' },
    { hindi: 'बदतर', transliteration: 'badtar', english: 'worse', exampleHindi: 'ऑनलाइन कपड़ों की गुणवत्ता कभी-कभी बदतर होती है।', exampleEnglish: 'Quality of online clothes is sometimes worse.', emoji: '⬇️', partOfSpeech: 'adjective', subgroup: 'Comparison' },
    { hindi: 'से ज़्यादा', transliteration: 'se zyaada', english: 'more than', exampleHindi: 'मेरी बहन मुझसे ज़्यादा ख़रीदारी करती है।', exampleEnglish: 'My sister shops more than me.', emoji: '➕', partOfSpeech: 'phrase', subgroup: 'Comparison' },
    { hindi: 'सबसे अच्छा', transliteration: 'sabse achchha', english: 'the best', exampleHindi: 'यह माल हमारे शहर का सबसे अच्छा है।', exampleEnglish: 'This mall is the best in our city.', emoji: '🏆', partOfSpeech: 'phrase', subgroup: 'Comparison' },
    { hindi: 'सबसे सस्ता', transliteration: 'sabse sasta', english: 'the cheapest', exampleHindi: 'बाज़ार में सब्ज़ियाँ सबसे सस्ती मिलती हैं।', exampleEnglish: 'Vegetables are cheapest at the market.', emoji: '💰', partOfSpeech: 'phrase', subgroup: 'Comparison' },

    // Transaction nuance
    { hindi: 'छूट', transliteration: 'chhoot', english: 'discount', exampleHindi: 'त्योहारों पर पचास प्रतिशत की छूट मिलती है।', exampleEnglish: 'Fifty percent discount is available on festivals.', emoji: '🏷️', partOfSpeech: 'noun', subgroup: 'Transaction' },
    { hindi: 'ऑफ़र', transliteration: 'offer', english: 'offer / deal', exampleHindi: 'इस हफ़्ते नया ऑफ़र आया है।', exampleEnglish: 'A new offer has come this week.', emoji: '✨', partOfSpeech: 'noun', subgroup: 'Transaction' },
    { hindi: 'डील', transliteration: 'deal', english: 'deal', exampleHindi: 'दिवाली पर सबसे अच्छी डील मिलती है।', exampleEnglish: 'The best deals come during Diwali.', emoji: '🤝', partOfSpeech: 'noun', subgroup: 'Transaction' },
    { hindi: 'वारंटी', transliteration: 'warranty', english: 'warranty', exampleHindi: 'मोबाइल पर एक साल की वारंटी है।', exampleEnglish: 'There is a one-year warranty on the mobile.', emoji: '📄', partOfSpeech: 'noun', subgroup: 'Transaction' },
    { hindi: 'रसीद', transliteration: 'raseed', english: 'receipt', exampleHindi: 'कृपया रसीद सँभालकर रखिए।', exampleEnglish: 'Please keep the receipt safely.', emoji: '🧾', partOfSpeech: 'noun', subgroup: 'Transaction' },

    // Online shopping
    { hindi: 'ऑनलाइन', transliteration: 'online', english: 'online', exampleHindi: 'आजकल ज़्यादातर लोग ऑनलाइन ख़रीदते हैं।', exampleEnglish: 'These days most people shop online.', emoji: '💻', partOfSpeech: 'adjective', subgroup: 'Online' },
    { hindi: 'डिलीवरी', transliteration: 'delivery', english: 'delivery', exampleHindi: 'डिलीवरी दो दिन में आ जाती है।', exampleEnglish: 'Delivery arrives in two days.', emoji: '📦', partOfSpeech: 'noun', subgroup: 'Online' },
    { hindi: 'ऐप', transliteration: 'app', english: 'app', exampleHindi: 'यह ऐप मेरे फ़ोन में है।', exampleEnglish: 'This app is on my phone.', emoji: '📱', partOfSpeech: 'noun', subgroup: 'Online' },
    { hindi: 'रिव्यू', transliteration: 'review', english: 'review', exampleHindi: 'ख़रीदने से पहले मैं रिव्यू पढ़ता हूँ।', exampleEnglish: 'Before buying, I read reviews.', emoji: '⭐', partOfSpeech: 'noun', subgroup: 'Online' },
    { hindi: 'यूपीआई', transliteration: 'UPI', english: 'UPI (digital payment)', exampleHindi: 'हम ज़्यादातर यूपीआई से भुगतान करते हैं।', exampleEnglish: 'We mostly pay via UPI.', emoji: '💳', partOfSpeech: 'noun', subgroup: 'Online' },

    // Problems
    { hindi: 'ख़राब', transliteration: 'kharaab', english: 'defective / bad', exampleHindi: 'उनका जूता पहले ही दिन ख़राब हो गया।', exampleEnglish: 'Their shoe became defective on the very first day.', emoji: '❌', partOfSpeech: 'adjective', subgroup: 'Problems' },
    { hindi: 'टूटा हुआ', transliteration: 'tootaa hua', english: 'broken', exampleHindi: 'डिब्बा खोला तो फ़ोन टूटा हुआ था।', exampleEnglish: 'When I opened the box, the phone was broken.', emoji: '💔', partOfSpeech: 'phrase', subgroup: 'Problems' },
    { hindi: 'वापस करना', transliteration: 'vaapas karna', english: 'to return', exampleHindi: 'मैंने वह कमीज़ वापस कर दी।', exampleEnglish: 'I returned that shirt.', emoji: '↩️', partOfSpeech: 'verb', subgroup: 'Problems' },
    { hindi: 'बदलना', transliteration: 'badalna', english: 'to exchange / change', exampleHindi: 'साइज़ बदलवाना पड़ा।', exampleEnglish: 'The size had to be exchanged.', emoji: '🔄', partOfSpeech: 'verb', subgroup: 'Problems' },
    { hindi: 'शिकायत', transliteration: 'shikaayat', english: 'complaint', exampleHindi: 'हमने कंपनी में शिकायत दर्ज की।', exampleEnglish: 'We filed a complaint with the company.', emoji: '📣', partOfSpeech: 'noun', subgroup: 'Problems' },

    // Opinion fuel
    { hindi: 'मेरी राय में', transliteration: 'meri raay mein', english: 'in my opinion', exampleHindi: 'मेरी राय में बाज़ार से ख़रीदना बेहतर है।', exampleEnglish: 'In my opinion, buying at the market is better.', emoji: '💬', partOfSpeech: 'phrase', subgroup: 'Opinion' },
    { hindi: 'सुविधा', transliteration: 'suvidha', english: 'convenience', exampleHindi: 'ऑनलाइन ख़रीदारी की सबसे बड़ी सुविधा घर पर मिलना है।', exampleEnglish: 'The biggest convenience of online shopping is receiving at home.', emoji: '🛋️', partOfSpeech: 'noun', subgroup: 'Opinion' },
    { hindi: 'विश्वास', transliteration: 'vishvaas', english: 'trust', exampleHindi: 'मुझे ऑफ़लाइन दुकानदारों पर ज़्यादा विश्वास है।', exampleEnglish: 'I trust offline shopkeepers more.', emoji: '🤝', partOfSpeech: 'noun', subgroup: 'Opinion' },
  ],
  vocabularyNote: {
    why: 'Level-2 shopping vocabulary focuses on comparison, opinion, and online nuance — the three axes Level-2 prompts now require. L1-11 covers transactional basics; this pack layers the opinion register on top.',
    trains: ['TopicCoverage'],
  },

  grammar: [
    {
      title: 'Superlative: सबसे + adjective',
      rule: 'Form the superlative by placing "सबसे" before the adjective: सबसे सस्ता (the cheapest), सबसे अच्छा (the best), सबसे महँगा (the most expensive). The adjective must still agree with the noun\'s gender and number.',
      examples: [
        { hindi: 'यह दुकान सबसे सस्ती है।', transliteration: 'yah dukaan sabse sasti hai.', english: 'This shop is the cheapest. (f.sg)' },
        { hindi: 'यह मॉल सबसे बड़ा है।', transliteration: 'yah mall sabse bada hai.', english: 'This mall is the biggest. (m.sg)' },
        { hindi: 'ये कपड़े सबसे अच्छे हैं।', transliteration: 'ye kapde sabse achchhe hain.', english: 'These clothes are the best. (m.pl)' },
      ],
      pitfall: 'Dropping the agreement after सबसे — "यह दुकान सबसे सस्ता" — is the most common error.',
      whyItMatters: 'Superlatives are one of the "complex structures emerging" signals the rubric credits at Intermediate-Mid. A clean सबसे used three times in an essay is a visible benchmark marker.',
    },
    {
      title: 'Opinion marker + reason clause',
      rule: 'Open an opinion paragraph with मुझे लगता है कि or मेरी राय में, then provide the opinion in a subordinate clause, followed by क्योंकि + reason.',
      examples: [
        { hindi: 'मुझे लगता है कि ऑनलाइन ख़रीदारी बेहतर है, क्योंकि समय बचता है।', transliteration: 'mujhe lagta hai ki online shopping behtar hai, kyonki samay bachta hai.', english: 'I think online shopping is better, because time is saved.' },
        { hindi: 'मेरी राय में बाज़ार ज़्यादा भरोसेमंद है, क्योंकि हम चीज़ों को छूकर देख सकते हैं।', transliteration: 'meri raay mein baazaar zyaada bharosemand hai, kyonki hum cheezon ko chhookar dekh sakte hain.', english: 'In my opinion, the market is more reliable, because we can touch and see things.' },
      ],
      pitfall: 'Stopping at the opinion without the क्योंकि reason produces a weak stance. Raters want reasoning, not just preference.',
      whyItMatters: 'An opinion paragraph with a reason clause reads as argumentation, not description. That is the single biggest shift from Novice-High to Intermediate-Mid register.',
    },
  ],
  grammarNote: {
    why: 'Level-2 shopping demands two grammar moves L1 does not: the superlative for "best/cheapest" rankings and the opinion + reason structure for argumentation.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors(['kyonki','lekin','isliye','iskeAlawa','agarTo','mujheLagta','sirfNahiBalki','halaanki']),
  connectorsNote: {
    why: 'This connector set shifts from sequence (L1 shopping) to reasoning. मुझे लगता है कि, सिर्फ़...बल्कि भी, हालाँकि — each is a discourse-level marker raters reward.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'माँ का बाज़ार, मेरा ऐप · Mom\'s Market, My App',
    hindi: 'मेरे घर में ख़रीदारी के दो तरीक़े हैं। माँ हमेशा बाज़ार जाती हैं, क्योंकि उनका मानना है कि सब्ज़ियाँ छूकर देखना ज़रूरी है। हालाँकि मैं इसकी इज़्ज़त करता हूँ, लेकिन मैं अक्सर फ़ोन पर ऑनलाइन ख़रीदारी करता हूँ। पिछले हफ़्ते मैंने एक स्पीकर ख़रीदा था, जो दो दिन में घर पहुँच गया। उसमें पच्चीस प्रतिशत की छूट भी थी। मेरी राय में, ऑनलाइन और बाज़ार, दोनों के अपने फ़ायदे हैं। बाज़ार से विश्वास और बात-चीत मिलती है, जबकि ऐप से समय और छूट मिलती है। सिर्फ़ एक विकल्प चुनने की ज़रूरत नहीं — दोनों को मिलाकर चलना ज़्यादा बेहतर है। यही हमारे परिवार का नियम बन गया है।',
    transliteration: 'mere ghar mein khareedaari ke do tareeqe hain. maa hamesha baazaar jaati hain, kyonki unka maanna hai ki sabziyaan chhookar dekhna zaroori hai. haalaanki main iski izzat karta hoon, lekin main aksar phone par online khareedaari karta hoon. pichhle hafte maine ek speaker khareeda tha, jo do din mein ghar pahunch gaya. us mein pachchees pratishat ki chhoot bhi thi. meri raay mein, online aur baazaar, dono ke apne faayde hain. baazaar se vishvaas aur baat-cheet milti hai, jabki app se samay aur chhoot milti hai. sirf ek vikalp chunne ki zaroorat nahin — dono ko milaakar chalna zyaada behtar hai. yahi hamaare parivaar ka niyam ban gaya hai.',
    english: 'In my home there are two ways of shopping. Mother always goes to the market, because she believes that vegetables must be touched and seen. Although I respect this, I often shop online on the phone. Last week I bought a speaker which arrived home in two days. It even had a 25 percent discount. In my opinion, online and the market both have their advantages. The market gives trust and conversation, while the app gives time and discounts. There is no need to choose just one option — combining both is better. That has become our family\'s rule.',
    highlights: [
      { term: 'हालाँकि ... लेकिन', note: 'Concession + contrast in one sentence — IM-register structure.' },
      { term: 'जबकि', note: 'Discourse-level "whereas" — the paragraph-level contrast marker.' },
      { term: 'मेरी राय में', note: 'Opinion opens a paragraph — raters mark this as "argumentation" not "description".' },
      { term: 'सिर्फ़ ... नहीं', note: 'Not-only move sets up the synthesis closing.' },
    ],
    comprehensionQuestions: [
      { q: 'Why does the mother prefer the market?', a: 'Because she believes vegetables must be touched and seen.' },
      { q: 'What did the narrator buy online last week?', a: 'A speaker.' },
      { q: 'How long did the delivery take?', a: 'Two days.' },
      { q: 'Name one advantage each for market and online that the narrator lists.', a: 'Market: trust and conversation. Online: time and discounts.' },
      { q: 'What is the narrator\'s final conclusion?', a: 'Combining both is better than choosing just one.' },
      { q: 'Identify one advanced connector in the passage.', a: 'हालाँकि, जबकि, or सिर्फ़... नहीं.' },
    ],
  },
  anchorNote: {
    why: 'This anchor shows how an opinion essay is structured: position → reason → counter-reason → synthesis. The student should internalize this four-move shape.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'review',
      title: 'ऑनलाइन रिव्यू — कानों के हेडफ़ोन',
      hindi: 'पाँच में से चार तारे। सुविधा बहुत अच्छी है, डिलीवरी जल्दी आई। हालाँकि साउंड उम्मीद से थोड़ा कम था, फिर भी कीमत के लिहाज़ से यह सबसे अच्छा विकल्प है।',
      transliteration: 'paanch mein se chaar taare. suvidha bahut achchhi hai, delivery jaldi aayi. haalaanki saund ummeed se thoda kam tha, phir bhi keemat ke lihaaz se yah sabse achchha vikalp hai.',
      english: 'Four out of five stars. Convenience was great, delivery came fast. Although the sound was slightly below expectations, for the price this is still the best option.',
    },
    {
      kind: 'email',
      title: 'ग्राहक सेवा को शिकायत',
      hindi: 'प्रिय महोदय, मैंने आपकी वेबसाइट से एक घड़ी मँगवाई थी, लेकिन डिब्बा खोलने पर घड़ी टूटी हुई निकली। कृपया इसे वापस लेकर रक़म लौटाइए। मेरी रसीद संलग्न है।',
      transliteration: 'priya mahoday, maine aapki website se ek ghadi mangvaayi thi, lekin dibbaa kholne par ghadi tooti hui nikli. kripaya ise vaapas lekar raqam lautaaiye. meri raseed sanlagn hai.',
      english: 'Dear Sir, I had ordered a watch from your website, but on opening the box the watch was broken. Please take it back and return the money. My receipt is attached.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश',
      hindi: 'अरे यार, Flipkart पर Big Billion sale शुरू हो गई है। अभी देख लो — पिछले साल से भी बड़ी छूट है। मैं तो एक बैग ले रहा हूँ 😎',
      transliteration: 'are yaar, Flipkart par Big Billion sale shuru ho gayi hai. abhi dekh lo — pichhle saal se bhi badi chhoot hai. main to ek bag le raha hoon.',
      english: 'Hey dude, the Flipkart Big Billion sale has started. Check now — the discount is even bigger than last year. I\'m taking a bag.',
    },
    {
      kind: 'poster',
      title: 'मॉल का पोस्टर',
      hindi: 'विशाल दिवाली सेल — हर चीज़ पर 30% से 70% तक की छूट! यूपीआई से अतिरिक्त 5% बचत। 20 अक्टूबर से शुरू।',
      transliteration: 'vishaal divaali sale — har cheez par 30% se 70% tak ki chhoot! UPI se atirikta 5% bachat. 20 oktoobar se shuru.',
      english: 'Huge Diwali Sale — 30% to 70% off on everything! Additional 5% savings with UPI. Starts October 20.',
    },
  ],
  modelTextsNote: {
    why: 'Four Level-2 registers: a product review, a complaint email, a casual SMS, a commercial poster. Together they show how the same shopping vocabulary shifts register across contexts.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    { title: 'Big Billion Day and Great Indian Sale', body: 'Flipkart\'s Big Billion Day and Amazon\'s Great Indian Sale are the year\'s two big e-commerce events, timed around Diwali. Referencing either reads as current and authentic.', emoji: '🛒' },
    { title: 'UPI is the default', body: 'QR-code UPI payments (PhonePe, GPay, Paytm) are ubiquitous — even at small vegetable stalls. Writing that a grandmother "यूपीआई से पेमेंट करती हैं" is very believable today.', emoji: '💳' },
    { title: 'Bargaining is alive in markets, not malls', body: 'मोल-भाव happens at street markets and sabzi मंडी but not in malls. Use the right term for the setting — raters notice.', emoji: '🤝' },
    { title: 'Returns culture is still developing', body: 'Major online retailers have easy returns; local shops rarely do. The contrast is a good essay angle — "how shopping has changed".', emoji: '↩️' },
  ],
  culturalNote: {
    why: 'Level-2 shopping essays feel current when they reference Big Billion Day, UPI, and modern return practices. These anchor the essay in 2020s India, not a generic timeless bazaar.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    { phrase: 'आँखें चार होना', literal: 'eyes becoming four', meaning: 'To be instantly smitten with something (usually a person, but usable for a bargain).', example: 'पहली नज़र में ही उस ऑफ़र पर मेरी आँखें चार हो गईं।', exampleEnglish: 'At first glance my eyes were completely taken by that offer.' },
    { phrase: 'जेब ढीली करना', literal: 'to loosen the pocket', meaning: 'To spend generously / part with a lot of money.', example: 'दिवाली की ख़रीदारी में हर किसी को जेब ढीली करनी पड़ती है।', exampleEnglish: 'In Diwali shopping, everyone has to loosen their pocket.' },
  ],
  muhavareNote: {
    why: 'Money-themed idioms that slot naturally into shopping essays. One well-placed idiom lifts register to IM instantly.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt: 'ऑनलाइन ख़रीदारी और बाज़ार की तुलना तीन अनुच्छेदों में कीजिए। अपनी राय दीजिए और उदाहरण दीजिए।',
      novice: 'ऑनलाइन अच्छा है। बाज़ार भी ठीक है।',
      intermediateMid:
        'आजकल हमारे देश में दो तरह की ख़रीदारी चलती है — ऑनलाइन और बाज़ार में। मेरी राय में, दोनों के अपने फ़ायदे और नुक़सान हैं। ऑनलाइन ख़रीदारी की सबसे बड़ी सुविधा यह है कि हम घर बैठे सब कुछ मँगवा सकते हैं, और डिलीवरी भी जल्दी आ जाती है।\n\nदूसरी तरफ़, बाज़ार की अपनी बात है। पिछले महीने मैं माँ के साथ सब्ज़ी मंडी गया था। वहाँ हमने फलों को छूकर देखा और दुकानदार से बातें कीं। उस अनुभव में जो गर्मी थी, वह किसी ऐप पर नहीं मिल सकती।\n\nमुझे लगता है कि दोनों तरीक़े ज़रूरी हैं, क्योंकि कुछ चीज़ें ऑनलाइन बेहतर हैं, जबकि कुछ सिर्फ़ बाज़ार में ही मिलती हैं। अगले साल दिवाली पर अगर Big Billion Day पर बड़ी छूट होगी, तो मैं गैजेट ऑनलाइन ख़रीदूँगा, लेकिन कपड़े तो बाज़ार से ही लूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मेरी राय में', note: 'Opinion opens the essay — not description, argumentation.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'सुविधा / डिलीवरी', note: 'Level-2 specific vocabulary, not L1 "मैंने एक चीज़ ख़रीदी".' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'दूसरी तरफ़', note: 'Paragraph-level contrast marker — IM discourse move.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'गया था / देखा / कीं', note: 'Past-perfective sustained across three verbs in one paragraph.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'क्योंकि / जबकि', note: 'Reason + contrast in a single sentence — discourse density.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'Big Billion Day', note: 'India-specific sale event — current cultural marker.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'ख़रीदूँगा / लूँगा', note: 'Future closer — third time frame locked.' },
      ],
      wordCount: 146,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['मेरी राय में', 'दूसरी तरफ़', 'क्योंकि', 'जबकि', 'अगर... तो', 'लेकिन'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Opens with an opinion statement and supports it with reasons — argumentation, not description.',
          'Six distinct connectors including "दूसरी तरफ़" and "जबकि" — advanced discourse markers raters flag.',
          'Three time frames cleanly separated across three paragraphs.',
          'Current cultural specific (Big Billion Day + UPI pattern) grounds the essay in 2020s India.',
          'Balanced synthesis closing — both sides acknowledged, personal choice stated.',
        ],
        gotchas: [
          'Dropping the opinion opener would drop the essay to description mode and cap at Benchmark 4.',
          'Mixing "मैं खरीदा" (without ने) in the past-perfective sentence would drop Language Control.',
        ],
      },
    },
    {
      prompt: 'त्योहारी ख़रीदारी पर अपने अनुभव का वर्णन तीन अनुच्छेदों में कीजिए। कोई समस्या भी शामिल कीजिए।',
      novice: 'मैंने कपड़े ख़रीदे। अच्छे थे। मुझे मज़ा आया।',
      intermediateMid:
        'पिछले साल दिवाली से पहले हमारे परिवार ने बहुत ख़रीदारी की। पापा ने ऑनलाइन एक नया मिक्सर मँगवाया, माँ ने बाज़ार से साड़ियाँ ख़रीदीं, और मैंने अपनी बहन के लिए एक किताब ली। हर जगह छूट थी।\n\nलेकिन एक समस्या भी हुई। जब मिक्सर का डिब्बा खुला, तो उसमें एक हिस्सा टूटा हुआ था। हमने तुरंत ऐप से शिकायत दर्ज की और तीन दिन में नया मिक्सर आ गया। यूपीआई से पुराने का पैसा भी वापस मिल गया।\n\nमुझे लगता है कि आजकल ख़रीदारी बहुत आसान हो गई है, हालाँकि कभी-कभी सामान ख़राब भी निकलता है। अगले दिवाली पर मैं दादी के लिए एक फ़ोन ऑनलाइन मँगवाऊँगा, क्योंकि अब मुझे रिव्यू देखकर चुनना आता है। सिर्फ़ जल्दी नहीं, बल्कि समझदारी से भी ख़रीदना ज़रूरी है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'की / मँगवाया / ख़रीदीं / ली', note: 'Four perfective pasts with correct ने-construction and gender agreement.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'छूट / ऑनलाइन', note: 'Festival-sale vocabulary specific to L2.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'समस्या ... शिकायत ... नया ... वापस', note: 'Problem-resolution narrative arc — an IM hallmark.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'यूपीआई', note: 'Modern payment context — current, authentic.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'हालाँकि / क्योंकि', note: 'Concession + reason in adjacent sentences.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... बल्कि ... भी', note: 'Reflective closing — the IM register marker.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'मँगवाऊँगा', note: 'Future closer — third time frame.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'क्योंकि', 'हालाँकि', 'सिर्फ़... बल्कि भी', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Problem-resolution arc in paragraph 2 is a specifically named IM narrative structure.',
          'Clean past-perfective ने construction across four verbs with correct gender agreement (साड़ियाँ ख़रीदीं = f.pl).',
          'Modern cultural markers (UPI, online return flow) ground the essay in current India.',
          'Reflective closing with "सिर्फ़ ... बल्कि ... भी" — the IM register signature move.',
          'Future closer anchors the third time frame even inside a past-dominant essay.',
        ],
        gotchas: [
          'Writing "मिक्सर टूटी हुई था" (wrong gender) would drop Language Control immediately.',
          'A one-paragraph narrative without a reflective closing would cap at Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why: 'Two essays in the two most common FCPS Level-2 shopping shapes: opinion comparison and festival-shopping narrative (with a problem). Study both until the sentence moves feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    { hindi: 'ऑनलाइन और बाज़ार में ख़रीदारी की तुलना तीन अनुच्छेदों में कीजिए। अपनी राय स्पष्ट कीजिए।', english: 'Compare online and market shopping in three paragraphs. State your opinion clearly.', hint: { connectors: ['मुझे लगता है कि', 'जबकि', 'हालाँकि'], vocab: ['ऑनलाइन', 'बाज़ार', 'छूट', 'डिलीवरी', 'विश्वास'], tenses: ['present', 'past'] } },
    { hindi: 'त्योहारों पर अपनी ख़रीदारी का वर्णन कीजिए। एक समस्या भी बताइए जो आपको आई।', english: 'Describe your festival shopping. Also mention a problem you faced.', hint: { connectors: ['पहले', 'फिर', 'लेकिन', 'अंत में'], vocab: ['छूट', 'ख़राब', 'वापस करना', 'शिकायत'], tenses: ['past', 'future'] } },
    { hindi: 'अगर आपके पास दस हज़ार रुपये हों तो आप क्या ख़रीदेंगे और क्यों? तीन अनुच्छेदों में लिखिए।', english: 'If you had ten thousand rupees, what would you buy and why? Write in three paragraphs.', hint: { connectors: ['अगर... तो', 'क्योंकि', 'इसके अलावा'], vocab: ['सबसे अच्छा', 'महँगा', 'ज़रूरी'], tenses: ['future'] } },
  ],
  promptsNote: {
    why: 'Three shapes — comparison, festival narrative with problem, hypothetical spending — together cover every FCPS Level-2 shopping prompt angle.',
    trains: ['TextType'],
  },

  rubricNote: {
    why: 'A Level-2 shopping essay must contain at least one opinion marker, one comparison, and one cultural specific. If your self-check misses any of these, revise before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
