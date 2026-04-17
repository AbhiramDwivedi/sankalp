// Capstone C08 — "A conversation with my grandmother about her youth"
// Push tier. Reported speech + past-habitual.
// Integrates L3-01 memories, L1-03 family, L1-09 weather, L2-09 events.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C08-grandmother-story',
  order: 8,
  tier: 'push',
  isMockExam: false,
  themeGroup: 'Identity',
  heroMotif: 'family',
  titleHindi: 'दादी की जवानी की एक कहानी',
  titleEnglish: 'A conversation with my grandmother about her youth',
  hook: 'Reported speech is a rubric cheat code. This capstone uses it naturally, through a grandmother\'s voice.',
  promptHindi:
    'अपनी दादी, नानी या किसी बड़े रिश्तेदार से हुई किसी यादगार बातचीत के बारे में लिखो। तीन सुसंगत पैराग्राफ में।',
  promptEnglish:
    'Write about a memorable conversation with your grandmother or an elder. Use three cohesive paragraphs.',
  whyThisCapstone:
    'A conversation essay is the only prompt that legitimately forces reported speech (उसने कहा कि...), which is a rare but high-value Language-Control marker. Combined with past-habitual (वह गाँव में रहती थीं) and two-generation contrast, this is one of the densest texture opportunities in the library. A student who lands this capstone will have shown the rater a textual register beyond pass-bar.',
  draws: [
    { packId: 'L3-01-my-memories', contributes: 'structure', note: 'Past-tense narrative backbone + memory-framing opening.' },
    { packId: 'L1-03-family', contributes: 'vocabulary', note: 'Grandmother-specific kinship (दादी, नानी, मौसी) and family verbs.' },
    { packId: 'L1-09-weather-seasons', contributes: 'structure', note: 'Grandmother\'s story is easier to anchor to a specific season from her youth (मानसून, गर्मी).' },
    { packId: 'L2-09-special-events', contributes: 'cultural', note: 'Festivals/weddings of the grandmother\'s era provide authentic cultural detail.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मेरी दादी बहुत अच्छी कहानियाँ सुनाती हैं। पिछले शनिवार मैं उनके पास बैठी थी। उन्होंने बचपन की एक बात बताई। वे एक छोटे गाँव में रहती थीं। उनके गाँव में बिजली नहीं थी। वे रोज़ कुएँ से पानी लातीं थीं। स्कूल बहुत दूर था। वे पैदल जाती थीं। मैंने पूछा, "क्या आप रोज़ पढ़ाई करती थीं?" उन्होंने कहा, "हाँ, पर कठिन था।" मुझे लगता है कि उनकी ज़िंदगी हमारी ज़िंदगी से बहुत अलग थी। अगली बार मैं और कहानियाँ सुनूँगी।',
      transliteration:
        'meri daadi bahut achhi kahaaniyaan sunaati hain. pichhle shanivaar main unke paas baithi thi. unhonne bachpan ki ek baat bataayi. ve ek chhote gaanv mein rahti thin. unke gaanv mein bijli nahin thi. ve roz kuen se paani laati thin. school bahut door thaa. ve paidal jaati thin. mainne poochhaa, "kyaa aap roz padhaayi karti thin?" unhonne kahaa, "haan, par kathin thaa." mujhe lagtaa hai ki unki zindagi hamaari zindagi se bahut alag thi. agli baar main aur kahaaniyaan sunoongi.',
      english:
        "My grandmother tells very good stories. Last Saturday I was sitting with her. She told me one thing about her childhood. She used to live in a small village. There was no electricity in her village. Every day she brought water from the well. The school was very far. She walked there. I asked, \"Did you study every day?\" She said, \"Yes, but it was hard.\" I think her life was very different from ours. Next time I will listen to more stories.",
      wordCount: 130,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['lekin'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'पिछले शनिवार की शाम मैं छत पर दादी के पास बैठी थी, और ठीक उसी समय उन्होंने अपने बचपन की एक कहानी सुनानी शुरू की। वे बोलीं, "मैं जब तुम्हारी उम्र की थी, तब हमारे गाँव में बिजली भी नहीं थी।" मुझे शुरू में विश्वास नहीं हुआ — मैं उनसे तीन बार पूछ बैठी।\n\nदादी ने बताया कि वे एक छोटे-से गाँव में रहती थीं, जहाँ हर काम सूरज के हिसाब से चलता था। रोज़ सुबह पाँच बजे उठकर वे और उनकी बहन कुएँ से पानी लातीं थीं, फिर पैदल चार किलोमीटर पैदल चलकर स्कूल जातीं थीं। शाम को पढ़ाई दीये की रोशनी में होती थी, क्योंकि लैम्प का तेल हर घर में नहीं होता था। जब मैंने पूछा, "क्या आपको कभी डर लगता था?" तब उन्होंने हँसकर कहा, "डर? हमें सोचने का समय ही नहीं था।" हालाँकि वे मुस्कुरा रही थीं, उनकी आँखों में एक गहरी बात थी जो मैं पहले नहीं समझती थी।\n\nमेरा मानना है कि उस एक घंटे की बातचीत ने मुझे स्कूल की किसी किताब से ज़्यादा सिखाया। अगर मुझे मौका मिले, तो मैं उनकी और कहानियाँ रिकॉर्ड करूँगी — क्योंकि दादी-नानी की आवाज़ें एक बार चली गईं, तो दोबारा नहीं मिलतीं।',
      transliteration:
        'pichhle shanivaar ki shaam main chhat par daadi ke paas baithi thi, aur theek usi samay unhonne apne bachpan ki ek kahaani sunaani shuru ki. ve boleen, "main jab tumhaari umar ki thi, tab hamaare gaanv mein bijli bhi nahin thi." mujhe shuru mein vishvaas nahin huaa — main unse teen baar poochh baithi.\n\ndaadi ne bataayaa ki ve ek chhote-se gaanv mein rahti thin, jahaan har kaam sooraj ke hisaab se chaltaa thaa. roz subah paanch baje uthkar ve aur unki bahan kuen se paani laati thin, phir chaar kilomeetar paidal chalkar school jaati thin. shaam ko padhaayi deeye ki roshni mein hoti thi, kyonki laimp kaa tel har ghar mein nahin hotaa thaa. jab mainne poochhaa, "kyaa aapko kabhi dar lagtaa thaa?" tab unhonne hanskar kahaa, "dar? hamen sochne kaa samay hi nahin thaa." haalaanki ve muskuraa rahi thin, unki aankhon mein ek gahri baat thi jo main pahle nahin samajhti thi.\n\nmeraa maannaa hai ki us ek ghante ki baatcheet ne mujhe school ki kisi kitaab se zyaadaa sikhaayaa. agar mujhe maukaa mile, to main unki aur kahaaniyaan rikord karoongi — kyonki daadi-naani ki aavaazen ek baar chali gayeen, to dobaaraa nahin miltin.',
      english:
        "Last Saturday evening I was sitting with grandma on the rooftop, and right then she began to tell me a story from her childhood. She said, \"When I was your age, there wasn't even electricity in our village.\" At first I didn't believe her — I asked her three times.\n\nGrandma told me that she used to live in a small village, where everything ran by the sun. Every morning at five o'clock she and her sister would bring water from the well, then walk four kilometers to school. Evening studies happened by the light of a diya, because lamp oil wasn't available in every house. When I asked, \"Were you ever scared?\" she laughed and said, \"Scared? We didn't have time to think.\" Although she was smiling, there was something deep in her eyes that I hadn't understood before.\n\nI believe that one hour of conversation taught me more than any school book. If I get the chance, I will record more of her stories — because once the voices of grandmothers are gone, they cannot be retrieved.",
      wordCount: 258,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'kyonki', 'halaanki', 'meraManna', 'agarTo', 'lekin', 'phir'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'पिछले शनिवार की शाम मैं छत पर दादी के पास चुपचाप बैठी थी, और ठीक उसी समय, बिना किसी वजह के, उन्होंने अपने बचपन की एक बहुत पुरानी कहानी सुनानी शुरू कर दी। वे धीरे से बोलीं, "मैं जब तुम्हारी उम्र की थी, तब हमारे पूरे गाँव में बिजली तक नहीं थी।" मुझे शुरू में उनकी बात पर विश्वास नहीं हुआ — इतना कि मैं उनसे तीन बार पूछ बैठी, और हर बार वे उसी शांति से सिर हिलाती रहीं।\n\nउन्होंने बताया कि वे एक ऐसे छोटे-से गाँव में रहती थीं जहाँ हर काम सूरज के हिसाब से चलता था। रोज़ सुबह पाँच बजे उठकर वे और उनकी बहन साथ में कुएँ से पानी लातीं थीं, फिर चार किलोमीटर पैदल चलकर स्कूल जातीं थीं — बिना शिकायत के, बिना थके। शाम को पढ़ाई दीये की मद्धिम रोशनी में होती थी, क्योंकि लैम्प का तेल हर घर में नहीं होता था। जब मैंने हैरानी से पूछा, "क्या आपको कभी डर लगता था?" तब उन्होंने हल्की-सी हँसकर कहा, "डर? हमें सोचने का समय ही नहीं था।" हालाँकि वे मुस्कुरा रही थीं, उनकी आँखों में एक गहरी बात थी जो मैं पहले नहीं समझती थी — शायद यह कि कठिनाई भी एक तरह की शिक्षक होती है।\n\nमेरा मानना है कि उस एक घंटे की चुप-चुप बातचीत ने मुझे स्कूल की किसी भी किताब से ज़्यादा सिखाया। अगर मुझे मौका मिले, तो मैं उनकी सारी कहानियाँ एक-एक करके रिकॉर्ड करूँगी, शायद एक किताब भी बनाऊँगी — क्योंकि दादी-नानी की आवाज़ें जब एक बार चली जाती हैं, तब दोबारा नहीं मिलतीं; और उन आवाज़ों में हमारी पूरी जड़ें बसी होती हैं।',
      transliteration:
        'pichhle shanivaar ki shaam main chhat par daadi ke paas chupchaap baithi thi, aur theek usi samay, binaa kisi vajah ke, unhonne apne bachpan ki ek bahut puraani kahaani sunaani shuru kar di. ve dheere se boleen, "main jab tumhaari umar ki thi, tab hamaare poore gaanv mein bijli tak nahin thi." mujhe shuru mein unki baat par vishvaas nahin huaa — itnaa ki main unse teen baar poochh baithi, aur har baar ve usi shaanti se sir hilaati raheen.\n\nunhonne bataayaa ki ve ek aise chhote-se gaanv mein rahti thin jahaan har kaam sooraj ke hisaab se chaltaa thaa. roz subah paanch baje uthkar ve aur unki bahan saath mein kuen se paani laati thin, phir chaar kilomeetar paidal chalkar school jaati thin — binaa shikaayat ke, binaa thake. shaam ko padhaayi deeye ki maddhim roshni mein hoti thi, kyonki laimp kaa tel har ghar mein nahin hotaa thaa. jab mainne hairaani se poochhaa, "kyaa aapko kabhi dar lagtaa thaa?" tab unhonne halki-si hanskar kahaa, "dar? hamen sochne kaa samay hi nahin thaa." haalaanki ve muskuraa rahi thin, unki aankhon mein ek gahri baat thi jo main pahle nahin samajhti thi — shaayad yah ki kathinaayi bhi ek tarah ki shikshak hoti hai.\n\nmeraa maannaa hai ki us ek ghante ki chup-chup baatcheet ne mujhe school ki kisi bhi kitaab se zyaadaa sikhaayaa. agar mujhe maukaa mile, to main unki saari kahaaniyaan ek-ek karke rikord karoongi, shaayad ek kitaab bhi banaaoongi — kyonki daadi-naani ki aavaazen jab ek baar chali jaati hain, tab dobaaraa nahin miltin; aur un aavaazon mein hamaari poori jaden basi hoti hain.',
      english:
        "Last Saturday evening I was sitting quietly with grandma on the rooftop, and right then, for no particular reason, she began telling me a very old story from her childhood. She said softly, \"When I was your age, there wasn't even electricity in our whole village.\" At first I didn't believe her — so much that I asked three times, and each time she nodded the same way, calmly.\n\nShe told me that she used to live in a small village where everything ran by the sun. Every morning at five o'clock, she and her sister would bring water together from the well, then walk four kilometers to school — without complaint, without tiring. Evening studies happened in the dim light of a diya, because lamp oil wasn't available in every house. When I asked in surprise, \"Were you ever scared?\" she laughed softly and said, \"Scared? We didn't have time to think.\" Although she was smiling, there was something deep in her eyes that I hadn't understood before — perhaps that difficulty, too, is a kind of teacher.\n\nI believe that hushed one-hour conversation taught me more than any school book. If I get the chance, I will record all her stories one by one, maybe even make a book out of them — because once the voices of grandmothers are gone, they cannot be retrieved; and in those voices our whole roots are held.",
      wordCount: 332,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['jabTab', 'kyonki', 'halaanki', 'meraManna', 'agarTo', 'lekin', 'phir'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'उन्होंने ... सुनानी शुरू की ... वे बोलीं, "..."', note: 'Direct reported speech with a framing verb. Rare for IL essays; standard for IM+.' },
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'मैं जब तुम्हारी उम्र की थी, तब', note: 'Embedded जब...तब inside reported speech — two frames of past.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'मुझे शुरू में विश्वास नहीं हुआ — मैं तीन बार पूछ बैठी', note: 'Em-dash + consequential clause. Structural variety.' },
    { paragraphIndex: 1, kind: 'tense-shift', highlight: 'वे एक गाँव में रहती थीं ... पानी लाती थीं ... स्कूल जाती थीं', note: 'Past-habitual imperfective — the most rigorous tense for IM to hold across an entire paragraph.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'क्योंकि लैम्प का तेल हर घर में नहीं होता था', note: 'Cause clause in past-habitual — double marker.' },
    { paragraphIndex: 1, kind: 'structure', highlight: '"डर? हमें सोचने का समय ही नहीं था।"', note: 'Quoted rhetorical question — high register.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'हालाँकि वे मुस्कुरा रही थीं', note: 'हालाँकि concession in past continuous.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'उस एक घंटे की बातचीत ने मुझे ... से ज़्यादा सिखाया', note: 'Comparative thesis — elegance rarely found below B5.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'अगर मुझे मौका मिले, तो ... क्योंकि', note: 'Conditional + cause. Syntactic density = B6.' },
    { paragraphIndex: 2, kind: 'cultural', highlight: 'दादी-नानी की आवाज़ें एक बार चली गईं, तो दोबारा नहीं मिलतीं', note: 'Closing aphorism with cultural weight. Writer-voice marker.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Sustained past-habitual imperfective ("रहती थीं, लाती थीं, जाती थीं") across an entire paragraph — one of the hardest Hindi tense-holds. Benchmark 5–6 Language Control.',
      'Two instances of reported speech (उन्होंने कहा "...") with framing verbs. This is rubric gold for text-type variety.',
      'Seven connectors including concession (हालाँकि), cause (क्योंकि), conditional (अगर...तो), time (जब...तब). Density pushes above IL.',
      'Embedded जब...तब inside reported speech (paragraph 1) is a rare but graded construction.',
      'Closing aphorism is earned, not asserted — the rubric\'s "some emerging complex structures" clause applies.',
    ],
    gotchas: [
      'The feminine plural past imperfective (रहती थीं, not रहती थी) is the most common slip. Check all four verbs.',
      'Reported speech without tense shift is correct in Hindi — do NOT rewrite quoted verbs into past.',
      'बात (f) → बात थी, not बात था. Small but dock-worthy.',
    ],
  },
  readerQuestions: [
    { q: 'लेखिका कब दादी के पास बैठी थी?', a: 'पिछले शनिवार की शाम को, छत पर।' },
    { q: 'दादी के गाँव में क्या नहीं था?', a: 'बिजली नहीं थी।' },
    { q: 'दादी और उनकी बहन कहाँ से पानी लाती थीं?', a: 'कुएँ से।' },
    { q: 'दादी शाम को कैसे पढ़ाई करती थीं?', a: 'दीये की रोशनी में, क्योंकि लैम्प का तेल हर घर में नहीं होता था।' },
    { q: 'लेखिका ने क्या फ़ैसला किया?', a: 'कि वह दादी की कहानियाँ रिकॉर्ड करेगी और शायद एक किताब भी बनाएगी।' },
  ],
  teacherNote: {
    why:
      'C08 is the most linguistically demanding essay in the core+push set. It forces past-habitual imperfective (रहती थीं, जाती थीं) across a full paragraph, two instances of reported speech, and a conditional future in the close. A student who can write this is not borderline at Benchmark 5 — they are comfortably there.',
    trains: ['LanguageControl', 'TextType', 'TopicCoverage'],
    examLink:
      'STAMP rubric — sustained past-habitual + reported speech = Benchmark 6 ("paragraph-length narratives; clear cohesion"). Use as a ceiling check.',
  },
  status: 'shipped',
  version: 1,
};
