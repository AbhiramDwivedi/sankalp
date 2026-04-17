import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// Daily Routine (दैनिक दिनचर्या) — L2-01
// Forces sequence verbs + time markers: the fastest path from Novice-High
// paragraph stubs to true Intermediate-Mid connected prose. Time-of-day
// vocabulary, habitual present, past/future tense shifts around one day.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-01-daily-routine',
  level: 2,
  themeGroup: 'Identity',
  order: 13,
  titleHindi: 'दैनिक दिनचर्या',
  titleEnglish: 'Daily Routine',
  hook: 'Sequence verbs + time markers — the fastest path from NH to IM paragraphs.',
  heroPrompt: composeHeroPrompt(
    'A round wall clock as compass, with arrows pointing outward to tiny scenes: a steaming cup of morning chai beside a folded newspaper, a child tying school-shoe laces, an afternoon study desk with a notebook and pencil, a cricket bat leaning against a doorframe in evening light, a bedside lamp over an open storybook — warm morning-to-night palette',
  ),

  rationale: {
    fcpsSubTopics: [
      'Daily Routine (FCPS Level 2 — Home Life)',
      'Home Life and family schedules (FCPS Level 2)',
      'Bridges into School Life (FCPS Level 2) via the school-day portion of the routine',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate a full day in 3 connected paragraphs using पहले / फिर / इसके बाद / अंत में',
      'Switch between habitual present ("मैं रोज़ ... करता हूँ") and narrated past ("कल मैंने ... किया")',
      'Use clock times (सात बजे, साढ़े आठ बजे) and frequency adverbs (हमेशा, अक्सर, कभी-कभी) accurately',
      'Build जब ... तब ... clauses to link two actions in time',
      'Include a culturally specific detail — morning chai, joint-family breakfast, evening tuition — to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Daily Routine is the single most common FCPS Writing prompt at Level 2. Without the sequence-connector pattern this pack installs, student essays stay as lists of facts ("I wake up. I eat. I go.") and cap at Benchmark 4 / 2 credits no matter how much vocabulary they know.',
  },

  objectives: [
    {
      text: 'Produce a 3-paragraph day narrative using at least four of पहले / फिर / इसके बाद / अंत में / जब...तब.',
      trains: ['TextType'],
    },
    {
      text: 'Use habitual-present conjugation (करता हूँ / करती हूँ) consistently for 8+ routine verbs.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Shift into past tense to describe yesterday\'s routine, then into future for tomorrow\'s plan, inside a single essay.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Use clock-time expressions (सात बजे, साढ़े आठ बजे) and frequency adverbs (रोज़, हमेशा, कभी-कभी) in at least three sentences.',
      trains: ['TopicCoverage', 'LanguageControl'],
    },
    {
      text: 'Include at least one culturally specific routine detail (सुबह की चाय, योग, संयुक्त परिवार का नाश्ता, शाम की ट्यूशन).',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Times of day
    { hindi: 'सुबह', transliteration: 'subah', english: 'morning', exampleHindi: 'सुबह छह बजे मेरी आँख खुलती है।', exampleEnglish: 'My eyes open at 6 in the morning.', emoji: '🌅', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'भोर', transliteration: 'bhor', english: 'dawn / early morning', exampleHindi: 'दादी भोर में उठकर पूजा करती हैं।', exampleEnglish: 'Grandmother wakes at dawn and does puja.', emoji: '🌄', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'दोपहर', transliteration: 'dopahar', english: 'noon / afternoon', exampleHindi: 'दोपहर में हम स्कूल की कैंटीन में खाते हैं।', exampleEnglish: 'At noon we eat in the school canteen.', emoji: '☀️', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'दोपहर के बाद', transliteration: 'dopahar ke baad', english: 'afternoon (after noon)', exampleHindi: 'दोपहर के बाद मैं होमवर्क करती हूँ।', exampleEnglish: 'In the afternoon I do homework.', emoji: '🕒', partOfSpeech: 'phrase', subgroup: 'Time of day' },
    { hindi: 'शाम', transliteration: 'shaam', english: 'evening', exampleHindi: 'शाम को हम पार्क जाते हैं।', exampleEnglish: 'In the evening we go to the park.', emoji: '🌇', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'रात', transliteration: 'raat', english: 'night', exampleHindi: 'रात को पूरा परिवार साथ खाना खाता है।', exampleEnglish: 'At night the whole family eats together.', emoji: '🌙', partOfSpeech: 'noun', subgroup: 'Time of day' },

    // Routine verbs (given in the actually-used form)
    { hindi: 'उठना', transliteration: 'uthna', english: 'to wake up / get up', exampleHindi: 'मैं रोज़ सात बजे उठता हूँ।', exampleEnglish: 'I wake up at 7 every day.', emoji: '⏰', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'नहाना', transliteration: 'nahaana', english: 'to bathe', exampleHindi: 'नाश्ते से पहले मैं नहाता हूँ।', exampleEnglish: 'Before breakfast I bathe.', emoji: '🚿', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'नाश्ता करना', transliteration: 'naashta karna', english: 'to have breakfast', exampleHindi: 'मैं माँ के साथ नाश्ता करता हूँ।', exampleEnglish: 'I have breakfast with Mom.', emoji: '🍳', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'तैयार होना', transliteration: 'taiyaar hona', english: 'to get ready', exampleHindi: 'स्कूल के लिए मैं आठ बजे तैयार होती हूँ।', exampleEnglish: 'I get ready for school at 8.', emoji: '🎒', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'स्कूल जाना', transliteration: 'school jaana', english: 'to go to school', exampleHindi: 'मैं बस से स्कूल जाता हूँ।', exampleEnglish: 'I go to school by bus.', emoji: '🚌', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'पढ़ना', transliteration: 'padhna', english: 'to study / read', exampleHindi: 'शाम को मैं दो घंटे पढ़ती हूँ।', exampleEnglish: 'In the evening I study for two hours.', emoji: '📖', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'खेलना', transliteration: 'khelna', english: 'to play', exampleHindi: 'दोस्तों के साथ मैं क्रिकेट खेलता हूँ।', exampleEnglish: 'I play cricket with friends.', emoji: '🏏', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'सोना', transliteration: 'sona', english: 'to sleep', exampleHindi: 'मैं ग्यारह बजे तक सो जाता हूँ।', exampleEnglish: 'I fall asleep by 11.', emoji: '😴', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'लौटना', transliteration: 'lautna', english: 'to return', exampleHindi: 'मैं स्कूल से तीन बजे लौटता हूँ।', exampleEnglish: 'I return from school at 3.', emoji: '🔙', partOfSpeech: 'verb', subgroup: 'Routine verbs' },
    { hindi: 'होमवर्क करना', transliteration: 'homework karna', english: 'to do homework', exampleHindi: 'खाने से पहले मैं होमवर्क करती हूँ।', exampleEnglish: 'Before eating I do homework.', emoji: '📝', partOfSpeech: 'verb', subgroup: 'Routine verbs' },

    // Time expressions (clock + duration)
    { hindi: 'सात बजे', transliteration: 'saat baje', english: 'at seven o\'clock', exampleHindi: 'सात बजे मेरा अलार्म बजता है।', exampleEnglish: 'My alarm rings at seven.', emoji: '🕖', partOfSpeech: 'phrase', subgroup: 'Time expressions' },
    { hindi: 'साढ़े आठ बजे', transliteration: 'saadhe aath baje', english: 'at half past eight', exampleHindi: 'साढ़े आठ बजे स्कूल की बस आती है।', exampleEnglish: 'The school bus comes at 8:30.', emoji: '🕣', partOfSpeech: 'phrase', subgroup: 'Time expressions' },
    { hindi: 'आधे घंटे में', transliteration: 'aadhe ghante mein', english: 'in half an hour', exampleHindi: 'मैं आधे घंटे में तैयार हो जाती हूँ।', exampleEnglish: 'I get ready in half an hour.', emoji: '⏳', partOfSpeech: 'phrase', subgroup: 'Time expressions' },
    { hindi: 'रोज़', transliteration: 'roz', english: 'every day / daily', exampleHindi: 'रोज़ मैं सुबह दौड़ने जाता हूँ।', exampleEnglish: 'Every day I go running in the morning.', emoji: '📅', partOfSpeech: 'adverb', subgroup: 'Time expressions' },
    { hindi: 'आम तौर पर', transliteration: 'aam taur par', english: 'generally / usually', exampleHindi: 'आम तौर पर मैं दस बजे सो जाता हूँ।', exampleEnglish: 'Usually I fall asleep by ten.', emoji: '📊', partOfSpeech: 'phrase', subgroup: 'Time expressions' },

    // Frequency adverbs
    { hindi: 'हमेशा', transliteration: 'hamesha', english: 'always', exampleHindi: 'मैं हमेशा समय पर उठती हूँ।', exampleEnglish: 'I always wake up on time.', emoji: '♾️', partOfSpeech: 'adverb', subgroup: 'Frequency' },
    { hindi: 'अक्सर', transliteration: 'aksar', english: 'often', exampleHindi: 'अक्सर मैं दादी के साथ चाय पीता हूँ।', exampleEnglish: 'I often drink tea with Grandmother.', emoji: '🔁', partOfSpeech: 'adverb', subgroup: 'Frequency' },
    { hindi: 'कभी-कभी', transliteration: 'kabhi-kabhi', english: 'sometimes', exampleHindi: 'कभी-कभी मैं देर से उठता हूँ।', exampleEnglish: 'Sometimes I wake up late.', emoji: '🎲', partOfSpeech: 'adverb', subgroup: 'Frequency' },
    { hindi: 'कभी नहीं', transliteration: 'kabhi nahin', english: 'never', exampleHindi: 'मैं कभी नाश्ता नहीं छोड़ती।', exampleEnglish: 'I never skip breakfast.', emoji: '🚫', partOfSpeech: 'phrase', subgroup: 'Frequency' },

    // Routine-specific nouns and props
    { hindi: 'दिनचर्या', transliteration: 'dincharya', english: 'daily routine', exampleHindi: 'मेरी दिनचर्या बहुत व्यस्त है।', exampleEnglish: 'My routine is very busy.', emoji: '📋', partOfSpeech: 'noun', subgroup: 'Routine nouns' },
    { hindi: 'अलार्म', transliteration: 'alarm', english: 'alarm', exampleHindi: 'मेरा अलार्म छह बजे बजता है।', exampleEnglish: 'My alarm rings at six.', emoji: '🔔', partOfSpeech: 'noun', subgroup: 'Routine nouns' },
    { hindi: 'चाय', transliteration: 'chaay', english: 'tea', exampleHindi: 'सुबह की चाय सबसे अच्छी होती है।', exampleEnglish: 'Morning tea is the best.', emoji: '🍵', partOfSpeech: 'noun', subgroup: 'Routine nouns' },
    { hindi: 'योग', transliteration: 'yog', english: 'yoga', exampleHindi: 'पिताजी रोज़ योग करते हैं।', exampleEnglish: 'Father does yoga every day.', emoji: '🧘', partOfSpeech: 'noun', subgroup: 'Routine nouns' },
    { hindi: 'छुट्टी', transliteration: 'chhutti', english: 'holiday / day off', exampleHindi: 'रविवार को स्कूल की छुट्टी होती है।', exampleEnglish: 'Sunday is a school holiday.', emoji: '🏖️', partOfSpeech: 'noun', subgroup: 'Routine nouns' },
  ],
  vocabularyNote: {
    why:
      'These 28 entries are the exact lexical set an FCPS "describe your daily routine" prompt pulls from. Eight routine verbs + six time-of-day nouns + five clock-time phrases + four frequency adverbs is enough to build a 150-word essay without repetition. Every item reappears in the anchor passage, model texts, or essays below.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?" — daily-routine prompts expect time words and routine verbs densely.',
  },

  grammar: [
    {
      title: 'Habitual present tense (करता हूँ / करती हूँ)',
      rule:
        'To state a recurring routine action, use the habitual present: verb-stem + ता/ती/ते + subject-agreeing form of होना. The verb-ending agrees with the SUBJECT\'s gender and number. Use रोज़ / हमेशा / अक्सर to make the habitual reading explicit.',
      examples: [
        { hindi: 'मैं रोज़ सात बजे उठता हूँ।', transliteration: 'main roz saat baje uthta hoon.', english: 'I (m) wake up every day at seven.' },
        { hindi: 'मैं रोज़ सात बजे उठती हूँ।', transliteration: 'main roz saat baje uthti hoon.', english: 'I (f) wake up every day at seven.' },
        { hindi: 'हम सब साथ नाश्ता करते हैं।', transliteration: 'hum sab saath naashta karte hain.', english: 'We all have breakfast together.' },
      ],
      pitfall:
        'Many students drop हूँ / है / हैं and write just "मैं उठता" — that sounds incomplete. Others mix "करता है" with "मैं" (wrong person). The auxiliary must match the subject: मैं हूँ, तुम हो, वह है, हम हैं.',
      whyItMatters:
        'The entire daily-routine essay runs on habitual present. One broken conjugation is forgivable; a pattern of broken ones caps Language Control at Low and drops the essay to Benchmark 3 or 4.',
    },
    {
      title: 'Clock time: ___ बजे and साढ़े / सवा',
      rule:
        'Clock times take the oblique form + बजे. Full hours: एक बजे, दो बजे, सात बजे. Half-past: साढ़े + hour (साढ़े सात = 7:30; exception: डेढ़ = 1:30, ढाई = 2:30). Quarter-past: सवा + hour (सवा सात = 7:15). Quarter-to: पौने + hour (पौने आठ = 7:45).',
      examples: [
        { hindi: 'मेरा अलार्म साढ़े छह बजे बजता है।', transliteration: 'mera alarm saadhe chhah baje bajta hai.', english: 'My alarm rings at 6:30.' },
        { hindi: 'सवा आठ बजे स्कूल की बस आती है।', transliteration: 'savaa aath baje school ki bus aati hai.', english: 'At 8:15 the school bus comes.' },
        { hindi: 'मैं ग्यारह बजे तक सो जाता हूँ।', transliteration: 'main gyaarah baje tak so jaata hoon.', english: 'I fall asleep by 11 o\'clock.' },
      ],
      pitfall:
        'Students write "सात बजा" (wrong — बजे is the standard oblique time marker) or write times in English digits in a Hindi essay. Keep both the hour and बजे in Devanagari.',
      whyItMatters:
        'Clock-time expressions are the concrete detail that turns a Novice "I wake up" into an Intermediate-Mid "I wake up at 6:30." That specificity is a Topic-Coverage lift and a Text-Type lift at once.',
    },
    {
      title: 'जब ... तब ... for linked actions',
      rule:
        'To link two actions in time ("when X, then Y"), use जब at the start of clause 1 and तब (or just an implied pause) at the start of clause 2. Both clauses take their own finite verb.',
      examples: [
        { hindi: 'जब मैं स्कूल से लौटता हूँ, तब माँ चाय बनाती हैं।', transliteration: 'jab main school se lautta hoon, tab maa chaay banaati hain.', english: 'When I return from school, then Mother makes tea.' },
        { hindi: 'जब अलार्म बजता है, तब मैं तुरंत उठ जाती हूँ।', transliteration: 'jab alarm bajta hai, tab main turant uth jaati hoon.', english: 'When the alarm rings, I get up immediately.' },
        { hindi: 'जब मैं छोटा था, तब मैं दादी के साथ सोता था।', transliteration: 'jab main chhota tha, tab main daadi ke saath sota tha.', english: 'When I was small, I used to sleep beside Grandma.' },
      ],
      pitfall:
        'Writing जब without a matching तब / तो / comma-pause is a common fragment. Also, keep the tense of the two clauses aligned — "जब (present) ... तब (past)" almost always reads as an error.',
      whyItMatters:
        'जब ... तब is the single Intermediate-Mid structure that most cleanly signals "I can link two events in one sentence." Raters treat it as a Text-Type 5 marker — "ideas grouped, cannot be rearranged."',
    },
    {
      title: 'Past-tense routine with ने + perfective, intransitive vs transitive',
      rule:
        'To shift from habitual present to yesterday\'s actions, use perfective past. Intransitive motion verbs (उठना, जाना, सोना) take no ने: "मैं उठा / उठी". Transitive verbs (करना, खाना, पढ़ना, बनाना) take ने: "मैंने नाश्ता किया / मैंने किताब पढ़ी". With ने, the verb agrees with the OBJECT, not the subject.',
      examples: [
        { hindi: 'कल मैं सात बजे उठी।', transliteration: 'kal main saat baje uthi.', english: 'Yesterday I (f) got up at 7. (intransitive — no ने)' },
        { hindi: 'कल मैंने नाश्ता किया और स्कूल गयी।', transliteration: 'kal maine naashta kiya aur school gayi.', english: 'Yesterday I had breakfast and went to school. (mixed: ने for किया, no ने for गयी)' },
        { hindi: 'शाम को मैंने होमवर्क किया, फिर क्रिकेट खेला।', transliteration: 'shaam ko maine homework kiya, phir cricket khela.', english: 'In the evening I did homework, then played cricket.' },
      ],
      pitfall:
        'Writing "मैं नाश्ता किया" (missing ने) or "मैंने गया" (wrong ने on intransitive) are the two flagship errors in past-tense routine essays. Memorize: उठना / जाना / सोना / लौटना → NO ने. करना / खाना / पढ़ना / बनाना → ने.',
      whyItMatters:
        'Intermediate-Mid requires "some control of past, present, and future." Getting ने right in ONE past sentence anchors the tense shift the rubric specifically rewards. Getting it wrong can pull Language Control down two full descriptors.',
    },
  ],
  grammarNote: {
    why:
      'These four rules cover 90% of the grammar a daily-routine essay actually demands. Conjugating habitual present cleanly, attaching बजे to clock times, linking clauses with जब...तब, and handling ने in one past sentence — master these and the rubric\'s Language Control axis stabilizes at Average or High.',
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
      'पहले / फिर / इसके बाद / अंत में is the four-beat sequence scaffold that turns a list of routine sentences into a paragraph. जब...तब links two actions in one sentence — that alone is a Benchmark-5 signal. क्योंकि / लेकिन / इसलिए add reasoning for why the routine looks the way it does. Drill these eight until they appear without conscious effort.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'एक मंगलवार · A Tuesday',
    hindi:
      'मेरी दिनचर्या आम तौर पर एक जैसी रहती है, लेकिन मंगलवार सबसे व्यस्त दिन होता है। पहले मेरा अलार्म साढ़े छह बजे बजता है और मैं तुरंत उठ जाती हूँ। इसके बाद मैं नहाकर तैयार होती हूँ, क्योंकि स्कूल की बस सवा आठ बजे आती है। फिर माँ के साथ मैं रसोई में जाती हूँ और हम दोनों गरम नाश्ता करते हैं — आलू पराठा और दही। दादी इस समय अपनी सुबह की चाय पीती हैं और हमें आशीर्वाद देती हैं। दोपहर को मैं स्कूल में पढ़ती हूँ, और तीन बजे घर लौटती हूँ। जब मैं घर पहुँचती हूँ, तब माँ मेरे लिए दोपहर का खाना तैयार रखती हैं। शाम को मैं दो घंटे होमवर्क करती हूँ, फिर दोस्तों के साथ पार्क में खेलती हूँ। अंत में रात को पूरा परिवार साथ बैठकर खाना खाता है, और मैं दस बजे सो जाती हूँ। यह मेरा सामान्य मंगलवार है।',
    transliteration:
      'meri dincharya aam taur par ek jaisi rahti hai, lekin mangalvaar sabse vyast din hota hai. pahle mera alarm saadhe chhah baje bajta hai aur main turant uth jaati hoon. iske baad main nahaakar taiyaar hoti hoon, kyonki school ki bus savaa aath baje aati hai. phir maa ke saath main rasoi mein jaati hoon aur hum dono garam naashta karte hain — aaloo paraatha aur dahi. daadi is samay apni subah ki chaay peeti hain aur humein aasheervaad deti hain. dopahar ko main school mein padhti hoon, aur teen baje ghar lautti hoon. jab main ghar pahunchti hoon, tab maa mere liye dopahar ka khaana taiyaar rakhti hain. shaam ko main do ghante homework karti hoon, phir doston ke saath park mein khelti hoon. ant mein raat ko poora parivaar saath baithkar khaana khaata hai, aur main das baje so jaati hoon. yah mera saamaanya mangalvaar hai.',
    english:
      'My routine usually stays the same, but Tuesday is the busiest day. First, my alarm rings at 6:30 and I get up immediately. After this I bathe and get ready, because the school bus comes at 8:15. Then I go with Mother to the kitchen and we both have a hot breakfast — aloo paratha and yogurt. At this time, Grandmother drinks her morning tea and blesses us. In the afternoon I study at school, and I return home at 3. When I reach home, Mother has lunch ready for me. In the evening I do homework for two hours, then I play with friends in the park. Finally at night the whole family sits and eats together, and I fall asleep at ten. This is my normal Tuesday.',
    highlights: [
      { term: 'पहले / इसके बाद / फिर / अंत में', note: 'Four sequence connectors stitch the day into one unbroken paragraph — sentences cannot be reordered, which is exactly what Text-Type 5 looks like.' },
      { term: 'साढ़े छह बजे / सवा आठ बजे / तीन बजे / दस बजे', note: 'Four clock-time anchors give the essay specificity. This level of detail separates Intermediate-Mid from Novice-High.' },
      { term: 'जब मैं घर पहुँचती हूँ, तब माँ ...', note: 'जब...तब clause linking two simultaneous actions — a classic IM marker the rubric explicitly rewards.' },
      { term: 'गरम नाश्ता (m) / दादी की चाय (f) / सुबह की चाय (f)', note: 'Gender agreement sustained across multiple nouns in one paragraph — clean Language Control signal.' },
      { term: 'आलू पराठा, दही, दादी का आशीर्वाद', note: 'Three culturally specific items in one breakfast scene — huge Topic-Coverage lift over generic "I eat breakfast."' },
    ],
    comprehensionQuestions: [
      { q: 'At what time does the narrator\'s alarm ring?', a: 'साढ़े छह बजे (6:30 a.m.).' },
      { q: 'What time does the school bus come?', a: 'सवा आठ बजे (8:15 a.m.).' },
      { q: 'What does the family eat for breakfast?', a: 'आलू पराठा और दही (aloo paratha and yogurt).' },
      { q: 'What is Grandmother doing during breakfast?', a: 'वह अपनी सुबह की चाय पीती हैं और बच्चों को आशीर्वाद देती हैं (She drinks her morning tea and blesses the children).' },
      { q: 'What happens when the narrator returns home?', a: 'माँ दोपहर का खाना तैयार रखती हैं (Mother has lunch ready).' },
      { q: 'Identify two connectors in the passage and explain what each does.', a: 'Examples: पहले / फिर / इसके बाद / अंत में sequence the day; क्योंकि gives a reason; जब...तब links two actions in time.' },
      { q: 'At what time does the narrator fall asleep?', a: 'दस बजे (at 10 p.m.).' },
    ],
  },
  anchorNote: {
    why:
      'This passage is a direct model of the essay you will be asked to write. Every sentence demonstrates one of the grammar rules above AND uses at least one vocabulary word from the list. Read it aloud three times and the sentence shapes (पहले ___ बजता है, फिर ___ करती हूँ, अंत में ___ जाता है) will start to come out of your own pen.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'मेरी दैनिक समय-सारिणी · My Daily Schedule',
      hindi:
        '६:३० — उठना और मुँह धोना\n६:४५ — दादी के साथ योग\n७:१५ — नहाना और तैयार होना\n७:४५ — नाश्ता (परांठा + चाय)\n८:१५ — स्कूल की बस\n३:०० — स्कूल से लौटना\n४:०० — होमवर्क\n६:०० — पार्क में क्रिकेट\n८:०० — रात का खाना\n१०:०० — सो जाना',
      transliteration:
        '6:30 — uthna aur munh dhona | 6:45 — daadi ke saath yog | 7:15 — nahaana aur taiyaar hona | 7:45 — naashta (paraatha + chaay) | 8:15 — school ki bus | 3:00 — school se lautna | 4:00 — homework | 6:00 — park mein cricket | 8:00 — raat ka khaana | 10:00 — so jaana',
      english:
        '6:30 — wake up & wash face · 6:45 — yoga with Grandma · 7:15 — bathe & get ready · 7:45 — breakfast (paratha + tea) · 8:15 — school bus · 3:00 — return from school · 4:00 — homework · 6:00 — cricket in the park · 8:00 — dinner · 10:00 — go to sleep',
    },
    {
      kind: 'diary',
      title: 'कल का दिन · Yesterday\'s Day',
      hindi:
        'कल मंगलवार था। मैं सात बजे उठी, क्योंकि मेरा अलार्म बजा ही नहीं। मैंने जल्दी-जल्दी नाश्ता किया और बस पकड़ी। दोपहर को स्कूल में हिंदी का टेस्ट था, इसलिए मैं थोड़ी घबराई हुई थी। शाम को लौटकर मैंने दादी को सारी बात बताई। अंत में थकान के कारण मैं नौ बजे ही सो गयी।',
      transliteration:
        'kal mangalvaar tha. main saat baje uthi, kyonki mera alarm baja hi nahin. maine jaldi-jaldi naashta kiya aur bus pakdi. dopahar ko school mein hindi ka test tha, isliye main thodi ghabraayi hui thi. shaam ko lautkar maine daadi ko saari baat bataayi. ant mein thakaan ke kaaran main nau baje hi so gayi.',
      english:
        'Yesterday was Tuesday. I woke up at seven because my alarm just didn\'t ring. I ate breakfast in a hurry and caught the bus. In the afternoon there was a Hindi test at school, so I was a little nervous. In the evening, after returning, I told Grandmother the whole story. In the end, because of tiredness, I fell asleep by nine.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Text to a Friend',
      hindi:
        'यार, कल सुबह पाँच बजे उठना पड़ेगा 😩 पिताजी कह रहे हैं सब मिलकर योग करेंगे। फिर नाश्ते के बाद हम मंदिर जाएँगे। तू भी आ जा न, अंत में मिलकर क्रिकेट खेलेंगे।',
      transliteration:
        'yaar, kal subah paanch baje uthna padega 😩 pitaji kah rahe hain sab milkar yog karenge. phir naashte ke baad hum mandir jaayenge. tu bhi aa ja na, ant mein milkar cricket khelenge.',
      english:
        'Dude, tomorrow I\'ll have to wake up at 5 am 😩 Dad is saying everyone will do yoga together. Then after breakfast we\'ll go to the temple. You come too na, at the end we\'ll play cricket together.',
    },
    {
      kind: 'letter',
      title: 'मौसी को पत्र · Letter to Aunty',
      hindi:
        'प्रिय मौसी,\nमैं यहाँ ठीक हूँ। इन दिनों मेरी दिनचर्या बहुत व्यस्त है। रोज़ सुबह मैं जल्दी उठती हूँ, योग करती हूँ, और फिर स्कूल जाती हूँ। शाम को होमवर्क और थोड़ा खेल। आप कब हमारे घर आएँगी? आप आएँगी, तो हम साथ बैठकर चाय पीएँगे।\nआपकी प्यारी,\nमीरा',
      transliteration:
        'priya mausi, main yahaan theek hoon. in dinon meri dincharya bahut vyast hai. roz subah main jaldi uthti hoon, yog karti hoon, aur phir school jaati hoon. shaam ko homework aur thoda khel. aap kab hamaare ghar aayengi? aap aayengi, to hum saath baithkar chaay peeyenge. aapki pyaari, Meera.',
      english:
        'Dear Aunty, I am well here. These days my routine is very busy. Every morning I wake up early, do yoga, and then go to school. In the evening, homework and a little play. When will you come to our home? When you come, we will sit together and drink tea. Your loving, Meera.',
    },
  ],
  modelTextsNote: {
    why:
      'A schedule shows the bare bones of a routine; a diary shows past-tense narration of a single day; an SMS shows casual future planning; a letter shows polite, distant register. Each text-type trains a different muscle the FCPS essay needs. Notice how the same vocabulary is recycled across all four.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Morning Chai is the Start Button',
      body:
        'In most Indian homes the day does not begin until someone has made and shared the first cup of chai. Mentioning सुबह की चाय or "दादी ने चाय बनाई" signals to an FCPS rater that you know the domestic rhythm, not just the dictionary word.',
      emoji: '🍵',
    },
    {
      title: 'Yoga Before School',
      body:
        'Daily सूर्य नमस्कार or 10 minutes of pranayama is a common pre-school ritual, especially for grandparents and parents who then pass it on to kids. Dropping "पिताजी रोज़ योग करते हैं" adds a specific, India-rooted detail.',
      emoji: '🧘',
    },
    {
      title: 'The Joint Family Morning',
      body:
        'In a joint family, breakfast often runs on two tracks: dadi/dada eat first, then the school-going kids, then the office-going parents. The kitchen is never empty between 6:30 and 9:00 a.m. Writing "हम सब साथ खाते हैं" is fine, but "पहले दादी, फिर हम बच्चे नाश्ता करते हैं" is FCPS gold.',
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      title: 'After-School Tuition',
      body:
        'For many Indian teens, school does not end at 3 p.m. — शाम की ट्यूशन (evening tuition) in math, science, or Hindi runs 5–7 p.m. at a neighbor\'s house or coaching center. This is a uniquely Indian routine element; raters notice it.',
      emoji: '📚',
    },
    {
      title: 'Evening Family Time',
      body:
        'After dinner, many families gather for 30 minutes of TV, a walk around the building, or simply sitting on the balcony. "रात के खाने के बाद हम सब बालकनी में बैठते हैं" is the kind of sentence that lifts Topic-Coverage because it is not from a textbook.',
      emoji: '🌃',
    },
  ],
  culturalNote: {
    why:
      'A rater who has read fifty "I wake up, I eat, I study, I sleep" essays is waiting for one concrete Indian-home detail. Chai, yoga, joint-family breakfast, tuition, balcony evenings — pick ONE of these per essay and drop it in without explanation. That is how Text-Type and Topic-Coverage lift at the same time.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'सुबह का भूला शाम को घर आ जाए',
      literal: 'one who is lost in the morning comes home by evening',
      meaning: 'It is never too late to correct a mistake and return to the right path.',
      example: 'जब मैंने अपनी गलती मानी, तो दादी ने कहा — "सुबह का भूला शाम को घर आ जाए, तो उसे भूला नहीं कहते।"',
      exampleEnglish: 'When I admitted my mistake, Grandma said — "One who is lost in the morning and comes home by evening is not called lost."',
    },
    {
      phrase: 'दिन-रात एक करना',
      literal: 'to make day and night one',
      meaning: 'To work extremely hard (around the clock), sparing no effort.',
      example: 'परीक्षा से पहले मैंने दिन-रात एक कर दिया, इसलिए अच्छे नंबर आए।',
      exampleEnglish: 'Before the exam I worked day and night, so I got good marks.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms literally reference time-of-day — they slot naturally into a daily-routine essay without feeling forced. One, not two, per essay is plenty; raters reward register mastery, not idiom density.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपनी दैनिक दिनचर्या के बारे में तीन अनुच्छेदों में लिखिए। सुबह, दोपहर और शाम के बारे में बताइए। (Write in three paragraphs about your daily routine. Describe morning, afternoon, and evening.)',
      novice: 'मैं उठता हूँ। मैं खाता हूँ। मैं सोता हूँ।',
      intermediateMid:
        'मेरी दिनचर्या आम तौर पर व्यस्त रहती है, लेकिन मुझे अपनी आदतें बहुत पसंद हैं। पहले मैं रोज़ साढ़े छह बजे उठती हूँ और मुँह धोकर दादी के साथ थोड़ा योग करती हूँ। इसके बाद मैं नहाती हूँ, तैयार होती हूँ, और माँ के साथ गरम नाश्ता करती हूँ — आम तौर पर आलू पराठा और दही। सवा आठ बजे मेरी स्कूल की बस आ जाती है।\n\nदोपहर को मैं स्कूल में पढ़ती हूँ, और तीन बजे घर लौटती हूँ। जब मैं घर पहुँचती हूँ, तब माँ दोपहर का खाना तैयार रखती हैं, क्योंकि मुझे बहुत भूख लगती है। खाने के बाद मैं आधे घंटे आराम करती हूँ, फिर होमवर्क शुरू करती हूँ। कभी-कभी अगर टेस्ट होता है, तो मैं शाम की ट्यूशन भी जाती हूँ।\n\nशाम को दोस्तों के साथ पार्क में क्रिकेट खेलना मेरा पसंदीदा हिस्सा है। अंत में रात को पूरा परिवार साथ बैठकर खाना खाता है, और मैं दस बजे सो जाती हूँ। कल रविवार है, इसलिए मैं देर से उठूँगी और पूरे दिन अपनी पसंदीदा किताब पढ़ूँगी।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले / इसके बाद', note: 'Two sequence connectors open the morning — the reader cannot rearrange these sentences.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'साढ़े छह बजे / सवा आठ बजे', note: 'Two precise clock times. Specificity lifts Topic Coverage above generic "in the morning."' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'दादी के साथ योग / आलू पराठा और दही', note: 'Two culturally specific details in the first paragraph — Intermediate-Mid territory right away.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'जब मैं घर पहुँचती हूँ, तब माँ ...', note: 'जब...तब construction linking two actions — a textbook Benchmark-5 signal.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि / फिर / अगर...तो', note: 'Three connectors in one paragraph: reasoning, sequence, conditional. Text-Type well above threshold.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अंत में ... सो जाती हूँ / कल रविवार है ... उठूँगी ... पढ़ूँगी', note: 'Shifts from habitual present to future in the closing — two time frames sealed inside one paragraph.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'अंत में रात को पूरा परिवार साथ बैठकर खाना खाता है', note: 'Compound conjunct verb (बैठकर) shows an IM-level structural move beyond simple sentences.' },
      ],
      wordCount: 142,
      tenseUsed: ['present', 'future'],
      connectorsUsed: ['पहले', 'इसके बाद', 'क्योंकि', 'जब... तब', 'फिर', 'अगर... तो', 'अंत में', 'इसलिए', 'लेकिन'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three clearly organized paragraphs (morning, afternoon, evening) that cannot be rearranged — Text-Type 5 satisfied.',
          'Uses nine distinct connectors (पहले, इसके बाद, क्योंकि, जब...तब, फिर, अगर...तो, अंत में, इसलिए, लेकिन) — far above the 3-connector threshold for IM.',
          'Clock-time precision (साढ़े छह बजे, सवा आठ बजे, तीन बजे, दस बजे) + frequency adverbs (रोज़, आम तौर पर, कभी-कभी) — Topic-Coverage signal is very strong.',
          'Habitual present is sustained accurately across 15+ verbs, then a clean shift to future (उठूँगी, पढ़ूँगी) in the closing — satisfies the "some control of major time frames" rubric line.',
          'Two culturally specific details (दादी के साथ योग, आलू पराठा और दही, शाम की ट्यूशन) — raters register this as authentic, not textbook.',
        ],
        gotchas: [
          'If a male student writes उठती हूँ / लौटती हूँ (feminine endings), Language Control drops to Low and pulls the essay to Benchmark 4.',
          'Dropping the auxiliary ("मैं उठती" instead of "मैं उठती हूँ") in more than one sentence would signal incomplete habitual-present conjugation.',
          'This essay does not include past tense. Adding one past-tense sentence ("कल मंगलवार था, मैं थोड़ी देर से उठी") would seal the third time frame and push the essay closer to Benchmark 6.',
        ],
      },
    },
    {
      prompt:
        'कल आपने क्या किया, और कल आप क्या करेंगे? तीन अनुच्छेदों में अपने परिवार की भूमिका भी बताइए। (What did you do yesterday, and what will you do tomorrow? In three paragraphs, also describe your family\'s role.)',
      novice: 'कल मैं स्कूल गया। आज मैं पढ़ूँगा। कल छुट्टी है।',
      intermediateMid:
        'कल सोमवार था और मेरा दिन हमेशा की तरह शुरू हुआ। मैं सात बजे उठा, लेकिन मैं थोड़ा थका हुआ था, क्योंकि रविवार रात को मैं देर से सोया। मैंने जल्दी-जल्दी नाश्ता किया — माँ ने पोहा बनाया था — और स्कूल की बस पकड़ी। स्कूल में हिंदी का टेस्ट था, इसलिए दोपहर की छुट्टी में मैंने अपनी किताब दोहराई।\n\nशाम को जब मैं घर लौटा, तब दादी ने मेरे लिए चाय और बिस्कुट तैयार रखे थे। हम दोनों बालकनी में बैठकर थोड़ी देर बातें करते रहे। यह मेरी रोज़ की आदत है — दादी के साथ चाय पीना। फिर मैंने दो घंटे होमवर्क किया, रात का खाना खाया, और दस बजे सो गया।\n\nआज मंगलवार है और मेरा दिन व्यस्त रहेगा। सुबह स्कूल, दोपहर को ट्यूशन, और शाम को पिताजी मुझे बाज़ार ले जाएँगे। अगर समय बचेगा, तो हम साथ क्रिकेट मैच भी देखेंगे। मुझे लगता है कि अच्छी दिनचर्या और प्यारा परिवार, दोनों मिलकर हर दिन को खास बना देते हैं।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'कल सोमवार था / मैं सात बजे उठा / मैंने जल्दी-जल्दी नाश्ता किया', note: 'Opens in clean past tense with correct ने usage (मैंने किया) vs no-ने (मैं उठा). Language-Control anchor.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'लेकिन / क्योंकि / इसलिए', note: 'Three reasoning connectors in one paragraph — contrast, cause, consequence — Text-Type 5 signal.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'जब मैं घर लौटा, तब दादी ने ... रखे थे', note: 'जब...तब + past-perfect (रखे थे). Two linked past actions — an Intermediate-Mid marker.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'दादी के साथ चाय पीना / बालकनी में बैठकर बातें', note: 'Two culturally specific Indian-home details — Topic-Coverage lift.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'आज मंगलवार है / दिन व्यस्त रहेगा / बाज़ार ले जाएँगे / देखेंगे', note: 'Full switch into future tense in paragraph 3. With para 1 = past and para 2 = mixed past+habitual, essay clearly demonstrates three time frames.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अगर समय बचेगा, तो ... देखेंगे', note: 'Conditional future (अगर...तो) — a structure raters specifically flag as Benchmark-5.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'अच्छी दिनचर्या और प्यारा परिवार, दोनों मिलकर ... बना देते हैं', note: 'Reflective closing generalizes beyond the narrated events — Text-Type lift.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['लेकिन', 'क्योंकि', 'इसलिए', 'जब... तब', 'फिर', 'अगर... तो'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'All three time frames present and clearly signaled: paragraph 1 = past (उठा, खाया, किया, पकड़ी), paragraph 2 = past + habitual present (रोज़ की आदत है), paragraph 3 = future (रहेगा, जाएँगे, देखेंगे). This is the flagship IM rubric requirement.',
          'ने usage is correct on every transitive past verb (मैंने नाश्ता किया, मैंने होमवर्क किया, मैंने किताब दोहराई) and absent on intransitives (मैं उठा, मैं लौटा, मैं सोया). Language Control stabilizes at High.',
          'Six different connectors used, including the conditional अगर...तो and the linking जब...तब — both explicit Benchmark-5 markers.',
          'Cultural specificity (पोहा, दादी के साथ चाय, बालकनी में बातें, ट्यूशन, क्रिकेट मैच) — five distinct India-rooted details, no textbook generics.',
          'Reflective closing ("अच्छी दिनचर्या और प्यारा परिवार, दोनों मिलकर ...") moves from narration to generalization — a structural move rubrics specifically reward.',
        ],
        gotchas: [
          'If the student writes "मैं नाश्ता किया" (dropping ने), Language Control drops one descriptor.',
          'If the student mixes feminine endings in one paragraph and masculine in another, inconsistency — not choice — pulls the rubric down.',
          'The idiom दिन-रात एक करना could be added to paragraph 1 for a stronger register signal, but its absence does not prevent Benchmark 5.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Essay 1 shows a present-tense routine with a small future extension — the safer path to Benchmark 5. Essay 2 shows past + present + future woven across three paragraphs — the higher-confidence path. Study them until you can reproduce the sentence shapes. The verdict cards tell you exactly which rubric boxes each sentence ticks.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपनी एक सामान्य स्कूल के दिन की दिनचर्या को तीन अनुच्छेदों में लिखिए। सुबह, दोपहर और शाम — तीनों समयों के बारे में बताइए।',
      english:
        'Write your typical school-day routine in three paragraphs. Describe morning, afternoon, and evening.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में'],
        vocab: ['उठना', 'नाश्ता करना', 'स्कूल जाना', 'होमवर्क', 'सोना', 'साढ़े छह बजे'],
        tenses: ['present'],
      },
    },
    {
      hindi:
        'कल आपने सुबह से रात तक क्या-क्या किया? तीन अनुच्छेदों में लिखिए। कम-से-कम एक ऐसा काम बताइए जो आम तौर पर आप नहीं करते।',
      english:
        'What did you do yesterday from morning till night? Write in three paragraphs. Include at least one thing you don\'t usually do.',
      hint: {
        connectors: ['पहले', 'फिर', 'जब... तब', 'क्योंकि', 'लेकिन'],
        vocab: ['उठना', 'नहाना', 'पढ़ना', 'खेलना', 'लौटना', 'सोना'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'छुट्टी के दिन की दिनचर्या स्कूल के दिन की दिनचर्या से कैसे अलग होती है? तीन अनुच्छेदों में तुलना कीजिए और अगले रविवार आप क्या करेंगे, यह भी बताइए।',
      english:
        'How does a holiday routine differ from a school-day routine? Compare in three paragraphs, and also describe what you will do next Sunday.',
      hint: {
        connectors: ['लेकिन', 'जबकि', 'इसलिए', 'अगर... तो', 'अंत में'],
        vocab: ['छुट्टी', 'आम तौर पर', 'रोज़', 'परिवार', 'पसंदीदा'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 stays in habitual present — safest target for a first-draft Benchmark-5 essay. Prompt 2 forces a past-tense narration of one day plus habitual reference, hitting two time frames. Prompt 3 forces comparison (जबकि, लेकिन) AND future tense — the highest-ceiling prompt of the three. Work through all three in order.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'After each essay you draft, score yourself on Text-Type, Language Control, and Topic Coverage. Ask: did I use four or more sequence connectors? Did I sustain habitual-present conjugation? Did I include one clock time and one culturally specific detail? If any answer is "no," revise before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
