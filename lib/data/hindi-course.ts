import type { Language, Course, Level, Topic, Week, Lesson, VocabularyItem, Exercise, Capstone, MockExam } from '../types'

export const hindiLanguage: Language = {
  id: 'hindi',
  name: 'Hindi',
  nativeName: 'हिन्दी',
  code: 'hi',
  script: 'Devanagari',
  flag: 'IN'
}

// Vocabulary data
const greetingsVocabulary: VocabularyItem[] = [
  {
    id: 'v1',
    word: 'नमस्ते',
    transliteration: 'namaste',
    translation: 'Hello / Greetings',
    partOfSpeech: 'interjection',
    example: 'नमस्ते, आप कैसे हैं?',
    exampleTranslation: 'Hello, how are you?'
  },
  {
    id: 'v2',
    word: 'धन्यवाद',
    transliteration: 'dhanyavaad',
    translation: 'Thank you',
    partOfSpeech: 'interjection',
    example: 'आपकी मदद के लिए धन्यवाद।',
    exampleTranslation: 'Thank you for your help.'
  },
  {
    id: 'v3',
    word: 'कृपया',
    transliteration: 'kripaya',
    translation: 'Please',
    partOfSpeech: 'adverb',
    example: 'कृपया बैठिए।',
    exampleTranslation: 'Please sit down.'
  },
  {
    id: 'v4',
    word: 'हाँ',
    transliteration: 'haan',
    translation: 'Yes',
    partOfSpeech: 'interjection',
  },
  {
    id: 'v5',
    word: 'नहीं',
    transliteration: 'nahin',
    translation: 'No',
    partOfSpeech: 'interjection',
  },
  {
    id: 'v6',
    word: 'माफ़ कीजिए',
    transliteration: 'maaf kijiye',
    translation: 'Excuse me / Sorry',
    partOfSpeech: 'phrase',
  },
  {
    id: 'v7',
    word: 'अलविदा',
    transliteration: 'alvida',
    translation: 'Goodbye',
    partOfSpeech: 'interjection',
  },
  {
    id: 'v8',
    word: 'शुभ प्रभात',
    transliteration: 'shubh prabhaat',
    translation: 'Good morning',
    partOfSpeech: 'phrase',
  }
]

const familyVocabulary: VocabularyItem[] = [
  {
    id: 'v9',
    word: 'माँ',
    transliteration: 'maan',
    translation: 'Mother',
    partOfSpeech: 'noun',
    example: 'मेरी माँ बहुत अच्छी हैं।',
    exampleTranslation: 'My mother is very good.'
  },
  {
    id: 'v10',
    word: 'पिताजी',
    transliteration: 'pitaji',
    translation: 'Father',
    partOfSpeech: 'noun',
  },
  {
    id: 'v11',
    word: 'भाई',
    transliteration: 'bhai',
    translation: 'Brother',
    partOfSpeech: 'noun',
  },
  {
    id: 'v12',
    word: 'बहन',
    transliteration: 'bahan',
    translation: 'Sister',
    partOfSpeech: 'noun',
  },
  {
    id: 'v13',
    word: 'दादा',
    transliteration: 'dada',
    translation: 'Grandfather (paternal)',
    partOfSpeech: 'noun',
  },
  {
    id: 'v14',
    word: 'दादी',
    transliteration: 'dadi',
    translation: 'Grandmother (paternal)',
    partOfSpeech: 'noun',
  },
  {
    id: 'v15',
    word: 'परिवार',
    transliteration: 'parivaar',
    translation: 'Family',
    partOfSpeech: 'noun',
  }
]

const numbersVocabulary: VocabularyItem[] = [
  { id: 'n1', word: 'एक', transliteration: 'ek', translation: 'One', partOfSpeech: 'number' },
  { id: 'n2', word: 'दो', transliteration: 'do', translation: 'Two', partOfSpeech: 'number' },
  { id: 'n3', word: 'तीन', transliteration: 'teen', translation: 'Three', partOfSpeech: 'number' },
  { id: 'n4', word: 'चार', transliteration: 'char', translation: 'Four', partOfSpeech: 'number' },
  { id: 'n5', word: 'पाँच', transliteration: 'paanch', translation: 'Five', partOfSpeech: 'number' },
  { id: 'n6', word: 'छह', transliteration: 'chhah', translation: 'Six', partOfSpeech: 'number' },
  { id: 'n7', word: 'सात', transliteration: 'saat', translation: 'Seven', partOfSpeech: 'number' },
  { id: 'n8', word: 'आठ', transliteration: 'aath', translation: 'Eight', partOfSpeech: 'number' },
  { id: 'n9', word: 'नौ', transliteration: 'nau', translation: 'Nine', partOfSpeech: 'number' },
  { id: 'n10', word: 'दस', transliteration: 'das', translation: 'Ten', partOfSpeech: 'number' },
]

