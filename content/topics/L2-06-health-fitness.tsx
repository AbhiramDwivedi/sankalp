import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L2-06-health-fitness',
  level: 2,
  themeGroup: 'HumanIngenuity',
  order: 18,
  heroMotif: 'sunrise',
  titleHindi: 'स्वास्थ्य और व्यायाम',
  titleEnglish: 'Health & Fitness',
  hook: 'Modal verbs + habit vocabulary — strong fuel for opinion-and-plan essays.',
  heroPrompt: composeHeroPrompt(
    'A yoga mat with surya-namaskar poses in silhouette, a plate of vegetables and dal in the corner, a running shoe, and a cycle — dawn light through an open balcony door, tulsi plant and a glass of ginger-turmeric water on a side table',
  ),

  rationale: {
    fcpsSubTopics: [
      'Health and Fitness (FCPS Level 2 — Student Life)',
      'Daily routines and habits (FCPS Level 2)',
      'Opinions about lifestyle choices (FCPS Level 2 — ties to Free Time and Food)',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Describe a personal fitness routine using present-habitual plus time markers (रोज़, हमेशा, कभी-कभी).',
      'Express an opinion about a health habit with मुझे लगता है कि / मेरा मानना है कि and a reason.',
      'Use the modal चाहिए correctly to state what one should or should not do.',
      'Shift between past (past illness or memory), present (habit), and future (goal) within one essay.',
      'Integrate one culturally specific detail — yoga, Ayurveda, turmeric-milk, morning walk — to lift Topic Coverage.',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'Health and fitness is one of the FCPS Level 2 prompts that most rewards opinion language and modal verbs. Without चाहिए and मुझे लगता है कि, a student will default to Novice-High lists ("मैं दौड़ता हूँ. मैं योग करता हूँ.") and cap at 2 credits.',
  },

  objectives: [
    {
      text: 'Name at least 12 body parts, symptoms, and activities in Hindi with correct gender.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Use चाहिए in 5 correct sentences without English prompting — habitual and obligation senses.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Write a 3-paragraph routine essay that moves past → present → future with at least 4 connectors.',
      trains: ['TextType'],
    },
    {
      text: 'State an opinion about a health habit and support it with क्योंकि + a concrete reason.',
      trains: ['TextType', 'TopicCoverage'],
    },
    {
      text: 'Add one cultural specific (yoga asana name, home remedy, morning walk) to every health essay.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Body parts
    { hindi: 'सिर', transliteration: 'sir', english: 'head', exampleHindi: 'मेरे सिर में दर्द है।', exampleEnglish: 'My head hurts.', emoji: '🧠', partOfSpeech: 'noun', subgroup: 'Body parts' },
    { hindi: 'पेट', transliteration: 'pet', english: 'stomach', exampleHindi: 'कल से मेरा पेट ठीक नहीं है।', exampleEnglish: 'My stomach has not been well since yesterday.', emoji: '🫃', partOfSpeech: 'noun', subgroup: 'Body parts' },
    { hindi: 'हाथ', transliteration: 'haath', english: 'hand / arm', exampleHindi: 'खाने से पहले हाथ धोने चाहिए।', exampleEnglish: 'One should wash hands before eating.', emoji: '✋', partOfSpeech: 'noun', subgroup: 'Body parts' },
    { hindi: 'पैर', transliteration: 'pair', english: 'foot / leg', exampleHindi: 'दौड़ने से मेरे पैर मज़बूत हुए हैं।', exampleEnglish: 'Running has made my legs stronger.', emoji: '🦵', partOfSpeech: 'noun', subgroup: 'Body parts' },
    { hindi: 'आँखें', transliteration: 'aankhein', english: 'eyes', exampleHindi: 'फ़ोन देखने से आँखें थक जाती हैं।', exampleEnglish: 'The eyes get tired from looking at the phone.', emoji: '👀', partOfSpeech: 'noun', subgroup: 'Body parts' },
    { hindi: 'कान', transliteration: 'kaan', english: 'ear', exampleHindi: 'तेज़ संगीत से कान दुखते हैं।', exampleEnglish: 'Loud music hurts the ears.', emoji: '👂', partOfSpeech: 'noun', subgroup: 'Body parts' },

    // Symptoms
    { hindi: 'बुख़ार', transliteration: 'bukhaar', english: 'fever', exampleHindi: 'कल मुझे तेज़ बुख़ार था।', exampleEnglish: 'Yesterday I had a high fever.', emoji: '🤒', partOfSpeech: 'noun', subgroup: 'Symptoms' },
    { hindi: 'खाँसी', transliteration: 'khaansi', english: 'cough', exampleHindi: 'बदलते मौसम में खाँसी हो जाती है।', exampleEnglish: 'A cough develops in changing weather.', emoji: '😷', partOfSpeech: 'noun', subgroup: 'Symptoms' },
    { hindi: 'सर्दी', transliteration: 'sardi', english: 'cold', exampleHindi: 'सर्दी के लिए माँ अदरक की चाय बनाती हैं।', exampleEnglish: 'Mother makes ginger tea for a cold.', emoji: '🤧', partOfSpeech: 'noun', subgroup: 'Symptoms' },
    { hindi: 'दर्द', transliteration: 'dard', english: 'pain', exampleHindi: 'बहुत बैठने से पीठ में दर्द होता है।', exampleEnglish: 'Sitting too much causes back pain.', emoji: '💢', partOfSpeech: 'noun', subgroup: 'Symptoms' },
    { hindi: 'थकान', transliteration: 'thakaan', english: 'fatigue / tiredness', exampleHindi: 'कम नींद से थकान महसूस होती है।', exampleEnglish: 'Less sleep brings fatigue.', emoji: '😩', partOfSpeech: 'noun', subgroup: 'Symptoms' },

    // Activities
    { hindi: 'व्यायाम', transliteration: 'vyaayaam', english: 'exercise', exampleHindi: 'मैं रोज़ सुबह आधा घंटा व्यायाम करता हूँ।', exampleEnglish: 'I exercise for half an hour every morning.', emoji: '🏋️', partOfSpeech: 'noun', subgroup: 'Activities' },
    { hindi: 'दौड़ना', transliteration: 'daudna', english: 'to run', exampleHindi: 'शाम को हम पार्क में दौड़ते हैं।', exampleEnglish: 'In the evening we run in the park.', emoji: '🏃', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'योग', transliteration: 'yog', english: 'yoga', exampleHindi: 'दादी रोज़ सुबह योग करती हैं।', exampleEnglish: 'Grandmother does yoga every morning.', emoji: '🧘', partOfSpeech: 'noun', subgroup: 'Activities' },
    { hindi: 'ध्यान', transliteration: 'dhyaan', english: 'meditation', exampleHindi: 'ध्यान से मन शांत हो जाता है।', exampleEnglish: 'The mind becomes calm through meditation.', emoji: '🕉️', partOfSpeech: 'noun', subgroup: 'Activities' },
    { hindi: 'साइकिल चलाना', transliteration: 'cycle chalaana', english: 'to cycle', exampleHindi: 'मैं रविवार को साइकिल चलाता हूँ।', exampleEnglish: 'I cycle on Sundays.', emoji: '🚴', partOfSpeech: 'verb', subgroup: 'Activities' },
    { hindi: 'तैरना', transliteration: 'tairna', english: 'to swim', exampleHindi: 'गरमी में तैरना अच्छा लगता है।', exampleEnglish: 'Swimming feels good in summer.', emoji: '🏊', partOfSpeech: 'verb', subgroup: 'Activities' },

    // Health & illness nouns
    { hindi: 'सेहत', transliteration: 'sehat', english: 'health', exampleHindi: 'अच्छी सेहत सबसे बड़ा धन है।', exampleEnglish: 'Good health is the greatest wealth.', emoji: '💪', partOfSpeech: 'noun', subgroup: 'Health' },
    { hindi: 'बीमारी', transliteration: 'beemaari', english: 'illness', exampleHindi: 'सफ़ाई से बीमारी दूर रहती है।', exampleEnglish: 'Cleanliness keeps illness away.', emoji: '🦠', partOfSpeech: 'noun', subgroup: 'Health' },
    { hindi: 'दवा', transliteration: 'davaa', english: 'medicine', exampleHindi: 'डॉक्टर ने तीन दिन की दवा दी।', exampleEnglish: 'The doctor gave three days of medicine.', emoji: '💊', partOfSpeech: 'noun', subgroup: 'Health' },
    { hindi: 'डॉक्टर', transliteration: 'doctor', english: 'doctor', exampleHindi: 'बुख़ार में डॉक्टर के पास जाना चाहिए।', exampleEnglish: 'In a fever, one should go to the doctor.', emoji: '👨‍⚕️', partOfSpeech: 'noun', subgroup: 'Health' },
    { hindi: 'नींद', transliteration: 'neend', english: 'sleep', exampleHindi: 'रोज़ आठ घंटे की नींद ज़रूरी है।', exampleEnglish: 'Eight hours of sleep every day is essential.', emoji: '😴', partOfSpeech: 'noun', subgroup: 'Health' },

    // Food quality
    { hindi: 'पौष्टिक', transliteration: 'paushtik', english: 'nutritious', exampleHindi: 'दाल-चावल एक पौष्टिक खाना है।', exampleEnglish: 'Daal-rice is a nutritious meal.', emoji: '🥗', partOfSpeech: 'adjective', subgroup: 'Food quality' },
    { hindi: 'तले हुए', transliteration: 'tale hue', english: 'fried', exampleHindi: 'तले हुए खाने से सेहत बिगड़ती है।', exampleEnglish: 'Fried food spoils health.', emoji: '🍟', partOfSpeech: 'adjective', subgroup: 'Food quality' },
    { hindi: 'ताज़ा', transliteration: 'taaza', english: 'fresh', exampleHindi: 'माँ ताज़ी सब्ज़ियाँ ख़रीदती हैं।', exampleEnglish: 'Mother buys fresh vegetables.', emoji: '🥬', partOfSpeech: 'adjective', subgroup: 'Food quality' },
    { hindi: 'साफ़', transliteration: 'saaf', english: 'clean', exampleHindi: 'साफ़ पानी पीना चाहिए।', exampleEnglish: 'One should drink clean water.', emoji: '💧', partOfSpeech: 'adjective', subgroup: 'Food quality' },

    // Modal / habit
    { hindi: 'चाहिए', transliteration: 'chaahiye', english: 'should / ought to', exampleHindi: 'हमें रोज़ व्यायाम करना चाहिए।', exampleEnglish: 'We should exercise every day.', emoji: '✅', partOfSpeech: 'verb', subgroup: 'Modal' },
    { hindi: 'रोज़', transliteration: 'roz', english: 'every day / daily', exampleHindi: 'दादाजी रोज़ सुबह टहलते हैं।', exampleEnglish: 'Grandfather walks every morning.', emoji: '📅', partOfSpeech: 'adverb', subgroup: 'Habit' },
    { hindi: 'कभी-कभी', transliteration: 'kabhi-kabhi', english: 'sometimes', exampleHindi: 'कभी-कभी मैं मिठाई भी खा लेता हूँ।', exampleEnglish: 'Sometimes I also eat sweets.', emoji: '🔁', partOfSpeech: 'adverb', subgroup: 'Habit' },
  ],
  vocabularyNote: {
    why:
      'These 30 words are the narrow set FCPS Level-2 health prompts pull from. Body parts anchor symptom descriptions, activities anchor routine descriptions, and the habit adverbs (रोज़, कभी-कभी) unlock the present-habitual tense raters score for Language Control. चाहिए is the single most useful modal in a health essay — learn it first.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'The modal चाहिए — "should / ought to"',
      rule:
        'Use को + infinitive + चाहिए to express what someone should do. The subject takes को (मुझे, तुम्हें, हमें, उसे). चाहिए itself does not conjugate for the subject; it stays चाहिए in habitual / general advice. The infinitive does agree with the object for gender when the object is present.',
      examples: [
        { hindi: 'मुझे रोज़ व्यायाम करना चाहिए।', transliteration: 'mujhe roz vyaayaam karna chaahiye.', english: 'I should exercise every day.' },
        { hindi: 'बच्चों को तले हुए खाने से बचना चाहिए।', transliteration: 'bachchon ko tale hue khaane se bachna chaahiye.', english: 'Children should avoid fried food.' },
        { hindi: 'हमें आठ घंटे की नींद लेनी चाहिए।', transliteration: 'humein aath ghante ki neend leni chaahiye.', english: 'We should get eight hours of sleep. (नींद is feminine → लेनी)' },
      ],
      pitfall:
        'Writing "मैं व्यायाम करना चाहिए" (nominative subject) is the most common error. The subject of चाहिए must be in the dative case — मुझे, not मैं.',
      whyItMatters:
        'चाहिए is the only modal raters expect to see at Intermediate-Mid on a health essay. Getting three clean चाहिए sentences across the essay demonstrates Language Control at the Average band and unlocks Benchmark 5.',
    },
    {
      title: 'Opinion frames — मुझे लगता है कि / मेरा मानना है कि',
      rule:
        'To voice an opinion — the core move in any health-habit essay — open the sentence with मुझे लगता है कि or मेरा मानना है कि, then supply a full clause. The following clause is ordinary subject-verb and takes the normal tense of what the opinion is about.',
      examples: [
        { hindi: 'मुझे लगता है कि योग सबसे अच्छा व्यायाम है।', transliteration: 'mujhe lagta hai ki yog sabse achchha vyaayaam hai.', english: 'I think yoga is the best exercise.' },
        { hindi: 'मेरा मानना है कि नींद दवा से ज़्यादा ज़रूरी है।', transliteration: 'mera maanna hai ki neend davaa se zyaada zaroori hai.', english: 'I believe sleep is more essential than medicine.' },
        { hindi: 'मुझे लगता है कि बच्चों को ज़्यादा बाहर खेलना चाहिए।', transliteration: 'mujhe lagta hai ki bachchon ko zyaada baahar khelna chaahiye.', english: 'I think children should play outside more.' },
      ],
      pitfall:
        'Dropping कि after लगता है produces a run-on. Always: [opinion frame] + कि + [full clause with its own verb].',
      whyItMatters:
        'Opinion frames are a Text-Type signal. The rater specifically looks for "can the student voice and justify an opinion?" — a Benchmark 5 requirement. One opinion frame per paragraph is the target.',
    },
    {
      title: 'Habit adverbs — रोज़, हमेशा, कभी-कभी',
      rule:
        'Place the adverb before the verb to mark a habit. रोज़ = every day, हमेशा = always, कभी-कभी = sometimes. These force the present-habitual conjugation (करता/करती हूँ) and make a routine essay sound native.',
      examples: [
        { hindi: 'मैं रोज़ सुबह छह बजे उठता हूँ।', transliteration: 'main roz subah chhah baje uthta hoon.', english: 'I wake up at six every morning.' },
        { hindi: 'माँ हमेशा पौष्टिक खाना बनाती हैं।', transliteration: 'maa hamesha paushtik khaana banaati hain.', english: 'Mother always makes nutritious food.' },
        { hindi: 'कभी-कभी मैं दोस्तों के साथ साइकिल चलाता हूँ।', transliteration: 'kabhi-kabhi main doston ke saath cycle chalaata hoon.', english: 'Sometimes I cycle with friends.' },
      ],
      pitfall:
        'Students often write "मैं रोज़ व्यायाम किया" — mixing a habit adverb with a past-perfective verb. Habit adverbs require the present-habitual: किया → करता हूँ.',
      whyItMatters:
        'Two clean habit-adverb sentences prove the student controls the present-habitual, which is half of the "major time frames" the rubric scores for Language Control.',
    },
    {
      title: 'अगर...तो conditional for health consequences',
      rule:
        'Use अगर + [cause clause] + तो + [consequence clause] to link a habit to its outcome. Inside the अगर clause, use the present (generic conditional) or future (specific future conditional). Inside the तो clause, use the future or an imperative.',
      examples: [
        { hindi: 'अगर तुम रोज़ दौड़ोगे, तो बीमारी दूर रहेगी।', transliteration: 'agar tum roz daudoge, to beemaari door rahegi.', english: 'If you run every day, illness will stay away.' },
        { hindi: 'अगर नींद कम है, तो थकान ज़्यादा होगी।', transliteration: 'agar neend kam hai, to thakaan zyaada hogi.', english: 'If sleep is less, fatigue will be more.' },
        { hindi: 'अगर हम पौष्टिक खाना खाएँगे, तो दवा की ज़रूरत नहीं होगी।', transliteration: 'agar hum paushtik khaana khaayenge, to davaa ki zaroorat nahin hogi.', english: 'If we eat nutritious food, we will not need medicine.' },
      ],
      pitfall:
        'Dropping तो makes the two halves look like unrelated sentences. Keep तो — it visually signals the consequence clause to the rater.',
      whyItMatters:
        'The conditional lets the student bring the future tense into a health essay naturally, completing the past-present-future triangle the rubric requires at Benchmark 5.',
    },
  ],
  grammarNote: {
    why:
      'These four structures — चाहिए, opinion frames, habit adverbs, and the conditional — are everything a health essay needs grammatically. A student who owns these four will produce opinion-and-plan prose at Intermediate-Mid without straining. The only other grammar the topic demands is gender agreement, which the vocabulary list already models.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'agarTo',
    'mujheLagta',
  ]),
  connectorsNote: {
    why:
      'This selection pairs the sequence connectors (पहले, फिर) for routine description with the reasoning set (क्योंकि, इसलिए, लेकिन) that a health-opinion essay lives on. अगर...तो adds the future frame. मुझे लगता है कि is the hinge of every opinion paragraph — include it at least once per essay.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरी सुबह की दिनचर्या · My Morning Routine',
    hindi:
      'मैं रोज़ सुबह छह बजे उठता हूँ, क्योंकि सुबह की हवा सबसे साफ़ होती है। पहले मैं एक गिलास गरम पानी पीता हूँ, जिसमें माँ नींबू और थोड़ी हल्दी डालती हैं। फिर मैं बीस मिनट योग करता हूँ — सूर्य नमस्कार और थोड़ा ध्यान। इसके बाद मैं पार्क में आधा घंटा दौड़ता हूँ। मेरे दादाजी भी वहाँ टहलने आते हैं, और हम साथ लौटते हैं। नाश्ते में माँ पौष्टिक खाना बनाती हैं — ओट्स, फल, और एक गिलास दूध। पहले मुझे सुबह उठना मुश्किल लगता था, लेकिन अब आदत बन गई है। मुझे लगता है कि अच्छी सेहत के लिए रोज़ का व्यायाम दवा से ज़्यादा ज़रूरी है। अगर मैं एक दिन भी योग नहीं करूँ, तो दिन भर थकान महसूस होती है। इसलिए मैं यह आदत कभी नहीं छोड़ूँगा।',
    transliteration:
      'main roz subah chhah baje uthta hoon, kyonki subah ki hawa sabse saaf hoti hai. pahle main ek gilaas garam paani peeta hoon, jismein maa neemboo aur thodi haldi daalti hain. phir main bees minute yog karta hoon — surya namaskaar aur thoda dhyaan. iske baad main paark mein aadha ghanta daudta hoon. mere daadaji bhi vahaan tahalne aate hain, aur hum saath lautte hain. naashte mein maa paushtik khaana banaati hain — oats, phal, aur ek gilaas doodh. pahle mujhe subah uthna mushkil lagta tha, lekin ab aadat ban gayi hai. mujhe lagta hai ki achchhi sehat ke liye roz ka vyaayaam davaa se zyaada zaroori hai. agar main ek din bhi yog nahin karoon, to din bhar thakaan mahsoos hoti hai. isliye main yah aadat kabhi nahin chhodoonga.',
    english:
      'I wake up at six every morning, because the morning air is the cleanest. First I drink a glass of warm water, into which Mother puts lemon and a little turmeric. Then I do twenty minutes of yoga — Surya Namaskar and a little meditation. After that I run for half an hour in the park. My grandfather also comes there for a walk, and we return together. For breakfast Mother makes nutritious food — oats, fruit, and a glass of milk. Earlier I used to find waking up in the morning difficult, but now it has become a habit. I think that for good health, daily exercise is more essential than medicine. If I do not do yoga even for one day, I feel fatigued the whole day. So I will never give up this habit.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद', note: 'Three sequence connectors scaffold the routine — sentences cannot be rearranged, the Text-Type 5 test.' },
      { term: 'मुझे लगता है कि ... दवा से ज़्यादा ज़रूरी', note: 'Opinion frame followed by a comparison. This one sentence alone carries the opinion move raters look for.' },
      { term: 'अगर ... तो ... थकान महसूस होती है', note: 'Conditional clause linking habit to consequence — brings a third logical dimension to the essay.' },
      { term: 'पहले मुश्किल लगता था, लेकिन अब आदत बन गई है', note: 'Clean past-imperfect → present-perfect shift in one sentence. Two time frames, zero confusion.' },
      { term: 'नींबू, हल्दी, सूर्य नमस्कार', note: 'Three culturally specific details (home remedy, Ayurvedic staple, yoga asana). Topic Coverage jumps from generic to authentic.' },
    ],
    comprehensionQuestions: [
      { q: 'At what time does the narrator wake up, and why?', a: 'छह बजे, क्योंकि सुबह की हवा सबसे साफ़ होती है.' },
      { q: 'What does the narrator drink first in the morning?', a: 'गरम पानी with नींबू and हल्दी.' },
      { q: 'Which yoga practice is mentioned by name?', a: 'सूर्य नमस्कार (plus ध्यान).' },
      { q: 'Who else joins the narrator in the park?', a: 'दादाजी, who comes to walk.' },
      { q: 'What does Mother make for breakfast?', a: 'ओट्स, फल, और एक गिलास दूध — a पौष्टिक meal.' },
      { q: 'What happens if the narrator skips yoga for a day?', a: 'दिन भर थकान महसूस होती है.' },
      { q: 'Identify one opinion in the passage and the connector that introduces it.', a: 'मुझे लगता है कि अच्छी सेहत के लिए रोज़ का व्यायाम दवा से ज़्यादा ज़रूरी है — introduced by मुझे लगता है कि.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is the target shape of a Benchmark-5 health essay: habit adverb, sequence connectors, one opinion with a reason, one conditional with a consequence, and two culturally specific details (नींबू-हल्दी पानी, सूर्य नमस्कार). Read it aloud three times before attempting a prompt — the sentence shapes will start to feel automatic.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'स्कूल के फिटनेस क्लब की समय-सारणी · School Fitness Club Schedule',
      hindi:
        'सोमवार - सुबह 6:30 - दौड़ (पार्क)\nमंगलवार - शाम 4:00 - योग (हॉल)\nबुधवार - सुबह 6:30 - साइकिल\nगुरुवार - शाम 4:00 - बैडमिंटन\nशुक्रवार - सुबह 6:30 - ध्यान\nशनिवार - शाम 4:00 - क्रिकेट\nरविवार - आराम का दिन',
      transliteration:
        'somvaar — subah 6:30 — daud (paark) | mangalvaar — shaam 4:00 — yog (hall) | budhvaar — subah 6:30 — cycle | guruvaar — shaam 4:00 — badminton | shukravaar — subah 6:30 — dhyaan | shanivaar — shaam 4:00 — cricket | ravivaar — aaraam ka din',
      english:
        'Monday — 6:30 AM — running (park) · Tuesday — 4:00 PM — yoga (hall) · Wednesday — 6:30 AM — cycling · Thursday — 4:00 PM — badminton · Friday — 6:30 AM — meditation · Saturday — 4:00 PM — cricket · Sunday — rest day',
    },
    {
      kind: 'diary',
      title: 'बीमारी का दिन · A Sick Day',
      hindi:
        'आज मैं स्कूल नहीं गया, क्योंकि रात से मुझे तेज़ बुख़ार और खाँसी थी। माँ ने हल्दी वाला दूध बनाया और डॉक्टर को फ़ोन किया। डॉक्टर ने तीन दिन की दवा दी और आराम करने को कहा। मुझे लगता है कि मैंने कल ठंडा पानी बहुत पी लिया था, इसलिए यह हुआ। कल से मैं ज़्यादा ध्यान रखूँगा।',
      transliteration:
        'aaj main school nahin gaya, kyonki raat se mujhe tez bukhaar aur khaansi thi. maa ne haldi vaala doodh banaaya aur doctor ko phone kiya. doctor ne teen din ki davaa di aur aaraam karne ko kaha. mujhe lagta hai ki maine kal thanda paani bahut pee liya tha, isliye yah hua. kal se main zyaada dhyaan rakhoonga.',
      english:
        'I did not go to school today, because I had a high fever and cough since last night. Mother made turmeric milk and called the doctor. The doctor gave three days of medicine and told me to rest. I think I drank too much cold water yesterday, so this happened. From tomorrow I will take more care.',
    },
    {
      kind: 'poster',
      title: 'स्वस्थ रहो, खुश रहो · Stay Healthy, Stay Happy',
      hindi:
        'रोज़ आधा घंटा व्यायाम करो। 🏃\nआठ घंटे की नींद लो। 😴\nताज़े फल और सब्ज़ियाँ खाओ। 🥗\nतले हुए खाने से बचो। 🍟❌\nसाफ़ पानी पियो। 💧\nहाथ धोना मत भूलो।',
      transliteration:
        'roz aadha ghanta vyaayaam karo. aath ghante ki neend lo. taaze phal aur sabziyaan khaao. tale hue khaane se bacho. saaf paani piyo. haath dhona mat bhoolo.',
      english:
        'Exercise half an hour every day. Get eight hours of sleep. Eat fresh fruits and vegetables. Avoid fried food. Drink clean water. Do not forget to wash your hands.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! कल सुबह पार्क में दौड़ने चलेगा? 6:30 बजे मिलते हैं। इसके बाद हम नाश्ते में ताज़ा फल खाएँगे, मेरी माँ बना देंगी 🥭। तू ज़्यादा देर मत सोना!',
      transliteration:
        'are! kal subah paark mein daudne chalega? 6:30 baje milte hain. iske baad hum naashte mein taaza phal khaayenge, meri maa bana dengi. tu zyaada der mat sona!',
      english:
        'Hey! Will you come running in the park tomorrow morning? Let us meet at 6:30. After that we will eat fresh fruit for breakfast — my mom will make it. Do not sleep too long!',
    },
  ],
  modelTextsNote: {
    why:
      'Four text types — schedule, diary, poster, SMS — cover the registers a health-topic prompt can pull from. The schedule trains vocabulary in list form, the diary models a past-tense illness memory, the poster drills imperative-advice phrasing, and the SMS shows casual future-plan register.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Yoga is Morning Infrastructure',
      body:
        'In most Indian homes, योग (yoga) is not a gym class but a daily practice, often done on a balcony or rooftop at sunrise. Names like सूर्य नमस्कार (Surya Namaskar) and प्राणायाम (breathing exercises) are common vocabulary from childhood, so dropping one into an essay reads as lived experience.',
      emoji: '🧘',
    },
    {
      title: 'आयुर्वेद and the Home Remedy Kit',
      body:
        'Before medicine, Indian mothers reach for हल्दी (turmeric), अदरक (ginger), तुलसी (holy basil), and शहद (honey). "हल्दी वाला दूध" for a cold, "अदरक की चाय" for a cough — these आयुर्वेद-rooted fixes are universal. Mentioning one turns a generic "I was sick" sentence into a cultural specific.',
      emoji: '🌿',
    },
    {
      title: 'The Evening Family Walk',
      body:
        'Across urban India — Delhi parks, Mumbai promenades, Lucknow gardens — the after-dinner टहलना (walk) is a social ritual. Grandparents, parents, and children stroll together for 20–30 minutes. Tying fitness to family ("दादाजी के साथ टहलना") adds emotional specificity raters reward.',
      emoji: '🚶',
    },
    {
      title: 'Cricket and Badminton as Everyday Sport',
      body:
        'Indian teens do not usually say "I play sports." They play क्रिकेट in a गली (lane), बैडमिंटन in a park, or कबड्डी at school. Naming the specific sport, not a generic category, is the move that lifts Topic Coverage.',
      emoji: '🏏',
    },
    {
      title: 'Sleep, नींद, and the Loyola Lecture',
      body:
        'Indian elders treat आठ घंटे की नींद (eight hours of sleep) and सुबह जल्दी उठना (waking up early) as the foundations of सेहत. Echoing this in an essay ("दादी कहती हैं कि...") is a way to voice an opinion through a cultural authority figure — a sophisticated Text-Type move.',
      emoji: '🌅',
    },
  ],
  culturalNote: {
    why:
      'A health essay without a cultural specific reads as a Google-translated wellness blog. Inserting one concrete detail — a turmeric home remedy, a Surya Namaskar, an evening walk with grandparents — turns a generic response into an Intermediate-Mid personal essay. Pick one, weave it in early.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'स्वास्थ्य ही धन है',
      literal: 'health itself is wealth',
      meaning: 'Good health is the most valuable thing one can have.',
      example: 'दादाजी हमेशा कहते हैं कि स्वास्थ्य ही धन है, इसलिए हमें रोज़ व्यायाम करना चाहिए।',
      exampleEnglish: 'Grandfather always says that health is wealth, so we should exercise every day.',
    },
    {
      phrase: 'जान है तो जहान है',
      literal: 'if there is life, there is a world',
      meaning: 'As long as you are alive and well, everything else can be managed — take care of yourself first.',
      example: 'इतनी पढ़ाई मत करो, थोड़ा आराम भी करो — जान है तो जहान है।',
      exampleEnglish: 'Do not study so much, rest a little too — if you are well, everything else follows.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are genuine, widely used, and directly on-topic. Dropping one into the closing sentence of an essay — attributed to a parent or grandparent — lifts register without adding grammar risk. One idiom per essay is plenty.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपनी सेहत का ध्यान रखने के लिए आप क्या करते हैं? तीन अनुच्छेदों में लिखिए। (What do you do to take care of your health? Write in three paragraphs.)',
      novice:
        'मैं योग करता हूँ। खाना अच्छा है। मैं ठीक हूँ।',
      intermediateMid:
        'मैं रोज़ सुबह छह बजे उठता हूँ, क्योंकि सुबह का समय सबसे शांत होता है। पहले मैं बीस मिनट योग करता हूँ, फिर पार्क में आधा घंटा दौड़ता हूँ। दादाजी भी मेरे साथ टहलते हैं, और हम बातें करते हुए लौटते हैं।\n\nनाश्ते में माँ हमेशा पौष्टिक खाना बनाती हैं — ओट्स, फल और दूध। तले हुए खाने से मैं बचता हूँ, क्योंकि पिछले साल गरमी में मुझे पेट की बीमारी हुई थी। डॉक्टर ने तब कहा था कि ताज़ा खाना ही सबसे अच्छी दवा है। उस दिन से मैंने बाहर का खाना कम कर दिया।\n\nमुझे लगता है कि अच्छी सेहत के लिए सिर्फ़ व्यायाम काफ़ी नहीं है, बल्कि नींद और पानी भी ज़रूरी हैं। अगर मैं आठ घंटे सो पाऊँगा और रोज़ योग करूँगा, तो बीमारी दूर रहेगी। दादी कहती हैं — जान है तो जहान है, और मुझे यह बात अब समझ आती है।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / पहले / फिर', note: 'Three connectors in two sentences build the routine frame cleanly.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'दादाजी भी मेरे साथ टहलते हैं', note: 'The family walk — one of the specific Indian cultural details raters reward.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले साल ... हुई थी / कहा था', note: 'Past-perfect dropped in mid-essay — shifts tense without breaking flow.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'पौष्टिक / तले हुए / ताज़ा', note: 'Three food-quality adjectives with correct gender agreement — pure Topic Coverage.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... काफ़ी नहीं है, बल्कि ... भी', note: '"Not-only-but-also" construction — a hallmark Intermediate-Mid move.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर ... पाऊँगा ... तो ... रहेगी', note: 'Conditional + future — the third time frame closes the essay.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'जान है तो जहान है', note: 'On-topic muhavara placed in grandmother\'s voice — register lift, zero grammar risk.' },
      ],
      wordCount: 147,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'पहले', 'फिर', 'लेकिन', 'इसलिए', 'अगर... तो', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs, each with a distinct role (routine / illness-memory / opinion-plus-plan) — sentences cannot be rearranged without breaking meaning. Text-Type 5 confirmed.',
          'Uses past (हुई थी, कहा था), present (करता हूँ, बनाती हैं), and future (पाऊँगा, रहेगी) within 147 words — full major-time-frame control per the Benchmark 5 descriptor.',
          'Gender agreement stays clean across 10+ nouns: पौष्टिक खाना (m), तले हुए खाने (m.oblique), पेट की बीमारी (f). Language Control lands at Average or High.',
          'One opinion frame (मुझे लगता है कि) plus one idiom (जान है तो जहान है) — the essay voices a point of view rather than listing facts.',
          'Concrete cultural details (दादाजी का टहलना, ओट्स-फल नाश्ता, दादी का कहना) raise Topic Coverage above the generic.',
        ],
        gotchas: [
          'If the student writes "मैं चाहिए" instead of "मुझे चाहिए," Language Control drops a band immediately.',
          'Collapsing all three paragraphs into one block would drop the essay to Benchmark 4 despite identical vocabulary.',
        ],
      },
    },
    {
      prompt:
        'क्या आजकल के छात्र अपनी सेहत का पर्याप्त ध्यान रखते हैं? अपनी राय तीन अनुच्छेदों में दीजिए। (Do today\'s students take enough care of their health? Give your opinion in three paragraphs.)',
      novice: 'छात्र बीमार हैं। फ़ोन बुरा है। व्यायाम अच्छा है।',
      intermediateMid:
        'मुझे लगता है कि आजकल के अधिकतर छात्र अपनी सेहत का पूरा ध्यान नहीं रखते। वे देर रात तक फ़ोन देखते हैं, इसलिए सुबह जल्दी नहीं उठ पाते। इसके अलावा, बहुत से छात्र व्यायाम की जगह वीडियो गेम खेलते हैं, जिससे पीठ और आँखों में दर्द होता है।\n\nपिछले महीने मेरे एक दोस्त को तेज़ बुख़ार और थकान हुई। डॉक्टर ने बताया कि उसकी नींद कम है और वह तले हुए खाने ज़्यादा खाता है। माँ ने उसे हल्दी वाला दूध दिया और डॉक्टर ने दवा लिखी, लेकिन असली इलाज तो उसकी आदतें बदलना था।\n\nमेरा मानना है कि हर छात्र को रोज़ कम से कम आधा घंटा कोई खेल खेलना चाहिए — क्रिकेट, बैडमिंटन, या योग — और पौष्टिक खाना खाना चाहिए। अगर हम अभी से ध्यान रखेंगे, तो बड़े होकर बीमारियाँ दूर रहेंगी। स्वास्थ्य ही धन है, और यह धन पढ़ाई से कम ज़रूरी नहीं है।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मुझे लगता है कि ... पूरा ध्यान नहीं रखते', note: 'Opinion frame opens the essay — claim-first structure the rubric loves.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'इसलिए / इसके अलावा', note: 'Two reasoning connectors in one paragraph — builds the argument, not just a list.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'पीठ और आँखों में दर्द', note: 'Specific body-part vocabulary tied to a specific cause. Topic Coverage.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले महीने ... हुई / बताया / दिया / लिखी', note: 'Clean past-perfective chain anchors the illustrative anecdote — meets the past-tense requirement.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'हल्दी वाला दूध', note: 'Ayurvedic home remedy — one word of cultural specificity lifts the essay out of generic health-advice mode.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'हर छात्र को ... खेलना चाहिए ... खाना चाहिए', note: 'Two parallel चाहिए clauses — demonstrates full modal control.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगर ... रखेंगे, तो ... दूर रहेंगी', note: 'Conditional in the future tense closes the argument — third time frame secured.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'स्वास्थ्य ही धन है', note: 'Topic-appropriate muhavara placed as a closing line — register lift.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['मुझे लगता है कि', 'इसलिए', 'इसके अलावा', 'लेकिन', 'अगर... तो', 'मेरा मानना है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Opens with an explicit opinion (मुझे लगता है कि ... पूरा ध्यान नहीं रखते) and sustains the argument across three paragraphs — the claim-evidence-recommendation arc is textbook Benchmark 5.',
          'Past (हुई, दिया, लिखी), present (रखते, खेलते), and future (रखेंगे, रहेंगी) all appear, each anchored to a distinct paragraph. Language Control for tense reaches Average.',
          'Two parallel चाहिए constructions in paragraph three demonstrate modal mastery — the exact grammar the pack targets.',
          'Six different connectors (मुझे लगता है कि, इसलिए, इसके अलावा, लेकिन, अगर…तो, मेरा मानना है कि) scaffold the logic. Text-Type above threshold.',
          'Cultural detail (हल्दी वाला दूध) and sport names (क्रिकेट, बैडमिंटन, योग) give Topic Coverage concrete texture.',
        ],
        gotchas: [
          'If the student conjugates चाहिए to match the subject ("छात्र चाहिए") instead of leaving it invariant, Language Control drops.',
          'Writing "मैं सोचता हूँ" as a literal translation of "I think" works but reads weaker than मुझे लगता है कि — prefer the idiomatic frame.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two contrasting essays — one descriptive (my routine) and one argumentative (do students take care?) — cover the two shapes FCPS health prompts take. Study the verdict cards; raters think in those boxes.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपनी रोज़ की फिटनेस दिनचर्या के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप क्या करते हैं, क्यों करते हैं, और आगे क्या सुधार लाना चाहते हैं।',
      english:
        'Write three paragraphs about your daily fitness routine. Describe what you do, why you do it, and what improvement you want to bring next.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसलिए', 'अगर... तो'],
        vocab: ['व्यायाम', 'योग', 'दौड़ना', 'पौष्टिक', 'नींद', 'रोज़'],
        tenses: ['present', 'future'],
      },
    },
    {
      hindi:
        'एक बार जब आप बीमार हुए थे, उस अनुभव को तीन अनुच्छेदों में लिखिए। बताइए कि क्या हुआ, किसने आपकी मदद की, और आपने उससे क्या सीखा।',
      english:
        'Write three paragraphs about a time you were sick. Describe what happened, who helped you, and what you learned from it.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'लेकिन', 'इसलिए'],
        vocab: ['बुख़ार', 'खाँसी', 'दवा', 'डॉक्टर', 'दादी', 'हल्दी'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'आपके विचार में एक छात्र को स्वस्थ रहने के लिए क्या करना चाहिए? तीन अनुच्छेदों में अपनी राय दीजिए और उदाहरण देकर समझाइए।',
      english:
        'In your opinion, what should a student do to stay healthy? Give your opinion in three paragraphs with examples.',
      hint: {
        connectors: ['मुझे लगता है कि', 'क्योंकि', 'इसके अलावा', 'अगर... तो'],
        vocab: ['सेहत', 'चाहिए', 'व्यायाम', 'तले हुए', 'नींद', 'ताज़ा'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'The three prompts rotate the three shapes an FCPS Level-2 health question can take: routine description (present-habitual focus), past-illness narrative (past-tense focus), and opinion-advice (modal + future focus). Together they force the student to practice all three major time frames.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade each essay against the rubric. A Benchmark-5 health essay needs: three paragraphs, at least one चाहिए, at least one opinion frame, at least one conditional or future sentence, and at least one cultural specific. Missing any two of those drops the essay to Benchmark 4.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
