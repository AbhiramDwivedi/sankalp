import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L2-05 · School-Related Activities (स्कूल की गतिविधियाँ)
// Position: 'building'. Past-tense-dominant narrative pack that maps cleanly
// onto FCPS Level 2 "Student Life" prompts (clubs, events, trips).
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-05-school-activities',
  level: 2,
  themeGroup: 'Identity',
  order: 17,
  heroMotif: 'cricket',
  titleHindi: 'स्कूल की गतिविधियाँ',
  titleEnglish: 'School-Related Activities',
  hook: 'Clubs, field trips, sports — ideal for narrative past-tense essays, a rubric requirement at IM.',
  heroPrompt: composeHeroPrompt(
    'A school bulletin board collage — a small cricket trophy on a wooden desk, a blue science-fair ribbon, a tabla and a harmonium, a drama mask, a painted palette, a pinned photo of students holding a banner — all pinned with colourful washi tape',
  ),

  rationale: {
    fcpsSubTopics: [
      'School-Related Activities (FCPS Level 2 — Student Life)',
      'Clubs, sports teams, and after-school programs (FCPS Level 2)',
      'Field trips and school events (FCPS Level 2)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate a school event in three paragraphs using past perfective verbs throughout',
      'Distinguish past-habitual (हम मनाते थे) from past-event (हमने मनाया) and use each correctly',
      'Describe a club, a role on a team, and an outcome (won / lost / participated) with topic-specific vocabulary',
      'Close a narrative with a present-tense reflection and a future-tense next-year plan',
      'Include at least one India-specific school custom (annual day, tricolour, विज्ञान प्रदर्शनी) to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'School activities is one of the two most frequent FCPS Level-2 writing prompts. Without this pack, the student cannot produce the past-perfective + past-habitual switching that Intermediate-Mid requires, and falls back to present-only descriptions that cap at Benchmark 4.',
  },

  objectives: [
    {
      text: 'Name at least 8 school events, 4 clubs, and 5 event-outcome nouns (पुरस्कार, प्रमाणपत्र, ट्रॉफ़ी, जीत, हार) without lookup.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Write a 3-paragraph memorable-event narrative using past perfective (हमने जीता) at least four times.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Switch correctly between past-habitual ("हर साल हम मनाते थे") and past-event ("पिछले साल हमने मनाया") in the same essay.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Use भाग लेना / हिस्सा लेना / शामिल होना in correct participation frames (noun + में भाग लेना).',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Close the essay with a future-tense sentence ("अगले साल मैं ...") to secure the third time frame required for Benchmark 5.',
      trains: ['TextType'],
    },
  ],

  vocabulary: [
    // Clubs
    { hindi: 'क्रिकेट क्लब', transliteration: 'cricket club', english: 'cricket club', exampleHindi: 'मैं स्कूल के क्रिकेट क्लब का सदस्य हूँ।', exampleEnglish: 'I am a member of the school cricket club.', emoji: '🏏', partOfSpeech: 'noun', subgroup: 'Clubs' },
    { hindi: 'संगीत क्लब', transliteration: 'sangeet club', english: 'music club', exampleHindi: 'संगीत क्लब हर शुक्रवार को मिलता है।', exampleEnglish: 'The music club meets every Friday.', emoji: '🎵', partOfSpeech: 'noun', subgroup: 'Clubs' },
    { hindi: 'नाटक क्लब', transliteration: 'naatak club', english: 'drama club', exampleHindi: 'नाटक क्लब ने एक नया नाटक तैयार किया।', exampleEnglish: 'The drama club prepared a new play.', emoji: '🎭', partOfSpeech: 'noun', subgroup: 'Clubs' },
    { hindi: 'विज्ञान क्लब', transliteration: 'vigyaan club', english: 'science club', exampleHindi: 'विज्ञान क्लब में हम प्रयोग करते हैं।', exampleEnglish: 'In the science club we do experiments.', emoji: '🔬', partOfSpeech: 'noun', subgroup: 'Clubs' },

    // School events
    { hindi: 'वार्षिक समारोह', transliteration: 'vaarshik samaaroh', english: 'annual day / annual function', exampleHindi: 'हमारा वार्षिक समारोह दिसंबर में होता है।', exampleEnglish: 'Our annual function is in December.', emoji: '🎉', partOfSpeech: 'noun', subgroup: 'Events' },
    { hindi: 'खेल दिवस', transliteration: 'khel divas', english: 'sports day', exampleHindi: 'खेल दिवस पर हम दौड़ में भाग लेते हैं।', exampleEnglish: 'On sports day we take part in the race.', emoji: '🏃', partOfSpeech: 'noun', subgroup: 'Events' },
    { hindi: 'विज्ञान मेला', transliteration: 'vigyaan mela', english: 'science fair', exampleHindi: 'पिछले साल विज्ञान मेले में मेरा मॉडल पहले आया।', exampleEnglish: "Last year my model came first at the science fair.", emoji: '🔭', partOfSpeech: 'noun', subgroup: 'Events' },
    { hindi: 'सांस्कृतिक कार्यक्रम', transliteration: 'saanskritik kaaryakram', english: 'cultural program', exampleHindi: 'सांस्कृतिक कार्यक्रम में बच्चों ने नृत्य किया।', exampleEnglish: 'In the cultural program, the children danced.', emoji: '💃', partOfSpeech: 'phrase', subgroup: 'Events' },
    { hindi: 'स्वतंत्रता दिवस', transliteration: 'svatantrataa divas', english: 'Independence Day', exampleHindi: 'स्वतंत्रता दिवस पर हम तिरंगा फहराते हैं।', exampleEnglish: 'On Independence Day we hoist the tricolour.', emoji: '🇮🇳', partOfSpeech: 'noun', subgroup: 'Events' },

    // Trips
    { hindi: 'शैक्षिक यात्रा', transliteration: 'shaikshik yaatra', english: 'educational trip', exampleHindi: 'हमारी शैक्षिक यात्रा आगरा गई थी।', exampleEnglish: 'Our educational trip went to Agra.', emoji: '🚌', partOfSpeech: 'phrase', subgroup: 'Trips' },
    { hindi: 'पिकनिक', transliteration: 'picnic', english: 'picnic', exampleHindi: 'स्कूल की पिकनिक एक बगीचे में थी।', exampleEnglish: "The school picnic was at a garden.", emoji: '🧺', partOfSpeech: 'noun', subgroup: 'Trips' },
    { hindi: 'भ्रमण', transliteration: 'bhraman', english: 'tour / excursion', exampleHindi: 'संग्रहालय का भ्रमण बहुत रोचक था।', exampleEnglish: 'The museum tour was very interesting.', emoji: '🗺️', partOfSpeech: 'noun', subgroup: 'Trips' },

    // Roles & actions
    { hindi: 'टीम', transliteration: 'team', english: 'team', exampleHindi: 'हमारी टीम ने फ़ाइनल जीता।', exampleEnglish: 'Our team won the final.', emoji: '👥', partOfSpeech: 'noun', subgroup: 'Roles' },
    { hindi: 'कप्तान', transliteration: 'kaptaan', english: 'captain', exampleHindi: 'मैं अपनी टीम का कप्तान था।', exampleEnglish: "I was the captain of my team.", emoji: '🧢', partOfSpeech: 'noun', subgroup: 'Roles' },
    { hindi: 'भाग लेना', transliteration: 'bhaag lena', english: 'to take part / participate', exampleHindi: 'मैंने वाद-विवाद में भाग लिया।', exampleEnglish: "I participated in the debate.", emoji: '✋', partOfSpeech: 'verb', subgroup: 'Roles' },
    { hindi: 'हिस्सा लेना', transliteration: 'hissa lena', english: 'to take part (syn.)', exampleHindi: 'कई बच्चों ने नृत्य में हिस्सा लिया।', exampleEnglish: 'Many children took part in the dance.', emoji: '🙌', partOfSpeech: 'verb', subgroup: 'Roles' },
    { hindi: 'जीतना', transliteration: 'jeetna', english: 'to win', exampleHindi: 'हमने मैच जीता।', exampleEnglish: 'We won the match.', emoji: '🏆', partOfSpeech: 'verb', subgroup: 'Roles' },
    { hindi: 'हारना', transliteration: 'haarna', english: 'to lose', exampleHindi: 'पिछली बार हम एक रन से हारे।', exampleEnglish: 'Last time we lost by one run.', emoji: '😞', partOfSpeech: 'verb', subgroup: 'Roles' },
    { hindi: 'अभ्यास करना', transliteration: 'abhyaas karna', english: 'to practise', exampleHindi: 'हम रोज़ एक घंटा अभ्यास करते थे।', exampleEnglish: 'We used to practise one hour every day.', emoji: '🎯', partOfSpeech: 'verb', subgroup: 'Roles' },

    // Recognitions
    { hindi: 'पुरस्कार', transliteration: 'puraskaar', english: 'prize / award', exampleHindi: 'प्रधानाचार्य ने मुझे पुरस्कार दिया।', exampleEnglish: 'The principal gave me a prize.', emoji: '🎖️', partOfSpeech: 'noun', subgroup: 'Recognition' },
    { hindi: 'प्रमाणपत्र', transliteration: 'pramaanpatra', english: 'certificate', exampleHindi: 'मुझे भागीदारी का प्रमाणपत्र मिला।', exampleEnglish: 'I got a participation certificate.', emoji: '📜', partOfSpeech: 'noun', subgroup: 'Recognition' },
    { hindi: 'ट्रॉफ़ी', transliteration: 'trophy', english: 'trophy', exampleHindi: 'टीम ने चमकती हुई ट्रॉफ़ी उठाई।', exampleEnglish: 'The team lifted the shining trophy.', emoji: '🏆', partOfSpeech: 'noun', subgroup: 'Recognition' },
    { hindi: 'प्रदर्शन', transliteration: 'pradarshan', english: 'performance / display', exampleHindi: 'हमारा प्रदर्शन सबसे अच्छा था।', exampleEnglish: 'Our performance was the best.', emoji: '🎤', partOfSpeech: 'noun', subgroup: 'Recognition' },
    { hindi: 'तालियाँ', transliteration: 'taaliyaan', english: 'applause / clapping', exampleHindi: 'पूरे हॉल में तालियाँ बजीं।', exampleEnglish: 'The whole hall clapped.', emoji: '👏', partOfSpeech: 'noun', subgroup: 'Recognition' },

    // Venues & extras
    { hindi: 'मैदान', transliteration: 'maidaan', english: 'playground / field', exampleHindi: 'हम मैदान पर खेलते थे।', exampleEnglish: 'We used to play on the field.', emoji: '🏟️', partOfSpeech: 'noun', subgroup: 'Venues' },
    { hindi: 'सभागार', transliteration: 'sabhaagaar', english: 'auditorium / hall', exampleHindi: 'सभागार में पूरा स्कूल बैठा था।', exampleEnglish: 'The whole school was seated in the auditorium.', emoji: '🏛️', partOfSpeech: 'noun', subgroup: 'Venues' },
    { hindi: 'प्रधानाचार्य', transliteration: 'pradhaanaachaarya', english: 'principal', exampleHindi: 'प्रधानाचार्य ने भाषण दिया।', exampleEnglish: 'The principal gave a speech.', emoji: '👨‍🏫', partOfSpeech: 'noun', subgroup: 'Venues' },
    { hindi: 'यादगार', transliteration: 'yaadgaar', english: 'memorable', exampleHindi: 'वह दिन मेरे लिए बहुत यादगार था।', exampleEnglish: 'That day was very memorable for me.', emoji: '⭐', partOfSpeech: 'adjective', subgroup: 'Venues' },
  ],
  vocabularyNote: {
    why:
      'These 29 words are the narrow set FCPS Level-2 "student life" prompts pull from. Club names, event names, outcome nouns (पुरस्कार, ट्रॉफ़ी, प्रमाणपत्र), and the three participation verbs together let a student fill a full three-paragraph narrative without repeating words.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: precise, theme-specific nouns beat generic "good / nice / do".',
  },

  grammar: [
    {
      title: 'Past perfective with ने — event narration',
      rule:
        'To narrate a specific past event (the heart of a school-activity essay), use the ने construction with the perfective verb. The subject takes ने, and the verb agrees with the direct OBJECT in gender and number — not the subject.',
      examples: [
        { hindi: 'हमने मैच जीता।', transliteration: 'humne match jeeta.', english: 'We won the match. (match = masc. sg.)' },
        { hindi: 'टीम ने दूसरी टीम को हराया।', transliteration: 'team ne doosri team ko haraaya.', english: 'The team beat the other team. (ko blocks agreement → default masc.)' },
        { hindi: 'मैंने प्रतियोगिता में भाग लिया।', transliteration: 'maine pratiyogitaa mein bhaag liya.', english: 'I took part in the competition. (भाग is masc. sg.)' },
        { hindi: 'लड़कियों ने ट्रॉफ़ी उठाई।', transliteration: 'ladkiyon ne trophy uthaayi.', english: 'The girls lifted the trophy. (trophy is feminine.)' },
      ],
      pitfall:
        'Students who say "हम जीता" or "मैंने जीती" (wrong agreement) drop fast in Language Control. Remember: subject → ने, verb → agrees with object.',
      whyItMatters:
        'An event essay without ने constructions reads as Novice. A single clean past-perfective sentence with correct object agreement lifts Language Control from "Low" to "Average" and unlocks Benchmark 5.',
    },
    {
      title: 'Past-habitual (था / थे / थी) vs. past-event (perfective)',
      rule:
        'Two past tenses, two different jobs. Past-habitual (imperfective + था) describes what USED TO happen repeatedly. Past-perfective describes what happened ONCE. Intermediate-Mid essays mix both.',
      examples: [
        { hindi: 'हम हर साल खेल दिवस मनाते थे।', transliteration: 'hum har saal khel divas manaate the.', english: 'We used to celebrate sports day every year. (habitual)' },
        { hindi: 'पिछले साल हमने खेल दिवस बड़े उत्साह से मनाया।', transliteration: 'pichhle saal humne khel divas bade utsaah se manaaya.', english: 'Last year we celebrated sports day with great enthusiasm. (single event)' },
        { hindi: 'हमारी टीम रोज़ अभ्यास करती थी, इसलिए हमने फ़ाइनल जीता।', transliteration: 'hamaari team roz abhyaas karti thi, isliye humne final jeeta.', english: 'Our team used to practise every day, so we won the final.' },
      ],
      pitfall:
        'Students often flatten both into present ("हम हर साल मनाते हैं") — that costs the past-tense frame the rubric specifically checks for. The tell-tale markers हर साल / रोज़ / अक्सर want मनाते थे / करते थे, not मनाते हैं / करते हैं.',
      whyItMatters:
        'The STAMP rubric at Benchmark 5 wants "some control of past, present, and future". Using both habitual-past AND event-past shows the rater that past is not a single word but a tense system the student controls.',
    },
    {
      title: 'Participation frames — भाग लेना / हिस्सा लेना / शामिल होना',
      rule:
        'Three idiomatic ways to say "took part". All take the event as a noun + में. भाग / हिस्सा are masculine, so with ने the verb reads भाग लिया / हिस्सा लिया (not ली).',
      examples: [
        { hindi: 'मैंने नाटक में भाग लिया।', transliteration: 'maine naatak mein bhaag liya.', english: 'I took part in the play.' },
        { hindi: 'कई छात्रों ने विज्ञान मेले में हिस्सा लिया।', transliteration: 'kai chhaatron ne vigyaan mele mein hissa liya.', english: 'Many students took part in the science fair.' },
        { hindi: 'मेरी बहन सांस्कृतिक कार्यक्रम में शामिल हुई।', transliteration: 'meri bahan saanskritik kaaryakram mein shaamil hui.', english: 'My sister joined / was part of the cultural program. (शामिल होना is intransitive — no ने!)' },
      ],
      pitfall:
        'शामिल होना is INTRANSITIVE (like जाना, आना) — no ने. Writing "मैंने शामिल हुआ" is wrong; write "मैं शामिल हुआ/हुई". Meanwhile भाग / हिस्सा लेना IS transitive — use ने.',
      whyItMatters:
        'These three phrases will appear in almost every school-activity essay. Getting ने right on two of them and NOT using ने on the third demonstrates real control — exactly the "Average" Language Control rubric descriptor.',
    },
  ],
  grammarNote: {
    why:
      'Event essays live and die on these three rules. Past perfective with correct object agreement, the habitual/perfective split, and participation-verb frames together account for the large majority of Language Control errors on school-activity prompts.',
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
    'jabTab',
  ]),
  connectorsNote: {
    why:
      'For event narration, पहले / फिर / इसके बाद / अंत में scaffold the timeline. जब ... तब anchors a specific moment inside the event. क्योंकि / इसलिए / लेकिन supply the why, the consequence, and the twist — the three moves that turn a list of sentences into a narrative.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'हमारा खेल दिवस · Our Sports Day',
    hindi:
      'पिछले साल हमारे स्कूल में खेल दिवस बहुत धूमधाम से मनाया गया। पहले प्रधानाचार्य ने झंडा फहराया, फिर सभी टीमें मैदान में आईं। मैं अपनी कक्षा की क्रिकेट टीम का कप्तान था, और हम हर शाम एक घंटा अभ्यास करते थे। इसलिए हम बहुत तैयार थे। जब मैच शुरू हुआ, तब सामने की टीम ने पहले बल्लेबाज़ी की। उन्होंने अच्छे रन बनाए, लेकिन हमारी गेंदबाज़ी मज़बूत थी। इसके बाद हमारी पारी आई। मैंने तीस रन बनाए और हमने आख़िरी गेंद पर मैच जीता। अंत में प्रधानाचार्य ने हमें चमकती हुई ट्रॉफ़ी और प्रमाणपत्र दिए। पूरा सभागार तालियों से गूँज उठा। वह दिन मेरे लिए सबसे यादगार दिन था।',
    transliteration:
      'pichhle saal hamaare school mein khel divas bahut dhoomdhaam se manaaya gaya. pahle pradhaanaachaarya ne jhanda phaharaaya, phir sabhi teamein maidaan mein aayin. main apni kaksha ki cricket team ka kaptaan tha, aur hum har shaam ek ghanta abhyaas karte the. isliye hum bahut taiyaar the. jab match shuru hua, tab saamne ki team ne pahle ballebaazi ki. unhonne achchhe run banaaye, lekin hamaari gendbaazi mazboot thi. iske baad hamaari paari aayi. maine tees run banaaye aur humne aakhiri gend par match jeeta. ant mein pradhaanaachaarya ne humein chamakti hui trophy aur pramaanpatra diye. poora sabhaagaar taaliyon se goonj utha. vah din mere liye sabse yaadgaar din tha.',
    english:
      'Last year sports day was celebrated with great fanfare at our school. First the principal hoisted the flag, then all the teams came onto the field. I was the captain of my class cricket team, and we used to practise for an hour every evening. So we were very well prepared. When the match started, the opposing team batted first. They scored well, but our bowling was strong. After this, our innings came. I scored thirty runs and we won the match on the final ball. In the end the principal gave us a shining trophy and certificates. The whole auditorium echoed with applause. That day was the most memorable day for me.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors scaffold the whole event from flag to trophy — classic Text-Type 5.' },
      { term: 'करते थे vs. बनाए / जीता', note: 'Past-habitual (अभ्यास करते थे) sits inside a past-perfective narrative — exactly the tense mixture raters check for.' },
      { term: 'मैंने ... बनाए / हमने ... जीता', note: 'Two ने constructions with correct object agreement. Clean Language Control signal.' },
      { term: 'प्रधानाचार्य, ट्रॉफ़ी, प्रमाणपत्र, तालियाँ', note: 'Four topic-specific event nouns in one sentence — Topic Coverage boost without padding.' },
      { term: 'झंडा फहराया', note: 'Culturally specific: Indian school events begin with flag-hoisting. Authenticity lifts Topic Coverage.' },
    ],
    comprehensionQuestions: [
      { q: 'When did this sports day happen?', a: 'पिछले साल (last year).' },
      { q: 'What did the principal do first?', a: 'उन्होंने झंडा फहराया — he hoisted the flag.' },
      { q: 'What role did the narrator play on the cricket team?', a: 'कप्तान — captain.' },
      { q: 'How much did the team practise?', a: 'हर शाम एक घंटा — one hour every evening (past-habitual).' },
      { q: 'Which team batted first?', a: 'सामने की टीम — the opposing team.' },
      { q: 'How many runs did the narrator score?', a: 'तीस रन.' },
      { q: 'What did the team receive at the end?', a: 'ट्रॉफ़ी और प्रमाणपत्र — trophy and certificates.' },
      { q: 'Find one past-habitual verb and one past-perfective verb.', a: 'Habitual: अभ्यास करते थे. Perfective: हमने जीता / मैंने बनाए.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a spec of what a passing event narrative looks like on school-activities: past-habitual for the build-up, past-perfective for the event, specific Indian-school detail (flag, principal, auditorium), and a reflective closing. The student should mirror this INPUT sentence shape by sentence shape.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'announcement',
      title: 'सूचना पट्ट · Noticeboard',
      hindi:
        'सूचना: कल प्रातः 8:00 बजे विज्ञान मेला सभागार में होगा। सभी क्लब अपने मॉडल सुबह 7:30 तक लगा दें। पुरस्कार वितरण 12:00 बजे होगा। प्रधानाचार्य जी मुख्य अतिथि होंगे। — विज्ञान क्लब प्रभारी',
      transliteration:
        'soochna: kal praatah 8:00 baje vigyaan mela sabhaagaar mein hoga. sabhi club apne model subah 7:30 tak laga dein. puraskaar vitaran 12:00 baje hoga. pradhaanaachaarya ji mukhya atithi honge. — vigyaan club prabhaari',
      english:
        'Notice: Tomorrow at 8:00 a.m. the Science Fair will be held in the auditorium. All clubs must set up their models by 7:30 a.m. Prize distribution will be at 12:00. The Principal will be the chief guest. — Science Club In-Charge',
    },
    {
      kind: 'diary',
      title: 'डायरी पृष्ठ · Diary Page',
      hindi:
        'आज हमारी शैक्षिक यात्रा लाल किले पर गई। पहले गाइड ने हमें इतिहास बताया, फिर हमने तस्वीरें लीं। दोपहर को टीचर ने सबको समोसे दिए। वापस बस में हमने गाने गाए। मैं बहुत थक गई थी, लेकिन दिन बहुत यादगार रहा।',
      transliteration:
        'aaj hamaari shaikshik yaatra laal kile par gayi. pahle guide ne humein itihaas bataaya, phir humne tasveerein leen. dopahar ko teacher ne sabko samose diye. vaapas bus mein humne gaane gaaye. main bahut thak gayi thi, lekin din bahut yaadgaar raha.',
      english:
        'Today our educational trip went to the Red Fort. First the guide told us the history, then we took photos. At noon the teacher gave samosas to everyone. On the bus back we sang songs. I was very tired, but the day was very memorable.',
    },
    {
      kind: 'poster',
      title: 'पोस्टर · Annual Day Poster',
      hindi:
        '🎉 वार्षिक समारोह 2026 🎉\nदिनांक: 20 दिसंबर | समय: शाम 5 बजे\nस्थान: स्कूल सभागार\n• नृत्य प्रदर्शन\n• नाटक: "अंधेर नगरी"\n• संगीत क्लब की प्रस्तुति\n• पुरस्कार वितरण\nसब का स्वागत है!',
      transliteration:
        'vaarshik samaaroh 2026 | dinaank: 20 disambar | samay: shaam 5 baje | sthaan: school sabhaagaar | nritya pradarshan | naatak: andher nagari | sangeet club ki prastuti | puraskaar vitaran | sab ka svaagat hai!',
      english:
        'Annual Day 2026. Date: December 20. Time: 5 p.m. Venue: School Auditorium. Dance performance. Drama: "Andher Nagari". Music club presentation. Prize distribution. Everyone is welcome!',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! कल के मैच में हम जीत गए 🏆 मैंने तीस रन बनाए। कप्तान ने मुझे "मैन ऑफ़ द मैच" कहा 😄 तू कल प्रैक्टिस में आ रहा है ना?',
      transliteration:
        'are! kal ke match mein hum jeet gaye. maine tees run banaaye. kaptaan ne mujhe "man of the match" kaha. tu kal practice mein aa raha hai na?',
      english:
        'Hey! We won yesterday\'s match. I scored thirty runs. The captain called me "Man of the Match". You\'re coming to practice tomorrow, right?',
    },
  ],
  modelTextsNote: {
    why:
      'A noticeboard (formal school register), a diary entry (personal past narrative), a poster (schedule-style), and an SMS (casual) — four registers the student may be asked to imitate. Each shows specific school-activity vocabulary behaving differently across formality levels.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Annual Day (वार्षिक समारोह)',
      body:
        'Every Indian school holds one big annual function — dances, a play, speeches, a chief guest, and prize distribution, usually stretching from 5 p.m. to nearly 10 p.m. Referencing it ("हमारा वार्षिक समारोह दिसंबर में होता है") signals authentic school experience.',
      emoji: '🎉',
    },
    {
      title: 'Sports Day & the Four Houses',
      body:
        'Most schools split students into "houses" (लाल, नीला, हरा, पीला) that compete on खेल दिवस for the house cup. Dropping "मैं नीले घर में था" into an essay is an instant cultural specific.',
      emoji: '🏅',
    },
    {
      title: 'Science Fair (विज्ञान प्रदर्शनी)',
      body:
        'A half-day event where students set up working models — solar cookers, DC motors, volcanoes. Judges (usually teachers or an outside विशेषज्ञ) walk table to table. The best model wins a प्रमाणपत्र and sometimes goes to a district-level fair.',
      emoji: '🔬',
    },
    {
      title: 'Independence Day at School (15 अगस्त)',
      body:
        'Classes are suspended; the principal hoists the tricolour; students sing the national anthem and "वंदे मातरम्"; laddoos are distributed. A near-universal memory for Indian students and a ready-made essay hook.',
      emoji: '🇮🇳',
    },
    {
      title: 'Cultural Program (सांस्कृतिक कार्यक्रम)',
      body:
        'The dance-and-music showcase tucked inside every festival or annual event. Children perform classical (भरतनाट्यम, कथक), folk (गरबा, भांगड़ा), and Bollywood pieces. Mentioning a specific dance form beats "they danced nicely".',
      emoji: '💃',
    },
  ],
  culturalNote: {
    why:
      'A school-activity essay without one India-specific hook ("tricolour", "चार घर", "सांस्कृतिक कार्यक्रम") reads like a template. One concrete cultural marker — even a single phrase — shifts Topic Coverage from generic to authentic without costing grammar risk.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'चार चाँद लगाना',
      literal: 'to affix four moons',
      meaning: 'To greatly enhance something; to make it truly shine.',
      example: 'संगीत क्लब की प्रस्तुति ने वार्षिक समारोह में चार चाँद लगा दिए।',
      exampleEnglish: "The music club's performance made the annual function truly shine.",
    },
    {
      phrase: 'मन लगाकर',
      literal: 'applying the mind',
      meaning: 'Wholeheartedly; with focused effort.',
      example: 'हमारी टीम ने मन लगाकर अभ्यास किया और मैच जीता।',
      exampleEnglish: 'Our team practised wholeheartedly and won the match.',
    },
  ],
  muhavareNote: {
    why:
      'चार चाँद लगाना fits event-performance essays (annual day, cultural program) like a glove. मन लगाकर suits preparation or practice descriptions. Use ONE per essay — a single well-placed idiom reads as register mastery, two reads as showing off.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt: 'अपने स्कूल की किसी यादगार गतिविधि के बारे में तीन अनुच्छेदों में लिखो। (Write three paragraphs about a memorable activity at your school.)',
      novice:
        'मुझे स्कूल पसंद है। हमने मैच खेला। हम जीते।',
      intermediateMid:
        'पिछले साल हमारे स्कूल में खेल दिवस बड़े उत्साह से मनाया गया। मैं अपनी कक्षा की क्रिकेट टीम का कप्तान था। हम रोज़ शाम को एक घंटा अभ्यास करते थे, क्योंकि हम ट्रॉफ़ी जीतना चाहते थे। इसलिए पूरी टीम ने मन लगाकर तैयारी की।\n\nजब मैच शुरू हुआ, तब सामने की टीम ने पहले बल्लेबाज़ी की। उन्होंने अच्छे रन बनाए, लेकिन हमारी गेंदबाज़ी मज़बूत थी। इसके बाद हमारी पारी आई। मैंने तीस रन बनाए और हमने आख़िरी गेंद पर मैच जीता। अंत में प्रधानाचार्य ने हमें चमकती हुई ट्रॉफ़ी और प्रमाणपत्र दिए।\n\nवह दिन मेरे लिए सबसे यादगार था। आज भी जब मैं वह ट्रॉफ़ी देखता हूँ, मुझे बहुत गर्व होता है। अगले साल मैं विज्ञान मेले में भी भाग लूँगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले साल ... मनाया गया', note: 'Past perfective (passive) opens the essay with a clean time anchor.' },
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'हम रोज़ ... अभ्यास करते थे', note: 'Past-habitual for the build-up — exactly the rubric-rewarded tense mixture.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / इसलिए', note: 'Reason + consequence in adjacent sentences — Text-Type lift.' },
        { paragraphIndex: 0, kind: 'idiom', highlight: 'मन लगाकर', note: 'One school-appropriate muhavara placed naturally, not appended.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'जब ... तब / इसके बाद / लेकिन', note: 'Three connectors scaffold the match narrative — sentences cannot be rearranged.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'बल्लेबाज़ी / गेंदबाज़ी / रन / पारी', note: 'Topic-specific cricket nouns — Topic Coverage far above "we played a match".' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'मैंने ... बनाए / हमने ... जीता', note: 'Two ने constructions with correct object agreement in one paragraph — Language Control signal.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'देखता हूँ / अगले साल ... भाग लूँगा', note: 'Present-reflection + future commitment — third time frame secured.' },
      ],
      wordCount: 126,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'इसलिए', 'जब... तब', 'लेकिन', 'इसके बाद', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three time frames controlled within 126 words: past-habitual (अभ्यास करते थे), past-perfective (हमने जीता), present (देखता हूँ), future (भाग लूँगा). IM rubric for "control of major time frames" is met.',
          'Six distinct connectors used correctly — well above the 3-connector threshold for Text-Type 5.',
          'Two ने constructions (मैंने ... बनाए, हमने ... जीता) show perfective-with-object-agreement control — the single biggest Language Control differentiator at this level.',
          'Topic-specific cricket vocabulary (बल्लेबाज़ी, गेंदबाज़ी, पारी, रन, ट्रॉफ़ी, प्रमाणपत्र) makes the response unmistakably on-topic.',
          'Reflective closing (आज भी ... गर्व होता है) signals Intermediate-Mid abstraction beyond mere event reporting.',
        ],
        gotchas: [
          'Writing "हम जीते" instead of "हमने जीता" drops Language Control immediately — always use ने for past transitive verbs.',
          'If the student wrote everything in present ("हम खेलते हैं, जीतते हैं"), the essay would cap at Benchmark 4 despite identical vocabulary.',
        ],
      },
    },
    {
      prompt:
        'अपनी स्कूल की किसी शैक्षिक यात्रा या पिकनिक के बारे में तीन अनुच्छेदों में लिखो। (Write three paragraphs about an educational trip or picnic your school went on.)',
      novice: 'हम यात्रा पर गए। खाना अच्छा था। हम घर आए।',
      intermediateMid:
        'पिछले नवंबर में हमारी कक्षा की एक शैक्षिक यात्रा आगरा गई थी। हम सुबह छह बजे स्कूल से निकले और दोपहर तक ताज महल पहुँचे। पहले गाइड ने हमें इतिहास बताया, फिर हमने पूरा महल देखा। गाइड की बातें सुनकर मेरा मन खुश हो गया, क्योंकि मुझे इतिहास बहुत पसंद है।\n\nइसके बाद टीचर हमें पास के एक बगीचे में ले गए। वहाँ हमने पिकनिक की और साथ में समोसे और लस्सी खाए-पिए। कुछ बच्चों ने गाने गाए, कुछ ने तस्वीरें लीं। मैंने और मेरी सहेली ने एक छोटा वीडियो बनाया। लेकिन शाम को बस में सब बहुत थक गए थे।\n\nवापस घर लौटने पर मैंने माँ को पूरी यात्रा सुनाई। आज भी वह दिन मुझे याद है। अगले साल हमारी यात्रा जयपुर जाएगी, और मैं फिर से भाग लूँगी।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले नवंबर में ... गई थी', note: 'Past perfect opens the narrative — a sophisticated past anchor.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... क्योंकि', note: 'Sequence + reason packed in one paragraph.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'शैक्षिक यात्रा / गाइड / इतिहास', note: 'Trip-specific vocabulary, not generic "we went somewhere".' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'हमने ... खाए-पिए / गाने गाए / तस्वीरें लीं', note: 'Four past-perfective verbs with correct object agreement (खाए-पिए masc pl, गाए masc pl, तस्वीरें लीं fem pl) — Language Control showcase.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'लेकिन', note: 'Contrast breaks monotony — keeps Text-Type from flattening.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'याद है / जाएगी / भाग लूँगी', note: 'Present + future in the closing — three time frames sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'आज भी वह दिन मुझे याद है', note: 'Reflective generalization — Intermediate-Mid move.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'क्योंकि', 'इसके बाद', 'लेकिन'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Four past-perfective verbs in paragraph 2 with correct object-gender agreement (खाए, पिए, गाए, लीं) — the exact feature raters scan for at IM.',
          'Three time frames (past, present-reflection, future) are each anchored by explicit time markers: पिछले नवंबर, आज भी, अगले साल.',
          'Topic-specific trip vocabulary (शैक्षिक यात्रा, ताज महल, गाइड, पिकनिक, समोसे, लस्सी) keeps Topic Coverage dense throughout.',
          'The reflective-close pattern (याद है → future plan) is exactly the structural move Benchmark 5 essays use to avoid ending mid-event.',
          'Consistent feminine narrator voice (भाग लूँगी, मेरी सहेली) — inner Language Control consistency.',
        ],
        gotchas: [
          'Mixing "मैं गया" and "मैंने किया" for a female narrator drops Language Control fast — keep gender consistent across all verbs.',
          'Dropping the future sentence (अगले साल ... जाएगी) would cut the essay to two time frames and likely drop to Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two event-narrative model essays — one sports, one trip — that both hit the rubric\'s must-haves: past-perfective with correct object agreement, past-habitual for build-up, a present-reflection turn, and a future-tense close. Study the verdict cards; raters think in those boxes.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने स्कूल में मनाए गए किसी खास आयोजन (खेल दिवस, वार्षिक समारोह, या विज्ञान मेला) के बारे में तीन अनुच्छेदों में लिखिए। बताइए क्या तैयारी हुई, आयोजन के दिन क्या हुआ, और आपको क्या सबसे अच्छा लगा।',
      english:
        'Write three paragraphs about a special event at your school (sports day, annual function, or science fair). Describe the preparation, what happened on the day, and what you liked best.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'अंत में'],
        vocab: ['वार्षिक समारोह', 'टीम', 'अभ्यास करना', 'पुरस्कार', 'यादगार'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'किसी स्कूल क्लब (क्रिकेट, संगीत, नाटक या विज्ञान) में अपने अनुभव को तीन अनुच्छेदों में वर्णित कीजिए। आप क्लब में कब शामिल हुए, क्लब में क्या होता था, और आपने क्या सीखा, यह लिखिए।',
      english:
        'Describe your experience in a school club (cricket, music, drama, or science) in three paragraphs. Write about when you joined, what used to happen at the club, and what you learned.',
      hint: {
        connectors: ['जब... तब', 'इसके बाद', 'लेकिन', 'इसलिए'],
        vocab: ['क्लब', 'भाग लेना', 'प्रदर्शन', 'अभ्यास करना', 'सदस्य'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'अपनी स्कूल की एक यादगार शैक्षिक यात्रा या पिकनिक के बारे में तीन अनुच्छेदों में लिखिए — कहाँ गए, वहाँ क्या किया, और अगले साल कहाँ जाना चाहेंगे।',
      english:
        'Write three paragraphs about a memorable educational trip or picnic — where you went, what you did there, and where you would like to go next year.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में'],
        vocab: ['शैक्षिक यात्रा', 'पिकनिक', 'भ्रमण', 'तस्वीर', 'यादगार'],
        tenses: ['past', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is shaped to demand past-perfective narration plus at least one other tense — exactly the Benchmark 5 target. The hint strip names the language goals for the essay, not the answer: the student should use those connectors and vocab items but build the content themselves.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay you write in this pack against the STAMP rubric. If your essay lacks a ने-construction past-perfective verb, a past-habitual sentence, or a future-tense closing — go back and add them BEFORE moving on. These three features are what push school-activity essays from Benchmark 4 (2 credits) to Benchmark 5 (3 credits).',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