const schoolVocabulary: VocabularyItem[] = [
  { id: 's1', word: 'स्कूल', transliteration: 'school', translation: 'School', partOfSpeech: 'noun' },
  { id: 's2', word: 'कक्षा', transliteration: 'kaksha', translation: 'Class', partOfSpeech: 'noun' },
  { id: 's3', word: 'किताब', transliteration: 'kitaab', translation: 'Book', partOfSpeech: 'noun' },
  { id: 's4', word: 'कलम', transliteration: 'kalam', translation: 'Pen', partOfSpeech: 'noun' },
  { id: 's5', word: 'अध्यापक', transliteration: 'adhyapak', translation: 'Teacher (male)', partOfSpeech: 'noun' },
  { id: 's6', word: 'अध्यापिका', transliteration: 'adhyapika', translation: 'Teacher (female)', partOfSpeech: 'noun' },
  { id: 's7', word: 'छात्र', transliteration: 'chhaatra', translation: 'Student (male)', partOfSpeech: 'noun' },
  { id: 's8', word: 'छात्रा', transliteration: 'chhaatra', translation: 'Student (female)', partOfSpeech: 'noun' },
]

// Exercise templates
const greetingsExercises: Exercise[] = [
  {
    id: 'e1',
    lessonId: 'l1',
    type: 'multiple-choice',
    question: 'What does "नमस्ते" mean?',
    options: ['Goodbye', 'Thank you', 'Hello', 'Please'],
    correctAnswer: 'Hello',
    points: 10
  },
  {
    id: 'e2',
    lessonId: 'l1',
    type: 'matching',
    question: 'Match the Hindi words with their English meanings',
    instructions: 'Drag each Hindi word to its correct English translation',
    correctAnswer: ['नमस्ते-Hello', 'धन्यवाद-Thank you', 'कृपया-Please', 'अलविदा-Goodbye'],
    points: 20
  },
  {
    id: 'e3',
    lessonId: 'l1',
    type: 'fill-in-blank',
    question: 'Complete the transliteration: नमस्ते = _____',
    correctAnswer: 'namaste',
    hint: 'Think about how this common greeting sounds',
    points: 10
  },
  {
    id: 'e4',
    lessonId: 'l1',
    type: 'listening-comprehension',
    question: 'Listen to the audio and select what you hear',
    options: ['शुभ प्रभात', 'नमस्ते', 'धन्यवाद', 'अलविदा'],
    correctAnswer: 'नमस्ते',
    points: 15
  },
  {
    id: 'e5',
    lessonId: 'l1',
    type: 'translation',
    question: 'Translate to Hindi: "Thank you for your help"',
    correctAnswer: 'आपकी मदद के लिए धन्यवाद',
    hint: 'Use धन्यवाद for thank you',
    points: 20
  }
]

const familyExercises: Exercise[] = [
  {
    id: 'e6',
    lessonId: 'l2',
    type: 'multiple-choice',
    question: 'What is the Hindi word for "mother"?',
    options: ['बहन', 'माँ', 'दादी', 'भाई'],
    correctAnswer: 'माँ',
    points: 10
  },
  {
    id: 'e7',
    lessonId: 'l2',
    type: 'fill-in-blank',
    question: 'मेरे _____ बहुत अच्छे हैं। (My brother is very good)',
    correctAnswer: 'भाई',
    points: 10
  },
  {
    id: 'e8',
    lessonId: 'l2',
    type: 'matching',
    question: 'Match the family members',
    correctAnswer: ['माँ-Mother', 'पिताजी-Father', 'भाई-Brother', 'बहन-Sister'],
    points: 20
  }
]

