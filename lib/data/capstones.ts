import type { CapstoneProject, MockExam, ProficiencyLevel } from "@/lib/types"

export const hindiCapstones: CapstoneProject[] = [
  {
    id: "capstone-novice-low",
    title: "My Family Introduction",
    description: "Create a visual family tree and introduce each family member in Hindi using basic phrases and vocabulary.",
    level: "novice-low",
    languageCode: "hi",
    estimatedTime: "2-3 hours",
    requirements: [
      "Draw or create a family tree with at least 5 family members",
      "Write the Hindi name for each relationship (माँ, पिताजी, भाई, बहन, etc.)",
      "Write 2-3 sentences about each person using simple present tense",
      "Include transliteration for all Hindi text",
      "Record yourself introducing one family member (optional)"
    ],
    rubric: [
      { criterion: "Vocabulary Accuracy", maxPoints: 25, description: "Correct use of family relationship terms" },
      { criterion: "Sentence Structure", maxPoints: 25, description: "Basic Subject-Verb agreement and word order" },
      { criterion: "Devanagari Script", maxPoints: 20, description: "Accurate writing of Hindi script" },
      { criterion: "Presentation", maxPoints: 15, description: "Clear organization and visual appeal" },
      { criterion: "Completeness", maxPoints: 15, description: "All requirements met" }
    ],
    resources: [
      { title: "Family Vocabulary List", url: "/resources/family-vocab" },
      { title: "Simple Sentence Patterns", url: "/resources/sentence-patterns" }
    ]
  },
  {
    id: "capstone-novice-mid",
    title: "A Day in My Life",
    description: "Create a visual timeline or comic strip showing your daily routine with Hindi descriptions.",
    level: "novice-mid",
    languageCode: "hi",
    estimatedTime: "3-4 hours",
    requirements: [
      "Illustrate at least 8 activities in your daily routine",
      "Write Hindi descriptions for each activity with time expressions",
      "Use present tense verbs correctly",
      "Include questions about daily activities",
      "Add a short paragraph summarizing your favorite part of the day"
    ],
    rubric: [
      { criterion: "Time Expressions", maxPoints: 20, description: "Correct use of time vocabulary" },
      { criterion: "Verb Conjugation", maxPoints: 25, description: "Accurate present tense verb forms" },
      { criterion: "Vocabulary Range", maxPoints: 20, description: "Variety of activity vocabulary" },
      { criterion: "Script & Spelling", maxPoints: 20, description: "Accurate Devanagari writing" },
      { criterion: "Creativity", maxPoints: 15, description: "Original presentation and effort" }
    ],
    resources: [
      { title: "Daily Routine Vocabulary", url: "/resources/daily-routine" },
      { title: "Time Expressions in Hindi", url: "/resources/time-expressions" }
    ]
  },
  {
    id: "capstone-novice-high",
    title: "My Neighborhood Guide",
    description: "Create a map and guide to your neighborhood or an imaginary Indian neighborhood with descriptions of places and directions.",
    level: "novice-high",
    languageCode: "hi",
    estimatedTime: "4-5 hours",
    requirements: [
      "Draw a map with at least 10 locations",
      "Label all places in Hindi with articles",
      "Write descriptions of 5 places (what they are, what you can do there)",
      "Include directions between 3 pairs of locations",
      "Write a short paragraph about your favorite place"
    ],
    rubric: [
      { criterion: "Location Vocabulary", maxPoints: 20, description: "Variety and accuracy of place names" },
      { criterion: "Directions", maxPoints: 25, description: "Correct use of directional vocabulary" },
      { criterion: "Descriptive Writing", maxPoints: 25, description: "Quality of place descriptions" },
      { criterion: "Grammar Accuracy", maxPoints: 15, description: "Postpositions and sentence structure" },
      { criterion: "Map Quality", maxPoints: 15, description: "Clear, labeled, organized map" }
    ],
    resources: [
      { title: "Places in Town Vocabulary", url: "/resources/places-vocab" },
      { title: "Direction Words", url: "/resources/directions" }
    ]
  },
  {
    id: "capstone-intermediate-low",
    title: "Cultural Festival Presentation",
    description: "Research and present about an Indian festival, including its history, traditions, and how it's celebrated.",
    level: "intermediate-low",
    languageCode: "hi",
    estimatedTime: "5-6 hours",
    requirements: [
      "Choose one major Indian festival (Diwali, Holi, Eid, etc.)",
      "Write a 200-word essay in Hindi about the festival",
      "Include historical background and cultural significance",
      "Describe traditional foods, clothing, and activities",
      "Create visual aids (poster, slideshow, or video)",
      "Prepare to answer questions about your presentation"
    ],
    rubric: [
      { criterion: "Content Depth", maxPoints: 25, description: "Thorough coverage of festival aspects" },
      { criterion: "Language Complexity", maxPoints: 25, description: "Use of varied sentence structures" },
      { criterion: "Cultural Accuracy", maxPoints: 20, description: "Correct information about traditions" },
      { criterion: "Vocabulary", maxPoints: 15, description: "Appropriate use of cultural vocabulary" },
      { criterion: "Presentation", maxPoints: 15, description: "Visual aids and delivery" }
    ],
    resources: [
      { title: "Indian Festivals Overview", url: "/resources/festivals" },
      { title: "Cultural Vocabulary", url: "/resources/culture-vocab" }
    ]
  },
  {
    id: "capstone-intermediate-mid",
    title: "Short Story: A Journey",
    description: "Write an original short story in Hindi about a journey or adventure, demonstrating narrative skills and complex grammar.",
    level: "intermediate-mid",
    languageCode: "hi",
    estimatedTime: "6-8 hours",
    requirements: [
      "Write a 300-400 word original story",
      "Include dialogue between at least 2 characters",
      "Use past, present, and future tenses appropriately",
      "Include descriptive language and emotions",
      "Create an engaging plot with beginning, middle, and end",
      "Include a moral or lesson (optional)"
    ],
    rubric: [
      { criterion: "Narrative Structure", maxPoints: 20, description: "Clear plot development" },
      { criterion: "Grammar Range", maxPoints: 25, description: "Multiple tenses, complex sentences" },
      { criterion: "Vocabulary", maxPoints: 20, description: "Rich, varied word choice" },
      { criterion: "Dialogue", maxPoints: 15, description: "Natural, appropriate conversation" },
      { criterion: "Creativity", maxPoints: 20, description: "Original ideas and engaging story" }
    ],
    resources: [
      { title: "Story Writing Tips", url: "/resources/story-writing" },
      { title: "Dialogue Formatting", url: "/resources/dialogue" }
    ]
  }
]

