// Capstone C05 - "A memorable school day"
// Core tier, mid-point quality anchor. Main-thread authored.
// Integrates L1-07 classes, L2-04 school routines, L2-05 school activities, L1-08 interests.

import type { Capstone } from '../schema';

export const capstone: Capstone = {
  id: 'C05-school-day',
  order: 5,
  tier: 'core',
  isMockExam: false,
  themeGroup: 'Identity',
  heroMotif: 'books',
  titleHindi: 'एक यादगार स्कूल का दिन',
  titleEnglish: 'A memorable school day',
  hook: 'School days feel ordinary until one of them isn\'t. This capstone catches that one day on paper.',
  promptHindi:
    'अपने स्कूल के किसी ऐसे दिन के बारे में लिखो जो तुम्हें आज तक याद है। तीन पैराग्राफ में लिखो।',
  promptEnglish:
    'Write about a school day that you still remember today. Use three cohesive paragraphs.',
  whyThisCapstone:
    'School is the one topic every student has, in detail. A school-day essay easily combines daily routine (present), a specific memorable event (past), and a lesson or future intention (future). That shape is the exact rubric signal Benchmark 5 rewards, and the vocabulary is already familiar - so the student can focus energy on structure and connectors rather than hunting for words.',
  draws: [
    { packId: 'L1-07-classes-supplies', contributes: 'vocabulary', note: 'Core classroom vocabulary: कक्षा, अध्यापक, किताब, गृहकार्य, परीक्षा.' },
    { packId: 'L2-04-school-routines', contributes: 'structure', note: 'The daily schedule backbone - period-by-period sequencing with time connectors.' },
    { packId: 'L2-05-school-activities', contributes: 'vocabulary', note: 'Beyond-class activities: club, assembly, game, competition.' },
    { packId: 'L1-08-interests-leisure', contributes: 'vocabulary', note: 'The "what I love" anchor - the one subject or activity that makes school worthwhile.' },
    { packId: 'L1-05-numbers-time', contributes: 'structure', note: 'Time markers: सुबह आठ बजे, दोपहर के बाद, छुट्टी के समय.' },
  ],
  versions: [
    {
      label: 'novice',
      hindi:
        'मेरे स्कूल का नाम लिंकन मिडिल स्कूल है। मैं रोज़ सुबह आठ बजे स्कूल जाती हूँ। कल हमारी विज्ञान की परीक्षा थी। मैंने बहुत मेहनत की थी। परीक्षा के बाद हम खेल के मैदान में गए। वहाँ हमने क्रिकेट खेला। मेरी टीम जीत गई। फिर हम असेंबली में गए। प्रिंसिपल ने हमें बधाई दी। मैं घर बहुत खुश होकर गई। मुझे यह दिन याद रहेगा।',
      // Male-speaker variant. Two speaker-as-self verbs change:
      //   जाती हूँ → जाता हूँ (habitual present, intransitive जाना)
      //   खुश होकर गई → खुश होकर गया (perfective past, intransitive जाना)
      // "मेहनत की थी" stays — agrees with मेहनत (feminine noun), not speaker.
      // "टीम जीत गई" agrees with टीम (feminine), unaffected by speaker.
      hindiMale:
        'मेरे स्कूल का नाम लिंकन मिडिल स्कूल है। मैं रोज़ सुबह आठ बजे स्कूल जाता हूँ। कल हमारी विज्ञान की परीक्षा थी। मैंने बहुत मेहनत की थी। परीक्षा के बाद हम खेल के मैदान में गए। वहाँ हमने क्रिकेट खेला। मेरी टीम जीत गई। फिर हम असेंबली में गए। प्रिंसिपल ने हमें बधाई दी। मैं घर बहुत खुश होकर गया। मुझे यह दिन याद रहेगा।',
      transliteration:
        'mere school kaa naam linkan middle school hai. main roz subah aath baje school jaati hoon. kal hamaari vigyaan ki pareekshaa thi. maine bahut mehnat ki thi. pareekshaa ke baad ham khel ke maidaan mein gaye. vahaan hamne kriket khelaa. meri team jeet gayi. phir ham asembli mein gaye. prinsipal ne hamen badhaayi di. main ghar bahut khush hokar gayi. mujhe yah din yaad rahegaa.',
      english:
        "My school's name is Lincoln Middle School. Every day I go to school at 8 a.m. Yesterday we had our science exam. I had studied a lot. After the exam we went to the playground. There we played cricket. My team won. Then we went to assembly. The principal congratulated us. I went home very happy. I will remember this day.",
      wordCount: 118,
      tensesUsed: ['present', 'past', 'future'],
      connectorsUsed: ['phir'],
      targetBenchmark: 3,
    },
    {
      label: 'intermediateMid',
      hindi:
        'मेरा स्कूल "लिंकन मिडिल" हमारे घर से सिर्फ़ दस मिनट की दूरी पर है, और मैं रोज़ सुबह आठ बजे वहाँ पहुँच जाती हूँ। आम तौर पर मेरा दिन बहुत सामान्य रहता है - पहले गणित, फिर विज्ञान, और दोपहर के बाद इतिहास - लेकिन पिछले शुक्रवार की बात अलग थी। उस दिन हमारी वार्षिक विज्ञान मेले की प्रतियोगिता थी, और मैं हफ़्तों से अपना रोबोट तैयार कर रही थी।\n\nजब मैं सुबह कक्षा में पहुँची, तब मेरा दिल तेज़ धड़क रहा था। मेरे दोस्त रिया ने मुझे देखकर कहा, "घबरा मत, तेरा रोबोट सबसे बढ़िया है।" पहली घंटी बजते ही हमने हॉल में अपना प्रोजेक्ट लगाया। अध्यापकों और अभिभावकों ने सब कुछ ध्यान से देखा, और जब हमारी बारी आई, तब मैंने अपने रोबोट के बारे में अंग्रेज़ी और हिंदी दोनों में बताया। अंत में जजों ने जब हमारी टीम का नाम पुकारा, तब मैं खुशी से चिल्ला पड़ी। हमें पहला इनाम मिला!\n\nमुझे लगता है कि वह दिन मुझे इसलिए याद रहेगा क्योंकि मैंने सीखा कि मेहनत और दोस्तों का साथ - दोनों ज़रूरी हैं। अगले साल मैं और भी बड़ा प्रोजेक्ट बनाने की कोशिश करूँगी, और शायद इस बार पूरी कक्षा को शामिल करूँगी।',
      // Male-speaker variant. Speaker-as-self verb forms change throughout:
      //   पहुँच जाती हूँ → पहुँच जाता हूँ
      //   तैयार कर रही थी → तैयार कर रहा था (past continuous)
      //   पहुँची → पहुँचा (perfective past, intransitive)
      //   चिल्ला पड़ी → चिल्ला पड़ा
      //   कोशिश करूँगी → कोशिश करूँगा (future)
      //   शामिल करूँगी → शामिल करूँगा (future)
      // Other agreements unchanged: "बात अलग थी" (बात fem.), "टीम का नाम
      // पुकारा" (नाम masc.), "मैंने ... बताया" (transitive ne, default masc.).
      hindiMale:
        'मेरा स्कूल "लिंकन मिडिल" हमारे घर से सिर्फ़ दस मिनट की दूरी पर है, और मैं रोज़ सुबह आठ बजे वहाँ पहुँच जाता हूँ। आम तौर पर मेरा दिन बहुत सामान्य रहता है - पहले गणित, फिर विज्ञान, और दोपहर के बाद इतिहास - लेकिन पिछले शुक्रवार की बात अलग थी। उस दिन हमारी वार्षिक विज्ञान मेले की प्रतियोगिता थी, और मैं हफ़्तों से अपना रोबोट तैयार कर रहा था।\n\nजब मैं सुबह कक्षा में पहुँचा, तब मेरा दिल तेज़ धड़क रहा था। मेरे दोस्त रिया ने मुझे देखकर कहा, "घबरा मत, तेरा रोबोट सबसे बढ़िया है।" पहली घंटी बजते ही हमने हॉल में अपना प्रोजेक्ट लगाया। अध्यापकों और अभिभावकों ने सब कुछ ध्यान से देखा, और जब हमारी बारी आई, तब मैंने अपने रोबोट के बारे में अंग्रेज़ी और हिंदी दोनों में बताया। अंत में जजों ने जब हमारी टीम का नाम पुकारा, तब मैं खुशी से चिल्ला पड़ा। हमें पहला इनाम मिला!\n\nमुझे लगता है कि वह दिन मुझे इसलिए याद रहेगा क्योंकि मैंने सीखा कि मेहनत और दोस्तों का साथ - दोनों ज़रूरी हैं। अगले साल मैं और भी बड़ा प्रोजेक्ट बनाने की कोशिश करूँगा, और शायद इस बार पूरी कक्षा को शामिल करूँगा।',
      transliteration:
        'meraa school "linkan middle" hamaare ghar se sirf das minat ki dooree par hai, aur main roz subah aath baje vahaan pahunch jaati hoon. aam taur par meraa din bahut saamaany rahtaa hai - pahle ganit, phir vigyaan, aur dopahar ke baad itihaas - lekin pichhle shukravaar ki baat alag thi. us din hamaari vaarshik vigyaan mele ki pratiyogitaa thi, aur main hafton se apnaa robot taiyaar kar rahi thi.\n\njab main subah kakshaa mein pahunchi, tab meraa dil tez dhadak rahaa thaa. mere dost riyaa ne mujhe dekhkar kahaa, "ghabraa mat, teraa robot sabse badhiyaa hai." pahli ghanti bajte hi hamne hol mein apnaa project lagaayaa. adhyaapakon aur abhibhaavakon ne sab kuchh dhyaan se dekhaa, aur jab hamaari baari aayi, tab maine apne robot ke baare mein angrezi aur hindi donon mein bataayaa. ant mein jajon ne jab hamaari team kaa naam pukaaraa, tab main khushi se chillaa padi. hamen pahlaa inaam milaa!\n\nmujhe lagtaa hai ki vah din mujhe isliye yaad rahegaa kyonki maine seekhaa ki mehnat aur doston kaa saath - donon zaroori hain. agle saal main aur bhi badaa project banaane ki koshish karoongi, aur shaayad is baar poori kakshaa ko shaamil karoongi.',
      english:
        "My school Lincoln Middle is only ten minutes from home, and I get there every morning by 8. Normally my day is very ordinary - first math, then science, and history after lunch - but last Friday was different. That day was our annual science fair competition, and I had been preparing my robot for weeks.\n\nWhen I walked into class that morning, my heart was pounding. My friend Riya looked at me and said, \"Don't be nervous - your robot is the best.\" As soon as the first bell rang we set up our project in the hall. Teachers and parents looked at everything carefully, and when our turn came, I presented my robot in both English and Hindi. Finally, when the judges called out our team's name, I screamed with joy. We won first prize!\n\nI think that day will stay with me because I learned that hard work and the support of friends - both matter. Next year I will try to build an even bigger project, and maybe this time I will include the whole class.",
      wordCount: 250,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'pahle', 'phir', 'antMein', 'kyonki', 'isliye'],
      targetBenchmark: 5,
    },
    {
      label: 'push',
      hindi:
        'मेरा स्कूल "लिंकन मिडिल" हमारे घर से सिर्फ़ दस मिनट की दूरी पर है, और मैं रोज़ सुबह आठ बजे वहाँ पहुँच जाती हूँ। आम तौर पर मेरा दिन बहुत सामान्य रहता है - पहले गणित, फिर विज्ञान, और दोपहर के बाद इतिहास - लेकिन पिछले शुक्रवार की बात बिल्कुल अलग थी। उस दिन हमारी वार्षिक विज्ञान मेले की प्रतियोगिता थी, और मैं पिछले तीन हफ़्तों से अपना रोबोट तैयार कर रही थी; कई बार ऐसा भी लगा कि यह कभी काम नहीं करेगा।\n\nजब मैं सुबह कक्षा में पहुँची, तब मेरा दिल इतनी तेज़ धड़क रहा था कि मैं ठीक से साँस भी नहीं ले पा रही थी। मेरी सबसे अच्छी सहेली रिया ने हँसकर कहा, "घबरा मत, तेरा रोबोट सबसे बढ़िया है - मुझे पूरा भरोसा है।" पहली घंटी बजते ही हमने हॉल में अपना प्रोजेक्ट लगाया। अध्यापक और अभिभावक सब कुछ बहुत ध्यान से देख रहे थे, और जब हमारी बारी आई, तब मैंने अपने रोबोट के बारे में अंग्रेज़ी और हिंदी दोनों में समझाया। हालाँकि पहले मैं काँप रही थी, बोलते-बोलते मेरा आत्मविश्वास लौट आया। अंत में जजों ने जब हमारी टीम का नाम पुकारा, तब मैं खुशी से चिल्ला पड़ी - हमें पहला इनाम मिला!\n\nमेरा मानना है कि वह दिन मुझे इसलिए हमेशा याद रहेगा क्योंकि उस दिन मैंने सिर्फ़ विज्ञान ही नहीं, बल्कि खुद के बारे में भी कुछ सीखा - कि मेहनत अकेले नहीं, दोस्तों का विश्वास भी ज़रूरी है। अगर मुझे अगले साल फिर से मौका मिले, तो मैं एक और भी बड़ा प्रोजेक्ट बनाऊँगी और इस बार शायद पूरी कक्षा को अपनी टीम में शामिल करूँगी - क्योंकि जीत अकेले नहीं, साथ में ज़्यादा मीठी लगती है।',
      // Male-speaker variant. Speaker-as-self verbs change throughout:
      //   पहुँच जाती हूँ → पहुँच जाता हूँ
      //   तैयार कर रही थी → तैयार कर रहा था
      //   पहुँची → पहुँचा
      //   ले पा रही थी → ले पा रहा था
      //   काँप रही थी → काँप रहा था
      //   चिल्ला पड़ी → चिल्ला पड़ा
      //   बनाऊँगी → बनाऊँगा
      //   करूँगी → करूँगा
      // Also: "मेरी सबसे अच्छी सहेली रिया" → "मेरी सबसे अच्छी दोस्त रिया".
      // सहेली specifically denotes a girl's female friend; a male speaker
      // uses the gender-neutral दोस्त (still feminine-agreeing modifier
      // here, "मेरी अच्छी दोस्त", because Riya is female).
      hindiMale:
        'मेरा स्कूल "लिंकन मिडिल" हमारे घर से सिर्फ़ दस मिनट की दूरी पर है, और मैं रोज़ सुबह आठ बजे वहाँ पहुँच जाता हूँ। आम तौर पर मेरा दिन बहुत सामान्य रहता है - पहले गणित, फिर विज्ञान, और दोपहर के बाद इतिहास - लेकिन पिछले शुक्रवार की बात बिल्कुल अलग थी। उस दिन हमारी वार्षिक विज्ञान मेले की प्रतियोगिता थी, और मैं पिछले तीन हफ़्तों से अपना रोबोट तैयार कर रहा था; कई बार ऐसा भी लगा कि यह कभी काम नहीं करेगा।\n\nजब मैं सुबह कक्षा में पहुँचा, तब मेरा दिल इतनी तेज़ धड़क रहा था कि मैं ठीक से साँस भी नहीं ले पा रहा था। मेरी सबसे अच्छी दोस्त रिया ने हँसकर कहा, "घबरा मत, तेरा रोबोट सबसे बढ़िया है - मुझे पूरा भरोसा है।" पहली घंटी बजते ही हमने हॉल में अपना प्रोजेक्ट लगाया। अध्यापक और अभिभावक सब कुछ बहुत ध्यान से देख रहे थे, और जब हमारी बारी आई, तब मैंने अपने रोबोट के बारे में अंग्रेज़ी और हिंदी दोनों में समझाया। हालाँकि पहले मैं काँप रहा था, बोलते-बोलते मेरा आत्मविश्वास लौट आया। अंत में जजों ने जब हमारी टीम का नाम पुकारा, तब मैं खुशी से चिल्ला पड़ा - हमें पहला इनाम मिला!\n\nमेरा मानना है कि वह दिन मुझे इसलिए हमेशा याद रहेगा क्योंकि उस दिन मैंने सिर्फ़ विज्ञान ही नहीं, बल्कि खुद के बारे में भी कुछ सीखा - कि मेहनत अकेले नहीं, दोस्तों का विश्वास भी ज़रूरी है। अगर मुझे अगले साल फिर से मौका मिले, तो मैं एक और भी बड़ा प्रोजेक्ट बनाऊँगा और इस बार शायद पूरी कक्षा को अपनी टीम में शामिल करूँगा - क्योंकि जीत अकेले नहीं, साथ में ज़्यादा मीठी लगती है।',
      transliteration:
        'meraa school "linkan middle" hamaare ghar se sirf das minat ki dooree par hai, aur main roz subah aath baje vahaan pahunch jaati hoon. aam taur par meraa din bahut saamaany rahtaa hai - pahle ganit, phir vigyaan, aur dopahar ke baad itihaas - lekin pichhle shukravaar ki baat bilkul alag thi. us din hamaari vaarshik vigyaan mele ki pratiyogitaa thi, aur main pichhle teen hafton se apnaa robot taiyaar kar rahi thi; kai baar aisaa bhi lagaa ki yah kabhi kaam nahin karegaa.\n\njab main subah kakshaa mein pahunchi, tab meraa dil itni tez dhadak rahaa thaa ki main theek se saans bhi nahin le paa rahi thi. meri sabse achhi saheli riyaa ne hanskar kahaa, "ghabraa mat, teraa robot sabse badhiyaa hai - mujhe pooraa bharosaa hai." pahli ghanti bajte hi hamne hol mein apnaa project lagaayaa. adhyaapak aur abhibhaavak sab kuchh bahut dhyaan se dekh rahe the, aur jab hamaari baari aayi, tab maine apne robot ke baare mein angrezi aur hindi donon mein samjhaayaa. haalaanki pahle main kaanp rahi thi, bolte-bolte meraa aatmavishvaas laut aayaa. ant mein jajon ne jab hamaari team kaa naam pukaaraa, tab main khushi se chillaa padi - hamen pahlaa inaam milaa!\n\nmeraa maannaa hai ki vah din mujhe isliye hameshaa yaad rahegaa kyonki us din maine sirf vigyaan hi nahin, balki khud ke baare mein bhi kuchh seekhaa - ki mehnat akele nahin, doston kaa vishvaas bhi zaroori hai. agar mujhe agle saal phir se maukaa mile, to main ek aur bhi badaa project banaaoongi aur is baar shaayad poori kakshaa ko apni team mein shaamil karoongi - kyonki jeet akele nahin, saath mein zyaadaa meethi lagti hai.',
      english:
        "My school Lincoln Middle is only ten minutes from home, and I get there every morning by 8. Normally my day is very ordinary - first math, then science, and history after lunch - but last Friday was totally different. That day was our annual science fair competition, and I had been preparing my robot for the past three weeks; several times I even felt that it would never work.\n\nWhen I walked into class that morning, my heart was pounding so hard I couldn't breathe properly. My best friend Riya laughed and said, \"Don't be nervous - your robot is the best. I'm completely sure.\" As soon as the first bell rang we set up our project in the hall. Teachers and parents were watching everything very carefully, and when our turn came, I explained my robot in both English and Hindi. Although I was trembling at first, as I kept speaking my confidence came back. Finally, when the judges called out our team's name, I screamed with joy - we won first prize!\n\nI believe that day will always stay with me because I learned not just about science but something about myself - that effort alone isn't enough; a friend's belief matters too. If I get the chance next year, I will build an even bigger project, and this time maybe I will include the whole class on my team - because victory shared with others tastes sweeter than victory alone.",
      wordCount: 325,
      tensesUsed: ['past', 'present', 'future'],
      connectorsUsed: ['lekin', 'jabTab', 'pahle', 'phir', 'antMein', 'kyonki', 'isliye', 'halaanki', 'agarTo', 'meraManna', 'sirfNahiBalki'],
      targetBenchmark: 6,
    },
  ],
  annotations: [
    { paragraphIndex: 0, kind: 'structure', highlight: 'आम तौर पर ... लेकिन ... अलग थी', note: 'Sets up "normal vs special" contrast. Rater immediately sees this is a narrative, not a schedule.' },
    { paragraphIndex: 0, kind: 'connector', highlight: 'पहले गणित, फिर विज्ञान, और दोपहर के बाद इतिहास', note: 'Three time connectors in one sentence - compact, exam-efficient sequencing.' },
    { paragraphIndex: 0, kind: 'tense-shift', highlight: 'मैं हफ़्तों से तैयार कर रही थी', note: 'Past continuous - a subtle but scored marker of Language Control at IM level.' },
    { paragraphIndex: 1, kind: 'connector', highlight: 'जब मैं ... तब मेरा दिल', note: 'जब...तब dependent clause. This is the single most reliable Intermediate-Mid signal in narrative Hindi.' },
    { paragraphIndex: 1, kind: 'cultural', highlight: 'अंग्रेज़ी और हिंदी दोनों में बताया', note: 'Bilingual detail authentic to American-Indian immigrant school life - cultural specificity at zero cost.' },
    { paragraphIndex: 1, kind: 'structure', highlight: 'पहली घंटी बजते ही', note: 'Non-finite clause with -ते ही - syntactic variety that separates IM from IL essays.' },
    { paragraphIndex: 1, kind: 'vocab', highlight: 'रोबोट ... प्रोजेक्ट ... इनाम', note: 'Topic-specific vocabulary (science fair register). Rubric rewards this concreteness under Topic Coverage.' },
    { paragraphIndex: 2, kind: 'structure', highlight: 'मुझे लगता है कि ... इसलिए ... क्योंकि', note: 'Opinion stance + cause reasoning - the classic IM reflective close.' },
    { paragraphIndex: 2, kind: 'tense-shift', highlight: 'मैं ... कोशिश करूँगी', note: 'Future tense closer. Essay now spans past (Friday), present (reflection), and future (intention) - Benchmark 5 threshold crossed.' },
    { paragraphIndex: 2, kind: 'connector', highlight: 'और शायद इस बार', note: 'Hedging with शायद shows Language Control awareness - not all futures are certain.' },
  ],
  verdict: {
    predictedBenchmark: 5,
    predictedCredit: 'IntermediateMid_3cr',
    whyItPasses: [
      'Three cohesive paragraphs with an arc: ordinary → special → reflection. Text-Type at Benchmark 5: connected sentences that cannot be rearranged.',
      'Past (पहुँची, पुकारा, मिला), present (रहता है, मुझे लगता है), and future (कोशिश करूँगी, शामिल करूँगी) all used accurately. Language Control shows "some control of past, present, and future time frames" - the B5 language.',
      'Seven different connectors (लेकिन, जब...तब, पहले, फिर, अंत में, क्योंकि, इसलिए). Sentences are linked - the IM test.',
      'Topic-specific vocabulary (गणित, विज्ञान, कक्षा, मेले, प्रतियोगिता, रोबोट, इनाम) across the school domain, tagged by L1-07 and L2-05. Topic Coverage: strong.',
      'A concrete scene (first bell, setting up in the hall, announcing the team name) gives the rater something to mark as specific detail.',
    ],
    gotchas: [
      'If a student drops the शुक्रवार time anchor, the essay reads as a schedule not a memory - Text-Type drops to IL.',
      'Common slip: writing अभिभावक as अभिभावकों without the oblique plural - Language Control dock.',
      'If "मुझे लगता है कि" is omitted in the close, the reflective tone is lost and the essay reads more like Benchmark 4.',
    ],
  },
  readerQuestions: [
    { q: 'लेखिका के स्कूल का नाम क्या है?', a: 'लेखिका के स्कूल का नाम "लिंकन मिडिल" है।' },
    { q: 'पिछले शुक्रवार को कौन-सी प्रतियोगिता थी?', a: 'पिछले शुक्रवार को वार्षिक विज्ञान मेले की प्रतियोगिता थी।' },
    { q: 'रिया ने लेखिका से क्या कहा?', a: 'रिया ने कहा, "घबरा मत, तेरा रोबोट सबसे बढ़िया है।"' },
    { q: 'लेखिका ने अपना प्रोजेक्ट किन भाषाओं में पेश किया?', a: 'उसने अंग्रेज़ी और हिंदी - दोनों भाषाओं में पेश किया।' },
    { q: 'अगले साल लेखिका क्या करने की सोच रही है?', a: 'वह एक और बड़ा प्रोजेक्ट बनाने और पूरी कक्षा को टीम में शामिल करने की सोच रही है।' },
  ],
  teacherNote: {
    why:
      'C05 is the mid-point quality anchor of the capstone series. It lands between "family restaurant memory" (C01, emotional) and "grandmother conversation" (C08, cultural) and grounds the student in their own school life - the most reliable domain for Benchmark 5 output. Any student who can replicate this essay\'s shape on their own school day has crossed the IM threshold.',
    trains: ['TextType', 'LanguageControl', 'TopicCoverage'],
    examLink:
      'STAMP rubric - "connected sentences with transitions and groupings of ideas" + "some control of past, present, and future time frames" → Benchmark 5 = 3 FCPS credits.',
  },
  status: 'shipped',
  version: 1,
};