// Lessons
const week1Lessons: Lesson[] = [
  {
    id: 'l1',
    weekId: 'w1',
    title: 'Basic Greetings',
    type: 'vocabulary',
    description: 'Learn essential Hindi greetings and polite expressions',
    duration: 30,
    order: 1,
    content: {
      introduction: 'Welcome to Hindi! In this lesson, you will learn the most important greetings and polite expressions used in everyday Hindi conversation. These phrases will help you make a great first impression when speaking Hindi.',
      culturalNote: 'In Indian culture, "Namaste" is more than just a greeting - it is a gesture of respect. It is often accompanied by pressing your palms together in front of your chest and slightly bowing your head. This gesture shows respect for the person you are greeting.',
      vocabulary: greetingsVocabulary
    },
    exercises: greetingsExercises
  },
  {
    id: 'l2',
    weekId: 'w1',
    title: 'Family Members',
    type: 'vocabulary',
    description: 'Learn Hindi words for family members and relationships',
    duration: 25,
    order: 2,
    content: {
      introduction: 'Family is central to Indian culture. In this lesson, you will learn the Hindi words for various family members. Note that Hindi has specific words for maternal and paternal relatives!',
      culturalNote: 'Indian families often live together in joint families, with grandparents, parents, and children all under one roof. Respect for elders is very important, which is reflected in the language through honorific forms.',
      vocabulary: familyVocabulary
    },
    exercises: familyExercises
  },
  {
    id: 'l3',
    weekId: 'w1',
    title: 'Simple Sentence Structure',
    type: 'grammar',
    description: 'Learn the basics of Hindi sentence structure',
    duration: 35,
    order: 3,
    content: {
      introduction: 'Hindi follows a Subject-Object-Verb (SOV) word order, which is different from English. In this lesson, you will learn how to construct simple sentences in Hindi.',
      grammarRules: [
        {
          id: 'g1',
          title: 'Basic Word Order (SOV)',
          explanation: 'Unlike English which uses Subject-Verb-Object (SVO), Hindi uses Subject-Object-Verb (SOV) order. The verb always comes at the end of the sentence.',
          examples: [
            { hindi: 'मैं पानी पीता हूँ।', transliteration: 'Main paani peeta hoon.', english: 'I drink water.' },
            { hindi: 'वह किताब पढ़ता है।', transliteration: 'Vah kitaab padhta hai.', english: 'He reads a book.' }
          ]
        },
        {
          id: 'g2',
          title: 'The verb "to be" (होना)',
          explanation: 'The verb होना (hona - to be) is essential in Hindi. Its present tense forms depend on the subject.',
          examples: [
            { hindi: 'मैं छात्र हूँ।', transliteration: 'Main chhaatra hoon.', english: 'I am a student.' },
            { hindi: 'वह अध्यापक है।', transliteration: 'Vah adhyapak hai.', english: 'He is a teacher.' }
          ]
        }
      ]
    },
    exercises: [
      {
        id: 'e9',
        lessonId: 'l3',
        type: 'multiple-choice',
        question: 'What is the correct word order in Hindi?',
        options: ['Subject-Verb-Object', 'Object-Subject-Verb', 'Subject-Object-Verb', 'Verb-Subject-Object'],
        correctAnswer: 'Subject-Object-Verb',
        points: 10
      },
      {
        id: 'e10',
        lessonId: 'l3',
        type: 'fill-in-blank',
        question: 'मैं छात्र _____। (I am a student)',
        correctAnswer: 'हूँ',
        points: 10
      }
    ]
  },
  {
    id: 'l4',
    weekId: 'w1',
    title: 'Listening: Greetings in Context',
    type: 'listening',
    description: 'Practice understanding greetings in real conversations',
    duration: 20,
    order: 4,
    content: {
      introduction: 'Now that you know basic greetings, let us practice understanding them in real conversations.',
      dialogues: [
        {
          id: 'd1',
          title: 'Meeting a Friend',
          context: 'Two friends meet in the morning',
          lines: [
            { speaker: 'राज', text: 'शुभ प्रभात, अमित!', transliteration: 'Shubh prabhaat, Amit!', translation: 'Good morning, Amit!' },
            { speaker: 'अमित', text: 'शुभ प्रभात, राज! आप कैसे हैं?', transliteration: 'Shubh prabhaat, Raj! Aap kaise hain?', translation: 'Good morning, Raj! How are you?' },
            { speaker: 'राज', text: 'मैं ठीक हूँ, धन्यवाद।', transliteration: 'Main theek hoon, dhanyavaad.', translation: 'I am fine, thank you.' }
          ]
        }
      ]
    },
    exercises: [
      {
        id: 'e11',
        lessonId: 'l4',
        type: 'listening-comprehension',
        question: 'What greeting does Raj use?',
        options: ['नमस्ते', 'शुभ प्रभात', 'अलविदा', 'धन्यवाद'],
        correctAnswer: 'शुभ प्रभात',
        points: 15
      }
    ]
  },
  {
    id: 'l5',
    weekId: 'w1',
    title: 'Speaking Practice: Introductions',
    type: 'speaking',
    description: 'Practice introducing yourself in Hindi',
    duration: 25,
    order: 5,
    content: {
      introduction: 'In this lesson, you will practice speaking by recording yourself introducing in Hindi. Listen to the model pronunciation and try to match it.',
      dialogues: [
        {
          id: 'd2',
          title: 'Self Introduction',
          context: 'Practice introducing yourself',
          lines: [
            { speaker: 'Model', text: 'नमस्ते! मेरा नाम राज है।', transliteration: 'Namaste! Mera naam Raj hai.', translation: 'Hello! My name is Raj.' },
            { speaker: 'Model', text: 'मैं छात्र हूँ।', transliteration: 'Main chhaatra hoon.', translation: 'I am a student.' },
            { speaker: 'Model', text: 'आपसे मिलकर खुशी हुई।', transliteration: 'Aapse milkar khushi hui.', translation: 'Nice to meet you.' }
          ]
        }
      ]
    },
    exercises: [
      {
        id: 'e12',
        lessonId: 'l5',
        type: 'speaking',
        question: 'Record yourself saying: "नमस्ते! मेरा नाम ___ है।" (Fill in your name)',
        correctAnswer: 'recorded',
        instructions: 'Click the microphone button to record yourself. Try to match the model pronunciation.',
        points: 20
      }
    ]
  }
]

