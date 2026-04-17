import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L2-04 · Classes & School Routines
// Level-2 complement to L1-07-classes-supplies. Goes beyond naming objects into
// opinions, comparisons, time-shift narratives (school vs home, today vs
// exam-day), teacher-student dynamics, and reflective closings.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L2-04-school-routines',
  level: 2,
  themeGroup: 'Identity',
  order: 16,
  titleHindi: 'स्कूल की दिनचर्या',
  titleEnglish: 'Classes & School Routines',
  hook: 'The school day is a ready-made three-paragraph scaffold: morning, classes with opinions, closing bell with a reflection. Perfect for Benchmark 5.',
  heroPrompt: composeHeroPrompt(
    'A stylized Indian school-day timeline — a morning assembly courtyard with a flag, a classroom with a chalkboard and rows of desks, a playground with a cricket bat leaning on a bench, and a library nook with open notebooks, all linked by soft arrows in kurta-orange and teal',
  ),

  rationale: {
    fcpsSubTopics: [
      'Classes and School Routines (FCPS Level 2 — Student Life)',
      'Extends L1-07 (Classes, Schedules & Supplies) from naming objects into opinions and comparisons',
      'Feeds L2-05 (School Activities) with shared routine vocabulary',
    ],
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Narrate a full school day with at least six sequenced events across past, present, and future',
      'State an opinion about a subject with a full causal clause (मुझे ___ पसंद है क्योंकि ___)',
      'Compare two subjects or two teachers using "X से Y ज़्यादा/कम ___ है"',
      'Shift between an ordinary day and an exam day within a single essay',
      'Embed one culturally specific detail (morning prayer, uniform, teacher-respect) to lift Topic Coverage',
    ],
    positionOnArc: 'building',
    estimatedTime: '90 min reading + 30 min essay',
    ifSkippedRisk:
      'School-day prompts appear on nearly every FCPS sitting in the Student Life cluster. Without L2-level vocabulary for opinions, exams, and comparisons, the student will default to L1-07 object lists and cap at Benchmark 4 (2 credits).',
  },

  objectives: [
    {
      text: 'Produce at least 10 opinion sentences using मुझे ___ पसंद है क्योंकि ___ without looking up structure.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Compare two subjects in a single sentence using X से Y ज़्यादा ___ है.',
      trains: ['LanguageControl', 'TopicCoverage'],
    },
    {
      text: 'Narrate a past exam-day memory in at least four connected sentences with correct ने-construction where needed.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Use at least three time-shifts (past exam memory, present routine, future test) in one 3-paragraph essay.',
      trains: ['TextType'],
    },
    {
      text: 'Embed one culturally specific school detail (सुबह की प्रार्थना, वर्दी, अध्यापक का आदर) to lift Topic Coverage above generic responses.',
      trains: ['TopicCoverage', 'TextType'],
    },
  ],

  vocabulary: [
    // School schedule
    { hindi: 'दिनचर्या', transliteration: 'dincharya', english: 'daily routine', exampleHindi: 'मेरी स्कूल की दिनचर्या बहुत व्यस्त है।', exampleEnglish: 'My school routine is very busy.', emoji: '📅', partOfSpeech: 'noun', subgroup: 'Schedule' },
    { hindi: 'सुबह की प्रार्थना', transliteration: 'subah ki praarthna', english: 'morning prayer / assembly', exampleHindi: 'हम सुबह की प्रार्थना मैदान में करते हैं।', exampleEnglish: 'We do the morning prayer in the ground.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Schedule' },
    { hindi: 'पहला घंटा', transliteration: 'pahla ghanta', english: 'first period', exampleHindi: 'पहला घंटा हिंदी का होता है।', exampleEnglish: 'The first period is Hindi.', emoji: '🔔', partOfSpeech: 'phrase', subgroup: 'Schedule' },
    { hindi: 'मध्यांतर', transliteration: 'madhyaantar', english: 'recess / interval', exampleHindi: 'मध्यांतर में हम खाना खाते हैं।', exampleEnglish: 'During recess we eat.', emoji: '🍱', partOfSpeech: 'noun', subgroup: 'Schedule' },
    { hindi: 'खेल का समय', transliteration: 'khel ka samay', english: 'playtime / sports period', exampleHindi: 'खेल का समय सबसे अच्छा लगता है।', exampleEnglish: 'Playtime feels the best.', emoji: '🏏', partOfSpeech: 'phrase', subgroup: 'Schedule' },
    { hindi: 'छुट्टी', transliteration: 'chhutti', english: 'dismissal / holiday', exampleHindi: 'तीन बजे छुट्टी हो जाती है।', exampleEnglish: 'Dismissal happens at three.', emoji: '🏁', partOfSpeech: 'noun', subgroup: 'Schedule' },
    { hindi: 'समय-सारणी', transliteration: 'samay-saarni', english: 'timetable', exampleHindi: 'समय-सारणी दीवार पर लगी है।', exampleEnglish: 'The timetable is on the wall.', emoji: '🗓️', partOfSpeech: 'noun', subgroup: 'Schedule' },
    { hindi: 'घंटी', transliteration: 'ghanti', english: 'bell', exampleHindi: 'जब घंटी बजती है, तब हम कक्षा में जाते हैं।', exampleEnglish: 'When the bell rings, then we go to class.', emoji: '🛎️', partOfSpeech: 'noun', subgroup: 'Schedule' },

    // Academic verbs
    { hindi: 'समझाना', transliteration: 'samjhaana', english: 'to explain', exampleHindi: 'अध्यापिका ने नया पाठ समझाया।', exampleEnglish: 'The teacher explained the new lesson.', emoji: '💡', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'बताना', transliteration: 'bataana', english: 'to tell / inform', exampleHindi: 'गुरुजी ने एक कहानी बताई।', exampleEnglish: 'Teacher sir told a story.', emoji: '🗣️', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'सवाल पूछना', transliteration: 'savaal poochhna', english: 'to ask a question', exampleHindi: 'मैं कक्षा में सवाल पूछती हूँ।', exampleEnglish: 'I ask questions in class.', emoji: '❓', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'उत्तर देना', transliteration: 'uttar dena', english: 'to answer', exampleHindi: 'उसने सही उत्तर दिया।', exampleEnglish: 'He gave the right answer.', emoji: '✅', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'नोट करना', transliteration: 'note karna', english: 'to note down', exampleHindi: 'मैं हर बात नोट करती हूँ।', exampleEnglish: 'I note down everything.', emoji: '📝', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'याद करना', transliteration: 'yaad karna', english: 'to memorize', exampleHindi: 'मुझे कविता याद करनी है।', exampleEnglish: 'I have to memorize the poem.', emoji: '🧠', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },
    { hindi: 'समझ में आना', transliteration: 'samajh mein aana', english: 'to understand (lit. "come into understanding")', exampleHindi: 'यह सवाल मेरी समझ में नहीं आया।', exampleEnglish: 'This question did not come into my understanding.', emoji: '🤔', partOfSpeech: 'verb', subgroup: 'Academic Verbs' },

    // Exams & testing
    { hindi: 'परीक्षा', transliteration: 'pareeksha', english: 'exam', exampleHindi: 'अगले हफ्ते हमारी परीक्षा होगी।', exampleEnglish: 'Next week our exam will take place.', emoji: '📄', partOfSpeech: 'noun', subgroup: 'Exams' },
    { hindi: 'टेस्ट', transliteration: 'test', english: 'test / quiz', exampleHindi: 'शुक्रवार को गणित का टेस्ट है।', exampleEnglish: 'Friday there is a math test.', emoji: '🧮', partOfSpeech: 'noun', subgroup: 'Exams' },
    { hindi: 'नंबर', transliteration: 'number', english: 'marks / score', exampleHindi: 'मुझे हिंदी में अच्छे नंबर मिले।', exampleEnglish: 'I got good marks in Hindi.', emoji: '💯', partOfSpeech: 'noun', subgroup: 'Exams' },
    { hindi: 'परिणाम', transliteration: 'parinaam', english: 'result', exampleHindi: 'परिणाम अगले महीने आएगा।', exampleEnglish: 'The result will come next month.', emoji: '📊', partOfSpeech: 'noun', subgroup: 'Exams' },
    { hindi: 'प्रमाणपत्र', transliteration: 'pramaanpatr', english: 'certificate', exampleHindi: 'मुझे खेल का प्रमाणपत्र मिला।', exampleEnglish: 'I received a sports certificate.', emoji: '🏅', partOfSpeech: 'noun', subgroup: 'Exams' },

    // Difficulty & opinion adjectives
    { hindi: 'आसान', transliteration: 'aasaan', english: 'easy', exampleHindi: 'यह अध्याय काफ़ी आसान है।', exampleEnglish: 'This chapter is quite easy.', emoji: '😌', partOfSpeech: 'adjective', subgroup: 'Difficulty' },
    { hindi: 'मुश्किल', transliteration: 'mushkil', english: 'difficult', exampleHindi: 'गणित मेरे लिए मुश्किल है।', exampleEnglish: 'Math is difficult for me.', emoji: '😓', partOfSpeech: 'adjective', subgroup: 'Difficulty' },
    { hindi: 'जटिल', transliteration: 'jatil', english: 'complex / intricate', exampleHindi: 'विज्ञान का यह विषय थोड़ा जटिल है।', exampleEnglish: 'This topic in science is a little complex.', emoji: '🧩', partOfSpeech: 'adjective', subgroup: 'Difficulty' },
    { hindi: 'रोचक', transliteration: 'rochak', english: 'interesting', exampleHindi: 'इतिहास का पाठ रोचक था।', exampleEnglish: 'The history lesson was interesting.', emoji: '✨', partOfSpeech: 'adjective', subgroup: 'Difficulty' },

    // People
    { hindi: 'अध्यापिका', transliteration: 'adhyaapika', english: 'female teacher', exampleHindi: 'हमारी अध्यापिका बहुत दयालु हैं।', exampleEnglish: 'Our teacher (f.) is very kind.', emoji: '👩‍🏫', partOfSpeech: 'noun', subgroup: 'People' },
    { hindi: 'गुरुजी', transliteration: 'guruji', english: 'respected teacher (m.)', exampleHindi: 'गुरुजी ने हमें प्रेरणा दी।', exampleEnglish: 'Guru-ji inspired us.', emoji: '👨‍🏫', partOfSpeech: 'noun', subgroup: 'People' },
    { hindi: 'सहपाठी', transliteration: 'sahpaathee', english: 'classmate', exampleHindi: 'मेरे सहपाठी मेरी मदद करते हैं।', exampleEnglish: 'My classmates help me.', emoji: '👥', partOfSpeech: 'noun', subgroup: 'People' },
    { hindi: 'प्राचार्य', transliteration: 'praachaarya', english: 'principal', exampleHindi: 'प्राचार्य ने सभा में भाषण दिया।', exampleEnglish: 'The principal gave a speech in assembly.', emoji: '🎓', partOfSpeech: 'noun', subgroup: 'People' },

    // School-day texture
    { hindi: 'वर्दी', transliteration: 'vardee', english: 'uniform', exampleHindi: 'हमारी वर्दी नीली और सफ़ेद है।', exampleEnglish: 'Our uniform is blue and white.', emoji: '👕', partOfSpeech: 'noun', subgroup: 'School Texture' },
    { hindi: 'अनुशासन', transliteration: 'anushaasan', english: 'discipline', exampleHindi: 'हमारे स्कूल में अनुशासन बहुत ज़रूरी है।', exampleEnglish: 'Discipline is very important in our school.', emoji: '⚖️', partOfSpeech: 'noun', subgroup: 'School Texture' },
  ],
  vocabularyNote: {
    why:
      'L1-07 teaches objects (किताब, कक्षा). This list pushes to the next rung: routines, opinions, comparisons, exams, and the people-dynamics raters expect at Intermediate-Mid. Every word shows up in the anchor, model texts, or model essays. Learn the 30, and a school-topic prompt becomes unmissable Topic-Coverage.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "vocabulary specific to the theme." FCPS L2 rubric explicitly names "Student Life — classes, schedules, routines" as a target domain.',
  },

  grammar: [
    {
      title: 'Causal opinions with मुझे ___ पसंद है, क्योंकि ___',
      rule:
        'A single opinion sentence is Novice-Mid. Attaching क्योंकि + a full clause turns it into Intermediate-Mid. The subject of the क्योंकि-clause must carry a verb (मुश्किल है, रोचक होता है — not just an adjective floating).',
      examples: [
        { hindi: 'मुझे हिंदी पसंद है, क्योंकि यह विषय रोचक है।', transliteration: 'mujhe hindi pasand hai, kyonki yah vishay rochak hai.', english: 'I like Hindi, because this subject is interesting.' },
        { hindi: 'मुझे गणित पसंद नहीं है, क्योंकि सवाल मेरी समझ में नहीं आते।', transliteration: 'mujhe ganit pasand nahin hai, kyonki savaal meri samajh mein nahin aate.', english: "I don't like math, because the questions don't come into my understanding." },
        { hindi: 'मुझे विज्ञान अच्छा लगता है, क्योंकि अध्यापिका अच्छे से समझाती हैं।', transliteration: 'mujhe vigyaan achchha lagta hai, kyonki adhyaapika achchhe se samjhaati hain.', english: 'I like science, because the teacher explains well.' },
      ],
      pitfall:
        'Students often drop the verb after क्योंकि and write "क्योंकि रोचक" — incomplete clause. The rubric reads this as a word-list, not a sentence.',
      whyItMatters:
        'Benchmark 5 requires "connected sentences with groupings of ideas." A क्योंकि-clause is the cleanest way to prove you can connect two ideas. One such sentence per paragraph and Text-Type stabilizes at 5.',
    },
    {
      title: 'Comparing subjects with X से Y ज़्यादा/कम ___ है',
      rule:
        'Use से to mean "than" in comparisons. Word order: [X] से [Y] ज़्यादा/कम [adjective] है. The adjective agrees with Y (the subject of the sentence), not X.',
      examples: [
        { hindi: 'गणित से हिंदी ज़्यादा आसान है।', transliteration: 'ganit se hindi zyaada aasaan hai.', english: 'Hindi is easier than math. (lit. "from math, Hindi is more easy")' },
        { hindi: 'विज्ञान से इतिहास कम मुश्किल है।', transliteration: 'vigyaan se itihaas kam mushkil hai.', english: 'History is less difficult than science.' },
        { hindi: 'अंग्रेज़ी से हिंदी मुझे ज़्यादा रोचक लगती है।', transliteration: 'angrezi se hindi mujhe zyaada rochak lagti hai.', english: 'Hindi feels more interesting to me than English. (feminine agreement: हिंदी → लगती)' },
      ],
      pitfall:
        'Reversing to "हिंदी से गणित ज़्यादा आसान" accidentally says "math is easier than Hindi" — the opposite meaning. The item AFTER से is the baseline; the item before the adjective is the one being judged.',
      whyItMatters:
        'Comparison is an Intermediate-Mid hallmark on the STAMP rubric. Two clean comparisons in an essay push both Language Control and Text-Type upward at the same time.',
    },
    {
      title: 'Time clauses with जब ___ तब ___ for routines',
      rule:
        'To describe a repeating event ("when the bell rings, we go to class"), use जब + present tense, तब + present tense. For a one-time past event, use जब + perfective, तब + perfective.',
      examples: [
        { hindi: 'जब घंटी बजती है, तब हम कक्षा में जाते हैं।', transliteration: 'jab ghanti bajti hai, tab hum kaksha mein jaate hain.', english: 'When the bell rings, then we go to class.' },
        { hindi: 'जब अध्यापिका समझाती हैं, तब मैं ध्यान से सुनती हूँ।', transliteration: 'jab adhyaapika samjhaati hain, tab main dhyaan se sunti hoon.', english: 'When the teacher explains, then I listen attentively.' },
        { hindi: 'जब परीक्षा आई, तब मैंने रात-रात भर पढ़ाई की।', transliteration: 'jab pareeksha aayi, tab maine raat-raat bhar padhaai ki.', english: 'When the exam came, then I studied all night long.' },
      ],
      pitfall:
        'Dropping तब makes the sentence feel incomplete in formal Hindi. In casual speech तब can be omitted, but in essay writing raters expect the pair.',
      whyItMatters:
        'जब ... तब is a precise, rubric-legible way to link two clauses. Raters consistently check for this construction as evidence of "connected sentences with transitions."',
    },
    {
      title: 'Stating opinions with मुझे लगता है कि ___',
      rule:
        'To express a personal judgment (not a fact), open the clause with मुझे लगता है कि — "it seems to me that." Everything after कि is a complete sentence.',
      examples: [
        { hindi: 'मुझे लगता है कि हिंदी सबसे रोचक विषय है।', transliteration: 'mujhe lagta hai ki hindi sabse rochak vishay hai.', english: 'I think that Hindi is the most interesting subject.' },
        { hindi: 'मुझे लगता है कि परीक्षाएँ बहुत ज़रूरी हैं।', transliteration: 'mujhe lagta hai ki pareekshaayen bahut zaroori hain.', english: 'I think that exams are very necessary.' },
        { hindi: 'मुझे लगता है कि अनुशासन से सफलता मिलती है।', transliteration: 'mujhe lagta hai ki anushaasan se safalta milti hai.', english: 'I think that success comes from discipline.' },
      ],
      pitfall:
        'Writing "मैं लगता है" is wrong — the construction requires मुझे (dative "to me"), not मैं (nominative). Think of it as "it seems TO ME."',
      whyItMatters:
        'Intermediate-Mid essays need reflective closings. मुझे लगता है कि is the single most reliable opener for a final-paragraph reflection that raters mark as "generalizes beyond the event."',
    },
  ],
  grammarNote: {
    why:
      'These four rules are the exact structures raters look for when scoring a Student-Life essay. A causal opinion, a comparison, a जब-तब routine clause, and a मुझे लगता है कि reflection together cover the full shape of a Benchmark-5 school essay. Learn the frames; plug in today\'s subject.',
    trains: ['LanguageControl', 'TextType'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'kyonki',
    'lekin',
    'isliye',
    'iskeAlawa',
    'jabTab',
    'mujheLagta',
  ]),
  connectorsNote: {
    why:
      'पहले / फिर / इसके बाद scaffold the morning-to-evening flow. क्योंकि / इसलिए / लेकिन carry the opinions and contrasts the topic demands. जब ... तब links a repeating routine to its trigger. इसके अलावा stacks evidence. मुझे लगता है कि anchors the reflective closing. Nine connectors — use four to six per essay.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरा स्कूल का दिन · My School Day',
    hindi:
      'मैं हर सुबह सात बजे उठती हूँ और वर्दी पहनकर स्कूल जाती हूँ। पहले हम मैदान में सुबह की प्रार्थना करते हैं, फिर पहला घंटा शुरू होता है। मुझे हिंदी सबसे अच्छी लगती है, क्योंकि अध्यापिका हर पाठ बहुत अच्छे से समझाती हैं। गणित से हिंदी मुझे ज़्यादा आसान लगती है, लेकिन मैं गणित में भी मेहनत करती हूँ। जब घंटी बजती है, तब हम मध्यांतर में खाना खाते हैं और सहपाठियों से बातें करते हैं। इसके बाद खेल का समय होता है, जो सबसे मज़ेदार है। कल हमारी विज्ञान की परीक्षा थी, इसलिए मैंने रात भर याद किया। अंत में तीन बजे छुट्टी हो जाती है। मुझे लगता है कि स्कूल सिर्फ़ पढ़ाई की जगह नहीं है, बल्कि दोस्ती और अनुशासन भी सिखाता है।',
    transliteration:
      'main har subah saat baje uthti hoon aur vardee pahankar school jaati hoon. pahle hum maidaan mein subah ki praarthna karte hain, phir pahla ghanta shuru hota hai. mujhe hindi sabse achchhi lagti hai, kyonki adhyaapika har paath bahut achchhe se samjhaati hain. ganit se hindi mujhe zyaada aasaan lagti hai, lekin main ganit mein bhi mehnat karti hoon. jab ghanti bajti hai, tab hum madhyaantar mein khaana khaate hain aur sahpaathiyon se baaten karte hain. iske baad khel ka samay hota hai, jo sabse mazedaar hai. kal hamaari vigyaan ki pareeksha thi, isliye maine raat bhar yaad kiya. ant mein teen baje chhutti ho jaati hai. mujhe lagta hai ki school sirf padhaai ki jagah nahin hai, balki dosti aur anushaasan bhi sikhaata hai.',
    english:
      'Every morning I wake up at seven and, after putting on my uniform, go to school. First we do the morning prayer in the ground, then the first period begins. I like Hindi the best, because the teacher explains every lesson very well. Hindi feels easier to me than math, but I work hard in math too. When the bell rings, then we eat in the recess and chat with classmates. After this is playtime, which is the most fun. Yesterday we had our science exam, so I memorized all night. Finally, dismissal happens at three. I think that school is not only a place of study, but also teaches friendship and discipline.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद / अंत में', note: 'Four sequence connectors move the reader from 7 AM to 3 PM. Sentences cannot be reordered — Text-Type 5 signal.' },
      { term: 'क्योंकि / लेकिन / इसलिए', note: 'Three reasoning connectors thread opinion, contrast, and consequence. Raters mark this as "connected ideas."' },
      { term: 'गणित से हिंदी ज़्यादा आसान लगती है', note: 'X से Y ज़्यादा construction — a comparison, not a list. This is the level-2 lift over L1-07.' },
      { term: 'कल ... परीक्षा थी / मैंने याद किया', note: 'Past tense with correct ने-construction (मैंने याद किया) — proves tense control mid-paragraph.' },
      { term: 'मुझे लगता है कि ... सिर्फ़ ... बल्कि ... भी', note: 'Reflective closing with "not only ... but also" — the most reliable Benchmark-5 finisher.' },
      { term: 'सुबह की प्रार्थना / वर्दी / अनुशासन', note: 'Three culturally specific Indian-school markers — Topic Coverage lift.' },
    ],
    comprehensionQuestions: [
      { q: 'At what time does the narrator wake up?', a: 'सात बजे (seven o\'clock).' },
      { q: 'What happens in the maidaan before classes begin?', a: 'सुबह की प्रार्थना (the morning prayer / assembly).' },
      { q: 'Which subject does the narrator like best, and why?', a: 'हिंदी, क्योंकि the अध्यापिका explains every lesson very well.' },
      { q: 'According to the narrator, is Hindi easier or harder than math?', a: 'Easier — "गणित से हिंदी ज़्यादा आसान लगती है."' },
      { q: 'What happened the day before the passage is set?', a: 'A विज्ञान (science) परीक्षा, which she studied all night for.' },
      { q: 'Identify two sequence connectors and one reasoning connector in the passage.', a: 'Sequence: पहले, फिर, इसके बाद, अंत में (any two). Reasoning: क्योंकि, लेकिन, or इसलिए.' },
      { q: 'What is the narrator\'s reflective claim about school in the closing sentence?', a: 'School is not only a place of study, but also teaches friendship and discipline (दोस्ती और अनुशासन).' },
    ],
  },
  anchorNote: {
    why:
      'This passage is a template for every school-topic essay in this pack. It shifts across past (कल परीक्षा थी), present habitual (उठती हूँ, जाती हूँ), and implied future (the reflective claim). Read it three times. The student\'s own essay should have this density — four sequence connectors, three reasoning connectors, one comparison, one reflection.',
    trains: ['TextType', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'कक्षा ९ की समय-सारणी · Grade 9 Timetable',
      hindi:
        '८:०० – सुबह की प्रार्थना\n८:२० – पहला घंटा: हिंदी\n९:१५ – दूसरा घंटा: गणित\n१०:१० – तीसरा घंटा: विज्ञान\n११:०० – मध्यांतर\n११:३० – चौथा घंटा: इतिहास\n१२:२५ – पाँचवाँ घंटा: अंग्रेज़ी\n१:२० – खेल का समय\n२:१५ – पुस्तकालय\n३:०० – छुट्टी',
      transliteration:
        '8:00 subah ki praarthna | 8:20 pahla ghanta: hindi | 9:15 doosra ghanta: ganit | 10:10 teesra ghanta: vigyaan | 11:00 madhyaantar | 11:30 chautha ghanta: itihaas | 12:25 paanchvaan ghanta: angrezi | 1:20 khel ka samay | 2:15 pustakaalaya | 3:00 chhutti',
      english:
        '8:00 Morning assembly · 8:20 Period 1: Hindi · 9:15 Period 2: Math · 10:10 Period 3: Science · 11:00 Recess · 11:30 Period 4: History · 12:25 Period 5: English · 1:20 Sports · 2:15 Library · 3:00 Dismissal',
    },
    {
      kind: 'diary',
      title: 'परीक्षा के दिन की डायरी · Exam-Day Diary',
      hindi:
        'आज विज्ञान की परीक्षा थी। मुझे थोड़ा डर लग रहा था, क्योंकि पाठ जटिल था। लेकिन जब मैंने पर्चा खोला, तब ज़्यादातर सवाल समझ में आ गए। मैंने ध्यान से सब कुछ लिखा। मुझे लगता है कि मेहनत का परिणाम अच्छा होगा।',
      transliteration:
        'aaj vigyaan ki pareeksha thi. mujhe thoda dar lag raha tha, kyonki paath jatil tha. lekin jab maine parcha khola, tab zyaadaatar savaal samajh mein aa gaye. maine dhyaan se sab kuchh likha. mujhe lagta hai ki mehnat ka parinaam achchha hoga.',
      english:
        'Today was the science exam. I was a little scared, because the chapter was complex. But when I opened the paper, then most questions came into my understanding. I wrote everything attentively. I think the result of hard work will be good.',
    },
    {
      kind: 'sms',
      title: 'सहपाठी को संदेश · Message to a Classmate',
      hindi:
        'अरे! कल गणित का टेस्ट है न? मुझे अध्याय ५ समझ में नहीं आ रहा। 😩 तू मुझे एक बार समझा दे, फिर मैं तुझे हिंदी के नोट्स भेज दूँगी।',
      transliteration:
        'are! kal ganit ka test hai na? mujhe adhyaay 5 samajh mein nahin aa raha. 😩 tu mujhe ek baar samjha de, phir main tujhe hindi ke notes bhej doongi.',
      english:
        "Hey! Tomorrow's the math test, right? I'm not getting chapter 5. 😩 Explain it to me once, then I'll send you the Hindi notes.",
    },
    {
      kind: 'announcement',
      title: 'सूचना पट्ट · Notice Board',
      hindi:
        'सभी छात्रों को सूचित किया जाता है कि सोमवार से वार्षिक परीक्षाएँ शुरू होंगी। समय-सारणी सूचना पट्ट पर लगी है। कृपया वर्दी में, और ठीक ८ बजे आएँ। देर से आने वालों को परीक्षा-हॉल में प्रवेश नहीं मिलेगा। — प्राचार्य',
      transliteration:
        'sabhi chhaatron ko soochit kiya jaata hai ki somvaar se vaarshik pareekshaayen shuru hongi. samay-saarni soochna patt par lagi hai. kripaya vardee mein, aur theek 8 baje aayen. der se aane vaalon ko pareeksha-haal mein pravesh nahin milega. — Praachaarya',
      english:
        "All students are informed that the annual exams will begin from Monday. The timetable is on the notice board. Please come in uniform, and at exactly 8 AM. Those arriving late will not be allowed entry into the exam hall. — Principal",
    },
  ],
  modelTextsNote: {
    why:
      'A timetable, a diary, an SMS, and an official notice span the four registers a Student-Life essay needs to be able to reach: formal (notice), personal (diary), casual (SMS), and listy (schedule). Imitate the register that matches your prompt; do not write a notice-style essay when a diary was asked for.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Morning Assembly (सुबह की प्रार्थना)',
      body:
        'Most Indian schools begin the day with the whole school gathered in the maidaan — national anthem, a prayer, and announcements from the principal. Mentioning सुबह की प्रार्थना instantly anchors an essay in an Indian (not generic Western) school.',
      emoji: '🙏',
    },
    {
      title: 'The Uniform as Equalizer',
      body:
        'Students from every economic background wear the same vardee — often navy-and-white or khaki. The uniform is discussed openly as a tool of equality and discipline, not fashion. A sentence like "हम सब वर्दी में बराबर दिखते हैं" reads as authentically Indian.',
      emoji: '👕',
    },
    {
      title: 'Teacher Respect (गुरु-शिष्य परंपरा)',
      body:
        'Students stand up when a teacher enters, call them गुरुजी / अध्यापिका जी, and do not interrupt. This respect-register shows up in writing as polite plurals (अध्यापिका समझाती हैं — plural verb for singular teacher).',
      emoji: '🙇',
    },
    {
      title: 'Exam Pressure is a Shared Story',
      body:
        'Board exams (बोर्ड की परीक्षा) in class 10 and 12 are a national ritual — families fast, neighbors ask about results, newspapers publish toppers. An essay that acknowledges this pressure ("परीक्षा के दिनों में पूरा घर शांत रहता है") reads as lived experience, not textbook Hindi.',
      emoji: '📚',
    },
    {
      title: 'Chalkboard + Notebook, Not Laptop',
      body:
        "Most Indian classrooms still run on a चॉक-बोर्ड (chalkboard) and हस्तलिखित नोट्स (handwritten notes) — not Chromebooks. If you are writing about an Indian school, keep the tech low. If you are writing about your FCPS school, name the difference — raters notice.",
      emoji: '📓',
    },
  ],
  culturalNote: {
    why:
      'One specific Indian-school detail — morning prayer, uniform equality, teacher-plural-respect, or board-exam pressure — lifts a school essay out of the generic pile. Raters reading 40 school essays in a row remember the one that mentioned the maidaan assembly. Pick one detail; plant it in paragraph two.',
    trains: ['TextType', 'TopicCoverage'],
  },

  muhavare: [
    {
      phrase: 'आँखों का तारा होना',
      literal: "to be the star of (someone's) eyes",
      meaning: "To be someone's favorite / apple of the eye.",
      example: 'वह छात्रा अध्यापिका की आँखों का तारा है, क्योंकि वह हर सवाल का उत्तर देती है।',
      exampleEnglish: "That student is the teacher's favorite, because she answers every question.",
    },
    {
      phrase: 'नाकों चने चबवाना',
      literal: 'to make (someone) chew chickpeas through the nose',
      meaning: 'To give someone a very hard time; to make a task punishingly difficult.',
      example: 'पिछली परीक्षा ने तो हमें नाकों चने चबवा दिए।',
      exampleEnglish: 'The last exam really put us through the wringer.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms fit school essays naturally: one for the star-student trope, one for a punishing exam. Drop ONE into your essay — idioms signal register mastery, but two feel performative and raters notice.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने स्कूल के एक सामान्य दिन के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपको कौन-सा विषय पसंद है और क्यों।  (Write three paragraphs about a typical day at your school. Tell which subject you like and why.)',
      novice:
        'मेरा स्कूल अच्छा है। मुझे हिंदी पसंद है। हम खेलते हैं।',
      intermediateMid:
        'मैं हर सुबह सात बजे उठती हूँ और वर्दी पहनकर स्कूल जाती हूँ। पहले हम मैदान में सुबह की प्रार्थना करते हैं, फिर पहला घंटा शुरू होता है। हमारी समय-सारणी में छह विषय हैं — हिंदी, गणित, विज्ञान, इतिहास, अंग्रेज़ी और खेल। जब घंटी बजती है, तब हम एक कक्षा से दूसरी में जाते हैं।\n\nमुझे हिंदी सबसे अच्छी लगती है, क्योंकि हमारी अध्यापिका हर पाठ बहुत अच्छे से समझाती हैं और रोचक कहानियाँ भी बताती हैं। गणित से हिंदी मुझे ज़्यादा आसान लगती है, लेकिन मैं गणित में भी मेहनत करती हूँ, इसलिए परिणाम ठीक आता है। मध्यांतर में मैं सहपाठियों के साथ खाना खाती हूँ और बातें करती हूँ।\n\nमुझे लगता है कि स्कूल सिर्फ़ पढ़ाई की जगह नहीं है, बल्कि दोस्ती और अनुशासन भी सिखाता है। अगले महीने हमारी परीक्षा होगी, इसलिए मैं रोज़ एक घंटा ज़्यादा पढ़ूँगी। मुझे उम्मीद है कि इस बार मुझे अच्छे नंबर मिलेंगे।',
      annotations: [
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर', note: 'Two sequence connectors in one sentence lock the morning timeline.' },
        { paragraphIndex: 0, kind: 'vocab', highlight: 'वर्दी, सुबह की प्रार्थना, समय-सारणी, घंटी', note: 'Four L2-specific school terms — none of these appear in L1-07. Topic Coverage signal.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'जब घंटी बजती है, तब हम ... जाते हैं', note: 'जब-तब routine clause — linking trigger and action in one sentence.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि ... इसलिए', note: 'Causal + consequence. Opinion with a full reason attached, not a stand-alone claim.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'गणित से हिंदी मुझे ज़्यादा आसान लगती है', note: 'X से Y ज़्यादा comparison with feminine agreement (लगती) — clean Language Control.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... बल्कि ... भी', note: 'Not-only-but-also — the Intermediate-Mid reflective closer.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले महीने ... पढ़ूँगी / मिलेंगे', note: 'Future tense enters in paragraph 3 — three time frames in 140 words = Benchmark 5.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'अनुशासन भी सिखाता है', note: 'Generalizes the school-as-character-builder trope — authentically Indian framing.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'जब... तब', 'क्योंकि', 'लेकिन', 'इसलिए', 'सिर्फ़... बल्कि भी', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs with a clear shift: routine → opinion → reflection. Sentences cannot be reordered — Text-Type 5 confirmed.',
          'Eight distinct connectors used correctly across 142 words. Far above the three-connector threshold.',
          'Present (उठती हूँ), present-habitual (बजती है ... जाते हैं), and future (पढ़ूँगी, मिलेंगे) all appear — satisfies "some control of past, present, future" for IM.',
          'Gender agreement holds: वर्दी (f) पहनकर, हिंदी (f) ... आसान लगती (f) है, स्कूल (m) ... सिखाता (m) है. Language Control stabilizes at Average+.',
          'Culturally anchored details (सुबह की प्रार्थना, वर्दी, मध्यांतर, अनुशासन) make this read as an Indian school, not a generic one.',
        ],
        gotchas: [
          'If a student writes "मुझे हिंदी पसंद है" but then shifts to "अच्छी लगती है" without matching gender of the pronoun chain, Language Control slips.',
          'Dropping the future-tense paragraph would cap this at Benchmark 4 despite the identical vocabulary.',
        ],
      },
    },
    {
      prompt:
        'अपने जीवन के एक यादगार परीक्षा के दिन के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि आपने कैसे तैयारी की, परीक्षा कैसी रही, और परिणाम से आपने क्या सीखा।  (Write three paragraphs about a memorable exam day in your life. Tell how you prepared, how the exam went, and what you learned from the result.)',
      novice: 'परीक्षा थी। मैं पढ़ा। नंबर अच्छे थे।',
      intermediateMid:
        'पिछले साल हमारी विज्ञान की वार्षिक परीक्षा थी। पाठ जटिल था, इसलिए मैंने एक हफ़्ते पहले से तैयारी शुरू कर दी। पहले मैंने अध्यापिका के नोट्स पढ़े, फिर हर अध्याय याद किया, और इसके बाद पुराने पर्चे हल किए। जब मेरी समझ में कोई सवाल नहीं आता था, तब मैं अपनी सहपाठी नीलम को फ़ोन करती थी और वह मुझे अच्छे से समझाती थी।\n\nपरीक्षा के दिन मैंने ठीक समय पर वर्दी पहनी और आठ बजे स्कूल पहुँची। जब मैंने पर्चा खोला, तब दिल ज़ोर-ज़ोर से धड़क रहा था। लेकिन ज़्यादातर सवाल आसान थे, सिर्फ़ दो सवाल थोड़े मुश्किल थे। मैंने ध्यान से हर उत्तर लिखा और अंत में पूरा पर्चा एक बार फिर से पढ़ा।\n\nदो हफ़्ते बाद परिणाम आया और मुझे ९२ नंबर मिले। प्राचार्य ने सभा में मुझे प्रमाणपत्र भी दिया। मुझे लगता है कि मेहनत कभी बेकार नहीं जाती। अगली परीक्षा में भी मैं इसी तरह तैयारी करूँगी, क्योंकि अनुशासन से ही सफलता मिलती है।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले साल ... थी / मैंने शुरू कर दी', note: 'Past frame opens immediately with the perfective ने-construction. Anchors tense early.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर ... इसके बाद', note: 'Three sequence connectors for the preparation phase — clean staged reasoning.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'जब ... नहीं आता था, तब मैं ... करती थी', note: 'जब-तब with habitual imperfect ("whenever I didn\'t get it, I used to call") — a subtle tense that raters reward.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'पर्चा, सवाल, उत्तर, ध्यान से', note: 'Exam-specific vocabulary clustered in one paragraph — Topic Coverage.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'ज़्यादातर ... आसान थे, सिर्फ़ दो ... मुश्किल थे', note: 'Contrast via quantifier pair (most/only two) — Intermediate-Mid shading.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'प्राचार्य ने सभा में प्रमाणपत्र दिया', note: 'Authentic Indian-school moment — the public recognition at assembly.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'मैं इसी तरह तैयारी करूँगी', note: 'Future-tense closing — three time frames covered.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि मेहनत कभी बेकार नहीं जाती', note: 'Reflective generalization — the textbook Benchmark-5 closer.' },
      ],
      wordCount: 148,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'इसके बाद', 'जब... तब', 'लेकिन', 'इसलिए', 'क्योंकि', 'मुझे लगता है कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Sustained past narrative through two paragraphs with consistent ने-construction (मैंने पढ़े, हल किए, लिखा, पहुँची) — Language Control above Average.',
          'Eight connectors in 148 words, spanning sequence, time-clause, and reasoning. Text-Type 5 locked.',
          'Three time frames: past exam memory, present reflection (मेहनत कभी बेकार नहीं जाती), future commitment (करूँगी). The rubric\'s time-frame requirement is decisively met.',
          'Exam-specific vocabulary (पर्चा, वार्षिक परीक्षा, प्रमाणपत्र, ९२ नंबर, सभा) distinct from the first essay — proves range within the same pack.',
          'Reflective closing generalizes beyond the event (अनुशासन से ही सफलता मिलती है) — exactly the move raters flag as "Intermediate-Mid and above."',
        ],
        gotchas: [
          'If the student writes "मैं पढ़ा" (dropping ने in past transitive), Language Control drops one band immediately.',
          'If all three paragraphs stay in the past — no present reflection, no future — the essay caps at Benchmark 4 no matter how fluent the Hindi.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Essay 1 handles the standard "describe a school day" prompt; Essay 2 handles the narrative exam-day memory. Together they show the two angles FCPS Student-Life prompts take. Do not memorize the essays — memorize the sentence shapes and plug in your own facts.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने स्कूल के सबसे पसंदीदा और सबसे मुश्किल विषय की तुलना तीन अनुच्छेदों में कीजिए। बताइए कि क्यों एक आसान और दूसरा मुश्किल लगता है।',
      english:
        'Compare your favorite and most difficult school subjects in three paragraphs. Explain why one feels easy and the other difficult.',
      hint: {
        connectors: ['क्योंकि', 'लेकिन', 'इसके अलावा', 'मुझे लगता है कि'],
        vocab: ['रोचक', 'मुश्किल', 'आसान', 'समझ में आना', 'अध्यापिका'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'एक यादगार परीक्षा के दिन के बारे में तीन अनुच्छेदों में लिखिए। तैयारी, परीक्षा-हॉल का अनुभव, और परिणाम — तीनों पर बात कीजिए।',
      english:
        'Write three paragraphs about a memorable exam day. Cover preparation, the experience in the exam hall, and the result.',
      hint: {
        connectors: ['पहले', 'फिर', 'जब... तब', 'इसलिए'],
        vocab: ['परीक्षा', 'याद करना', 'पर्चा', 'नंबर', 'परिणाम'],
        tenses: ['past', 'present', 'future'],
      },
    },
    {
      hindi:
        'अपने स्कूल की सुबह की प्रार्थना से छुट्टी तक की दिनचर्या का तीन अनुच्छेदों में वर्णन कीजिए। कम से कम एक सांस्कृतिक बात ज़रूर शामिल कीजिए।',
      english:
        'Describe your school routine from morning prayer to dismissal in three paragraphs. Include at least one cultural detail.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'अंत में', 'मुझे लगता है कि'],
        vocab: ['सुबह की प्रार्थना', 'वर्दी', 'मध्यांतर', 'खेल का समय', 'अनुशासन'],
        tenses: ['present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Prompt 1 forces comparison (the core L2 move). Prompt 2 forces a past narrative with a future commitment (three time frames, unavoidable). Prompt 3 forces cultural specificity. Pick whichever angle your student is weakest on and write it first.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay: did you use four or more connectors? One comparison with से? One opinion with क्योंकि + full clause? At least two time frames? One cultural specific? If you check four of those five, you are at Benchmark 5. If you check two or fewer, revise before submitting.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
