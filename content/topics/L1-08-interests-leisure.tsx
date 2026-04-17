import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L1-08-interests-leisure',
  level: 1,
  themeGroup: 'Identity',
  order: 8,
  heroMotif: 'cricket',
  titleHindi: 'रुचियाँ और मनोरंजन',
  titleEnglish: 'Interests & Leisure Activities',
  hook: '"What do you like?" is a guaranteed prompt. Arrive with five connected sentences, not five words.',
  heroPrompt: composeHeroPrompt(
    'A flat-lay of hobby objects — cricket bat, chess board, sitar, paintbrushes, cricket ball — scattered on a kurta-textured background',
  ),

  rationale: {
    fcpsSubTopics: [
      'Interests and Leisure Activities (FCPS Level 1 — Social Life)',
      'Hobbies and free time (FCPS Level 1)',
      'Likes/dislikes and personal preferences (FCPS Level 1 — Identity)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Describe three hobbies in connected paragraphs using present + past + future tenses',
      'Use "मुझे ... पसंद है/हैं" correctly with nouns (singular/plural) and with verb infinitives',
      'Compare two activities using "X से ज़्यादा Y पसंद है"',
      'Add at least one culturally specific Indian pastime (cricket, antakshari, kite-flying) to an essay',
      'Sustain a 100–150 word essay that would score STAMP Benchmark 5 on any "what do you like" prompt',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      '"What do you like to do?" is one of the three most frequent FCPS Level 1 prompts. Without this pack the student defaults to "मुझे क्रिकेट पसंद है। अच्छा है।" — two memorized fragments, Benchmark 3 at best, 1 credit.',
  },

  objectives: [
    {
      text: 'Name at least 8 hobbies and 6 leisure verbs in Hindi without looking them up.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Use "मुझे ... पसंद है" with a singular noun, "पसंद हैं" with a plural noun, and "करना पसंद है" with an infinitive verb — in the same essay.',
      trains: ['LanguageControl', 'TextType'],
    },
    {
      text: 'Compare two hobbies using "X से ज़्यादा Y पसंद है" at least once per essay.',
      trains: ['TextType'],
    },
    {
      text: 'Shift across past (favorite memory), present (weekly habit), and future (plan to try) in one 3-paragraph response.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Include at least one culturally specific Indian hobby — cricket, antakshari, kite-flying, Bollywood — to lift Topic Coverage.',
      trains: ['TopicCoverage'],
    },
  ],

  vocabulary: [
    // Hobbies — nouns
    { hindi: 'क्रिकेट', transliteration: 'cricket', english: 'cricket', exampleHindi: 'मुझे क्रिकेट पसंद है।', exampleEnglish: 'I like cricket.', emoji: '🏏', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'बैडमिंटन', transliteration: 'badminton', english: 'badminton', exampleHindi: 'शाम को हम बैडमिंटन खेलते हैं।', exampleEnglish: 'In the evening we play badminton.', emoji: '🏸', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'शतरंज', transliteration: 'shatranj', english: 'chess', exampleHindi: 'पिताजी के साथ मैं शतरंज खेलता हूँ।', exampleEnglish: 'I play chess with my father.', emoji: '♟️', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'चित्रकारी', transliteration: 'chitrakaari', english: 'painting / drawing', exampleHindi: 'मुझे चित्रकारी बहुत पसंद है।', exampleEnglish: 'I love painting very much.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'गायन', transliteration: 'gaayan', english: 'singing', exampleHindi: 'गायन मेरा सबसे बड़ा शौक़ है।', exampleEnglish: 'Singing is my biggest hobby.', emoji: '🎤', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'नृत्य', transliteration: 'nritya', english: 'dance', exampleHindi: 'मेरी बहन को नृत्य पसंद है।', exampleEnglish: 'My sister likes dance.', emoji: '💃', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'पढ़ाई', transliteration: 'padhaai', english: 'reading / study', exampleHindi: 'मुझे पढ़ाई पसंद है।', exampleEnglish: 'I like reading.', emoji: '📚', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'लेखन', transliteration: 'lekhan', english: 'writing', exampleHindi: 'लेखन से मन शांत होता है।', exampleEnglish: 'Writing calms the mind.', emoji: '✍️', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'वीडियो गेम', transliteration: 'video game', english: 'video games', exampleHindi: 'मेरा भाई रोज़ वीडियो गेम खेलता है।', exampleEnglish: 'My brother plays video games every day.', emoji: '🎮', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'फ़िल्म', transliteration: 'film', english: 'movie / film', exampleHindi: 'हम शनिवार को एक फ़िल्म देखते हैं।', exampleEnglish: 'We watch a movie on Saturday.', emoji: '🎬', partOfSpeech: 'noun', subgroup: 'Hobbies' },
    { hindi: 'संगीत', transliteration: 'sangeet', english: 'music', exampleHindi: 'संगीत के बिना मेरा दिन अधूरा है।', exampleEnglish: 'My day is incomplete without music.', emoji: '🎵', partOfSpeech: 'noun', subgroup: 'Hobbies' },

    // Leisure verbs
    { hindi: 'खेलना', transliteration: 'khelna', english: 'to play', exampleHindi: 'मुझे क्रिकेट खेलना पसंद है।', exampleEnglish: 'I like to play cricket.', emoji: '⚽', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'देखना', transliteration: 'dekhna', english: 'to watch / see', exampleHindi: 'हम मैच देखते हैं।', exampleEnglish: 'We watch the match.', emoji: '👀', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'सुनना', transliteration: 'sunna', english: 'to listen', exampleHindi: 'मैं रोज़ संगीत सुनता हूँ।', exampleEnglish: 'I listen to music every day.', emoji: '🎧', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'पढ़ना', transliteration: 'padhna', english: 'to read', exampleHindi: 'मुझे किताबें पढ़ना पसंद है।', exampleEnglish: 'I like to read books.', emoji: '📖', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'बनाना', transliteration: 'banana', english: 'to make / create', exampleHindi: 'मैं चित्र बनाता हूँ।', exampleEnglish: 'I make paintings.', emoji: '🖌️', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'ख़रीदना', transliteration: 'khareedna', english: 'to buy', exampleHindi: 'मैंने एक नई किताब ख़रीदी।', exampleEnglish: 'I bought a new book.', emoji: '🛒', partOfSpeech: 'verb', subgroup: 'Verbs' },

    // Feeling + hobby vocabulary
    { hindi: 'रुचि', transliteration: 'ruchi', english: 'interest', exampleHindi: 'मेरी रुचि संगीत में है।', exampleEnglish: 'My interest is in music.', emoji: '✨', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'शौक़', transliteration: 'shauq', english: 'hobby / passion', exampleHindi: 'मेरा शौक़ चित्रकारी है।', exampleEnglish: 'My hobby is painting.', emoji: '💖', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'मज़ा', transliteration: 'mazaa', english: 'fun', exampleHindi: 'शतरंज में बहुत मज़ा आता है।', exampleEnglish: 'Chess is a lot of fun.', emoji: '😄', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'आनंद', transliteration: 'aanand', english: 'joy / delight', exampleHindi: 'नृत्य से मुझे आनंद मिलता है।', exampleEnglish: 'Dance gives me joy.', emoji: '🌟', partOfSpeech: 'noun', subgroup: 'Feelings' },
    { hindi: 'पसंदीदा', transliteration: 'pasandeeda', english: 'favorite', exampleHindi: 'क्रिकेट मेरा पसंदीदा खेल है।', exampleEnglish: 'Cricket is my favorite sport.', emoji: '🏆', partOfSpeech: 'adjective', subgroup: 'Feelings' },

    // Social context
    { hindi: 'दोस्त', transliteration: 'dost', english: 'friend', exampleHindi: 'मैं दोस्तों के साथ खेलता हूँ।', exampleEnglish: 'I play with friends.', emoji: '👫', partOfSpeech: 'noun', subgroup: 'Social' },
    { hindi: 'परिवार', transliteration: 'parivaar', english: 'family', exampleHindi: 'परिवार के साथ फ़िल्म देखना अच्छा लगता है।', exampleEnglish: 'Watching a movie with family feels good.', emoji: '👨‍👩‍👧', partOfSpeech: 'noun', subgroup: 'Social' },
    { hindi: 'अकेले', transliteration: 'akele', english: 'alone', exampleHindi: 'मुझे अकेले पढ़ना अच्छा लगता है।', exampleEnglish: 'I like reading alone.', emoji: '🧍', partOfSpeech: 'adverb', subgroup: 'Social' },

    // Frequency
    { hindi: 'रोज़', transliteration: 'roz', english: 'every day', exampleHindi: 'मैं रोज़ शतरंज खेलता हूँ।', exampleEnglish: 'I play chess every day.', emoji: '📅', partOfSpeech: 'adverb', subgroup: 'Frequency' },
    { hindi: 'हफ़्ते में', transliteration: 'hafte mein', english: 'per week / in a week', exampleHindi: 'हफ़्ते में दो बार मैं नृत्य सीखती हूँ।', exampleEnglish: 'Twice a week I learn dance.', emoji: '🗓️', partOfSpeech: 'phrase', subgroup: 'Frequency' },
    { hindi: 'कभी-कभी', transliteration: 'kabhi-kabhi', english: 'sometimes', exampleHindi: 'कभी-कभी मैं वीडियो गेम भी खेलता हूँ।', exampleEnglish: 'Sometimes I also play video games.', emoji: '⏳', partOfSpeech: 'adverb', subgroup: 'Frequency' },
  ],
  vocabularyNote: {
    why:
      'These 28 words are the narrow set that "What do you like to do?" prompts keep pulling from. Hobbies, the verbs that go with them, feeling words (शौक़, मज़ा, आनंद), and frequency adverbs let a student build 6+ specific sentences without generic filler. Learn this list first and Topic-Coverage is guaranteed.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'मुझे ... पसंद है vs पसंद हैं vs करना पसंद है',
      rule:
        'The verb पसंद होना agrees with the THING liked, not with मुझे. Use पसंद है with a singular noun ("मुझे क्रिकेट पसंद है"), पसंद हैं with a plural noun ("मुझे फ़िल्में पसंद हैं"), and पसंद है + verb-infinitive ("मुझे खेलना पसंद है" — "to play" is singular, so है, not हैं).',
      examples: [
        { hindi: 'मुझे शतरंज पसंद है।', transliteration: 'mujhe shatranj pasand hai.', english: 'I like chess. (singular noun)' },
        { hindi: 'मुझे पुरानी फ़िल्में पसंद हैं।', transliteration: 'mujhe puraani filmein pasand hain.', english: 'I like old movies. (plural noun → हैं)' },
        { hindi: 'मुझे गाना गाना पसंद है।', transliteration: 'mujhe gaana gaana pasand hai.', english: 'I like to sing a song. (infinitive verb → है)' },
      ],
      pitfall:
        'Students often write "मुझे फ़िल्में पसंद है" (singular verb with plural noun). Raters flag this every time — it is the most common Language-Control error on hobby essays.',
      whyItMatters:
        'This construction appears in literally every hobby essay. One correct पसंद हैं with a plural noun shows the rater you understand number agreement on a copula verb — a clean Language Control signal.',
    },
    {
      title: 'Comparing preferences with X से ज़्यादा Y पसंद है',
      rule:
        'To say "I like Y more than X," use the structure "मुझे X से ज़्यादा Y पसंद है" — literally "from X more, I like Y." से is a postposition meaning "than" in this frame; ज़्यादा means "more".',
      examples: [
        { hindi: 'मुझे क्रिकेट से ज़्यादा बैडमिंटन पसंद है।', transliteration: 'mujhe cricket se zyaada badminton pasand hai.', english: 'I like badminton more than cricket.' },
        { hindi: 'मेरी बहन को नृत्य से ज़्यादा गायन पसंद है।', transliteration: 'meri bahan ko nritya se zyaada gaayan pasand hai.', english: 'My sister likes singing more than dance.' },
        { hindi: 'पिताजी को फ़िल्मों से ज़्यादा किताबें पसंद हैं।', transliteration: 'pitaji ko filmon se zyaada kitaabein pasand hain.', english: 'Father likes books more than movies.' },
      ],
      pitfall:
        'Dropping से and writing "ज़्यादा X, Y पसंद है" makes the comparison collapse. Also, using "से" with English word order ("badminton से cricket ज़्यादा पसंद है") inverts the meaning.',
      whyItMatters:
        'A single correct comparison moves the essay out of "list of likes" territory into real discourse. Raters explicitly reward comparison as Intermediate-Mid Text-Type.',
    },
    {
      title: 'Frequency adverbs: रोज़ / हफ़्ते में / कभी-कभी',
      rule:
        'Frequency adverbs attach to present-habitual verbs (करता हूँ, खेलते हैं). रोज़ = every day, हफ़्ते में दो बार = twice a week, कभी-कभी = sometimes. They go early in the sentence, usually right after the subject.',
      examples: [
        { hindi: 'मैं रोज़ एक घंटा क्रिकेट खेलता हूँ।', transliteration: 'main roz ek ghanta cricket khelta hoon.', english: 'I play cricket for an hour every day.' },
        { hindi: 'हफ़्ते में दो बार मैं चित्र बनाती हूँ।', transliteration: 'hafte mein do baar main chitra banaati hoon.', english: 'Twice a week I paint.' },
        { hindi: 'कभी-कभी मैं दोस्तों के साथ फ़िल्म देखता हूँ।', transliteration: 'kabhi-kabhi main doston ke saath film dekhta hoon.', english: 'Sometimes I watch a movie with friends.' },
      ],
      pitfall:
        'Students often write frequency adverbs at the end of the sentence in English order. In Hindi, put them right after the subject or at the very start of the sentence.',
      whyItMatters:
        'Frequency adverbs turn "I like X" into "I do X with this rhythm" — instantly converting a Novice list into an Intermediate description. That is a direct Text-Type lift.',
    },
  ],
  grammarNote: {
    why:
      'These three rules fix the three exact errors that collapse every hobby essay: wrong पसंद है/हैं agreement, missing comparison structure, and English-ordered frequency adverbs. Fix these and Language Control stabilizes at Average — enough for Benchmark 5.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'mujheLagta',
  ]),
  connectorsNote: {
    why:
      'पहले / फिर sequence your daily or weekly routine. क्योंकि + लेकिन let you say "why I like it" and "why I do not like this other thing." इसलिए closes the reasoning. इसके अलावा adds a second hobby cleanly. मुझे लगता है कि is the reflective opener raters reward in the closing paragraph.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरी तीन पसंदीदा चीज़ें · My Three Favorite Things',
    hindi:
      'मुझे तीन चीज़ें बहुत पसंद हैं — क्रिकेट, चित्रकारी और संगीत। पहले क्रिकेट की बात करती हूँ। मैं हफ़्ते में तीन बार अपने दोस्तों के साथ पार्क में क्रिकेट खेलती हूँ, क्योंकि इससे मुझे बहुत मज़ा आता है। फिर चित्रकारी भी मेरा बड़ा शौक़ है। मुझे अकेले बैठकर रंग भरना अच्छा लगता है, इसलिए रविवार को मैं नए चित्र बनाती हूँ। इसके अलावा मुझे पुराने हिंदी गाने सुनना भी पसंद है, लेकिन मेरी बहन को नए गाने ज़्यादा पसंद हैं। पिछले महीने हमने घर में अंताक्षरी खेली, और बहुत हँसी आई। मुझे लगता है कि अगले साल मैं गिटार भी सीखूँगी।',
    transliteration:
      'mujhe teen cheezein bahut pasand hain — cricket, chitrakaari aur sangeet. pahle cricket ki baat karti hoon. main hafte mein teen baar apne doston ke saath park mein cricket khelti hoon, kyonki isse mujhe bahut mazaa aata hai. phir chitrakaari bhi mera bada shauq hai. mujhe akele baithkar rang bharna achchha lagta hai, isliye ravivaar ko main naye chitra banaati hoon. iske alawa mujhe puraane hindi gaane sunna bhi pasand hai, lekin meri bahan ko naye gaane zyaada pasand hain. pichhle mahine humne ghar mein antakshari kheli, aur bahut hansi aayi. mujhe lagta hai ki agle saal main guitar bhi seekhoongi.',
    english:
      'I really like three things — cricket, painting, and music. First, let me talk about cricket. Three times a week I play cricket with my friends in the park, because it gives me a lot of fun. Then painting is also my big hobby. I like sitting alone and filling in colors, so on Sundays I make new paintings. Besides this, I also like listening to old Hindi songs, but my sister likes new songs more. Last month we played antakshari at home, and it was a lot of laughs. I think that next year I will also learn guitar.',
    highlights: [
      { term: 'पहले / फिर / इसके अलावा', note: 'Three connectors sequence the three hobbies into an ordered paragraph — classic Text-Type 5 structure.' },
      { term: 'पसंद है vs पसंद हैं', note: 'Watch the shift: क्रिकेट पसंद है (singular), पुराने गाने पसंद हैं (plural). Both forms in one passage = Language Control signal.' },
      { term: 'हफ़्ते में तीन बार / रविवार को / पिछले महीने / अगले साल', note: 'Four time markers pull the passage across past, present-habitual, and future — three time frames in one passage.' },
      { term: 'अंताक्षरी', note: 'Culturally specific music game. One Indian word like this lifts Topic Coverage above generic hobby lists.' },
      { term: 'क्योंकि / लेकिन / इसलिए / मुझे लगता है कि', note: 'Four reasoning connectors — not just sequence, but cause and contrast. Intermediate-Mid territory.' },
    ],
    comprehensionQuestions: [
      { q: 'How many favorite things does the narrator name, and what are they?', a: 'Three — क्रिकेट, चित्रकारी, और संगीत.' },
      { q: 'How often does she play cricket and where?', a: 'Three times a week (हफ़्ते में तीन बार) with friends in the park.' },
      { q: 'What is her sister\'s different preference?', a: 'Her sister likes new songs more, while the narrator likes old Hindi songs.' },
      { q: 'What past event does the narrator mention?', a: 'Last month the family played antakshari at home.' },
      { q: 'What does the narrator plan for next year?', a: 'She will also learn guitar (गिटार भी सीखूँगी).' },
      { q: 'Identify two connectors and explain what they do.', a: 'Any of पहले (sequences first item), फिर (next item), इसके अलावा (adds third item), क्योंकि (gives reason), लेकिन (contrasts), इसलिए (states consequence), मुझे लगता है कि (opens a reflection).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor shows exactly how a student should structure a "What do you like?" essay: name three things, use time markers to cover past/present/future, include one cultural specific (अंताक्षरी), and close with a reflective future-tense line. Read it aloud three times — the shapes should feel automatic.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'हफ़्ते का शौक़-समय · Weekly Hobby Schedule',
      hindi:
        'सोमवार — शतरंज क्लब (शाम 5 बजे)\nमंगलवार — चित्रकारी (घर पर)\nबुधवार — क्रिकेट (पार्क में)\nगुरुवार — गायन अभ्यास\nशुक्रवार — फ़िल्म रात (परिवार के साथ)\nशनिवार — बैडमिंटन दोस्तों के साथ\nरविवार — किताब पढ़ना (अकेले)',
      transliteration:
        'somvaar — shatranj club (shaam 5 baje) | mangalvaar — chitrakaari (ghar par) | budhvaar — cricket (park mein) | guruvaar — gaayan abhyaas | shukravaar — film raat (parivaar ke saath) | shanivaar — badminton doston ke saath | ravivaar — kitaab padhna (akele)',
      english:
        'Monday — Chess club (5 pm) · Tuesday — Painting (at home) · Wednesday — Cricket (in the park) · Thursday — Singing practice · Friday — Movie night (with family) · Saturday — Badminton with friends · Sunday — Reading a book (alone)',
    },
    {
      kind: 'diary',
      title: 'डायरी पृष्ठ · A Diary Page',
      hindi:
        'आज मैंने पहली बार गिटार छुआ। मेरे चाचा ने मुझे चार तार दिखाए। मुझे थोड़ा डर लगा, लेकिन बहुत मज़ा भी आया। अब मैं हर रविवार को सीखूँगा। मुझे लगता है कि यह मेरा नया पसंदीदा शौक़ बन जाएगा।',
      transliteration:
        'aaj maine pahli baar guitar chhua. mere chaacha ne mujhe chaar taar dikhaaye. mujhe thoda dar laga, lekin bahut mazaa bhi aaya. ab main har ravivaar ko seekhoonga. mujhe lagta hai ki yah mera naya pasandeeda shauq ban jaayega.',
      english:
        'Today I touched a guitar for the first time. My uncle showed me four strings. I was a little scared, but it was also a lot of fun. Now I will learn every Sunday. I think this will become my new favorite hobby.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! शनिवार को पार्क में क्रिकेट खेलने चलोगे? मैंने नया बल्ला ख़रीदा है 🏏 अगर बारिश होगी, तो घर पर शतरंज खेलेंगे। जवाब देना!',
      transliteration:
        'are! shanivaar ko park mein cricket khelne chaloge? maine naya balla khareeda hai. agar baarish hogi, to ghar par shatranj khelenge. jawaab dena!',
      english:
        'Hey! Will you come play cricket at the park on Saturday? I bought a new bat 🏏 If it rains, we will play chess at home. Reply!',
    },
    {
      kind: 'announcement',
      title: 'स्कूल नोटिस · School Notice',
      hindi:
        'सभी विद्यार्थियों के लिए — अगले शुक्रवार को वार्षिक कला और संगीत प्रतियोगिता है। जो बच्चे चित्रकारी, गायन या नृत्य में भाग लेना चाहते हैं, वे कृपया अपना नाम कक्षा-अध्यापक को दें। समय: दोपहर 2 बजे।',
      transliteration:
        'sabhi vidyaarthiyon ke liye — agle shukravaar ko vaarshik kala aur sangeet pratiyogita hai. jo bachche chitrakaari, gaayan ya nritya mein bhaag lena chaahte hain, ve kripaya apna naam kaksha-adhyaapak ko dein. samay: dopahar 2 baje.',
      english:
        'For all students — next Friday is the annual art and music competition. Children who want to participate in painting, singing, or dance, please give your name to the class teacher. Time: 2 pm.',
    },
  ],
  modelTextsNote: {
    why:
      'A weekly schedule teaches the student how to list hobbies with time markers. A diary entry shows reflective register. An SMS shows casual peer Hindi. An announcement shows formal register. Each is a sentence-shape bank the student can draw from under exam pressure.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Cricket is the National Obsession',
      body:
        'India stops for a cricket match. Boys and girls play gully (street) cricket with tape balls after school; IPL evenings are family events. Dropping "हम गली क्रिकेट खेलते हैं" in an essay is immediately authentic.',
      emoji: '🏏',
    },
    {
      title: 'Antakshari — The Singing Game',
      body:
        'At weddings, long car rides, and family gatherings, Indians play अंताक्षरी: one team sings a film song, the other must start a new song with the last sound of the previous one. Naming it in an essay is a Topic-Coverage win.',
      emoji: '🎤',
    },
    {
      title: 'Kite-Flying (पतंगबाज़ी)',
      body:
        'On Makar Sankranti (January 14) and Independence Day, rooftops across Delhi, Gujarat, and UP fill with कटी पतंग! shouts. Mentioning "छत पर पतंग उड़ाना" fits any childhood-memory essay.',
      emoji: '🪁',
    },
    {
      title: 'Kabaddi — The Village Sport',
      body:
        'A tag-wrestling game originally from rural North India, now professional via the Pro Kabaddi League. Saying "मुझे कबड्डी देखना पसंद है" signals you know Indian sports beyond cricket.',
      emoji: '🤼',
    },
    {
      title: 'Bollywood is a Shared Language',
      body:
        'A Shah Rukh Khan dialogue or a Lata Mangeshkar song is a reference every Hindi speaker shares. "मुझे पुराने हिंदी गाने पसंद हैं" beats "मुझे music पसंद है" on every rubric axis at once.',
      emoji: '🎬',
    },
  ],
  culturalNote: {
    why:
      'FCPS raters have read a thousand "I like to play games" essays. A Hindi-specific pastime — gully cricket, antakshari, kite-flying on Makar Sankranti, kabaddi, or a Bollywood reference — separates the essay from the pile in one sentence. Pure Text-Type and Topic-Coverage boost at no grammar cost.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'मन लगना',
      literal: 'the mind to attach',
      meaning: "To feel engaged / to enjoy (one's heart is in it).",
      example: 'मुझे चित्रकारी में बहुत मन लगता है।',
      exampleEnglish: 'I am really engaged in painting / My heart is in painting.',
    },
    {
      phrase: 'दिल बहलाना',
      literal: 'to entertain the heart',
      meaning: 'To amuse oneself / pass the time pleasantly.',
      example: 'शाम को संगीत सुनकर दिल बहल जाता है।',
      exampleEnglish: 'In the evening, listening to music entertains the heart.',
    },
  ],
  muhavareNote: {
    why:
      'मन लगना and दिल बहलाना are the two muhavare that map perfectly onto hobby writing. One of them, placed inside a past or present sentence (not tacked on), reads as register mastery. Two in one essay is too many.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'Favorite activities',
      prompt: 'आपको क्या करना पसंद है? अपनी तीन पसंदीदा गतिविधियों के बारे में तीन अनुच्छेदों में लिखिए। (What do you like to do? Write three paragraphs about your three favorite activities.)',
      novice: 'मुझे क्रिकेट पसंद है। गाने अच्छे हैं। मैं खेलता हूँ।',
      intermediateMid:
        'मुझे तीन चीज़ें सबसे ज़्यादा पसंद हैं — क्रिकेट खेलना, किताबें पढ़ना और पुराने हिंदी गाने सुनना। मैं हफ़्ते में चार बार अपने दोस्तों के साथ गली क्रिकेट खेलता हूँ, क्योंकि इसमें बहुत मज़ा आता है। क्रिकेट से ज़्यादा मुझे शायद किताबें पसंद हैं, लेकिन दोनों मेरा दिल बहलाते हैं।\n\nपिछले रविवार को मेरे पिताजी ने मुझे प्रेमचंद की एक पुरानी किताब दी। मैंने उसे दो दिन में पूरा पढ़ लिया। उसी शाम हमने घर में अंताक्षरी खेली, और दादी ने सबसे अच्छे गाने गाए। मुझे उस दिन बहुत आनंद आया।\n\nइसके अलावा मुझे लगता है कि हर शौक़ से कुछ न कुछ सीखने को मिलता है। क्रिकेट से टीम-भावना आती है, किताबों से नए विचार, और संगीत से शांति। अगले साल मैं गिटार भी सीखूँगा, क्योंकि नया सीखना भी एक शौक़ है।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'तीन चीज़ें सबसे ज़्यादा पसंद हैं — क्रिकेट खेलना, किताबें पढ़ना और ... सुनना', note: 'Thesis lists three hobbies with two infinitive verbs and one gerund-like noun phrase — one correct पसंद हैं triggers the whole rubric check.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / लेकिन', note: 'Reason + contrast in one paragraph — direct Text-Type 5 signal.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'क्रिकेट से ज़्यादा ... किताबें पसंद हैं', note: 'X से ज़्यादा Y comparison correctly done — lifts the essay out of a list.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले रविवार को ... दी / पढ़ लिया / खेली', note: 'Past perfective anchored with time marker. Three different past verbs in one paragraph.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'प्रेमचंद / अंताक्षरी', note: 'Two cultural specifics — a famous Hindi author and the family song game. Topic Coverage boost.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'दिल बहलाते हैं (para 0) / आनंद आया', note: 'Idiom placed inside narrative flow, not appended. Natural register.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल मैं गिटार भी सीखूँगा', note: 'Future tense closes the essay — third time frame sealed.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'क्रिकेट से टीम-भावना ... किताबों से ... संगीत से ...', note: 'Parallel structure listing three benefits — an Intermediate-Mid hallmark.' },
      ],
      wordCount: 134,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'लेकिन', 'इसके अलावा', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs that cannot be rearranged — Text-Type 5 requirement met.',
          'Uses past (दी, पढ़ लिया, खेली), present-habitual (खेलता हूँ), and future (सीखूँगा) — "some control of past, present, and future" per the IM descriptor.',
          'Correct पसंद हैं with plural noun ("तीन चीज़ें ... पसंद हैं", "किताबें पसंद हैं") proves number agreement on the copula verb.',
          'Comparison "क्रिकेट से ज़्यादा ... किताबें पसंद हैं" — comparison structure that raters explicitly reward.',
          'Two cultural specifics (प्रेमचंद, अंताक्षरी) plus an idiom (दिल बहलाते हैं) placed in context — Topic Coverage clearly above generic.',
        ],
        gotchas: [
          'If "तीन चीज़ें पसंद है" (singular copula with plural noun) appears, Language Control drops to Low.',
          'Cutting paragraph 3 (the reflective close) would drop the essay to Benchmark 4 — future frame disappears.',
        ],
      },
    },
    {
      shortLabel: 'A fun day out',
      prompt:
        'अपने परिवार और दोस्तों के साथ बिताए एक मज़ेदार समय के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपने क्या किया और क्यों अच्छा लगा। (Write three paragraphs about a fun time spent with family and friends. Describe what you did and why it felt good.)',
      novice: 'हम पार्क गए। हमने खेला। अच्छा था।',
      intermediateMid:
        'पिछले शनिवार को मैं और मेरे दो दोस्त पास के पार्क में बैडमिंटन खेलने गए। पहले हमने एक घंटे तक खेला, फिर हम एक पेड़ के नीचे बैठे और पुराने हिंदी गाने सुने। मुझे बैडमिंटन से ज़्यादा वह शांत समय पसंद आया, क्योंकि दोस्तों के साथ बातें करना मेरा सबसे बड़ा शौक़ है।\n\nशाम को हम मेरे घर आए। माँ ने गरम पकौड़े बनाए, और हम सब ने साथ मिलकर अंताक्षरी खेली। मेरी छोटी बहन ने एक मज़ेदार गाना गाया, और सब ज़ोर से हँस पड़े। उस रात मुझे बहुत मन लगा।\n\nइसके अलावा मुझे लगता है कि अच्छा समय अकेले नहीं आता — वह लोगों के साथ आता है। इसलिए अगली बार मैं अपने परिवार को भी पार्क ले जाऊँगा। शायद हम वहाँ पतंग भी उड़ाएँगे।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले शनिवार को ... गए', note: 'Past frame opens with a clear time marker.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... क्योंकि', note: 'Three connectors in one paragraph — sequence + reason combined.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'बैडमिंटन से ज़्यादा वह शांत समय पसंद आया', note: 'Comparison with से ज़्यादा — the target grammar of this pack, used naturally.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'पकौड़े / अंताक्षरी', note: 'Two cultural specifics in one sentence — Topic Coverage spike.' },
        { paragraphIndex: 1, kind: 'idiom', highlight: 'मुझे बहुत मन लगा', note: 'मन लगना idiom placed inside a past-tense narrative — natural register.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'अकेले नहीं आता — वह लोगों के साथ आता है', note: 'Reflective generalization beyond the event — Intermediate-Mid closing move.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगली बार ... ले जाऊँगा / पतंग भी उड़ाएँगे', note: 'Two future verbs seal the third time frame. Kite-flying adds a cultural specific to the close.' },
      ],
      wordCount: 128,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'क्योंकि', 'इसके अलावा', 'इसलिए', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Six distinct connectors across three paragraphs — well above the threshold for Text-Type 5.',
          'All three time frames present: past (गए, बनाए, गाया, हँस पड़े), present-reflective (आता है, है), future (ले जाऊँगा, उड़ाएँगे).',
          'Idiom मन लगना is embedded mid-narrative, not appended — shows the student can deploy idiom, not just memorize it.',
          'Comparison (बैडमिंटन से ज़्यादा शांत समय पसंद आया) shows the target grammar used in context.',
          'Cultural specifics: पकौड़े (food), अंताक्षरी (music game), पतंग (kite-flying) — three authentic markers in one essay.',
        ],
        gotchas: [
          'If the narrator is female but writes "मैं गया" instead of "मैं गयी", Language Control drops — gender consistency matters.',
          'Dropping the reflective paragraph 3 would lose the future frame and the generalization, capping the essay at Benchmark 4.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked Benchmark-5 essays. Both answer canonical FCPS prompts — "What do you like to do?" and "A fun time with friends/family." Study the sentence shapes until you can reproduce them cold. The verdict cards show exactly which rubric boxes each sentence ticks.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'आपको क्या करना पसंद है? अपनी तीन पसंदीदा गतिविधियों के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप उन्हें कब, कहाँ और किसके साथ करते हैं।',
      english:
        'What do you like to do? Write three paragraphs about your three favorite activities. Say when, where, and with whom you do them.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसके अलावा'],
        vocab: ['शौक़', 'पसंदीदा', 'रोज़', 'हफ़्ते में', 'दोस्त'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'अपने बचपन की सबसे यादगार शौक़-स्मृति के बारे में तीन अनुच्छेदों में लिखिए। क्या हुआ, किसके साथ हुआ, और अब आप क्या करना चाहते हैं?',
      english:
        'Write three paragraphs about the most memorable hobby-memory from your childhood. What happened, with whom, and what do you want to do now?',
      hint: {
        connectors: ['पहले', 'फिर', 'लेकिन', 'इसलिए', 'मुझे लगता है कि'],
        vocab: ['मज़ा', 'आनंद', 'परिवार', 'अकेले', 'पसंदीदा'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'क्या आपको दोस्तों के साथ खेलना पसंद है या अकेले कोई काम करना? तीन अनुच्छेदों में अपनी राय दीजिए और एक उदाहरण से समझाइए।',
      english:
        'Do you prefer playing with friends or doing something alone? Give your opinion in three paragraphs and explain with one example.',
      hint: {
        connectors: ['लेकिन', 'क्योंकि', 'इसलिए', 'मुझे लगता है कि'],
        vocab: ['दोस्त', 'अकेले', 'मज़ा', 'शौक़', 'रुचि'],
        tenses: ['present', 'past'],
      },
    },
  ],
  promptsNote: {
    why:
      'Three prompts covering the exact FCPS question shapes for this topic: direct preference, past-memory narrative, and opinion-with-example. Each hint strip tells the student which connectors, vocabulary, and tenses to deploy — the goals, not the answer.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every draft: one correct पसंद है/हैं agreement, one comparison with से ज़्यादा, one past memory, one future plan, one cultural specific (cricket / antakshari / Bollywood / kite). If any box is empty, rewrite before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
