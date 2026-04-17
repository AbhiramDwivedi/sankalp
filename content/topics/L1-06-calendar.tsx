import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L1-06-calendar',
  level: 1,
  themeGroup: 'Identity',
  order: 6,
  heroMotif: 'clock',
  titleHindi: 'दिन, महीने और कैलेंडर',
  titleEnglish: 'Days, Months & Calendar',
  hook: 'Temporal vocabulary is the raw material for time-frame shifts - the Intermediate-Mid lever.',
  heroPrompt: composeHeroPrompt(
    'A stylized calendar page with Hindi month names, marigold garlands draped at the corners, seasonal motifs - monsoon clouds, winter mist, summer sun - flowing across',
  ),

  rationale: {
    fcpsSubTopics: [
      'Days, Months, and Calendar (FCPS Level 1 - School Life)',
      'Daily and weekly routines (FCPS Level 1 - School Life)',
      'Bridges into Weather and Seasons (FCPS Level 1) through seasonal vocabulary',
    ],
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Name the 7 days, 12 Gregorian months, at least 2 Hindu lunar months, and 6 Indian seasons in Hindi',
      'Place an event on a specific day using the "सोमवार को" and "5 मई को" constructions',
      'Shift between past (पिछले हफ़्ते), present (इस हफ़्ते), and future (अगले हफ़्ते) within one paragraph',
      'Describe a weekly routine in 3 cohesive paragraphs using sequence connectors',
      'Use relative time markers (कल, परसों, अगले महीने) without tense confusion',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '75 min reading + 30 min essay',
    ifSkippedRisk:
      'Without the calendar vocabulary bank and the पिछले/इस/अगले frame, the student cannot signal past/present/future reliably. Every FCPS Benchmark-5 essay demands visible tense shifts - skip this pack and the student stalls at Intermediate-Low (2 credits) no matter how rich the topic vocabulary is.',
  },

  objectives: [
    {
      text: 'Recite all 7 Hindi days and 12 Hindi months from memory, in order, without English crutches.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'Use "दिन को" and "तारीख़ को" constructions correctly to place an event in time (e.g., सोमवार को, 5 मई को).',
      trains: ['LanguageControl'],
    },
    {
      text: 'Produce three connected sentences in three different time frames using पिछले / इस / अगले + noun.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Describe a typical week in 3 paragraphs with at least four sequence connectors and two day-specific details.',
      trains: ['TextType'],
    },
    {
      text: 'Include one culturally specific time-marker (Hindu lunar month, festival, or Indian season) in any calendar essay to lift Topic Coverage.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // Days of the week
    { hindi: 'सोमवार', transliteration: 'somvaar', english: 'Monday', exampleHindi: 'सोमवार को मेरी हिंदी की कक्षा है।', exampleEnglish: 'I have Hindi class on Monday.', emoji: '📘', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'मंगलवार', transliteration: 'mangalvaar', english: 'Tuesday', exampleHindi: 'मंगलवार को हम गणित का टेस्ट देते हैं।', exampleEnglish: 'On Tuesday we take a math test.', emoji: '📕', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'बुधवार', transliteration: 'budhvaar', english: 'Wednesday', exampleHindi: 'बुधवार को स्कूल में संगीत होता है।', exampleEnglish: 'On Wednesday there is music at school.', emoji: '📗', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'गुरुवार', transliteration: 'guruvaar', english: 'Thursday', exampleHindi: 'गुरुवार को मैं पुस्तकालय जाता हूँ।', exampleEnglish: 'I go to the library on Thursday.', emoji: '📙', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'शुक्रवार', transliteration: 'shukravaar', english: 'Friday', exampleHindi: 'शुक्रवार को स्कूल जल्दी ख़त्म होता है।', exampleEnglish: 'School ends early on Friday.', emoji: '📒', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'शनिवार', transliteration: 'shanivaar', english: 'Saturday', exampleHindi: 'शनिवार को मैं देर से उठता हूँ।', exampleEnglish: 'On Saturday I wake up late.', emoji: '🛌', partOfSpeech: 'noun', subgroup: 'Days' },
    { hindi: 'रविवार', transliteration: 'ravivaar', english: 'Sunday', exampleHindi: 'रविवार को हमारा परिवार साथ खाना खाता है।', exampleEnglish: 'On Sunday our family eats together.', emoji: '🍽️', partOfSpeech: 'noun', subgroup: 'Days' },

    // Gregorian months (selective - the ones students actually use in essays)
    { hindi: 'जनवरी', transliteration: 'janvari', english: 'January', exampleHindi: 'जनवरी में बहुत ठंड पड़ती है।', exampleEnglish: 'It is very cold in January.', emoji: '❄️', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },
    { hindi: 'मार्च', transliteration: 'march', english: 'March', exampleHindi: 'मार्च में हमारी परीक्षा होती है।', exampleEnglish: 'Our exam is in March.', emoji: '📝', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },
    { hindi: 'मई', transliteration: 'mai', english: 'May', exampleHindi: 'मई में गर्मी की छुट्टियाँ शुरू होती हैं।', exampleEnglish: 'Summer vacation starts in May.', emoji: '🌞', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },
    { hindi: 'जुलाई', transliteration: 'julai', english: 'July', exampleHindi: 'जुलाई में भारत में बहुत बारिश होती है।', exampleEnglish: 'It rains a lot in India in July.', emoji: '🌧️', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },
    { hindi: 'अक्टूबर', transliteration: 'october', english: 'October', exampleHindi: 'अक्टूबर में दशहरा आता है।', exampleEnglish: 'Dussehra comes in October.', emoji: '🏹', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },
    { hindi: 'दिसंबर', transliteration: 'disambar', english: 'December', exampleHindi: 'दिसंबर में स्कूल की लंबी छुट्टी होती है।', exampleEnglish: 'There is a long school break in December.', emoji: '🎄', partOfSpeech: 'noun', subgroup: 'Months (Gregorian)' },

    // Hindu lunar months
    { hindi: 'चैत्र', transliteration: 'chaitra', english: 'Chaitra (lunar month, Mar–Apr)', exampleHindi: 'चैत्र में हिंदू नववर्ष मनाया जाता है।', exampleEnglish: 'Hindu New Year is celebrated in Chaitra.', emoji: '🌼', partOfSpeech: 'noun', subgroup: 'Months (Hindu lunar)' },
    { hindi: 'श्रावण', transliteration: 'shraavan', english: 'Shravan (lunar month, Jul–Aug, monsoon)', exampleHindi: 'श्रावण में हर सोमवार व्रत रखा जाता है।', exampleEnglish: 'In Shravan a fast is kept every Monday.', emoji: '☔', partOfSpeech: 'noun', subgroup: 'Months (Hindu lunar)' },
    { hindi: 'फाल्गुन', transliteration: 'phaalgun', english: 'Phalgun (lunar month, Feb–Mar, Holi)', exampleHindi: 'फाल्गुन के अंत में होली आती है।', exampleEnglish: 'Holi comes at the end of Phalgun.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Months (Hindu lunar)' },

    // Seasons (all six Indian ritu)
    { hindi: 'वसंत', transliteration: 'vasant', english: 'spring', exampleHindi: 'वसंत में फूल खिलते हैं।', exampleEnglish: 'Flowers bloom in spring.', emoji: '🌸', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'ग्रीष्म', transliteration: 'greeshm', english: 'summer', exampleHindi: 'ग्रीष्म ऋतु में दिन लंबे होते हैं।', exampleEnglish: 'In summer the days are long.', emoji: '☀️', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'वर्षा', transliteration: 'varsha', english: 'monsoon / rainy season', exampleHindi: 'वर्षा ऋतु में हम छाता लेकर चलते हैं।', exampleEnglish: 'In the monsoon we carry an umbrella.', emoji: '🌧️', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'शरद', transliteration: 'sharad', english: 'autumn', exampleHindi: 'शरद ऋतु में आसमान साफ़ होता है।', exampleEnglish: 'In autumn the sky is clear.', emoji: '🍂', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'हेमंत', transliteration: 'hemant', english: 'pre-winter', exampleHindi: 'हेमंत में हल्की ठंड शुरू हो जाती है।', exampleEnglish: 'Light cold begins in pre-winter.', emoji: '🍁', partOfSpeech: 'noun', subgroup: 'Seasons' },
    { hindi: 'शिशिर', transliteration: 'shishir', english: 'winter', exampleHindi: 'शिशिर ऋतु में कोहरा होता है।', exampleEnglish: 'There is fog in winter.', emoji: '🌫️', partOfSpeech: 'noun', subgroup: 'Seasons' },

    // Calendar / time expressions
    { hindi: 'तारीख़', transliteration: 'taareekh', english: 'date', exampleHindi: 'आज की तारीख़ क्या है?', exampleEnglish: 'What is today\'s date?', emoji: '📅', partOfSpeech: 'noun', subgroup: 'Calendar terms' },
    { hindi: 'हफ़्ता', transliteration: 'hafta', english: 'week', exampleHindi: 'एक हफ़्ते में सात दिन होते हैं।', exampleEnglish: 'There are seven days in a week.', emoji: '🗓️', partOfSpeech: 'noun', subgroup: 'Calendar terms' },
    { hindi: 'महीना', transliteration: 'maheena', english: 'month', exampleHindi: 'इस महीने में मेरा जन्मदिन है।', exampleEnglish: 'My birthday is this month.', emoji: '🗓️', partOfSpeech: 'noun', subgroup: 'Calendar terms' },
    { hindi: 'साल', transliteration: 'saal', english: 'year', exampleHindi: 'अगले साल मैं दसवीं कक्षा में जाऊँगा।', exampleEnglish: 'Next year I will enter tenth grade.', emoji: '📆', partOfSpeech: 'noun', subgroup: 'Calendar terms' },
    { hindi: 'कल', transliteration: 'kal', english: 'yesterday / tomorrow', exampleHindi: 'कल मैंने होमवर्क किया था।', exampleEnglish: 'Yesterday I did my homework.', emoji: '⏰', partOfSpeech: 'adverb', subgroup: 'Relative time' },
    { hindi: 'परसों', transliteration: 'parson', english: 'day before / after tomorrow', exampleHindi: 'परसों हमारी पिकनिक है।', exampleEnglish: 'The day after tomorrow is our picnic.', emoji: '⏰', partOfSpeech: 'adverb', subgroup: 'Relative time' },
    { hindi: 'पिछला', transliteration: 'pichhla', english: 'last / previous', exampleHindi: 'पिछले हफ़्ते मैं बीमार था।', exampleEnglish: 'Last week I was sick.', emoji: '⏪', partOfSpeech: 'adjective', subgroup: 'Relative time' },
    { hindi: 'अगला', transliteration: 'agla', english: 'next / coming', exampleHindi: 'अगले महीने हम दादी के घर जाएँगे।', exampleEnglish: 'Next month we will go to Grandma\'s house.', emoji: '⏩', partOfSpeech: 'adjective', subgroup: 'Relative time' },
  ],
  vocabularyNote: {
    why:
      'These 29 entries are the minimum calendar bank the student needs to talk about any schedule, routine, holiday, or plan. Every day and every season appears in the reading sample or a model essay - memorize this list first and the rest of the pack becomes a fill-in-the-blank.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?" - School Life routines require day/month/season precision.',
  },

  grammar: [
    {
      title: 'Placing an event on a specific day or date: "दिन को" / "तारीख़ को"',
      rule:
        'To say "on Monday" or "on the 5th of May," attach the postposition को to the day or the date. Pattern: [day/date] + को + [rest of sentence]. This को does NOT change the verb - it just pins the event in time.',
      examples: [
        { hindi: 'सोमवार को मेरी हिंदी की कक्षा है।', transliteration: 'somvaar ko meri hindi ki kakshaa hai.', english: 'I have Hindi class on Monday.' },
        { hindi: '5 मई को मेरा जन्मदिन है।', transliteration: '5 mai ko mera janmadin hai.', english: 'My birthday is on May 5.' },
        { hindi: 'रविवार को हम बाहर नहीं जाते।', transliteration: 'ravivaar ko hum baahar nahin jaate.', english: 'On Sunday we do not go out.' },
      ],
      pitfall:
        'Dropping the को ("सोमवार मेरी कक्षा है") reads as a topic label, not a time placement. The rater notices and drops Language Control.',
      whyItMatters:
        'Time-placement with को is the single construction raters expect when Benchmark-5 prompts ask "when did X happen?" Using it twice in an essay is a clean Language Control signal.',
    },
    {
      title: 'पिछले / इस / अगले + noun: the tense-frame switch',
      rule:
        'Hindi encodes past/present/future partly through these three adjectives paired with time nouns. Crucially, before masculine oblique nouns they change: पिछला → पिछले, अगला → अगले. The noun itself also goes oblique (हफ़्ता → हफ़्ते, महीना → महीने, साल → साल).',
      examples: [
        { hindi: 'पिछले हफ़्ते मैं बीमार था।', transliteration: 'pichhle hafte main beemaar tha.', english: 'Last week I was sick. (past)' },
        { hindi: 'इस हफ़्ते मैं रोज़ स्कूल जा रहा हूँ।', transliteration: 'is hafte main roz school jaa raha hoon.', english: 'This week I am going to school every day. (present)' },
        { hindi: 'अगले महीने हम दादी के घर जाएँगे।', transliteration: 'agle maheene hum daadi ke ghar jaayenge.', english: 'Next month we will go to Grandma\'s house. (future)' },
      ],
      pitfall:
        'Writing "पिछला हफ़्ता" instead of "पिछले हफ़्ते" is the classic slip - the adjective must agree with the oblique noun. Also, students often pick the right time word but forget to change the verb tense to match.',
      whyItMatters:
        'Intermediate-Mid requires visible shifts across past, present, and future. This one construction - पिछले / इस / अगले - is the fastest way to put three time frames on paper in a single essay.',
    },
    {
      title: 'Relative time adverbs कल / परसों and reading them from context',
      rule:
        'Hindi uses the SAME word (कल) for "yesterday" AND "tomorrow"; (परसों) for "day before yesterday" AND "day after tomorrow." The tense of the verb tells the reader which meaning is intended: कल + past-tense verb = yesterday; कल + future-tense verb = tomorrow.',
      examples: [
        { hindi: 'कल मैंने होमवर्क किया।', transliteration: 'kal maine homework kiya.', english: 'Yesterday I did homework. (past verb → yesterday)' },
        { hindi: 'कल मैं होमवर्क करूँगा।', transliteration: 'kal main homework karoonga.', english: 'Tomorrow I will do homework. (future verb → tomorrow)' },
        { hindi: 'परसों हमारी पिकनिक है।', transliteration: 'parson hamaari picnic hai.', english: 'Our picnic is the day after tomorrow. (present "hai" + future context)' },
      ],
      pitfall:
        'If the student uses कल but keeps the verb in the present tense, the reader cannot tell whether the event already happened or is upcoming. Raters mark this as Language Control breakdown.',
      whyItMatters:
        'Benchmark-5 explicitly credits "some control of past, present, and future time frames." Pairing कल with the correct verb form is the smallest unit where that control shows up - and the easiest place to lose the point.',
    },
  ],
  grammarNote: {
    why:
      'These three constructions - को for specific dates, पिछले/इस/अगले for tense frames, and कल/परसों with correct verb aspect - account for nearly every time-reference sentence a Benchmark-5 essay on routine or schedule needs. Drill them until they are automatic; the rest of the grammar is just vocabulary swapping.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'antMein',
    'kyonki',
    'lekin',
    'isliye',
  ]),
  connectorsNote: {
    why:
      'A week-description essay is fundamentally a sequence: पहले सोमवार को ..., फिर मंगलवार को ..., इसके बाद बुधवार को ..., अंत में रविवार को .... Add क्योंकि and लेकिन for the "why" and "contrast" raters reward, and इसलिए to tie a reason to a plan. Seven connectors is plenty at Level 1 - depth over breadth.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरा एक आम हफ़्ता · A Typical Week of Mine',
    hindi:
      'मेरा हफ़्ता बहुत व्यस्त होता है, लेकिन मुझे यह पसंद है। पहले सोमवार को मैं जल्दी उठता हूँ, क्योंकि सुबह हिंदी की कक्षा होती है। फिर मंगलवार और बुधवार को स्कूल में खेल और संगीत की कक्षाएँ होती हैं। गुरुवार को मैं अपनी बहन के साथ पुस्तकालय जाता हूँ। शुक्रवार को स्कूल जल्दी ख़त्म होता है, इसलिए हम शाम को बाहर पिज़्ज़ा खाते हैं। शनिवार और रविवार सप्ताहांत होते हैं। शनिवार को हमारा परिवार बाज़ार जाता है। रविवार को हम देर से उठते हैं और साथ में नाश्ता करते हैं। पिछले रविवार को दादी आई थीं, और अगले रविवार को हम मंदिर जाएँगे। अंत में हर रविवार को मैं अपना होमवर्क पूरा करता हूँ।',
    transliteration:
      'mera hafta bahut vyast hota hai, lekin mujhe yah pasand hai. pahle somvaar ko main jaldi uthta hoon, kyonki subah hindi ki kakshaa hoti hai. phir mangalvaar aur budhvaar ko school mein khel aur sangeet ki kakshaayen hoti hain. guruvaar ko main apni bahan ke saath pustakalaya jaata hoon. shukravaar ko school jaldi khatm hota hai, isliye hum shaam ko baahar pizza khaate hain. shanivaar aur ravivaar saptaahaant hote hain. shanivaar ko hamaara parivaar baazaar jaata hai. ravivaar ko hum der se uthte hain aur saath mein naashta karte hain. pichhle ravivaar ko daadi aayi thin, aur agle ravivaar ko hum mandir jaayenge. ant mein har ravivaar ko main apna homework pooraa karta hoon.',
    english:
      'My week is very busy, but I like it. First, on Monday I wake up early, because Hindi class is in the morning. Then on Tuesday and Wednesday there are sports and music classes at school. On Thursday I go to the library with my sister. On Friday school ends early, so in the evening we eat pizza outside. Saturday and Sunday are the weekend. On Saturday our family goes to the market. On Sunday we wake up late and have breakfast together. Last Sunday Grandma had come, and next Sunday we will go to the temple. Finally, every Sunday I finish my homework.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors pin a seven-day schedule to a clean structure. The sentences cannot be rearranged - that is Text-Type 5.' },
      { term: 'सोमवार को / गुरुवार को / रविवार को', note: 'Specific-day placement with को used five times in one passage - the construction students most need to internalize.' },
      { term: 'पिछले रविवार को ... अगले रविवार को', note: 'Past-frame and future-frame in consecutive sentences - the Intermediate-Mid tense-shift move in its purest form.' },
      { term: 'क्योंकि / इसलिए / लेकिन', note: 'Reasoning connectors add the "why" and "contrast" layer on top of the time sequence.' },
      { term: 'सप्ताहांत (शनिवार और रविवार)', note: 'Indian 6-day school week reality: Saturday is often a half/full school day, so the 2-day weekend is cultural, not universal.' },
    ],
    comprehensionQuestions: [
      { q: 'Why does the narrator wake up early on Monday?', a: 'क्योंकि सुबह हिंदी की कक्षा होती है। (Because Hindi class is in the morning.)' },
      { q: 'What does the narrator do on Thursday?', a: 'अपनी बहन के साथ पुस्तकालय जाता है। (Goes to the library with the sister.)' },
      { q: 'What happens on Friday evening, and why?', a: 'शुक्रवार को स्कूल जल्दी ख़त्म होता है, इसलिए शाम को बाहर पिज़्ज़ा खाते हैं। (School ends early, so they eat pizza out.)' },
      { q: 'Name one event from the past and one from the future in the passage.', a: 'Past: पिछले रविवार को दादी आई थीं। Future: अगले रविवार को मंदिर जाएँगे।' },
      { q: 'Which two days make up the weekend here?', a: 'शनिवार और रविवार (Saturday and Sunday).' },
      { q: 'Pick one connector and explain its job.', a: 'Any of पहले / फिर / इसके बाद / अंत में (time order) or क्योंकि / इसलिए / लेकिन (reasoning).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a Benchmark-5 model of a week-description essay. Notice how the past and future time frames appear naturally (पिछले रविवार, अगले रविवार) rather than as add-on sentences. Read it aloud until the "दिन + को" rhythm feels automatic; that rhythm is what the rater is listening for.',
    trains: ['TextType', 'TopicCoverage', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'मेरा साप्ताहिक कार्यक्रम · My Weekly Schedule',
      hindi:
        'सोमवार - हिंदी की कक्षा (सुबह 8 बजे)\nमंगलवार - गणित का टेस्ट\nबुधवार - संगीत की कक्षा\nगुरुवार - पुस्तकालय (शाम 4 बजे)\nशुक्रवार - फ़ुटबॉल की प्रैक्टिस\nशनिवार - परिवार के साथ बाज़ार\nरविवार - देर से नाश्ता और होमवर्क',
      transliteration:
        'somvaar - hindi ki kakshaa (subah 8 baje) | mangalvaar - ganit ka test | budhvaar - sangeet ki kakshaa | guruvaar - pustakalaya (shaam 4 baje) | shukravaar - football ki practice | shanivaar - parivaar ke saath baazaar | ravivaar - der se naashta aur homework',
      english:
        'Monday - Hindi class (8 a.m.) · Tuesday - Math test · Wednesday - Music class · Thursday - Library (4 p.m.) · Friday - Football practice · Saturday - Market with family · Sunday - Late breakfast and homework',
    },
    {
      kind: 'diary',
      title: 'मेरी डायरी - शुक्रवार · My Diary - Friday',
      hindi:
        'आज शुक्रवार है। स्कूल जल्दी ख़त्म हुआ, इसलिए मैं और अरुण पार्क गए। कल शनिवार है, लेकिन कल भी स्कूल है, क्योंकि हमारे स्कूल में महीने के पहले शनिवार को कक्षा होती है। परसों रविवार को हम दादी के घर जाएँगे।',
      transliteration:
        'aaj shukravaar hai. school jaldi khatm hua, isliye main aur arun park gaye. kal shanivaar hai, lekin kal bhi school hai, kyonki hamaare school mein maheene ke pahle shanivaar ko kakshaa hoti hai. parson ravivaar ko hum daadi ke ghar jaayenge.',
      english:
        'Today is Friday. School ended early, so Arun and I went to the park. Tomorrow is Saturday, but there is school tomorrow too, because at our school class is held on the first Saturday of the month. The day after tomorrow, on Sunday, we will go to Grandma\'s house.',
    },
    {
      kind: 'announcement',
      title: 'स्कूल की सूचना · School Notice',
      hindi:
        'प्रिय छात्रों, अगले सोमवार, 11 मई को स्कूल बंद रहेगा, क्योंकि उस दिन स्थानीय चुनाव है। मंगलवार 12 मई को सामान्य कक्षाएँ होंगी। कृपया अपना होमवर्क समय पर पूरा कीजिए। - प्रधानाचार्य',
      transliteration:
        'priy chhaatron, agle somvaar, 11 mai ko school band rahega, kyonki us din sthaaneey chunaav hai. mangalvaar 12 mai ko saamaanya kakshaayen hongi. kripaya apna homework samay par pooraa keejiye. - pradhaanaachaarya',
      english:
        'Dear students, next Monday, May 11, school will be closed, because there is a local election that day. On Tuesday, May 12, regular classes will be held. Please finish your homework on time. - Principal',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! क्या तुम शनिवार को फ़्री हो? मेरा जन्मदिन अगले मंगलवार, 20 मई को है, लेकिन पार्टी हम शनिवार शाम को करेंगे। ज़रूर आना! 🎂',
      transliteration:
        'are! kya tum shanivaar ko free ho? mera janmadin agle mangalvaar, 20 mai ko hai, lekin party hum shanivaar shaam ko karenge. zaroor aana!',
      english:
        'Hey! Are you free on Saturday? My birthday is next Tuesday, May 20, but we will do the party on Saturday evening. You must come! 🎂',
    },
  ],
  modelTextsNote: {
    why:
      'A schedule, a diary page, a school notice, and a birthday text - four different registers (listing, personal, formal, casual) that all share the same day/month/date machinery. Raters reward the student who can swing between these registers in the same essay.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Two Calendars Running in Parallel',
      body:
        'Most Indian families live by two calendars at once: the Gregorian (जनवरी–दिसंबर) for school, office, and bills, and the Hindu lunar (चैत्र–फाल्गुन) for festivals, fasts, and weddings. A date like "15 अगस्त, श्रावण मास" on a wedding card is normal and expected.',
      emoji: '📅',
    },
    {
      title: 'Six Seasons, Not Four',
      body:
        'The Indian ऋतुचक्र (wheel of seasons) has six - वसंत, ग्रीष्म, वर्षा, शरद, हेमंत, शिशिर - not the Western four. Varsha (monsoon) in particular has no English one-word equivalent; calling it "rainy season" in an English translation but वर्षा ऋतु in Hindi is authentic.',
      emoji: '🌦️',
    },
    {
      title: 'Saturday is a School Day in Many Schools',
      body:
        'In India, many schools hold a half or full day of class on Saturday, and the "weekend" in practice is just Sunday. In North America the Sat-Sun weekend is standard. Mentioning this difference in an essay ("मेरे भारतीय स्कूल में शनिवार को भी कक्षा होती थी") signals real cultural awareness.',
      emoji: '🏫',
    },
    {
      title: 'Shravan Mondays and Fasting',
      body:
        'The lunar month of श्रावण (July–August) is dedicated to Shiva. Every Monday of Shravan - सोमवार व्रत - is traditionally a fast day. Pairing a day-of-the-week sentence with a month-specific custom is a Topic-Coverage and Text-Type double-score.',
      emoji: '🪔',
    },
    {
      title: 'Phalgun and the Colors of Holi',
      body:
        'The lunar month फाल्गुन ends with होली, the festival of colors (Feb-end / March). Writing "फाल्गुन के अंत में होली आती है" is more precise and culturally grounded than "Holi is in March" - same meaning, far better rubric signal.',
      emoji: '🎨',
    },
  ],
  culturalNote: {
    why:
      'Calendar culture in India is double-layered and season-rich in a way that Western students rarely capture. Dropping in one Hindu-lunar-month reference, one monsoon reference, or one Saturday-school detail transforms a generic "my week" essay into something the rater reads twice. That is a cheap Text-Type lift.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'नौ दिन चले अढ़ाई कोस',
      literal: 'walked two and a half kos in nine days',
      meaning: 'To make very slow progress; to take far too long to finish something.',
      example: 'यह होमवर्क तुमने एक हफ़्ते में भी नहीं किया - नौ दिन चले अढ़ाई कोस!',
      exampleEnglish: 'You could not finish this homework even in a week - such slow progress!',
    },
    {
      phrase: 'ईद का चाँद होना',
      literal: 'to be the Eid moon',
      meaning: 'To appear very rarely; to be seen only once in a long while.',
      example: 'तुम तो ईद का चाँद हो गए हो - पिछले महीने से मिले ही नहीं!',
      exampleEnglish: 'You have become like the Eid moon - we have not met since last month!',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms are time-themed and widely recognized. "नौ दिन चले अढ़ाई कोस" fits naturally into essays about schedules and deadlines; "ईद का चाँद होना" fits essays about how often you see someone across weeks or months. One idiom per essay is a confident Text-Type move; two is overkill.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'A typical week',
      prompt:
        'अपने एक आम हफ़्ते के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आप हर दिन क्या करते हैं, आपको कौन-सा दिन सबसे अच्छा लगता है, और अगले हफ़्ते आप क्या करना चाहते हैं। (Write three paragraphs about a typical week of yours. Say what you do each day, which day you like best, and what you want to do next week.)',
      novice:
        'मेरा हफ़्ता अच्छा है। सोमवार स्कूल। रविवार छुट्टी।',
      intermediateMid:
        'मेरा हफ़्ता बहुत व्यस्त होता है, लेकिन मुझे यह पसंद है। पहले सोमवार को मैं जल्दी उठता हूँ, क्योंकि सुबह हिंदी की कक्षा होती है। फिर मंगलवार और बुधवार को स्कूल में खेल और संगीत होते हैं। गुरुवार को मैं पुस्तकालय जाता हूँ और शुक्रवार को फ़ुटबॉल की प्रैक्टिस होती है।\n\nशनिवार और रविवार सप्ताहांत होते हैं। शनिवार को हमारा परिवार बाज़ार जाता है, लेकिन रविवार को हम देर से उठते हैं और साथ में नाश्ता करते हैं। पिछले रविवार को दादी हमारे घर आई थीं, और उन्होंने मेरे लिए मीठा बनाया। मुझे रविवार सबसे अच्छा लगता है, क्योंकि उस दिन पूरा परिवार साथ होता है।\n\nअगले हफ़्ते मैं थोड़ा अलग करना चाहता हूँ। अगले शनिवार को मैं अपने दोस्त के जन्मदिन पर जाऊँगा, और अंत में रविवार को मैं सुबह जल्दी उठकर अपना होमवर्क पूरा करूँगा। इसलिए अगला हफ़्ता भी व्यस्त लेकिन मज़ेदार रहेगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले / फिर', note: 'Two sequence connectors open the schedule - pure Text-Type scaffolding.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'सोमवार को / मंगलवार और बुधवार को / गुरुवार को / शुक्रवार को', note: 'Four "day + को" placements in one paragraph - the exact construction the grammar note drills.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि', note: 'Adds the "why" - reasoning connector beside the time sequence.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले रविवार को दादी आई थीं', note: 'Past perfect frame explicitly named with पिछले. Second time frame secured.' },
        { paragraphIndex: 1, kind: 'cultural', highlight: 'पूरा परिवार साथ होता है', note: 'Sunday-as-family-day - culturally grounded, Topic-Coverage lift.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले शनिवार को ... जाऊँगा / पूरा करूँगा', note: 'Future frame arrives with अगले + future-tense verbs - third time frame in 140 words.' },
        { paragraphIndex: 2, kind: 'connector', highlight: 'अंत में / इसलिए', note: 'Closing connectors bring the essay to a clean landing.' },
      ],
      wordCount: 138,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'क्योंकि', 'लेकिन', 'इसलिए', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs that cannot be rearranged - the Monday-to-Friday paragraph, the weekend paragraph, and the next-week paragraph each do distinct work. Text-Type 5 confirmed.',
          'Past (आई थीं, बनाया), present (उठता हूँ, जाता हूँ, होता है), and future (जाऊँगा, करूँगा, रहेगा) all present in 138 words - satisfies the rubric\'s "some control of major time frames."',
          'The "दिन + को" construction is used correctly seven times with different days - Language Control stabilizes clearly at Average.',
          'Six different connectors (पहले, फिर, क्योंकि, लेकिन, इसलिए, अंत में) spread across the essay - explicit cohesion, well above threshold.',
          'Concrete cultural detail (दादी का मीठा, पूरा परिवार साथ) lifts Topic Coverage above a generic "I do homework on Sunday" response.',
        ],
        gotchas: [
          'If the student writes "पिछला रविवार" (instead of "पिछले रविवार को"), the time-frame construction breaks and Language Control drops.',
          'Dropping the को in "सोमवार मैं उठता हूँ" would make the sentence read as a topic label - a recurring Level-1 error.',
        ],
      },
    },
    {
      shortLabel: 'Favorite season',
      prompt:
        'अपने पसंदीदा महीने या मौसम के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह महीना कब आता है, उसमें क्या होता है, और आपने पिछले साल उसमें क्या किया। (Write three paragraphs about your favorite month or season. Say when it comes, what happens in it, and what you did in it last year.)',
      novice:
        'मुझे जुलाई पसंद है। बारिश होती है। अच्छा लगता है।',
      intermediateMid:
        'मेरा सबसे पसंदीदा महीना जुलाई है, क्योंकि जुलाई में भारत में वर्षा ऋतु शुरू होती है। श्रावण महीना भी इसी समय आता है, और हर सोमवार को कई लोग व्रत रखते हैं। जुलाई में स्कूल की गर्मी की छुट्टियाँ ख़त्म होती हैं, लेकिन ठंडी हवा और बारिश की वजह से मुझे स्कूल जाना अच्छा लगता है।\n\nइस महीने में आकाश अक्सर बादलों से भरा रहता है। पहले हल्की बूँदें गिरती हैं, फिर तेज़ बारिश होती है, और अंत में एक ठंडी शाम हो जाती है। मेरी माँ गरम पकौड़े और चाय बनाती हैं, इसलिए हम सब खिड़की के पास बैठकर बारिश देखते हैं।\n\nपिछले साल जुलाई में हम अपने गाँव गए थे। वहाँ 15 जुलाई को बहुत तेज़ बारिश हुई और खेतों में पानी भर गया। मैंने अपने चचेरे भाई के साथ कागज़ की नावें बनाईं। अगले साल भी मैं ज़रूर गाँव जाऊँगा, क्योंकि वर्षा ऋतु का असली मज़ा वहीं आता है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'जुलाई / वर्षा ऋतु / श्रावण महीना', note: 'Gregorian month, Indian season, AND Hindu lunar month in the opening sentence - heavy Topic-Coverage lift.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'हर सोमवार को कई लोग व्रत रखते हैं', note: 'Shravan-Monday fasting ritual - the cultural insight from this pack used in context.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / लेकिन', note: 'Reasoning + contrast inside the opener.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... अंत में', note: 'Three sequence connectors describe one rainstorm - scene micro-structure at Benchmark-5 level.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'इसलिए', note: 'Consequence link - rain → pakoras and tea.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'पिछले साल जुलाई में ... गए थे / हुई / भर गया', note: 'Past-tense frame announced with पिछले साल and sustained across three verbs.' },
        { paragraphIndex: 2, kind: 'structure', highlight: '15 जुलाई को बहुत तेज़ बारिश हुई', note: 'Specific date placement with को - the grammar rule shown in real use.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल भी मैं ज़रूर गाँव जाऊँगा', note: 'Future frame seals the essay - three time frames on one page.' },
      ],
      wordCount: 147,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'लेकिन', 'पहले', 'फिर', 'अंत में', 'इसलिए'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs with distinct jobs - definition of the month, sensory present-tense scene, past-year memory closing into a future plan. Text-Type 5 requirement met.',
          'Names जुलाई (Gregorian), वर्षा ऋतु (Indian season), AND श्रावण (Hindu lunar month) - Topic Coverage is unusually dense for a Level-1 essay.',
          'Date placement with को (15 जुलाई को) used correctly inside the past narrative - shows the grammar rule internalized.',
          'Six different connectors across three time frames; पिछले साल and अगले साल anchor the tense shift for the rater.',
          'Cultural specifics (श्रावण व्रत, पकौड़े-चाय in the rain, कागज़ की नावें) raise the essay well above a generic "I like rain" response.',
        ],
        gotchas: [
          'If a female narrator writes "मैं गया" instead of "मैं गयी," Language Control drops to Low.',
          'Mixing ऋतु (correct, feminine) with masculine adjectives ("वर्षा ऋतु अच्छा है" instead of "अच्छी है") is the classic agreement trap on season vocabulary.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked essays show the same toolkit - day/date postposition को, पिछले/इस/अगले tense frames, sequence connectors - doing two different jobs (weekly routine, favorite month). Study which sentences the annotations tag as "tense-shift" - those are the rubric-visible moves. Reproduce that pattern on any prompt.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने एक आम हफ़्ते के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि हर दिन क्या होता है, कौन-सा दिन सबसे अच्छा है, और अगले हफ़्ते आप क्या नया करना चाहते हैं।',
      english:
        'Write three paragraphs about a typical week of yours. Describe what happens each day, which day is best, and what new thing you want to do next week.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में', 'क्योंकि'],
        vocab: ['सोमवार', 'शुक्रवार', 'रविवार', 'हफ़्ता', 'अगला'],
        tenses: ['present', 'future'],
      },
    },
    {
      hindi:
        'अपने पसंदीदा महीने या ऋतु के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह कब आता है, उसमें क्या ख़ास होता है, और पिछले साल आपने उसमें क्या किया।',
      english:
        'Write three paragraphs about your favorite month or season. Say when it comes, what is special about it, and what you did in it last year.',
      hint: {
        connectors: ['क्योंकि', 'लेकिन', 'इसलिए', 'अंत में'],
        vocab: ['जुलाई', 'वर्षा', 'श्रावण', 'मौसम', 'पिछला'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'एक ऐसी ख़ास तारीख़ के बारे में तीन अनुच्छेदों में लिखिए जो आपके परिवार के लिए महत्वपूर्ण है (जैसे जन्मदिन, त्योहार, या कोई सालगिरह)। बताइए वह कब आती है, पिछली बार क्या हुआ था, और अगली बार आप क्या करेंगे।',
      english:
        'Write three paragraphs about a special date that is important to your family (e.g., a birthday, festival, or anniversary). Say when it comes, what happened last time, and what you will do next time.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'लेकिन', 'इसलिए'],
        vocab: ['तारीख़', 'महीना', 'पिछला', 'अगला', 'साल'],
        tenses: ['past', 'present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt forces a different combination of time frames: weekly routine (present + future), favorite month (past + present), special date (all three). Together they guarantee the student practices every tense-shift the rubric rewards. Pick one, write in Devanagari, and self-grade against the rubric card.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay: did you use at least four sequence connectors? Did you place at least two events with दिन + को or तारीख़ + को? Did पिछले / इस / अगले appear with matching verb tenses? If any answer is no, revise before moving on.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
