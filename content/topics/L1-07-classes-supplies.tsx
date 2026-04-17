import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L1-07 · Classes, Schedules & Supplies
// Foundations pack — the second-most-frequent FCPS L1 essay theme after
// family/self. Teaches topic possessives (X का/की/के ...), schedule phrases
// (सोमवार को ...), and "मेरा सबसे अच्छा विषय ___ है क्योंकि ..." scaffold that
// unlocks an instant Benchmark-5 paragraph.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-07-classes-supplies',
  level: 1,
  themeGroup: 'Identity',
  order: 7,
  heroMotif: 'books',
  titleHindi: 'कक्षाएँ और स्कूल की चीज़ें',
  titleEnglish: 'Classes, Schedules & Supplies',
  hook: 'School vocabulary is the second-most-likely FCPS essay prompt. Own subjects, supplies, and the weekly schedule, and half the Level-1 prompt bank is solved.',
  heroPrompt: composeHeroPrompt(
    "An Indian student's wooden desk seen from above — open notebook with faint Devanagari, two pencils, a sharpener, a geometry box, a blue water bottle, a cloth school bag hanging on the chair, a green chalkboard in the background with a wiped-clean surface, morning light slanting in",
  ),

  rationale: {
    fcpsSubTopics: [
      'Classes, Schedules, and Supplies (FCPS Level 1 — School Life)',
      'Daily routine at school (FCPS Level 1 — School Life)',
      'Favorite subject / favorite teacher (FCPS Level 1 — School Life)',
    ],
    trains: ['TopicCoverage', 'TextType', 'LanguageControl'],
    afterThisPackStudentCan: [
      'Name at least 9 school subjects and 8 supplies in Hindi without looking them up',
      'State a weekly schedule using "सोमवार को ___ है" across three days',
      'Justify a favorite subject in a full sentence using "क्योंकि"',
      'Write a 3-paragraph essay on a school day with past, present, and future reference',
      'Apply का / की / के correctly to subject-teacher and subject-book phrases',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '80 min reading + 30 min essay',
    ifSkippedRisk:
      'FCPS Level 1 prompts about "my school day", "my favorite subject", or "my school bag" appear on nearly every form. Without this pack the student has no subject-specific nouns, no schedule grammar, and will fall back to Novice-High descriptions that cap at 1 credit.',
  },

  objectives: [
    {
      text: 'Recognize and write 9 subjects and 8 supplies with correct gender.',
      trains: ['TopicCoverage', 'LanguageControl'],
    },
    {
      text: 'Use the possessive का / की / के correctly across at least 6 subject-related phrases (गणित का अध्यापक, हिंदी की किताब, कक्षा के छात्र).',
      trains: ['LanguageControl'],
    },
    {
      text: 'Describe a weekly schedule using "सोमवार को", "मंगलवार को" etc. for at least three days.',
      trains: ['TopicCoverage', 'TextType'],
    },
    {
      text: 'Justify a favorite subject using "मेरा सबसे अच्छा विषय ___ है क्योंकि ..." in one cohesive sentence.',
      trains: ['TextType', 'LanguageControl'],
    },
    {
      text: 'Produce a 3-paragraph school-day essay that uses past (कल), present (रोज़), and future (कल) within 100–150 words.',
      trains: ['TextType'],
    },
  ],

  vocabulary: [
    // Subjects
    { hindi: 'विषय', transliteration: 'vishay', english: 'subject', exampleHindi: 'मेरा पसंदीदा विषय हिंदी है।', exampleEnglish: 'My favorite subject is Hindi.', emoji: '📚', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'गणित', transliteration: 'ganit', english: 'mathematics', exampleHindi: 'सोमवार को गणित की कक्षा होती है।', exampleEnglish: 'On Monday there is a maths class.', emoji: '➗', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'विज्ञान', transliteration: 'vigyaan', english: 'science', exampleHindi: 'विज्ञान मुझे बहुत रोचक लगता है।', exampleEnglish: 'I find science very interesting.', emoji: '🔬', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'हिंदी', transliteration: 'hindi', english: 'Hindi (subject)', exampleHindi: 'हिंदी की किताब मेज़ पर है।', exampleEnglish: 'The Hindi book is on the table.', emoji: '📖', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'अंग्रेज़ी', transliteration: 'angrezi', english: 'English (subject)', exampleHindi: 'अंग्रेज़ी में मुझे कविताएँ पसंद हैं।', exampleEnglish: 'In English I like poems.', emoji: '🔤', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'सामाजिक विज्ञान', transliteration: 'saamaajik vigyaan', english: 'social studies', exampleHindi: 'सामाजिक विज्ञान में हम इतिहास पढ़ते हैं।', exampleEnglish: 'In social studies we read history.', emoji: '🌏', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'कंप्यूटर', transliteration: 'computer', english: 'computer (subject)', exampleHindi: 'कंप्यूटर की कक्षा प्रयोगशाला में होती है।', exampleEnglish: 'The computer class is in the lab.', emoji: '💻', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'कला', transliteration: 'kalaa', english: 'art', exampleHindi: 'कला की कक्षा में मैंने एक चित्र बनाया।', exampleEnglish: 'In art class I drew a picture.', emoji: '🎨', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'संगीत', transliteration: 'sangeet', english: 'music', exampleHindi: 'संगीत मुझे बहुत अच्छा लगता है।', exampleEnglish: 'I like music very much.', emoji: '🎵', partOfSpeech: 'noun', subgroup: 'Subjects' },
    { hindi: 'शारीरिक शिक्षा', transliteration: 'shaareerik shikshaa', english: 'physical education', exampleHindi: 'शारीरिक शिक्षा खेल के मैदान में होती है।', exampleEnglish: 'PE takes place on the playground.', emoji: '🏃', partOfSpeech: 'noun', subgroup: 'Subjects' },

    // Supplies
    { hindi: 'किताब', transliteration: 'kitaab', english: 'book', exampleHindi: 'मेरी हिंदी की किताब नई है।', exampleEnglish: 'My Hindi book is new.', emoji: '📕', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'कॉपी', transliteration: 'copy', english: 'notebook', exampleHindi: 'मैं कॉपी में लिखता हूँ।', exampleEnglish: 'I write in the notebook.', emoji: '📓', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'कलम', transliteration: 'kalam', english: 'pen', exampleHindi: 'यह कलम मेरे पिताजी की है।', exampleEnglish: 'This pen is my father\'s.', emoji: '🖊️', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'पेंसिल', transliteration: 'pencil', english: 'pencil', exampleHindi: 'पेंसिल की नोक टूट गई है।', exampleEnglish: 'The pencil tip has broken.', emoji: '✏️', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'रबर', transliteration: 'rabar', english: 'eraser', exampleHindi: 'कृपया मुझे रबर दो।', exampleEnglish: 'Please give me the eraser.', emoji: '🩹', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'बैग', transliteration: 'bag', english: 'school bag', exampleHindi: 'मेरा बैग बहुत भारी है।', exampleEnglish: 'My bag is very heavy.', emoji: '🎒', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'टिफ़िन', transliteration: 'tiffin', english: 'lunch box', exampleHindi: 'माँ ने टिफ़िन में पराठा रखा।', exampleEnglish: 'Mother put a paratha in the tiffin.', emoji: '🍱', partOfSpeech: 'noun', subgroup: 'Supplies' },
    { hindi: 'पानी की बोतल', transliteration: 'paani ki botal', english: 'water bottle', exampleHindi: 'पानी की बोतल बैग में है।', exampleEnglish: 'The water bottle is in the bag.', emoji: '🍼', partOfSpeech: 'phrase', subgroup: 'Supplies' },

    // Places
    { hindi: 'कक्षा', transliteration: 'kakshaa', english: 'classroom / class', exampleHindi: 'हमारी कक्षा दूसरी मंज़िल पर है।', exampleEnglish: 'Our classroom is on the second floor.', emoji: '🏫', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'पुस्तकालय', transliteration: 'pustakaalay', english: 'library', exampleHindi: 'पुस्तकालय में शांति रहती है।', exampleEnglish: 'There is quiet in the library.', emoji: '📚', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'प्रयोगशाला', transliteration: 'prayogshaalaa', english: 'laboratory', exampleHindi: 'हम विज्ञान के प्रयोग प्रयोगशाला में करते हैं।', exampleEnglish: 'We do science experiments in the lab.', emoji: '⚗️', partOfSpeech: 'noun', subgroup: 'Places' },
    { hindi: 'खेल का मैदान', transliteration: 'khel ka maidaan', english: 'playground', exampleHindi: 'खेल के मैदान में बच्चे दौड़ते हैं।', exampleEnglish: 'Children run on the playground.', emoji: '⚽', partOfSpeech: 'phrase', subgroup: 'Places' },

    // People
    { hindi: 'अध्यापक', transliteration: 'adhyaapak', english: 'teacher (m)', exampleHindi: 'गणित के अध्यापक सख़्त हैं।', exampleEnglish: 'The maths teacher is strict.', emoji: '👨\u200d🏫', partOfSpeech: 'noun', subgroup: 'People' },
    { hindi: 'अध्यापिका', transliteration: 'adhyaapikaa', english: 'teacher (f)', exampleHindi: 'हिंदी की अध्यापिका बहुत दयालु हैं।', exampleEnglish: 'The Hindi teacher is very kind.', emoji: '👩\u200d🏫', partOfSpeech: 'noun', subgroup: 'People' },
    { hindi: 'छात्र', transliteration: 'chhaatra', english: 'student (m)', exampleHindi: 'कक्षा के छात्र ध्यान से सुनते हैं।', exampleEnglish: 'The students of the class listen carefully.', emoji: '🧑\u200d🎓', partOfSpeech: 'noun', subgroup: 'People' },

    // Verbs
    { hindi: 'पढ़ना', transliteration: 'padhna', english: 'to read / study', exampleHindi: 'मैं रोज़ दो घंटे पढ़ता हूँ।', exampleEnglish: 'I study for two hours every day.', emoji: '📖', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'लिखना', transliteration: 'likhna', english: 'to write', exampleHindi: 'छात्र कॉपी में लिखते हैं।', exampleEnglish: 'Students write in the notebook.', emoji: '✍️', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'सीखना', transliteration: 'seekhna', english: 'to learn', exampleHindi: 'मैं हर दिन कुछ नया सीखता हूँ।', exampleEnglish: 'I learn something new every day.', emoji: '🧠', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'समझना', transliteration: 'samajhna', english: 'to understand', exampleHindi: 'मैडम अच्छी तरह समझाती हैं।', exampleEnglish: 'Ma\'am explains well.', emoji: '💡', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'हल करना', transliteration: 'hal karna', english: 'to solve', exampleHindi: 'मैंने पाँच सवाल हल किए।', exampleEnglish: 'I solved five problems.', emoji: '🧮', partOfSpeech: 'verb', subgroup: 'Verbs' },
  ],
  vocabularyNote: {
    why:
      'These 30 words cover every noun and verb a student needs for the "school day" and "favorite subject" prompts. Each appears in the anchor, model texts, or one of the model essays — learn the list first and Topic Coverage is already locked in before the student writes a word.',
    trains: ['TopicCoverage'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?"',
  },

  grammar: [
    {
      title: 'Topic possessives: का / की / के with subjects, books, teachers, and students',
      rule:
        'Hindi possessives agree with the thing possessed, not the possessor. का for masculine singular (अध्यापक), की for feminine (किताब, कक्षा), के for masculine plural or oblique (छात्र when followed by a verb group / plural). "X का Y" = "Y of X".',
      examples: [
        { hindi: 'गणित का अध्यापक सख़्त है।', transliteration: 'ganit ka adhyaapak sakht hai.', english: 'The maths teacher is strict. (masc. sing.)' },
        { hindi: 'हिंदी की किताब मेरे बैग में है।', transliteration: 'hindi ki kitaab mere bag mein hai.', english: 'The Hindi book is in my bag. (fem.)' },
        { hindi: 'कक्षा के छात्र ध्यान से सुनते हैं।', transliteration: 'kakshaa ke chhaatra dhyaan se sunte hain.', english: 'The students of the class listen carefully. (masc. plural)' },
      ],
      pitfall:
        'Saying "गणित की अध्यापक" (feminine की on a masculine noun अध्यापक) or "हिंदी का किताब" (masculine का on feminine किताब) is the single most common error. Fix the gender of the second noun first, then pick का/की/के.',
      whyItMatters:
        'Possessive phrases appear in every school essay — "my maths teacher", "the Hindi book", "the students of my class". Consistent mistakes here cap Language Control at Low no matter how rich the vocabulary is.',
    },
    {
      title: 'Schedule expressions with "___ को" (on Monday, on Tuesday)',
      rule:
        'To say "on Monday / on Tuesday" in a schedule context, attach the postposition को to the day of the week: सोमवार को, मंगलवार को, बुधवार को, गुरुवार को, शुक्रवार को. The verb stays in the present tense: "सोमवार को गणित की कक्षा होती है।"',
      examples: [
        { hindi: 'सोमवार को गणित की कक्षा होती है।', transliteration: 'somvaar ko ganit ki kakshaa hoti hai.', english: 'On Monday there is a maths class.' },
        { hindi: 'मंगलवार को विज्ञान और कला होती है।', transliteration: 'mangalvaar ko vigyaan aur kalaa hoti hai.', english: 'On Tuesday there is science and art.' },
        { hindi: 'शुक्रवार को खेल का मैदान खुला रहता है।', transliteration: 'shukravaar ko khel ka maidaan khulaa rahtaa hai.', english: 'On Friday the playground stays open.' },
      ],
      pitfall:
        'Students often drop को and write "सोमवार गणित है।" — comprehensible but flat. Adding को instantly lifts the sentence register and signals grammatical control.',
      whyItMatters:
        'A three-day schedule paragraph (सोमवार को ... मंगलवार को ... शुक्रवार को ...) is the fastest way to hit Text-Type 5 on a school prompt: three connected sentences that cannot be rearranged.',
    },
    {
      title: 'The "favorite subject" scaffold: सबसे अच्छा विषय ___ है क्योंकि ___',
      rule:
        'The superlative सबसे ("most") + अच्छा ("good") agrees with the following masculine noun विषय. The clause after क्योंकि must give a real reason, not just a restatement. Build one full sentence: [subject] + है + क्योंकि + [reason].',
      examples: [
        { hindi: 'मेरा सबसे अच्छा विषय हिंदी है, क्योंकि मुझे कहानियाँ पसंद हैं।', transliteration: 'mera sabse achchha vishay hindi hai, kyonki mujhe kahaaniyaan pasand hain.', english: 'My best/favorite subject is Hindi, because I like stories.' },
        { hindi: 'मेरा सबसे अच्छा विषय विज्ञान है, क्योंकि मैं प्रयोग करना पसंद करता हूँ।', transliteration: 'mera sabse achchha vishay vigyaan hai, kyonki main prayog karna pasand karta hoon.', english: 'My favorite subject is science, because I like doing experiments.' },
        { hindi: 'मेरा सबसे अच्छा विषय कला है, क्योंकि उसमें मैं चित्र बनाता हूँ।', transliteration: 'mera sabse achchha vishay kalaa hai, kyonki usmein main chitra banaata hoon.', english: 'My favorite subject is art, because in it I draw pictures.' },
      ],
      pitfall:
        'Writing "मेरा सबसे अच्छा विषय हिंदी, क्योंकि अच्छा है।" (missing है and a circular reason) is common. Always include है before क्योंकि and make the reason concrete.',
      whyItMatters:
        'This single sentence shape gives the rater: a possessive, a superlative, a linking verb, and क्योंकि with a reason — four rubric boxes ticked in one line. Memorize it.',
    },
  ],
  grammarNote: {
    why:
      'These three rules handle roughly every sentence the student will write on a school prompt. Get का/की/के right, learn the "सोमवार को" frame, and practice the "सबसे अच्छा विषय" scaffold, and the essay writes itself.',
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
  ]),
  connectorsNote: {
    why:
      'पहले / फिर / इसके बाद sequence a school day (prayer → first class → break → last class). क्योंकि justifies a favorite subject. लेकिन contrasts a loved vs. disliked subject. इसलिए reports a consequence ("homework was hard, so I stayed back"). इसके अलावा lets the student add a supply or a club beyond the obvious list — which is how Topic Coverage gets pushed from Average to High.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'मेरा स्कूल का दिन · My School Day',
    hindi:
      'मेरा नाम आरव है और मैं आठवीं कक्षा में पढ़ता हूँ। रोज़ सुबह सात बजे मैं अपना बैग तैयार करता हूँ। पहले हम सब प्रार्थना में खड़े होते हैं, फिर कक्षा शुरू होती है। सोमवार को पहले गणित की कक्षा होती है, इसके बाद विज्ञान। गणित के अध्यापक सख़्त हैं, लेकिन बहुत अच्छा समझाते हैं। हिंदी की अध्यापिका हमें कहानियाँ पढ़ाती हैं, इसलिए मुझे हिंदी सबसे अच्छी लगती है। दोपहर को हम टिफ़िन खोलते हैं और दोस्तों के साथ खाते हैं। इसके अलावा शुक्रवार को खेल का मैदान खुला रहता है। कल विज्ञान का छोटा टेस्ट है, इसलिए आज शाम मैं प्रयोगशाला की कॉपी से पढ़ूँगा। मेरा सबसे अच्छा विषय हिंदी है, क्योंकि उसमें कहानियाँ भी हैं और सवाल भी।',
    transliteration:
      'mera naam aarav hai aur main aathveen kakshaa mein padhta hoon. roz subah saat baje main apna bag taiyaar karta hoon. pahle hum sab praarthanaa mein khade hote hain, phir kakshaa shuroo hoti hai. somvaar ko pahle ganit ki kakshaa hoti hai, iske baad vigyaan. ganit ke adhyaapak sakht hain, lekin bahut achchha samjhaate hain. hindi ki adhyaapikaa humein kahaaniyaan padhaati hain, isliye mujhe hindi sabse achchhi lagti hai. dopahar ko hum tiffin kholte hain aur doston ke saath khaate hain. iske alawa shukravaar ko khel ka maidaan khulaa rahtaa hai. kal vigyaan ka chhotaa test hai, isliye aaj shaam main prayogshaalaa ki copy se padhoonga. mera sabse achchha vishay hindi hai, kyonki usmein kahaaniyaan bhi hain aur savaal bhi.',
    english:
      'My name is Aarav and I study in class eight. Every morning at seven I get my bag ready. First we all stand for the prayer, then class begins. On Monday there is first a maths class, after that science. The maths teacher is strict, but explains very well. The Hindi teacher reads us stories, so I like Hindi the most. At midday we open our tiffins and eat with friends. Besides this, on Friday the playground stays open. Tomorrow there is a small science test, so this evening I will study from my lab notebook. My favorite subject is Hindi, because it has both stories and questions.',
    highlights: [
      { term: 'पहले / फिर / इसके बाद', note: 'Three sequence connectors scaffold the school day — sentences can no longer be reshuffled. Pure Text-Type 5.' },
      { term: 'गणित के अध्यापक (m) / हिंदी की अध्यापिका (f)', note: 'के vs. की agreement on two teachers in the same paragraph — a clean Language Control signal.' },
      { term: 'सोमवार को / शुक्रवार को', note: 'Schedule postposition को. Memorize this frame; it reappears in every school essay.' },
      { term: 'प्रार्थना', note: 'Cultural specific. Indian schools start with a morning prayer — mentioning it lifts Topic Coverage above generic "we go to class".' },
      { term: 'कल ... पढ़ूँगा', note: 'Future tense in the final paragraph — the third time frame the rubric rewards.' },
      { term: 'मेरा सबसे अच्छा विषय ___ है, क्योंकि ___', note: 'The signature school-prompt scaffold, used in full in the closing line.' },
    ],
    comprehensionQuestions: [
      { q: 'What class is Aarav in?', a: 'आठवीं कक्षा में (class eight).' },
      { q: 'Which subject comes first on Monday?', a: 'गणित (maths).' },
      { q: 'How does the paragraph describe the maths teacher?', a: 'सख़्त, लेकिन अच्छा समझाते हैं (strict, but explains well).' },
      { q: 'Why does Aarav like Hindi the most?', a: 'क्योंकि उसमें कहानियाँ भी हैं और सवाल भी (because it has both stories and questions).' },
      { q: 'What happens on Friday that is different?', a: 'खेल का मैदान खुला रहता है (the playground stays open).' },
      { q: 'Why will Aarav study in the evening?', a: 'क्योंकि कल विज्ञान का छोटा टेस्ट है (because there is a small science test tomorrow).' },
      { q: 'Identify one possessive phrase and say whether it uses का, की, or के.', a: 'गणित के अध्यापक (के), हिंदी की अध्यापिका (की), विज्ञान का टेस्ट (का), पानी की बोतल (की) — any one.' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a worked example of a passing Intermediate-Mid school-day essay. Every structural move the student must make — sequence connectors, possessive agreement, schedule postposition, cultural specific, future-tense close — appears here in context. Read it aloud three times before attempting a prompt.',
    trains: ['TextType', 'TopicCoverage', 'LanguageControl'],
  },

  modelTexts: [
    {
      kind: 'schedule',
      title: 'हमारी कक्षा का समय-सारिणी · Our Class Timetable',
      hindi:
        'सोमवार: गणित · हिंदी · विज्ञान · कला\nमंगलवार: अंग्रेज़ी · सामाजिक विज्ञान · गणित · संगीत\nबुधवार: विज्ञान · हिंदी · कंप्यूटर · शारीरिक शिक्षा\nगुरुवार: गणित · अंग्रेज़ी · कला · पुस्तकालय\nशुक्रवार: सामाजिक विज्ञान · संगीत · खेल का मैदान',
      transliteration:
        'somvaar: ganit, hindi, vigyaan, kalaa | mangalvaar: angrezi, saamaajik vigyaan, ganit, sangeet | budhvaar: vigyaan, hindi, computer, shaareerik shikshaa | guruvaar: ganit, angrezi, kalaa, pustakaalay | shukravaar: saamaajik vigyaan, sangeet, khel ka maidaan',
      english:
        'Mon: Maths, Hindi, Science, Art · Tue: English, Social Studies, Maths, Music · Wed: Science, Hindi, Computer, PE · Thu: Maths, English, Art, Library · Fri: Social Studies, Music, Playground',
    },
    {
      kind: 'diary',
      title: 'आज की डायरी · Today\'s Diary',
      hindi:
        'आज गणित की कक्षा में मैडम ने पाँच कठिन सवाल दिए। पहले मुझे कुछ समझ नहीं आया, लेकिन फिर मेरे दोस्त ने समझाया। मैंने तीन सवाल हल किए। कल बाकी दो सवाल करूँगा, क्योंकि कल टेस्ट है।',
      transliteration:
        'aaj ganit ki kakshaa mein madam ne paanch kathin savaal diye. pahle mujhe kuchh samajh nahin aayaa, lekin phir mere dost ne samjhaayaa. maine teen savaal hal kiye. kal baaki do savaal karoonga, kyonki kal test hai.',
      english:
        'Today in maths class Ma\'am gave five hard problems. At first I did not understand anything, but then my friend explained. I solved three problems. Tomorrow I will do the remaining two, because the test is tomorrow.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Friend',
      hindi:
        'अरे! कल अपनी हिंदी की किताब लाना मत भूलना 🙏 मेरी बहन ने मेरी कॉपी फाड़ दी है 😭 और रबर भी चाहिए। टिफ़िन में आज आलू के पराठे हैं, साझा करेंगे।',
      transliteration:
        'are! kal apni hindi ki kitaab laana mat bhoolna. meri bahan ne meri copy phaad di hai. aur rabar bhi chaahiye. tiffin mein aaj aaloo ke paraathe hain, saajhaa karenge.',
      english:
        'Hey! Don\'t forget to bring your Hindi book tomorrow. My sister tore my notebook, and I need an eraser too. Today my tiffin has aloo parathas, we\'ll share.',
    },
    {
      kind: 'announcement',
      title: 'कक्षा में सूचना · Classroom Notice',
      hindi:
        'सभी छात्रों को सूचित किया जाता है कि शुक्रवार को विज्ञान की प्रयोगशाला में छोटा टेस्ट होगा। कृपया अपनी कॉपी, पेंसिल और रबर ज़रूर लाएँ। टिफ़िन के बाद कक्षा शुरू होगी।',
      transliteration:
        'sabhi chhaatron ko soochit kiyaa jaataa hai ki shukravaar ko vigyaan ki prayogshaalaa mein chhotaa test hoga. kripaya apni copy, pencil aur rabar zaroor laayen. tiffin ke baad kakshaa shuroo hogi.',
      english:
        'All students are informed that on Friday there will be a short test in the science laboratory. Please be sure to bring your notebook, pencil, and eraser. The class will begin after tiffin.',
    },
  ],
  modelTextsNote: {
    why:
      'A timetable, a diary entry, a friend SMS, and a formal notice — four registers the student should be able to imitate. The timetable alone is a scaffold: swap the names of the subjects and the student already has a middle paragraph for almost any school-day essay.',
    trains: ['TextType', 'TopicCoverage'],
  },

  cultural: [
    {
      title: 'Morning Prayer (प्रार्थना)',
      body:
        'Most Indian schools begin the day with a 10-minute prayer assembly — students line up, sing a bhajan or the national anthem, and hear a short thought for the day. Mentioning प्रार्थना is an instant cultural marker that separates a real Indian school day from a generic description.',
      emoji: '🙏',
    },
    {
      title: 'सर / मैडम — Subject-Teacher Naming',
      body:
        'Hindi-medium students rarely say "हिंदी की अध्यापिका" out loud. In speech they say "हिंदी मैडम" or "गणित सर". In formal writing (like the FCPS essay), the full अध्यापक / अध्यापिका is preferred — but knowing both registers shows range.',
      emoji: '👩\u200d🏫',
    },
    {
      title: 'School Uniform & Tie',
      body:
        'Almost every Indian school enforces a uniform — shirt, trousers or skirt, a tie for most middle-and-high school grades, and polished black shoes. A student who writes "मैंने यूनिफ़ॉर्म पहनी" instantly situates the essay in the right cultural frame.',
      emoji: '👔',
    },
    {
      title: 'Tuition / Coaching Culture',
      body:
        'After regular school, many Indian students attend private ट्यूशन or कोचिंग classes — especially for गणित and विज्ञान before exams. Referencing "स्कूल के बाद ट्यूशन" gives the essay a contemporary, specific flavor raters reward under Topic Coverage.',
      emoji: '📝',
    },
    {
      title: 'CBSE Subject Pattern',
      body:
        'The standard CBSE timetable grades 6–8 includes Hindi, English, Mathematics, Science, Social Studies, a third language (often Sanskrit), Computer, Art, Music, and Physical Education. When in doubt, list subjects from this set — it matches what any Indian rater expects.',
      emoji: '📋',
    },
  ],
  culturalNote: {
    why:
      'A generic "I go to school" essay reads as Novice-High regardless of grammar. One specific cultural pin — the morning prayer, the uniform tie, the tuition class after school — is a direct Topic-Coverage boost at no grammar cost. Pick one per essay.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'अक्षर-अक्षर याद होना',
      literal: 'to remember letter by letter',
      meaning: 'To know something by heart, perfectly memorized.',
      example: 'मुझे हिंदी की यह कविता अक्षर-अक्षर याद है।',
      exampleEnglish: 'I know this Hindi poem by heart — every single word.',
    },
    {
      phrase: 'नानी याद आना',
      literal: 'one\'s maternal grandmother comes to mind',
      meaning: 'To be in serious trouble or find something extremely difficult (the way hard homework does).',
      example: 'कल गणित के टेस्ट में मुझे नानी याद आ गई।',
      exampleEnglish: 'Yesterday in the maths test I was really put through it.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms fit the school context naturally — one for memorized recitation (the Indian classroom norm), one for a brutal test. Used once in a 3-paragraph essay, an idiom signals register mastery. Used twice, it reads as forced.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने स्कूल के एक साधारण दिन के बारे में तीन अनुच्छेदों में लिखो। अपनी समय-सारिणी, अपने पसंदीदा विषय, और अपने बैग की चीज़ों का उल्लेख करो। (Write three paragraphs about a typical day at your school. Mention your schedule, your favorite subject, and the things in your bag.)',
      novice:
        'मैं स्कूल जाता हूँ। मुझे हिंदी पसंद है। मेरा बैग है।',
      intermediateMid:
        'मेरा नाम आरव है और मैं आठवीं कक्षा में पढ़ता हूँ। रोज़ सुबह सात बजे मैं अपना बैग तैयार करता हूँ — उसमें हिंदी की किताब, गणित की कॉपी, पेंसिल, रबर और पानी की बोतल होती है। पहले हम सब प्रार्थना में खड़े होते हैं, फिर कक्षा शुरू होती है।\n\nसोमवार को पहले गणित की कक्षा होती है, इसके बाद विज्ञान। गणित के अध्यापक सख़्त हैं, लेकिन बहुत अच्छा समझाते हैं। हिंदी की अध्यापिका हमें कहानियाँ पढ़ाती हैं, इसलिए मुझे हिंदी सबसे अच्छी लगती है। दोपहर को हम टिफ़िन खोलते हैं और दोस्तों के साथ खाते हैं।\n\nकल विज्ञान का छोटा टेस्ट है, इसलिए आज शाम मैं प्रयोगशाला की कॉपी से पढ़ूँगा। मेरा सबसे अच्छा विषय हिंदी है, क्योंकि उसमें कहानियाँ भी हैं और सवाल भी। मुझे लगता है कि स्कूल सिर्फ़ पढ़ाई की जगह नहीं है, बल्कि दोस्तों की भी जगह है।',
      annotations: [
        { paragraphIndex: 0, kind: 'vocab', highlight: 'हिंदी की किताब, गणित की कॉपी, पेंसिल, रबर, पानी की बोतल', note: 'Five distinct supplies with correct की / masculine forms — Topic Coverage secured in one sentence.' },
        { paragraphIndex: 0, kind: 'cultural', highlight: 'प्रार्थना में खड़े होते हैं', note: 'Cultural specific (morning assembly) in paragraph 1 — immediate Topic-Coverage lift.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले ... फिर', note: 'Sequence connectors lock the paragraph shape.' },
        { paragraphIndex: 1, kind: 'structure', highlight: 'सोमवार को ... इसके बाद ...', note: 'Schedule postposition को + इसके बाद — two school-specific grammar moves in one sentence.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'गणित के अध्यापक (m) / हिंदी की अध्यापिका (f)', note: 'के vs. की agreement on paired nouns — clean Language Control signal.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'लेकिन / इसलिए', note: 'Contrast + consequence back-to-back — Text-Type lift.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'कल ... है / आज शाम ... पढ़ूँगा', note: 'Future tense arrives explicitly — the third time frame the rubric needs.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'सिर्फ़ ... नहीं, बल्कि ... भी', note: '"Not only ... but also" — an Intermediate-Mid hallmark used in the reflective close.' },
      ],
      wordCount: 136,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'फिर', 'इसके बाद', 'लेकिन', 'इसलिए', 'क्योंकि', 'बल्कि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs, each with a clear job: getting ready + prayer, the actual schedule, and the reflective close. Sentences cannot be reshuffled — Text-Type 5 requirement met.',
          'Present-habitual (पढ़ता हूँ, होती है) sits beside future (पढ़ूँगा) in the final paragraph, giving the rubric the tense variety it wants.',
          'Possessive agreement is airtight: हिंदी की किताब, गणित की कॉपी, पानी की बोतल (all की), गणित के अध्यापक, हिंदी की अध्यापिका, विज्ञान का टेस्ट. Language Control stabilizes at Average-High.',
          'At least seven distinct connectors used correctly — well above the 3-connector threshold.',
          'Cultural specific (प्रार्थना, टिफ़िन) grounds the essay in an authentic Indian school, not a generic classroom.',
        ],
        gotchas: [
          'Switching to feminine verb forms mid-essay (I am Aarav but then पढ़ती हूँ) would drop Language Control by a level. Pick a gender and sustain it.',
          'Losing the "सिर्फ़ ... बल्कि ... भी" close would pull Text-Type back toward 4 — the reflective generalization is what lifts it clearly into 5.',
        ],
      },
    },
    {
      prompt:
        'अपने पसंदीदा विषय और अध्यापक के बारे में तीन अनुच्छेदों में लिखो। कल की एक याद, रोज़ की कक्षा, और आने वाली परीक्षा का उल्लेख करो। (Write three paragraphs about your favorite subject and teacher. Mention a memory from yesterday, your everyday class, and an upcoming test.)',
      novice:
        'मुझे हिंदी पसंद है। मेरी मैडम अच्छी हैं। मैं पढ़ूँगा।',
      intermediateMid:
        'मेरा सबसे अच्छा विषय हिंदी है, क्योंकि उसमें कहानियाँ भी हैं और कविताएँ भी। हिंदी की अध्यापिका बहुत दयालु हैं और हमें अक्षर-अक्षर याद कराती हैं। उनकी कक्षा में मुझे कभी नींद नहीं आती।\n\nकल की बात है, मैडम ने एक पुरानी कहानी पढ़ाई। पहले उन्होंने कहानी पढ़ी, फिर हमें सवाल दिए। मैंने पाँच सवाल हल किए, लेकिन एक समझ नहीं आया। इसलिए मेरे दोस्त ने मुझे समझाया, और अब मुझे पूरी कहानी याद है। रोज़ घर पर भी मैं हिंदी की कॉपी खोलकर कुछ-न-कुछ लिखता हूँ।\n\nअगले सोमवार को हमारा हिंदी का छोटा टेस्ट होगा। इसलिए इस शनिवार मैं पुस्तकालय जाऊँगा और अभ्यास करूँगा। इसके अलावा मैं माँ से भी एक कहानी सुनूँगा। मुझे लगता है कि अगर अध्यापिका अच्छी हो, तो कोई भी विषय सबसे अच्छा बन सकता है।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'मेरा सबसे अच्छा विषय ___ है, क्योंकि ___', note: 'The signature scaffold used as the opening line — locks the essay topic and reason in one sentence.' },
        { paragraphIndex: 0, kind: 'idiom', highlight: 'अक्षर-अक्षर याद', note: 'School-appropriate idiom placed in context — one idiom per essay is plenty.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'कल ... मैडम ने पढ़ाई / मैंने हल किए', note: 'Past perfective with ने-construction correctly applied to a female narrator-agent scenario.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'पहले ... फिर ... लेकिन ... इसलिए', note: 'Four connectors in a single paragraph — Text-Type 5 signal.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'रोज़ ... लिखता हूँ', note: 'Present-habitual shift inside the past paragraph — rubric rewards mixed time frames.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले सोमवार को ... होगा / जाऊँगा / करूँगा', note: 'Three future-tense verbs in one paragraph seal the third time frame.' },
        { paragraphIndex: 2, kind: 'structure', highlight: 'अगर ... तो ... बन सकता है', note: 'Conditional reflective close — Intermediate-Mid hallmark.' },
      ],
      wordCount: 142,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['क्योंकि', 'पहले', 'फिर', 'लेकिन', 'इसलिए', 'इसके अलावा'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Opens directly with the "सबसे अच्छा विषय ___ है क्योंकि" scaffold — rater sees the key school-prompt move in line 1.',
          'Clean three-frame coverage: yesterday (कल ... पढ़ाई, हल किए), today (रोज़ ... लिखता हूँ), next week (अगले सोमवार ... होगा, जाऊँगा, करूँगा).',
          'Past ने-construction is correct: मैंने हल किए, मैडम ने पढ़ाई — raters look specifically for this and it is here.',
          'Idiom अक्षर-अक्षर याद is embedded, not tacked on. Signals register mastery.',
          'Reflective conditional close (अगर अध्यापिका अच्छी हो, तो कोई भी विषय सबसे अच्छा बन सकता है) generalizes beyond the event — pure Text-Type 5.',
        ],
        gotchas: [
          'If a student wrote "मैं हल किए" instead of "मैंने हल किए", ne-construction error drops Language Control to Low.',
          'Dropping the future paragraph entirely and staying in past+present would cap the essay at Benchmark 4 (2 credits) — the third time frame is what unlocks 3.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-annotated model essays on the two most common school prompts (typical day; favorite subject and teacher). Read each one twice, then try to reproduce the opening sentence from memory before moving to the writing prompts. The verdict cards show which rubric boxes each sentence ticks.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'अपने स्कूल के एक सामान्य दिन के बारे में तीन अनुच्छेदों में लिखिए। अपनी सोमवार की समय-सारिणी, अपने बैग की चीज़ों, और टिफ़िन के समय का उल्लेख कीजिए।',
      english:
        'Write three paragraphs about a typical day at your school. Mention your Monday schedule, the things in your bag, and tiffin time.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसके बाद', 'क्योंकि'],
        vocab: ['प्रार्थना', 'कक्षा', 'किताब', 'कॉपी', 'टिफ़िन'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'अपने पसंदीदा विषय और अध्यापक/अध्यापिका के बारे में तीन अनुच्छेदों में लिखिए। बताइए कि वह विषय आपको क्यों पसंद है और कल की कक्षा में क्या हुआ।',
      english:
        'Write three paragraphs about your favorite subject and teacher. Explain why you like that subject and what happened in yesterday\'s class.',
      hint: {
        connectors: ['क्योंकि', 'लेकिन', 'इसलिए', 'इसके अलावा'],
        vocab: ['विषय', 'अध्यापक', 'अध्यापिका', 'समझना', 'सीखना'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'कल आपके स्कूल में एक टेस्ट या परीक्षा है। तीन अनुच्छेदों में लिखिए — आज आपने क्या पढ़ा, कल आप क्या करेंगे, और आप किस विषय को लेकर सबसे ज़्यादा सोच रहे हैं।',
      english:
        'Tomorrow there is a test or exam at your school. Write three paragraphs — what you studied today, what you will do tomorrow, and which subject you are most anxious about.',
      hint: {
        connectors: ['पहले', 'फिर', 'इसलिए', 'क्योंकि'],
        vocab: ['परीक्षा', 'कॉपी', 'हल करना', 'प्रयोगशाला', 'पुस्तकालय'],
        tenses: ['past', 'present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Each prompt is deliberately FCPS-shaped: three cohesive paragraphs, personal experience, enough time-frame scope to force past + present + future. The hint strip is not the answer — it is a checklist of language goals. If the essay does not use most hints, the rubric will catch the gap.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Self-grade every essay you write in this pack against the STAMP rubric. If you cannot point to a past-tense sentence, a future-tense sentence, and three different connectors in your draft, it is still Benchmark 4. Add them before moving to the next pack.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
