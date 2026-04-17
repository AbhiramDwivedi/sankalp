// Capstone C06 — "A trip to India to visit my grandparents"
// Push tier. Mock Exam 2 (40 min, no notes).
// Three time frames + cultural compare/contrast.
// Integrates L2-10 travel, L2-11 countries, L1-03 family, L1-09 weather, L1-12 food.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C06-india-trip',
  order: 6,
  tier: 'push',
  isMockExam: true,
  mockExamMinutes: 40,
  themeGroup: 'Identity',
  heroMotif: 'suitcase',
  titleHindi: 'दादा-दादी से मिलने की यात्रा',
  titleEnglish: 'A trip to India to visit my grandparents',
  hook: 'A trip home that isn\'t home. Three tenses, two continents, one essay.',
  promptHindi:
    'भारत में अपने दादा-दादी या नाना-नानी से मिलने की किसी यात्रा के बारे में लिखो। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about a trip to India to visit your grandparents. Use three cohesive paragraphs.',
  whyThisCapstone:
    'The India-trip essay is the single highest-yield prompt for a student raised abroad. It naturally spans past (travel, arrival, meals), present (comparison with life here), and future (next time we visit). It also rewards specific cultural detail — grandparents\' village, the mango tree, the smell of the kitchen — which a generic student cannot fake. This capstone is designated Mock Exam 2 because its balanced structure is the closest stand-in for what FCPS will actually prompt.',
  draws: [
    { packId: 'L2-10-travel-plans', contributes: 'structure', note: 'The trip backbone: flight, arrival, itinerary — and the present-habitual comparison.' },
    { packId: 'L2-11-countries-directions', contributes: 'vocabulary', note: 'Country + direction vocabulary: अमेरिका से, भारत में, उत्तर में, पश्चिम में.' },
    { packId: 'L1-03-family', contributes: 'structure', note: 'Grandparent kinship terms (दादा, दादी, नाना, नानी) + extended family scenes.' },
    { packId: 'L1-09-weather-seasons', contributes: 'vocabulary', note: 'Monsoon + summer heat anchor the trip in time.' },
    { packId: 'L1-12-restaurants-food', contributes: 'cultural', note: 'Grandmother\'s kitchen is the most natural cultural-detail beat.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'पिछले साल हम भारत गए थे। मेरे दादा-दादी उत्तर प्रदेश में रहते हैं। हम दिल्ली हवाई अड्डे पर उतरे। फिर ट्रेन से उनके शहर गए। दादी ने हमारे लिए बहुत सारा खाना बनाया। मुझे उनके आम के पेड़ सबसे अच्छे लगे। हर सुबह हम पुराने बाज़ार जाते थे। वहाँ बहुत भीड़ थी लेकिन मज़ा आया। हम दो हफ़्ते वहाँ रहे। फिर हम अमेरिका वापस आ गए। मुझे भारत की याद आती है। अगले साल हम फिर जाएँगे।',
      transliteration:
        'pichhle saal ham bhaarat gaye the. mere daadaa-daadi uttar pradesh mein rahte hain. ham dilli havaai adde par utre. phir tren se unke shahar gaye. daadi ne hamaare liye bahut saaraa khaanaa banaayaa. mujhe unke aam ke ped sabse achhe lage. har subah ham puraane baazaar jaate the. vahaan bahut bheed thi lekin mazaa aayaa. ham do hafte vahaan rahe. phir ham america vaapas aa gaye. mujhe bhaarat ki yaad aati hai. agle saal ham phir jaayenge.',
      english:
        "Last year we went to India. My grandparents live in Uttar Pradesh. We landed at Delhi airport. Then we went to their city by train. Grandma cooked a lot of food for us. I loved their mango trees the most. Every morning we went to the old market. It was very crowded but fun. We stayed there for two weeks. Then we came back to America. I miss India. We will go again next year.",
      wordCount: 130,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['phir', 'lekin'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'पिछले साल गर्मी की छुट्टियों में हम अमेरिका से उड़कर भारत गए, अपने दादा-दादी से मिलने। जब हमारा हवाई जहाज़ दिल्ली में उतरा, तब बाहर का तापमान लगभग बयालीस डिग्री था — और मेरी छोटी बहन ने तुरंत पूछा, "क्या हम वापस जा सकते हैं?" लेकिन दिल्ली से हमारी असली मंज़िल चार सौ किलोमीटर दूर था — दादी का पुराना घर उत्तर प्रदेश के एक छोटे शहर में।\n\nवहाँ के पंद्रह दिन अब तक की मेरी सबसे सुंदर यादों में से हैं। हर सुबह दादी रसोई में पराठे बनाती थीं, और उनके आँगन के आम के पेड़ से दादा मुझे गिरे हुए आम चुनने को कहते थे। दोपहर में गली में बच्चे क्रिकेट खेलते थे, जिसमें मुझे भी शामिल कर लिया गया — हालाँकि मैं अच्छी तरह नहीं खेलती, किसी ने मज़ाक नहीं उड़ाया। शाम को पड़ोसी आते थे, चाय होती थी, और कहानियाँ घंटों चलती थीं। मुझे लगा जैसे यह जगह हमेशा से मेरी थी, और मैं अनजाने में बहुत साल इससे दूर रह गई थी।\n\nमेरा मानना है कि भारत मेरे लिए सिर्फ़ एक देश नहीं है, बल्कि मेरी जड़ें हैं। अगर मौका मिले, तो मैं हर साल वहाँ जाऊँगी — क्योंकि कुछ रिश्ते दूरी से कमज़ोर नहीं होते, पर मुलाक़ातें उन्हें नई साँस देती हैं।',
      transliteration:
        'pichhle saal garmi ki chhuttiyon mein ham america se udkar bhaarat gaye, apne daadaa-daadi se milne. jab hamaaraa havaai jahaaz dilli mein utraa, tab baahar kaa taapmaan lagbhag bayaalees digree thaa — aur meri chhoti bahan ne turant poochhaa, "kyaa ham vaapas jaa sakte hain?" lekin dilli se hamaari asli manzil chaar sau kilomeetar door thaa — daadi kaa puraanaa ghar uttar pradesh ke ek chhote shahar mein.\n\nvahaan ke pandrah din ab tak ki meri sabse sundar yaadon mein se hain. har subah daadi rasoi mein paraathe banaati thin, aur unke aangan ke aam ke ped se daadaa mujhe gire hue aam chunne ko kahte the. dopahar mein gali mein bachche kriket khelte the, jismein mujhe bhi shaamil kar liyaa gayaa — haalaanki main achhi tarah nahin khelti, kisi ne mazaak nahin udaayaa. shaam ko padosi aate the, chaay hoti thi, aur kahaaniyaan ghanton chalti thin. mujhe lagaa jaise yah jagah hameshaa se meri thi, aur main anjaane mein bahut saal isse door rah gayi thi.\n\nmeraa maannaa hai ki bhaarat mere liye sirf ek desh nahin hai, balki meri jaden hain. agar maukaa mile, to main har saal vahaan jaaoongi — kyonki kuchh rishte doori se kamzor nahin hote, par mulaaqaaten unhen nayi saans deti hain.',
      english:
        "Last year during summer break we flew from America to India to visit my grandparents. When our plane landed in Delhi, the temperature outside was about forty-two degrees — and my little sister immediately asked, \"Can we go back?\" But our real destination was four hundred kilometers from Delhi — grandma's old house in a small town in Uttar Pradesh.\n\nThose fifteen days are among my most beautiful memories to date. Every morning grandma was making parathas in the kitchen, and grandpa would tell me to pick up the fallen mangoes from the mango tree in their courtyard. In the afternoons children played cricket in the street, and I was included too — although I don't play well, no one mocked me. In the evenings neighbors came over, there was tea, and stories went on for hours. I felt as if this place had always been mine, and I had unknowingly stayed far from it for too many years.\n\nI believe India isn't just a country for me, but my roots. If I get the chance, I will go there every year — because some relationships aren't weakened by distance, but meetings give them new breath.",
      wordCount: 268,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'lekin', 'halaanki', 'kyonki', 'meraManna', 'agarTo', 'sirfNahiBalki'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'पिछले साल गर्मी की छुट्टियों में हम अमेरिका से उड़कर भारत गए, अपने दादा-दादी से मिलने; यह मेरी बचपन की सबसे लंबी यात्रा थी। जब हमारा हवाई जहाज़ दिल्ली में उतरा, तब बाहर का तापमान लगभग बयालीस डिग्री था, और मेरी छोटी बहन ने तुरंत पूछा, "क्या हम वापस जा सकते हैं?" सब हँस पड़े, लेकिन सच यह था कि मेरे दिल में भी एक छोटी-सी हलचल थी — सालों बाद अपनी ज़मीन पर लौटने की। दिल्ली से हमारी असली मंज़िल चार सौ किलोमीटर दूर थी — दादी का पुराना घर उत्तर प्रदेश के एक छोटे शहर में।\n\nवहाँ के पंद्रह दिन अब तक की मेरी सबसे सुंदर यादों में से हैं। हर सुबह दादी रसोई में पराठे बनाती थीं, और उनके आँगन के आम के पेड़ से दादा मुझे गिरे हुए आम चुनने को कहते थे — जैसे यह कोई रोज़मर्रा का काम नहीं, बल्कि एक पुरानी परंपरा हो। दोपहर में गली में बच्चे क्रिकेट खेलते थे, जिसमें मुझे भी शामिल कर लिया गया; हालाँकि मैं अच्छी तरह नहीं खेलती, किसी ने मज़ाक नहीं उड़ाया। शाम को पड़ोसी आते थे, चाय होती थी, और कहानियाँ घंटों चलती थीं। एक ओर अमेरिका की शांत गलियाँ याद आतीं, दूसरी ओर यहाँ की हर गली ज़िंदगी से भरी लगती। मुझे लगा जैसे यह जगह हमेशा से मेरी थी, और मैं अनजाने में बहुत साल इससे दूर रह गई थी।\n\nमेरा मानना है कि भारत मेरे लिए सिर्फ़ एक देश नहीं है, बल्कि मेरी जड़ें हैं। अगर मौका मिले, तो मैं हर गर्मी वहाँ जाऊँगी, और शायद एक दिन वहाँ थोड़ा लंबा रुकूँगी भी — क्योंकि कुछ रिश्ते दूरी से कमज़ोर नहीं होते, पर मुलाक़ातें उन्हें नई साँस देती हैं। जब अगले साल हम फिर उस आँगन में बैठेंगे, तब मैं एक कहानी कम सुनूँगी — और एक कहानी ख़ुद सुनाऊँगी।',
      transliteration:
        'pichhle saal garmi ki chhuttiyon mein ham america se udkar bhaarat gaye, apne daadaa-daadi se milne; yah meri bachpan ki sabse lambi yaatraa thi. jab hamaaraa havaai jahaaz dilli mein utraa, tab baahar kaa taapmaan lagbhag bayaalees digree thaa, aur meri chhoti bahan ne turant poochhaa, "kyaa ham vaapas jaa sakte hain?" sab hans pade, lekin sach yah thaa ki mere dil mein bhi ek chhoti-si halchal thi — saalon baad apni zameen par lautne ki. dilli se hamaari asli manzil chaar sau kilomeetar door thi — daadi kaa puraanaa ghar uttar pradesh ke ek chhote shahar mein.\n\nvahaan ke pandrah din ab tak ki meri sabse sundar yaadon mein se hain. har subah daadi rasoi mein paraathe banaati thin, aur unke aangan ke aam ke ped se daadaa mujhe gire hue aam chunne ko kahte the — jaise yah koi rozmarraa kaa kaam nahin, balki ek puraani parampara ho. dopahar mein gali mein bachche kriket khelte the, jismein mujhe bhi shaamil kar liyaa gayaa; haalaanki main achhi tarah nahin khelti, kisi ne mazaak nahin udaayaa. shaam ko padosi aate the, chaay hoti thi, aur kahaaniyaan ghanton chalti thin. ek or america ki shaant galiyaan yaad aatin, doosri or yahaan ki har gali zindagi se bhari lagti. mujhe lagaa jaise yah jagah hameshaa se meri thi, aur main anjaane mein bahut saal isse door rah gayi thi.\n\nmeraa maannaa hai ki bhaarat mere liye sirf ek desh nahin hai, balki meri jaden hain. agar maukaa mile, to main har garmi vahaan jaaoongi, aur shaayad ek din vahaan thodaa lambaa rukoongi bhi — kyonki kuchh rishte doori se kamzor nahin hote, par mulaaqaaten unhen nayi saans deti hain. jab agle saal ham phir us aangan mein baithenge, tab main ek kahaani kam sunoongi — aur ek kahaani khud sunaaoongi.',
      english:
        "Last year during summer break we flew from America to India to visit my grandparents; it was the longest journey of my childhood. When our plane landed in Delhi, the temperature outside was about forty-two degrees, and my little sister immediately asked, \"Can we go back?\" Everyone laughed, but truly there was a small stirring in my heart too — returning to my own soil after many years. Our real destination was four hundred kilometers from Delhi — grandma's old house in a small town in Uttar Pradesh.\n\nThose fifteen days are among my most beautiful memories to date. Every morning grandma was making parathas in the kitchen, and grandpa would tell me to pick up the fallen mangoes from the mango tree in their courtyard — as if it weren't an everyday chore, but an old tradition. In the afternoons children played cricket in the street, and I was included; although I don't play well, no one mocked me. In the evenings neighbors came, there was tea, and stories went on for hours. On one hand I remembered America's quiet streets; on the other, every lane here felt full of life. I felt as if this place had always been mine, and I had unknowingly stayed far from it for too many years.\n\nI believe India isn't just a country for me, but my roots. If I get the chance, I will go there every summer, and maybe one day I will stay a little longer — because some relationships aren't weakened by distance, but meetings give them new breath. When we sit in that courtyard again next year, I will listen to one fewer story — and tell one of my own.",
      wordCount: 338,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'lekin', 'halaanki', 'kyonki', 'meraManna', 'agarTo', 'sirfNahiBalki'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'vocab', highlight: 'अमेरिका से उड़कर भारत गए', note: 'Non-finite construction (उड़कर) + cross-country motion. A textbook B5+ sentence.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'जब हमारा हवाई जहाज़ दिल्ली में उतरा, तब', note: 'जब...तब dependent clause — Intermediate-Mid discriminator.' },
    { paragraphIndex: 0, kind: 'cultural', highlight: 'उत्तर प्रदेश के एक छोटे शहर में', note: 'State + town specificity — Topic-Coverage signal.' },
    { paragraphIndex: 0, kind: 'structure', highlight: '"क्या हम वापस जा सकते हैं?"', note: 'Direct speech. Rater notes register variety.' },
    { paragraphIndex: 1, kind: 'tense-shift', highlight: 'दादी बनाती थीं ... दादा कहते थे', note: 'Past-habitual continuous — shows the trip as a rhythm, not a sequence. B5+ language control.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि मैं अच्छी तरह नहीं खेलती, किसी ने मज़ाक नहीं उड़ाया', note: 'हालाँकि concession + negative — two clauses, non-rearrangeable.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'एक ओर ... दूसरी ओर', note: 'Formal contrast marker pair — pushes language control toward Benchmark 6.' },
    { paragraphIndex: 1, kind: 'cultural', highlight: 'आम के पेड़ ... पराठे ... कहानियाँ घंटों चलती थीं', note: 'Three cultural anchors in one paragraph — Topic Coverage full marks.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ एक देश नहीं, बल्कि मेरी जड़ें हैं', note: 'Correlative thesis. Opinion essay register.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर मौका मिले, तो मैं हर साल वहाँ जाऊँगी', note: 'Conditional + future — sustained across two frames. B6 marker.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'कुछ रिश्ते दूरी से कमज़ोर नहीं होते', note: 'Closing aphorism — an earned Hindi sentence, not translated English. Voice signal.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three cohesive paragraphs spanning three continents of tense — past (उतरा, बनाती थीं), present (मेरे लिए ... जड़ें हैं), future (जाऊँगी). Language Control: full.',
      'Seven connectors including correlative (सिर्फ़...बल्कि), concession (हालाँकि), conditional (अगर...तो). Sentence rearrangeability fails.',
      'Cultural specificity exceptional — the state (Uttar Pradesh), the mango tree, the parathas, the cricket in the street. Topic Coverage: strong.',
      '"One hand ... other hand" (एक ओर ... दूसरी ओर) construction in paragraph 2 pushes the text-type signal toward Benchmark 6.',
      'Thesis "India is not just a country but my roots" earns voice points beyond the descriptive baseline — the rubric\'s voice axis.',
    ],
    gotchas: [
      'Temperature in Celsius ("बयालीस डिग्री") — make sure not to write फ़ारेनहाइट by habit.',
      'पंद्रह दिन requires the oblique for most postpositions — check.',
      'हवाई जहाज़ (m) → जहाज़ उतरा, not उतरी.',
    ],
  },
  readerQuestions: [
    { q: 'यात्रा किस मौसम में हुई?', a: 'गर्मी की छुट्टियों में।' },
    { q: 'दिल्ली से दादी का घर कितनी दूर था?', a: 'लगभग चार सौ किलोमीटर दूर।' },
    { q: 'हर सुबह दादी क्या करती थीं?', a: 'हर सुबह दादी रसोई में पराठे बनाती थीं।' },
    { q: 'लेखिका ने भारत को क्या कहा है?', a: 'भारत सिर्फ़ एक देश नहीं, बल्कि उसकी जड़ें हैं।' },
    { q: 'अगले साल लेखिका क्या करना चाहती है?', a: 'हर साल भारत जाना चाहती है, और एक दिन थोड़ा लंबा रुकना भी।' },
  ],
  teacherNote: {
    why:
      'C06 is Mock Exam 2 — the best single rehearsal for the FCPS prompt a student will actually face. Time it at 40 minutes; no notes. If the student can produce even 70% of this essay in that time, the 3-credit outcome is locked.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    examLink:
      'STAMP rubric — Benchmark 6 "paragraph-length narratives; clear cohesion across multiple paragraphs." Pushing above 5 is the safety margin against a borderline score.',
  },
  status: 'shipped',
  version: 1,
};