export const hindiMockExams: MockExam[] = [
  {
    id: "mock-novice-low",
    title: "Novice Low Assessment",
    description: "Test your basic Hindi skills including alphabet recognition, basic vocabulary, and simple phrases.",
    level: "novice-low",
    languageCode: "hi",
    duration: 30,
    totalQuestions: 25,
    sections: [
      {
        id: "reading-nl",
        title: "Reading Comprehension",
        type: "reading",
        questions: [
          {
            id: "r1",
            type: "multiple-choice",
            question: "What does 'नमस्ते' mean?",
            options: ["Goodbye", "Hello/Greetings", "Thank you", "Please"],
            correctAnswer: "Hello/Greetings",
            points: 2
          },
          {
            id: "r2",
            type: "multiple-choice",
            question: "Which word means 'water' in Hindi?",
            hindiText: "पानी, खाना, दूध, चाय",
            options: ["पानी", "खाना", "दूध", "चाय"],
            correctAnswer: "पानी",
            points: 2
          },
          {
            id: "r3",
            type: "multiple-choice",
            question: "Read: 'मेरा नाम राज है।' What is the person's name?",
            options: ["Mera", "Naam", "Raj", "Hai"],
            correctAnswer: "Raj",
            points: 2
          },
          {
            id: "r4",
            type: "multiple-choice",
            question: "What does 'धन्यवाद' mean?",
            options: ["Sorry", "Please", "Thank you", "Welcome"],
            correctAnswer: "Thank you",
            points: 2
          },
          {
            id: "r5",
            type: "fill-blank",
            question: "Complete: मैं ठीक ___ (I am fine)",
            correctAnswer: "हूँ",
            points: 3
          }
        ]
      },
      {
        id: "writing-nl",
        title: "Writing",
        type: "writing",
        questions: [
          {
            id: "w1",
            type: "fill-blank",
            question: "Write the Hindi word for 'mother': ___",
            correctAnswer: "माँ",
            points: 2
          },
          {
            id: "w2",
            type: "fill-blank",
            question: "Write the Hindi word for 'father': ___",
            correctAnswer: "पिताजी",
            alternateAnswers: ["पापा", "पिता"],
            points: 2
          },
          {
            id: "w3",
            type: "fill-blank",
            question: "Write 'My name is...' in Hindi: मेरा ___ ... है।",
            correctAnswer: "नाम",
            points: 2
          }
        ]
      },
      {
        id: "listening-nl",
        title: "Listening",
        type: "listening",
        questions: [
          {
            id: "l1",
            type: "multiple-choice",
            question: "Listen to the greeting. What time of day is it?",
            audioUrl: "/audio/good-morning.mp3",
            hindiText: "सुप्रभात",
            options: ["Morning", "Afternoon", "Evening", "Night"],
            correctAnswer: "Morning",
            points: 3
          },
          {
            id: "l2",
            type: "multiple-choice",
            question: "Listen and identify: What number is being said?",
            hindiText: "पाँच",
            options: ["3", "4", "5", "6"],
            correctAnswer: "5",
            points: 2
          }
        ]
      },
      {
        id: "speaking-nl",
        title: "Speaking",
        type: "speaking",
        questions: [
          {
            id: "s1",
            type: "speaking",
            question: "Introduce yourself in Hindi (name and one fact about yourself)",
            points: 5,
            rubric: "Pronunciation, completeness, accuracy"
          }
        ]
      }
    ],
    passingScore: 60
  },
  {
    id: "mock-novice-mid",
    title: "Novice Mid Assessment",
    description: "Assess your ability to handle basic conversations, describe people and places, and understand simple texts.",
    level: "novice-mid",
    languageCode: "hi",
    duration: 40,
    totalQuestions: 30,
    sections: [
      {
        id: "reading-nm",
        title: "Reading Comprehension",
        type: "reading",
        questions: [
          {
            id: "r1",
            type: "multiple-choice",
            question: "Read the passage: 'राज एक लड़का है। वह स्कूल जाता है। उसका स्कूल बड़ा है।' Where does Raj go?",
            options: ["To the market", "To school", "To home", "To the park"],
            correctAnswer: "To school",
            points: 3
          },
          {
            id: "r2",
            type: "multiple-choice",
            question: "From the passage above, what is described as 'big'?",
            options: ["Raj", "The boy", "The school", "The home"],
            correctAnswer: "The school",
            points: 2
          },
          {
            id: "r3",
            type: "fill-blank",
            question: "Complete the sentence: मुझे भूख ___ है। (I am hungry)",
            correctAnswer: "लगी",
            points: 3
          }
        ]
      },
      {
        id: "writing-nm",
        title: "Writing",
        type: "writing",
        questions: [
          {
            id: "w1",
            type: "short-answer",
            question: "Write 3 sentences describing your family in Hindi.",
            points: 6,
            rubric: "Vocabulary, grammar, completeness"
          },
          {
            id: "w2",
            type: "fill-blank",
            question: "Translate: 'I like to eat apples.' = मुझे सेब ___ पसंद है।",
            correctAnswer: "खाना",
            points: 3
          }
        ]
      }
    ],
    passingScore: 65
  },
  {
    id: "mock-novice-high",
    title: "Novice High Assessment",
    description: "Demonstrate your ability to handle simple social situations, ask and answer questions, and write short paragraphs.",
    level: "novice-high",
    languageCode: "hi",
    duration: 50,
    totalQuestions: 35,
    sections: [
      {
        id: "reading-nh",
        title: "Reading Comprehension",
        type: "reading",
        questions: [
          {
            id: "r1",
            type: "multiple-choice",
            question: "Read: 'आज मौसम बहुत अच्छा है। धूप है और हवा ठंडी है। बच्चे बाहर खेल रहे हैं।' What is the weather like?",
            options: ["Rainy", "Very nice/pleasant", "Hot", "Stormy"],
            correctAnswer: "Very nice/pleasant",
            points: 3
          },
          {
            id: "r2",
            type: "multiple-choice",
            question: "From the passage, what are the children doing?",
            options: ["Studying", "Sleeping", "Playing outside", "Eating"],
            correctAnswer: "Playing outside",
            points: 3
          }
        ]
      },
      {
        id: "writing-nh",
        title: "Writing",
        type: "writing",
        questions: [
          {
            id: "w1",
            type: "short-answer",
            question: "Write a short paragraph (5-7 sentences) about your daily routine in Hindi.",
            points: 10,
            rubric: "Time expressions, verb conjugation, coherence"
          }
        ]
      }
    ],
    passingScore: 70
  },
  {
    id: "mock-intermediate-low",
    title: "Intermediate Low Assessment",
    description: "Show your ability to narrate events, express opinions, and handle more complex conversations.",
    level: "intermediate-low",
    languageCode: "hi",
    duration: 60,
    totalQuestions: 40,
    sections: [
      {
        id: "reading-il",
        title: "Reading Comprehension",
        type: "reading",
        questions: [
          {
            id: "r1",
            type: "multiple-choice",
            question: "Read the story excerpt and identify the main character's problem.",
            passage: "रामू एक किसान था। इस साल बारिश नहीं हुई। उसकी फसल सूख गई। वह बहुत चिंतित था।",
            options: ["He lost his animals", "There was no rain and crops dried", "He couldn't find work", "His house was damaged"],
            correctAnswer: "There was no rain and crops dried",
            points: 4
          }
        ]
      },
      {
        id: "writing-il",
        title: "Writing",
        type: "writing",
        questions: [
          {
            id: "w1",
            type: "short-answer",
            question: "Write about a memorable experience (8-10 sentences). Use past tense.",
            points: 15,
            rubric: "Narrative structure, past tense accuracy, descriptive language"
          }
        ]
      },
      {
        id: "speaking-il",
        title: "Speaking",
        type: "speaking",
        questions: [
          {
            id: "s1",
            type: "speaking",
            question: "Describe your favorite festival and explain why you like it (1-2 minutes).",
            points: 10,
            rubric: "Fluency, vocabulary range, cultural knowledge, pronunciation"
          }
        ]
      }
    ],
    passingScore: 70
  },
  {
    id: "mock-intermediate-mid",
    title: "Intermediate Mid Assessment",
    description: "Demonstrate advanced conversational ability, complex narration, and cultural understanding.",
    level: "intermediate-mid",
    languageCode: "hi",
    duration: 75,
    totalQuestions: 45,
    sections: [
      {
        id: "reading-im",
        title: "Reading Comprehension",
        type: "reading",
        questions: [
          {
            id: "r1",
            type: "short-answer",
            question: "Read the article about climate change in India and summarize the main points in 3-4 sentences.",
            passage: "भारत में जलवायु परिवर्तन एक गंभीर समस्या बन गई है। तापमान बढ़ रहा है और मौसम का पैटर्न बदल रहा है। इससे किसानों को बहुत नुकसान हो रहा है। सरकार इस समस्या को हल करने के लिए नई नीतियाँ बना रही है।",
            points: 8
          }
        ]
      },
      {
        id: "writing-im",
        title: "Writing",
        type: "writing",
        questions: [
          {
            id: "w1",
            type: "short-answer",
            question: "Write a formal letter to your school principal requesting permission for a cultural event. Include proper salutation, body, and closing.",
            points: 15,
            rubric: "Formal register, letter format, persuasive language, grammar"
          }
        ]
      }
    ],
    passingScore: 75
  }
]

export function getCapstonesByLevel(level: ProficiencyLevel): CapstoneProject[] {
  return hindiCapstones.filter(c => c.level === level)
}

export function getMockExamsByLevel(level: ProficiencyLevel): MockExam[] {
  return hindiMockExams.filter(e => e.level === level)
}

export function getCapstoneById(id: string): CapstoneProject | undefined {
  return hindiCapstones.find(c => c.id === id)
}

export function getMockExamById(id: string): MockExam | undefined {
  return hindiMockExams.find(e => e.id === id)
}