const week2Lessons: Lesson[] = [
  {
    id: 'l6',
    weekId: 'w2',
    title: 'Numbers 1-10',
    type: 'vocabulary',
    description: 'Learn to count from one to ten in Hindi',
    duration: 25,
    order: 1,
    content: {
      introduction: 'Numbers are essential for everyday communication. In this lesson, you will learn Hindi numbers from 1 to 10.',
      vocabulary: numbersVocabulary
    },
    exercises: [
      {
        id: 'e13',
        lessonId: 'l6',
        type: 'matching',
        question: 'Match the numbers',
        correctAnswer: ['एक-1', 'दो-2', 'तीन-3', 'चार-4', 'पाँच-5'],
        points: 20
      }
    ]
  },
  {
    id: 'l7',
    weekId: 'w2',
    title: 'School Vocabulary',
    type: 'vocabulary',
    description: 'Learn words related to school and education',
    duration: 30,
    order: 2,
    content: {
      introduction: 'Since you are a student, knowing school-related vocabulary is very useful!',
      vocabulary: schoolVocabulary
    },
    exercises: [
      {
        id: 'e14',
        lessonId: 'l7',
        type: 'multiple-choice',
        question: 'What is "book" in Hindi?',
        options: ['कलम', 'किताब', 'कक्षा', 'स्कूल'],
        correctAnswer: 'किताब',
        points: 10
      }
    ]
  }
]

// Week 1 Capstone
const week1Capstone: Capstone = {
  id: 'c1',
  weekId: 'w1',
  title: 'Self-Introduction Video',
  description: 'Create a short video introducing yourself and your family in Hindi',
  type: 'oral',
  requirements: [
    'Greet the viewer using an appropriate Hindi greeting',
    'Introduce yourself (name, grade level)',
    'Mention at least 3 family members using Hindi vocabulary',
    'Use correct pronunciation and sentence structure',
    'End with an appropriate farewell',
    'Video should be 1-2 minutes long'
  ],
  rubric: [
    { criteria: 'Pronunciation', description: 'Clear and accurate pronunciation of Hindi words', points: 25 },
    { criteria: 'Vocabulary Usage', description: 'Uses at least 10 vocabulary words from the lessons', points: 25 },
    { criteria: 'Grammar', description: 'Correct sentence structure and word order', points: 25 },
    { criteria: 'Cultural Awareness', description: 'Appropriate use of formal/informal forms and gestures', points: 15 },
    { criteria: 'Presentation', description: 'Clear audio, good pace, confident delivery', points: 10 }
  ]
}

// Weeks
const level1Weeks: Week[] = [
  {
    id: 'w1',
    topicId: 't1',
    number: 1,
    title: 'Greetings and Family',
    lessons: week1Lessons,
    capstone: week1Capstone
  },
  {
    id: 'w2',
    topicId: 't1',
    number: 2,
    title: 'Numbers and School',
    lessons: week2Lessons
  }
]

// Topics
const level1Topics: Topic[] = [
  {
    id: 't1',
    levelId: 'lv1',
    name: 'Personal and Family Life',
    description: 'Learn to talk about yourself, your family, and everyday interactions',
    weeks: level1Weeks
  }
]

