import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

export const pack: TopicPack = {
  id: 'L1-05-numbers-time',
  level: 1,
  themeGroup: 'Identity',
  order: 5,
  heroMotif: 'clock',
  titleHindi: 'गिनती और समय',
  titleEnglish: 'Numbers & Time',
  hook: 'Raters notice when a student says "बजकर पाँच मिनट" instead of "five past" - cheap rubric points.',
  heroPrompt: composeHeroPrompt(
    'An oversized brass clock face with Devanagari numerals, surrounded by hourglasses, calendar pages, and sundial shapes, cream background',
  ),

  rationale: {
    fcpsSubTopics: [
      'Numbers and Time (FCPS Level 1 - School Life)',
      'Daily routines and schedules (FCPS Level 1 - School Life)',
      'Bridges into Daily Schedule essays (FCPS Level 2) where time markers drive cohesion',
    ],
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Say any time in Hindi from 1:00 to 12:59 using सवा, साढ़े, पौने, and बजे',
      'Write a schedule-style paragraph using at least four time markers in sequence',
      'Use number+noun agreement correctly (पाँच लड़के vs. पाँच लड़कियाँ) across five sentences',
      'Shift between past, present, and future within a single day-in-my-life essay',
      'Name one culturally specific time concept (IST, सूर्योदय, school bell schedule) in an essay',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '75 min reading + 30 min essay',
    ifSkippedRisk:
      'Almost every FCPS Level 1 prompt - daily routine, school day, weekend plan - rewards clean time expressions. Without this pack the student falls back to "I do this, I do that" with no clock phrases, capping Text-Type at Intermediate-Low.',
  },

  objectives: [
    {
      text: 'Count 1–100 in Hindi aloud; write any number up to 100 in Devanagari.',
      trains: ['TopicCoverage'],
    },
    {
      text: 'State the time four ways - पूरे घंटे, सवा, साढ़े, पौने - without hesitation.',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Combine time-of-day words (सुबह, दोपहर, शाम, रात) with clock phrases in one sentence.',
      trains: ['TextType'],
    },
    {
      text: 'Write a 3-paragraph "my Monday" essay that walks through at least four different times, using past OR future at least once.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Apply number–noun gender agreement (पाँच लड़के m.pl. / पाँच लड़कियाँ f.pl.) in at least three sentences.',
      trains: ['LanguageControl'],
    },
  ],

  vocabulary: [
    // Core numerals
    { hindi: 'एक', transliteration: 'ek', english: 'one', exampleHindi: 'मेरे पास एक किताब है।', exampleEnglish: 'I have one book.', emoji: '1️⃣', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'दो', transliteration: 'do', english: 'two', exampleHindi: 'दो लड़के खेल रहे हैं।', exampleEnglish: 'Two boys are playing.', emoji: '2️⃣', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'तीन', transliteration: 'teen', english: 'three', exampleHindi: 'तीन बजे छुट्टी होती है।', exampleEnglish: 'School ends at three.', emoji: '3️⃣', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'पाँच', transliteration: 'paanch', english: 'five', exampleHindi: 'मेरी कक्षा में पाँच लड़कियाँ हैं।', exampleEnglish: 'There are five girls in my class.', emoji: '5️⃣', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'दस', transliteration: 'das', english: 'ten', exampleHindi: 'मैं दस मिनट में आऊँगा।', exampleEnglish: 'I will come in ten minutes.', emoji: '🔟', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'बीस', transliteration: 'bees', english: 'twenty', exampleHindi: 'बस बीस मिनट में आती है।', exampleEnglish: 'The bus comes in twenty minutes.', emoji: '🔢', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'पचास', transliteration: 'pachaas', english: 'fifty', exampleHindi: 'मेरी दादी पचास साल की हैं।', exampleEnglish: 'My grandmother is fifty years old.', emoji: '🔢', partOfSpeech: 'number', subgroup: 'Numerals' },
    { hindi: 'सौ', transliteration: 'sau', english: 'hundred', exampleHindi: 'पाठ में सौ शब्द हैं।', exampleEnglish: 'The lesson has a hundred words.', emoji: '💯', partOfSpeech: 'number', subgroup: 'Numerals' },

    // Ordinals
    { hindi: 'पहला', transliteration: 'pahla', english: 'first', exampleHindi: 'पहला पीरियड हिंदी का है।', exampleEnglish: 'The first period is Hindi.', emoji: '🥇', partOfSpeech: 'adjective', subgroup: 'Ordinals' },
    { hindi: 'दूसरा', transliteration: 'doosra', english: 'second', exampleHindi: 'दूसरा पीरियड गणित है।', exampleEnglish: 'The second period is math.', emoji: '🥈', partOfSpeech: 'adjective', subgroup: 'Ordinals' },
    { hindi: 'तीसरा', transliteration: 'teesra', english: 'third', exampleHindi: 'तीसरा पीरियड विज्ञान है।', exampleEnglish: 'The third period is science.', emoji: '🥉', partOfSpeech: 'adjective', subgroup: 'Ordinals' },

    // Time units
    { hindi: 'सेकंड', transliteration: 'second', english: 'second', exampleHindi: 'एक मिनट में साठ सेकंड होते हैं।', exampleEnglish: 'A minute has sixty seconds.', emoji: '⏱️', partOfSpeech: 'noun', subgroup: 'Time units' },
    { hindi: 'मिनट', transliteration: 'minat', english: 'minute', exampleHindi: 'मैं दस मिनट में तैयार हो जाऊँगी।', exampleEnglish: 'I will be ready in ten minutes.', emoji: '⏲️', partOfSpeech: 'noun', subgroup: 'Time units' },
    { hindi: 'घंटा', transliteration: 'ghanta', english: 'hour', exampleHindi: 'मैं रोज़ एक घंटा पढ़ता हूँ।', exampleEnglish: 'I study for one hour every day.', emoji: '⏳', partOfSpeech: 'noun', subgroup: 'Time units' },
    { hindi: 'बजे', transliteration: 'baje', english: "o'clock", exampleHindi: 'स्कूल आठ बजे शुरू होता है।', exampleEnglish: 'School starts at 8 o\'clock.', emoji: '🕗', partOfSpeech: 'adverb', subgroup: 'Time units' },

    // Time of day
    { hindi: 'सुबह', transliteration: 'subah', english: 'morning', exampleHindi: 'सुबह छह बजे मैं उठता हूँ।', exampleEnglish: 'I wake up at 6 in the morning.', emoji: '🌅', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'दोपहर', transliteration: 'dopahar', english: 'afternoon / noon', exampleHindi: 'दोपहर बारह बजे खाना खाते हैं।', exampleEnglish: 'We eat at twelve noon.', emoji: '🌞', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'शाम', transliteration: 'shaam', english: 'evening', exampleHindi: 'शाम को मैं दोस्तों के साथ खेलता हूँ।', exampleEnglish: 'In the evening I play with friends.', emoji: '🌇', partOfSpeech: 'noun', subgroup: 'Time of day' },
    { hindi: 'रात', transliteration: 'raat', english: 'night', exampleHindi: 'रात दस बजे मैं सो जाती हूँ।', exampleEnglish: 'I sleep at 10 at night.', emoji: '🌙', partOfSpeech: 'noun', subgroup: 'Time of day' },

    // Clock phrase builders
    { hindi: 'सवा', transliteration: 'sava', english: 'quarter past (hour + 15)', exampleHindi: 'सवा चार बजे कक्षा खत्म होती है।', exampleEnglish: 'Class ends at quarter past four.', emoji: '🕓', partOfSpeech: 'adjective', subgroup: 'Clock phrases' },
    { hindi: 'साढ़े', transliteration: 'saadhe', english: 'half past (hour + 30)', exampleHindi: 'साढ़े छह बजे मैं नाश्ता करती हूँ।', exampleEnglish: 'I have breakfast at half past six.', emoji: '🕡', partOfSpeech: 'adjective', subgroup: 'Clock phrases' },
    { hindi: 'पौने', transliteration: 'paune', english: 'quarter to (hour − 15)', exampleHindi: 'पौने आठ बजे बस आती है।', exampleEnglish: 'The bus comes at quarter to eight.', emoji: '🕢', partOfSpeech: 'adjective', subgroup: 'Clock phrases' },
    { hindi: 'डेढ़', transliteration: 'dedh', english: 'one and a half (1:30)', exampleHindi: 'डेढ़ बजे लंच होता है।', exampleEnglish: 'Lunch is at 1:30.', emoji: '🕐', partOfSpeech: 'number', subgroup: 'Clock phrases' },
    { hindi: 'ढाई', transliteration: 'dhaai', english: 'two and a half (2:30)', exampleHindi: 'ढाई बजे मैं घर लौटता हूँ।', exampleEnglish: 'I return home at 2:30.', emoji: '🕑', partOfSpeech: 'number', subgroup: 'Clock phrases' },

    // Useful verbs + question
    { hindi: 'बजना', transliteration: 'bajna', english: 'to strike (of the clock)', exampleHindi: 'अभी क्या बजा है?', exampleEnglish: 'What time is it right now?', emoji: '🔔', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'उठना', transliteration: 'uthna', english: 'to wake up / rise', exampleHindi: 'मैं सुबह सात बजे उठती हूँ।', exampleEnglish: 'I wake up at 7 in the morning.', emoji: '⏰', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'क्या बजा है', transliteration: 'kya baja hai', english: 'what time is it', exampleHindi: 'दीदी, क्या बजा है?', exampleEnglish: 'Didi, what time is it?', emoji: '❓', partOfSpeech: 'question', subgroup: 'Useful phrases' },
  ],
  vocabularyNote: {
    why:
      'These 27 items are the exact set a student needs to speak about any daily schedule in Hindi. Miss सवा / साढ़े / पौने and your essay defaults to "eight o\'clock, nine o\'clock" - raters notice the repetition and cap Topic Coverage at Average.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Telling time with बजे, बजकर, and बजने में',
      rule:
        'The hour uses बजे (masculine plural adverbial). For "X:15" say "सवा X बजे". For "X:30" say "साढ़े X बजे" - EXCEPT 1:30 = डेढ़ बजे and 2:30 = ढाई बजे (no साढ़े). For "X:45" say "पौने (X+1) बजे". For exact minutes, use "X बजकर Y मिनट".',
      examples: [
        { hindi: 'अभी सात बजे हैं।', transliteration: 'abhi saat baje hain.', english: 'It is 7:00 right now.' },
        { hindi: 'साढ़े छह बजे बस आती है।', transliteration: 'saadhe chhah baje bas aati hai.', english: 'The bus comes at 6:30.' },
        { hindi: 'पौने आठ बजे मैं निकलती हूँ।', transliteration: 'paune aath baje main nikalti hoon.', english: 'I leave at 7:45.' },
        { hindi: 'चार बजकर बीस मिनट हुए हैं।', transliteration: 'chaar bajkar bees minat hue hain.', english: 'It is 4:20.' },
      ],
      pitfall:
        'Students regularly say "साढ़े एक बजे" or "साढ़े दो बजे" - both are wrong. 1:30 is डेढ़ बजे and 2:30 is ढाई बजे. These two forms are the most-tested "gotcha" in Hindi time.',
      whyItMatters:
        'One correct use of सवा, साढ़े, or पौने in an essay signals Language Control above Novice-High. Three correct uses within three paragraphs nails Intermediate-Mid.',
    },
    {
      title: 'Number + noun agreement (पाँच लड़के vs. पाँच लड़कियाँ)',
      rule:
        'A cardinal number does not itself change, but the noun it quantifies must take the correct plural form, and any following verb/adjective must agree in gender and number. Masculine -ा nouns → plural -े (लड़का → लड़के). Feminine -ी nouns → plural -ियाँ (लड़की → लड़कियाँ). Feminine consonant-ending nouns usually take -ें (किताब → किताबें).',
      examples: [
        { hindi: 'मेरी कक्षा में पाँच लड़के हैं।', transliteration: 'meri kaksha mein paanch ladke hain.', english: 'There are five boys in my class.' },
        { hindi: 'मेरी कक्षा में पाँच लड़कियाँ हैं।', transliteration: 'meri kaksha mein paanch ladkiyaan hain.', english: 'There are five girls in my class.' },
        { hindi: 'मेरे पास तीन किताबें हैं।', transliteration: 'mere paas teen kitaaben hain.', english: 'I have three books.' },
      ],
      pitfall:
        'Writing "पाँच लड़का" (singular noun after a plural number) is the single most common error on number prompts. Also watch "तीन किताब" - must be किताबें.',
      whyItMatters:
        'Number–noun agreement errors are instantly visible to raters. Three clean agreements = Language Control at Average; three errors = Low.',
    },
    {
      title: 'Time-of-day phrase + clock phrase order',
      rule:
        'In Hindi the time-of-day word (सुबह, दोपहर, शाम, रात) comes BEFORE the clock phrase, and it does NOT take a postposition. So: "सुबह सात बजे", not "सुबह के सात बजे" or "सुबह में सात बजे". When the whole expression itself is the time-when of another event, you can optionally add को: "सुबह सात बजे को मैं उठती हूँ" - but most speakers drop को for hourly times.',
      examples: [
        { hindi: 'सुबह सात बजे मैं स्कूल जाती हूँ।', transliteration: 'subah saat baje main school jaati hoon.', english: 'I go to school at 7 in the morning.' },
        { hindi: 'दोपहर के बारह बजे हम लंच करते हैं।', transliteration: 'dopahar ke baarah baje hum lunch karte hain.', english: 'We have lunch at 12 noon.' },
        { hindi: 'रात दस बजे के बाद मैं सो जाता हूँ।', transliteration: 'raat das baje ke baad main so jaata hoon.', english: 'After 10 at night I go to sleep.' },
      ],
      pitfall:
        'Students often translate English word-for-word: "at seven o\'clock in the morning" → "बजे सात सुबह में". Hindi order is opposite: time-of-day first, then number, then बजे.',
      whyItMatters:
        'Correct word order is a core Language Control signal. Wrong order is comprehensible but flags the rater that the student is translating, not writing in Hindi.',
    },
  ],
  grammarNote: {
    why:
      'These three rules are the ones FCPS Level 1 raters explicitly listen for on time/number prompts. Students who master सवा/साढ़े/पौने plus number-noun agreement plus time-of-day word order look instantly more competent than peers who only know "बजे".',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'antMein',
    'kyonki',
    'lekin',
  ]),
  connectorsNote: {
    why:
      'Time-based essays live or die on sequence connectors. पहले / फिर / इसके बाद / अंत में alone are enough to chain a whole day into one cohesive paragraph. क्योंकि and लेकिन add the reasoning that lifts Text-Type from Intermediate-Low to Intermediate-Mid.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरा सोमवार · My Monday',
    hindi:
      'मेरा सोमवार बहुत व्यस्त होता है। पहले मैं सुबह साढ़े छह बजे उठती हूँ और मुँह धोती हूँ। फिर सात बजे मैं नाश्ता करती हूँ - आमतौर पर पराठा और एक गिलास दूध। पौने आठ बजे मेरी स्कूल बस आती है, इसलिए मुझे जल्दी तैयार होना पड़ता है। स्कूल में पहला पीरियड हिंदी का है और तीसरा पीरियड गणित का। दोपहर के बारह बजे लंच होता है, लेकिन आज मुझे ज़्यादा भूख नहीं थी। इसके बाद सवा तीन बजे छुट्टी होती है और मैं घर लौटती हूँ। शाम को पाँच बजे मैं हिंदी पढ़ती हूँ, क्योंकि शुक्रवार को मेरा टेस्ट है। अंत में रात दस बजे मैं सो जाती हूँ। सोमवार थका देता है, पर मुझे अच्छा भी लगता है।',
    transliteration:
      'mera somvaar bahut vyast hota hai. pahle main subah saadhe chhah baje uthti hoon aur munh dhoti hoon. phir saat baje main naashta karti hoon - aamtaur par paraatha aur ek gilaas doodh. paune aath baje meri school bus aati hai, isliye mujhe jaldi taiyaar hona padta hai. school mein pahla period hindi ka hai aur teesra period ganit ka. dopahar ke baarah baje lunch hota hai, lekin aaj mujhe zyaada bhookh nahi thi. iske baad sava teen baje chhutti hoti hai aur main ghar lautti hoon. shaam ko paanch baje main hindi padhti hoon, kyonki shukravaar ko mera test hai. ant mein raat das baje main so jaati hoon. somvaar thaka deta hai, par mujhe achchha bhi lagta hai.',
    english:
      'My Monday is very busy. First, I wake up at 6:30 in the morning and wash my face. Then at 7 I have breakfast - usually a paratha and a glass of milk. At 7:45 my school bus comes, so I have to get ready quickly. At school, the first period is Hindi and the third period is math. At 12 noon there is lunch, but today I was not very hungry. After this, at 3:15 school ends and I return home. In the evening at 5 I study Hindi, because on Friday I have a test. Finally at 10 at night I go to sleep. Monday tires me out, but I also like it.',
    highlights: [
      { term: 'साढ़े छह / पौने आठ / सवा तीन', note: 'Three different clock-phrase builders in one paragraph. This is exactly what separates Intermediate-Mid from Novice-High on time prompts.' },
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Full sequence scaffold - four time connectors carry the reader across a whole day.' },
      { term: 'सुबह / दोपहर / शाम / रात', note: 'All four times of day appear, each paired correctly with a number + बजे.' },
      { term: 'पहला पीरियड / तीसरा पीरियड', note: 'Ordinals in context. Shows the student can go beyond cardinal numbers.' },
      { term: 'क्योंकि / लेकिन', note: 'Reasoning connectors give the narrative a "why," lifting Text-Type.' },
    ],
    comprehensionQuestions: [
      { q: 'What time does the narrator wake up?', a: 'साढ़े छह बजे (6:30 a.m.).' },
      { q: 'What does she eat for breakfast and at what time?', a: 'सात बजे वह पराठा और दूध लेती है (she has paratha and milk at 7).' },
      { q: 'At what exact time does the school bus arrive?', a: 'पौने आठ बजे (7:45).' },
      { q: 'Which period is Hindi and which is math?', a: 'पहला पीरियड हिंदी, तीसरा पीरियड गणित (1st is Hindi, 3rd is math).' },
      { q: 'Why does she study Hindi in the evening?', a: 'क्योंकि शुक्रवार को उसका टेस्ट है (because her test is on Friday).' },
      { q: 'Pick one time-connector and explain its role.', a: 'Any of पहले / फिर / इसके बाद / अंत में - each moves the narrative forward in time.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a working model of a Benchmark-5 time-topic essay compressed into one paragraph. Notice how every sentence has BOTH a time marker AND an action - that pattern is the whole trick to scoring Intermediate-Mid on daily-schedule prompts.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'मेरा स्कूल का समय · My School Schedule',
      hindi:
        'सोमवार\n८:०० बजे - पहला पीरियड (हिंदी)\n९:०० बजे - दूसरा पीरियड (अंग्रेज़ी)\n१०:०० बजे - तीसरा पीरियड (गणित)\nसवा ११ बजे - खेल\nसाढ़े १२ बजे - लंच\n१:१५ बजे - विज्ञान\nसवा ३ बजे - छुट्टी',
      transliteration:
        'somvaar | 8:00 - pahla period (hindi) | 9:00 - doosra period (angrezi) | 10:00 - teesra period (ganit) | sava 11 baje - khel | saadhe 12 baje - lunch | 1:15 baje - vigyaan | sava 3 baje - chhutti',
      english:
        'Monday · 8:00 - 1st period (Hindi) · 9:00 - 2nd period (English) · 10:00 - 3rd period (Math) · 11:15 - PE · 12:30 - Lunch · 1:15 - Science · 3:15 - Dismissal',
    },
    {
      kind: 'diary',
      title: 'मेरी डायरी · My Diary Page',
      hindi:
        'आज कुछ अजीब हुआ। सुबह मेरा अलार्म नहीं बजा, इसलिए मैं सवा सात बजे उठी। फिर मैंने बहुत जल्दी तैयार होकर पौने आठ की बस पकड़ी। स्कूल में पहला पीरियड छूट गया, लेकिन बाकी दिन ठीक रहा। कल से मैं रात साढ़े नौ बजे अलार्म ज़रूर लगाऊँगी।',
      transliteration:
        'aaj kuchh ajeeb hua. subah mera alarm nahi baja, isliye main sava saat baje uthi. phir maine bahut jaldi taiyaar hokar paune aath ki bus pakadi. school mein pahla period chhoot gaya, lekin baaki din theek raha. kal se main raat saadhe nau baje alarm zaroor lagaoongi.',
      english:
        "Something odd happened today. My alarm didn't ring in the morning, so I woke at 7:15. Then I got ready very fast and caught the 7:45 bus. At school I missed first period, but the rest of the day was fine. From tomorrow I will definitely set my alarm at 9:30 at night.",
    },
    {
      kind: 'sms',
      title: 'माँ को संदेश · Message to Mom',
      hindi:
        'माँ, आज छुट्टी सवा तीन की जगह पौने चार बजे होगी। कक्षा में एक टेस्ट है। क्या आप बस स्टॉप पर चार बजे आ सकती हैं? धन्यवाद 💕',
      transliteration:
        'maa, aaj chhutti sava teen ki jagah paune chaar baje hogi. kaksha mein ek test hai. kya aap bus stop par chaar baje aa sakti hain? dhanyavaad.',
      english:
        'Mom, today dismissal will be at 3:45 instead of 3:15. There is a test in class. Can you come to the bus stop at 4? Thanks.',
    },
    {
      kind: 'announcement',
      title: 'स्कूल की सूचना · School Announcement',
      hindi:
        'सभी विद्यार्थियों को सूचित किया जाता है कि कल का पहला पीरियड सुबह साढ़े आठ बजे के बजाय पौने नौ बजे शुरू होगा। बस सुबह आठ बजे आएगी। कृपया समय पर पहुँचें।',
      transliteration:
        'sabhi vidyaarthiyon ko soochit kiya jaata hai ki kal ka pahla period subah saadhe aath baje ke bajaay paune nau baje shuru hoga. bus subah aath baje aayegi. kripaya samay par pahunchein.',
      english:
        'All students are informed that tomorrow the first period will begin at 8:45 instead of 8:30. The bus will come at 8 a.m. Please reach on time.',
    },
  ],
  modelTextsNote: {
    why:
      'Schedule, diary, SMS, and announcement cover the four registers a time-topic student must imitate: formal list, personal reflection, casual chat, and public notice. Every one of them pins a specific clock phrase to a specific event - that pairing is the craft.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'IST - भारतीय मानक समय',
      body:
        'India runs on a single time zone, IST (UTC+5:30), from Gujarat to Arunachal Pradesh. When a student writes "भारत में अभी रात के नौ बज रहे हैं", they show awareness that India does not split time zones like the U.S.',
      emoji: '🕰️',
    },
    {
      title: 'School Bell Schedule',
      body:
        'Most Indian schools run 40–45 minute periods from roughly 8:00 to 2:30, with a 15-minute morning break at सवा ग्यारह बजे and a lunch break around साढ़े बारह. Referencing "पहला पीरियड" and "लंच ब्रेक" makes a school essay instantly authentic.',
      emoji: '🔔',
    },
    {
      title: 'सूर्योदय and सूर्यास्त',
      body:
        'Hindu households commonly mark the day by sunrise (सूर्योदय) and sunset (सूर्यास्त) rather than by clock. Morning prayers happen at सूर्योदय; evening lamps (दीया) are lit at सूर्यास्त. One sentence about this lifts Topic Coverage.',
      emoji: '🌄',
    },
    {
      title: 'The "Indian Stretchable Time" Joke',
      body:
        'Indians joke about "IST = Indian Stretchable Time" - meaning people often arrive 15–30 minutes late to social events. Weddings, parties, and family dinners rarely start exactly on time, though offices and schools do.',
      emoji: '⏰',
    },
    {
      title: 'Time Markers in Daily Hindi',
      body:
        'Spoken Hindi prefers "चाय के बाद" (after chai) or "नाश्ते से पहले" (before breakfast) over exact clock times for casual routines. Sprinkling one of these into an essay reads as genuinely Indian, not translated.',
      emoji: '🍵',
    },
  ],
  culturalNote: {
    why:
      'Time is a place where Hindi and English diverge in texture - Hindi speakers anchor time to meals, prayers, and sunrise as often as to the clock. A single authentic marker ("चाय के बाद", "सूर्योदय के समय") separates the essay from a direct English translation and nudges Topic Coverage upward.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'वक़्त की क़ीमत',
      literal: 'the price of time',
      meaning: 'The value of time - used to emphasize not wasting it.',
      example: 'बड़े लोग कहते हैं कि वक़्त की क़ीमत पहचानो।',
      exampleEnglish: 'Elders say: recognize the value of time.',
    },
    {
      phrase: 'नौ दो ग्यारह होना',
      literal: 'to become nine-two-eleven',
      meaning: 'To vanish / run away quickly.',
      example: 'घंटी बजते ही बच्चे नौ दो ग्यारह हो गए।',
      exampleEnglish: 'The moment the bell rang, the children vanished.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms sit naturally in a time-topic essay. "वक़्त की क़ीमत" fits a reflective closing; "नौ दो ग्यारह होना" fits a narrative moment (bell rang, everyone ran). One idiom per essay is plenty - two is showing off.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      shortLabel: 'A typical Monday',
      prompt:
        'अपने एक सामान्य सोमवार के बारे में तीन अनुच्छेदों में लिखो। बताओ कि तुम किस समय क्या करते हो। (Write three paragraphs about a typical Monday of yours. Describe what you do at what time.)',
      novice: 'मैं सात बजे उठता हूँ। मैं स्कूल जाता हूँ। मैं रात को सोता हूँ।',
      intermediateMid:
        'मेरा सोमवार बहुत व्यस्त होता है। पहले मैं सुबह साढ़े छह बजे उठती हूँ और तैयार होती हूँ। फिर सात बजे मैं माँ के साथ नाश्ता करती हूँ - आमतौर पर एक पराठा और एक गिलास दूध। पौने आठ बजे मेरी बस आती है, इसलिए मुझे बहुत जल्दी तैयार होना पड़ता है।\n\nस्कूल में पहला पीरियड हिंदी का है और तीसरा पीरियड गणित का। दोपहर के बारह बजे लंच होता है। पिछले सोमवार को मैं लंच भूल गई थी, लेकिन मेरी दोस्त ने मुझे अपनी रोटी दी, क्योंकि वह बहुत अच्छी है। इसके बाद सवा तीन बजे छुट्टी होती है।\n\nशाम को पाँच बजे मैं हिंदी पढ़ती हूँ और अंत में रात दस बजे सो जाती हूँ। अगले सोमवार मैं और जल्दी उठूँगी, क्योंकि मेरी माँ कहती हैं कि वक़्त की क़ीमत पहचाननी चाहिए। सोमवार थका देता है, पर मुझे अच्छा भी लगता है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'साढ़े छह / पौने आठ', note: 'Two non-trivial clock phrases in the opening - signals time control immediately.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले / फिर / इसलिए', note: 'Three sequence + reasoning connectors in three sentences. Text-Type lift.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'पहला पीरियड / तीसरा पीरियड', note: 'Ordinal adjectives with gender agreement - more advanced than plain cardinals.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले सोमवार को ... भूल गई थी', note: 'Past-perfective slides in beside present habitual. This tense mix inside one paragraph is the Intermediate-Mid signature.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'लेकिन / क्योंकि', note: 'Contrast + reason within a single sentence - reads as connected, not listed.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले सोमवार मैं और जल्दी उठूँगी', note: 'Future tense arrives in the closing. Three time frames in 130 words = clean Benchmark 5.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'वक़्त की क़ीमत पहचाननी चाहिए', note: 'Idiom used reflectively, not as decoration - Text-Type bonus.' },
      ],
      wordCount: 132,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'इसलिए', 'लेकिन', 'क्योंकि', 'इसके बाद', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three clock-phrase builders appear (साढ़े, पौने, सवा) in just 132 words - this directly signals "control of time expressions" that STAMP raters check for.',
          'All three tenses used: present habitual (उठती हूँ), past perfective (भूल गई थी), and future (उठूँगी). Satisfies IM rubric requirement of "some control of past, present, and future".',
          'Seven distinct connectors, each placed to do actual work - पहले/फिर/इसके बाद/अंत में chain the day; क्योंकि/लेकिन/इसलिए supply reasoning.',
          'Gender agreement clean across all verbs (उठती हूँ, करती हूँ, भूल गई थी) - feminine narrator sustained end to end.',
          'Idiom वक़्त की क़ीमत lands in a reflective closing, not randomly - a textbook Benchmark-5 move.',
        ],
        gotchas: [
          'Switching to masculine verb endings mid-essay (उठता हूँ after committing to feminine) drops Language Control to Low instantly.',
          'Replacing साढ़े छह with "छह तीस" works, but reads as translated and loses Topic Coverage points.',
        ],
      },
    },
    {
      shortLabel: 'Tomorrow\'s plan',
      prompt:
        'कल के कार्यक्रम के बारे में तीन अनुच्छेदों में लिखिए। आप किस समय क्या करेंगे, और क्यों? (Write three paragraphs about tomorrow\'s plan. What will you do at what time, and why?)',
      novice: 'कल मैं उठूँगा। मैं स्कूल जाऊँगा। मैं खेलूँगा।',
      intermediateMid:
        'कल मंगलवार है और मेरा दिन बहुत खास होगा, क्योंकि शाम को मेरी छोटी बहन का जन्मदिन है। पहले मैं सुबह पौने छह बजे उठूँगा। इतनी जल्दी इसलिए, क्योंकि मुझे उसके लिए एक कार्ड बनाना है। फिर सात बजे मैं नाश्ता करूँगा और पौने आठ की बस पकड़ूँगा।\n\nस्कूल में पहला पीरियड गणित का है, लेकिन मैं पूरे दिन घड़ी देखता रहूँगा। दोपहर के साढ़े बारह बजे लंच होगा और सवा तीन बजे छुट्टी। पिछले साल जब मेरी बहन का जन्मदिन था, तब मैं स्कूल से देर से लौटा था, इसलिए इस बार मैं सीधे घर जाऊँगा।\n\nशाम साढ़े छह बजे हम केक काटेंगे और अंत में रात नौ बजे तक घर के सब लोग गाने गाएँगे। मुझे लगता है कि यह मेरा सबसे अच्छा मंगलवार होगा, क्योंकि परिवार के साथ बिताया हुआ समय वक़्त की सबसे बड़ी क़ीमत है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'कल ... होगा ... उठूँगा', note: 'Future tense anchored in the first sentence - the essay commits to a time frame.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'क्योंकि / पहले / फिर', note: 'Reason + sequence in three consecutive sentences.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'पौने छह / पौने आठ', note: 'Two uses of पौने in different hours - proves the form is understood, not memorized.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पिछले साल जब ... तब ... लौटा था', note: 'Past-perfect slides inside a future-oriented essay. Three time frames confirmed.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'जब ... तब / इसलिए', note: '"When-then" construction paired with consequence - Intermediate-Mid hallmark.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... वक़्त की सबसे बड़ी क़ीमत है', note: 'Reflective closing generalizes beyond the event. Text-Type 5.' },
        { paragraphIndex: 2, kind: 'idiom', highlight: 'वक़्त की क़ीमत', note: 'Idiom used to close the essay - reads as register mastery.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'पहले', 'फिर', 'लेकिन', 'जब... तब', 'इसलिए', 'अंत में'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Future-dominant essay that still weaves in a past-perfect "पिछले साल ... लौटा था" - hits the three-tense rubric cleanly.',
          'Six distinct time expressions (पौने छह, सात, पौने आठ, साढ़े बारह, सवा तीन, साढ़े छह, नौ) - Topic Coverage is saturated without ever repeating a form.',
          'जब ... तब + इसलिए inside the middle paragraph shows sentence-level complexity that raters flag as Intermediate-Mid.',
          'Closing generalizes with an idiom (वक़्त की क़ीमत) rather than repeating facts - Text-Type lift.',
          'Masculine narrator sustained throughout (उठूँगा, जाऊँगा, लौटा था) - Language Control consistent.',
        ],
        gotchas: [
          'Dropping the ने in "पिछले साल ... लौटा था" is wrong if the verb were transitive. लौटना is intransitive so मैं लौटा is correct - but students often overapply ने.',
          'Switching "पौने छह" to "साढ़े पाँच" mid-essay changes the time entirely. Builders are not interchangeable: always compute from the correct anchor hour.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two full model essays at Benchmark 5 - one habit-based, one plan-based. Between them the student sees present-habitual, past-perfective, past-perfect, and simple-future all deployed with clock phrases. Practice by copying these by hand first, then substituting your own times and reasons.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने एक सामान्य दिन की दिनचर्या तीन अनुच्छेदों में लिखिए। सुबह, दोपहर, और शाम के काम अलग-अलग अनुच्छेदों में बताइए।',
      english:
        'Write three paragraphs about a typical day of yours. Describe morning, afternoon, and evening activities in separate paragraphs.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में'],
        vocab: ['सुबह', 'दोपहर', 'शाम', 'बजे', 'साढ़े', 'पौने'],
        tenses: ['present'],
      },
    },
    {
      hindi:
        'पिछले शनिवार आपने हर घंटे क्या किया? तीन अनुच्छेदों में लिखिए और कम से कम चार अलग-अलग समय का उल्लेख कीजिए।',
      english:
        'What did you do every hour last Saturday? Write three paragraphs and mention at least four different times.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'लेकिन'],
        vocab: ['सुबह', 'दोपहर', 'शाम', 'सवा', 'साढ़े', 'बजे'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अगले रविवार का आपका कार्यक्रम क्या है? तीन अनुच्छेदों में बताइए कि आप किस समय क्या करेंगे और क्यों।',
      english:
        'What is your plan for next Sunday? Write three paragraphs explaining what you will do, at what time, and why.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'अंत में'],
        vocab: ['सुबह', 'दोपहर', 'शाम', 'बजे', 'सवा', 'साढ़े'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is engineered for tense variety: habitual (present), narrative (past), and planning (future). The hints are guardrails - if your draft does not use at least three of the listed connectors and three of the listed clock phrases, revise before submitting.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay against the STAMP rubric before moving on. Numbers and time are a Language-Control gold mine: one correct सवा or साढ़े pays more than three generic sentences. Prefer fewer, cleaner clock phrases over many sloppy ones.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
