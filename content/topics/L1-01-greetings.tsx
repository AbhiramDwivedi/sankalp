import type { TopicPack } from '../schema';
import { composeHeroPrompt } from '../imagePrompts';
import { pickConnectors } from '../connectors';

// -----------------------------------------------------------------------------
// L1-01 — Greetings & Introductions (अभिवादन और परिचय)
// The first words of every essay and every speaking prompt. A student who
// can self-introduce in multiple registers (formal/informal, present/past/
// future hooks) sounds fluent from sentence one.
// -----------------------------------------------------------------------------

export const pack: TopicPack = {
  id: 'L1-01-greetings',
  level: 1,
  themeGroup: 'Identity',
  order: 1,
  heroMotif: 'namaste',
  titleHindi: 'अभिवादन और परिचय',
  titleEnglish: 'Greetings & Introductions',
  hook: 'The first words any essay opens with — and the cheapest way to sound fluent.',
  heroPrompt: composeHeroPrompt(
    'Two silhouetted students meeting on a school courtyard in the morning, hands joined in namaste, soft marigold sunrise',
  ),

  rationale: {
    fcpsSubTopics: [
      'Greetings and Introductions (FCPS Level 1 — Personal & Family Life)',
      'Personal information: name, age, school, city (FCPS Level 1)',
      'Feeds every later topic — every essay opens with a self-introduction move',
    ],
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    afterThisPackStudentCan: [
      'Open any essay with a 3–4 sentence self-introduction using नाम, उम्र, शहर, कक्षा',
      'Switch registers between आप (formal, for teachers/elders) and तुम (informal, for peers)',
      'Conjugate होना (हूँ / है / हैं) correctly across first, second, and third person',
      'Use मेरा / मेरी / मेरे with correct gender and number agreement',
      'Close a conversation or essay politely with फिर मिलेंगे / धन्यवाद',
    ],
    positionOnArc: 'foundations',
    estimatedTime: '60 min reading + 30 min essay',
    ifSkippedRisk:
      'Every FCPS writing and speaking prompt begins with the student introducing themselves. Skipping this pack means the opening lines of every essay are shaky — raters form their first impression in the first two sentences, and a wobble there caps the whole response at Novice-High.',
  },

  objectives: [
    {
      text: 'Produce five distinct greetings and match each to time of day or register.',
      trains: ['TopicCoverage', 'TextType'],
    },
    {
      text: 'Conjugate होना in present tense for मैं / तुम / आप / वह / वे without hesitation.',
      trains: ['LanguageControl'],
    },
    {
      text: 'Write a 3-paragraph self-introduction using present plus at least one past or future sentence.',
      trains: ['TextType'],
    },
    {
      text: 'Use मेरा / मेरी / मेरे correctly across 6+ possessive phrases (मेरा नाम, मेरी उम्र, मेरे दोस्त).',
      trains: ['LanguageControl'],
    },
    {
      text: 'Choose आप vs तुम appropriately — teacher/elder/stranger = आप, classmate/sibling = तुम.',
      trains: ['LanguageControl', 'TextType'],
    },
  ],

  vocabulary: [
    // Greetings
    { hindi: 'नमस्ते', transliteration: 'namaste', english: 'hello / greetings (neutral)', exampleHindi: 'नमस्ते, मेरा नाम आर्यन है।', exampleEnglish: 'Hello, my name is Aryan.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Greetings' },
    { hindi: 'नमस्कार', transliteration: 'namaskaar', english: 'hello (more formal)', exampleHindi: 'नमस्कार सर, मैं आपका नया छात्र हूँ।', exampleEnglish: 'Namaskar sir, I am your new student.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Greetings' },
    { hindi: 'आदाब', transliteration: 'aadaab', english: 'hello (Urdu-influenced, respectful)', exampleHindi: 'आदाब, बहुत खुशी हुई आपसे मिलकर।', exampleEnglish: 'Aadaab, very pleased to meet you.', emoji: '🤝', partOfSpeech: 'phrase', subgroup: 'Greetings' },
    { hindi: 'शुभ प्रभात', transliteration: 'shubh prabhaat', english: 'good morning', exampleHindi: 'शुभ प्रभात दीदी, नाश्ता तैयार है।', exampleEnglish: 'Good morning sister, breakfast is ready.', emoji: '🌅', partOfSpeech: 'phrase', subgroup: 'Greetings' },
    { hindi: 'शुभ रात्रि', transliteration: 'shubh raatri', english: 'good night', exampleHindi: 'शुभ रात्रि माँ, कल मिलते हैं।', exampleEnglish: 'Good night Mother, see you tomorrow.', emoji: '🌙', partOfSpeech: 'phrase', subgroup: 'Greetings' },

    // Self-introduction nouns
    { hindi: 'नाम', transliteration: 'naam', english: 'name', exampleHindi: 'मेरा नाम सीमा है।', exampleEnglish: 'My name is Seema.', emoji: '📛', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'उम्र', transliteration: 'umr', english: 'age', exampleHindi: 'मेरी उम्र पंद्रह साल है।', exampleEnglish: 'My age is fifteen years.', emoji: '🎂', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'पता', transliteration: 'pata', english: 'address', exampleHindi: 'मेरा पता यह है।', exampleEnglish: 'This is my address.', emoji: '🏠', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'शहर', transliteration: 'shahar', english: 'city', exampleHindi: 'मेरा शहर दिल्ली है।', exampleEnglish: 'My city is Delhi.', emoji: '🏙️', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'स्कूल', transliteration: 'school', english: 'school', exampleHindi: 'मेरा स्कूल घर के पास है।', exampleEnglish: 'My school is near my home.', emoji: '🏫', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'कक्षा', transliteration: 'kakshaa', english: 'class / grade', exampleHindi: 'मैं दसवीं कक्षा में हूँ।', exampleEnglish: 'I am in tenth grade.', emoji: '🎒', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'परिवार', transliteration: 'parivaar', english: 'family', exampleHindi: 'मेरे परिवार में चार लोग हैं।', exampleEnglish: 'There are four people in my family.', emoji: '👪', partOfSpeech: 'noun', subgroup: 'Self-introduction' },
    { hindi: 'दोस्त', transliteration: 'dost', english: 'friend', exampleHindi: 'मेरे दोस्त बहुत अच्छे हैं।', exampleEnglish: 'My friends are very nice.', emoji: '👫', partOfSpeech: 'noun', subgroup: 'Self-introduction' },

    // Question words
    { hindi: 'क्या', transliteration: 'kya', english: 'what', exampleHindi: 'आपका नाम क्या है?', exampleEnglish: 'What is your name?', emoji: '❓', partOfSpeech: 'question', subgroup: 'Question words' },
    { hindi: 'कौन', transliteration: 'kaun', english: 'who', exampleHindi: 'वह कौन है?', exampleEnglish: 'Who is that?', emoji: '🤔', partOfSpeech: 'question', subgroup: 'Question words' },
    { hindi: 'कहाँ', transliteration: 'kahaan', english: 'where', exampleHindi: 'आप कहाँ रहते हैं?', exampleEnglish: 'Where do you live?', emoji: '📍', partOfSpeech: 'question', subgroup: 'Question words' },
    { hindi: 'कैसे', transliteration: 'kaise', english: 'how', exampleHindi: 'आप कैसे हैं?', exampleEnglish: 'How are you?', emoji: '❔', partOfSpeech: 'question', subgroup: 'Question words' },

    // Polite responses
    { hindi: 'धन्यवाद', transliteration: 'dhanyavaad', english: 'thank you', exampleHindi: 'आपके स्वागत के लिए धन्यवाद।', exampleEnglish: 'Thank you for your welcome.', emoji: '🙏', partOfSpeech: 'phrase', subgroup: 'Polite speech' },
    { hindi: 'आपका स्वागत है', transliteration: 'aapka svaagat hai', english: "you're welcome / welcome", exampleHindi: 'हमारे घर में आपका स्वागत है।', exampleEnglish: 'You are welcome in our home.', emoji: '🌺', partOfSpeech: 'phrase', subgroup: 'Polite speech' },
    { hindi: 'जी', transliteration: 'ji', english: 'respectful suffix / yes', exampleHindi: 'नमस्ते सर जी, मैं रोहित हूँ।', exampleEnglish: 'Namaste sir-ji, I am Rohit.', emoji: '🎎', partOfSpeech: 'phrase', subgroup: 'Polite speech' },
    { hindi: 'माफ़ कीजिए', transliteration: 'maaf keejiye', english: 'excuse me / sorry', exampleHindi: 'माफ़ कीजिए, मैं देर से आया।', exampleEnglish: 'Excuse me, I came late.', emoji: '🙇', partOfSpeech: 'phrase', subgroup: 'Polite speech' },

    // Goodbye forms
    { hindi: 'फिर मिलेंगे', transliteration: 'phir milenge', english: 'see you again', exampleHindi: 'अच्छा, फिर मिलेंगे।', exampleEnglish: 'Okay, see you again.', emoji: '👋', partOfSpeech: 'phrase', subgroup: 'Farewells' },
    { hindi: 'अलविदा', transliteration: 'alvidaa', english: 'goodbye (formal / final)', exampleHindi: 'अलविदा दोस्तों, बहुत याद आएगी।', exampleEnglish: 'Goodbye friends, I will miss you very much.', emoji: '👋', partOfSpeech: 'phrase', subgroup: 'Farewells' },

    // Core copula + meeting verbs
    { hindi: 'होना', transliteration: 'hona', english: 'to be (हूँ / है / हैं)', exampleHindi: 'मैं छात्र हूँ, वह शिक्षक है।', exampleEnglish: 'I am a student, he is a teacher.', emoji: '🔗', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'मिलना', transliteration: 'milna', english: 'to meet', exampleHindi: 'आपसे मिलकर खुशी हुई।', exampleEnglish: 'Pleased to meet you.', emoji: '🤝', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'रहना', transliteration: 'rahna', english: 'to live / reside', exampleHindi: 'मैं फ़ेयरफ़ैक्स में रहती हूँ।', exampleEnglish: 'I live in Fairfax.', emoji: '🏘️', partOfSpeech: 'verb', subgroup: 'Verbs' },
    { hindi: 'पढ़ना', transliteration: 'padhna', english: 'to study / read', exampleHindi: 'मैं दसवीं कक्षा में पढ़ता हूँ।', exampleEnglish: 'I study in tenth grade.', emoji: '📖', partOfSpeech: 'verb', subgroup: 'Verbs' },

    // Pronouns (registers)
    { hindi: 'आप', transliteration: 'aap', english: 'you (formal / plural)', exampleHindi: 'आप कहाँ से हैं?', exampleEnglish: 'Where are you from?', emoji: '🎩', partOfSpeech: 'pronoun', subgroup: 'Pronouns' },
    { hindi: 'तुम', transliteration: 'tum', english: 'you (informal, peers)', exampleHindi: 'तुम किस स्कूल में पढ़ते हो?', exampleEnglish: 'Which school do you study in?', emoji: '🧑', partOfSpeech: 'pronoun', subgroup: 'Pronouns' },
  ],
  vocabularyNote: {
    why:
      'These 29 entries are the precise set that FCPS opening prompts ("Introduce yourself", "Describe your family") pull from again and again. Every item appears in the reading sample or one of the model essays. Master this list and the first 3–4 sentences of any essay become automatic — which is exactly where raters form their first impression.',
    trains: ['TopicCoverage', 'LanguageControl'],
    examLink: 'STAMP Topic Coverage: "Does the student use vocabulary specific to the theme?" Greetings + self-intro vocab opens every FCPS prompt.',
  },

  grammar: [
    {
      title: 'Copula होना in the present tense',
      rule:
        'The verb "to be" conjugates by person and number: मैं हूँ (I am), तुम हो (you informal are), आप हैं (you formal are / they are), वह है (he/she/it is), वे हैं (they are). The copula goes at the END of the sentence.',
      examples: [
        { hindi: 'मेरा नाम अनीता है।', transliteration: 'mera naam anita hai.', english: 'My name is Anita. (3rd sing.)' },
        { hindi: 'मैं दसवीं कक्षा में हूँ।', transliteration: 'main dasvin kakshaa mein hoon.', english: 'I am in tenth grade. (1st sing.)' },
        { hindi: 'आप मेरे शिक्षक हैं।', transliteration: 'aap mere shikshak hain.', english: 'You are my teacher. (formal / plural)' },
        { hindi: 'हम सब दोस्त हैं।', transliteration: 'hum sab dost hain.', english: 'We are all friends. (1st plural)' },
      ],
      pitfall:
        'Students often drop the copula ("मेरा नाम आर्यन") or use the wrong form ("मैं है" — wrong, should be "मैं हूँ"). Both errors are instantly visible to raters.',
      whyItMatters:
        'होना is the single most frequent verb in any introduction. Every correct copula = one clean sentence; every wrong one = one error in Language Control. Three wrong copulas in a row and the rubric caps at Novice-High (1 credit) regardless of vocabulary.',
    },
    {
      title: 'Register: आप vs तुम vs तू',
      rule:
        'Hindi encodes respect in the pronoun. Use आप for teachers, elders, strangers, and in FCPS essays (default). Use तुम for peers, classmates, younger siblings. तू is very intimate/rude and should NEVER appear in an essay. Verbs agree: आप हैं / करते हैं, तुम हो / करते हो, तू है / करता है.',
      examples: [
        { hindi: 'नमस्ते सर, आप कैसे हैं?', transliteration: 'namaste sir, aap kaise hain?', english: 'Namaste sir, how are you? (to teacher — आप)' },
        { hindi: 'अरे अमित, तुम कैसे हो?', transliteration: 'are amit, tum kaise ho?', english: 'Hey Amit, how are you? (to friend — तुम)' },
        { hindi: 'आपका नाम क्या है?', transliteration: 'aapka naam kya hai?', english: 'What is your name? (polite)' },
        { hindi: 'तुम्हारा नाम क्या है?', transliteration: 'tumhaara naam kya hai?', english: 'What is your name? (informal)' },
      ],
      pitfall:
        'Mixing registers within one essay ("नमस्ते सर, तुम कैसे हो?") is the most register-obvious error raters see. Pick आप and stay there for the full response.',
      whyItMatters:
        'Register consistency is a direct Language Control signal. The FCPS rubric explicitly checks whether the student "sustains appropriate register". One mix-up is forgivable; three is a cap at Intermediate-Low.',
    },
    {
      title: 'Possessive agreement: मेरा / मेरी / मेरे',
      rule:
        'The possessive "my" changes with the gender and number of what is possessed (NOT the possessor). मेरा + masc. sing. noun (मेरा नाम, मेरा स्कूल). मेरी + fem. sing./plural noun (मेरी उम्र, मेरी माँ). मेरे + masc. plural or oblique noun (मेरे दोस्त, मेरे पिताजी). The same rule applies to आपका/आपकी/आपके and तुम्हारा/तुम्हारी/तुम्हारे.',
      examples: [
        { hindi: 'मेरा नाम रोहन है।', transliteration: 'mera naam rohan hai.', english: 'My name is Rohan. (नाम = masc. sing.)' },
        { hindi: 'मेरी उम्र सोलह साल है।', transliteration: 'meri umr solah saal hai.', english: 'My age is sixteen years. (उम्र = fem.)' },
        { hindi: 'मेरे दो भाई हैं।', transliteration: 'mere do bhai hain.', english: 'I have two brothers. (भाई = masc. plural)' },
      ],
      pitfall:
        'Writing "मेरा माँ" or "मेरी नाम" is the #1 introduction error. माँ is feminine (→ मेरी माँ) and नाम is masculine (→ मेरा नाम).',
      whyItMatters:
        'Because possessives appear in every single introduction sentence, getting this wrong is a high-frequency error. Correct agreement across 5–6 possessives in one essay signals "sustained control" — the Intermediate-Mid threshold.',
    },
  ],
  grammarNote: {
    why:
      'These three rules — copula होना, register choice, and possessive agreement — cover roughly 90% of all errors on introduction essays. Drilling these first unlocks the opening move of every other FCPS topic. Fix these and Language Control stabilizes at Average, which is all Intermediate-Mid requires.',
    trains: ['LanguageControl'],
  },

  connectors: pickConnectors([
    'pahle',
    'phir',
    'iskeBaad',
    'kyonki',
    'lekin',
    'isliye',
  ]),
  connectorsNote: {
    why:
      'A Level-1 starter set: पहले, फिर, इसके बाद sequence a self-introduction cleanly (name → school → family). क्योंकि lets the student justify a preference ("I like Hindi because..."); लेकिन contrasts two facts ("I live in Fairfax, but I was born in Delhi"). Five connectors is the minimum to reach Text-Type 5 — use three in one essay and the rubric rewards you.',
    trains: ['TextType'],
  },

  anchor: {
    title: 'नए स्कूल में पहला दिन · First Day at a New School',
    hindi:
      'नमस्ते सर, मेरा नाम अर्जुन शर्मा है। मैं दसवीं कक्षा का नया छात्र हूँ। पहले मैं दिल्ली के एक स्कूल में पढ़ता था, लेकिन अब मेरा परिवार फ़ेयरफ़ैक्स आ गया है, क्योंकि मेरे पिताजी को यहाँ नौकरी मिली। मेरी उम्र पंद्रह साल है। मेरे परिवार में चार लोग हैं — पिताजी, माँ, मेरी छोटी बहन, और मैं। मुझे हिंदी और गणित बहुत पसंद हैं। इसके बाद मैं अपने नए दोस्तों से मिलना चाहता हूँ। आपसे मिलकर बहुत खुशी हुई। धन्यवाद सर।',
    transliteration:
      'namaste sir, mera naam arjun sharma hai. main dasvin kakshaa ka naya chhaatr hoon. pahle main dilli ke ek school mein padhta tha, lekin ab mera parivaar fairfax aa gaya hai, kyonki mere pitaji ko yahaan naukri mili. meri umr pandrah saal hai. mere parivaar mein chaar log hain — pitaji, maa, meri chhoti bahan, aur main. mujhe hindi aur ganit bahut pasand hain. iske baad main apne naye doston se milna chahta hoon. aapse milkar bahut khushi hui. dhanyavaad sir.',
    english:
      "Namaste sir, my name is Arjun Sharma. I am a new student in the tenth grade. Earlier I used to study in a school in Delhi, but now my family has come to Fairfax, because my father got a job here. My age is fifteen years. There are four people in my family — Father, Mother, my younger sister, and me. I like Hindi and mathematics very much. After this, I want to meet my new friends. It has been a great pleasure to meet you. Thank you, sir.",
    highlights: [
      { term: 'नमस्ते सर … आप / धन्यवाद सर', note: 'Polite register sustained from opening to closing — one of the clearest Language Control signals raters look for.' },
      { term: 'पहले … लेकिन … क्योंकि … इसके बाद', note: 'Four different connectors stitch past, present-contrast, cause, and future into one paragraph. Text-Type 5 shape.' },
      { term: 'मेरा नाम / मेरी उम्र / मेरे परिवार', note: 'All three possessive genders (masc. sing., fem., masc. plural/oblique) used correctly in one passage.' },
      { term: 'पढ़ता था / आ गया है / मिलना चाहता हूँ', note: 'Habitual past + present perfect + future desire — three time frames, the IM threshold.' },
      { term: 'आपसे मिलकर खुशी हुई', note: 'Stock closing — memorize this exact phrase, it works in every introduction.' },
    ],
    comprehensionQuestions: [
      { q: 'What is the speaker\'s name and grade?', a: 'अर्जुन शर्मा, दसवीं कक्षा (Arjun Sharma, tenth grade).' },
      { q: 'Where did Arjun study before, and where does he live now?', a: 'पहले दिल्ली में, अब फ़ेयरफ़ैक्स में (earlier in Delhi, now in Fairfax).' },
      { q: 'Why did the family move?', a: 'क्योंकि पिताजी को नौकरी मिली (because Father got a job there).' },
      { q: 'How many people are in his family? Name them.', a: 'चार — पिताजी, माँ, छोटी बहन, और अर्जुन.' },
      { q: 'Which two subjects does Arjun like?', a: 'हिंदी और गणित (Hindi and Mathematics).' },
      { q: 'Identify one polite-register marker in the passage.', a: 'नमस्ते सर / आप / धन्यवाद / जी — any of these.' },
      { q: 'Which connector sets up the reason for moving?', a: 'क्योंकि (because).' },
    ],
  },
  anchorNote: {
    why:
      'This anchor is a model first-day introduction at Intermediate-Mid — polite register throughout, three time frames, four connectors, clean possessives. The student\'s OUTPUT in every writing prompt should mirror this INPUT. Read aloud three times before writing; the opening sentences should start to feel automatic.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  modelTexts: [
    {
      kind: 'email',
      title: 'नए शिक्षक को ईमेल · Email to a New Teacher',
      hindi:
        'नमस्कार श्रीमान शर्मा जी,\n\nमेरा नाम प्रिया गुप्ता है और मैं आपकी नई छात्रा हूँ। मैं ग्यारहवीं कक्षा में हूँ। कृपया मुझे बताइए कि कल क्लास कितने बजे है।\n\nधन्यवाद,\nप्रिया',
      transliteration:
        'namaskaar shreemaan sharma ji, mera naam priya gupta hai aur main aapki nayi chhaatra hoon. main gyaarahvin kakshaa mein hoon. kripaya mujhe bataaiye ki kal class kitne baje hai. dhanyavaad, priya.',
      english:
        'Respected Mr. Sharma-ji, my name is Priya Gupta and I am your new student. I am in eleventh grade. Please tell me what time class is tomorrow. Thank you, Priya.',
    },
    {
      kind: 'sms',
      title: 'दोस्त को संदेश · Message to a Classmate',
      hindi:
        'अरे नेहा! मैं रिया हूँ, तुम्हारी नई क्लासमेट। तुम कैसी हो? कल लंच साथ करेंगे क्या? 😊',
      transliteration:
        'are neha! main riya hoon, tumhaari nayi classmate. tum kaisi ho? kal lunch saath karenge kya?',
      english:
        'Hey Neha! I\'m Riya, your new classmate. How are you? Shall we have lunch together tomorrow?',
    },
    {
      kind: 'diary',
      title: 'डायरी पृष्ठ · Diary Page',
      hindi:
        'आज स्कूल का पहला दिन था। मैंने कई नए दोस्तों से "नमस्ते" कहा। पहले मैं बहुत डर रहा था, लेकिन फिर सब बहुत अच्छे निकले। मेरी हिंदी टीचर ने कहा, "आपका स्वागत है।" मुझे बहुत खुशी हुई।',
      transliteration:
        'aaj school ka pahla din tha. maine kayi naye doston se "namaste" kaha. pahle main bahut dar raha tha, lekin phir sab bahut achchhe nikle. meri hindi teacher ne kaha, "aapka svaagat hai." mujhe bahut khushi hui.',
      english:
        'Today was my first day at school. I said "namaste" to many new friends. At first I was very scared, but then everyone turned out to be very nice. My Hindi teacher said, "You are welcome." I felt very happy.',
    },
    {
      kind: 'letter',
      title: 'पेन-फ्रेंड को पत्र · Letter to a Pen Friend',
      hindi:
        'प्रिय मित्र,\n\nनमस्ते! मेरा नाम कबीर है। मैं चौदह साल का हूँ और फ़ेयरफ़ैक्स में रहता हूँ। मेरे परिवार में तीन लोग हैं। मुझे हिंदी और क्रिकेट पसंद हैं। आपके बारे में भी बताइए।\n\nआपका दोस्त, कबीर।',
      transliteration:
        'priya mitra, namaste! mera naam kabeer hai. main chaudah saal ka hoon aur fairfax mein rahta hoon. mere parivaar mein teen log hain. mujhe hindi aur cricket pasand hain. aapke baare mein bhi bataaiye. aapka dost, kabeer.',
      english:
        'Dear friend, Namaste! My name is Kabir. I am fourteen years old and live in Fairfax. There are three people in my family. I like Hindi and cricket. Please tell me about you too. Your friend, Kabir.',
    },
  ],
  modelTextsNote: {
    why:
      'An email, an SMS, a diary page, and a pen-friend letter — four registers of self-introduction. Each shows the same core facts (name, age, school/city, family) wrapped in a different level of politeness. Students learn here that the FACTS stay constant; only the REGISTER changes.',
    trains: ['TextType', 'LanguageControl'],
  },

  cultural: [
    {
      title: 'Namaste with Folded Hands',
      body:
        'The traditional greeting is palms pressed together at chest height with a slight bow — "नमस्ते". Handshakes are common in offices and with Western-educated adults, but namaste is the safe, respectful default with elders, teachers, and strangers. Mentioning "हाथ जोड़कर नमस्ते किया" in an essay is an easy cultural-detail point.',
      emoji: '🙏',
    },
    {
      title: 'The जी Suffix',
      body:
        'Adding जी after a name or title (शर्मा जी, सर जी, माँ जी) adds respect. Using it in an essay — "मेरे शिक्षक शर्मा जी हैं" — signals that the student understands Hindi politeness layers. Missing it with elders reads as rude.',
      emoji: '🎎',
    },
    {
      title: 'Time-of-Day Greetings',
      body:
        'शुभ प्रभात (good morning) and शुभ रात्रि (good night) are formal/Sanskritic; नमस्ते works at any time of day. Urdu-Hindi speakers often use आदाब. Switching the greeting to match the time of day is a cheap way to add specificity to a narrative.',
      emoji: '🌅',
    },
    {
      title: 'आप Is the Default for Strangers',
      body:
        'Unlike English "you", Hindi forces a respect choice every time you address someone. First-meeting, always use आप. Shifting to तुम happens only after the other person signals it is okay — usually with a smile and "तुम कहकर बात करो (just call me tum)". Never use तू with someone you have just met.',
      emoji: '🎩',
    },
    {
      title: 'मिलकर खुशी हुई',
      body:
        '"आपसे मिलकर खुशी हुई" ("pleased to have met you") is the universal polite closing at the end of an introduction. It translates across regions and generations. Memorize this exact phrase — it closes introductions the way "nice to meet you" does in English, and raters recognize it immediately.',
      emoji: '😊',
    },
  ],
  culturalNote: {
    why:
      'FCPS raters have seen thousands of "My name is X. I am Y years old." intros. One concrete cultural marker — हाथ जोड़कर नमस्ते, a जी, a correct time-of-day greeting — lifts the essay instantly from generic to authentic. That is a pure Topic-Coverage + Text-Type boost at no grammar cost.',
    trains: ['TopicCoverage', 'TextType'],
  },

  muhavare: [
    {
      phrase: 'मुलाक़ात होना',
      literal: 'a meeting to happen',
      meaning: 'To meet / to have an encounter (more literary than मिलना).',
      example: 'कल स्कूल में नए शिक्षक से मेरी मुलाक़ात हुई।',
      exampleEnglish: 'Yesterday, I had a meeting with the new teacher at school.',
    },
    {
      phrase: 'जान-पहचान होना',
      literal: 'acquaintance to be / to be known to each other',
      meaning: 'To be acquainted / to have an introduction.',
      example: 'मेरी उनसे पहले से जान-पहचान है।',
      exampleEnglish: 'I have been acquainted with them from before.',
    },
  ],
  muhavareNote: {
    why:
      'Both idioms relate directly to meeting and knowing people. Sliding one into a self-introduction essay — "मेरी उनसे अभी-अभी जान-पहचान हुई है" — reads as register mastery without risk. One idiom per essay is plenty.',
    trains: ['TextType', 'LanguageControl'],
  },

  modelEssays: [
    {
      prompt:
        'अपने आप का परिचय तीन अनुच्छेदों में दीजिए। अपना नाम, परिवार, और रुचियाँ बताइए। (In three paragraphs, introduce yourself. Tell us your name, family, and interests.)',
      novice: 'मेरा नाम अमन। मैं छात्र। अच्छा।',
      intermediateMid:
        'नमस्ते, मेरा नाम अमन वर्मा है और मैं पंद्रह साल का हूँ। मैं फ़ेयरफ़ैक्स हाई स्कूल की दसवीं कक्षा में पढ़ता हूँ। पहले मेरा परिवार भारत में रहता था, लेकिन अब हम अमेरिका में रहते हैं, क्योंकि मेरे पिताजी को यहाँ एक अच्छी नौकरी मिली।\n\nमेरे परिवार में चार लोग हैं — पिताजी, माँ, मेरी छोटी बहन, और मैं। मेरी माँ शिक्षिका हैं और मेरे पिताजी इंजीनियर हैं। हम सब साथ खाना खाते हैं और हिंदी में बात करते हैं। इसके बाद मेरी बहन और मैं होमवर्क करते हैं।\n\nमुझे हिंदी, गणित, और क्रिकेट बहुत पसंद हैं। मैं रोज़ शाम को अपने दोस्तों के साथ खेलता हूँ। अगले साल मैं भारत जाऊँगा और अपने दादा-दादी से मिलूँगा। आपसे मिलकर बहुत खुशी हुई।',
      annotations: [
        { paragraphIndex: 0, kind: 'structure', highlight: 'नमस्ते, मेरा नाम … है और मैं … हूँ', note: 'Textbook polite opener — two copulas (है / हूँ) in one sentence, both correct.' },
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पहले रहता था, लेकिन अब रहते हैं', note: 'Habitual past beside present — clean past/present contrast in one sentence.' },
        { paragraphIndex: 0, kind: 'connector', highlight: 'पहले … लेकिन … क्योंकि', note: 'Three connectors in three clauses. Text-Type 5 cohesion.' },
        { paragraphIndex: 1, kind: 'vocab', highlight: 'शिक्षिका / इंजीनियर', note: 'Feminine शिक्षिका matches माँ — gender agreement across professions, a Language Control win.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'इसके बाद', note: 'Sequencer organizes the family routine — not just listing, but ordering.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'अगले साल मैं भारत जाऊँगा', note: 'Future tense arrives in the closing — three time frames (past, present, future) sealed.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'आपसे मिलकर बहुत खुशी हुई', note: 'Stock polite closing — recognized instantly by raters.' },
      ],
      wordCount: 121,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'लेकिन', 'क्योंकि', 'इसके बाद'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Three cohesive paragraphs with clear topic per paragraph (self → family → interests & future). Sentences cannot be rearranged — the Text-Type 5 litmus test.',
          'All three time frames present: रहता था (past habitual), रहते हैं / खेलता हूँ (present), जाऊँगा (future). Satisfies "some control of major time frames" for IM.',
          'Four different connectors (पहले, लेकिन, क्योंकि, इसके बाद) — above the 3-connector threshold raters reward.',
          'Possessive agreement clean throughout: मेरा नाम (m), मेरी बहन (f), मेरे पिताजी (m plural) — no gender slips.',
          'Polite register sustained from नमस्ते through आपसे मिलकर खुशी हुई — signals Language Control at Average or above.',
        ],
        gotchas: [
          'If the student writes "मेरा माँ" or "मेरी नाम" anywhere, Language Control drops to Low immediately.',
          'Dropping the copula ("मेरा नाम अमन वर्मा।") turns even a good sentence into Novice-Mid output.',
          'Mixing तुम into a formal self-introduction caps Text-Type at Intermediate-Low regardless of the rest.',
        ],
      },
    },
    {
      prompt:
        'अपने स्कूल के एक नए दोस्त से मुलाक़ात का वर्णन तीन अनुच्छेदों में कीजिए। कब और कहाँ मिले, क्या बात की, और आगे क्या करेंगे — यह बताइए। (In three paragraphs, describe meeting a new friend at school. Tell when and where you met, what you talked about, and what you will do next.)',
      novice: 'मेरा दोस्त अच्छा। हम मिले। अच्छा लगा।',
      intermediateMid:
        'पिछले सोमवार को सुबह स्कूल में मेरी एक नए छात्र से मुलाक़ात हुई। वह मेरी ही कक्षा में है। पहले मैंने उसे देखा और कहा, "नमस्ते, मेरा नाम ईशा है। आपका नाम क्या है?" उसने मुस्कुराकर जवाब दिया, "नमस्ते, मैं आर्यन हूँ।"\n\nइसके बाद हम दोनों ने बहुत बातें कीं। आर्यन पहले न्यू यॉर्क में रहता था, लेकिन अब वह फ़ेयरफ़ैक्स में रहता है, क्योंकि उसके पिताजी का तबादला हुआ है। उसे भी हिंदी और क्रिकेट पसंद हैं। जब मैंने यह सुना, तो मुझे बहुत खुशी हुई।\n\nअंत में हमने एक-दूसरे का नंबर लिया और कहा, "फिर मिलेंगे।" कल हम लंच साथ खाएँगे और हिंदी के होमवर्क पर बात करेंगे। मुझे लगता है कि आर्यन मेरा अच्छा दोस्त बनेगा।',
      annotations: [
        { paragraphIndex: 0, kind: 'tense-shift', highlight: 'पिछले सोमवार को … मुलाक़ात हुई', note: 'Opens with a specific past marker — raters love this anchor.' },
        { paragraphIndex: 0, kind: 'idiom', highlight: 'मुलाक़ात हुई', note: 'Muhavara from this pack used in context — one per essay is plenty.' },
        { paragraphIndex: 0, kind: 'structure', highlight: 'Direct quotation "नमस्ते, मेरा नाम ईशा है।"', note: 'Embedded quoted speech — an Intermediate-Mid complexity marker.' },
        { paragraphIndex: 1, kind: 'tense-shift', highlight: 'पहले रहता था, लेकिन अब रहता है', note: 'Past-habitual / present contrast — same structure as Essay 1, transferable.' },
        { paragraphIndex: 1, kind: 'connector', highlight: 'इसके बाद … क्योंकि … जब … तो', note: 'Four connectors in two sentences — dense cohesion, Text-Type 5.' },
        { paragraphIndex: 2, kind: 'tense-shift', highlight: 'कल हम लंच साथ खाएँगे … बनेगा', note: 'Future tense closes the essay — third time frame sealed.' },
        { paragraphIndex: 2, kind: 'cultural', highlight: 'फिर मिलेंगे', note: 'Stock farewell — polite register held from "नमस्ते" all the way to the close.' },
      ],
      wordCount: 119,
      tenseUsed: ['past', 'present', 'future'],
      connectorsUsed: ['पहले', 'इसके बाद', 'लेकिन', 'क्योंकि'],
      verdict: {
        predictedBenchmark: 5,
        predictedCredit: 'IntermediateMid_3cr',
        whyItPasses: [
          'Narrative opens in the past (मुलाक़ात हुई), develops in present (पसंद हैं, रहता है), closes in future (खाएँगे, बनेगा) — three time frames inside 128 words.',
          'Direct quoted dialogue ("नमस्ते, मेरा नाम ईशा है।") is an explicit Intermediate-Mid complexity marker — shows the student can embed speech.',
          'Four connectors, each doing different work (sequence, cause, contrast, time-when). That variety is what separates 4 from 5.',
          'Register choice is consistent: आप / आपका in first meeting, softened to हम / एक-दूसरे once the characters become friends. Rater reads this as nuanced control.',
          'Muhavara मुलाक़ात हुई placed inside narrative, not tacked on — exactly how Intermediate-Mid students use idioms.',
        ],
        gotchas: [
          'If the student mixes "तुम्हारा नाम" with "नमस्ते" on first meeting, register drops to Low.',
          'Losing gender agreement on possessives inside the dialogue (e.g. "मेरी नाम") undoes the credit earned by the rest.',
          'A one-paragraph version of this story, however pretty, would score Benchmark 4 (Intermediate-Low, 2 credits) — paragraph break is the IM/IL line.',
        ],
      },
    },
  ],
  modelEssaysNote: {
    why:
      'Two fully-worked Intermediate-Mid introduction essays. Essay 1 is the "present yourself" shape — the universal opener. Essay 2 is the "narrate a first meeting" shape — the same vocabulary wrapped in past narrative. Memorize the sentence shapes; the verdict cards show exactly which rubric boxes each sentence ticks.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  prompts: [
    {
      hindi:
        'एक नए शिक्षक को अपने बारे में तीन अनुच्छेदों में बताइए। अपना नाम, उम्र, परिवार, और रुचियाँ शामिल कीजिए।',
      english:
        'Introduce yourself to a new teacher in three paragraphs. Include your name, age, family, and interests.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'इसके बाद'],
        vocab: ['नमस्ते', 'नाम', 'उम्र', 'कक्षा', 'परिवार', 'पसंद'],
        tenses: ['present', 'past'],
      },
    },
    {
      hindi:
        'अपने स्कूल के पहले दिन का वर्णन तीन अनुच्छेदों में कीजिए। आप किससे मिले, क्या बात की, और क्या महसूस किया — यह बताइए।',
      english:
        'Describe your first day at school in three paragraphs. Tell whom you met, what you talked about, and how you felt.',
      hint: {
        connectors: ['पहले', 'लेकिन', 'इसके बाद', 'अंत में'],
        vocab: ['नमस्ते', 'दोस्त', 'शिक्षक', 'स्कूल', 'मिलना', 'खुशी'],
        tenses: ['past', 'present'],
      },
    },
    {
      hindi:
        'अपने सबसे अच्छे दोस्त से पहली मुलाक़ात के बारे में तीन अनुच्छेदों में लिखिए। कहाँ मिले, क्या-क्या बात की, और आगे क्या करेंगे।',
      english:
        'Write three paragraphs about your first meeting with your best friend. Where did you meet, what did you talk about, and what will you do next.',
      hint: {
        connectors: ['पहले', 'फिर', 'क्योंकि', 'लेकिन'],
        vocab: ['मुलाक़ात', 'दोस्त', 'नाम', 'पसंद', 'फिर मिलेंगे'],
        tenses: ['past', 'present', 'future'],
      },
    },
  ],
  promptsNote: {
    why:
      'Three FCPS-shaped prompts spanning the introduction arc: introducing yourself (static), narrating a first day (past), and meeting a friend (past→future). Each is scoped for three cohesive paragraphs and forces at least two time frames. The hint strip is a target list, not an answer key.',
    trains: ['TextType'],
  },

  rubricNote: {
    why:
      'Use this rubric to self-grade every introduction you write. Check: (1) Did I use three connectors? (2) Did I shift tense at least once? (3) Are all my possessives गender-agreed? (4) Did I stay in आप register throughout? If three or fewer of these are clean, add them before moving to the next pack.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
  },

  status: 'shipped',
  version: 1,
};
