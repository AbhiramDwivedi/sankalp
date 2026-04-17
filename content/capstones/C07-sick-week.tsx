// Capstone C07 — "The week I got sick during exams"
// Push tier. Complex cause/effect — क्योंकि, इसलिए, जबकि.
// Integrates L2-06 health, L2-04 school routines, L2-01 daily routine.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C07-sick-week',
  order: 7,
  tier: 'push',
  isMockExam: false,
  themeGroup: 'HumanIngenuity',
  heroMotif: 'sunrise',
  titleHindi: 'परीक्षा के हफ़्ते मैं बीमार पड़ गई',
  titleEnglish: 'The week I got sick during exams',
  hook: 'Illness is the most underrated prompt. It forces tense, cause, and contrast into every sentence.',
  promptHindi:
    'किसी ऐसे समय के बारे में लिखो जब तुम बीमार पड़े थे। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about a time you were sick. Use three cohesive paragraphs.',
  whyThisCapstone:
    'Illness essays naturally produce Benchmark-5 structure: cause (why I got sick), effect (what I couldn\'t do), and contrast (what I did instead / what I learned). Every sentence wants क्योंकि, इसलिए, जबकि, or हालाँकि — which are the exact connectors a rater counts. This capstone also teaches the student to mine one narrow experience for a full essay rather than grabbing at unrelated topics.',
  draws: [
    { packId: 'L2-06-health-fitness', contributes: 'vocabulary', note: 'Health vocabulary: बुख़ार, खाँसी, कमज़ोरी, आराम, दवा.' },
    { packId: 'L2-04-school-routines', contributes: 'structure', note: 'The exam-week backbone — what was happening while you were in bed.' },
    { packId: 'L2-01-daily-routine', contributes: 'structure', note: 'The "normal vs broken" routine contrast is the essay\'s engine.' },
    { packId: 'L1-03-family', contributes: 'structure', note: 'Family care vocabulary anchors the middle paragraph.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'पिछले महीने मैं बहुत बीमार पड़ गई। मुझे बुख़ार और खाँसी थी। उस हफ़्ते हमारी परीक्षाएँ भी थीं। मैंने दो दिन स्कूल नहीं गया। माँ ने मेरे लिए दवा लाई। दादी ने सूप बनाया। मैं पूरे दिन बिस्तर पर लेटी रही। मेरी सहेली ने फ़ोन करके मुझे नोट्स दिए। तीसरे दिन मैं थोड़ी ठीक हुई। चौथे दिन मैं स्कूल गई और परीक्षा दी। मुझे कम अंक मिले लेकिन अनुभव ने मुझे बहुत कुछ सिखाया। अब मैं अपनी सेहत का ज़्यादा ध्यान रखती हूँ।',
      transliteration:
        'pichhle mahine main bahut beemaar pad gayi. mujhe bukhaar aur khaansi thi. us hafte hamaari pareekshaayen bhi thin. mainne do din school nahin gayaa. maan ne mere liye davaa laayi. daadi ne soop banaayaa. main poore din bistar par leti rahi. meri saheli ne fon karke mujhe nots diye. teesre din main thodi theek hui. chauthe din main school gayi aur pareekshaa di. mujhe kam ank mile lekin anubhav ne mujhe bahut kuchh sikhaayaa. ab main apni sehat kaa zyaadaa dhyaan rakhti hoon.',
      english:
        "Last month I got very sick. I had fever and cough. That week we also had our exams. I did not go to school for two days. Mom brought medicine for me. Grandma made soup. I lay in bed the whole day. My friend called me and gave me notes. On the third day I got a little better. On the fourth day I went to school and took the exam. I got fewer marks but the experience taught me a lot. Now I take better care of my health.",
      wordCount: 128,
      tensesUsed: ['past', 'present'],
      connectorsUsed: ['lekin'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'मेरी ज़िंदगी का सबसे मुश्किल हफ़्ता पिछली मार्च में था, जब हमारी अर्धवार्षिक परीक्षाएँ शुरू हो रही थीं और ठीक उसी समय मुझे तेज़ बुख़ार हो गया। परीक्षा से एक दिन पहले मैंने देर रात तक पढ़ाई की, शायद इसीलिए सुबह उठते ही मेरा सिर भारी था और गला दर्द करने लगा। दोपहर तक बुख़ार एक सौ दो तक पहुँच गया था, और डॉक्टर ने साफ़ कह दिया कि मुझे कम से कम तीन दिन पूरा आराम चाहिए।\n\nअगले तीन दिन बहुत अजीब लगे। एक ओर मेरे दोस्त परीक्षा दे रहे थे, जबकि मैं बिस्तर पर लेटी छत को देख रही थी। माँ हर दो घंटे में दवा और गरम सूप लेकर आती थीं, और दादी मेरे पास बैठकर पुरानी कहानियाँ सुनाती थीं ताकि मैं पढ़ाई की चिंता छोड़ दूँ। हालाँकि मुझे कमज़ोरी महसूस हो रही थी, उन तीन दिनों में मैंने कुछ ऐसा सीखा जो किताबें नहीं सिखा सकतीं — कि परिवार वो सहारा है जो तुम तब समझते हो जब तुम ख़ुद कमज़ोर होते हो।\n\nमेरा मानना है कि उस हफ़्ते परीक्षा में मेरे अंक भले ही कम आए, पर मैंने ज़िंदगी की एक बड़ी परीक्षा पास कर ली। अगर कभी फिर ऐसी स्थिति आए, तो मैं पहले सेहत को रखूँगी, क्योंकि पढ़ाई दोबारा की जा सकती है, शरीर दोबारा नहीं बनता।',
      transliteration:
        'meri zindagi kaa sabse mushkil haftaa pichhli march mein thaa, jab hamaari ardhvaarshik pareekshaayen shuru ho rahi thin aur theek usi samay mujhe tez bukhaar ho gayaa. pareekshaa se ek din pahle mainne der raat tak padhaayi ki, shaayad isiliye subah uthte hi meraa sir bhaari thaa aur galaa dard karne lagaa. dopahar tak bukhaar ek sau do tak pahunch gayaa thaa, aur doctor ne saaf kah diyaa ki mujhe kam se kam teen din pooraa aaraam chaahiye.\n\nagle teen din bahut ajeeb lage. ek or mere dost pareekshaa de rahe the, jabki main bistar par leti chhat ko dekh rahi thi. maan har do ghante mein davaa aur garam soop lekar aati thin, aur daadi mere paas baithkar puraani kahaaniyaan sunaati thin taaki main padhaayi ki chintaa chhod doon. haalaanki mujhe kamzori mahasoos ho rahi thi, un teen dinon mein mainne kuchh aisaa seekhaa jo kitaaben nahin sikhaa saktin — ki parivaar vo sahaaraa hai jo tum tab samajhte ho jab tum khud kamzor hote ho.\n\nmeraa maannaa hai ki us hafte pareekshaa mein mere ank bhale hi kam aaye, par mainne zindagi ki ek badi pareekshaa paas kar li. agar kabhi phir aisi sthiti aaye, to main pahle sehat ko rakhoongi, kyonki padhaayi dobaaraa ki jaa sakti hai, shareer dobaaraa nahin bantaa.',
      english:
        "The hardest week of my life was last March, when our mid-year exams were starting and right at that moment I got a high fever. The day before the exam I had studied late into the night, and perhaps that is why my head was heavy and my throat started aching as soon as I woke up. By afternoon the fever had reached one-oh-two, and the doctor said clearly that I needed at least three days of complete rest.\n\nThe next three days felt very strange. On one side my friends were taking exams, while I lay in bed staring at the ceiling. Mom brought medicine and hot soup every two hours, and grandma sat beside me telling old stories so that I would let go of my study worries. Although I was feeling weak, in those three days I learned something that books cannot teach — that family is the support you understand only when you yourself are weak.\n\nI believe that while my exam marks that week may have been low, I passed a bigger exam of life. If such a situation comes again, I will put health first, because studies can be redone, but the body cannot be rebuilt.",
      wordCount: 275,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'isliye', 'jabki', 'halaanki', 'meraManna', 'agarTo', 'kyonki'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'मेरी ज़िंदगी का सबसे मुश्किल हफ़्ता पिछली मार्च में था, जब हमारी अर्धवार्षिक परीक्षाएँ शुरू हो रही थीं और ठीक उसी समय मुझे तेज़ बुख़ार हो गया। परीक्षा से एक दिन पहले मैंने देर रात तक लगातार पढ़ाई की थी, शायद इसीलिए सुबह उठते ही मेरा सिर बहुत भारी था और गला दर्द करने लगा। दोपहर तक बुख़ार एक सौ दो डिग्री तक पहुँच गया था, और डॉक्टर ने बिना ज़्यादा सोचे साफ़ कह दिया कि मुझे कम से कम तीन दिन पूरा आराम चाहिए — वरना बात बिगड़ सकती है।\n\nअगले तीन दिन बहुत अजीब, धीमे और भारी लगे। एक ओर मेरे सारे दोस्त परीक्षा दे रहे थे और मुझे हर घंटे उनके अपडेट मिल रहे थे, जबकि मैं बिस्तर पर लेटी छत को देखती रही। माँ हर दो घंटे में दवा, पानी और गरम सूप लेकर आती थीं, और दादी मेरे पास बैठकर बचपन की कहानियाँ सुनाती थीं ताकि मैं पढ़ाई की चिंता थोड़ी देर के लिए छोड़ दूँ। हालाँकि मुझे कमज़ोरी और थकान महसूस हो रही थी, उन तीन दिनों में मैंने कुछ ऐसा सीखा जो कोई किताब नहीं सिखा सकती — कि परिवार वह चुपचाप खड़ा सहारा है जो तुम्हें तभी दिखता है जब तुम ख़ुद सबसे कमज़ोर होते हो।\n\nमेरा मानना है कि उस हफ़्ते परीक्षा में मेरे अंक भले ही कम आए हों, पर मैंने ज़िंदगी की एक ज़्यादा बड़ी परीक्षा चुपचाप पास कर ली। अगर मुझे फिर कभी ऐसी स्थिति का सामना करना पड़े, तो मैं पहले सेहत को रखूँगी और बाकी सब बाद में — क्योंकि पढ़ाई हम दोबारा कर सकते हैं, किताबें दोबारा खोल सकते हैं, पर शरीर दोबारा नहीं बनता। कभी-कभी सबसे बड़ी सीख बिस्तर से मिलती है, किताब से नहीं।',
      transliteration:
        'meri zindagi kaa sabse mushkil haftaa pichhli march mein thaa, jab hamaari ardhvaarshik pareekshaayen shuru ho rahi thin aur theek usi samay mujhe tez bukhaar ho gayaa. pareekshaa se ek din pahle mainne der raat tak lagaataar padhaayi ki thi, shaayad isiliye subah uthte hi meraa sir bahut bhaari thaa aur galaa dard karne lagaa. dopahar tak bukhaar ek sau do digree tak pahunch gayaa thaa, aur doctor ne binaa zyaadaa soche saaf kah diyaa ki mujhe kam se kam teen din pooraa aaraam chaahiye — varnaa baat bigad sakti hai.\n\nagle teen din bahut ajeeb, dheeme aur bhaari lage. ek or mere saare dost pareekshaa de rahe the aur mujhe har ghante unke update mil rahe the, jabki main bistar par leti chhat ko dekhti rahi. maan har do ghante mein davaa, paani aur garam soop lekar aati thin, aur daadi mere paas baithkar bachpan ki kahaaniyaan sunaati thin taaki main padhaayi ki chintaa thodi der ke liye chhod doon. haalaanki mujhe kamzori aur thakaan mahasoos ho rahi thi, un teen dinon mein mainne kuchh aisaa seekhaa jo koi kitaab nahin sikhaa sakti — ki parivaar vah chupchaap khadaa sahaaraa hai jo tumhen tabhi dikhtaa hai jab tum khud sabse kamzor hote ho.\n\nmeraa maannaa hai ki us hafte pareekshaa mein mere ank bhale hi kam aaye hon, par mainne zindagi ki ek zyaadaa badi pareekshaa chupchaap paas kar li. agar mujhe phir kabhi aisi sthiti kaa saamnaa karnaa pade, to main pahle sehat ko rakhoongi aur baaki sab baad mein — kyonki padhaayi ham dobaaraa kar sakte hain, kitaaben dobaaraa khol sakte hain, par shareer dobaaraa nahin bantaa. kabhi-kabhi sabse badi seekh bistar se milti hai, kitaab se nahin.',
      english:
        "The hardest week of my life was last March, when our mid-year exams were starting and right at that moment I got a high fever. The day before the exam I had studied continuously late into the night, and perhaps that is why my head was very heavy and my throat started aching as soon as I woke up. By afternoon the fever had reached one-oh-two, and without much thought the doctor said clearly that I needed at least three days of complete rest — otherwise things could get worse.\n\nThe next three days felt strange, slow, and heavy. On one side my friends were all taking exams and I was getting updates every hour, while I lay in bed staring at the ceiling. Mom brought medicine, water, and hot soup every two hours, and grandma sat beside me telling childhood stories so that I would let go of my study worries for a little while. Although I was feeling weak and exhausted, in those three days I learned something no book can teach — that family is the quiet, standing support that becomes visible only when you yourself are at your weakest.\n\nI believe that while my exam marks that week may have been low, I quietly passed a much bigger exam of life. If I ever face such a situation again, I will put health first and everything else second — because we can redo studies, we can reopen books, but the body cannot be rebuilt. Sometimes the greatest lesson comes from the bed, not the book.",
      wordCount: 335,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'isliye', 'jabki', 'halaanki', 'meraManna', 'agarTo', 'kyonki'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'मैंने देर रात तक पढ़ाई की ... शायद इसीलिए', note: 'Past perfect implicit + cause reasoning. The student is analyzing, not just describing.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'शायद इसीलिए सुबह उठते ही', note: 'Hedged cause (शायद) + non-finite clause (उठते ही). Syntactic density above IL.' },
    { paragraphIndex: 0, kind: 'vocab', highlight: 'बुख़ार ... दर्द ... आराम', note: 'Health-domain vocabulary — Topic Coverage signal.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'एक ओर ... जबकि', note: 'Formal contrast + जबकि. Benchmark-5 text-type.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'दादी मेरे पास बैठकर ... सुनाती थीं ताकि मैं ... छोड़ दूँ', note: 'Purpose clause with ताकि + subjunctive. One of the B5+ syntactic ceilings.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि मुझे कमज़ोरी महसूस हो रही थी', note: 'हालाँकि concession in past continuous — double marker.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'परिवार वो सहारा है जो तुम तब समझते हो जब', note: 'Relative + when-clause — multi-layer syntax that tests control.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'मेरा मानना है कि ... भले ही ... पर', note: 'Concessive thesis — "even though X, still Y". Opinion-essay register.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'अगर कभी फिर ... तो ... क्योंकि', note: 'Conditional + cause in one sentence. B6 density.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'पढ़ाई दोबारा की जा सकती है, शरीर दोबारा नहीं बनता', note: 'Closing aphorism. Voice signal — the rubric rewards essays that earn their closing line.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three paragraphs with a cause-effect-reflection arc. Text-Type at Benchmark 5; approaches 6.',
      'Three tense frames — past (हो गया, दे रहे थे), present (मुझे लगता है, शरीर नहीं बनता), future (रखूँगी). Language Control: full.',
      'Seven connectors including जबकि, हालाँकि, अगर...तो, क्योंकि, ताकि (purpose), इसीलिए (hedged cause). Dense syntactic variety.',
      'The ताकि purpose clause ("दादी ... सुनाती थीं ताकि मैं ... छोड़ दूँ") is a Benchmark-6 marker — few IL essays attempt it.',
      'Closing aphorism ("शरीर दोबारा नहीं बनता") lands naturally — rater reads it as earned voice.',
    ],
    gotchas: [
      'परीक्षा (f. sing) → परीक्षाएँ (f. pl). Getting the plural wrong breaks agreement throughout.',
      'The ताकि clause requires subjunctive (छोड़ दूँ, not छोड़ दूँगी) — easy to slip.',
      'बिस्तर is masculine — बिस्तर पर लेटी (f. subject), not लेटा.',
    ],
  },
  readerQuestions: [
    { q: 'लेखिका किस महीने में बीमार पड़ी?', a: 'पिछली मार्च में।' },
    { q: 'उस समय स्कूल में क्या हो रहा था?', a: 'अर्धवार्षिक परीक्षाएँ चल रही थीं।' },
    { q: 'डॉक्टर ने क्या कहा?', a: 'कम से कम तीन दिन पूरा आराम चाहिए।' },
    { q: 'दादी ने लेखिका को कहानियाँ क्यों सुनाईं?', a: 'ताकि लेखिका पढ़ाई की चिंता थोड़ी देर के लिए छोड़ दे।' },
    { q: 'लेखिका ने उस हफ़्ते क्या बड़ी सीख ली?', a: 'कि पढ़ाई दोबारा की जा सकती है, पर शरीर दोबारा नहीं बनता।' },
  ],
  teacherNote: {
    why:
      'C07 uses illness as a forcing function for complex clauses. Purpose (ताकि), concession (हालाँकि), cause (क्योंकि, इसलिए, इसीलिए), and contrast (जबकि) all appear naturally. Any student who writes this essay at IM length has also practiced the seven hardest connectors Hindi offers — transferable to any FCPS prompt.',
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    examLink:
      'STAMP Language Control axis — "control of past, present, and future time frames" + complex clause formation. Benchmark 5–6.',
  },
  status: 'shipped',
  version: 1,
};
