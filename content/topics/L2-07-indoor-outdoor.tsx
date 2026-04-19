import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../curricula/fcps-stamp-hindi/connectors';

export const pack: TopicPack = {
  id: 'L2-07-indoor-outdoor',
  level: 2,
  themeGroup: 'HumanIngenuity',
  topicTheme: 'leisure',
  order: 19,
  heroMotif: 'cricket',
  titleHindi: 'अंदर और बाहर की गतिविधियाँ',
  titleEnglish: 'Indoor & Outdoor Activities',
  hook: 'Binary comparisons - "when it rains, otherwise..." - train conditional frames the rubric rewards.',
  heroPrompt: composeHeroPrompt(
    'A split illustration: one half indoor with a carrom board and a steaming cup of chai; the other half outdoor with a kite in the sky and children playing cricket, warm marigold light across both halves',
  ),

  rationale: {
    fcpsSubTopics: [
      'Indoor and Outdoor Activities (FCPS Level 2 - Leisure Time)',
      'Free time and weekend choices (FCPS Level 2)',
      'Weather-linked activity selection (bridges to L1-09 seasons)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Compare indoor and outdoor activities in one paragraph using लेकिन, जबकि, or से ज़्यादा',
      'Build an अगर ... तो conditional tying weather to an activity choice',
      'Name at least 6 indoor pastimes and 6 outdoor activities with correct gender',
      'Shift between habitual present (रोज़, अक्सर), past weekend narrative, and a future plan in 3 paragraphs',
      'Include one culturally specific Indian pastime - carrom, kite-flying on Makar Sankranti, kabaddi - to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Leisure-time prompts require the student to choose between options and justify the choice. Without this pack, the student writes "I play cricket" and stops - no comparison, no conditional, Benchmark 4 ceiling (2 credits).',
  },

  objectives: [
    { text: 'Produce one comparison sentence pair: "X ज़्यादा Y से ___ है" about two activities.', trains: ['LanguageControl', 'TextType'] },
    { text: 'Write two well-formed अगर ... तो ... sentences tying weather or time to an activity.', trains: ['LanguageControl', 'TextType'] },
    { text: 'Name at least 12 activity verbs (6 indoor + 6 outdoor) in a single essay without repetition.', trains: ['TopicCoverage'] },
    { text: 'Shift tenses across past, present, and future in one response.', trains: ['TextType'] },
    { text: 'Use one culture-specific Indian pastime (carrom, antakshari, kite-flying) in every essay.', trains: ['TopicCoverage', 'TextType'] },
  ],

  vocabulary: [
    // Indoor
    { hindi: 'कैरम', transliteration: 'carrom', english: 'carrom', exampleHindi: 'बरसात के दिनों में हम कैरम खेलते हैं।', exampleEnglish: 'On rainy days we play carrom.', emoji: '⚫', partOfSpeech: 'noun', subgroup: 'Indoor' },
    { hindi: 'शतरंज', transliteration: 'shatranj', english: 'chess', exampleHindi: 'शतरंज से दिमाग़ तेज़ होता है।', exampleEnglish: 'Chess sharpens the mind.', emoji: '♟️', partOfSpeech: 'noun', subgroup: 'Indoor' },
    { hindi: 'पहेली', transliteration: 'paheli', english: 'puzzle / riddle', exampleHindi: 'दादी रोज़ एक पहेली सुनाती हैं।', exampleEnglish: 'Grandma tells a riddle every day.', emoji: '🧩', partOfSpeech: 'noun', subgroup: 'Indoor' },
    { hindi: 'वीडियो गेम', transliteration: 'video game', english: 'video games', exampleHindi: 'मेरा भाई शाम को वीडियो गेम खेलता है।', exampleEnglish: 'My brother plays video games in the evening.', emoji: '🎮', partOfSpeech: 'noun', subgroup: 'Indoor' },
    { hindi: 'टीवी देखना', transliteration: 'TV dekhna', english: 'to watch TV', exampleHindi: 'रात को हम परिवार के साथ टीवी देखते हैं।', exampleEnglish: 'At night we watch TV with the family.', emoji: '📺', partOfSpeech: 'verb', subgroup: 'Indoor' },
    { hindi: 'किताब पढ़ना', transliteration: 'kitaab padhna', english: 'to read a book', exampleHindi: 'मुझे किताब पढ़ना बहुत पसंद है।', exampleEnglish: 'I really like reading a book.', emoji: '📖', partOfSpeech: 'verb', subgroup: 'Indoor' },
    { hindi: 'पेंटिंग', transliteration: 'painting', english: 'painting', exampleHindi: 'छुट्टियों में मैं पेंटिंग करती हूँ।', exampleEnglish: 'On holidays I paint.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Indoor' },
    { hindi: 'संगीत सुनना', transliteration: 'sangeet sunna', english: 'to listen to music', exampleHindi: 'तनाव में मुझे संगीत सुनना अच्छा लगता है।', exampleEnglish: 'When stressed I enjoy listening to music.', emoji: '🎧', partOfSpeech: 'verb', subgroup: 'Indoor' },
    { hindi: 'खाना बनाना', transliteration: 'khaana banana', english: 'to cook', exampleHindi: 'रविवार को मैं माँ के साथ खाना बनाता हूँ।', exampleEnglish: 'On Sunday I cook with Mom.', emoji: '🍳', partOfSpeech: 'verb', subgroup: 'Indoor' },

    // Outdoor
    { hindi: 'क्रिकेट', transliteration: 'cricket', english: 'cricket', exampleHindi: 'हम पार्क में क्रिकेट खेलते हैं।', exampleEnglish: 'We play cricket in the park.', emoji: '🏏', partOfSpeech: 'noun', subgroup: 'Outdoor' },
    { hindi: 'बैडमिंटन', transliteration: 'badminton', english: 'badminton', exampleHindi: 'शाम को बैडमिंटन मज़ेदार होता है।', exampleEnglish: 'Badminton is fun in the evening.', emoji: '🏸', partOfSpeech: 'noun', subgroup: 'Outdoor' },
    { hindi: 'साइकिल चलाना', transliteration: 'cycle chalaana', english: 'to cycle', exampleHindi: 'रविवार को मैं साइकिल चलाता हूँ।', exampleEnglish: 'On Sunday I cycle.', emoji: '🚴', partOfSpeech: 'verb', subgroup: 'Outdoor' },
    { hindi: 'पतंग उड़ाना', transliteration: 'patang udaana', english: 'to fly a kite', exampleHindi: 'मकर संक्रांति पर हम पतंग उड़ाते हैं।', exampleEnglish: 'On Makar Sankranti we fly kites.', emoji: '🪁', partOfSpeech: 'verb', subgroup: 'Outdoor' },
    { hindi: 'पार्क में घूमना', transliteration: 'park mein ghoomna', english: 'to roam in the park', exampleHindi: 'शाम को हम पार्क में घूमते हैं।', exampleEnglish: 'In the evening we roam in the park.', emoji: '🌳', partOfSpeech: 'phrase', subgroup: 'Outdoor' },
    { hindi: 'तैरना', transliteration: 'tairna', english: 'to swim', exampleHindi: 'गर्मियों में तैरना बहुत अच्छा लगता है।', exampleEnglish: 'Swimming feels great in summer.', emoji: '🏊', partOfSpeech: 'verb', subgroup: 'Outdoor' },
    { hindi: 'कबड्डी', transliteration: 'kabaddi', english: 'kabaddi', exampleHindi: 'गाँव में कबड्डी बहुत लोकप्रिय है।', exampleEnglish: 'Kabaddi is very popular in villages.', emoji: '🤼', partOfSpeech: 'noun', subgroup: 'Outdoor' },
    { hindi: 'पिकनिक', transliteration: 'picnic', english: 'picnic', exampleHindi: 'शनिवार को हम पिकनिक गए।', exampleEnglish: 'On Saturday we went on a picnic.', emoji: '🧺', partOfSpeech: 'noun', subgroup: 'Outdoor' },

    // Weather-activity tie-ins
    { hindi: 'बारिश में', transliteration: 'baarish mein', english: 'in the rain', exampleHindi: 'बारिश में हम घर में शतरंज खेलते हैं।', exampleEnglish: 'In the rain we play chess indoors.', emoji: '🌧️', partOfSpeech: 'phrase', subgroup: 'Weather ties' },
    { hindi: 'धूप में', transliteration: 'dhoop mein', english: 'in the sunshine', exampleHindi: 'धूप में बच्चे क्रिकेट खेलते हैं।', exampleEnglish: 'In the sunshine children play cricket.', emoji: '☀️', partOfSpeech: 'phrase', subgroup: 'Weather ties' },
    { hindi: 'सर्दी में', transliteration: 'sardi mein', english: 'in winter', exampleHindi: 'सर्दी में हम गरम चाय पीते हैं।', exampleEnglish: 'In winter we drink hot tea.', emoji: '❄️', partOfSpeech: 'phrase', subgroup: 'Weather ties' },

    // Social contexts
    { hindi: 'अकेले', transliteration: 'akele', english: 'alone', exampleHindi: 'मुझे अकेले पढ़ना पसंद है।', exampleEnglish: 'I like to read alone.', emoji: '🧘', partOfSpeech: 'adverb', subgroup: 'Social' },
    { hindi: 'दोस्तों के साथ', transliteration: 'doston ke saath', english: 'with friends', exampleHindi: 'दोस्तों के साथ खेलने में मज़ा आता है।', exampleEnglish: 'Playing with friends is fun.', emoji: '👫', partOfSpeech: 'phrase', subgroup: 'Social' },
    { hindi: 'परिवार के साथ', transliteration: 'parivaar ke saath', english: 'with family', exampleHindi: 'परिवार के साथ हम कैरम खेलते हैं।', exampleEnglish: 'We play carrom with family.', emoji: '👪', partOfSpeech: 'phrase', subgroup: 'Social' },
    { hindi: 'खाली समय', transliteration: 'khaali samay', english: 'free time', exampleHindi: 'मेरे खाली समय में मैं चित्र बनाती हूँ।', exampleEnglish: 'In my free time I draw.', emoji: '⏰', partOfSpeech: 'phrase', subgroup: 'Social' },
  ],
  vocabularyNote: {
    why: 'A balanced set - six indoor, six outdoor, three weather-ties, three social contexts. Essays about choice need both halves of the pair plus the condition that selects between them.',
    trains: ['TopicCoverage', 'LanguageControl'],
  },

  grammar: [
    {
      title: 'Conditional अगर ... तो + verb tense pairing',
      rule: 'Tie an activity to a condition using अगर + clause + तो + clause. If the condition is about a future possibility, both verbs are future. If it is habitual, both are present.',
      examples: [
        { hindi: 'अगर बारिश होगी, तो हम घर में कैरम खेलेंगे।', transliteration: 'agar baarish hogi, to hum ghar mein carrom khelenge.', english: 'If it rains, we will play carrom at home.' },
        { hindi: 'अगर धूप होती है, तो बच्चे बाहर खेलते हैं।', transliteration: 'agar dhoop hoti hai, to bachche baahar khelte hain.', english: 'If it is sunny, children play outside.' },
      ],
      pitfall: 'Students often mix tenses (future in one clause, present in the other). Raters flag this as Language Control weakness.',
      whyItMatters: 'A well-formed अगर ... तो sentence is one of the fastest ways to demonstrate the "some control of major time frames" that the rubric names as a Benchmark 5 requirement.',
    },
    {
      title: 'Comparative से ज़्यादा / से कम',
      rule: 'Compare two activities using "X से ज़्यादा Y पसंद है" (I like Y more than X) or "X से कम Y करता हूँ" (I do Y less than X).',
      examples: [
        { hindi: 'मुझे क्रिकेट से ज़्यादा बैडमिंटन पसंद है।', transliteration: 'mujhe cricket se zyaada badminton pasand hai.', english: 'I like badminton more than cricket.' },
        { hindi: 'मैं टीवी से कम किताबें पढ़ता हूँ।', transliteration: 'main TV se kam kitaabein padhta hoon.', english: 'I read books less than I watch TV.' },
      ],
      pitfall: 'Dropping the से word - "ज़्यादा बैडमिंटन पसंद है" - makes the comparison disappear.',
      whyItMatters: 'Comparative structures are one of the "grouped ideas" signals raters use to push an essay from Intermediate-Low to Intermediate-Mid.',
    },
  ],
  grammarNote: {
    why: 'The two grammar moves in this pack - conditional अगर ... तो and comparatives - are each worth one full rubric tick. Practice both until they feel automatic.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors(['pahle','phir','kyonki','lekin','isliye','iskeAlawa','jabTab','agarTo','mujheLagta']),
  connectorsNote: {
    why: 'अगर ... तो and जब ... तब are the headline moves for this pack - they give the student two different ways to tie weather or time to an activity choice.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरे सप्ताहांत की दो दुनिया · My Weekend\'s Two Worlds',
    hindi: 'मेरे सप्ताहांत की दो दुनिया होती हैं। अगर मौसम अच्छा रहता है, तो मैं सुबह दोस्तों के साथ पार्क में क्रिकेट खेलने चला जाता हूँ। धूप में हम घंटों खेलते हैं, फिर चाट खाकर घर लौटते हैं। लेकिन अगर बारिश होती है, तो सब कुछ बदल जाता है। हम घर के अंदर बैठकर कैरम खेलते हैं, या दादाजी के साथ शतरंज की बिसात बिछाते हैं। मुझे लगता है कि दोनों तरह के दिन अच्छे हैं, क्योंकि अंदर और बाहर - दोनों जगहों की अपनी ख़ुशियाँ हैं। पिछले हफ़्ते तो दोनों हुआ: शनिवार को धूप, रविवार को झमाझम बारिश। अंत में मैंने तय किया - मौसम कैसा भी हो, अच्छा वक़्त बनाना मेरे हाथ में है।',
    transliteration: 'mere saptaahant ki do duniya hoti hain. agar mausam achchha rahta hai, to main subah doston ke saath park mein cricket khelne chala jaata hoon. dhoop mein hum ghanton khelte hain, phir chaat khaakar ghar lautte hain. lekin agar baarish hoti hai, to sab kuchh badal jaata hai. hum ghar ke andar baithkar carrom khelte hain, ya daadaaji ke saath shatranj ki bisaat bichhaate hain. mujhe lagta hai ki dono tarah ke din achchhe hain, kyonki andar aur baahar - dono jagahon ki apni khushiyaan hain. pichhle hafte to dono hua: shanivaar ko dhoop, ravivaar ko jhamaajham baarish. ant mein maine tay kiya - mausam kaisa bhi ho, achchha vaqt banaana mere haath mein hai.',
    english: 'My weekends have two worlds. If the weather is good, I go to the park in the morning to play cricket with friends. We play for hours in the sun, then eat chaat and return home. But if it rains, everything changes. We sit indoors and play carrom, or set up the chess board with Grandpa. I think both kinds of days are good, because both indoors and outdoors have their own joys. Last week, both happened: sunshine on Saturday, pouring rain on Sunday. In the end, I decided - whatever the weather, making a good time is in my hands.',
    highlights: [
      { term: 'अगर ... तो × 2', note: 'Two conditionals in one passage - the rubric\'s textbook Benchmark-5 move.' },
      { term: 'पहले ... फिर ... अंत में', note: 'Three sequence connectors binding the narrative.' },
      { term: 'दोनों तरह के दिन', note: 'Comparison structure names both halves of the indoor/outdoor pair.' },
      { term: 'मौसम कैसा भी हो', note: 'Subjunctive "whatever the weather may be" - an IM-register reflective move.' },
    ],
    comprehensionQuestions: [
      { q: 'What does the narrator do when the weather is good?', a: 'Goes to the park with friends to play cricket.' },
      { q: 'Name two indoor activities they mention.', a: 'Carrom and chess.' },
      { q: 'Who plays chess with the narrator?', a: 'Grandpa (दादाजी).' },
      { q: 'What did last Saturday and Sunday contrast?', a: 'Saturday was sunny; Sunday was pouring rain.' },
      { q: 'Identify one conditional sentence and explain its structure.', a: 'अगर मौसम अच्छा रहता है, तो मैं ... चला जाता हूँ। - Condition in first clause, consequence (habitual present) in second.' },
      { q: 'What lesson does the narrator end on?', a: 'Making a good time is in one\'s own hands, regardless of weather.' },
    ],
  },
  anchorNote: {
    why: 'This anchor places both halves of the activity pair (indoor/outdoor) inside a single conditional structure. The student sees how one compact paragraph can cover both worlds plus a reflective closing.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'diary',
      title: 'डायरी - रविवार की शाम',
      hindi: 'आज धूप इतनी तेज़ थी कि हम दोपहर तक ही बाहर रह सके। शाम को अचानक बादल छा गए। इसलिए हमने पार्क से लौटकर कैरम खेला। अंत में माँ ने गरम पकौड़े बनाए।',
      transliteration: 'aaj dhoop itni tez thi ki hum dopahar tak hi baahar rah sake. shaam ko achaanak baadal chha gaye. isliye hamne park se lautkar carrom khela. ant mein maa ne garam pakaude banaaye.',
      english: 'Today the sun was so intense that we could only stay out till noon. In the evening, clouds suddenly gathered. So after returning from the park, we played carrom. Finally, Mother made hot pakoras.',
    },
    {
      kind: 'announcement',
      title: 'स्कूल की सूचना - खेल दिवस',
      hindi: 'सभी छात्रों को सूचित किया जाता है कि अगर शुक्रवार को बारिश नहीं हुई, तो खेल दिवस मैदान में होगा। अगर बारिश हुई, तो कार्यक्रम इनडोर स्टेडियम में होगा।',
      transliteration: 'sabhi chhaatron ko soochit kiya jaata hai ki agar shukravaar ko baarish nahin hui, to khel divas maidaan mein hoga. agar baarish hui, to kaaryakram indoor stadium mein hoga.',
      english: 'All students are informed that if it does not rain on Friday, Sports Day will be in the ground. If it rains, the program will be in the indoor stadium.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश',
      hindi: 'यार, आज बाहर चलेंगे या अंदर कैरम? मौसम देख लेते हैं। मुझे दोनों में मज़ा आता है, लेकिन अगर धूप निकली तो पार्क ज़्यादा अच्छा है।',
      transliteration: 'yaar, aaj baahar chalenge ya andar carrom? mausam dekh lete hain. mujhe dono mein mazaa aata hai, lekin agar dhoop nikli to park zyaada achchha hai.',
      english: 'Dude, outside today or carrom inside? Let\'s see the weather. I enjoy both, but if it\'s sunny the park is better.',
    },
    {
      kind: 'review',
      title: 'स्थानीय पार्क की ऑनलाइन समीक्षा',
      hindi: 'यह पार्क धूप वाले दिनों के लिए बहुत अच्छा है। खुला मैदान, साफ़ रास्ते। लेकिन छाया कम है, इसलिए गरमी में दोपहर को जाना मुश्किल है। चार तारे। ⭐⭐⭐⭐',
      transliteration: 'yah park dhoop vaale dinon ke liye bahut achchha hai. khulaa maidaan, saaf raaste. lekin chhaaya kam hai, isliye garmi mein dopahar ko jaana mushkil hai. chaar taare.',
      english: 'This park is very good on sunny days. Open grounds, clean paths. But shade is limited, so visiting in the afternoon heat is difficult. Four stars.',
    },
  ],
  modelTextsNote: {
    why: 'Four registers - diary, official announcement, casual SMS, online review - all around the same indoor/outdoor choice. Shows the student how the same subject sounds in different text-types.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    { title: 'Carrom is a household classic', body: 'Carrom boards are a fixture in middle-class Indian homes - played across generations on rainy afternoons and weekend evenings.', emoji: '⚫' },
    { title: 'Kite-flying has a calendar', body: 'January\'s Makar Sankranti is the day for kites in North India and Gujarat. Writing about पतंग उड़ाना without Sankranti reads less authentic.', emoji: '🪁' },
    { title: 'Cricket ≠ only outdoor', body: 'Gali cricket (street cricket) bridges indoor and outdoor - neighborhoods play in courtyards with tennis balls. Acknowledging this scores Topic Coverage.', emoji: '🏏' },
    { title: 'Chai is an indoor ritual', body: 'Rain outside → chai and pakoras inside. The pairing is cultural shorthand.', emoji: '🍵' },
  ],
  culturalNote: {
    why: 'Indian readers expect cultural specifics in leisure essays. Carrom, Makar Sankranti, gali cricket, and chai-pakora are the four reliable touchstones.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    { phrase: 'घर की मुर्ग़ी दाल बराबर', literal: 'the home hen is equal to daal', meaning: 'What is close at hand is taken for granted.', example: 'पार्क हमारे पास है, पर हम कभी नहीं जाते - घर की मुर्ग़ी दाल बराबर।', exampleEnglish: 'The park is right here, but we never go - we take what\'s close for granted.' },
    { phrase: 'चार दिन की चाँदनी', literal: 'four days of moonlight', meaning: 'Short-lived pleasure.', example: 'सर्दी की धूप तो चार दिन की चाँदनी होती है - जब मिले, पूरा इस्तेमाल करो।', exampleEnglish: 'Winter sunshine is a short-lived pleasure - use it fully when you get it.' },
  ],
  muhavareNote: {
    why: 'Both idioms map to the indoor/outdoor choice naturally. One well-placed idiom in an essay signals Intermediate-Mid register.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Weekend activities',
      prompt: 'अपने सप्ताहांत की गतिविधियों के बारे में तीन अनुच्छेदों में लिखिए। बताइए अगर मौसम अच्छा हो तो आप क्या करते हैं, और अगर बारिश हो तो क्या।',
      novice: 'मैं क्रिकेट खेलता हूँ। बारिश में टीवी देखता हूँ।',
      intermediateMid:
        'मेरे सप्ताहांत का कार्यक्रम मौसम पर निर्भर करता है। अगर सुबह धूप निकलती है, तो मैं अपने दोस्तों के साथ पास के पार्क में क्रिकेट खेलने जाता हूँ। हम दो घंटे खेलते हैं, फिर चाट खाकर घर लौटते हैं।\n\nलेकिन अगर बारिश हो रही होती है, तो सब कुछ बदल जाता है। पिछले रविवार को झमाझम बारिश हुई थी, इसलिए हमने घर में कैरम खेला। दादाजी ने भी हिस्सा लिया और एक ही बार में पाँच सिक्के डाले। सब ख़ूब हँसे।\n\nमुझे लगता है कि दोनों दिन अच्छे होते हैं, क्योंकि अंदर और बाहर - हर जगह की अपनी ख़ुशी है। अगले शनिवार अगर मौसम साफ़ रहा, तो मैं पतंग उड़ाना सीखूँगा। मेरा भाई कहता है, वह मुझे ज़रूर सिखाएगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'अगर ... तो', note: 'Conditional opens the essay - establishes choice logic from sentence one.' },
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'निकलती है / जाता हूँ / लौटते हैं', note: 'Habitual present used consistently for the "sunshine" routine.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'हुई थी / खेला / डाले', note: 'Paragraph shifts entirely to past tense for a specific memory - textbook time-frame switch.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादाजी ... कैरम', note: 'Intergenerational carrom - a specific cultural image raters recognize.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'क्योंकि / अगर ... तो', note: 'Reason + conditional. Second conditional seals the third time frame (future).' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'सीखूँगा / सिखाएगा', note: 'Two future forms close the essay - three time frames locked in.' },
      ],
      wordCount: 126,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['अगर... तो', 'फिर', 'लेकिन', 'इसलिए', 'क्योंकि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Two अगर ... तो conditionals in one essay - the rubric\'s textbook Benchmark-5 structure marker.',
          'Clean three-paragraph time-frame shift: habitual present → past anecdote → future plan.',
          'Five distinct connectors used - well above the Intermediate-Mid threshold.',
          'Cultural specific (दादाजी + कैरम intergenerational image) lifts Topic Coverage above generic "I play games" responses.',
          'Reflective closing (दोनों दिन अच्छे होते हैं, क्योंकि...) generalizes beyond the events - an IM hallmark.',
        ],
        gotchas: [
          'Mixing tenses in the अगर ... तो clauses (e.g., past condition + future consequence without reason) would drop Language Control.',
          'Omitting the past-tense middle paragraph would strip the second time frame and cap the essay at Benchmark 4.',
        ],
      },
    },
    {
      shortLabel: 'Indoor vs outdoor',
      prompt: 'इनडोर और आउटडोर गतिविधियों में आपकी क्या पसंद है? तीन अनुच्छेदों में तुलना कीजिए।',
      novice: 'मुझे बाहर अच्छा लगता है। अंदर भी ठीक है।',
      intermediateMid:
        'मुझे इनडोर और आउटडोर दोनों गतिविधियाँ पसंद हैं, लेकिन अलग-अलग कारणों से। जब मौसम सुहावना होता है, तब मैं बाहर दौड़ने जाता हूँ, क्योंकि ताज़ी हवा से मन हल्का हो जाता है। बैडमिंटन और साइकिल चलाना भी मेरी पसंद हैं।\n\nदूसरी तरफ़, जब ठंड या बारिश होती है, तब अंदर की दुनिया ज़्यादा अच्छी लगती है। मैं शतरंज खेलता हूँ या कोई अच्छी किताब पढ़ता हूँ। पिछली सर्दी में मैंने दस किताबें पढ़ीं - यह मेरा सबसे अच्छा अनुभव था।\n\nमुझे लगता है कि सिर्फ़ बाहर ही नहीं, बल्कि अंदर भी ज़िंदगी सीखने का मौक़ा देती है। इसलिए अगले साल मैं एक नया इनडोर शौक़ - तबला - सीखूँगा। इस तरह मौसम चाहे कैसा भी हो, मेरे पास कुछ न कुछ करने को होगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'जब ... तब / क्योंकि', note: 'Temporal + causal connectors establish the outdoor logic.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'बैडमिंटन / साइकिल चलाना / दौड़ना', note: 'Three distinct outdoor items - topic coverage.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'दूसरी तरफ़', note: '"On the other hand" - a paragraph-level contrast marker that raters recognize as IM register.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'खेलता हूँ / पढ़ीं / था', note: 'Paragraph moves from present habit to past achievement within three sentences.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... बल्कि ... भी', note: 'Not-only-but-also construction - a hallmark IM reflective move.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'सीखूँगा / होगा', note: 'Future closer seals the third time frame.' },
      ],
      wordCount: 134,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'जब... तब', 'क्योंकि', 'दूसरी तरफ़', 'सिर्फ़... बल्कि भी', 'इसलिए'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Paragraph-level contrast with "दूसरी तरफ़" - a sophisticated discourse marker raters specifically credit.',
          'Six distinct connectors including the "सिर्फ़ ... बल्कि ... भी" IM hallmark.',
          'Three time frames spread across three paragraphs with clean transitions.',
          'Concrete past achievement (दस किताबें पढ़ीं) anchors the essay in specific detail, not generalities.',
          'Forward-looking closing with a specific future plan (तबला सीखूँगा) - reflective IM move.',
        ],
        gotchas: [
          'Dropping "सिर्फ़ ... बल्कि ... भी" would lose one of the essay\'s Text-Type 5 markers.',
          'Writing "मैंने पढ़ा" instead of "मैंने पढ़ीं" (dropping feminine-plural agreement with किताबें) drops Language Control.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why: 'Two essays that model the two most likely FCPS Level-2 leisure prompts: (a) weather-driven choice and (b) outright preference comparison. Study both sentence shapes until they feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi: 'अपनी पसंदीदा इनडोर और आउटडोर गतिविधियों की तुलना तीन अनुच्छेदों में कीजिए। कारण और उदाहरण दीजिए।',
      english: 'Compare your favorite indoor and outdoor activities in three paragraphs. Give reasons and examples.',
      hint: { connectors: ['लेकिन', 'जबकि', 'इसके अलावा'], vocab: ['क्रिकेट', 'कैरम', 'पसंद', 'मज़ा'], tenses: ['present', 'past'] },
    },
    {
      hindi: 'यदि अगले रविवार बारिश होगी तो आप क्या करेंगे, और यदि धूप होगी तो क्या? तीन अनुच्छेदों में लिखिए।',
      english: 'If it rains next Sunday what will you do, and if it is sunny what then? Write in three paragraphs.',
      hint: { connectors: ['अगर... तो', 'पहले', 'फिर'], vocab: ['बारिश', 'धूप', 'पार्क', 'घर'], tenses: ['future', 'present'] },
    },
    {
      hindi: 'अपने पिछले सप्ताहांत का वर्णन तीन अनुच्छेदों में कीजिए। बताइए आपने अंदर और बाहर क्या-क्या किया।',
      english: 'Describe your last weekend in three paragraphs. Say what you did indoors and outdoors.',
      hint: { connectors: ['पहले', 'फिर', 'अंत में'], vocab: ['पिछले', 'दोस्त', 'मज़ा', 'परिवार'], tenses: ['past'] },
    },
  ],
  promptsNote: {
    why: 'Three shapes - comparison, conditional, and past narrative - that together cover every FCPS leisure prompt angle. The student who can handle all three has indoor/outdoor essays locked.',
    trains: ['TextType'],
  },

  rubricNote: {
    why: 'Grade every weekend essay with the self-check. If you did not use at least one अगर ... तो and one comparison, you are at Intermediate-Low, not Mid - go back and add them.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