// Levels
const hindiLevels: Level[] = [
  {
    id: 'lv1',
    courseId: 'hindi-course',
    name: 'Foundation',
    fluencyLevel: 'novice-low',
    stampLevel: 1,
    description: 'Build your Hindi foundation with basic vocabulary, greetings, and simple sentences',
    topics: level1Topics,
    totalWeeks: 8
  },
  {
    id: 'lv2',
    courseId: 'hindi-course',
    name: 'Building Blocks',
    fluencyLevel: 'novice-mid',
    stampLevel: 2,
    description: 'Expand your vocabulary and learn to form phrases and short sentences',
    topics: [],
    totalWeeks: 10
  },
  {
    id: 'lv3',
    courseId: 'hindi-course',
    name: 'Simple Sentences',
    fluencyLevel: 'novice-high',
    stampLevel: 3,
    description: 'Master simple sentence construction and everyday conversations',
    topics: [],
    totalWeeks: 12
  },
  {
    id: 'lv4',
    courseId: 'hindi-course',
    name: 'Connected Speech',
    fluencyLevel: 'intermediate-low',
    stampLevel: 4,
    description: 'Learn to connect sentences and express more complex ideas',
    topics: [],
    totalWeeks: 14
  },
  {
    id: 'lv5',
    courseId: 'hindi-course',
    name: 'Fluent Expression',
    fluencyLevel: 'intermediate-mid',
    stampLevel: 5,
    description: 'Achieve confident communication with connected, detailed expression',
    topics: [],
    totalWeeks: 16
  }
]

// Main course
export const hindiCourse: Course = {
  id: 'hindi-course',
  languageId: 'hindi',
  title: 'Hindi for World Language Credit',
  description: 'A comprehensive Hindi course designed for middle school students seeking world language credit. Progress from basic vocabulary to confident communication.',
  levels: hindiLevels
}

// Mock Exams
export const hindiMockExams: MockExam[] = [
  {
    id: 'exam1',
    levelId: 'lv1',
    title: 'Level 1 Proficiency Exam',
    description: 'Test your Novice-Low proficiency in Hindi',
    duration: 45,
    totalPoints: 100,
    passingScore: 70,
    sections: [
      {
        id: 'sec1',
        name: 'Reading',
        type: 'reading',
        instructions: 'Read the following passages and answer the questions',
        points: 25,
        questions: [
          {
            id: 'q1',
            sectionId: 'sec1',
            type: 'multiple-choice',
            question: 'What does this sign say? "स्कूल"',
            options: ['Hospital', 'School', 'Library', 'Market'],
            correctAnswer: 'School',
            points: 5
          },
          {
            id: 'q2',
            sectionId: 'sec1',
            type: 'multiple-choice',
            question: 'Read: "मेरा नाम राज है।" What is this person\'s name?',
            options: ['Amit', 'Raj', 'Ram', 'Rohan'],
            correctAnswer: 'Raj',
            points: 5
          }
        ]
      },
      {
        id: 'sec2',
        name: 'Listening',
        type: 'listening',
        instructions: 'Listen to the audio clips and answer the questions',
        points: 25,
        questions: [
          {
            id: 'q3',
            sectionId: 'sec2',
            type: 'listening-comprehension',
            question: 'What greeting do you hear?',
            options: ['Good morning', 'Hello', 'Goodbye', 'Thank you'],
            correctAnswer: 'Hello',
            points: 5
          }
        ]
      },
      {
        id: 'sec3',
        name: 'Writing',
        type: 'writing',
        instructions: 'Write short responses in Hindi',
        points: 25,
        questions: [
          {
            id: 'q4',
            sectionId: 'sec3',
            type: 'writing',
            question: 'Write "Hello, my name is ___" in Hindi using your name',
            correctAnswer: 'नमस्ते, मेरा नाम ___ है',
            points: 10
          }
        ]
      },
      {
        id: 'sec4',
        name: 'Speaking',
        type: 'speaking',
        instructions: 'Record yourself speaking in Hindi',
        points: 25,
        questions: [
          {
            id: 'q5',
            sectionId: 'sec4',
            type: 'speaking',
            question: 'Introduce yourself in Hindi (name, student status)',
            correctAnswer: 'recorded',
            points: 15
          }
        ]
      }
    ]
  }
]

// Available languages (expandable)
export const availableLanguages: Language[] = [
  hindiLanguage,
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    code: 'ta',
    script: 'Tamil',
    flag: 'IN'
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
    script: 'Telugu',
    flag: 'IN'
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn',
    script: 'Kannada',
    flag: 'IN'
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    code: 'sa',
    script: 'Devanagari',
    flag: 'IN'
  }
]
