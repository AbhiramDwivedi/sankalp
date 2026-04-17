// Capstone C01 — "A restaurant memory I will never forget"
// Core tier. Mock Exam 1 (30 min, no notes).
// Integrates L1-03 family, L1-04 clothing, L1-12 restaurants, L2-03 food.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C01-restaurant-memory',
  order: 1,
  tier: 'core',
  isMockExam: true,
  mockExamMinutes: 30,
  themeGroup: 'ModernSociety',
  heroMotif: 'thali',
  titleHindi: 'एक यादगार रेस्तराँ की शाम',
  titleEnglish: 'A restaurant memory I will never forget',
  hook: 'The classic FCPS prompt. One evening, one family, one meal — and every tense frame we know.',
  promptHindi:
    'किसी ऐसे रेस्तराँ के बारे में लिखो जहाँ तुम अपने परिवार के साथ गए हो। कम से कम तीन पैराग्राफ में लिखो।',
  promptEnglish:
    'Write about a restaurant where you went with your family. Use at least three cohesive paragraphs.',
  whyThisCapstone:
    'Almost every FCPS writing prompt at Benchmark 5 asks the student to tell a personal experience. A family restaurant meal is the most reliable scene a student can mine: it anchors the essay in time (past), zooms into a scene (present-in-memory), and sets up a closing reflection (future / opinion). Mastering this capstone means owning every rubric axis on one page.',
  draws: [
    { packId: 'L1-03-family', contributes: 'vocabulary', note: 'Family roles: पापा, माँ, बहन, भाई — and the verbs for gathering, laughing, sharing.' },
    { packId: 'L1-04-clothing-colors', contributes: 'vocabulary', note: 'A sentence of scene-setting — what someone wore — adds sensory texture.' },
    { packId: 'L1-12-restaurants-food', contributes: 'vocabulary', note: 'The restaurant vocabulary backbone: मेज़, मेन्यू, वेटर, थाली, स्वादिष्ट.' },
    { packId: 'L2-03-food', contributes: 'cultural', note: 'Thali composition and preparation terms — enough specificity for the rubric.' },
    { packId: 'L1-09-weather-seasons', contributes: 'structure', note: 'One weather / time-of-day line that anchors the memory in a season.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मेरे पापा के जन्मदिन पर हम एक रेस्तराँ गए। रेस्तराँ का नाम शेर-ए-पंजाब है। वहाँ पहुँचकर हम एक मेज़ पर बैठ गए। हमने शाही थाली खाई। खाने में रोटी, दाल, पनीर और गुलाब जामुन था। खाना बहुत स्वादिष्ट था। मेरी बहन खुश थी और पापा भी बहुत खुश थे। हम बहुत देर बैठे और पुरानी बातें कीं। मुझे यह रेस्तराँ बहुत पसंद है क्योंकि यहाँ खाना अच्छा है। अगले साल मैं फिर वहाँ जाऊँगी।',
      transliteration:
        'mere paapaa ke janmadin par ham ek restaraan gaye. restaraan kaa naam sher-e-panjaab hai. vahaan pahunchkar ham ek mez par baith gaye. hamne shaahi thaali khaayi. khaane mein roti, daal, paneer aur gulaab jaamun thaa. khaanaa bahut svaadisht thaa. meri bahan khush thi aur paapaa bhi bahut khush the. ham bahut der baithe aur puraani baaten kin. mujhe yah restaraan bahut pasand hai kyonki yahaan khaanaa achhaa hai. agle saal main phir vahaan jaaungi.',
      english:
        "On my dad's birthday we went to a restaurant. The restaurant's name is Sher-e-Punjab. After arriving there, we sat at a table. We ate a royal thali. The food had roti, dal, paneer, and gulab jamun. The food was very tasty. My sister was happy and dad was also very happy. We sat for a long time and talked about old things. I like this restaurant because the food is good. Next year I will go there again.",
      wordCount: 125,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['kyonki'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'पिछले महीने मेरे पापा के जन्मदिन पर हमारा पूरा परिवार हमारे मोहल्ले के सबसे पुराने रेस्तराँ, "शेर-ए-पंजाब", गया। जब हम पहुँचे, तब सूरज ढल रहा था और रेस्तराँ के बाहर पीले-सुनहरे बल्ब जल रहे थे। पापा की पसंदीदा मेज़ खिड़की के पास थी, इसलिए वेटर ने हमें सीधे वहीं बिठाया। मेरी बहन ने मेन्यू खोला, लेकिन मुझे पता था कि आज हम शाही थाली ज़रूर लेंगे — वह इस जगह की मशहूर चीज़ है।\n\nपहले गरम-गरम रोटियाँ और दाल मखनी आई, फिर पनीर टिक्का, और अंत में मिठाई के लिए गुलाब जामुन। खाना इतना स्वादिष्ट था कि मेरे मुँह में पानी आ गया। हम हँसते रहे, पुराने किस्से दोहराते रहे, और पापा ने अपनी जवानी की कहानियाँ सुनाईं। मैंने देखा कि रेस्तराँ की दीवारों पर पुरानी बॉम्बे की तस्वीरें लगी थीं, और मेज़ पर पीतल के गिलास चमक रहे थे। हालाँकि मैं थोड़ी थकी हुई थी, मुझे वहाँ से जाने का मन नहीं कर रहा था।\n\nमुझे लगता है कि एक अच्छा रेस्तराँ सिर्फ़ स्वादिष्ट खाने से नहीं बनता, बल्कि उस माहौल से बनता है जो परिवार को जोड़ता है। इसलिए अगले साल पापा के जन्मदिन पर हम फिर उसी जगह जाएँगे — यह हमारी नई परंपरा बनती जा रही है।',
      transliteration:
        'pichhle mahine mere paapaa ke janmadin par hamaaraa pooraa parivaar hamaare mohalle ke sabse puraane restaraan, "sher-e-panjaab", gayaa. jab ham pahunche, tab sooraj dhal rahaa thaa aur restaraan ke baahar peele-sunahre balb jal rahe the. paapaa ki pasandeedaa mez khidki ke paas thi, isliye vetar ne hamen seedhe vahin bithaayaa. meri bahan ne menyu kholaa, lekin mujhe pataa thaa ki aaj ham shaahi thaali zaroor lenge — vah is jagah ki mashhoor cheez hai.\n\npahle garam-garam rotiyaan aur daal makhani aayi, phir paneer tikkaa, aur ant mein mithaayi ke liye gulaab jaamun. khaanaa itnaa svaadisht thaa ki mere munh mein paani aa gayaa. ham hanste rahe, puraane kisse dohraate rahe, aur paapaa ne apni javaani ki kahaaniyaan sunaayin. maine dekhaa ki restaraan ki deevaaron par puraani bombay ki tasveeren lagi thin, aur mez par peetal ke gilaas chamak rahe the. haalaanki main thodi thaki hui thi, mujhe vahaan se jaane kaa man nahin kar rahaa thaa.\n\nmujhe lagtaa hai ki ek achhaa restaraan sirf svaadisht khaane se nahin bantaa, balki us maahaul se bantaa hai jo parivaar ko jodtaa hai. isliye agle saal paapaa ke janmadin par ham phir usi jagah jaayenge — yah hamaari nayi parampara bantee jaa rahi hai.',
      english:
        "Last month, on my dad's birthday, our whole family went to Sher-e-Punjab, the oldest restaurant in our neighborhood. When we arrived, the sun was setting and yellow-gold bulbs were glowing outside the restaurant. Dad's favorite table was by the window, so the waiter seated us right there. My sister opened the menu, but I already knew we would definitely order the royal thali — it's what this place is famous for.\n\nFirst, hot rotis and dal makhani arrived, then paneer tikka, and finally gulab jamun for dessert. The food was so delicious my mouth watered. We kept laughing, retelling old stories, and dad shared tales from his youth. I noticed that old photographs of Bombay hung on the restaurant's walls, and brass tumblers gleamed on the table. Although I was a little tired, I didn't feel like leaving.\n\nI think a good restaurant is made not just by delicious food but by the atmosphere that brings a family together. So next year on dad's birthday we will go to the same place again — this is slowly becoming our new tradition.",
      wordCount: 245,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'isliye', 'lekin', 'pahle', 'phir', 'antMein', 'halaanki', 'kyonki'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'पिछले महीने मेरे पापा के पचासवें जन्मदिन पर हमारा पूरा परिवार — पापा, माँ, मेरी छोटी बहन और मैं — हमारे मोहल्ले के सबसे पुराने रेस्तराँ "शेर-ए-पंजाब" में इकट्ठा हुए। जब हम पहुँचे, तब सूरज धीरे-धीरे ढल रहा था और रेस्तराँ के बाहर पीले-सुनहरे बल्ब जल रहे थे, जैसे किसी पुराने हिंदी फ़िल्म का दृश्य हो। पापा की पसंदीदा मेज़ खिड़की के पास थी, इसलिए वेटर ने मुस्कुराकर हमें सीधे वहीं बिठाया। माँ ने हौले से कहा, "आज सिर्फ़ खाना नहीं, यादें भी साथ खाएँगे।"\n\nपहले गरम-गरम रोटियाँ और दाल मखनी आई, फिर पनीर टिक्का, और अंत में मिठाई के लिए गुलाब जामुन। खाना इतना स्वादिष्ट था कि मेरे मुँह में पानी आ गया — और पापा ने हँसकर बताया कि बीस साल पहले उन्होंने अपनी पहली नौकरी की पहली तनख़्वाह इसी जगह खर्च की थी। मैंने देखा कि रेस्तराँ की दीवारों पर पुरानी बॉम्बे की तस्वीरें लगी थीं, और मेज़ पर पीतल के गिलास चमक रहे थे। हालाँकि मैं थोड़ी थकी हुई थी, मुझे वहाँ से जाने का बिलकुल मन नहीं कर रहा था। अगर वह शाम कभी न ख़त्म होती, तो मुझे कोई शिकायत नहीं होती।\n\nमेरा मानना है कि एक अच्छा रेस्तराँ सिर्फ़ स्वादिष्ट खाने से नहीं बनता, बल्कि उस माहौल से बनता है जो परिवार को जोड़ता है और पुरानी यादों को जीवंत कर देता है। इसलिए मैंने तय किया है कि अगले साल जब पापा का इक्यावनवाँ जन्मदिन होगा, तब हम सब फिर से उसी मेज़ पर बैठेंगे — क्योंकि कुछ परंपराएँ सिर्फ़ बनाई नहीं जातीं, वे चुपचाप बन जाती हैं।',
      transliteration:
        'pichhle mahine mere paapaa ke pachaasven janmadin par hamaaraa pooraa parivaar — paapaa, maan, meri chhoti bahan aur main — hamaare mohalle ke sabse puraane restaraan "sher-e-panjaab" mein ikatthaa hue. jab ham pahunche, tab sooraj dheere-dheere dhal rahaa thaa aur restaraan ke baahar peele-sunahre balb jal rahe the, jaise kisi puraane hindi film kaa drishya ho. paapaa ki pasandeedaa mez khidki ke paas thi, isliye vetar ne muskuraakar hamen seedhe vahin bithaayaa. maan ne haule se kahaa, "aaj sirf khaanaa nahin, yaaden bhi saath khaayenge."\n\npahle garam-garam rotiyaan aur daal makhani aayi, phir paneer tikkaa, aur ant mein mithaayi ke liye gulaab jaamun. khaanaa itnaa svaadisht thaa ki mere munh mein paani aa gayaa — aur paapaa ne hanskar bataayaa ki bees saal pahle unhonne apni pahli naukari ki pahli tankhvaah isi jagah kharch ki thi. maine dekhaa ki restaraan ki deevaaron par puraani bombay ki tasveeren lagi thin, aur mez par peetal ke gilaas chamak rahe the. haalaanki main thodi thaki hui thi, mujhe vahaan se jaane kaa bilkul man nahin kar rahaa thaa. agar vah shaam kabhi na khatm hoti, to mujhe koi shikaayat nahin hoti.\n\nmeraa maannaa hai ki ek achhaa restaraan sirf svaadisht khaane se nahin bantaa, balki us maahaul se bantaa hai jo parivaar ko jodtaa hai aur puraani yaadon ko jeevant kar detaa hai. isliye maine tay kiyaa hai ki agle saal jab paapaa kaa ikyaavanvaan janmadin hogaa, tab ham sab phir se usi mez par baithenge — kyonki kuchh paramparaayen sirf banaayi nahin jaatin, ve chupchaap ban jaati hain.',
      english:
        "Last month, on my dad's fiftieth birthday, our whole family — dad, mom, my younger sister, and I — gathered at Sher-e-Punjab, the oldest restaurant in our neighborhood. When we arrived, the sun was slowly setting and the yellow-gold bulbs outside glowed as if in a scene from an old Hindi film. Dad's favorite table was by the window, so the waiter smiled and seated us right there. Mom said softly, \"Today we're not just eating food, we're eating memories.\"\n\nFirst hot rotis and dal makhani arrived, then paneer tikka, and finally gulab jamun for dessert. The food was so delicious my mouth watered — and dad laughed as he told us that twenty years ago he had spent the first paycheck from his first job at this very place. I noticed the old photographs of Bombay on the restaurant's walls and the brass tumblers gleaming on the table. Although I was a little tired, I had absolutely no desire to leave. If that evening had never ended, I would have had no complaint.\n\nI believe a good restaurant isn't made just by delicious food but by the atmosphere that binds a family and brings old memories back to life. So I have decided that next year, when dad turns fifty-one, we will all sit at that same table again — because some traditions aren't made on purpose; they quietly form on their own.",
      wordCount: 315,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'isliye', 'lekin', 'pahle', 'phir', 'antMein', 'halaanki', 'kyonki', 'agarTo', 'meraManna'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले महीने ... हम गए', note: 'Essay opens in past tense. This single time-anchor + past verb tells the rater "this is a narrative" — Text-Type jumps to "connected sentences" immediately.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'जब हम पहुँचे, तब सूरज ढल रहा था', note: 'जब...तब pair sets a dependent clause — rater cannot rearrange these sentences without breaking meaning. This is the Intermediate-Low → Intermediate-Mid test.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए वेटर ने हमें सीधे वहीं बिठाया', note: 'इसलिए introduces a consequence — shows cause-and-effect reasoning, a rubric marker for Text-Type.' },
    { paragraphIndex: 0, kind: 'vocab', highlight: 'शाही थाली ... मशहूर चीज़', note: 'Topic-specific vocabulary (from L1-12 restaurants pack): a bare-minimum topic-coverage item a rater looks for.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... अंत में', note: 'Three sequencing connectors in one sentence — this is textbook Benchmark-5 sentence construction. Train this pattern.' },
    { paragraphIndex: 1, kind: 'idiom', highlight: 'मेरे मुँह में पानी आ गया', note: 'Muhavara. One well-placed idiom lifts the register from "student writing" to "native-like" in the rater\'s ear. Don\'t overdo — one per essay is ideal.' },
    { paragraphIndex: 1, kind: 'cultural', highlight: 'पीतल के गिलास ... पुरानी बॉम्बे की तस्वीरें', note: 'Cultural specificity. A rater awards Topic-Coverage for concrete, culture-aware detail, not generic "it was nice".' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि मैं थकी हुई थी', note: 'हालाँकि introduces concession — a complex clause structure that is one of the Benchmark-5 discriminators.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... सिर्फ़ ... बल्कि', note: 'Opinion stance + contrast. This is the final-paragraph move: the student reflects and offers a view, not just describes. Rubric rewards opinion framing at IM.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल ... हम फिर उसी जगह जाएँगे', note: 'Future tense. Essay now covers past (para 1–2), present (opinion), and future (intention) — three time frames, which is the core Language-Control marker for Benchmark 5.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'यह हमारी नई परंपरा बनती जा रही है', note: 'Closing with "new tradition" lands the essay emotionally — raters notice when a student earns, not asserts, the closing sentiment.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'इसलिए', note: 'One more cause connector in the close — ties the reflection to the future action. Three-sentence paragraph, three functional moves.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three cohesive paragraphs with a clear narrative arc: setup (para 1), scene (para 2), reflection (para 3). Text-Type: "connected sentences with transitions and groupings of ideas" — Benchmark 5.',
      'Three tense frames used correctly: past (पहुँचे, लगी थीं, सुनाईं), present (मुझे लगता है, यह मशहूर चीज़ है), future (जाएँगे). Language Control: "some control of past, present, and future time frames" — Benchmark 5.',
      'Eight different connectors (जब...तब, इसलिए, लेकिन, पहले, फिर, अंत में, हालाँकि, क्योंकि). Rater test "can sentences be rearranged" fails — which is the IM signal.',
      'Topic coverage: restaurant vocabulary (मेन्यू, थाली, वेटर, दाल मखनी, पनीर टिक्का, गुलाब जामुन), family vocabulary (पापा, बहन), cultural specifics (पीतल के गिलास, बॉम्बे की तस्वीरें). Topic Coverage axis: strong.',
      'One well-placed muhavara (मुँह में पानी आ गया) — signals register awareness to the rater.',
    ],
    gotchas: [
      'If a student drops the tense variety and writes all of it in past tense, this drops to Benchmark 4 (Intermediate-Low = 2 credits).',
      'If a student replaces the muhavara with a generic phrase (बहुत अच्छा लगा), no score impact — but losing any cultural specificity would cost Topic Coverage.',
      'Gender agreement errors on फिल्में / तस्वीरें / रोटियाँ are the most common Language-Control dock at this level.',
    ],
  },
  readerQuestions: [
    { q: 'पापा की पसंदीदा मेज़ कहाँ थी?', a: 'पापा की पसंदीदा मेज़ खिड़की के पास थी।' },
    { q: 'खाने में क्या-क्या आया?', a: 'पहले गरम रोटियाँ और दाल मखनी, फिर पनीर टिक्का, और अंत में गुलाब जामुन।' },
    { q: 'दीवारों पर क्या लगा था?', a: 'दीवारों पर पुरानी बॉम्बे की तस्वीरें लगी थीं।' },
    { q: 'लेखिका को वहाँ से जाने का मन क्यों नहीं कर रहा था?', a: 'क्योंकि परिवार के साथ माहौल बहुत अच्छा था — हँसी, पुरानी कहानियाँ, और अच्छा खाना।' },
    { q: 'अगले साल क्या करेंगे?', a: 'अगले साल पापा के जन्मदिन पर वे फिर से उसी रेस्तराँ जाएँगे।' },
  ],
  teacherNote: {
    why:
      'This is the reference capstone. Every student should write their own version of this essay at least twice across their study plan — once at Week 5 of Plan Foundation (the first taste of IM-length), and once more as a timed Mock Exam near the end. It is the single most durable test of whether the student can produce Benchmark-5 output under realistic exam conditions.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    examLink:
      'STAMP rubric Benchmark 5 — "Connected sentences with transitions and groupings of ideas; sentences cannot be rearranged without altering meaning. Some control of past, present, and future time frames."',
  },
  status: 'shipped',
  version: 1,
};
