import { useEffect, useState } from 'react'
import { BookOpen, Headphones, Brain, Search, GraduationCap, Bookmark, ChevronRight, Menu, X, CircleHelp, Sparkles, Volume2, Languages } from 'lucide-react'

const units = [
  ['01','Foundations of Sarf','Days 1–6','Understand morphology, Arabic word structure, and what a root really is.','4 lessons drafted'],
  ['02','The Morphological Scale','Days 7–12','Learn الميزان الصرفي and how words are weighed against ف ع ل.','1 lesson drafted'],
  ['03','The Fourteen Forms','Days 13–22','Build confidence with pronouns, conjugation, person, number, and gender.','6 lessons drafted'],
  ['04','The Six Common Abwāb','Days 23–30','Recognise common past-to-present verb patterns.','1 lesson drafted'],
  ['05','Mujarrad and Mazīd','Days 31–38','See how additional letters create related verb forms.','1 lesson drafted'],
  ['06','Derived Nouns','Days 39–45','Understand maṣdar, active/passive participles, and more.','Coming next'],
  ['07','Sound and Weak Verbs','Days 46–53','Explore sound, weak, hamzated, and doubled verb categories.','Coming next'],
  ['08','Apply, Analyse, Teach','Days 54–60','Analyse real words and explain what you have learned.','Coming next'],
] as const
const navItems = [
  {label:'Learn',icon:BookOpen},{label:'Listen',icon:Headphones},{label:'Practice',icon:Brain},
  {label:'Explore',icon:Search},{label:'Revise',icon:Bookmark},{label:'Teach',icon:GraduationCap},
]

type Language = 'en' | 'fa' | 'ur'
const lessonCopy = {
  en: {
    lead: "Before we learn to change Arabic words, let's understand what we are studying, why it matters, and how to look at a word.",
    objective: 'By the end, you should be able to explain what Sarf studies, distinguish it from Nahw, and identify the three root consonants in a familiar word.',
    objectiveTitle: 'Your learning goals',
    definition: 'Sarf is the study of the structure of Arabic words and the changes in their forms. It helps us understand how words are built and how related forms express related meanings.',
    whyTitle: 'Why does this matter?',
    why: 'When you meet an unfamiliar Arabic word, recognising its root and form can give you a useful first clue about its meaning and grammatical shape. It is a clue—not a substitute for a dictionary, context, or tafsir.',
    sarfTitle: 'The word itself',
    sarfDesc: 'How is this word formed? What is its pattern? Is it a past verb, a present verb, or a derived noun?',
    nahwTitle: 'The word in a sentence',
    nahwDesc: 'What role does the word play here? How does it relate to the other words, and what happens to its ending?',
    compare: "A simple first distinction: Sarf focuses on word formation and form changes; Nahw focuses on how words function in a sentence. The two sciences work together.",
    familyIntro: 'These examples belong to the ك ت ب word family. Their forms and meanings differ, but they are connected with the broad idea of writing.',
    rootNote: 'This example has a three-letter (triliteral) root. Arabic also has four-letter roots, which we will study later. The short vowel marks (fatḥah, kasrah, ḍammah) guide pronunciation and help distinguish forms; they are not additional root consonants.',
    kitābQuestion: 'Are كَتَبَ and كِتَابٌ the same word?',
    kitābAnswer: 'No. كَتَبَ (kataba) is a verb: “he wrote”. كِتَابٌ (kitābun) is a noun: “a book”. They share the root ك ت ب, but they are different words with different patterns and grammatical categories.',
    patternCaution: 'Important: a root does not have one exact English translation that can simply be inserted into every related word. Each word has its own established meaning, and context matters.',
    practiceTitle: 'Check your understanding',
    practicePrompt: 'Which option shows the three root consonants in كَتَبَ?',
    options: ['كَ · تَ · بَ (with vowel marks)','ك · ت · ب (the consonant letters)','The whole word كَتَبَ is one root letter'],
    check: 'Check answer',
    correct: 'Correct. The root consonants are kāf (ك), tāʾ (ت), and bāʾ (ب). The short vowels are marks, not extra root consonants.',
    incorrect: 'Not quite. Identify the three consonant letters: kāf, tāʾ, and bāʾ. The small vowel marks are not separate root consonants.',
    teachTitle: 'Teach it back',
    teach: 'Without looking above, explain the difference between Sarf and Nahw. Then explain why كَتَبَ and كِتَابٌ are related but not identical.',
    audio: 'Verified human pronunciation recordings are not available yet. We will not present browser-generated speech as authoritative Arabic pronunciation.',
    sourceTitle: 'Further reading and source notes',
    sourceNote: 'These references support the introductory linguistic distinction and root-and-pattern explanation. They are not page references to the Hawza textbooks listed in the course plan.',
    next: 'Next lesson: word categories (كَلِمَة، اِسْم، فِعْل، حَرْف)',
  },
  fa: {
    lead: 'پیش از آن‌که تغییر شکل واژه‌های عربی را بیاموزیم، ابتدا ببینیم صرف چیست، چرا آن را می‌خوانیم و چگونه به یک واژه نگاه می‌کنیم.',
    objective: 'در پایان این درس بتوانید موضوع علم صرف را توضیح دهید، آن را از علم نحو جدا کنید و سه حرف اصلی ریشهٔ یک واژهٔ آشنا را تشخیص دهید.',
    objectiveTitle: 'هدف‌های یادگیری',
    definition: 'صرف دانشی است که ساختار واژه‌های عربی و تغییر صورت آن‌ها را بررسی می‌کند. با آن می‌آموزیم واژه‌ها چگونه ساخته می‌شوند و صورت‌های مرتبط چگونه معناهای مرتبطی می‌رسانند.',
    whyTitle: 'چرا این دانش مهم است؟',
    why: 'وقتی با واژه‌ای ناآشنا روبه‌رو می‌شوید، شناخت ریشه و قالب آن می‌تواند سرنخی برای فهم معنا و ساخت دستوری‌اش باشد؛ اما جای فرهنگ لغت، سیاق و تفسیر را نمی‌گیرد.',
    sarfTitle: 'خودِ واژه',
    sarfDesc: 'این واژه چگونه ساخته شده است؟ وزن آن چیست؟ فعل ماضی است، مضارع است یا اسمِ مشتق؟',
    nahwTitle: 'واژه در جمله',
    nahwDesc: 'این واژه در جمله چه نقشی دارد؟ با واژه‌های دیگر چه ارتباطی دارد و حرکت پایانی آن چگونه تعیین می‌شود؟',
    compare: 'به‌طور ساده: صرف به ساخت و دگرگونی صورت واژه می‌پردازد؛ نحو نقش واژه‌ها و ارتباط آن‌ها را در جمله بررسی می‌کند. این دو دانش مکمل یکدیگرند.',
    familyIntro: 'نمونه‌های زیر از خانوادهٔ ریشهٔ ک ت ب هستند. صورت و معنای آن‌ها یکسان نیست، اما با مفهوم گستردهٔ نوشتن ارتباط دارند.',
    rootNote: 'ریشهٔ این نمونه سه‌حرفی است. در عربی ریشه‌های چهارحرفی نیز وجود دارند که بعداً می‌آموزیم. حرکت‌های کوتاه (فتحه، کسره و ضمه) راهنمای تلفظ و تمایز صورت‌ها هستند و حرفِ اصلیِ افزوده به ریشه نیستند.',
    kitābQuestion: 'آیا كَتَبَ و كِتَابٌ یک واژه‌اند؟',
    kitābAnswer: 'خیر. كَتَبَ (kataba) فعل و به معنای «او نوشت» است؛ كِتَابٌ (kitābun) اسم و به معنای «کتاب» است. هر دو ریشهٔ ک ت ب دارند، اما دو واژه با وزن و دستهٔ دستوری متفاوت‌اند.',
    patternCaution: 'نکتهٔ مهم: ریشه را نباید با یک ترجمهٔ ثابت در همهٔ واژه‌های هم‌ریشه جایگزین کرد. هر واژه معنای شناخته‌شدهٔ خود را دارد و سیاق نیز مهم است.',
    practiceTitle: 'آموختهٔ خود را بیازمایید',
    practicePrompt: 'کدام گزینه سه حرف اصلی ریشهٔ كَتَبَ را نشان می‌دهد؟',
    options: ['كَ · تَ · بَ (همراه با حرکت‌ها)','ك · ت · ب (حروف اصلی)','تمام واژهٔ كَتَبَ یک حرف ریشه است'],
    check: 'بررسی پاسخ',
    correct: 'درست است. حروف اصلی ریشه کاف (ك)، تاء (ت) و باء (ب) هستند. حرکت‌های کوتاه حرفِ اصلیِ جداگانه نیستند.',
    incorrect: 'هنوز نه. سه حرف صامت را پیدا کنید: کاف، تاء و باء. علامت‌های کوچکِ حرکت، حرف ریشهٔ جداگانه نیستند.',
    teachTitle: 'آن را آموزش دهید',
    teach: 'بدون نگاه‌کردن به متن، تفاوت صرف و نحو را توضیح دهید. سپس بگویید چرا كَتَبَ و كِتَابٌ هم‌ریشه‌اند، اما یک واژه نیستند.',
    audio: 'هنوز فایل‌های تلفظِ ضبط‌شده و تأییدشده در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
    sourceTitle: 'مطالعهٔ بیشتر و یادداشت منابع',
    sourceNote: 'این منابع برای توضیح مقدماتیِ تمایز صرف و نحو و مفهوم ریشه و وزن به‌کار رفته‌اند؛ این‌ها ارجاع صفحه‌ای به کتاب‌های حوزویِ معرفی‌شده در برنامهٔ درسی نیستند.',
    next: 'درس بعد: دسته‌های واژه (كَلِمَة، اِسْم، فِعْل، حَرْف)',
  },
  ur: {
    lead: 'عربی الفاظ کی شکلیں بدلنا سیکھنے سے پہلے یہ سمجھتے ہیں کہ صرف کیا ہے، اسے کیوں پڑھتے ہیں، اور کسی لفظ کا مطالعہ کیسے کرتے ہیں۔',
    objective: 'اس سبق کے اختتام پر آپ علمِ صرف کا موضوع بیان کر سکیں گے، اسے نحو سے الگ پہچان سکیں گے، اور ایک مانوس لفظ کے تین اصلی حروف معلوم کر سکیں گے۔',
    objectiveTitle: 'آپ کے تعلیمی مقاصد',
    definition: 'صرف عربی الفاظ کی ساخت اور ان کی صورتوں میں ہونے والی تبدیلیوں کا علم ہے۔ اس سے معلوم ہوتا ہے کہ الفاظ کیسے بنتے ہیں اور باہم متعلقہ صیغے کس طرح متعلقہ معانی ظاہر کرتے ہیں۔',
    whyTitle: 'یہ کیوں اہم ہے؟',
    why: 'کسی نئے عربی لفظ میں اس کی اصل اور وزن پہچاننا معنی اور صرفی ساخت سمجھنے کا ابتدائی اشارہ دے سکتا ہے؛ لیکن یہ لغت، سیاق یا تفسیر کا بدل نہیں ہے۔',
    sarfTitle: 'لفظ اپنی ذات میں',
    sarfDesc: 'یہ لفظ کیسے بنا؟ اس کا وزن کیا ہے؟ کیا یہ ماضی کا فعل ہے، مضارع ہے یا مشتق اسم؟',
    nahwTitle: 'جملے میں لفظ',
    nahwDesc: 'جملے میں اس لفظ کا کیا کردار ہے؟ دوسرے الفاظ سے اس کا کیا تعلق ہے، اور اس کے آخری اعراب پر کیا اثر پڑتا ہے؟',
    compare: 'ابتدائی فرق یہ ہے: صرف لفظ کی ساخت اور اس کی صورتوں کی تبدیلی کا مطالعہ کرتا ہے؛ نحو جملے میں الفاظ کے کردار اور باہمی تعلق کو دیکھتا ہے۔ دونوں علوم ایک دوسرے کی تکمیل کرتے ہیں۔',
    familyIntro: 'یہ مثالیں ک ت ب کے مادّے سے متعلق ہیں۔ ان کی صورتیں اور معانی الگ ہیں، لیکن سب کا تعلق لکھنے کے وسیع مفہوم سے ہے۔',
    rootNote: 'اس مثال کا مادّہ تین اصلی حروف پر مشتمل ہے۔ عربی میں چار حرفی مادّے بھی ہوتے ہیں جنہیں ہم آگے پڑھیں گے۔ مختصر حرکات (فتحہ، کسرہ، ضمہ) تلفظ اور صیغوں کے فرق کو ظاہر کرتی ہیں؛ یہ مادّے کے اضافی حروف نہیں ہیں۔',
    kitābQuestion: 'کیا كَتَبَ اور كِتَابٌ ایک ہی لفظ ہیں؟',
    kitābAnswer: 'نہیں۔ كَتَبَ (kataba) فعل ہے، یعنی ’’اس نے لکھا‘‘؛ كِتَابٌ (kitābun) اسم ہے، یعنی ’’کتاب‘‘۔ دونوں کا مادّہ ک ت ب ہے، مگر وزن اور نحوی قسم مختلف ہے۔',
    patternCaution: 'اہم بات: مادّے کے معنی کو ہر ہم مادّہ لفظ میں ایک ہی ترجمے کے طور پر نہیں رکھ سکتے۔ ہر لفظ کا اپنا معروف معنی ہے اور سیاق بھی اہم ہوتا ہے۔',
    practiceTitle: 'اپنی سمجھ جانچیں',
    practicePrompt: 'کون سا انتخاب كَتَبَ کے تین اصلی حروف دکھاتا ہے؟',
    options: ['كَ · تَ · بَ (حرکات کے ساتھ)','ك · ت · ب (اصلی حروف)','پورا لفظ كَتَبَ ایک ہی اصلی حرف ہے'],
    check: 'جواب دیکھیں',
    correct: 'درست۔ مادّے کے اصلی حروف کاف (ك)، تاء (ت) اور باء (ب) ہیں۔ مختصر حرکات الگ اصلی حروف نہیں ہیں۔',
    incorrect: 'ابھی درست نہیں۔ تین صحیح حروف پہچانیں: کاف، تاء اور باء۔ چھوٹی حرکات الگ مادّے کے حروف نہیں ہیں۔',
    teachTitle: 'دوسرے کو سمجھائیں',
    teach: 'اوپر دیکھے بغیر صرف اور نحو کا فرق بیان کریں۔ پھر بتائیں کہ كَتَبَ اور كِتَابٌ ایک مادّے سے ہونے کے باوجود ایک لفظ کیوں نہیں ہیں۔',
    audio: 'مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ ہم براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے۔',
    sourceTitle: 'مزید مطالعہ اور مآخذ',
    sourceNote: 'یہ مآخذ صرف و نحو کے ابتدائی فرق اور مادّہ و وزن کی وضاحت میں مدد دیتے ہیں؛ یہ نصاب میں مذکور حوزوی کتابوں کے صفحات کے حوالے نہیں ہیں۔',
    next: 'اگلا سبق: کلمہ کی اقسام (كَلِمَة، اِسْم، فِعْل، حَرْف)',
  },
} as const

function LessonPage() {
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answer,setAnswer] = useState('')
  const [showAnswer,setShowAnswer] = useState(false)
  const [language,setLanguage] = useState<Language>('en')
  const copy = lessonCopy[language]
  const rtl = language !== 'en'
  return <main className="lesson-page">
    <header className="lesson-header">
      <a href="#/" className="back-link">← Back to learning path</a>
      <span className="lesson-progress-label">UNIT 01 · LESSON 01</span>
    </header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">THE FIRST STEP · NO PRIOR KNOWLEDGE NEEDED</div>
        <h1>What is <em>Sarf?</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</div>
          {showTransliteration && <div className="lesson-translit" dir="ltr">ʿilm al-ṣarf</div>}
          <h2>The study of word forms</h2>
          <p lang={language}>{copy.definition}</p>
        <div className="term-glossary" aria-label="Key Sarf vocabulary">
          <div><b lang="ar" dir="rtl">الْجِذْرُ</b><strong>Root</strong><span>ریشه · مادّہ</span><small>al-jidhr</small></div>
          <div><b lang="ar" dir="rtl">الْوَزْنُ</b><strong>Pattern / scale</strong><span>وزن · وزن</span><small>al-wazn</small></div>
          <div><b lang="ar" dir="rtl">الصِّيغَةُ</b><strong>Form</strong><span>صیغه · صیغہ</span><small>aṣ-ṣīghah</small></div>
          <div><b lang="ar" dir="rtl">كَلِمَةٌ</b><strong>Word</strong><span>واژه · لفظ</span><small>kalimah</small></div>
        </div>
          <div className="objective-panel"><strong>{copy.objectiveTitle}</strong><p lang={language}>{copy.objective}</p></div>
          <h3 className="subheading">{copy.whyTitle}</h3><p lang={language}>{copy.why}</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">TWO COMPLEMENTARY LENSES</span>
          <h2>Sarf and Nahw: what is the difference?</h2>
          <div className="compare-grid">
            <div><span className="compare-label">الصَّرْفُ · SARF</span><h3>{copy.sarfTitle}</h3><p lang={language}>{copy.sarfDesc}</p></div>
            <div><span className="compare-label">النَّحْوُ · NAḤW</span><h3>{copy.nahwTitle}</h3><p lang={language}>{copy.nahwDesc}</p></div>
          </div>
          <p className="example-sentence" lang={language}>{copy.compare}</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">YOUR FIRST WORD FAMILY</span>
          <h2>Look closely at كَتَبَ</h2>
          <p lang={language}>{copy.familyIntro}</p>
          <div className="word-family">
            <div><b lang="ar" dir="rtl">كَتَبَ</b>{showTransliteration&&<span dir="ltr">kataba</span>}<small>he wrote</small></div>
            <div><b lang="ar" dir="rtl">يَكْتُبُ</b>{showTransliteration&&<span dir="ltr">yaktubu</span>}<small>he writes</small></div>
            <div><b lang="ar" dir="rtl">كَاتِبٌ</b>{showTransliteration&&<span dir="ltr">kātibun</span>}<small>a writer</small></div>
            <div><b lang="ar" dir="rtl">مَكْتُوبٌ</b>{showTransliteration&&<span dir="ltr">maktūbun</span>}<small>written</small></div>
            <div><b lang="ar" dir="rtl">كِتَابَةٌ</b>{showTransliteration&&<span dir="ltr">kitābatun</span>}<small>writing</small></div>
            <div><b lang="ar" dir="rtl">مَكْتَبٌ</b>{showTransliteration&&<span dir="ltr">maktabun</span>}<small>office / desk</small></div>
          </div>
          <div className="root-callout"><span>THE ROOT CONSONANTS · الْحُرُوفُ الْأَصْلِيَّةُ</span><strong lang="ar" dir="rtl">ك · ت · ب</strong><p>{copy.rootNote}</p></div>
          <div className="caution-note" lang={language}>{copy.patternCaution}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A QUESTION BEGINNERS OFTEN ASK</span>
          <h2>{copy.kitābQuestion}</h2>
          <p lang={language}>{copy.kitābAnswer}</p>
          <div className="mini-example"><b lang="ar" dir="rtl">كَتَبَ</b><span>Verb · فعل</span><b lang="ar" dir="rtl">كِتَابٌ</b><span>Noun · اسم</span></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">CHECK YOUR UNDERSTANDING</span>
          <h2>{copy.practiceTitle}</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="answer-options">
            {copy.options.map((v,i)=><button key={i} dir={rtl?'rtl':'ltr'} className={answer===String(i)?'answer-option chosen':'answer-option'} onClick={()=>{setAnswer(String(i));setShowAnswer(false)}}>{v}</button>)}
          </div>
          <button className="primary-button" disabled={!answer} onClick={()=>setShowAnswer(true)}>{copy.check}</button>
          {showAnswer&&<p className={answer==='1'?'answer-feedback correct':'answer-feedback'}>{answer==='1'?copy.correct:copy.incorrect}</p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">SAY IT BACK</span>
          <h2>{copy.teachTitle}</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="audio-unavailable"><Volume2 size={16}/>{copy.audio}</div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>{copy.sourceTitle}</h2>
          <p lang={language}>{copy.sourceNote}</p>
          <ul>
            <li><a href="https://academic.oup.com/edited-volume/44744/chapter-abstract/380148608" target="_blank" rel="noreferrer">Ramzi Baalbaki, “Arabic Linguistic Tradition I: Naḥw and ṣarf,” The Oxford Handbook of Arabic Linguistics (2013).</a></li>
            <li><a href="https://academic.oup.com/edited-volume/44744/chapter-abstract/380148475" target="_blank" rel="noreferrer">Robert R. Ratcliffe, “Morphology,” The Oxford Handbook of Arabic Linguistics (2013).</a></li>
            <li><a href="https://corpus.quran.com/qurandictionary.jsp?q=ktb" target="_blank" rel="noreferrer">The Quranic Arabic Corpus — dictionary entry for the root ك ت ب.</a></li>
            <li><a href="https://corpus.quran.com/documentation/morphologicalfeatures.jsp" target="_blank" rel="noreferrer">The Quranic Arabic Corpus — documentation on roots, lemmas, and morphological features.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/">Return to the learning path</a><a className="next-lesson-link" href="#/lesson/02">{copy.next} →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>What Sarf studies</li><li>Sarf vs Nahw</li><li>Root letters and patterns</li><li>A first word family</li><li>Quick practice</li><li>Teach-back</li><li>Sources</li></ol><div className="aside-note"><strong>Study tip</strong><p>Take your time. Read the Arabic aloud, then say the explanation without looking.</p></div></aside>
    </div>
  </main>
}


const lessonTwoCopy = {
  en: {
    lead: 'Every Arabic word belongs to a category. Before we conjugate verbs, we need to recognise the three basic kinds of word used in traditional Arabic grammar.',
    objective: 'You will learn the names of the three categories, recognise their basic meanings, and classify familiar examples.',
    definition: 'In this lesson, كَلِمَةٌ (kalimah) means a single word. Traditional Arabic grammar classifies words into three broad kinds: اِسْمٌ, فِعْلٌ, and حَرْفٌ.',
    ism: 'An ism gives a meaning without tying that meaning to a time. It includes much more than people’s names: objects, people, qualities, ideas, pronouns, and many other nominal words.',
    fiil: 'A fiʿl gives a meaning connected with time. A verb may describe an action or a state. Arabic verbs have different forms, including past, present/imperfect, and command.',
    harf: 'A ḥarf in this classification is a particle or function word. Its role becomes clear through its relationship with other words. Examples include “in”, “from”, and “to”.',
    ismExample: 'كِتَابٌ — a book · بَيْتٌ — a house · مَاءٌ — water',
    ismExampleWithTranslit: 'كِتَابٌ (kitābun) — a book · بَيْتٌ (baytun) — a house · مَاءٌ (māʾun) — water',
    fiilExample: 'كَتَبَ — he wrote · يَكْتُبُ — he writes · اُكْتُبْ — write!',
    fiilExampleWithTranslit: 'كَتَبَ (kataba) — he wrote · يَكْتُبُ (yaktubu) — he writes · اُكْتُبْ (uktub) — write!',
    harfExample: 'فِي — in · مِنْ — from · إِلَى — to',
    harfExampleWithTranslit: 'فِي (fī) — in · مِنْ (min) — from · إِلَى (ilā) — to',
    warningTitle: 'Two common confusions',
    letterWarning: 'Here حَرْفٌ means a grammatical particle, not one of the alphabet letters such as ب or ت. The same Arabic word can be used in different technical senses; context tells you which sense is intended.',
    nameWarning: 'اِسْمٌ does not mean only a person’s proper name. كِتَابٌ (book), بَيْتٌ (house), and جَمِيلٌ (beautiful) are also examples of ism.',
    translationWarning: 'Do not force Arabic categories into English parts of speech one-to-one. For example, adjectives and pronouns are included within the broad category of ism in traditional Arabic grammar.',
    wordSentence: 'A كَلِمَةٌ is one word. A جُمْلَةٌ is a sentence. For example, كَتَبَ is one word; كَتَبَ مُحَمَّدٌ (“Muhammad wrote”) is a complete sentence.',
    practicePrompt: 'Classify each Arabic word as an اِسْمٌ (noun), فِعْلٌ (verb), or حَرْفٌ (particle).',
    correct: 'Correct classification.',
    incorrect: 'Review this one. The correct category is',
    score: 'Your score',
    check: 'Check classifications',
    teach: 'Explain all three categories without looking at the lesson. Then explain why حَرْفٌ in this lesson does not mean an alphabet letter.',
    summary: 'Remember: ism is not tied to time; fiʿl is connected with time; ḥarf functions through its relationship with other words. These are starting definitions—later lessons will refine them.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'هر واژهٔ عربی در یکی از دسته‌های دستوری قرار می‌گیرد. پیش از صرف‌کردن فعل‌ها، باید سه نوع اصلی واژه را در دستور سنتی عربی بشناسیم.',
    objective: 'نام سه دسته را می‌آموزید، معنای پایهٔ آن‌ها را تشخیص می‌دهید و نمونه‌های آشنا را دسته‌بندی می‌کنید.',
    definition: 'در این درس، كَلِمَةٌ (kalimah) به معنای یک واژه است. در دستور سنتی عربی، واژه‌ها به سه دستهٔ کلی تقسیم می‌شوند: اِسْمٌ، فِعْلٌ و حَرْفٌ.',
    ism: 'اسم معنا را می‌رساند، بی‌آن‌که آن را به زمان پیوند دهد. اسم فقط نام اشخاص نیست؛ اشیا، افراد، ویژگی‌ها، مفاهیم، ضمیرها و بسیاری از واژه‌های اسمی را دربرمی‌گیرد.',
    fiil: 'فعل معنایی مرتبط با زمان می‌رساند. فعل می‌تواند بر انجام کار یا بر حالت دلالت کند. در عربی صورت‌های گوناگونی مانند ماضی، مضارع و امر دارد.',
    harf: 'حرف در این دسته‌بندی، واژه‌ای دستوری و پیونددهنده است که نقش آن در ارتباط با واژه‌های دیگر روشن می‌شود؛ مانند «در»، «از» و «به».',
    ismExample: 'كِتَابٌ — کتاب · بَيْتٌ — خانه · مَاءٌ — آب',
    ismExampleWithTranslit: 'كِتَابٌ (kitābun) — کتاب · بَيْتٌ (baytun) — خانه · مَاءٌ (māʾun) — آب',
    fiilExample: 'كَتَبَ — او نوشت · يَكْتُبُ — او می‌نویسد · اُكْتُبْ — بنویس!',
    fiilExampleWithTranslit: 'كَتَبَ (kataba) — او نوشت · يَكْتُبُ (yaktubu) — او می‌نویسد · اُكْتُبْ (uktub) — بنویس!',
    harfExample: 'فِي — در · مِنْ — از · إِلَى — به / سوی',
    harfExampleWithTranslit: 'فِي (fī) — در · مِنْ (min) — از · إِلَى (ilā) — به / سوی',
    warningTitle: 'دو اشتباه رایج',
    letterWarning: 'در این تقسیم‌بندی، حَرْفٌ به معنای حرفِ الفبا مانند ب یا ت نیست؛ بلکه منظور یک واژهٔ دستوری یا حرفِ معناست. واژهٔ عربی ممکن است در اصطلاحات مختلف معناهای فنی متفاوتی داشته باشد.',
    nameWarning: 'اِسْمٌ فقط به معنای نام خاصِ یک شخص نیست. كِتَابٌ (کتاب)، بَيْتٌ (خانه) و جَمِيلٌ (زیبا) نیز اسم‌اند.',
    translationWarning: 'دسته‌بندی‌های عربی را نباید دقیقاً با دسته‌های دستور زبان انگلیسی یکی دانست. برای نمونه، صفت‌ها و ضمیرها در دستور سنتی عربی در دستهٔ گستردهٔ اسم قرار می‌گیرند.',
    wordSentence: 'كَلِمَةٌ یعنی یک واژه و جُمْلَةٌ یعنی جمله. برای نمونه، كَتَبَ یک واژه است؛ كَتَبَ مُحَمَّدٌ («محمد نوشت») یک جملهٔ کامل است.',
    practicePrompt: 'هر واژهٔ عربی را در یکی از سه دستهٔ اِسْمٌ، فِعْلٌ یا حَرْفٌ قرار دهید.',
    correct: 'دسته‌بندی درست است.',
    incorrect: 'این مورد را دوباره بررسی کنید. دستهٔ درست:',
    score: 'امتیاز شما',
    check: 'بررسی دسته‌بندی‌ها',
    teach: 'بدون نگاه‌کردن به درس، هر سه دسته را توضیح دهید. سپس بگویید چرا حَرْفٌ در این درس به معنای حرف الفبا نیست.',
    summary: 'به یاد بسپارید: اسم به زمان وابسته نیست؛ فعل با زمان ارتباط دارد؛ حرف از راه ارتباط با واژه‌های دیگر نقش خود را نشان می‌دهد. این تعریف‌ها آغاز راه‌اند و در درس‌های بعد دقیق‌تر می‌شوند.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'ہر عربی لفظ کسی نہ کسی نحوی قسم سے تعلق رکھتا ہے۔ افعال کی گردان سیکھنے سے پہلے ہمیں عربی قواعد کی تین بنیادی اقسام پہچاننی چاہییں۔',
    objective: 'آپ تینوں اقسام کے نام، ان کے بنیادی مفہوم اور مانوس مثالوں کی درجہ بندی سیکھیں گے۔',
    definition: 'اس سبق میں كَلِمَةٌ (kalimah) سے مراد ایک لفظ ہے۔ روایتی عربی قواعد میں الفاظ کی تین بنیادی قسمیں ہیں: اِسْمٌ، فِعْلٌ اور حَرْفٌ۔',
    ism: 'اسم ایسا معنی بتاتا ہے جو کسی زمانے کے ساتھ مخصوص نہیں ہوتا۔ اسم صرف کسی شخص کے نام تک محدود نہیں؛ اشیا، افراد، صفات، تصورات، ضمیر اور بہت سے دوسرے اسمی الفاظ بھی اس میں شامل ہیں۔',
    fiil: 'فعل ایسا معنی بتاتا ہے جو زمانے سے تعلق رکھتا ہے۔ فعل کسی کام یا حالت کو ظاہر کر سکتا ہے۔ عربی میں ماضی، مضارع اور امر سمیت اس کی مختلف صورتیں ہیں۔',
    harf: 'اس تقسیم میں حرف سے مراد نحوی particle یا ایسا لفظ ہے جس کا کردار دوسرے الفاظ کے ساتھ تعلق سے واضح ہوتا ہے؛ جیسے ’’میں‘‘، ’’سے‘‘ اور ’’کی طرف‘‘۔',
    ismExample: 'كِتَابٌ — کتاب · بَيْتٌ — گھر · مَاءٌ — پانی',
    ismExampleWithTranslit: 'كِتَابٌ (kitābun) — کتاب · بَيْتٌ (baytun) — گھر · مَاءٌ (māʾun) — پانی',
    fiilExample: 'كَتَبَ — اس نے لکھا · يَكْتُبُ — وہ لکھتا ہے · اُكْتُبْ — لکھو!',
    fiilExampleWithTranslit: 'كَتَبَ (kataba) — اس نے لکھا · يَكْتُبُ (yaktubu) — وہ لکھتا ہے · اُكْتُبْ (uktub) — لکھو!',
    harfExample: 'فِي — میں · مِنْ — سے · إِلَى — کی طرف',
    harfExampleWithTranslit: 'فِي (fī) — میں · مِنْ (min) — سے · إِلَى (ilā) — کی طرف',
    warningTitle: 'دو عام غلط فہمیاں',
    letterWarning: 'یہاں حَرْفٌ سے مراد ب یا ت جیسے حروفِ تہجی نہیں، بلکہ ایک نحوی particle ہے۔ عربی میں ایک ہی لفظ مختلف علمی اصطلاحات میں مختلف معنی رکھ سکتا ہے؛ سیاق سے مراد واضح ہوتی ہے۔',
    nameWarning: 'اِسْمٌ صرف کسی شخص کے خاص نام کو نہیں کہتے۔ كِتَابٌ (کتاب)، بَيْتٌ (گھر) اور جَمِيلٌ (خوبصورت) بھی اسم ہیں۔',
    translationWarning: 'عربی کی اقسام کو انگریزی قواعد کی اقسام کے ساتھ بالکل ایک جیسا نہ سمجھیں۔ مثال کے طور پر روایتی عربی قواعد میں صفات اور ضمیر بھی اسم کی وسیع قسم میں شامل ہیں۔',
    wordSentence: 'كَلِمَةٌ کا مطلب ایک لفظ اور جُمْلَةٌ کا مطلب جملہ ہے۔ مثال کے طور پر كَتَبَ ایک لفظ ہے؛ كَتَبَ مُحَمَّدٌ (محمد نے لکھا) ایک مکمل جملہ ہے۔',
    practicePrompt: 'ہر عربی لفظ کو اِسْمٌ (اسم)، فِعْلٌ (فعل) یا حَرْفٌ (حرف) میں تقسیم کریں۔',
    correct: 'درست درجہ بندی۔',
    incorrect: 'اس مثال کو دوبارہ دیکھیں۔ درست قسم ہے:',
    score: 'آپ کا اسکور',
    check: 'درجہ بندی جانچیں',
    teach: 'سبق دیکھے بغیر تینوں اقسام کی وضاحت کریں۔ پھر بتائیں کہ اس سبق میں حَرْفٌ سے مراد حرفِ تہجی کیوں نہیں ہے۔',
    summary: 'یاد رکھیں: اسم زمانے کے ساتھ مخصوص نہیں؛ فعل زمانے سے تعلق رکھتا ہے؛ حرف کا کردار دوسرے الفاظ سے تعلق میں ظاہر ہوتا ہے۔ یہ ابتدائی تعریفیں ہیں، آگے چل کر مزید واضح ہوں گی۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const classificationExamples = [
  {arabic:'كِتَابٌ',translit:'kitābun',gloss:'a book',glossFa:'کتاب',glossUr:'کتاب',answer:'ism',label:'اِسْمٌ'},
  {arabic:'كَتَبَ',translit:'kataba',gloss:'he wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',answer:'fiil',label:'فِعْلٌ'},
  {arabic:'فِي',translit:'fī',gloss:'in',glossFa:'در',glossUr:'میں',answer:'harf',label:'حَرْفٌ'},
  {arabic:'يَكْتُبُ',translit:'yaktubu',gloss:'he writes',glossFa:'او می‌نویسد',glossUr:'وہ لکھتا ہے',answer:'fiil',label:'فِعْلٌ'},
  {arabic:'مَاءٌ',translit:'māʾun',gloss:'water',glossFa:'آب',glossUr:'پانی',answer:'ism',label:'اِسْمٌ'},
  {arabic:'إِلَى',translit:'ilā',gloss:'to / towards',glossFa:'به سوی',glossUr:'کی طرف',answer:'harf',label:'حَرْفٌ'},
] as const

function LessonTwoPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonTwoCopy[language]
  const rtl = language !== 'en'
  const score = classificationExamples.filter((item,index)=>answers[index]===item.answer).length
  const choices = [{value:'ism',label:'اِسْمٌ · Ism'},{value:'fiil',label:'فِعْلٌ · Fiʿl'},{value:'harf',label:'حَرْفٌ · Ḥarf'}]
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/01" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 01 · LESSON 02</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 01 · FOUNDATIONS</div>
        <h1>Three kinds of <em>word</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">أَقْسَامُ الْكَلِمَةِ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">aqsām al-kalimah · the categories of a word</div>}
          <h2>What is a كَلِمَةٌ?</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE THREE CATEGORIES</span>
          <div className="category-grid">
            <div className="category-card"><div className="category-number">01</div><b lang="ar" dir="rtl">اِسْمٌ</b>{showTransliteration&&<span dir="ltr">ism</span>}<h3>Noun / nominal word</h3><p lang={language}>{copy.ism}</p><small dir={rtl?'rtl':'ltr'}>{showTransliteration?copy.ismExampleWithTranslit:copy.ismExample}</small></div>
            <div className="category-card"><div className="category-number">02</div><b lang="ar" dir="rtl">فِعْلٌ</b>{showTransliteration&&<span dir="ltr">fiʿl</span>}<h3>Verb</h3><p lang={language}>{copy.fiil}</p><small dir={rtl?'rtl':'ltr'}>{showTransliteration?copy.fiilExampleWithTranslit:copy.fiilExample}</small></div>
            <div className="category-card"><div className="category-number">03</div><b lang="ar" dir="rtl">حَرْفٌ</b>{showTransliteration&&<span dir="ltr">ḥarf</span>}<h3>Particle</h3><p lang={language}>{copy.harf}</p><small dir={rtl?'rtl':'ltr'}>{showTransliteration?copy.harfExampleWithTranslit:copy.harfExample}</small></div>
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">DON'T MIX THESE UP</span>
          <h2>{copy.warningTitle}</h2>
          <div className="warning-card"><strong>حَرْفٌ is not an alphabet letter</strong><p lang={language}>{copy.letterWarning}</p></div>
          <div className="warning-card"><strong>اِسْمٌ is more than a name</strong><p lang={language}>{copy.nameWarning}</p></div>
          <div className="warning-card"><strong>Arabic and English categories do not match exactly</strong><p lang={language}>{copy.translationWarning}</p></div>
          <h3 className="subheading">Word or sentence?</h3><p lang={language}>{copy.wordSentence}</p>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · CLASSIFY THE WORD</span>
          <h2>Can you recognise the category?</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="classification-list">
            {classificationExamples.map((item,index)=><div className="classification-row" key={item.arabic}>
              <div className="classification-word"><b lang="ar" dir="rtl">{item.arabic}</b>{showTransliteration&&<span dir="ltr">{item.translit}</span>}<small>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</small></div>
              <div className="classification-choices" role="group" aria-label={item.arabic+' category'}>
                {choices.map(choice=><button type="button" key={choice.value} className={answers[index]===choice.value?'chosen':''} aria-pressed={answers[index]===choice.value} onClick={()=>{setAnswers({...answers,[index]:choice.value});setChecked(false)}}>{choice.label}</button>)}
              </div>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b lang="ar" dir="rtl">{item.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==classificationExamples.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {classificationExamples.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <p>The three-part classification is a foundational feature of the Arabic grammatical tradition. These references support the category names and broad distinctions used here.</p>
          <ul>
            <li><a href="https://doi.org/10.1163/26670755-01010005" target="_blank" rel="noreferrer">Simona Olivieri, “Classification of the Parts of Speech in Arabic: A Discussion on Origins, Theories, and Definitions” (2021).</a></li>
            <li><a href="https://corpus.quran.com/documentation/tagset.jsp" target="_blank" rel="noreferrer">The Quranic Arabic Corpus — Part-of-speech Tagset.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/01">← Lesson 1: What is Sarf?</a><a className="next-lesson-link" href="#/lesson/03">Next: verb and maṣdar →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>What is a kalimah?</li><li>Ism</li><li>Fiʿl</li><li>Ḥarf</li><li>Word vs sentence</li><li>Classification practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>For each example, ask: does it name something, show an event linked to time, or connect words?</p></div></aside>
    </div>
  </main>
}


const lessonThreeCopy = {
  en: {
    lead: 'Now that you can recognise a verb, let’s separate the verb from the name of the action. This distinction is one of the most useful foundations in Sarf.',
    objective: 'Recognise a fiʿl, identify its basic forms, explain what a maṣdar is, and distinguish a maṣdar from both a verb and an ordinary noun.',
    definition: 'A fiʿl (فِعْلٌ) expresses an event or state connected with time. The maṣdar (مَصْدَرٌ) names the event itself without specifying when it happened.',
    verbTitle: 'The verb: an event connected with time',
    verbText: 'A verb tells us about an action, occurrence, or state and connects it with a grammatical time or form. Begin by recognising these three familiar forms.',
    masdarTitle: 'The maṣdar: the name of the action',
    masdarText: 'A maṣdar is a verbal noun. It names the action or event without telling us when it happened. It is an ism (noun), not a conjugated verb.',
    familyIntro: 'Look at the ك ت ب family. The root connects these words, but each word has its own form and meaning.',
    caution: 'Do not assume that every Form I verb makes its maṣdar by one predictable pattern. The Form I maṣdar has several patterns; learn the attested maṣdar with the verb and check a reliable dictionary when unsure.',
    compare: 'كَتَبَ is a verb: “he wrote”. كِتَابَةٌ is a maṣdar: “writing”. كِتَابٌ is another ism: “a book”. They share the root ك ت ب, but they are not interchangeable.',
    question: 'Is the maṣdar just another verb tense?',
    answer: 'No. A maṣdar is a noun that names an action or event without tense. It can be definite or indefinite and takes the grammatical behaviour of a noun. A verb, by contrast, is a verb form connected with time or command.',
    practicePrompt: 'Classify each word as a verb (فِعْلٌ), a maṣdar (مَصْدَرٌ), or another kind of ism (اِسْمٌ).',
    correct: 'Correct.',
    incorrect: 'Check the form again. The correct category is',
    score: 'Your score',
    check: 'Check answers',
    teach: 'Explain the difference between كَتَبَ, كِتَابَةٌ, and كِتَابٌ. Then give one example of a verb and its maṣdar from memory.',
    summary: 'Learn verbs with their maṣdar as a vocabulary family. For Form I, do not invent the maṣdar from a pattern you remember—verify and memorise the accepted form.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'اکنون که می‌توانید فعل را تشخیص دهید، تفاوت خودِ فعل با نامِ آن کار را بررسی می‌کنیم. این تمایز از پایه‌های مهم علم صرف است.',
    objective: 'فعل را تشخیص دهید، صورت‌های پایهٔ آن را بشناسید، مصدر را توضیح دهید و آن را از فعل و اسم معمولی جدا کنید.',
    definition: 'فِعْلٌ بر رویداد یا حالتی دلالت می‌کند که با زمان ارتباط دارد. مَصْدَرٌ نامِ خودِ رویداد یا کار است، بدون آن‌که زمان وقوع آن را مشخص کند.',
    verbTitle: 'فعل: رویدادی مرتبط با زمان',
    verbText: 'فعل دربارهٔ کار، رخداد یا حالت خبر می‌دهد و آن را به زمان یا صورت دستوری پیوند می‌زند. ابتدا این سه صورت آشنا را بشناسید.',
    masdarTitle: 'مصدر: نامِ خودِ کار',
    masdarText: 'مصدر، اسمِ مصدر یا اسمِ رویداد است. خودِ کار یا رخداد را نام می‌برد، بی‌آن‌که بگوید چه زمانی رخ داده است. مصدر اسم است، نه فعلِ صرف‌شده.',
    familyIntro: 'به خانوادهٔ ریشهٔ ک ت ب نگاه کنید. ریشه این واژه‌ها را به هم مرتبط می‌کند، اما هر واژه صورت و معنای خاص خود را دارد.',
    caution: 'گمان نکنید که مصدر هر فعل ثلاثی مجرد با یک وزنِ قابل پیش‌بینی ساخته می‌شود. مصدرهای باب اول وزن‌های گوناگونی دارند؛ مصدرِ ثبت‌شده را همراه فعل بیاموزید و هنگام تردید به فرهنگ معتبر مراجعه کنید.',
    compare: 'كَتَبَ فعل و به معنای «او نوشت» است؛ كِتَابَةٌ مصدر و به معنای «نوشتن» است؛ كِتَابٌ اسم و به معنای «کتاب» است. هر سه ریشهٔ ک ت ب دارند، اما جایگزین یکدیگر نیستند.',
    question: 'آیا مصدر فقط یک زمانِ دیگرِ فعل است؟',
    answer: 'خیر. مصدر اسمی است که خودِ کار یا رویداد را بدون زمان نام می‌برد. می‌تواند معرفه یا نکره باشد و رفتار دستوریِ اسم را دارد؛ اما فعل صورتِ فعلیِ مرتبط با زمان یا امر است.',
    practicePrompt: 'هر واژه را در یکی از این دسته‌ها قرار دهید: فعل (فِعْلٌ)، مصدر (مَصْدَرٌ) یا اسمِ دیگر (اِسْمٌ).',
    correct: 'درست است.',
    incorrect: 'صورت واژه را دوباره بررسی کنید. دستهٔ درست:',
    score: 'امتیاز شما',
    check: 'بررسی پاسخ‌ها',
    teach: 'تفاوت كَتَبَ، كِتَابَةٌ و كِتَابٌ را توضیح دهید. سپس از حافظه یک فعل و مصدرِ مرتبط با آن مثال بزنید.',
    summary: 'فعل را همراه مصدرش به‌صورت یک خانوادهٔ واژگانی بیاموزید. در باب اول، مصدر را از روی یک وزن حدس نزنید؛ صورت پذیرفته‌شده را بررسی و حفظ کنید.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'اب جب آپ فعل کو پہچان سکتے ہیں تو آئیے فعل اور اس کام کے نام میں فرق سمجھیں۔ یہ فرق علمِ صرف کی بنیادی باتوں میں سے ہے۔',
    objective: 'فعل پہچانیں، اس کی بنیادی صورتیں جانیں، مصدر کی وضاحت کریں، اور اسے فعل اور عام اسم سے الگ کریں۔',
    definition: 'فِعْلٌ کسی ایسے واقعے یا حالت کو ظاہر کرتا ہے جس کا تعلق زمانے سے ہو۔ مَصْدَرٌ اسی کام یا واقعے کا نام ہے، مگر اس میں وقوع کا زمانہ متعین نہیں ہوتا۔',
    verbTitle: 'فعل: زمانے سے متعلق واقعہ',
    verbText: 'فعل کسی کام، واقعے یا حالت کے بارے میں بتاتا ہے اور اسے کسی زمانی یا صرفی صورت سے جوڑتا ہے۔ پہلے ان تین معروف صورتوں کو پہچانیں۔',
    masdarTitle: 'مصدر: کام کا نام',
    masdarText: 'مصدر اسمِ فعل یا عمل کا نام ہے۔ یہ کام یا واقعے کو بیان کرتا ہے مگر یہ نہیں بتاتا کہ وہ کب ہوا۔ مصدر اسم ہے، گردان کیا ہوا فعل نہیں۔',
    familyIntro: 'ک ت ب کے مادّے سے بنے الفاظ دیکھیں۔ مادّہ ان الفاظ کو آپس میں جوڑتا ہے، لیکن ہر لفظ کی اپنی صورت اور معنی ہیں۔',
    caution: 'یہ نہ سمجھیں کہ ہر ثلاثی مجرد فعل کا مصدر ایک ہی قابلِ پیش گوئی وزن سے بنتا ہے۔ بابِ اول کے مصادر کے کئی اوزان ہیں؛ مصدر کو فعل کے ساتھ یاد کریں اور شک ہو تو معتبر لغت دیکھیں۔',
    compare: 'كَتَبَ فعل ہے، یعنی ’’اس نے لکھا‘‘؛ كِتَابَةٌ مصدر ہے، یعنی ’’لکھنا‘‘؛ كِتَابٌ ایک اور اسم ہے، یعنی ’’کتاب‘‘۔ تینوں کا مادّہ ک ت ب ہے، مگر یہ ایک دوسرے کی جگہ استعمال نہیں ہوتے۔',
    question: 'کیا مصدر فعل کا ایک اور زمانہ ہے؟',
    answer: 'نہیں۔ مصدر ایک اسم ہے جو کام یا واقعے کو زمانے کے بغیر نام دیتا ہے۔ یہ معرفہ یا نکرہ ہو سکتا ہے اور اسم کے قواعد قبول کرتا ہے؛ اس کے برعکس فعل زمانے یا حکم سے متعلق فعلی صورت ہے۔',
    practicePrompt: 'ہر لفظ کو ان میں سے ایک قسم میں رکھیں: فعل (فِعْلٌ)، مصدر (مَصْدَرٌ)، یا دوسرا اسم (اِسْمٌ)۔',
    correct: 'درست۔',
    incorrect: 'اس لفظ کی صورت دوبارہ دیکھیں۔ درست قسم ہے:',
    score: 'آپ کا اسکور',
    check: 'جوابات جانچیں',
    teach: 'كَتَبَ، كِتَابَةٌ اور كِتَابٌ کا فرق بیان کریں۔ پھر یاد سے ایک فعل اور اس کا مصدر بتائیں۔',
    summary: 'افعال کو ان کے مصدر کے ساتھ ایک لفظی خاندان کے طور پر یاد کریں۔ بابِ اول میں مصدر کو کسی مانوس وزن سے خود نہ بنائیں؛ مستند صورت کی تحقیق اور یادداشت کریں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const verbMasdarExamples = [
  {arabic:'كَتَبَ',translit:'kataba',gloss:'he wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',answer:'verb',label:'فِعْلٌ'},
  {arabic:'كِتَابَةٌ',translit:'kitābatun',gloss:'writing',glossFa:'نوشتن',glossUr:'لکھنا',answer:'masdar',label:'مَصْدَرٌ'},
  {arabic:'يَكْتُبُ',translit:'yaktubu',gloss:'he writes',glossFa:'او می‌نویسد',glossUr:'وہ لکھتا ہے',answer:'verb',label:'فِعْلٌ'},
  {arabic:'قِرَاءَةٌ',translit:'qirāʾatun',gloss:'reading',glossFa:'خواندن',glossUr:'پڑھنا',answer:'masdar',label:'مَصْدَرٌ'},
  {arabic:'كِتَابٌ',translit:'kitābun',gloss:'a book',glossFa:'کتاب',glossUr:'کتاب',answer:'other',label:'اِسْمٌ آخَرُ'},
  {arabic:'اُكْتُبْ',translit:'uktub',gloss:'write!',glossFa:'بنویس!',glossUr:'لکھو!',answer:'verb',label:'فِعْلُ أَمْرٍ'},
  {arabic:'فَهْمٌ',translit:'fahmun',gloss:'understanding',glossFa:'فهم',glossUr:'سمجھ',answer:'masdar',label:'مَصْدَرٌ'},
] as const

function LessonThreePage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonThreeCopy[language]
  const rtl = language !== 'en'
  const score = verbMasdarExamples.filter((item,index)=>answers[index]===item.answer).length
  const choices = [{value:'verb',label:'Verb · فِعْلٌ'},{value:'masdar',label:'Maṣdar · مَصْدَرٌ'},{value:'other',label:'Other ism · اِسْمٌ'}]
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/02" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 01 · LESSON 03</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 01 · FOUNDATIONS</div>
        <h1>Verb and <em>maṣdar</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْفِعْلُ وَالْمَصْدَرُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-fiʿl wa-l-maṣdar</div>}
          <h2>Two related but different forms</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">1 · THE VERB</span>
          <h2>{copy.verbTitle}</h2>
          <p lang={language}>{copy.verbText}</p>
          <div className="verb-forms-grid">
            <div><span>المَاضِي · PAST</span><b lang="ar" dir="rtl">كَتَبَ</b>{showTransliteration&&<small>kataba</small>}<p>he wrote</p></div>
            <div><span>المُضَارِع · IMPERFECT</span><b lang="ar" dir="rtl">يَكْتُبُ</b>{showTransliteration&&<small>yaktubu</small>}<p>he writes / is writing</p></div>
            <div><span>الأَمْر · COMMAND</span><b lang="ar" dir="rtl">اُكْتُبْ</b>{showTransliteration&&<small>uktub</small>}<p>write!</p></div>
          </div>
          <div className="caution-note">The command form is an imperative form, not simply another past or present tense. We will study the full verb system later.</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">2 · THE MAṢDAR</span>
          <h2>{copy.masdarTitle}</h2>
          <p lang={language}>{copy.masdarText}</p>
          <div className="masdar-highlight"><span>مَصْدَرٌ · VERBAL NOUN</span><b lang="ar" dir="rtl">كِتَابَةٌ</b>{showTransliteration&&<small>kitābatun</small>}<strong>writing</strong></div>
          <div className="word-family compact-family">
            <div><b lang="ar" dir="rtl">كَتَبَ</b><small>he wrote</small></div>
            <div><b lang="ar" dir="rtl">يَكْتُبُ</b><small>he writes</small></div>
            <div><b lang="ar" dir="rtl">كِتَابَةٌ</b><small>writing</small></div>
          </div>
          <div className="caution-note" lang={language}>{copy.caution}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">COMPARE THE WORDS</span>
          <h2>كَتَبَ · كِتَابَةٌ · كِتَابٌ</h2>
          <p lang={language}>{copy.compare}</p>
          <div className="comparison-strip">
            <div><b lang="ar" dir="rtl">كَتَبَ</b><span>Verb · فعل</span></div>
            <div><b lang="ar" dir="rtl">كِتَابَةٌ</b><span>Maṣdar · مصدر</span></div>
            <div><b lang="ar" dir="rtl">كِتَابٌ</b><span>Other ism · اسم</span></div>
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A BEGINNER QUESTION</span>
          <h2>{copy.question}</h2>
          <p lang={language}>{copy.answer}</p>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · VERB OR NOUN?</span>
          <h2>Classify the forms</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="classification-list">
            {verbMasdarExamples.map((item,index)=><div className="classification-row" key={item.arabic}>
              <div className="classification-word"><b lang="ar" dir="rtl">{item.arabic}</b>{showTransliteration&&<span dir="ltr">{item.translit}</span>}<small>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</small></div>
              <div className="classification-choices" role="group" aria-label={item.arabic+' category'}>
                {choices.map(choice=><button type="button" key={choice.value} className={answers[index]===choice.value?'chosen':''} aria-pressed={answers[index]===choice.value} onClick={()=>{setAnswers({...answers,[index]:choice.value});setChecked(false)}}>{choice.label}</button>)}
              </div>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b lang="ar" dir="rtl">{item.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==verbMasdarExamples.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {verbMasdarExamples.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.cambridge.org/core/books/reference-grammar-of-modern-standard-arabic/207FA6CB610D541184C4B8CB10A4084A" target="_blank" rel="noreferrer">Karin C. Ryding, A Reference Grammar of Modern Standard Arabic (Cambridge University Press, 2005), chapter 5, “Arabic noun types,” especially the maṣdar section.</a></li>
            <li><a href="https://openbooks.lib.msu.edu/elemarabicll/chapter/grammar-5/" target="_blank" rel="noreferrer">Michigan State University, Elementary Arabic II — “Grammar: Masdar and Verb.”</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/03">← Lesson 3: Verb and maṣdar</a><a className="next-lesson-link" href="#/lesson/04">Next: original and added letters →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Verb and time</li><li>Māḍī, Muḍāriʿ, Amr</li><li>Maṣdar</li><li>Compare related words</li><li>Classification practice</li><li>Teach-back</li><li>Sources</li></ol><div className="aside-note"><strong>Study tip</strong><p>When you learn a new verb, record its maṣdar beside it. Do not guess the Form I maṣdar.</p></div></aside>
    </div>
  </main>
}


const lessonFourCopy = {
  en: {
    lead: 'A root gives us the original consonants. A pattern may add material around or between them. Learning to tell the two apart is essential for recognising Arabic word forms.',
    objective: 'Identify the root letters in familiar verbs, recognise added letters in derived forms, and use the traditional mnemonic carefully rather than mechanically.',
    definition: 'Original letters (حُرُوفٌ أَصْلِيَّةٌ) belong to the root. Added letters (حُرُوفٌ زَائِدَةٌ) are introduced by a morphological pattern. In this lesson we focus on triliteral verbs.',
    mujarrad: 'A mujarrad verb uses its root letters without an added derivational letter. كَتَبَ is Form I: its root is ك ت ب, and all three letters are original.',
    mazid: 'A mazīd verb has additional morphological material beyond its root. The addition may be a written letter or a patterned change such as doubling; the pattern tells us how to analyse it.',
    mnemonic: 'The traditional mnemonic سَأَلْتُمُونِيهَا gathers ten letters that may appear as additions in Arabic word patterns. It is a memory aid—not a rule that every occurrence of one of these letters is extra.',
    caution: 'Never remove a letter merely because it appears in the mnemonic. A letter can be part of the root. In سَأَلَ, sīn, hamza, and lām are all root letters. In وَجَدَ, wāw is the first root letter.',
    familyIntro: 'Compare three verbs built from the same root ك ت ب. The original root remains recognisable while the pattern adds material and changes the word.',
    practicePrompt: 'For each item, decide whether it is a mujarrad verb, a mazīd verb, or not a verb. Use the root and pattern—not the mnemonic alone.',
    correct: 'Correct.',
    incorrect: 'Review the root and pattern. The correct analysis is',
    score: 'Your score',
    check: 'Check analysis',
    teach: 'Explain why the alif in كَاتَبَ is added, but the sīn in سَأَلَ is original. Then explain why the mnemonic is a clue rather than a complete root-finding method.',
    summary: 'First identify a possible root, then match the word to a known pattern, and finally verify it with a reliable dictionary or teacher. The mnemonic narrows the possibilities; it does not prove the analysis.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'ریشه حروف اصلی را در اختیار ما می‌گذارد و وزن ممکن است حروفی را پیرامون یا میان آن‌ها بیفزاید. تشخیص این دو از یکدیگر برای شناخت صورت واژه‌های عربی ضروری است.',
    objective: 'حروف اصلی فعل‌های آشنا را پیدا کنید، حروف افزوده را در صورت‌های مشتق بشناسید و از رمز سنتی با دقت استفاده کنید، نه به‌صورت مکانیکی.',
    definition: 'حروف اصلی (حُرُوفٌ أَصْلِيَّةٌ) جزئی از ریشه‌اند. حروف زائد (حُرُوفٌ زَائِدَةٌ) به‌واسطهٔ یک وزن صرفی افزوده می‌شوند. در این درس بر فعل‌های سه‌حرفی تمرکز می‌کنیم.',
    mujarrad: 'فعل مجرد حروف اصلی ریشه را بدون حرفِ افزودهٔ اشتقاقی به‌کار می‌برد. كَتَبَ از باب اول است؛ ریشهٔ آن ک ت ب است و هر سه حرف اصلی‌اند.',
    mazid: 'فعل مزید افزون بر ریشه، مادهٔ صرفیِ افزوده دارد. این افزایش ممکن است با افزودن حرفِ نوشته‌شده یا با تغییری الگومند مانند تشدید باشد؛ وزن نشان می‌دهد چگونه باید آن را تحلیل کرد.',
    mnemonic: 'رمز سنتی سَأَلْتُمُونِيهَا ده حرف را گرد می‌آورد که ممکن است در وزن‌های عربی نقش افزوده داشته باشند. این رمز وسیله‌ای برای یادسپاری است، نه قانونی که هر بار دیدن یکی از این حروف به معنای زائدبودن آن باشد.',
    caution: 'حرفی را فقط به این دلیل که در رمز آمده حذف نکنید؛ ممکن است جزئی از ریشه باشد. در سَأَلَ، سین، همزه و لام هر سه حروف اصلی‌اند. در وَجَدَ، واو حرف نخست ریشه است.',
    familyIntro: 'سه فعل را که از یک ریشهٔ ک ت ب ساخته شده‌اند مقایسه کنید. ریشهٔ اصلی همچنان قابل تشخیص است، اما وزن ماده‌ای می‌افزاید و صورت واژه را تغییر می‌دهد.',
    practicePrompt: 'برای هر مورد مشخص کنید فعل مجرد است، فعل مزید است یا اصلاً فعل نیست. ریشه و وزن را بررسی کنید، نه فقط رمز را.',
    correct: 'درست است.',
    incorrect: 'ریشه و وزن را دوباره بررسی کنید. تحلیل درست:',
    score: 'امتیاز شما',
    check: 'بررسی تحلیل',
    teach: 'توضیح دهید چرا الف در كَاتَبَ افزوده است، اما سین در سَأَلَ حرف اصلی ریشه است. سپس بگویید چرا رمز فقط سرنخ است و روش کامل یافتن ریشه نیست.',
    summary: 'ابتدا ریشهٔ احتمالی را پیدا کنید، سپس واژه را با وزن شناخته‌شده بسنجید و در پایان آن را با فرهنگ معتبر یا استاد بررسی کنید. رمز احتمال‌ها را محدود می‌کند، اما به‌تنهایی تحلیل را ثابت نمی‌کند.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'مادّہ ہمیں اصلی حروف دیتا ہے، جبکہ وزن ان حروف کے اردگرد یا درمیان میں کچھ حروف بڑھا سکتا ہے۔ عربی الفاظ کی ساخت سمجھنے کے لیے دونوں میں فرق کرنا ضروری ہے۔',
    objective: 'مانوس افعال میں اصلی حروف پہچانیں، مشتق صورتوں میں زائد حروف معلوم کریں، اور روایتی یادداشت کے کلمے کو احتیاط سے استعمال کریں۔',
    definition: 'حُرُوفٌ أَصْلِيَّةٌ مادّے کے اصلی حروف ہیں۔ حُرُوفٌ زَائِدَةٌ وہ حروف ہیں جو صرفی وزن کے ذریعے بڑھائے جاتے ہیں۔ اس سبق میں ہم سہ حرفی افعال پر توجہ دیں گے۔',
    mujarrad: 'فعلِ مجرد میں مادّے کے اصلی حروف ہوتے ہیں اور کوئی زائد اشتقاقی حرف نہیں ہوتا۔ كَتَبَ بابِ اول ہے؛ اس کا مادّہ ک ت ب ہے اور تینوں حروف اصلی ہیں۔',
    mazid: 'فعلِ مزید میں مادّے کے علاوہ صرفی اضافہ بھی ہوتا ہے۔ یہ اضافہ لکھے جانے والے حرف کی صورت میں یا کسی مقررہ تبدیلی، مثلاً تشدید، کی صورت میں ہو سکتا ہے؛ وزن بتاتا ہے کہ اس کا تجزیہ کیسے کریں۔',
    mnemonic: 'روایتی یادداشت سَأَلْتُمُونِيهَا میں دس ایسے حروف جمع ہیں جو عربی اوزان میں زائد ہو سکتے ہیں۔ یہ یاد رکھنے کا طریقہ ہے، ایسا اصول نہیں کہ ان حروف میں سے کوئی بھی جہاں نظر آئے وہ لازماً زائد ہو۔',
    caution: 'کسی حرف کو صرف اس لیے نہ نکالیں کہ وہ اس یادداشت میں موجود ہے؛ وہ مادّے کا اصلی حرف بھی ہو سکتا ہے۔ سَأَلَ میں سین، ہمزہ اور لام تینوں اصلی حروف ہیں۔ وَجَدَ میں واو مادّے کا پہلا حرف ہے۔',
    familyIntro: 'ایک ہی مادّہ ک ت ب سے بننے والے تین افعال کا موازنہ کریں۔ مادّہ پہچانا جا سکتا ہے، جبکہ وزن اضافی مواد لا کر لفظ کی صورت بدلتا ہے۔',
    practicePrompt: 'ہر مثال کے بارے میں فیصلہ کریں کہ وہ مجرد فعل ہے، مزید فعل ہے یا فعل ہی نہیں۔ صرف یادداشت نہیں بلکہ مادّہ اور وزن دیکھیں۔',
    correct: 'درست۔',
    incorrect: 'مادّہ اور وزن دوبارہ دیکھیں۔ درست تجزیہ ہے:',
    score: 'آپ کا اسکور',
    check: 'تجزیہ جانچیں',
    teach: 'بتائیں کہ كَاتَبَ میں الف زائد کیوں ہے، جبکہ سَأَلَ میں سین اصلی حرف ہے۔ پھر واضح کریں کہ یادداشت صرف اشارہ کیوں ہے، مادّہ معلوم کرنے کا مکمل طریقہ کیوں نہیں۔',
    summary: 'پہلے ممکنہ مادّہ پہچانیں، پھر لفظ کو معروف وزن سے ملائیں، اور آخر میں معتبر لغت یا استاد سے تصدیق کریں۔ یادداشت امکانات کم کرتی ہے، مگر اکیلے تجزیہ ثابت نہیں کرتی۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const rootAdditionExamples = [
  {arabic:'كَتَبَ',translit:'kataba',gloss:'he wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',answer:'mujarrad',analysis:'Root ك ت ب · no added derivational letter',analysisFa:'ریشه ک ت ب · حرف اشتقاقیِ افزوده ندارد',analysisUr:'مادّہ ک ت ب · کوئی زائد اشتقاقی حرف نہیں'},
  {arabic:'كَاتَبَ',translit:'kātaba',gloss:'he corresponded',glossFa:'مکاتبه کرد',glossUr:'اس نے خط و کتابت کی',answer:'mazid',analysis:'Root ك ت ب · added alif · Form III',analysisFa:'ریشه ک ت ب · الف افزوده · باب سوم',analysisUr:'مادّہ ک ت ب · الف زائد · باب سوم'},
  {arabic:'اِسْتَكْتَبَ',translit:'istaktaba',gloss:'he asked someone to write',glossFa:'از کسی خواست بنویسد',glossUr:'اس نے کسی سے لکھنے کو کہا',answer:'mazid',analysis:'Root ك ت ب · added ا س ت · Form X',analysisFa:'ریشه ک ت ب · حروف افزوده ا س ت · باب دهم',analysisUr:'مادّہ ک ت ب · زائد حروف ا س ت · باب دہم'},
  {arabic:'سَأَلَ',translit:'saʾala',gloss:'he asked',glossFa:'او پرسید',glossUr:'اس نے پوچھا',answer:'mujarrad',analysis:'Root س أ ل · all three letters are original',analysisFa:'ریشه س أ ل · هر سه حرف اصلی‌اند',analysisUr:'مادّہ س أ ل · تینوں حروف اصلی ہیں'},
  {arabic:'وَجَدَ',translit:'wajada',gloss:'he found',glossFa:'او یافت',glossUr:'اس نے پایا',answer:'mujarrad',analysis:'Root و ج د · wāw is original',analysisFa:'ریشه و ج د · واو حرف اصلی است',analysisUr:'مادّہ و ج د · واو اصلی حرف ہے'},
  {arabic:'أَكْرَمَ',translit:'akrama',gloss:'he honoured',glossFa:'او گرامی داشت',glossUr:'اس نے عزت دی',answer:'mazid',analysis:'Root ك ر م · added hamza · Form IV',analysisFa:'ریشه ک ر م · همزه افزوده · باب چهارم',analysisUr:'مادّہ ک ر م · ہمزہ زائد · باب چہارم'},
  {arabic:'مَكْتُوبٌ',translit:'maktūbun',gloss:'written',glossFa:'نوشته‌شده',glossUr:'لکھا ہوا',answer:'notverb',analysis:'A passive participle (ism), not a verb in this exercise',analysisFa:'اسم مفعول (اسم) است، نه فعل در این تمرین',analysisUr:'اسمِ مفعول ہے، اس مشق میں فعل نہیں'},
] as const

function LessonFourPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonFourCopy[language]
  const rtl = language !== 'en'
  const score = rootAdditionExamples.filter((item,index)=>answers[index]===item.answer).length
  const choices = [{value:'mujarrad',label:'Mujarrad · مُجَرَّدٌ'},{value:'mazid',label:'Mazīd · مَزِيدٌ'},{value:'notverb',label:'Not a verb · لَيْسَ فِعْلًا'}]
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/03" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 01 · LESSON 04</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 01 · FOUNDATIONS</div>
        <h1>Original and <em>added</em> letters</h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْحُرُوفُ الْأَصْلِيَّةُ وَالزَّائِدَةُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-ḥurūf al-aṣliyyah wa-l-zāʾidah</div>}
          <h2>Root letters and added letters</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">TWO IMPORTANT TERMS</span>
          <div className="compare-grid">
            <div><span className="compare-label">مُجَرَّدٌ · MUJARRAD</span><h3>Unaugmented verb</h3><p lang={language}>{copy.mujarrad}</p></div>
            <div><span className="compare-label">مَزِيدٌ · MAZĪD</span><h3>Augmented verb</h3><p lang={language}>{copy.mazid}</p></div>
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">ONE ROOT · DIFFERENT PATTERNS</span>
          <h2>Follow the root ك ت ب</h2>
          <p lang={language}>{copy.familyIntro}</p>
          <div className="root-derivation-list">
            <div><b lang="ar" dir="rtl">كَتَبَ</b>{showTransliteration&&<small>kataba</small>}<span>Form I · مُجَرَّدٌ</span><strong lang="ar" dir="rtl">ك ت ب</strong><em>No added derivational letter</em></div>
            <div><b lang="ar" dir="rtl">كَاتَبَ</b>{showTransliteration&&<small>kātaba</small>}<span>Form III · مَزِيدٌ بِحَرْفٍ</span><strong lang="ar" dir="rtl">ك + ا + ت + ب</strong><em>Added alif · ا</em></div>
            <div><b lang="ar" dir="rtl">اِسْتَكْتَبَ</b>{showTransliteration&&<small>istaktaba</small>}<span>Form X · مَزِيدٌ بِثَلَاثَةِ أَحْرُفٍ</span><strong lang="ar" dir="rtl">ا س ت + ك ت ب</strong><em>Added ا س ت</em></div>
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE TRADITIONAL MEMORY AID</span>
          <h2 lang="ar" dir="rtl">سَأَلْتُمُونِيهَا</h2>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">saʾaltumūnīhā</div>}
          <p lang={language}>{copy.mnemonic}</p>
          <div className="mnemonic-letters" lang="ar" dir="rtl"><b>س</b><b>أ</b><b>ل</b><b>ت</b><b>م</b><b>و</b><b>ن</b><b>ي</b><b>ه</b><b>ا</b></div>
          <div className="warning-card"><strong>Important limitation</strong><p lang={language}>{copy.caution}</p></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · ROOT OR ADDITION?</span>
          <h2>Analyse each form</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="classification-list">
            {rootAdditionExamples.map((item,index)=><div className="classification-row" key={item.arabic}>
              <div className="classification-word"><b lang="ar" dir="rtl">{item.arabic}</b>{showTransliteration&&<span dir="ltr">{item.translit}</span>}<small>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</small></div>
              <div className="classification-choices" role="group" aria-label={item.arabic+' verb type'}>
                {choices.map(choice=><button type="button" key={choice.value} className={answers[index]===choice.value?'chosen':''} aria-pressed={answers[index]===choice.value} onClick={()=>{setAnswers({...answers,[index]:choice.value});setChecked(false)}}>{choice.label}</button>)}
              </div>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{language==='fa'?item.analysisFa:language==='ur'?item.analysisUr:item.analysis}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==rootAdditionExamples.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {rootAdditionExamples.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://asjp.cerist.dz/en/downArticlepdf/163/5/1/130194" target="_blank" rel="noreferrer">Zoubir Dendane, “An Overview of Verb Morphology in Arabic,” especially the discussion of bare and augmented forms and the Form III example كَاتَبَ.</a></li>
            <li><a href="https://arabicwithoutwalls.ucdavis.edu/chapter14/grammar_note14.html" target="_blank" rel="noreferrer">University of California, Davis — Arabic Without Walls, Grammar Note 14: Verb Forms.</a></li>
            <li><a href="https://www.arabicacademy.gov.eg/ar/%D9%85%D8%AD%D8%B1%D9%83-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB/%D8%A7%D8%B3%D8%AA%D9%83%D8%AA%D8%A8" target="_blank" rel="noreferrer">Cairo Arabic Language Academy — dictionary entry for اِسْتَكْتَبَ, root ك ت ب.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/03">← Lesson 3: Verb and maṣdar</a><a className="next-lesson-link" href="#/lesson/05">Next: the Mīzān Ṣarfī →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Original and added letters</li><li>Mujarrad and Mazīd</li><li>One root, three patterns</li><li>سَأَلْتُمُونِيهَا</li><li>Mnemonic limitations</li><li>Classification practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Do not strip letters mechanically. Find the pattern and verify the root.</p></div></aside>
    </div>
  </main>
}


const lessonFiveCopy = {
  en: {
    lead: 'The Mīzān Ṣarfī is a measuring tool for word forms. It lets you describe a word’s pattern by comparing its root letters with the model letters ف، ع، ل.',
    objective: 'Identify the three model letters, map them to a triliteral root, and recognise the weights of familiar verbs and derived nouns.',
    definition: 'For a three-letter root, the standard scale uses فَعَلَ as its basic model. The first root consonant matches ف, the second matches ع, and the third matches ل. The word being analysed is the mawzūn; its pattern is the wazn.',
    first: 'The first original root consonant.',
    second: 'The second original root consonant.',
    third: 'The third original root consonant.',
    mapping: 'For كَتَبَ, kāf maps to ف, tāʾ maps to ع, and bāʾ maps to ل. This is why كَتَبَ weighs فَعَلَ.',
    added: 'When a word has added letters, keep those letters in the scale in the same position. The root consonants are replaced by ف، ع، ل; the additions remain visible.',
    vowel: 'The vowel marks and sukūn matter too. فَعَلَ is only one model pattern. Other verbs may follow patterns such as فَعِلَ or فَعُلَ; the six common Abwāb will be studied next.',
    caution: 'The scale describes a word’s structure, not its translation. Do not assume every triliteral word weighs فَعَلَ. Match all root letters, added letters, and vowel marks.',
    quadriliteral: 'This lesson focuses on three-letter roots. Four-letter roots use a different basic model, commonly فَعْلَلَ; we will study them later.',
    practicePrompt: 'Choose the correct wazn (pattern) for each Arabic word.',
    correct: 'Correct pattern.',
    incorrect: 'Check the root and added letters. The correct pattern is',
    score: 'Your score',
    check: 'Check patterns',
    teach: 'Explain what ف، ع، and ل represent. Then weigh كَاتَبَ and اِسْتَكْتَبَ without looking at the examples.',
    summary: 'Find the root first. Replace the first, second, and third root consonants with ف، ع، ل, keep any additions in place, and match the vowel marks.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'میزان صرفی ابزاری برای سنجش صورت واژه‌هاست. با مقایسهٔ حروف ریشه با حروف الگوی ف، ع، ل می‌توان وزن یک واژه را بیان کرد.',
    objective: 'سه حرفِ معیار را بشناسید، آن‌ها را با ریشهٔ سه‌حرفی تطبیق دهید و وزن فعل‌ها و اسم‌های مشتقِ آشنا را تشخیص دهید.',
    definition: 'برای ریشهٔ سه‌حرفی، معیار پایه فَعَلَ است. حرف اصلی اول با ف، حرف دوم با ع و حرف سوم با ل سنجیده می‌شود. واژه‌ای که می‌سنجیم موزون و قالب آن وزن نام دارد.',
    first: 'نخستین حرف اصلی ریشه.',
    second: 'دومین حرف اصلی ریشه.',
    third: 'سومین حرف اصلی ریشه.',
    mapping: 'در كَتَبَ، کاف با ف، تاء با ع و باء با ل برابر است؛ بنابراین وزن كَتَبَ، فَعَلَ است.',
    added: 'اگر واژه حروف افزوده داشته باشد، آن حروف در همان جایگاه در وزن باقی می‌مانند. حروف اصلی با ف، ع و ل جایگزین می‌شوند و حروف افزوده دیده می‌شوند.',
    vowel: 'حرکت‌ها و سکون نیز مهم‌اند. فَعَلَ تنها یکی از وزن‌های ممکن است. فعل‌های دیگر ممکن است بر وزن‌هایی مانند فَعِلَ یا فَعُلَ باشند؛ شش باب معروف را در درس بعد می‌آموزیم.',
    caution: 'وزن ساختار واژه را نشان می‌دهد، نه ترجمهٔ آن را. گمان نکنید هر واژهٔ سه‌حرفی بر وزن فَعَلَ است؛ حروف اصلی، افزوده و حرکت‌ها را با هم بررسی کنید.',
    quadriliteral: 'این درس بر ریشه‌های سه‌حرفی تمرکز دارد. ریشه‌های چهارحرفی معیار پایهٔ دیگری دارند که معمولاً فَعْلَلَ است؛ آن را بعداً می‌آموزیم.',
    practicePrompt: 'وزن درست هر واژهٔ عربی را انتخاب کنید.',
    correct: 'وزن درست است.',
    incorrect: 'ریشه و حروف افزوده را بررسی کنید. وزن درست:',
    score: 'امتیاز شما',
    check: 'بررسی وزن‌ها',
    teach: 'توضیح دهید ف، ع و ل نمایندهٔ چه چیزی هستند. سپس بدون نگاه‌کردن به نمونه‌ها وزن كَاتَبَ و اِسْتَكْتَبَ را به‌دست آورید.',
    summary: 'ابتدا ریشه را بیابید؛ سپس حرف اول، دوم و سوم ریشه را با ف، ع و ل جایگزین کنید، حروف افزوده را در جای خود نگه دارید و حرکت‌ها را نیز تطبیق دهید.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'میزانِ صرفی الفاظ کی ساخت ناپنے کا ایک طریقہ ہے۔ اس میں مادّے کے حروف کا موازنہ ف، ع، ل کے نمونوں سے کیا جاتا ہے۔',
    objective: 'تین معیاری حروف پہچانیں، انہیں سہ حرفی مادّے سے ملائیں، اور مانوس افعال اور مشتق اسماء کے اوزان معلوم کریں۔',
    definition: 'تین حرفی مادّے کے لیے بنیادی معیار فَعَلَ ہے۔ مادّے کا پہلا اصلی حرف ف، دوسرا ع اور تیسرا ل کے مقابل آتا ہے۔ جس لفظ کو تولا جائے وہ موزون اور اس کا قالب وزن کہلاتا ہے۔',
    first: 'مادّے کا پہلا اصلی حرف۔',
    second: 'مادّے کا دوسرا اصلی حرف۔',
    third: 'مادّے کا تیسرا اصلی حرف۔',
    mapping: 'كَتَبَ میں کاف ف کے، تاء ع کے، اور باء ل کے مقابل ہے؛ اسی لیے كَتَبَ کا وزن فَعَلَ ہے۔',
    added: 'اگر لفظ میں زائد حروف ہوں تو وہ وزن میں اپنی اسی جگہ پر باقی رہتے ہیں۔ اصلی حروف کو ف، ع اور ل سے بدلا جاتا ہے، جبکہ زائد حروف واضح رہتے ہیں۔',
    vowel: 'حرکات اور سکون بھی اہم ہیں۔ فَعَلَ صرف ایک ممکنہ وزن ہے۔ دوسرے افعال فَعِلَ یا فَعُلَ جیسے اوزان پر بھی ہو سکتے ہیں؛ چھ ابواب اگلے سبق میں پڑھیں گے۔',
    caution: 'وزن لفظ کی ساخت بتاتا ہے، ترجمہ نہیں۔ یہ نہ سمجھیں کہ ہر سہ حرفی لفظ کا وزن فَعَلَ ہے؛ اصلی حروف، زائد حروف اور حرکات سب دیکھیں۔',
    quadriliteral: 'یہ سبق سہ حرفی مادّوں پر ہے۔ چار حرفی مادّوں کا بنیادی وزن مختلف ہوتا ہے، عموماً فَعْلَلَ؛ اسے بعد میں پڑھیں گے۔',
    practicePrompt: 'ہر عربی لفظ کے لیے درست وزن منتخب کریں۔',
    correct: 'درست وزن۔',
    incorrect: 'مادّہ اور زائد حروف دیکھیں۔ درست وزن ہے:',
    score: 'آپ کا اسکور',
    check: 'اوزان جانچیں',
    teach: 'بتائیں کہ ف، ع اور ل کن حروف کی نمائندگی کرتے ہیں۔ پھر مثال دیکھے بغیر كَاتَبَ اور اِسْتَكْتَبَ کا وزن معلوم کریں۔',
    summary: 'پہلے مادّہ معلوم کریں؛ پھر پہلے، دوسرے اور تیسرے اصلی حرف کو ف، ع اور ل سے بدلیں، زائد حروف اپنی جگہ رہنے دیں، اور حرکات بھی ملائیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const mizanExamples = [
  {word:'كَتَبَ',translit:'kataba',gloss:'he wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',pattern:'فَعَلَ',patternTranslit:'faʿala',answer:'faala',analysis:'Root ك ت ب maps to ف ع ل; no added letter.',analysisFa:'ریشه ک ت ب با ف ع ل تطبیق می‌یابد؛ حرف افزوده ندارد.',analysisUr:'مادّہ ک ت ب ف ع ل کے مقابل ہے؛ کوئی زائد حرف نہیں۔'},
  {word:'كَاتَبَ',translit:'kātaba',gloss:'he corresponded',glossFa:'مکاتبه کرد',glossUr:'اس نے خط و کتابت کی',pattern:'فَاعَلَ',patternTranslit:'fāʿala',answer:'faaala',analysis:'The root is ك ت ب; the added alif remains in the pattern فَاعَلَ.',analysisFa:'ریشه ک ت ب است؛ الف افزوده در وزن فَاعَلَ باقی می‌ماند.',analysisUr:'مادّہ ک ت ب ہے؛ زائد الف وزن فَاعَلَ میں باقی رہتا ہے۔'},
  {word:'اِسْتَكْتَبَ',translit:'istaktaba',gloss:'he asked someone to write',glossFa:'از کسی خواست بنویسد',glossUr:'اس نے کسی سے لکھنے کو کہا',pattern:'اِسْتَفْعَلَ',patternTranslit:'istafʿala',answer:'istafala',analysis:'The root is ك ت ب; the added sequence ا س ت remains in اِسْتَفْعَلَ.',analysisFa:'ریشه ک ت ب است؛ حروف افزودهٔ ا س ت در وزن اِسْتَفْعَلَ باقی می‌مانند.',analysisUr:'مادّہ ک ت ب ہے؛ زائد حروف ا س ت وزن اِسْتَفْعَلَ میں باقی رہتے ہیں۔'},
  {word:'كَاتِبٌ',translit:'kātibun',gloss:'a writer',glossFa:'نویسنده',glossUr:'لکھنے والا',pattern:'فَاعِلٌ',patternTranslit:'fāʿilun',answer:'faail',analysis:'The root is ك ت ب; the alif remains in the active-participle pattern فَاعِلٌ.',analysisFa:'ریشه ک ت ب است؛ الف در وزن اسم فاعل، فَاعِلٌ، باقی می‌ماند.',analysisUr:'مادّہ ک ت ب ہے؛ الف وزن اسمِ فاعل فَاعِلٌ میں باقی رہتا ہے۔'},
  {word:'مَكْتُوبٌ',translit:'maktūbun',gloss:'written',glossFa:'نوشته‌شده',glossUr:'لکھا ہوا',pattern:'مَفْعُولٌ',patternTranslit:'mafʿūlun',answer:'mafool',analysis:'The root is ك ت ب; the added mīm and wāw remain in مَفْعُولٌ.',analysisFa:'ریشه ک ت ب است؛ میم و واو افزوده در وزن مَفْعُولٌ باقی می‌مانند.',analysisUr:'مادّہ ک ت ب ہے؛ زائد میم اور واو وزن مَفْعُولٌ میں باقی رہتے ہیں۔'},
  {word:'مَكْتَبٌ',translit:'maktabun',gloss:'an office / desk',glossFa:'دفتر / میزتحریر',glossUr:'دفتر / میز',pattern:'مَفْعَلٌ',patternTranslit:'mafʿalun',answer:'mafal',analysis:'The root is ك ت ب; the added mīm remains in مَفْعَلٌ.',analysisFa:'ریشه ک ت ب است؛ میم افزوده در وزن مَفْعَلٌ باقی می‌ماند.',analysisUr:'مادّہ ک ت ب ہے؛ زائد میم وزن مَفْعَلٌ میں باقی رہتا ہے۔'},
] as const

function LessonFivePage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonFiveCopy[language]
  const rtl = language !== 'en'
  const score = mizanExamples.filter((item,index)=>answers[index]===item.answer).length
  const choices = [
    {value:'faala',label:'فَعَلَ'},
    {value:'faaala',label:'فَاعَلَ'},
    {value:'istafala',label:'اِسْتَفْعَلَ'},
    {value:'faail',label:'فَاعِلٌ'},
    {value:'mafool',label:'مَفْعُولٌ'},
    {value:'mafal',label:'مَفْعَلٌ'},
  ]
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/04" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 02 · LESSON 05</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 02 · THE MORPHOLOGICAL SCALE</div>
        <h1>The <em>Mīzān Ṣarfī</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْمِيزَانُ الصَّرْفِيُّ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-mīzān al-ṣarfī</div>}
          <h2>What is the morphological scale?</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE THREE MODEL LETTERS</span>
          <h2>ف · ع · ل</h2>
          <div className="mizan-model-grid">
            <div><b lang="ar" dir="rtl">فَاءُ الْفِعْلِ</b><strong>ف</strong><span>Fāʾ al-fiʿl</span><p lang={language}>{copy.first}</p></div>
            <div><b lang="ar" dir="rtl">عَيْنُ الْفِعْلِ</b><strong>ع</strong><span>ʿAyn al-fiʿl</span><p lang={language}>{copy.second}</p></div>
            <div><b lang="ar" dir="rtl">لَامُ الْفِعْلِ</b><strong>ل</strong><span>Lām al-fiʿl</span><p lang={language}>{copy.third}</p></div>
          </div>
          <div className="root-map-strip"><div><b lang="ar" dir="rtl">ك</b><span>→</span><strong lang="ar" dir="rtl">ف</strong></div><div><b lang="ar" dir="rtl">ت</b><span>→</span><strong lang="ar" dir="rtl">ع</strong></div><div><b lang="ar" dir="rtl">ب</b><span>→</span><strong lang="ar" dir="rtl">ل</strong></div></div>
          <p lang={language}>{copy.mapping}</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">KEEP THE ADDITIONS</span>
          <h2>Root letters change; additions stay</h2>
          <p lang={language}>{copy.added}</p>
          <div className="mizan-example-table">
            <div><span>WORD · الْمَوْزُونُ</span><b lang="ar" dir="rtl">كَاتَبَ</b>{showTransliteration&&<small>kātaba</small>}</div>
            <div><span>WEIGHT · الْوَزْنُ</span><b lang="ar" dir="rtl">فَاعَلَ</b>{showTransliteration&&<small>fāʿala</small>}</div>
            <div><span>WORD · الْمَوْزُونُ</span><b lang="ar" dir="rtl">اِسْتَكْتَبَ</b>{showTransliteration&&<small>istaktaba</small>}</div>
            <div><span>WEIGHT · الْوَزْنُ</span><b lang="ar" dir="rtl">اِسْتَفْعَلَ</b>{showTransliteration&&<small>istafʿala</small>}</div>
          </div>
          <div className="caution-note" lang={language}>{copy.vowel}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE SCALE ALSO DESCRIBES NOUN PATTERNS</span>
          <h2>Derived nouns have weights too</h2>
          <div className="noun-pattern-grid">
            <div><b lang="ar" dir="rtl">كَاتِبٌ</b>{showTransliteration&&<small>kātibun</small>}<span>فَاعِلٌ</span>{showTransliteration&&<small>fāʿilun</small>}<small>active participle · writer</small></div>
            <div><b lang="ar" dir="rtl">مَكْتُوبٌ</b>{showTransliteration&&<small>maktūbun</small>}<span>مَفْعُولٌ</span>{showTransliteration&&<small>mafʿūlun</small>}<small>passive participle · written</small></div>
            <div><b lang="ar" dir="rtl">مَكْتَبٌ</b>{showTransliteration&&<small>maktabun</small>}<span>مَفْعَلٌ</span>{showTransliteration&&<small>mafʿalun</small>}<small>place noun · office / desk</small></div>
          </div>
          <div className="caution-note" lang={language}>{copy.quadriliteral}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A COMMON BEGINNER QUESTION</span>
          <h2>Does every three-letter word weigh فَعَلَ?</h2>
          <p lang={language}>{copy.caution}</p>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · FIND THE WAZN</span>
          <h2>Weigh each word</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="classification-list">
            {mizanExamples.map((item,index)=><div className="classification-row" key={item.word}>
              <div className="classification-word"><b lang="ar" dir="rtl">{item.word}</b>{showTransliteration&&<span dir="ltr">{item.translit}</span>}<small>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</small></div>
              <div className="classification-choices" role="group" aria-label={item.word+' pattern'}>
                {choices.map(choice=><button type="button" key={choice.value} className={answers[index]===choice.value?'chosen':''} aria-pressed={answers[index]===choice.value} onClick={()=>{setAnswers({...answers,[index]:choice.value});setChecked(false)}}>{choice.label}</button>)}
              </div>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b lang="ar" dir="rtl">{item.pattern}</b> <span>{language==='fa'?item.analysisFa:language==='ur'?item.analysisUr:item.analysis}</span></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==mizanExamples.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {mizanExamples.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://asjp.cerist.dz/en/downArticlepdf/163/5/1/130194" target="_blank" rel="noreferrer">Zoubir Dendane, “An Overview of Verb Morphology in Arabic,” on root-and-pattern morphology and derived forms.</a></li>
            <li><a href="https://arabicwithoutwalls.ucdavis.edu/chapter14/grammar_note14.html" target="_blank" rel="noreferrer">University of California, Davis — Arabic Without Walls, Grammar Note 14: Verb Forms.</a></li>
            <li><a href="https://www.cambridge.org/core/books/reference-grammar-of-modern-standard-arabic/207FA6CB610D541184C4B8CB10A4084A" target="_blank" rel="noreferrer">Karin C. Ryding, A Reference Grammar of Modern Standard Arabic (Cambridge University Press, 2005).</a></li>
            <li><a href="https://thahabi.org/book/769/read/10" target="_blank" rel="noreferrer">Aḥmad al-Ḥamlāwī, Shadhā al-ʿArf fī Fann al-Ṣarf, section on al-Mīzān al-Ṣarfī.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/04">← Lesson 4: Original and added letters</a><a className="next-lesson-link" href="#/lesson/06">Next: the 14 ṣīghahs →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>The Mīzān Ṣarfī</li><li>ف، ع، ل as model letters</li><li>Root mapping</li><li>Keeping added letters</li><li>Noun patterns</li><li>Pattern practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Write the root above the word first. Then replace the root letters with ف، ع، ل and keep every addition in place.</p></div></aside>
    </div>
  </main>
}


const lessonSixCopy = {
  en: {
    lead: 'The six Abwāb describe the common past-and-present patterns of sound triliteral mujarrad verbs. Learn each verb with its present form; the pattern is not safely guessed from the root alone.',
    objective: 'Recognise the six traditional pairs, notice the vowel on the middle root letter in the past and present, and identify a verb’s bāb from its attested pair.',
    definition: 'A bāb (بَابٌ) is a verb pattern class. For the six common Abwāb of the triliteral mujarrad, the key comparison is between the vowel on the second root consonant (ʿayn al-fiʿl) in the māḍī and in the muḍāriʿ.',
    past: 'Past verb · الْمَاضِي',
    present: 'Present / imperfect · الْمُضَارِعُ',
    middle: 'Middle root letter · عَيْنُ الْفِعْلِ',
    caution: 'These six patterns are largely سماعي (based on established Arabic usage). There is no universal rule that lets a beginner predict every verb’s bāb from its root. Learn the past and present together and verify them in a reliable dictionary.',
    masdar: 'Do not assume the maṣdar is automatically predictable from the bāb. Learn the accepted maṣdar with the verb as a separate vocabulary item.',
    scope: 'This lesson introduces the six patterns for sound triliteral mujarrad verbs. Weak, hamzated, and doubled verbs can show additional changes and will be treated separately.',
    practicePrompt: 'Choose the correct past-and-present weight for each verb pair.',
    correct: 'Correct bāb.',
    incorrect: 'Check the middle-radical vowels. The correct weight is',
    score: 'Your score',
    check: 'Check the six Abwāb',
    teach: 'Name all six Abwāb in order. Then explain why you should memorise a verb’s muḍāriʿ with its māḍī rather than guessing.',
    summary: 'The six Abwāb are patterns of the triliteral mujarrad verb. The vowel of the middle root letter is the key comparison; actual membership is learned from usage and dictionaries.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'شش باب، الگوهای رایج ماضی و مضارعِ فعل ثلاثی مجردِ صحیح را نشان می‌دهند. هر فعل را همراه صورت مضارعش بیاموزید؛ وزن آن را نباید فقط از روی ریشه حدس زد.',
    objective: 'شش جفت سنتی را بشناسید، حرکت حرف میانی ریشه را در ماضی و مضارع مقایسه کنید و باب فعل را از روی دو صورتِ ثبت‌شده تشخیص دهید.',
    definition: 'باب (بَابٌ) دسته‌ای از الگوهای فعلی است. در شش باب مشهور ثلاثی مجرد، حرکت حرف دوم ریشه (عَيْنُ الْفِعْلِ) در ماضی و مضارع با یکدیگر مقایسه می‌شود.',
    past: 'فعل ماضی · الْمَاضِي',
    present: 'فعل مضارع · الْمُضَارِعُ',
    middle: 'حرف میانی ریشه · عَيْنُ الْفِعْلِ',
    caution: 'این شش الگو تا حد زیادی سماعی‌اند؛ یعنی بر پایهٔ کاربرد پذیرفته‌شدهٔ عربی آموخته می‌شوند. قاعده‌ای همگانی وجود ندارد که مبتدی بتواند باب هر فعل را فقط از روی ریشه پیش‌بینی کند. ماضی و مضارع را با هم بیاموزید و در فرهنگ معتبر بررسی کنید.',
    masdar: 'گمان نکنید مصدر هر فعل به‌طور خودکار از روی باب آن قابل پیش‌بینی است. مصدر پذیرفته‌شده را جداگانه همراه فعل حفظ کنید.',
    scope: 'این درس شش الگوی فعل ثلاثی مجرد صحیح را معرفی می‌کند. فعل‌های معتل، مهموز و مضاعف ممکن است تغییرات دیگری داشته باشند که جداگانه بررسی می‌شوند.',
    practicePrompt: 'وزن درستِ ماضی و مضارع هر جفت فعل را انتخاب کنید.',
    correct: 'باب درست است.',
    incorrect: 'حرکت حرف میانی را بررسی کنید. وزن درست:',
    score: 'امتیاز شما',
    check: 'بررسی شش باب',
    teach: 'هر شش باب را به ترتیب نام ببرید. سپس توضیح دهید چرا باید مضارع هر فعل را همراه ماضی آن حفظ کرد، نه این‌که آن را حدس زد.',
    summary: 'شش باب، الگوهای فعل ثلاثی مجردند. حرکت حرف میانی ریشه نکتهٔ اصلیِ مقایسه است؛ اما عضویت هر فعل در یک باب از کاربرد و فرهنگ لغت آموخته می‌شود.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'چھ ابواب صحیح ثلاثی مجرد افعال کے ماضی اور مضارع کے معروف اوزان بیان کرتے ہیں۔ ہر فعل کو اس کے مضارع کے ساتھ یاد کریں؛ صرف مادّے سے باب کا اندازہ نہ لگائیں۔',
    objective: 'چھ روایتی جوڑوں کو پہچانیں، ماضی اور مضارع میں مادّے کے درمیانی حرف کی حرکت کا موازنہ کریں، اور ثابت شدہ دونوں صورتوں سے باب معلوم کریں۔',
    definition: 'باب (بَابٌ) افعال کے وزن کی ایک قسم ہے۔ ثلاثی مجرد کے چھ معروف ابواب میں مادّے کے دوسرے حرف (عَيْنُ الْفِعْلِ) کی حرکت کو ماضی اور مضارع میں دیکھا جاتا ہے۔',
    past: 'فعلِ ماضی · الْمَاضِي',
    present: 'فعلِ مضارع · الْمُضَارِعُ',
    middle: 'مادّے کا درمیانی حرف · عَيْنُ الْفِعْلِ',
    caution: 'یہ چھ اوزان بڑی حد تک سماعی ہیں، یعنی عربی کے مستعمل اور منقول استعمال سے سیکھے جاتے ہیں۔ ایسا کوئی عمومی قاعدہ نہیں جس سے مبتدی صرف مادّے کو دیکھ کر ہر فعل کا باب یقینی طور پر بتا سکے۔ ماضی اور مضارع دونوں ساتھ یاد کریں اور معتبر لغت میں دیکھیں۔',
    masdar: 'یہ نہ سمجھیں کہ مصدر لازماً باب سے خود بخود معلوم ہو جاتا ہے۔ مستعمل مصدر کو فعل کے ساتھ الگ یاد کریں۔',
    scope: 'یہ سبق صحیح ثلاثی مجرد افعال کے چھ اوزان کا تعارف ہے۔ معتل، مهموز اور مضاعف افعال میں مزید تبدیلیاں ہو سکتی ہیں جنہیں الگ پڑھیں گے۔',
    practicePrompt: 'ہر فعل کے ماضی اور مضارع کے لیے درست وزن منتخب کریں۔',
    correct: 'درست باب۔',
    incorrect: 'درمیانی حرف کی حرکات دیکھیں۔ درست وزن ہے:',
    score: 'آپ کا اسکور',
    check: 'چھ ابواب جانچیں',
    teach: 'چھوں ابواب ترتیب سے بیان کریں۔ پھر بتائیں کہ فعل کا مضارع ماضی کے ساتھ یاد کرنا کیوں ضروری ہے، اندازہ لگانا کیوں کافی نہیں۔',
    summary: 'چھ ابواب ثلاثی مجرد فعل کے اوزان ہیں۔ مادّے کے درمیانی حرف کی حرکت بنیادی فرق دکھاتی ہے؛ لیکن ہر فعل کا باب عربی استعمال اور لغت سے معلوم ہوتا ہے۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const sixAbwab = [
  {name:'Bāb Naṣr',past:'نَصَرَ',present:'يَنْصُرُ',pastLatin:'naṣara',presentLatin:'yanṣuru',gloss:'he helped',glossFa:'او یاری کرد',glossUr:'اس نے مدد کی',pastWeight:'فَعَلَ',presentWeight:'يَفْعُلُ',answer:'1',pastVowel:'fatḥah',presentVowel:'ḍammah'},
  {name:'Bāb Ḍarb',past:'ضَرَبَ',present:'يَضْرِبُ',pastLatin:'ḍaraba',presentLatin:'yaḍribu',gloss:'he struck',glossFa:'او زد',glossUr:'اس نے مارا',pastWeight:'فَعَلَ',presentWeight:'يَفْعِلُ',answer:'2',pastVowel:'fatḥah',presentVowel:'kasrah'},
  {name:'Bāb Fatḥ',past:'فَتَحَ',present:'يَفْتَحُ',pastLatin:'fataḥa',presentLatin:'yaftaḥu',gloss:'he opened',glossFa:'او گشود',glossUr:'اس نے کھولا',pastWeight:'فَعَلَ',presentWeight:'يَفْعَلُ',answer:'3',pastVowel:'fatḥah',presentVowel:'fatḥah'},
  {name:'Bāb Samʿ',past:'سَمِعَ',present:'يَسْمَعُ',pastLatin:'samiʿa',presentLatin:'yasmaʿu',gloss:'he heard',glossFa:'او شنید',glossUr:'اس نے سنا',pastWeight:'فَعِلَ',presentWeight:'يَفْعَلُ',answer:'4',pastVowel:'kasrah',presentVowel:'fatḥah'},
  {name:'Bāb Karam',past:'كَرُمَ',present:'يَكْرُمُ',pastLatin:'karuma',presentLatin:'yakrumu',gloss:'he was noble',glossFa:'او بزرگوار بود',glossUr:'وہ باوقار تھا',pastWeight:'فَعُلَ',presentWeight:'يَفْعُلُ',answer:'5',pastVowel:'ḍammah',presentVowel:'ḍammah'},
  {name:'Bāb Ḥasb',past:'حَسِبَ',present:'يَحْسِبُ',pastLatin:'ḥasiba',presentLatin:'yaḥsibu',gloss:'he thought / considered',glossFa:'او پنداشت',glossUr:'اس نے خیال کیا',pastWeight:'فَعِلَ',presentWeight:'يَفْعِلُ',answer:'6',pastVowel:'kasrah',presentVowel:'kasrah'},
] as const


const lessonSixIntroCopy = {
  en: {
    lead: 'A ṣīghah is one conjugated form of a verb. Traditional Sarf study organises the verb into 14 teaching slots so you can see who is acting: third person, second person, or first person.',
    objective: 'Memorise the 14-slot order, distinguish ghāʾib, mukhāṭab, and mutakallim, and understand why some pronoun slots share the same written form.',
    definition: 'The traditional table has six ghāʾib (third-person) slots, six mukhāṭab (second-person) slots, and two mutakallim (first-person) slots. Each slot combines person, number, and gender.',
    order: 'Read the sequence from top to bottom: six absent/third-person forms, six addressed/second-person forms, and two speaker/first-person forms.',
    dual: 'The third-person dual has separate masculine and feminine verb forms. The second-person dual pronoun أَنْتُمَا is the same for both genders, so it appears in two teaching slots with the same pronoun spelling.',
    caution: 'The “14 forms” are 14 traditional teaching slots, not 14 unique pronoun spellings. Keep the two dual-gender slots distinct when studying the table.',
    practice: 'Identify whether each pronoun belongs to ghāʾib (third person), mukhāṭab (second person), or mutakallim (first person).',
    correct: 'Correct group.',
    incorrect: 'The correct group is',
    score: 'Your score',
    check: 'Check groups',
    teach: 'Recite the 14 pronouns in order. Then explain the difference between ghāʾib, mukhāṭab, and mutakallim.',
    summary: 'The 14-slot order is six ghāʾib, six mukhāṭab, and two mutakallim. Learn the slots before memorising the verb endings in the next lessons.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'صیغه یکی از صورت‌های صرف‌شدهٔ فعل است. در آموزش سنتی صرف، فعل در ۱۴ جایگاه قرار می‌گیرد تا روشن شود چه کسی انجام‌دهنده است: غایب، مخاطب یا متکلم.',
    objective: 'ترتیب ۱۴ جایگاه را حفظ کنید، غایب و مخاطب و متکلم را از هم تشخیص دهید و بدانید چرا برخی جایگاه‌ها صورت نوشتاری یکسان دارند.',
    definition: 'جدول سنتی شش جایگاه غایب، شش جایگاه مخاطب و دو جایگاه متکلم دارد. هر جایگاه شخص، شمار و جنس را نشان می‌دهد.',
    order: 'ترتیب را از بالا به پایین بخوانید: شش صورت غایب، شش صورت مخاطب و دو صورت متکلم.',
    dual: 'در غایب، صورت مثنای مذکر و مؤنث در فعل متفاوت است. ضمیر مثنای مخاطب أَنْتُمَا برای هر دو جنس یکسان است؛ بنابراین در دو جایگاه آموزشی با نوشتار یکسان می‌آید.',
    caution: '«۱۴ صیغه» به معنای ۱۴ نوشتارِ ضمیرِ متفاوت نیست؛ بلکه ۱۴ جایگاه سنتی آموزشی است. هنگام مطالعه، دو جایگاه مثنای جنسیتی را جدا نگه دارید.',
    practice: 'مشخص کنید هر ضمیر به غایب، مخاطب یا متکلم تعلق دارد.',
    correct: 'گروه درست است.',
    incorrect: 'گروه درست:',
    score: 'امتیاز شما',
    check: 'بررسی گروه‌ها',
    teach: 'چهارده ضمیر را به ترتیب بخوانید. سپس تفاوت غایب، مخاطب و متکلم را توضیح دهید.',
    summary: 'ترتیب ۱۴ جایگاه شامل شش غایب، شش مخاطب و دو متکلم است. پیش از حفظ پایان‌های فعل، این جایگاه‌ها را بیاموزید.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'صیغہ فعل کی ایک گردانی ہوئی صورت ہے۔ علمِ صرف کی روایتی تعلیم میں فعل کو چودہ خانوں میں رکھا جاتا ہے تاکہ معلوم ہو کہ کام کرنے والا غائب، مخاطب یا متکلم ہے۔',
    objective: 'چودہ خانوں کی ترتیب یاد کریں، غائب، مخاطب اور متکلم میں فرق کریں، اور سمجھیں کہ بعض خانوں کے ضمیر ایک جیسے کیوں لکھے جاتے ہیں۔',
    definition: 'روایتی جدول میں چھ غائب، چھ مخاطب اور دو متکلم کے خانے ہوتے ہیں۔ ہر خانہ شخص، تعداد اور جنس کو ظاہر کرتا ہے۔',
    order: 'ترتیب اوپر سے نیچے پڑھیں: پہلے چھ غائب، پھر چھ مخاطب، اور آخر میں دو متکلم کے صیغے۔',
    dual: 'غائب تثنیہ میں مذکر اور مؤنث کے فعل کی صورتیں مختلف ہیں۔ مخاطب تثنیہ کا ضمیر أَنْتُمَا دونوں جنسوں کے لیے ایک جیسا ہے، اس لیے دو تعلیمی خانوں میں ایک ہی طرح لکھا جاتا ہے۔',
    caution: '’’چودہ صیغے‘‘ کا مطلب چودہ الگ الگ ضمیری املا نہیں، بلکہ صرف کی تعلیم کے چودہ روایتی خانے ہیں۔ تثنیہ کے دونوں صنفی خانوں کو الگ یاد رکھیں۔',
    practice: 'بتائیں کہ ہر ضمیر غائب، مخاطب یا متکلم میں سے کس گروہ سے تعلق رکھتا ہے۔',
    correct: 'درست گروہ۔',
    incorrect: 'درست گروہ ہے:',
    score: 'آپ کا اسکور',
    check: 'گروہ جانچیں',
    teach: 'چودہ ضمیروں کو ترتیب سے پڑھیں۔ پھر غائب، مخاطب اور متکلم کا فرق بیان کریں۔',
    summary: 'چودہ خانوں کی ترتیب میں چھ غائب، چھ مخاطب اور دو متکلم ہیں۔ فعل کے لاحقے یاد کرنے سے پہلے ان خانوں کو اچھی طرح سیکھیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const pronounSlots = [
  {pronoun:'هُوَ',latin:'huwa',role:'3rd · masculine singular',roleFa:'غایب · مذکر مفرد',roleUr:'غائب · مذکر واحد',group:'ghaib'},
  {pronoun:'هُمَا',latin:'humā',role:'3rd · masculine dual',roleFa:'غایب · مذکر مثنّی',roleUr:'غائب · مذکر تثنیہ',group:'ghaib'},
  {pronoun:'هُمْ',latin:'hum',role:'3rd · masculine plural',roleFa:'غایب · مذکر جمع',roleUr:'غائب · مذکر جمع',group:'ghaib'},
  {pronoun:'هِيَ',latin:'hiya',role:'3rd · feminine singular',roleFa:'غایب · مؤنث مفرد',roleUr:'غائب · مؤنث واحد',group:'ghaib'},
  {pronoun:'هُمَا',latin:'humā',role:'3rd · feminine dual',roleFa:'غایب · مؤنث مثنّی',roleUr:'غائب · مؤنث تثنیہ',group:'ghaib'},
  {pronoun:'هُنَّ',latin:'hunna',role:'3rd · feminine plural',roleFa:'غایب · مؤنث جمع',roleUr:'غائب · مؤنث جمع',group:'ghaib'},
  {pronoun:'أَنْتَ',latin:'anta',role:'2nd · masculine singular',roleFa:'مخاطب · مذکر مفرد',roleUr:'مخاطب · مذکر واحد',group:'mukhatab'},
  {pronoun:'أَنْتُمَا',latin:'antumā',role:'2nd · masculine dual',roleFa:'مخاطب · مذکر مثنّی',roleUr:'مخاطب · مذکر تثنیہ',group:'mukhatab'},
  {pronoun:'أَنْتُمْ',latin:'antum',role:'2nd · masculine plural',roleFa:'مخاطب · مذکر جمع',roleUr:'مخاطب · مذکر جمع',group:'mukhatab'},
  {pronoun:'أَنْتِ',latin:'anti',role:'2nd · feminine singular',roleFa:'مخاطب · مؤنث مفرد',roleUr:'مخاطب · مؤنث واحد',group:'mukhatab'},
  {pronoun:'أَنْتُمَا',latin:'antumā',role:'2nd · feminine dual',roleFa:'مخاطب · مؤنث مثنّی',roleUr:'مخاطب · مؤنث تثنیہ',group:'mukhatab'},
  {pronoun:'أَنْتُنَّ',latin:'antunna',role:'2nd · feminine plural',roleFa:'مخاطب · مؤنث جمع',roleUr:'مخاطب · مؤنث جمع',group:'mukhatab'},
  {pronoun:'أَنَا',latin:'anā',role:'1st · singular',roleFa:'متکلم · مفرد',roleUr:'متکلم · واحد',group:'mutakallim'},
  {pronoun:'نَحْنُ',latin:'naḥnu',role:'1st · plural',roleFa:'متکلم · جمع',roleUr:'متکلم · جمع',group:'mutakallim'},
]
const pronounGroupPractice = [
  {pronoun:'هُنَّ',latin:'hunna',answer:'ghaib'},
  {pronoun:'أَنْتُمْ',latin:'antum',answer:'mukhatab'},
  {pronoun:'نَحْنُ',latin:'naḥnu',answer:'mutakallim'},
  {pronoun:'هُوَ',latin:'huwa',answer:'ghaib'},
]
const pronounGroupChoices = [
  {value:'ghaib',label:'غَائِبٌ · third person'},
  {value:'mukhatab',label:'مُخَاطَبٌ · second person'},
  {value:'mutakallim',label:'مُتَكَلِّمٌ · first person'},
]

function LessonSixPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonSixIntroCopy[language]
  const rtl = language !== 'en'
  const score = pronounGroupPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/05" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 06</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · THE FOURTEEN ṢĪGHAHS</div>
        <h1>The <em>14 Ṣīghahs</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الصِّيَغُ الْأَرْبَعَ عَشْرَةَ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-ṣīghāt al-arbaʿ ʿashrah</div>}
          <h2>Three groups of pronouns</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE 14-SLOT ORDER</span>
          <div className="pronoun-group-cards"><div><b lang="ar" dir="rtl">غَائِبٌ</b><strong>6</strong><span>Ghāʾib · third person</span></div><div><b lang="ar" dir="rtl">مُخَاطَبٌ</b><strong>6</strong><span>Mukhāṭab · second person</span></div><div><b lang="ar" dir="rtl">مُتَكَلِّمٌ</b><strong>2</strong><span>Mutakallim · first person</span></div></div>
          <p lang={language}>{copy.order}</p>
          <div className="pronoun-slots-grid">
            <div className="pronoun-slots-head"><span>#</span><span>Pronoun</span><span>Person · number · gender</span><span>Group</span></div>
            {pronounSlots.map((item,index)=><div className="pronoun-slots-row" key={index}>
              <span className="conjugation-index">{index+1}</span>
              <div className="conjugation-pronoun"><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <span className="conjugation-slot">{language==='fa'?item.roleFa:language==='ur'?item.roleUr:item.role}</span>
              <span className="pronoun-group-label">{item.group==='ghaib'?'غَائِبٌ':item.group==='mukhatab'?'مُخَاطَبٌ':'مُتَكَلِّمٌ'}</span>
            </div>)}
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">AN IMPORTANT DISTINCTION</span>
          <h2>Fourteen slots, not fourteen unique spellings</h2>
          <div className="warning-card"><strong>Dual forms</strong><p lang={language}>{copy.dual}</p></div>
          <div className="caution-note" lang={language}>{copy.caution}</div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · CLASSIFY THE PRONOUN</span>
          <h2>Which group does it belong to?</h2>
          <p lang={language}>{copy.practice}</p>
          <div className="pronoun-practice-list">
            {pronounGroupPractice.map((item,index)=><div className="pronoun-practice-row" key={item.pronoun+index}>
              <div><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the group for '+item.pronoun} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose group…</option>
                {pronounGroupChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{pronounGroupChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==pronounGroupPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {pronounGroupPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.ghazali.org/books/haywood-65.pdf" target="_blank" rel="noreferrer">Haywood and Nahmad, A New Arabic Grammar, section on personal pronouns.</a></li>
            <li><a href="https://www.fivesuper.com/support/downloads/Arabic-Grammar-in-Context_Mohammad-T.-Alhawary-%282016%29.pdf" target="_blank" rel="noreferrer">Mohammad T. Alhawary, Arabic Grammar in Context (2016), section on verb conjugation and person/number/gender.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/05">← Lesson 5: Mīzān Ṣarfī</a><a className="next-lesson-link" href="#/lesson/07">Next: past active →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>What is a ṣīghah?</li><li>Three pronoun groups</li><li>14-slot order</li><li>Gender and dual slots</li><li>Shared spellings</li><li>Classification practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Memorise the groups first: 6 ghāʾib, 6 mukhāṭab, 2 mutakallim. Then learn each verb table in this order.</p></div></aside>
    </div>
  </main>
}

function LessonTwelvePage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonSixCopy[language]
  const rtl = language !== 'en'
  const score = sixAbwab.filter((item,index)=>answers[index]===item.answer).length
  const choices = [
    {value:'1',label:'فَعَلَ يَفْعُلُ'},
    {value:'2',label:'فَعَلَ يَفْعِلُ'},
    {value:'3',label:'فَعَلَ يَفْعَلُ'},
    {value:'4',label:'فَعِلَ يَفْعَلُ'},
    {value:'5',label:'فَعُلَ يَفْعُلُ'},
    {value:'6',label:'فَعِلَ يَفْعِلُ'},
  ]
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/11" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 04 · LESSON 12</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 04 · THE SIX COMMON ABWĀB</div>
        <h1>The six <em>Abwāb</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">أَبْوَابُ الْفِعْلِ الثُّلَاثِيِّ الْمُجَرَّدِ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">abwāb al-fiʿl al-thulāthī al-mujarrad</div>}
          <h2>Six common Form I patterns</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE SIX PAIRS</span>
          <div className="abwab-grid">
            {sixAbwab.map((item,index)=><div className="bāb-card" key={item.answer}>
              <div className="bāb-number">0{index+1}</div>
              <strong>{item.name}</strong>
              <div className="bāb-pair"><div><span>{copy.past}</span><b lang="ar" dir="rtl">{item.past}</b>{showTransliteration&&<small>{item.pastLatin}</small>}</div><div><span>{copy.present}</span><b lang="ar" dir="rtl">{item.present}</b>{showTransliteration&&<small>{item.presentLatin}</small>}</div></div>
              <div className="bāb-weight"><b lang="ar" dir="rtl">{item.pastWeight}</b><span>→</span><b lang="ar" dir="rtl">{item.presentWeight}</b></div>
              <div className="bāb-vowel-row"><span>ʿAyn in māḍī: <b lang="ar" dir="rtl">{item.pastVowel==='fatḥah'?'فَتْحَةٌ':item.pastVowel==='kasrah'?'كَسْرَةٌ':'ضَمَّةٌ'}</b></span><span>ʿAyn in muḍāriʿ: <b lang="ar" dir="rtl">{item.presentVowel==='fatḥah'?'فَتْحَةٌ':item.presentVowel==='kasrah'?'كَسْرَةٌ':'ضَمَّةٌ'}</b></span></div>
              <p>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</p>
            </div>)}
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">WHAT CHANGES?</span>
          <h2>Watch the middle root letter</h2>
          <p lang={language}>{copy.middle}</p>
          <div className="vowel-observation">
            <div><span>PAST · الْمَاضِي</span><strong>فَعَلَ / فَعِلَ / فَعُلَ</strong><small>fatḥah · kasrah · ḍammah</small></div>
            <div><span>PRESENT · الْمُضَارِعُ</span><strong>يَفْعُلُ / يَفْعِلُ / يَفْعَلُ</strong><small>ḍammah · kasrah · fatḥah</small></div>
          </div>
          <div className="caution-note" lang={language}>{copy.caution}</div>
          <div className="warning-card"><strong>And what about the maṣdar?</strong><p lang={language}>{copy.masdar}</p></div>
          <div className="warning-card"><strong>Scope of this lesson</strong><p lang={language}>{copy.scope}</p></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE BĀB</span>
          <h2>Match the past and present</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="classification-list">
            {sixAbwab.map((item,index)=><div className="classification-row" key={item.answer}>
              <div className="classification-word"><b lang="ar" dir="rtl">{item.past} · {item.present}</b>{showTransliteration&&<span dir="ltr">{item.pastLatin} · {item.presentLatin}</span>}<small>{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</small></div>
              <div className="classification-choices" role="group" aria-label={item.past+' '+item.present+' bāb'}>
                {choices.map(choice=><button type="button" key={choice.value} className={answers[index]===choice.value?'chosen':''} aria-pressed={answers[index]===choice.value} onClick={()=>{setAnswers({...answers,[index]:choice.value});setChecked(false)}}>{choice.label}</button>)}
              </div>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{item.pastWeight} · {item.presentWeight}</b><span>ʿAyn: {item.pastVowel} → {item.presentVowel}</span></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==sixAbwab.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {sixAbwab.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://attahawi.com/wp-content/uploads/2010/01/treasures-of-arabic-morphology.pdf" target="_blank" rel="noreferrer">Treasures of Arabic Morphology — the six categories (أبواب) of the triliteral mujarrad verb and the سماعي nature of the patterns.</a></li>
            <li><a href="https://ablibrary.net/book_content/b/11500/80" target="_blank" rel="noreferrer">Sayyid Muḥammad Taqī al-Ḥusaynī al-Jalālī, Nuzhat al-Ṭarf fī ʿIlm al-Ṣarf, p. 80.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/11">← Lesson 11: Imperative and prohibitive</a><a className="next-lesson-link" href="#/lesson/13">Next: mujarrad and mazīd →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Six Abwāb</li><li>Past and present pairs</li><li>Middle radical vowels</li><li>Maṣdar caution</li><li>Classification practice</li><li>Teach-back</li><li>Sources</li></ol><div className="aside-note"><strong>Study tip</strong><p>Write each verb as a pair: māḍī + muḍāriʿ. Learn the vowel of the middle root letter in both forms.</p></div></aside>
    </div>
  </main>
}


const lessonSevenCopy = {
  en: {
    lead: 'A verb changes its ending to show who performed the action. This lesson introduces the traditional 14-slot table for the active past of كَتَبَ.',
    objective: 'Read the 14 forms in the agreed order, connect each form to its pronoun, and recognise the endings that distinguish person, gender, and number.',
    definition: 'الْمَاضِي الْمَعْرُوفُ (al-māḍī al-maʿrūf) is the active past form. In this table, the verb ending identifies its subject. The traditional 14 slots are grouped as six third-person forms, six second-person forms, and two first-person forms.',
    orderNote: 'The table follows the 14-slot Sarf order: ghāʾib (third person), mukhāṭab (second person), then mutakallim (first person).',
    dualNote: 'The third-person masculine and feminine dual forms differ: كَتَبَا vs. كَتَبَتَا. The second-person dual form كَتَبْتُمَا is the same for masculine and feminine, but the traditional table keeps both gender slots.',
    confusion: 'Watch the plural endings: هُمْ takes كَتَبُوا (katabū), while هُنَّ takes كَتَبْنَ (katabna). For “you”, compare كَتَبْتَ (masculine singular) with كَتَبْتِ (feminine singular).',
    practicePrompt: 'Choose the pronoun that matches each past-tense verb form.',
    correct: 'Correct pronoun.',
    incorrect: 'Check the ending. The matching pronoun is',
    score: 'Your score',
    check: 'Check pronouns',
    teach: 'Recite the 14 forms in order. Explain the difference between كَتَبُوا and كَتَبْنَ, and why أَنْتُمَا appears in two gender slots.',
    summary: 'Learn the pronoun and its verb ending together. The 14-slot table is a learning arrangement; the two second-person dual slots share the same surface form.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'پایان فعل تغییر می‌کند تا نشان دهد چه کسی کار را انجام داده است. در این درس جدول سنتی ۱۴ صیغهٔ ماضی معلومِ كَتَبَ را می‌آموزیم.',
    objective: 'چهارده جایگاه را به ترتیب بخوانید، هر صورت را به ضمیر مربوط کنید و پایان‌هایی را که شخص، جنس و شمار را نشان می‌دهند تشخیص دهید.',
    definition: 'الْمَاضِي الْمَعْرُوفُ یعنی ماضی معلوم. در این جدول، پایان فعل فاعل آن را مشخص می‌کند. چهارده جایگاه سنتی در سه گروه آمده‌اند: شش صورت غایب، شش صورت مخاطب و دو صورت متکلم.',
    orderNote: 'ترتیب جدول همان ترتیب ۱۴ صیغه در صرف است: غایب، سپس مخاطب و در پایان متکلم.',
    dualNote: 'صورت مثنای غایب مذکر و مؤنث متفاوت است: كَتَبَا در برابر كَتَبَتَا. اما صورت مثنای مخاطب، كَتَبْتُمَا، برای مذکر و مؤنث یکسان است؛ با این حال در جدول سنتی دو جایگاه جدا دارد.',
    confusion: 'به پایان جمع توجه کنید: برای هُمْ صورت كَتَبُوا (katabū) و برای هُنَّ صورت كَتَبْنَ (katabna) می‌آید. در مخاطب مفرد نیز كَتَبْتَ مذکر و كَتَبْتِ مؤنث است.',
    practicePrompt: 'ضمیر مناسب هر صورت فعل ماضی را انتخاب کنید.',
    correct: 'ضمیر درست است.',
    incorrect: 'پایان فعل را بررسی کنید. ضمیر متناظر:',
    score: 'امتیاز شما',
    check: 'بررسی ضمیرها',
    teach: 'چهارده صیغه را به ترتیب بخوانید. تفاوت كَتَبُوا و كَتَبْنَ را توضیح دهید و بگویید چرا أَنْتُمَا در دو جایگاه جنسیتی آمده است.',
    summary: 'ضمیر و پایان فعل را با هم حفظ کنید. جدول ۱۴ صیغه یک ترتیب آموزشی است؛ دو جایگاه مثنای مخاطب در ظاهر یک صورت دارند.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'فعل کا آخری حصہ بدلتا ہے تاکہ معلوم ہو کہ کام کس نے کیا۔ اس سبق میں كَتَبَ کے ماضی معروف کی روایتی چودہ صیغوں والی جدول سیکھیں گے۔',
    objective: 'چودہ صیغوں کو مقررہ ترتیب سے پڑھیں، ہر صورت کو اس کے ضمیر سے ملائیں، اور شخص، جنس اور تعداد ظاہر کرنے والے لاحقے پہچانیں۔',
    definition: 'الْمَاضِي الْمَعْرُوفُ ماضی معروف ہے۔ اس جدول میں فعل کا آخری حصہ فاعل کی نشاندہی کرتا ہے۔ روایتی چودہ خانے تین گروہوں میں ہیں: چھ غائب، چھ مخاطب، اور دو متکلم کے صیغے۔',
    orderNote: 'جدول صرف کی چودہ صیغوں والی ترتیب پر ہے: پہلے غائب، پھر مخاطب، اور آخر میں متکلم۔',
    dualNote: 'غائب مذکر اور مؤنث تثنیہ کی صورتیں مختلف ہیں: كَتَبَا اور كَتَبَتَا۔ مخاطب تثنیہ كَتَبْتُمَا مذکر اور مؤنث دونوں کے لیے ایک جیسا ہے، مگر روایتی جدول میں دونوں جنسوں کے الگ خانے رکھے جاتے ہیں۔',
    confusion: 'جمع کے لاحقوں پر توجہ دیں: هُمْ کے لیے كَتَبُوا (katabū) اور هُنَّ کے لیے كَتَبْنَ (katabna) آتا ہے۔ مخاطب واحد میں كَتَبْتَ مذکر اور كَتَبْتِ مؤنث ہے۔',
    practicePrompt: 'ہر ماضی کے فعل کے لیے درست ضمیر منتخب کریں۔',
    correct: 'درست ضمیر۔',
    incorrect: 'فعل کا آخری حصہ دیکھیں۔ متعلقہ ضمیر ہے:',
    score: 'آپ کا اسکور',
    check: 'ضمائر جانچیں',
    teach: 'چودہ صیغے ترتیب سے پڑھیں۔ كَتَبُوا اور كَتَبْنَ کا فرق بیان کریں، اور بتائیں کہ أَنْتُمَا دو صنفی خانوں میں کیوں آتا ہے۔',
    summary: 'ضمیر اور فعل کے لاحقے کو ساتھ یاد کریں۔ چودہ خانوں والی جدول ایک تعلیمی ترتیب ہے؛ مخاطب تثنیہ کے دونوں خانے ایک ہی ظاہری صورت رکھتے ہیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const pastActiveForms = [
  {pronoun:'هُوَ',pronounLatin:'huwa',slot:'3rd · masculine singular',slotFa:'غایب · مذکر مفرد',slotUr:'غائب · مذکر واحد',verb:'كَتَبَ',verbLatin:'kataba',gloss:'he wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',key:'huwa'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · masculine dual',slotFa:'غایب · مذکر مثنّی',slotUr:'غائب · مذکر تثنیہ',verb:'كَتَبَا',verbLatin:'katabā',gloss:'they two (masc.) wrote',glossFa:'آن دو مرد نوشتند',glossUr:'ان دونوں مردوں نے لکھا',key:'huma-m'},
  {pronoun:'هُمْ',pronounLatin:'hum',slot:'3rd · masculine plural',slotFa:'غایب · مذکر جمع',slotUr:'غائب · مذکر جمع',verb:'كَتَبُوا',verbLatin:'katabū',gloss:'they (masc.) wrote',glossFa:'آن مردان نوشتند',glossUr:'ان مردوں نے لکھا',key:'hum'},
  {pronoun:'هِيَ',pronounLatin:'hiya',slot:'3rd · feminine singular',slotFa:'غایب · مؤنث مفرد',slotUr:'غائب · مؤنث واحد',verb:'كَتَبَتْ',verbLatin:'katabat',gloss:'she wrote',glossFa:'او نوشت',glossUr:'اس نے لکھا',key:'hiya'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · feminine dual',slotFa:'غایب · مؤنث مثنّی',slotUr:'غائب · مؤنث تثنیہ',verb:'كَتَبَتَا',verbLatin:'katabatā',gloss:'they two (fem.) wrote',glossFa:'آن دو زن نوشتند',glossUr:'ان دونوں عورتوں نے لکھا',key:'huma-f'},
  {pronoun:'هُنَّ',pronounLatin:'hunna',slot:'3rd · feminine plural',slotFa:'غایب · مؤنث جمع',slotUr:'غائب · مؤنث جمع',verb:'كَتَبْنَ',verbLatin:'katabna',gloss:'they (fem.) wrote',glossFa:'آن زنان نوشتند',glossUr:'ان عورتوں نے لکھا',key:'hunna'},
  {pronoun:'أَنْتَ',pronounLatin:'anta',slot:'2nd · masculine singular',slotFa:'مخاطب · مذکر مفرد',slotUr:'مخاطب · مذکر واحد',verb:'كَتَبْتَ',verbLatin:'katabta',gloss:'you (masc. sg.) wrote',glossFa:'تو (مذکر) نوشتی',glossUr:'تم (مذکر) نے لکھا',key:'anta'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · masculine dual',slotFa:'مخاطب · مذکر مثنّی',slotUr:'مخاطب · مذکر تثنیہ',verb:'كَتَبْتُمَا',verbLatin:'katabtumā',gloss:'you two (masc.) wrote',glossFa:'شما دو مرد نوشتید',glossUr:'تم دونوں مردوں نے لکھا',key:'antuma-m'},
  {pronoun:'أَنْتُمْ',pronounLatin:'antum',slot:'2nd · masculine plural',slotFa:'مخاطب · مذکر جمع',slotUr:'مخاطب · مذکر جمع',verb:'كَتَبْتُمْ',verbLatin:'katabtum',gloss:'you (masc. pl.) wrote',glossFa:'شما مردان نوشتید',glossUr:'تم سب مردوں نے لکھا',key:'antum'},
  {pronoun:'أَنْتِ',pronounLatin:'anti',slot:'2nd · feminine singular',slotFa:'مخاطب · مؤنث مفرد',slotUr:'مخاطب · مؤنث واحد',verb:'كَتَبْتِ',verbLatin:'katabti',gloss:'you (fem. sg.) wrote',glossFa:'تو (مؤنث) نوشتی',glossUr:'تم (مؤنث) نے لکھا',key:'anti'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · feminine dual',slotFa:'مخاطب · مؤنث مثنّی',slotUr:'مخاطب · مؤنث تثنیہ',verb:'كَتَبْتُمَا',verbLatin:'katabtumā',gloss:'you two (fem.) wrote',glossFa:'شما دو زن نوشتید',glossUr:'تم دونوں عورتوں نے لکھا',key:'antuma-f'},
  {pronoun:'أَنْتُنَّ',pronounLatin:'antunna',slot:'2nd · feminine plural',slotFa:'مخاطب · مؤنث جمع',slotUr:'مخاطب · مؤنث جمع',verb:'كَتَبْتُنَّ',verbLatin:'katabtunna',gloss:'you (fem. pl.) wrote',glossFa:'شما زنان نوشتید',glossUr:'تم عورتوں نے لکھا',key:'antunna'},
  {pronoun:'أَنَا',pronounLatin:'anā',slot:'1st · singular',slotFa:'متکلم · مفرد',slotUr:'متکلم · واحد',verb:'كَتَبْتُ',verbLatin:'katabtu',gloss:'I wrote',glossFa:'من نوشتم',glossUr:'میں نے لکھا',key:'ana'},
  {pronoun:'نَحْنُ',pronounLatin:'naḥnu',slot:'1st · plural',slotFa:'متکلم · جمع',slotUr:'متکلم · جمع',verb:'كَتَبْنَا',verbLatin:'katabnā',gloss:'we wrote',glossFa:'ما نوشتیم',glossUr:'ہم نے لکھا',key:'nahnu'},
] as const

const pastPronounPractice = [
  {verb:'كَتَبُوا',latin:'katabū',answer:'hum'},
  {verb:'كَتَبْنَ',latin:'katabna',answer:'hunna'},
  {verb:'كَتَبَتَا',latin:'katabatā',answer:'huma-f'},
  {verb:'كَتَبْتِ',latin:'katabti',answer:'anti'},
  {verb:'كَتَبْتُنَّ',latin:'katabtunna',answer:'antunna'},
  {verb:'كَتَبْنَا',latin:'katabnā',answer:'nahnu'},
]
const pastPronounChoices = [
  {value:'huwa',label:'هُوَ · huwa'},
  {value:'huma-m',label:'هُمَا · masculine dual'},
  {value:'hum',label:'هُمْ · hum'},
  {value:'hiya',label:'هِيَ · hiya'},
  {value:'huma-f',label:'هُمَا · feminine dual'},
  {value:'hunna',label:'هُنَّ · hunna'},
  {value:'anta',label:'أَنْتَ · anta'},
  {value:'antuma-m',label:'أَنْتُمَا · masculine dual'},
  {value:'antum',label:'أَنْتُمْ · antum'},
  {value:'anti',label:'أَنْتِ · anti'},
  {value:'antuma-f',label:'أَنْتُمَا · feminine dual'},
  {value:'antunna',label:'أَنْتُنَّ · antunna'},
  {value:'ana',label:'أَنَا · anā'},
  {value:'nahnu',label:'نَحْنُ · naḥnu'},
]

function LessonSevenPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonSevenCopy[language]
  const rtl = language !== 'en'
  const score = pastPronounPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/06" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 07</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · THE FOURTEEN ṢĪGHAHS</div>
        <h1>Past active: <em>14 forms</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الصِّيَغُ الْأَرْبَعَ عَشْرَةَ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-ṣīghāt al-arbaʿ ʿashrah</div>}
          <h2 lang="ar" dir="rtl">الْمَاضِي الْمَعْرُوفُ</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FULL 14-SLOT TABLE</span>
          <h2>كَتَبَ · kataba · he wrote</h2>
          <p lang={language}>{copy.orderNote}</p>
          <div className="conjugation-grid">
            <div className="conjugation-head"><span>#</span><span>Pronoun</span><span>Person / number / gender</span><span>Past active form</span><span>Meaning</span></div>
            {pastActiveForms.map((item,index)=><div className="conjugation-row" key={index}>
              <span className="conjugation-index">{index+1}</span>
              <div className="conjugation-pronoun"><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.pronounLatin}</small>}</div>
              <span className="conjugation-slot">{language==='fa'?item.slotFa:language==='ur'?item.slotUr:item.slot}</span>
              <div className="conjugation-verb"><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.verbLatin}</small>}</div>
              <span className="conjugation-gloss">{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</span>
            </div>)}
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">TWO IMPORTANT DETAILS</span>
          <h2>Do not merge the dual forms</h2>
          <div className="warning-card"><strong>Third-person dual</strong><p lang={language}>{copy.dualNote}</p></div>
          <div className="warning-card"><strong>Masculine and feminine plural</strong><p lang={language}>{copy.confusion}</p></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE PRONOUN</span>
          <h2>Read the ending</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="pronoun-practice-list">
            {pastPronounPractice.map((item,index)=><div className="pronoun-practice-row" key={item.verb}>
              <div><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the pronoun for '+item.verb} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose pronoun…</option>
                {pastPronounChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{pastPronounChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==pastPronounPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {pastPronounPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.fivesuper.com/support/downloads/Arabic-Grammar-in-Context_Mohammad-T.-Alhawary-%282016%29.pdf" target="_blank" rel="noreferrer">Mohammad T. Alhawary, Arabic Grammar in Context (2016), section on the past/perfective and its conjugation endings.</a></li>
            <li><a href="https://www.ghazali.org/books/haywood-65.pdf" target="_blank" rel="noreferrer">Haywood and Nahmad, A New Arabic Grammar, section on personal pronouns and basic verb forms.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/06">← Lesson 6: Six Abwāb</a><span>Next: present active (المضارع المعروف)</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Past active</li><li>14-slot order</li><li>Third person</li><li>Second person</li><li>First person</li><li>Dual and plural distinctions</li><li>Pronoun practice</li></ol><div className="aside-note"><strong>Study tip</strong><p>Memorise the six ghāʾib forms first, then the six mukhāṭab forms, and finish with anā and naḥnu.</p></div></aside>
    </div>
  </main>
}


const lessonEightCopy = {
  en: {
    lead: 'The muḍāriʿ is the active imperfect form. It can describe present, ongoing, or future action depending on context. Here we learn its 14-slot traditional table with يَكْتُبُ as the model.',
    objective: 'Recognise the four muḍāriʿ prefixes, read the 14-slot table in order, and identify the subject from prefixes and endings.',
    definition: 'الْمُضَارِعُ الْمَعْرُوفُ is the active imperfect. It is built with a prefix from أ، ن، ي، ت and, for some persons, a suffix. The table below shows the default indicative (marfūʿ) forms.',
    orderNote: 'The table follows the same 14-slot Sarf order as the past: six ghāʾib, six mukhāṭab, then two mutakallim. Some surface forms are shared by more than one slot.',
    prefixes: 'The four prefix letters are أ (I), ن (we), ي (third-person masculine), and ت (second person and third-person feminine). They are called ḥurūf al-muḍāraʿah.',
    overlap: 'Some forms are identical without context. تَكْتُبُ can mean “she writes” (هِيَ) or “you write” (أَنْتَ). تَكْتُبَانِ can appear for feminine third-person dual and both second-person dual slots. The pronoun or sentence context resolves the meaning.',
    scope: 'This table shows the default indicative (marfūʿ) forms. Later lessons will explain how particles such as لَنْ and لَمْ affect the muḍāriʿ, and how the passive form differs.',
    practicePrompt: 'Choose the pronoun that matches each selected muḍāriʿ form. The practice uses forms that are distinguishable without extra sentence context.',
    correct: 'Correct pronoun.',
    incorrect: 'Check the prefix and ending. The matching pronoun is',
    score: 'Your score',
    check: 'Check pronouns',
    teach: 'Name the four prefix letters. Then explain why تَكْتُبُ can mean either “she writes” or “you (masculine) write.”',
    summary: 'Read the prefix first, then the suffix. Remember that the muḍāriʿ can refer to present or future action, and context determines the translation.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'مضارع معلوم صورت فعلیِ ناقص است و با توجه به بافت می‌تواند بر زمان حال، استمرار یا آینده دلالت کند. در این درس جدول سنتی ۱۴ جایگاهی را با نمونهٔ يَكْتُبُ می‌آموزیم.',
    objective: 'چهار پیشوند مضارع را بشناسید، جدول ۱۴ جایگاهی را به ترتیب بخوانید و از روی پیشوند و پسوند فاعل را تشخیص دهید.',
    definition: 'الْمُضَارِعُ الْمَعْرُوفُ یعنی مضارع معلوم. این فعل با یکی از پیشوندهای أ، ن، ي، ت ساخته می‌شود و در برخی صیغه‌ها پسوند نیز دارد. جدول زیر صورت‌های پیش‌فرض مرفوع را نشان می‌دهد.',
    orderNote: 'جدول همان ترتیب ۱۴ صیغهٔ صرفیِ ماضی را دارد: شش غایب، شش مخاطب و سپس دو متکلم. برخی صورت‌های ظاهری در بیش از یک جایگاه مشترک‌اند.',
    prefixes: 'چهار حرف مضارعه عبارت‌اند از أ برای من، ن برای ما، ي برای غایب مذکر و ت برای مخاطب و غایب مؤنث. به آن‌ها حُرُوفُ الْمُضَارَعَةِ می‌گویند.',
    overlap: 'برخی صورت‌ها بدون بافت یکسان‌اند. تَكْتُبُ می‌تواند به معنای «او (زن) می‌نویسد» برای هِيَ یا «تو (مذکر) می‌نویسی» برای أَنْتَ باشد. تَكْتُبَانِ نیز در مثنای غایب مؤنث و هر دو جایگاه مثنای مخاطب می‌آید. ضمیر یا بافت جمله معنا را روشن می‌کند.',
    scope: 'این جدول صورت‌های پیش‌فرض مرفوع را نشان می‌دهد. در درس‌های بعد می‌آموزیم حروفی مانند لَنْ و لَمْ چگونه بر مضارع اثر می‌گذارند و صورت مجهول چه تفاوتی دارد.',
    practicePrompt: 'ضمیر مناسب هر صورت مضارع را انتخاب کنید. در تمرین از صورت‌هایی استفاده شده که بدون بافت اضافی قابل تشخیص‌اند.',
    correct: 'ضمیر درست است.',
    incorrect: 'پیشوند و پسوند را بررسی کنید. ضمیر متناظر:',
    score: 'امتیاز شما',
    check: 'بررسی ضمیرها',
    teach: 'چهار حرف مضارعه را نام ببرید. سپس توضیح دهید چرا تَكْتُبُ می‌تواند هم به معنای «او (زن) می‌نویسد» و هم «تو (مذکر) می‌نویسی» باشد.',
    summary: 'ابتدا پیشوند و سپس پسوند را بخوانید. مضارع می‌تواند به حال یا آینده اشاره کند و بافت، ترجمهٔ دقیق را مشخص می‌کند.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'مضارع معروف فعل کی وہ صورت ہے جو جاری یا نامکمل عمل کو ظاہر کرتی ہے۔ سیاق کے لحاظ سے اس کا مطلب حال یا مستقبل ہو سکتا ہے۔ اس سبق میں يَكْتُبُ کی مدد سے روایتی چودہ خانوں والی جدول سیکھیں گے۔',
    objective: 'مضارع کے چار ابتدائی حروف پہچانیں، چودہ صیغوں کی جدول ترتیب سے پڑھیں، اور سابقے اور لاحقے سے فاعل معلوم کریں۔',
    definition: 'الْمُضَارِعُ الْمَعْرُوفُ مضارع معروف ہے۔ یہ أ، ن، ي، ت میں سے کسی ایک سابقے سے بنتا ہے اور بعض صیغوں میں لاحقہ بھی آتا ہے۔ نیچے عام حالتِ رفع (مرفوع) کی صورتیں ہیں۔',
    orderNote: 'جدول ماضی کی طرح صرف کی چودہ صیغوں والی ترتیب پر ہے: پہلے چھ غائب، پھر چھ مخاطب، اور آخر میں دو متکلم۔ بعض ظاہری صورتیں ایک سے زیادہ خانوں میں مشترک ہیں۔',
    prefixes: 'مضارع کے چار ابتدائی حروف أ (میں)، ن (ہم)، ي (غائب مذکر)، اور ت (مخاطب اور غائب مؤنث) ہیں۔ انہیں حُرُوفُ الْمُضَارَعَةِ کہتے ہیں۔',
    overlap: 'کچھ صورتیں سیاق کے بغیر ایک جیسی ہوتی ہیں۔ تَكْتُبُ کا مطلب هِيَ کے لیے ’’وہ (عورت) لکھتی ہے‘‘ یا أَنْتَ کے لیے ’’تم (مرد) لکھتے ہو‘‘ ہو سکتا ہے۔ تَكْتُبَانِ غائب مؤنث تثنیہ اور مخاطب تثنیہ کے دونوں خانوں میں آتا ہے۔ ضمیر یا جملے کا سیاق معنی واضح کرتا ہے۔',
    scope: 'یہ جدول عام حالتِ رفع کی صورتیں دکھاتی ہے۔ اگلے اسباق میں لَنْ اور لَمْ جیسے حروف کے اثرات اور مضارع مجہول کا فرق پڑھیں گے۔',
    practicePrompt: 'ہر منتخب مضارع کے لیے درست ضمیر چنیں۔ مشق میں ایسی صورتیں ہیں جو اضافی سیاق کے بغیر پہچانی جا سکتی ہیں۔',
    correct: 'درست ضمیر۔',
    incorrect: 'سابقہ اور لاحقہ دیکھیں۔ متعلقہ ضمیر ہے:',
    score: 'آپ کا اسکور',
    check: 'ضمائر جانچیں',
    teach: 'مضارع کے چار ابتدائی حروف بتائیں۔ پھر وضاحت کریں کہ تَكْتُبُ کا مطلب ’’وہ (عورت) لکھتی ہے‘‘ بھی اور ’’تم (مرد) لکھتے ہو‘‘ بھی کیوں ہو سکتا ہے۔',
    summary: 'پہلے سابقہ اور پھر لاحقہ پڑھیں۔ مضارع حال یا مستقبل دونوں کے لیے آ سکتا ہے؛ درست ترجمہ سیاق سے معلوم ہوتا ہے۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const presentActiveForms = [
  {pronoun:'هُوَ',pronounLatin:'huwa',slot:'3rd · masculine singular',slotFa:'غایب · مذکر مفرد',slotUr:'غائب · مذکر واحد',verb:'يَكْتُبُ',verbLatin:'yaktubu',gloss:'he writes',glossFa:'او می‌نویسد',glossUr:'وہ لکھتا ہے',key:'huwa'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · masculine dual',slotFa:'غایب · مذکر مثنّی',slotUr:'غائب · مذکر تثنیہ',verb:'يَكْتُبَانِ',verbLatin:'yaktubāni',gloss:'they two (masc.) write',glossFa:'آن دو مرد می‌نویسند',glossUr:'وہ دونوں مرد لکھتے ہیں',key:'huma-m'},
  {pronoun:'هُمْ',pronounLatin:'hum',slot:'3rd · masculine plural',slotFa:'غایب · مذکر جمع',slotUr:'غائب · مذکر جمع',verb:'يَكْتُبُونَ',verbLatin:'yaktubūna',gloss:'they (masc.) write',glossFa:'آن مردان می‌نویسند',glossUr:'وہ مرد لکھتے ہیں',key:'hum'},
  {pronoun:'هِيَ',pronounLatin:'hiya',slot:'3rd · feminine singular',slotFa:'غایب · مؤنث مفرد',slotUr:'غائب · مؤنث واحد',verb:'تَكْتُبُ',verbLatin:'taktubu',gloss:'she writes',glossFa:'او می‌نویسد',glossUr:'وہ لکھتی ہے',key:'hiya'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · feminine dual',slotFa:'غایب · مؤنث مثنّی',slotUr:'غائب · مؤنث تثنیہ',verb:'تَكْتُبَانِ',verbLatin:'taktubāni',gloss:'they two (fem.) write',glossFa:'آن دو زن می‌نویسند',glossUr:'وہ دونوں عورتیں لکھتی ہیں',key:'huma-f'},
  {pronoun:'هُنَّ',pronounLatin:'hunna',slot:'3rd · feminine plural',slotFa:'غایب · مؤنث جمع',slotUr:'غائب · مؤنث جمع',verb:'يَكْتُبْنَ',verbLatin:'yaktubna',gloss:'they (fem.) write',glossFa:'آن زنان می‌نویسند',glossUr:'وہ عورتیں لکھتی ہیں',key:'hunna'},
  {pronoun:'أَنْتَ',pronounLatin:'anta',slot:'2nd · masculine singular',slotFa:'مخاطب · مذکر مفرد',slotUr:'مخاطب · مذکر واحد',verb:'تَكْتُبُ',verbLatin:'taktubu',gloss:'you (masc. sg.) write',glossFa:'تو (مذکر) می‌نویسی',glossUr:'تم (مرد) لکھتے ہو',key:'anta'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · masculine dual',slotFa:'مخاطب · مذکر مثنّی',slotUr:'مخاطب · مذکر تثنیہ',verb:'تَكْتُبَانِ',verbLatin:'taktubāni',gloss:'you two (masc.) write',glossFa:'شما دو مرد می‌نویسید',glossUr:'تم دونوں مرد لکھتے ہو',key:'antuma-m'},
  {pronoun:'أَنْتُمْ',pronounLatin:'antum',slot:'2nd · masculine plural',slotFa:'مخاطب · مذکر جمع',slotUr:'مخاطب · مذکر جمع',verb:'تَكْتُبُونَ',verbLatin:'taktubūna',gloss:'you (masc. pl.) write',glossFa:'شما مردان می‌نویسید',glossUr:'تم سب مرد لکھتے ہو',key:'antum'},
  {pronoun:'أَنْتِ',pronounLatin:'anti',slot:'2nd · feminine singular',slotFa:'مخاطب · مؤنث مفرد',slotUr:'مخاطب · مؤنث واحد',verb:'تَكْتُبِينَ',verbLatin:'taktubīna',gloss:'you (fem. sg.) write',glossFa:'تو (مؤنث) می‌نویسی',glossUr:'تم (عورت) لکھتی ہو',key:'anti'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · feminine dual',slotFa:'مخاطب · مؤنث مثنّی',slotUr:'مخاطب · مؤنث تثنیہ',verb:'تَكْتُبَانِ',verbLatin:'taktubāni',gloss:'you two (fem.) write',glossFa:'شما دو زن می‌نویسید',glossUr:'تم دونوں عورتیں لکھتی ہو',key:'antuma-f'},
  {pronoun:'أَنْتُنَّ',pronounLatin:'antunna',slot:'2nd · feminine plural',slotFa:'مخاطب · مؤنث جمع',slotUr:'مخاطب · مؤنث جمع',verb:'تَكْتُبْنَ',verbLatin:'taktubna',gloss:'you (fem. pl.) write',glossFa:'شما زنان می‌نویسید',glossUr:'تم عورتیں لکھتی ہو',key:'antunna'},
  {pronoun:'أَنَا',pronounLatin:'anā',slot:'1st · singular',slotFa:'متکلم · مفرد',slotUr:'متکلم · واحد',verb:'أَكْتُبُ',verbLatin:'aktubu',gloss:'I write',glossFa:'من می‌نویسم',glossUr:'میں لکھتا/لکھتی ہوں',key:'ana'},
  {pronoun:'نَحْنُ',pronounLatin:'naḥnu',slot:'1st · plural',slotFa:'متکلم · جمع',slotUr:'متکلم · جمع',verb:'نَكْتُبُ',verbLatin:'naktubu',gloss:'we write',glossFa:'ما می‌نویسیم',glossUr:'ہم لکھتے ہیں',key:'nahnu'},
] as const

const presentPronounPractice = [
  {verb:'يَكْتُبُونَ',latin:'yaktubūna',answer:'hum'},
  {verb:'يَكْتُبْنَ',latin:'yaktubna',answer:'hunna'},
  {verb:'تَكْتُبِينَ',latin:'taktubīna',answer:'anti'},
  {verb:'تَكْتُبُونَ',latin:'taktubūna',answer:'antum'},
  {verb:'أَكْتُبُ',latin:'aktubu',answer:'ana'},
  {verb:'نَكْتُبُ',latin:'naktubu',answer:'nahnu'},
]

function LessonEightPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonEightCopy[language]
  const rtl = language !== 'en'
  const score = presentPronounPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/07" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 08</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · THE FOURTEEN ṢĪGHAHS</div>
        <h1>Present active: <em>14 forms</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْمُضَارِعُ الْمَعْرُوفُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-muḍāriʿ al-maʿrūf</div>}
          <h2>يَكْتُبُ · yaktubu · he writes</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FOUR PREFIX LETTERS</span>
          <h2 lang="ar" dir="rtl">أَنَيْتُ · أ ن ي ت</h2>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">hamzah · nūn · yāʾ · tāʾ</div>}
          <p lang={language}>{copy.prefixes}</p>
          <div className="prefix-grid"><div><b>أَ</b><span>I · أَنَا</span></div><div><b>نَ</b><span>we · نَحْنُ</span></div><div><b>يَ</b><span>he/they · الغائب</span></div><div><b>تَ</b><span>you/she · المخاطب/الغائبة</span></div></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FULL 14-SLOT TABLE</span>
          <p lang={language}>{copy.orderNote}</p>
          <div className="conjugation-grid">
            <div className="conjugation-head"><span>#</span><span>Pronoun</span><span>Person / number / gender</span><span>Present active form</span><span>Meaning</span></div>
            {presentActiveForms.map((item,index)=><div className="conjugation-row" key={index}>
              <span className="conjugation-index">{index+1}</span>
              <div className="conjugation-pronoun"><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.pronounLatin}</small>}</div>
              <span className="conjugation-slot">{language==='fa'?item.slotFa:language==='ur'?item.slotUr:item.slot}</span>
              <div className="conjugation-verb"><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.verbLatin}</small>}</div>
              <span className="conjugation-gloss">{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</span>
            </div>)}
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">SAME FORM, DIFFERENT SUBJECT</span>
          <h2>Context can matter</h2>
          <div className="warning-card"><strong>Some slots share the same surface form</strong><p lang={language}>{copy.overlap}</p></div>
          <div className="warning-card"><strong>Default indicative form</strong><p lang={language}>{copy.scope}</p></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE PRONOUN</span>
          <h2>Read the prefix and ending</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="pronoun-practice-list">
            {presentPronounPractice.map((item,index)=><div className="pronoun-practice-row" key={item.verb}>
              <div><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the pronoun for '+item.verb} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose pronoun…</option>
                {pastPronounChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{pastPronounChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==presentPronounPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {presentPronounPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.fivesuper.com/support/downloads/Arabic-Grammar-in-Context_Mohammad-T.-Alhawary-%282016%29.pdf" target="_blank" rel="noreferrer">Mohammad T. Alhawary, Arabic Grammar in Context (2016), chapter 3, “Present and Future Tenses.”</a></li>
            <li><a href="https://nabataea.net/media/04shop/PDFS/Arabic%20-%20Modern%20Grammar.pdf" target="_blank" rel="noreferrer">Karin C. Ryding, A Reference Grammar of Modern Standard Arabic, section 1.2.3 on al-muḍāriʿ.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/07">← Lesson 7: Past active 14 forms</a><span>Next: past passive</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Active muḍāriʿ</li><li>Four prefix letters</li><li>14-slot table</li><li>Shared surface forms</li><li>Indicative default</li><li>Pronoun practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Look at the prefix first: أ، ن، ي، ت. Then check the ending for dual and plural forms.</p></div></aside>
    </div>
  </main>
}


const lessonNineCopy = {
  en: {
    lead: 'The passive past describes an action without naming its doer. For a sound Form I verb, the basic pattern changes from فَعَلَ to فُعِلَ.',
    objective: 'Recognise the passive-past pattern, compare active and passive forms, and read the 14-slot conjugation of نُصِرَ.',
    definition: 'الْمَاضِي الْمَجْهُولُ is the passive past. The doer is not stated; the affected participant is promoted to the grammatical position of nāʾib al-fāʿil (نَائِبُ الْفَاعِلِ).',
    pattern: 'For a sound Form I triliteral verb, the basic passive-past pattern is فُعِلَ: the first root consonant takes ḍammah and the second takes kasrah. The person/number endings follow the same 14-slot order as the active past.',
    example: 'Compare نَصَرَ (naṣara, he helped) with نُصِرَ (nuṣira, he was helped). The root remains ن ص ر; the internal vowels signal the passive voice.',
    quran: 'The Qur’an uses كُتِبَ in 2:183: “Fasting has been prescribed for you.” The Quranic Arabic Corpus identifies كُتِبَ as a third-person masculine singular passive perfect verb from ك ت ب; الصِّيَامُ is nominative and functions as the nāʾib al-fāʿil.',
    caution: 'Majhūl is the grammatical label for passive voice; it does not mean the statement is uncertain. The agent is simply not expressed in the passive construction.',
    practicePrompt: 'Choose the pronoun that matches each selected passive-past form.',
    correct: 'Correct pronoun.',
    incorrect: 'Check the suffix. The matching pronoun is',
    score: 'Your score',
    check: 'Check passive forms',
    teach: 'Explain the vowel change from نَصَرَ to نُصِرَ. Then identify the passive verb and nāʾib al-fāʿil in كُتِبَ عَلَيْكُمُ الصِّيَامُ.',
    summary: 'In the sound Form I past passive, change the internal pattern to فُعِلَ. Keep the person/number endings in the same 14-slot order and identify the nāʾib al-fāʿil in the sentence.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'ماضی مجهول کاری را بیان می‌کند بی‌آن‌که انجام‌دهنده را نام ببرد. در فعل ثلاثی مجرد صحیح، وزن پایه از فَعَلَ به فُعِلَ تغییر می‌کند.',
    objective: 'وزن ماضی مجهول را بشناسید، صورت معلوم و مجهول را مقایسه کنید و جدول ۱۴ جایگاهی نُصِرَ را بخوانید.',
    definition: 'الْمَاضِي الْمَجْهُولُ یعنی ماضی مجهول. فاعل ذکر نمی‌شود و چیزی که عمل بر آن واقع شده در جایگاه دستوری نائب فاعل (نَائِبُ الْفَاعِلِ) قرار می‌گیرد.',
    pattern: 'در فعل ثلاثی مجرد صحیح، وزن پایهٔ ماضی مجهول فُعِلَ است: حرف اول ریشه ضمه و حرف دوم کسره می‌گیرد. پایان‌های شخص و شمار همان ترتیب ۱۴ جایگاهی ماضی معلوم را دنبال می‌کنند.',
    example: 'نَصَرَ (او یاری کرد) را با نُصِرَ (به او یاری شد) مقایسه کنید. ریشه ن ص ر باقی می‌ماند؛ حرکت‌های درونی، مجهول بودن فعل را نشان می‌دهند.',
    quran: 'در قرآن، كُتِبَ در آیهٔ ۲:۱۸۳ آمده است: «روزه بر شما مقرر شد». پیکرهٔ زبان‌شناختی قرآن، كُتِبَ را فعل ماضی مجهول، غایب مذکر مفرد از ریشهٔ ک ت ب می‌شناسد؛ الصِّيَامُ اسم مرفوع و نائب فاعل است.',
    caution: 'مجهول اصطلاح دستوری برای ساخت مجهول است؛ به معنای نامطمئن بودن جمله نیست. در این ساخت، انجام‌دهنده بیان نمی‌شود.',
    practicePrompt: 'ضمیر مناسب هر صورت منتخب ماضی مجهول را انتخاب کنید.',
    correct: 'ضمیر درست است.',
    incorrect: 'پسوند را بررسی کنید. ضمیر متناظر:',
    score: 'امتیاز شما',
    check: 'بررسی صورت‌های مجهول',
    teach: 'تغییر حرکت‌ها از نَصَرَ به نُصِرَ را توضیح دهید. سپس فعل مجهول و نائب فاعل را در عبارت كُتِبَ عَلَيْكُمُ الصِّيَامُ مشخص کنید.',
    summary: 'در ماضی مجهول ثلاثی مجرد صحیح، وزن درونی به فُعِلَ تغییر می‌کند. پایان‌های شخص و شمار در همان ترتیب ۱۴ صیغه باقی می‌مانند و باید نائب فاعل را در جمله پیدا کنید.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'ماضی مجہول ایسے عمل کو بیان کرتا ہے جس میں کام کرنے والے کا نام نہیں بتایا جاتا۔ صحیح ثلاثی مجرد میں بنیادی وزن فَعَلَ سے فُعِلَ ہو جاتا ہے۔',
    objective: 'ماضی مجہول کا وزن پہچانیں، معلوم اور مجہول صورتوں کا موازنہ کریں، اور نُصِرَ کی چودہ خانوں والی جدول پڑھیں۔',
    definition: 'الْمَاضِي الْمَجْهُولُ ماضی مجہول ہے۔ فاعل بیان نہیں ہوتا؛ جس پر عمل واقع ہو وہ نحوی طور پر نائب فاعل (نَائِبُ الْفَاعِلِ) کے مقام پر آتا ہے۔',
    pattern: 'صحیح ثلاثی مجرد فعل کے ماضی مجہول کا بنیادی وزن فُعِلَ ہے: مادّے کے پہلے حرف پر پیش اور دوسرے پر زیر آتی ہے۔ شخص اور تعداد کے لاحقے ماضی معلوم کی طرح اسی چودہ خانوں والی ترتیب پر رہتے ہیں۔',
    example: 'نَصَرَ (اس نے مدد کی) کا موازنہ نُصِرَ (اس کی مدد کی گئی) سے کریں۔ مادّہ ن ص ر وہی رہتا ہے؛ اندرونی حرکات مجہول آواز ظاہر کرتی ہیں۔',
    quran: 'قرآن میں كُتِبَ سورۂ بقرہ ۲:۱۸۳ میں آیا ہے: ’’تم پر روزہ فرض کیا گیا‘‘۔ قرآنک عربک کارپس كُتِبَ کو مادّہ ک ت ب سے ماضی مجہول، غائب مذکر واحد قرار دیتا ہے؛ الصِّيَامُ مرفوع اسم اور نائب فاعل ہے۔',
    caution: 'مجہول نحوی اصطلاح ہے؛ اس کا مطلب بیان کا غیر یقینی ہونا نہیں۔ مجہول ساخت میں کام کرنے والے کا ذکر نہیں ہوتا۔',
    practicePrompt: 'ہر منتخب ماضی مجہول کے لیے درست ضمیر چنیں۔',
    correct: 'درست ضمیر۔',
    incorrect: 'لاحقہ دیکھیں۔ متعلقہ ضمیر ہے:',
    score: 'آپ کا اسکور',
    check: 'مجہول صورتیں جانچیں',
    teach: 'نَصَرَ سے نُصِرَ تک حرکات کی تبدیلی بیان کریں۔ پھر كُتِبَ عَلَيْكُمُ الصِّيَامُ میں فعلِ مجہول اور نائب فاعل کی نشاندہی کریں۔',
    summary: 'صحیح ثلاثی مجرد کے ماضی مجہول میں اندرونی وزن فُعِلَ ہو جاتا ہے۔ شخص اور تعداد کے لاحقے وہی رہتے ہیں؛ جملے میں نائب فاعل بھی پہچانیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const pastPassiveForms = [
  {pronoun:'هُوَ',pronounLatin:'huwa',slot:'3rd · masculine singular',slotFa:'غایب · مذکر مفرد',slotUr:'غائب · مذکر واحد',verb:'نُصِرَ',verbLatin:'nuṣira',gloss:'he was helped',glossFa:'به او یاری شد',glossUr:'اس کی مدد کی گئی',key:'huwa'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · masculine dual',slotFa:'غایب · مذکر مثنّی',slotUr:'غائب · مذکر تثنیہ',verb:'نُصِرَا',verbLatin:'nuṣirā',gloss:'they two (masc.) were helped',glossFa:'به آن دو مرد یاری شد',glossUr:'ان دونوں مردوں کی مدد کی گئی',key:'huma-m'},
  {pronoun:'هُمْ',pronounLatin:'hum',slot:'3rd · masculine plural',slotFa:'غایب · مذکر جمع',slotUr:'غائب · مذکر جمع',verb:'نُصِرُوا',verbLatin:'nuṣirū',gloss:'they (masc.) were helped',glossFa:'به آن مردان یاری شد',glossUr:'ان مردوں کی مدد کی گئی',key:'hum'},
  {pronoun:'هِيَ',pronounLatin:'hiya',slot:'3rd · feminine singular',slotFa:'غایب · مؤنث مفرد',slotUr:'غائب · مؤنث واحد',verb:'نُصِرَتْ',verbLatin:'nuṣirat',gloss:'she was helped',glossFa:'به او یاری شد',glossUr:'اس کی مدد کی گئی',key:'hiya'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · feminine dual',slotFa:'غایب · مؤنث مثنّی',slotUr:'غائب · مؤنث تثنیہ',verb:'نُصِرَتَا',verbLatin:'nuṣiratā',gloss:'they two (fem.) were helped',glossFa:'به آن دو زن یاری شد',glossUr:'ان دونوں عورتوں کی مدد کی گئی',key:'huma-f'},
  {pronoun:'هُنَّ',pronounLatin:'hunna',slot:'3rd · feminine plural',slotFa:'غایب · مؤنث جمع',slotUr:'غائب · مؤنث جمع',verb:'نُصِرْنَ',verbLatin:'nuṣirna',gloss:'they (fem.) were helped',glossFa:'به آن زنان یاری شد',glossUr:'ان عورتوں کی مدد کی گئی',key:'hunna'},
  {pronoun:'أَنْتَ',pronounLatin:'anta',slot:'2nd · masculine singular',slotFa:'مخاطب · مذکر مفرد',slotUr:'مخاطب · مذکر واحد',verb:'نُصِرْتَ',verbLatin:'nuṣirta',gloss:'you (masc. sg.) were helped',glossFa:'به تو (مذکر) یاری شد',glossUr:'تم (مرد) کی مدد کی گئی',key:'anta'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · masculine dual',slotFa:'مخاطب · مذکر مثنّی',slotUr:'مخاطب · مذکر تثنیہ',verb:'نُصِرْتُمَا',verbLatin:'nuṣirtumā',gloss:'you two (masc.) were helped',glossFa:'به شما دو مرد یاری شد',glossUr:'تم دونوں مردوں کی مدد کی گئی',key:'antuma-m'},
  {pronoun:'أَنْتُمْ',pronounLatin:'antum',slot:'2nd · masculine plural',slotFa:'مخاطب · مذکر جمع',slotUr:'مخاطب · مذکر جمع',verb:'نُصِرْتُمْ',verbLatin:'nuṣirtum',gloss:'you (masc. pl.) were helped',glossFa:'به شما مردان یاری شد',glossUr:'تم سب مردوں کی مدد کی گئی',key:'antum'},
  {pronoun:'أَنْتِ',pronounLatin:'anti',slot:'2nd · feminine singular',slotFa:'مخاطب · مؤنث مفرد',slotUr:'مخاطب · مؤنث واحد',verb:'نُصِرْتِ',verbLatin:'nuṣirti',gloss:'you (fem. sg.) were helped',glossFa:'به تو (مؤنث) یاری شد',glossUr:'تم (عورت) کی مدد کی گئی',key:'anti'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · feminine dual',slotFa:'مخاطب · مؤنث مثنّی',slotUr:'مخاطب · مؤنث تثنیہ',verb:'نُصِرْتُمَا',verbLatin:'nuṣirtumā',gloss:'you two (fem.) were helped',glossFa:'به شما دو زن یاری شد',glossUr:'تم دونوں عورتوں کی مدد کی گئی',key:'antuma-f'},
  {pronoun:'أَنْتُنَّ',pronounLatin:'antunna',slot:'2nd · feminine plural',slotFa:'مخاطب · مؤنث جمع',slotUr:'مخاطب · مؤنث جمع',verb:'نُصِرْتُنَّ',verbLatin:'nuṣirtunna',gloss:'you (fem. pl.) were helped',glossFa:'به شما زنان یاری شد',glossUr:'تم عورتوں کی مدد کی گئی',key:'antunna'},
  {pronoun:'أَنَا',pronounLatin:'anā',slot:'1st · singular',slotFa:'متکلم · مفرد',slotUr:'متکلم · واحد',verb:'نُصِرْتُ',verbLatin:'nuṣirtu',gloss:'I was helped',glossFa:'به من یاری شد',glossUr:'میری مدد کی گئی',key:'ana'},
  {pronoun:'نَحْنُ',pronounLatin:'naḥnu',slot:'1st · plural',slotFa:'متکلم · جمع',slotUr:'متکلم · جمع',verb:'نُصِرْنَا',verbLatin:'nuṣirnā',gloss:'we were helped',glossFa:'به ما یاری شد',glossUr:'ہماری مدد کی گئی',key:'nahnu'},
] as const

const passivePronounPractice = [
  {verb:'نُصِرُوا',latin:'nuṣirū',answer:'hum'},
  {verb:'نُصِرْنَ',latin:'nuṣirna',answer:'hunna'},
  {verb:'نُصِرْتِ',latin:'nuṣirti',answer:'anti'},
  {verb:'نُصِرْتُنَّ',latin:'nuṣirtunna',answer:'antunna'},
  {verb:'نُصِرْتُ',latin:'nuṣirtu',answer:'ana'},
  {verb:'نُصِرْنَا',latin:'nuṣirnā',answer:'nahnu'},
]

function LessonNinePage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonNineCopy[language]
  const rtl = language !== 'en'
  const score = passivePronounPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/08" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 09</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · THE FOURTEEN ṢĪGHAHS</div>
        <h1>Past passive: <em>14 forms</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْمَاضِي الْمَجْهُولُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-māḍī al-majhūl</div>}
          <h2>نَصَرَ → نُصِرَ</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FORM I PASSIVE PATTERN</span>
          <h2 lang="ar" dir="rtl">فُعِلَ</h2>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">fuʿila</div>}
          <div className="compare-grid">
            <div><span className="compare-label">ACTIVE · مَعْلُومٌ</span><b className="large-arabic" lang="ar" dir="rtl">نَصَرَ</b><p>naṣara · he helped</p></div>
            <div><span className="compare-label">PASSIVE · مَجْهُولٌ</span><b className="large-arabic" lang="ar" dir="rtl">نُصِرَ</b><p>nuṣira · he was helped</p></div>
          </div>
          <p lang={language}>{copy.pattern}</p>
          <div className="caution-note" lang={language}>{copy.example}</div>
          <div className="warning-card"><strong>Meaning of majhūl</strong><p lang={language}>{copy.caution}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A QUR'ANIC EXAMPLE</span>
          <h2 lang="ar" dir="rtl">كُتِبَ عَلَيْكُمُ الصِّيَامُ</h2>
          <div className="lesson-translit" dir="ltr">kutiba ʿalaykumu al-ṣiyāmu</div>
          <p lang={language}>{copy.quran}</p>
          <p><a href="https://mahashemi.github.io/QuranMemorizer/#/surah/2/ayah/183" target="_blank" rel="noreferrer">Read Qur’an 2:183 in QuranMemorizer</a> · <a href="https://corpus.quran.com/wordmorphology.jsp?location=%282%3A183%3A4%29" target="_blank" rel="noreferrer">Open the Quranic Arabic Corpus analysis of كُتِبَ</a>.</p>
          <div className="warning-card"><strong>Grammar note</strong><p>In this verse, كُتِبَ is a 3rd-person masculine singular passive perfect verb. الصِّيَامُ is nominative and functions as the nāʾib al-fāʿil.</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FULL 14-SLOT TABLE</span>
          <h2>نُصِرَ · nuṣira · he was helped</h2>
          <div className="conjugation-grid">
            <div className="conjugation-head"><span>#</span><span>Pronoun</span><span>Person / number / gender</span><span>Past passive form</span><span>Meaning</span></div>
            {pastPassiveForms.map((item,index)=><div className="conjugation-row" key={index}>
              <span className="conjugation-index">{index+1}</span>
              <div className="conjugation-pronoun"><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.pronounLatin}</small>}</div>
              <span className="conjugation-slot">{language==='fa'?item.slotFa:language==='ur'?item.slotUr:item.slot}</span>
              <div className="conjugation-verb"><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.verbLatin}</small>}</div>
              <span className="conjugation-gloss">{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</span>
            </div>)}
          </div>
          <div className="caution-note" lang={language}>The person/number endings follow the same 14-slot order as the active past. The main change is the internal passive vowel pattern.</div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE PRONOUN</span>
          <h2>Read the passive ending</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="pronoun-practice-list">
            {passivePronounPractice.map((item,index)=><div className="pronoun-practice-row" key={item.verb}>
              <div><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the pronoun for '+item.verb} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose pronoun…</option>
                {pastPronounChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{pastPronounChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==passivePronounPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {passivePronounPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://corpus.quran.com/wordmorphology.jsp?location=%282%3A183%3A4%29" target="_blank" rel="noreferrer">Quranic Arabic Corpus, Qur’an 2:183 word 4: كُتِبَ, passive perfect, third-person masculine singular, root ك ت ب.</a></li>
            <li><a href="https://www.quranic-grammar.com/learn/level-3/09-passive-voice/" target="_blank" rel="noreferrer">Quranic Grammar — Passive Voice (al-Majhūl), including the Form I past pattern فُعِلَ and the role of nāʾib al-fāʿil.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/08">← Lesson 8: Present active 14 forms</a><span>Next: present passive (المضارع المجهول)</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Passive past</li><li>Pattern فُعِلَ</li><li>Active vs. passive</li><li>Qur’anic example</li><li>14-slot conjugation</li><li>Pronoun practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>First identify the passive pattern, then read the ending to identify person, gender, and number.</p></div></aside>
    </div>
  </main>
}


const lessonTenCopy = {
  en: {
    lead: 'The passive muḍāriʿ describes an ongoing or future action without naming its doer. For a sound Form I verb, its basic pattern is يُفْعَلُ.',
    objective: 'Recognise the passive muḍāriʿ pattern, compare it with the active present, and read its 14-slot conjugation.',
    definition: 'الْمُضَارِعُ الْمَجْهُولُ is the passive imperfect. The agent is not expressed; the affected participant takes the role of nāʾib al-fāʿil. Like the active muḍāriʿ, it may refer to present or future action depending on context.',
    pattern: 'For a sound Form I verb, the basic passive muḍāriʿ pattern is يُفْعَلُ. The muḍāriʿ prefix carries ḍammah, and the second root consonant carries fatḥah. Person/number endings follow the same 14-slot order.',
    comparison: 'Compare يَنْصُرُ (yanṣuru, he helps) with يُنْصَرُ (yunṣaru, he is helped). The root ن ص ر is unchanged; the vowel pattern changes the voice.',
    overlap: 'Some surface forms are shared by more than one slot. تُنْصَرُ can mean “she is helped” (هِيَ) or “you are helped” (أَنْتَ). تُنْصَرَانِ appears for feminine third-person dual and both second-person dual slots.',
    scope: 'This table shows the default indicative (marfūʿ) forms. Nasb and jazm after particles such as لَنْ and لَمْ, as well as passive forms of derived and weak verbs, are studied later.',
    practicePrompt: 'Choose the pronoun that matches each selected passive-muḍāriʿ form.',
    correct: 'Correct pronoun.',
    incorrect: 'Check the prefix and ending. The matching pronoun is',
    score: 'Your score',
    check: 'Check passive forms',
    teach: 'Explain the difference between يَنْصُرُ and يُنْصَرُ. Then identify the four passive-muḍāriʿ prefixes and explain why some forms need context.',
    summary: 'The passive muḍāriʿ of a sound Form I verb follows يُفْعَلُ. Read the prefix and ending, remember the shared surface forms, and identify the nāʾib al-fāʿil in a full sentence.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'مضارع مجهول عملی در حال انجام یا آینده را بدون نام‌بردن از انجام‌دهنده بیان می‌کند. وزن پایهٔ آن در فعل ثلاثی مجرد صحیح يُفْعَلُ است.',
    objective: 'وزن مضارع مجهول را بشناسید، آن را با مضارع معلوم مقایسه کنید و جدول ۱۴ جایگاهی آن را بخوانید.',
    definition: 'الْمُضَارِعُ الْمَجْهُولُ یعنی مضارع مجهول. فاعل بیان نمی‌شود و متأثر از عمل در جایگاه نائب فاعل قرار می‌گیرد. مانند مضارع معلوم، با توجه به بافت می‌تواند بر حال یا آینده دلالت کند.',
    pattern: 'در فعل ثلاثی مجرد صحیح، وزن پایهٔ مضارع مجهول يُفْعَلُ است. پیشوند مضارع ضمه و حرف دوم ریشه فتحه می‌گیرد. پایان‌های شخص و شمار همان ترتیب ۱۴ جایگاهی را دنبال می‌کنند.',
    comparison: 'يَنْصُرُ (او یاری می‌کند) را با يُنْصَرُ (به او یاری می‌شود) مقایسه کنید. ریشهٔ ن ص ر ثابت است؛ تغییر حرکت‌ها، معلوم یا مجهول بودن را نشان می‌دهد.',
    overlap: 'برخی صورت‌های ظاهری مشترک‌اند. تُنْصَرُ می‌تواند برای هِيَ به معنای «او (زن) یاری می‌شود» یا برای أَنْتَ به معنای «تو (مذکر) یاری می‌شوی» باشد. تُنْصَرَانِ نیز برای مثنای غایب مؤنث و هر دو جایگاه مثنای مخاطب می‌آید.',
    scope: 'این جدول صورت‌های پیش‌فرض مرفوع را نشان می‌دهد. نصب و جزم پس از حروفی مانند لَنْ و لَمْ و نیز صورت مجهول افعال مزید و معتل را بعداً می‌آموزیم.',
    practicePrompt: 'ضمیر مناسب هر صورت منتخب مضارع مجهول را انتخاب کنید.',
    correct: 'ضمیر درست است.',
    incorrect: 'پیشوند و پسوند را بررسی کنید. ضمیر متناظر:',
    score: 'امتیاز شما',
    check: 'بررسی صورت‌های مجهول',
    teach: 'تفاوت يَنْصُرُ و يُنْصَرُ را توضیح دهید. سپس چهار پیشوند مضارع مجهول را نام ببرید و بگویید چرا برخی صورت‌ها به بافت نیاز دارند.',
    summary: 'مضارع مجهول فعل ثلاثی مجرد صحیح بر وزن يُفْعَلُ است. پیشوند و پسوند را بخوانید، صورت‌های مشترک را به یاد داشته باشید و نائب فاعل را در جمله پیدا کنید.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'مضارع مجہول جاری یا مستقبل عمل کو کام کرنے والے کا نام بتائے بغیر ظاہر کرتا ہے۔ صحیح ثلاثی مجرد میں اس کا بنیادی وزن يُفْعَلُ ہے۔',
    objective: 'مضارع مجہول کا وزن پہچانیں، اسے مضارع معلوم سے ملائیں، اور اس کی چودہ خانوں والی جدول پڑھیں۔',
    definition: 'الْمُضَارِعُ الْمَجْهُولُ مضارع مجہول ہے۔ فاعل بیان نہیں ہوتا اور جس پر عمل واقع ہو وہ نائب فاعل بنتا ہے۔ مضارع معلوم کی طرح سیاق کے مطابق حال یا مستقبل کا معنی دے سکتا ہے۔',
    pattern: 'صحیح ثلاثی مجرد کے مضارع مجہول کا بنیادی وزن يُفْعَلُ ہے۔ مضارع کے سابقے پر پیش اور مادّے کے دوسرے حرف پر زبر آتی ہے۔ شخص اور تعداد کے لاحقے وہی چودہ خانوں والی ترتیب رکھتے ہیں۔',
    comparison: 'يَنْصُرُ (وہ مدد کرتا ہے) کا موازنہ يُنْصَرُ (اس کی مدد کی جاتی ہے) سے کریں۔ مادّہ ن ص ر وہی ہے؛ حرکات کی تبدیلی معلوم اور مجہول میں فرق کرتی ہے۔',
    overlap: 'کچھ ظاہری صورتیں مشترک ہوتی ہیں۔ تُنْصَرُ کا مطلب هِيَ کے لیے ’’وہ (عورت) مدد دی جاتی ہے‘‘ یا أَنْتَ کے لیے ’’تم (مرد) کی مدد کی جاتی ہے‘‘ ہو سکتا ہے۔ تُنْصَرَانِ غائب مؤنث تثنیہ اور مخاطب تثنیہ کے دونوں خانوں میں آتا ہے۔',
    scope: 'یہ جدول عام حالتِ رفع کی صورتیں دکھاتی ہے۔ لَنْ اور لَمْ جیسے حروف کے بعد نصب و جزم اور مزید و معتل افعال کے مجہول اوزان بعد میں پڑھیں گے۔',
    practicePrompt: 'ہر منتخب مضارع مجہول کے لیے درست ضمیر منتخب کریں۔',
    correct: 'درست ضمیر۔',
    incorrect: 'سابقہ اور لاحقہ دیکھیں۔ متعلقہ ضمیر ہے:',
    score: 'آپ کا اسکور',
    check: 'مجہول صورتیں جانچیں',
    teach: 'يَنْصُرُ اور يُنْصَرُ کا فرق بیان کریں۔ پھر مضارع مجہول کے چار سابقے بتائیں اور واضح کریں کہ بعض صورتوں میں سیاق کیوں ضروری ہے۔',
    summary: 'صحیح ثلاثی مجرد کا مضارع مجہول يُفْعَلُ کے وزن پر ہوتا ہے۔ سابقہ اور لاحقہ دیکھیں، مشترک صورتیں یاد رکھیں، اور جملے میں نائب فاعل پہچانیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const presentPassiveForms = [
  {pronoun:'هُوَ',pronounLatin:'huwa',slot:'3rd · masculine singular',slotFa:'غایب · مذکر مفرد',slotUr:'غائب · مذکر واحد',verb:'يُنْصَرُ',verbLatin:'yunṣaru',gloss:'he is helped',glossFa:'به او یاری می‌شود',glossUr:'اس کی مدد کی جاتی ہے',key:'huwa'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · masculine dual',slotFa:'غایب · مذکر مثنّی',slotUr:'غائب · مذکر تثنیہ',verb:'يُنْصَرَانِ',verbLatin:'yunṣarāni',gloss:'they two (masc.) are helped',glossFa:'به آن دو مرد یاری می‌شود',glossUr:'ان دونوں مردوں کی مدد کی جاتی ہے',key:'huma-m'},
  {pronoun:'هُمْ',pronounLatin:'hum',slot:'3rd · masculine plural',slotFa:'غایب · مذکر جمع',slotUr:'غائب · مذکر جمع',verb:'يُنْصَرُونَ',verbLatin:'yunṣarūna',gloss:'they (masc.) are helped',glossFa:'به آن مردان یاری می‌شود',glossUr:'ان مردوں کی مدد کی جاتی ہے',key:'hum'},
  {pronoun:'هِيَ',pronounLatin:'hiya',slot:'3rd · feminine singular',slotFa:'غایب · مؤنث مفرد',slotUr:'غائب · مؤنث واحد',verb:'تُنْصَرُ',verbLatin:'tunṣaru',gloss:'she is helped',glossFa:'به او یاری می‌شود',glossUr:'اس کی مدد کی جاتی ہے',key:'hiya'},
  {pronoun:'هُمَا',pronounLatin:'humā',slot:'3rd · feminine dual',slotFa:'غایب · مؤنث مثنّی',slotUr:'غائب · مؤنث تثنیہ',verb:'تُنْصَرَانِ',verbLatin:'tunṣarāni',gloss:'they two (fem.) are helped',glossFa:'به آن دو زن یاری می‌شود',glossUr:'ان دونوں عورتوں کی مدد کی جاتی ہے',key:'huma-f'},
  {pronoun:'هُنَّ',pronounLatin:'hunna',slot:'3rd · feminine plural',slotFa:'غایب · مؤنث جمع',slotUr:'غائب · مؤنث جمع',verb:'يُنْصَرْنَ',verbLatin:'yunṣarna',gloss:'they (fem.) are helped',glossFa:'به آن زنان یاری می‌شود',glossUr:'ان عورتوں کی مدد کی جاتی ہے',key:'hunna'},
  {pronoun:'أَنْتَ',pronounLatin:'anta',slot:'2nd · masculine singular',slotFa:'مخاطب · مذکر مفرد',slotUr:'مخاطب · مذکر واحد',verb:'تُنْصَرُ',verbLatin:'tunṣaru',gloss:'you (masc. sg.) are helped',glossFa:'به تو (مذکر) یاری می‌شود',glossUr:'تم (مرد) کی مدد کی جاتی ہے',key:'anta'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · masculine dual',slotFa:'مخاطب · مذکر مثنّی',slotUr:'مخاطب · مذکر تثنیہ',verb:'تُنْصَرَانِ',verbLatin:'tunṣarāni',gloss:'you two (masc.) are helped',glossFa:'به شما دو مرد یاری می‌شود',glossUr:'تم دونوں مردوں کی مدد کی جاتی ہے',key:'antuma-m'},
  {pronoun:'أَنْتُمْ',pronounLatin:'antum',slot:'2nd · masculine plural',slotFa:'مخاطب · مذکر جمع',slotUr:'مخاطب · مذکر جمع',verb:'تُنْصَرُونَ',verbLatin:'tunṣarūna',gloss:'you (masc. pl.) are helped',glossFa:'به شما مردان یاری می‌شود',glossUr:'تم سب مردوں کی مدد کی جاتی ہے',key:'antum'},
  {pronoun:'أَنْتِ',pronounLatin:'anti',slot:'2nd · feminine singular',slotFa:'مخاطب · مؤنث مفرد',slotUr:'مخاطب · مؤنث واحد',verb:'تُنْصَرِينَ',verbLatin:'tunṣarīna',gloss:'you (fem. sg.) are helped',glossFa:'به تو (مؤنث) یاری می‌شود',glossUr:'تم (عورت) کی مدد کی جاتی ہے',key:'anti'},
  {pronoun:'أَنْتُمَا',pronounLatin:'antumā',slot:'2nd · feminine dual',slotFa:'مخاطب · مؤنث مثنّی',slotUr:'مخاطب · مؤنث تثنیہ',verb:'تُنْصَرَانِ',verbLatin:'tunṣarāni',gloss:'you two (fem.) are helped',glossFa:'به شما دو زن یاری می‌شود',glossUr:'تم دونوں عورتوں کی مدد کی جاتی ہے',key:'antuma-f'},
  {pronoun:'أَنْتُنَّ',pronounLatin:'antunna',slot:'2nd · feminine plural',slotFa:'مخاطب · مؤنث جمع',slotUr:'مخاطب · مؤنث جمع',verb:'تُنْصَرْنَ',verbLatin:'tunṣarna',gloss:'you (fem. pl.) are helped',glossFa:'به شما زنان یاری می‌شود',glossUr:'تم عورتوں کی مدد کی جاتی ہے',key:'antunna'},
  {pronoun:'أَنَا',pronounLatin:'anā',slot:'1st · singular',slotFa:'متکلم · مفرد',slotUr:'متکلم · واحد',verb:'أُنْصَرُ',verbLatin:'unṣaru',gloss:'I am helped',glossFa:'به من یاری می‌شود',glossUr:'میری مدد کی جاتی ہے',key:'ana'},
  {pronoun:'نَحْنُ',pronounLatin:'naḥnu',slot:'1st · plural',slotFa:'متکلم · جمع',slotUr:'متکلم · جمع',verb:'نُنْصَرُ',verbLatin:'nunṣaru',gloss:'we are helped',glossFa:'به ما یاری می‌شود',glossUr:'ہماری مدد کی جاتی ہے',key:'nahnu'},
] as const

const passivePresentPractice = [
  {verb:'يُنْصَرُونَ',latin:'yunṣarūna',answer:'hum'},
  {verb:'يُنْصَرْنَ',latin:'yunṣarna',answer:'hunna'},
  {verb:'تُنْصَرِينَ',latin:'tunṣarīna',answer:'anti'},
  {verb:'تُنْصَرُونَ',latin:'tunṣarūna',answer:'antum'},
  {verb:'أُنْصَرُ',latin:'unṣaru',answer:'ana'},
  {verb:'نُنْصَرُ',latin:'nunṣaru',answer:'nahnu'},
]

function LessonTenPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonTenCopy[language]
  const rtl = language !== 'en'
  const score = passivePresentPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/09" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 10</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · THE FOURTEEN ṢĪGHAHS</div>
        <h1>Present passive: <em>14 forms</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْمُضَارِعُ الْمَجْهُولُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-muḍāriʿ al-majhūl</div>}
          <h2>يُنْصَرُ · yunṣaru · he is helped</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">ACTIVE VS. PASSIVE</span>
          <div className="compare-grid">
            <div><span className="compare-label">ACTIVE · مَعْلُومٌ</span><b className="large-arabic" lang="ar" dir="rtl">يَنْصُرُ</b><p>yanṣuru · he helps</p></div>
            <div><span className="compare-label">PASSIVE · مَجْهُولٌ</span><b className="large-arabic" lang="ar" dir="rtl">يُنْصَرُ</b><p>yunṣaru · he is helped</p></div>
          </div>
          <p lang={language}>{copy.pattern}</p>
          <div className="caution-note" lang={language}>{copy.comparison}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FOUR PREFIX LETTERS</span>
          <div className="prefix-grid"><div><b>أُ</b><span>I · أَنَا</span></div><div><b>نُ</b><span>we · نَحْنُ</span></div><div><b>يُ</b><span>he/they · الغائب</span></div><div><b>تُ</b><span>you/she · المخاطب/الغائبة</span></div></div>
          <div className="warning-card"><strong>Shared surface forms</strong><p lang={language}>{copy.overlap}</p></div>
          <div className="warning-card"><strong>Default indicative form</strong><p lang={language}>{copy.scope}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE FULL 14-SLOT TABLE</span>
          <h2>نُصِرَ → يُنْصَرُ</h2>
          <div className="conjugation-grid">
            <div className="conjugation-head"><span>#</span><span>Pronoun</span><span>Person / number / gender</span><span>Present passive form</span><span>Meaning</span></div>
            {presentPassiveForms.map((item,index)=><div className="conjugation-row" key={index}>
              <span className="conjugation-index">{index+1}</span>
              <div className="conjugation-pronoun"><b lang="ar" dir="rtl">{item.pronoun}</b>{showTransliteration&&<small>{item.pronounLatin}</small>}</div>
              <span className="conjugation-slot">{language==='fa'?item.slotFa:language==='ur'?item.slotUr:item.slot}</span>
              <div className="conjugation-verb"><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.verbLatin}</small>}</div>
              <span className="conjugation-gloss">{language==='fa'?item.glossFa:language==='ur'?item.glossUr:item.gloss}</span>
            </div>)}
          </div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE PRONOUN</span>
          <h2>Read the passive prefix and ending</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="pronoun-practice-list">
            {passivePresentPractice.map((item,index)=><div className="pronoun-practice-row" key={item.verb}>
              <div><b lang="ar" dir="rtl">{item.verb}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the pronoun for '+item.verb} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose pronoun…</option>
                {pastPronounChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{pastPronounChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==passivePresentPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {passivePresentPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.quranic-grammar.com/learn/level-3/09-passive-voice/" target="_blank" rel="noreferrer">Quranic Grammar — Passive Voice (al-Majhūl), including the present passive model يُفْعَلُ.</a></li>
            <li><a href="https://www.fivesuper.com/support/downloads/Arabic-Grammar-in-Context_Mohammad-T.-Alhawary-%282016%29.pdf" target="_blank" rel="noreferrer">Mohammad T. Alhawary, Arabic Grammar in Context (2016), chapter 3 on present/future and passive forms.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/09">← Lesson 9: Past passive 14 forms</a><span>Next: imperative and prohibitive forms</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Passive muḍāriʿ</li><li>Pattern يُفْعَلُ</li><li>Active vs. passive</li><li>Shared surface forms</li><li>14-slot table</li><li>Pronoun practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Compare يَنْصُرُ and يُنْصَرُ. The same root can form active and passive verbs by changing the vowel pattern.</p></div></aside>
    </div>
  </main>
}


const lessonElevenCopy = {
  en: {
    lead: 'Commands and prohibitions address the listener directly. Unlike the 14-slot past and present tables, the direct imperative and prohibitive are taught in six second-person slots.',
    objective: 'Recognise the six traditional addressee slots, form a positive command from the second-person jussive, and form a prohibition with لَا النَّاهِيَةُ.',
    definition: 'فِعْلُ الْأَمْرِ is the direct imperative (“write!”). فِعْلُ النَّهْيِ is the prohibitive (“do not write!”). Both address the second person (المُخَاطَب), so they use six traditional slots: masculine/feminine singular, dual, and plural.',
    formation: 'For كَتَبَ يَكْتُبُ, start from the second-person jussive تَكْتُبْ, remove the prefix تَـ, and add a helping hamzat al-waṣl because the remaining form begins with a consonant cluster: اُكْتُبْ. The hamza takes ḍammah here because the stem vowel is ḍammah.',
    nahy: 'A prohibition is formed with لَا النَّاهِيَةُ followed by the second-person muḍāriʿ in the jussive: لَا تَكْتُبْ. Do not put لَا directly before the imperative اُكْتُبْ.',
    dualNote: 'The masculine and feminine dual are separate teaching slots, but their command and prohibition forms are identical: اُكْتُبَا and لَا تَكْتُبَا. Therefore the traditional table has six slots but only five distinct surface forms.',
    jussiveEndings: 'Notice the nūn deletion in the jussive: تَكْتُبَانِ → لَا تَكْتُبَا, تَكْتُبُونَ → لَا تَكْتُبُوا, and تَكْتُبِينَ → لَا تَكْتُبِي. The feminine-plural ending نَ remains: لَا تَكْتُبْنَ.',
    scope: 'These are direct commands/prohibitions to the second person. Indirect commands (“let him…”, “let us…”) use other constructions and are not included here.',
    practicePrompt: 'Choose the addressee that matches each command or prohibition. The dual form is shared by both genders.',
    correct: 'Correct addressee.',
    incorrect: 'Check the ending. The matching addressee is',
    score: 'Your score',
    check: 'Check commands',
    teach: 'Explain how اُكْتُبْ is formed from تَكْتُبْ. Then explain why a prohibition uses لَا تَكْتُبْ rather than لَا اُكْتُبْ.',
    summary: 'The imperative is built from the second-person jussive. The prohibitive is لَا النَّاهِيَةُ plus a jussive muḍāriʿ. Both address the listener directly and have six traditional gender/number slots.',
    audio: 'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead: 'امر و نهی مستقیماً مخاطب را خطاب می‌کنند. برخلاف جدول‌های ۱۴ جایگاهی ماضی و مضارع، امر و نهیِ مستقیم در شش جایگاه مخاطب آموزش داده می‌شوند.',
    objective: 'شش جایگاه سنتی مخاطب را بشناسید، امر مثبت را از مضارع مخاطبِ مجزوم بسازید و نهی را با لَا النَّاهِيَةُ تشکیل دهید.',
    definition: 'فِعْلُ الْأَمْرِ یعنی فعل امر («بنویس!»). فِعْلُ النَّهْيِ یعنی فعل نهی («ننویس!»). هر دو مخاطب (المُخَاطَب) را خطاب می‌کنند؛ بنابراین شش جایگاه سنتی دارند: مفرد، مثنّی و جمع مذکر و مؤنث.',
    formation: 'برای كَتَبَ يَكْتُبُ، از مضارع مخاطبِ مجزوم تَكْتُبْ آغاز کنید، پیشوند تَـ را بردارید و چون صورت باقی‌مانده با دو حرف ساکن آغاز می‌شود، همزهٔ وصل بیفزایید: اُكْتُبْ. در این مثال همزه ضمه می‌گیرد، چون حرکتِ میانی مضارع ضمه است.',
    nahy: 'نهی با لَا النَّاهِيَةُ و پس از آن مضارع مخاطبِ مجزوم ساخته می‌شود: لَا تَكْتُبْ. لَا را مستقیماً پیش از فعل امر اُكْتُبْ نیاورید.',
    dualNote: 'مثنای مذکر و مؤنث دو جایگاه آموزشی جدا هستند، اما صورت امر و نهی آن‌ها یکسان است: اُكْتُبَا و لَا تَكْتُبَا. بنابراین جدول سنتی شش جایگاه دارد، ولی فقط پنج صورت ظاهریِ متفاوت.',
    jussiveEndings: 'به حذف نون در حالت جزم توجه کنید: تَكْتُبَانِ ← لَا تَكْتُبَا، تَكْتُبُونَ ← لَا تَكْتُبُوا و تَكْتُبِينَ ← لَا تَكْتُبِي. نون جمع مؤنث باقی می‌ماند: لَا تَكْتُبْنَ.',
    scope: 'این صورت‌ها امر و نهی مستقیم برای مخاطب‌اند. امر غیرمستقیم («بگذار او…»، «بیایید ما…») ساخت‌های دیگری دارد و در این درس نیست.',
    practicePrompt: 'مخاطبِ مناسب هر امر یا نهی را انتخاب کنید. صورت مثنّی برای هر دو جنس یکسان است.',
    correct: 'مخاطب درست است.',
    incorrect: 'پایان فعل را بررسی کنید. مخاطب متناظر:',
    score: 'امتیاز شما',
    check: 'بررسی امر و نهی',
    teach: 'توضیح دهید اُكْتُبْ چگونه از تَكْتُبْ ساخته می‌شود. سپس بگویید چرا نهی با لَا تَكْتُبْ ساخته می‌شود، نه لَا اُكْتُبْ.',
    summary: 'امر از مضارع مخاطبِ مجزوم ساخته می‌شود. نهی از لَا النَّاهِيَةُ به‌علاوهٔ مضارع مجزوم تشکیل می‌شود. هر دو مستقیماً مخاطب را خطاب می‌کنند و شش جایگاه سنتی جنس و شمار دارند.',
    audio: 'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead: 'امر اور نہی براہِ راست مخاطب سے خطاب کرتے ہیں۔ ماضی اور مضارع کی چودہ خانوں والی جدولوں کے برعکس، براہِ راست امر اور نہی چھ مخاطب صیغوں میں پڑھائے جاتے ہیں۔',
    objective: 'مخاطب کے چھ روایتی خانے پہچانیں، مثبت امر کو مضارع مخاطب مجزوم سے بنائیں، اور لَا النَّاهِيَةُ کے ذریعے نہی بنائیں۔',
    definition: 'فِعْلُ الْأَمْرِ حکم دینے کا صیغہ ہے (’’لکھو!‘‘)۔ فِعْلُ النَّهْيِ منع کرنے کا صیغہ ہے (’’مت لکھو!‘‘)۔ دونوں مخاطب (المُخَاطَب) کے لیے ہیں، اس لیے چھ روایتی خانے ہوتے ہیں: مذکر/مؤنث واحد، تثنیہ اور جمع۔',
    formation: 'كَتَبَ يَكْتُبُ میں مخاطب مجزوم تَكْتُبْ سے شروع کریں، سابقہ تَـ ہٹا دیں، اور چونکہ باقی صورت دو ساکن حروف سے شروع ہوتی ہے اس لیے ہمزۃ الوصل لگائیں: اُكْتُبْ۔ یہاں ہمزہ پر پیش ہے کیونکہ مضارع کے درمیانی حرف پر پیش ہے۔',
    nahy: 'نہی لَا النَّاهِيَةُ کے بعد مضارع مخاطب مجزوم لا کر بنتی ہے: لَا تَكْتُبْ۔ لَا کو براہِ راست امر اُكْتُبْ سے پہلے نہ لگائیں۔',
    dualNote: 'مذکر اور مؤنث تثنیہ الگ تعلیمی خانے ہیں، لیکن ان کے امر اور نہی کی صورتیں ایک جیسی ہیں: اُكْتُبَا اور لَا تَكْتُبَا۔ اس لیے روایتی جدول میں چھ خانے ہیں مگر ظاہری صورتیں پانچ ہیں۔',
    jussiveEndings: 'حالتِ جزم میں نون کے حذف پر غور کریں: تَكْتُبَانِ → لَا تَكْتُبَا، تَكْتُبُونَ → لَا تَكْتُبُوا، اور تَكْتُبِينَ → لَا تَكْتُبِي۔ مؤنث جمع کا نون باقی رہتا ہے: لَا تَكْتُبْنَ.',
    scope: 'یہ براہِ راست مخاطب کے لیے امر اور نہی ہیں۔ بالواسطہ حکم (’’اسے کرنے دو‘‘ یا ’’آؤ ہم کریں‘‘) کے لیے دوسرے طریقے ہیں، جو اس سبق میں شامل نہیں۔',
    practicePrompt: 'ہر امر یا نہی کے لیے درست مخاطب منتخب کریں۔ تثنیہ کی صورت دونوں جنسوں کے لیے ایک جیسی ہے۔',
    correct: 'درست مخاطب۔',
    incorrect: 'فعل کا آخری حصہ دیکھیں۔ متعلقہ مخاطب ہے:',
    score: 'آپ کا اسکور',
    check: 'امر و نہی جانچیں',
    teach: 'بتائیں کہ اُكْتُبْ، تَكْتُبْ سے کیسے بنتا ہے۔ پھر واضح کریں کہ نہی کے لیے لَا تَكْتُبْ کیوں آتا ہے، لَا اُكْتُبْ کیوں نہیں۔',
    summary: 'امر مضارع مخاطب مجزوم سے بنتا ہے۔ نہی لَا النَّاهِيَةُ اور مضارع مجزوم سے بنتی ہے۔ دونوں براہِ راست مخاطب کے لیے ہیں اور جنس و تعداد کے چھ روایتی خانے رکھتے ہیں۔',
    audio: 'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const commandForms = [
  {pronoun:'أَنْتَ',slot:'masculine singular',slotFa:'مذکر مفرد',slotUr:'مذکر واحد',amr:'اُكْتُبْ',amrLatin:'uktub',nahy:'لَا تَكْتُبْ',nahyLatin:'lā taktub',gloss:'you (masc. sg.)',answer:'anta'},
  {pronoun:'أَنْتُمَا',slot:'masculine dual',slotFa:'مذکر مثنّی',slotUr:'مذکر تثنیہ',amr:'اُكْتُبَا',amrLatin:'uktubā',nahy:'لَا تَكْتُبَا',nahyLatin:'lā taktubā',gloss:'you two (masc.)',answer:'antuma'},
  {pronoun:'أَنْتُمْ',slot:'masculine plural',slotFa:'مذکر جمع',slotUr:'مذکر جمع',amr:'اُكْتُبُوا',amrLatin:'uktubū',nahy:'لَا تَكْتُبُوا',nahyLatin:'lā taktubū',gloss:'you (masc. pl.)',answer:'antum'},
  {pronoun:'أَنْتِ',slot:'feminine singular',slotFa:'مؤنث مفرد',slotUr:'مؤنث واحد',amr:'اُكْتُبِي',amrLatin:'uktubī',nahy:'لَا تَكْتُبِي',nahyLatin:'lā taktubī',gloss:'you (fem. sg.)',answer:'anti'},
  {pronoun:'أَنْتُمَا',slot:'feminine dual',slotFa:'مؤنث مثنّی',slotUr:'مؤنث تثنیہ',amr:'اُكْتُبَا',amrLatin:'uktubā',nahy:'لَا تَكْتُبَا',nahyLatin:'lā taktubā',gloss:'you two (fem.)',answer:'antuma'},
  {pronoun:'أَنْتُنَّ',slot:'feminine plural',slotFa:'مؤنث جمع',slotUr:'مؤنث جمع',amr:'اُكْتُبْنَ',amrLatin:'uktubna',nahy:'لَا تَكْتُبْنَ',nahyLatin:'lā taktubna',gloss:'you (fem. pl.)',answer:'antunna'},
] as const

const commandPractice = [
  {form:'اُكْتُبْ',latin:'uktub',answer:'anta'},
  {form:'اُكْتُبَا',latin:'uktubā',answer:'antuma'},
  {form:'لَا تَكْتُبُوا',latin:'lā taktubū',answer:'antum'},
  {form:'اُكْتُبِي',latin:'uktubī',answer:'anti'},
  {form:'لَا تَكْتُبْنَ',latin:'lā taktubna',answer:'antunna'},
  {form:'لَا تَكْتُبْ',latin:'lā taktub',answer:'anta'},
]
const commandChoices = [
  {value:'anta',label:'أَنْتَ · masculine singular'},
  {value:'antuma',label:'أَنْتُمَا · dual (either gender)'},
  {value:'antum',label:'أَنْتُمْ · masculine plural'},
  {value:'anti',label:'أَنْتِ · feminine singular'},
  {value:'antunna',label:'أَنْتُنَّ · feminine plural'},
]

function LessonElevenPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonElevenCopy[language]
  const rtl = language !== 'en'
  const score = commandPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/10" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 03 · LESSON 11</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 03 · DIRECT COMMANDS</div>
        <h1>Imperative and <em>prohibitive</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">فِعْلُ الْأَمْرِ وَفِعْلُ النَّهْيِ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">fiʿl al-amr wa-fiʿl al-nahy</div>}
          <h2>Write! · Do not write!</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">HOW TO FORM THE COMMAND</span>
          <h2 lang="ar" dir="rtl">تَكْتُبْ ← اُكْتُبْ</h2>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">taktub → uktub</div>}
          <p lang={language}>{copy.formation}</p>
          <div className="example-sentence"><b lang="ar" dir="rtl">اُكْتُبْ!</b> <span>Write!</span></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">HOW TO FORM THE PROHIBITION</span>
          <h2 lang="ar" dir="rtl">لَا النَّاهِيَةُ + مُضَارِعٌ مَجْزُومٌ</h2>
          <p lang={language}>{copy.nahy}</p>
          <div className="example-sentence"><b lang="ar" dir="rtl">لَا تَكْتُبْ!</b> <span>Do not write!</span></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE SIX SECOND-PERSON SLOTS</span>
          <h2>One command, six addressee slots</h2>
          <div className="command-grid">
            <div className="command-head"><span>Addressee</span><span>Imperative · أَمْرٌ</span><span>Prohibitive · نَهْيٌ</span></div>
            {commandForms.map((item,index)=><div className="command-row" key={index}>
              <div className="command-slot"><b lang="ar" dir="rtl">{item.pronoun}</b><small>{language==='fa'?item.slotFa:language==='ur'?item.slotUr:item.slot}</small></div>
              <div className="command-form"><b lang="ar" dir="rtl">{item.amr}</b>{showTransliteration&&<small>{item.amrLatin}</small>}</div>
              <div className="command-form"><b lang="ar" dir="rtl">{item.nahy}</b>{showTransliteration&&<small>{item.nahyLatin}</small>}</div>
            </div>)}
          </div>
          <div className="warning-card"><strong>Why six slots but five distinct forms?</strong><p lang={language}>{copy.dualNote}</p></div>
          <div className="warning-card"><strong>Jussive ending changes</strong><p lang={language}>{copy.jussiveEndings}</p></div>
          <div className="caution-note" lang={language}>{copy.scope}</div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE ADDRESSEE</span>
          <h2>Who is being addressed?</h2>
          <p lang={language}>{copy.practicePrompt}</p>
          <div className="pronoun-practice-list">
            {commandPractice.map((item,index)=><div className="pronoun-practice-row" key={item.form+index}>
              <div><b lang="ar" dir="rtl">{item.form}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the addressee for '+item.form} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose addressee…</option>
                {commandChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{commandChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==commandPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {commandPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://nabataea.net/media/04shop/PDFS/Arabic%20-%20Modern%20Grammar.pdf" target="_blank" rel="noreferrer">Karin C. Ryding, A Reference Grammar of Modern Standard Arabic, section on the imperative and jussive.</a></li>
            <li><a href="https://corpus.quran.com/documentation/imperative.jsp" target="_blank" rel="noreferrer">Quranic Arabic Corpus — Imperative and Prohibition (الأمر والنهي), including لَا plus the jussive.</a></li>
            <li><a href="https://attahawi.com/wp-content/uploads/2020/04/exercises-on-arabic-morphology-vol-1.5.pdf" target="_blank" rel="noreferrer">Exercises on Arabic Morphology, Vol. 1, chapter 3, command and prohibitive forms.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/10">← Lesson 10: Present passive</a><a className="next-lesson-link" href="#/lesson/12">Next: the six Abwāb →</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Imperative and prohibitive</li><li>Build اُكْتُبْ</li><li>Build لَا تَكْتُبْ</li><li>Six second-person slots</li><li>Dual form overlap</li><li>Pronoun practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Positive command: اُكْتُبْ. Prohibition: لَا تَكْتُبْ. Never put لَا directly before the imperative form.</p></div></aside>
    </div>
  </main>
}


const lessonThirteenCopy = {
  en: {
    lead:'A root gives a word family its core idea; a pattern shapes a verb around that root. Form I is the basic triliteral form, while Forms II–X are common augmented patterns.',
    objective:'Distinguish mujarrad from mazīd, recognise the ten common triliteral forms, and identify the four standard quadriliteral patterns.',
    definition:'الْمُجَرَّدُ is an unaugmented stem: its root radicals appear without added pattern consonants. الْمَزِيدُ has one or more additions, such as a prefix, an infixed letter, a long vowel, or a doubled radical.',
    distinction:'For a triliteral root, the three radicals map to ف، ع، ل. A pattern can add letters before, between, or after them, and may double a radical. The root letters remain identifiable.',
    caution:'Pattern meanings are tendencies, not guaranteed translations. A form can have several meanings, and individual verbs may be lexicalised. Learn each verb with its dictionary meaning and context.',
    formOne:'Form I has several past/present vowel classes (for example فَعَلَ، فَعِلَ، فَعُلَ). Do not assume one Form I verb predicts another verb’s muḍāriʿ vowel; learn the pair together.',
    quadriliteral:'A quadriliteral root has four radicals. Its basic pattern is فَعْلَلَ, as in دَحْرَجَ (to roll). A common augmented pattern is تَفَعْلَلَ, as in تَدَحْرَجَ (to tumble). A prefix does not turn a triliteral root into a quadriliteral root.',
    practice:'Identify the pattern used by each example. Choose the form number or quadriliteral category.',
    correct:'Correct pattern.', incorrect:'The correct pattern is', score:'Your score', check:'Check patterns',
    teach:'Explain the difference between mujarrad and mazīd. Give one common tendency of Form II, Form V, and Form X, and explain why tendencies are not fixed translation rules.',
    summary:'Keep root and pattern separate. The root carries the lexical family; the pattern contributes a structure and often a semantic modification. Verify the actual meaning in context.',
    audio:'Verified human pronunciation recordings are not available yet. Browser-generated speech will not be presented as authoritative Arabic pronunciation.',
  },
  fa: {
    lead:'ریشه معنای اصلی واژه را می‌رساند و وزن، فعل را در قالبی پیرامون آن ریشه می‌سازد. باب اول صورت پایهٔ ثلاثی است و باب‌های دوم تا دهم از وزن‌های رایج مزید هستند.',
    objective:'مجرد و مزید را تشخیص دهید، ده وزن رایج ثلاثی را بشناسید و چهار وزن معیار رباعی را معرفی کنید.',
    definition:'الْمُجَرَّدُ فعلی است که حروف اصلی ریشه بدون حروف افزودهٔ وزنی در آن آمده‌اند. الْمَزِيدُ دارای یک یا چند افزوده است؛ مانند پیشوند، حرف میانجی، کشش واکه یا تشدید یکی از حروف ریشه.',
    distinction:'در ریشهٔ ثلاثی، سه حرف اصلی با ف، ع، ل نشان داده می‌شوند. وزن می‌تواند پیش از ریشه، میان حروف یا پس از آن حرفی بیفزاید و نیز یک حرف ریشه را مشدد کند.',
    caution:'معناهای رایج هر باب گرایش‌اند، نه ترجمه‌های قطعی. یک وزن می‌تواند چند معنا داشته باشد و برخی افعال معنای واژگانی خاص پیدا می‌کنند. معنای هر فعل را همراه فرهنگ و بافت بیاموزید.',
    formOne:'باب اول چند دستهٔ حرکتی در ماضی و مضارع دارد؛ مانند فَعَلَ، فَعِلَ و فَعُلَ. از حرکت مضارع یک فعل نمی‌توان حرکت مضارع فعل دیگر را حدس زد؛ هر جفت را با هم حفظ کنید.',
    quadriliteral:'ریشهٔ رباعی چهار حرف اصلی دارد. وزن پایهٔ آن فَعْلَلَ است؛ مانند دَحْرَجَ (غلتاندن). وزن مزید رایج آن تَفَعْلَلَ است؛ مانند تَدَحْرَجَ (غلتیدن). افزودن پیشوند، ریشهٔ ثلاثی را رباعی نمی‌کند.',
    practice:'وزن هر نمونه را تشخیص دهید و شمارهٔ باب یا گروه رباعی را انتخاب کنید.',
    correct:'وزن درست است.', incorrect:'وزن درست:', score:'امتیاز شما', check:'بررسی وزن‌ها',
    teach:'تفاوت مجرد و مزید را توضیح دهید. سپس یک گرایش معنایی از باب دوم، پنجم و دهم بیان کنید و توضیح دهید چرا این گرایش‌ها قانون ترجمهٔ قطعی نیستند.',
    summary:'ریشه و وزن را جدا نگه دارید. ریشه خانوادهٔ معنایی را می‌رساند و وزن ساختار و غالباً تغییری معنایی ایجاد می‌کند. معنای واقعی را در بافت بررسی کنید.',
    audio:'هنوز فایل‌های ضبط‌شده و تأییدشدهٔ تلفظ در دسترس نیست. صدای ماشینی مرورگر را به‌عنوان تلفظ معتبر عربی معرفی نمی‌کنیم.',
  },
  ur: {
    lead:'مادّہ بنیادی لغوی معنی دیتا ہے اور وزن اس مادّے کے گرد فعل کی ساخت بناتا ہے۔ باب اول ثلاثی کی بنیادی صورت ہے، جبکہ باب دوم تا دہم عام مزید اوزان ہیں۔',
    objective:'مجرد اور مزید میں فرق کریں، ثلاثی کے دس عام اوزان پہچانیں، اور رباعی کے چار معیاری اوزان سے واقف ہوں۔',
    definition:'الْمُجَرَّدُ وہ فعل ہے جس میں مادّے کے اصلی حروف کے علاوہ کوئی زائد حرفِ وزنی نہ ہو۔ الْمَزِيدُ میں ایک یا زیادہ اضافے ہوتے ہیں، مثلاً سابقہ، درمیان میں آنے والا حرف، لمبی آواز، یا کسی اصلی حرف کی تشدید۔',
    distinction:'ثلاثی مادّے کے تین اصلی حروف کو ف، ع، ل سے ظاہر کرتے ہیں۔ وزن مادّے سے پہلے، درمیان یا بعد میں حروف بڑھا سکتا ہے اور کسی اصلی حرف کو مشدد بھی کر سکتا ہے۔',
    caution:'ہر باب کے معنی عمومی رجحانات ہیں، قطعی ترجمے نہیں۔ ایک وزن کے کئی معنی ہو سکتے ہیں اور بعض افعال کا خاص لغوی معنی ہوتا ہے۔ ہر فعل کا اصل معنی لغت اور سیاق کے ساتھ سیکھیں۔',
    formOne:'باب اول کے ماضی اور مضارع میں کئی حرکاتی اقسام ہیں، مثلاً فَعَلَ، فَعِلَ اور فَعُلَ۔ ایک فعل کے مضارع کی حرکت سے دوسرے فعل کی حرکت اخذ نہ کریں؛ ہر جوڑا ساتھ یاد کریں۔',
    quadriliteral:'رباعی مادّے کے چار اصلی حروف ہوتے ہیں۔ اس کا بنیادی وزن فَعْلَلَ ہے، جیسے دَحْرَجَ (لڑھکانا)۔ ایک عام مزید وزن تَفَعْلَلَ ہے، جیسے تَدَحْرَجَ (لڑھکنا)۔ سابقہ لگانے سے ثلاثی مادّہ رباعی نہیں بن جاتا۔',
    practice:'ہر مثال کا وزن پہچانیں اور درست باب یا رباعی کی قسم منتخب کریں۔',
    correct:'درست وزن۔', incorrect:'درست وزن ہے:', score:'آپ کا اسکور', check:'اوزان جانچیں',
    teach:'مجرد اور مزید کا فرق بیان کریں۔ باب دوم، پنجم اور دہم کے ایک ایک عمومی رجحان کی وضاحت کریں، اور بتائیں کہ یہ قطعی ترجمے کے اصول کیوں نہیں ہیں۔',
    summary:'مادّہ اور وزن کو الگ رکھیں۔ مادّہ لغوی خاندان دیتا ہے اور وزن ساختی اور اکثر معنوی تبدیلی پیدا کرتا ہے۔ اصل معنی سیاق سے معلوم کریں۔',
    audio:'اس سبق کے لیے مستند انسانی تلفظ کی ریکارڈنگ ابھی دستیاب نہیں۔ براؤزر کی مصنوعی آواز کو مستند عربی تلفظ کے طور پر پیش نہیں کریں گے.',
  },
} as const

const triliteralForms = [
  {form:'I',pattern:'فَعَلَ',example:'كَتَبَ',latin:'kataba',root:'ك ت ب',meaning:'to write',fa:'نوشتن',ur:'لکھنا',tendency:'Basic lexical meaning',tendencyFa:'معنای پایه',tendencyUr:'بنیادی معنی'},
  {form:'II',pattern:'فَعَّلَ',example:'عَلَّمَ',latin:'ʿallama',root:'ع ل م',meaning:'to teach',fa:'آموزش دادن',ur:'تعلیم دینا',tendency:'Often causative or intensive',tendencyFa:'اغلب سببی یا شدت‌بخش',tendencyUr:'اکثر سببی یا شدت والا'},
  {form:'III',pattern:'فَاعَلَ',example:'قَاتَلَ',latin:'qātala',root:'ق ت ل',meaning:'to fight',fa:'جنگیدن',ur:'جنگ کرنا',tendency:'Often interaction or directed engagement',tendencyFa:'اغلب کنش متقابل',tendencyUr:'اکثر باہمی عمل'},
  {form:'IV',pattern:'أَفْعَلَ',example:'أَكْرَمَ',latin:'akrama',root:'ك ر م',meaning:'to honour',fa:'گرامی داشتن',ur:'عزت دینا',tendency:'Often causative or transformative',tendencyFa:'اغلب سببی یا دگرگون‌کننده',tendencyUr:'اکثر سببی یا تبدیلی'},
  {form:'V',pattern:'تَفَعَّلَ',example:'تَعَلَّمَ',latin:'taʿallama',root:'ع ل م',meaning:'to learn',fa:'آموختن',ur:'سیکھنا',tendency:'Often middle/reflexive counterpart of II',tendencyFa:'اغلب صورت بازتابی باب دوم',tendencyUr:'اکثر باب دوم کی بازتابی صورت'},
  {form:'VI',pattern:'تَفَاعَلَ',example:'تَكَاتَبَ',latin:'takātaba',root:'ك ت ب',meaning:'to correspond with one another',fa:'با یکدیگر مکاتبه کردن',ur:'ایک دوسرے سے خط و کتابت کرنا',tendency:'Often reciprocal or shared action',tendencyFa:'اغلب کنش متقابل',tendencyUr:'اکثر باہمی عمل'},
  {form:'VII',pattern:'اِنْفَعَلَ',example:'اِنْكَسَرَ',latin:'inkasara',root:'ك س ر',meaning:'to break / become broken',fa:'شکستن / شکسته شدن',ur:'ٹوٹنا',tendency:'Often middle or passive-like',tendencyFa:'اغلب میانه یا شبیه مجهول',tendencyUr:'اکثر درمیانی یا مجہول نما'},
  {form:'VIII',pattern:'اِفْتَعَلَ',example:'اِجْتَمَعَ',latin:'ijtamaʿa',root:'ج م ع',meaning:'to gather / meet',fa:'گرد آمدن',ur:'جمع ہونا',tendency:'Often middle, reflexive, or effortful',tendencyFa:'اغلب میانه یا بازتابی',tendencyUr:'اکثر درمیانی یا بازتابی'},
  {form:'IX',pattern:'اِفْعَلَّ',example:'اِحْمَرَّ',latin:'iḥmarra',root:'ح م ر',meaning:'to become red',fa:'سرخ شدن',ur:'سرخ ہو جانا',tendency:'Often colours and physical qualities',tendencyFa:'اغلب رنگ‌ها و ویژگی‌های جسمانی',tendencyUr:'اکثر رنگ اور جسمانی کیفیت'},
  {form:'X',pattern:'اِسْتَفْعَلَ',example:'اِسْتَغْفَرَ',latin:'istaghfara',root:'غ ف ر',meaning:'to seek forgiveness',fa:'آمرزش خواستن',ur:'مغفرت طلب کرنا',tendency:'Often seeking or requesting',tendencyFa:'اغلب طلب یا درخواست',tendencyUr:'اکثر طلب یا درخواست'},
] as const

const quadriliteralPatterns = [
  {form:'I',pattern:'فَعْلَلَ',example:'دَحْرَجَ',latin:'daḥraja',meaning:'to roll'},
  {form:'II',pattern:'تَفَعْلَلَ',example:'تَدَحْرَجَ',latin:'tadaḥraja',meaning:'to tumble / roll'},
  {form:'III',pattern:'اِفْعَنْلَلَ',example:'—',latin:'—',meaning:'rare'},
  {form:'IV',pattern:'اِفْعَلَلَّ',example:'—',latin:'—',meaning:'rare'},
]
const formPractice = [
  {example:'عَلَّمَ',latin:'ʿallama',answer:'II'},
  {example:'أَكْرَمَ',latin:'akrama',answer:'IV'},
  {example:'تَعَلَّمَ',latin:'taʿallama',answer:'V'},
  {example:'اِنْكَسَرَ',latin:'inkasara',answer:'VII'},
  {example:'اِسْتَغْفَرَ',latin:'istaghfara',answer:'X'},
  {example:'دَحْرَجَ',latin:'daḥraja',answer:'Q-I'},
]
const formChoices = [
  {value:'I',label:'Form I · فَعَلَ'},{value:'II',label:'Form II · فَعَّلَ'},{value:'III',label:'Form III · فَاعَلَ'},
  {value:'IV',label:'Form IV · أَفْعَلَ'},{value:'V',label:'Form V · تَفَعَّلَ'},{value:'VI',label:'Form VI · تَفَاعَلَ'},
  {value:'VII',label:'Form VII · اِنْفَعَلَ'},{value:'VIII',label:'Form VIII · اِفْتَعَلَ'},{value:'IX',label:'Form IX · اِفْعَلَّ'},
  {value:'X',label:'Form X · اِسْتَفْعَلَ'},{value:'Q-I',label:'Quadriliteral I · فَعْلَلَ'},
]

function LessonThirteenPage() {
  const [language,setLanguage] = useState<'en'|'fa'|'ur'>('en')
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answers,setAnswers] = useState<Record<number,string>>({})
  const [checked,setChecked] = useState(false)
  const copy = lessonThirteenCopy[language]
  const rtl = language !== 'en'
  const score = formPractice.filter((item,index)=>answers[index]===item.answer).length
  return <main className="lesson-page">
    <header className="lesson-header"><a href="#/lesson/12" className="back-link">← Previous lesson</a><span className="lesson-progress-label">UNIT 05 · LESSON 13</span></header>
    <div className="lesson-toolbar">
      <div className="language-control" aria-label="Lesson explanation language"><Languages size={15}/><span>Explanation</span>
        <button type="button" aria-pressed={language==='en'} className={language==='en'?'selected':''} onClick={()=>setLanguage('en')}>English</button>
        <button type="button" aria-pressed={language==='fa'} className={language==='fa'?'selected':''} onClick={()=>setLanguage('fa')}>فارسی</button>
        <button type="button" aria-pressed={language==='ur'} className={language==='ur'?'selected':''} onClick={()=>setLanguage('ur')}>اردو</button>
      </div>
      <button type="button" className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
    </div>
    <div className="lesson-layout">
      <article className="lesson-article" dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">UNIT 05 · MUJARRAD AND MAZĪD</div>
        <h1>Triliteral verb <em>forms I–X</em></h1>
        <p className="lesson-lead" lang={language}>{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">الْمُجَرَّدُ وَالْمَزِيدُ</div>
          {showTransliteration&&<div className="lesson-translit" dir="ltr">al-mujarrad wa-l-mazīd</div>}
          <h2>Root + pattern = verb form</h2>
          <p lang={language}>{copy.definition}</p>
          <div className="objective-panel"><strong>Learning objectives</strong><p lang={language}>{copy.objective}</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">HOW THE PATTERN WORKS</span>
          <h2 lang="ar" dir="rtl">ف · ع · ل</h2>
          <p lang={language}>{copy.distinction}</p>
          <div className="pattern-cue-grid">
            <div><b>II</b><strong>Shadda</strong><span>Double the second radical</span></div>
            <div><b>III</b><strong>Long alif</strong><span>Alif after the first radical</span></div>
            <div><b>IV</b><strong>Hamza</strong><span>Hamza prefix</span></div>
            <div><b>V–VI</b><strong>Ta prefix</strong><span>Often built on II or III</span></div>
            <div><b>VII–IX</b><strong>Infix / doubling</strong><span>Pattern letters and doubled radical</span></div>
            <div><b>X</b><strong>Ist- prefix</strong><span>اِسْتَـ at the beginning</span></div>
          </div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">THE TEN COMMON TRILITERAL FORMS</span>
          <h2>Forms I–X</h2>
          <div className="form-table">
            <div className="form-table-head"><span>Form</span><span>Pattern</span><span>Example · root</span><span>Meaning</span><span>Common tendency</span></div>
            {triliteralForms.map(item=><div className="form-table-row" key={item.form}>
              <strong>{item.form}</strong>
              <b className="form-pattern" lang="ar" dir="rtl">{item.pattern}</b>
              <div className="form-example"><b lang="ar" dir="rtl">{item.example}</b>{showTransliteration&&<small>{item.latin}</small>}<small className="form-root" lang="ar" dir="rtl">{item.root}</small></div>
              <span>{language==='fa'?item.fa:language==='ur'?item.ur:item.meaning}</span>
              <small>{language==='fa'?item.tendencyFa:language==='ur'?item.tendencyUr:item.tendency}</small>
            </div>)}
          </div>
          <div className="warning-card"><strong>Form I has several vowel classes</strong><p lang={language}>{copy.formOne}</p></div>
          <div className="caution-note" lang={language}>{copy.caution}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">QUADRILITERAL ROOTS · رُبَاعِيٌّ</span>
          <h2>Four root letters</h2>
          <p lang={language}>{copy.quadriliteral}</p>
          <div className="quadriliteral-table">
            {quadriliteralPatterns.map(item=><div key={item.form}><strong>Form {item.form}</strong><b lang="ar" dir="rtl">{item.pattern}</b><span lang="ar" dir="rtl">{item.example}</span><small>{item.latin} · {item.meaning}</small></div>)}
          </div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">PRACTISE · IDENTIFY THE PATTERN</span>
          <h2>Which form is it?</h2>
          <p lang={language}>{copy.practice}</p>
          <div className="pronoun-practice-list">
            {formPractice.map((item,index)=><div className="pronoun-practice-row" key={item.example}>
              <div><b lang="ar" dir="rtl">{item.example}</b>{showTransliteration&&<small>{item.latin}</small>}</div>
              <select aria-label={'Choose the pattern for '+item.example} value={answers[index]||''} onChange={event=>{setAnswers({...answers,[index]:event.target.value});setChecked(false)}}>
                <option value="">Choose form…</option>
                {formChoices.map(choice=><option value={choice.value} key={choice.value}>{choice.label}</option>)}
              </select>
              {checked&&<p className={answers[index]===item.answer?'classification-feedback correct':'classification-feedback'}>{answers[index]===item.answer?copy.correct:copy.incorrect} <b>{formChoices.find(choice=>choice.value===item.answer)?.label}</b></p>}
            </div>)}
          </div>
          <button type="button" className="primary-button" disabled={Object.keys(answers).length!==formPractice.length} onClick={()=>setChecked(true)}>{copy.check}</button>
          {checked&&<p className="score-feedback">{copy.score}: <strong>{score} / {formPractice.length}</strong></p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">RECALL AND TEACH</span>
          <h2>Say it back</h2>
          <p lang={language}>{copy.teach}</p>
          <div className="example-sentence" lang={language}>{copy.summary}</div>
          <div className="audio-unavailable"><Volume2 size={16}/><span lang={language}>{copy.audio}</span></div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://corpus.quran.com/documentation/verbforms.jsp" target="_blank" rel="noreferrer">Quranic Arabic Corpus — Verb Forms, including triliteral I–X and quadriliteral I–IV.</a></li>
            <li><a href="https://www.wilbourhall.org/pdfs/wrightarabicgrammarvolume_i.pdf" target="_blank" rel="noreferrer">Wright, A Grammar of the Arabic Language, Volume I, section 33 on triliteral and quadriliteral verb forms.</a></li>
            <li><a href="https://www.ziyaraat.net/books/arabicanessentialgrammar.pdf" target="_blank" rel="noreferrer">Arabic: An Essential Grammar, section 18.15 on the ten derived verb forms and their semantic tendencies.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/lesson/12">← Lesson 12: Six Abwāb</a><span>Next: derived nouns and participles</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Mujarrad and mazīd</li><li>Root and pattern</li><li>Forms I–X</li><li>Semantic tendencies</li><li>Form I vowel classes</li><li>Quadriliteral roots</li><li>Pattern practice</li></ol><div className="aside-note"><strong>Study tip</strong><p>First find the root radicals. Then identify any prefix, infix, long vowel, or doubled radical that signals the pattern.</p></div></aside>
    </div>
  </main>
}

export default function App() {
  const [route,setRoute] = useState(window.location.hash)
  useEffect(()=>{
    const syncRoute=()=>setRoute(window.location.hash)
    window.addEventListener('hashchange',syncRoute)
    return ()=>window.removeEventListener('hashchange',syncRoute)
  },[])
  const [active,setActive] = useState('Learn')
  const [menu,setMenu] = useState(false)
  const [translit,setTranslit] = useState(true)
  if (route === '#/lesson/01') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 01 · LESSON 01</span></header><LessonPage/></div>
  if (route === '#/lesson/02') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 01 · LESSON 02</span></header><LessonTwoPage/></div>
  if (route === '#/lesson/03') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 01 · LESSON 03</span></header><LessonThreePage/></div>
  if (route === '#/lesson/04') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 01 · LESSON 04</span></header><LessonFourPage/></div>
  if (route === '#/lesson/05') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 02 · LESSON 05</span></header><LessonFivePage/></div>
  if (route === '#/lesson/06') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 06</span></header><LessonSixPage/></div>
  if (route === '#/lesson/07') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 07</span></header><LessonSevenPage/></div>
  if (route === '#/lesson/08') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 08</span></header><LessonEightPage/></div>
  if (route === '#/lesson/09') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 09</span></header><LessonNinePage/></div>
  if (route === '#/lesson/10') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 10</span></header><LessonTenPage/></div>
  if (route === '#/lesson/11') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 03 · LESSON 11</span></header><LessonElevenPage/></div>
  if (route === '#/lesson/12') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 04 · LESSON 12</span></header><LessonTwelvePage/></div>
  if (route === '#/lesson/13') return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 05 · LESSON 13</span></header><LessonThirteenPage/></div>
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'}>{menu?<X/>:<Menu/>}</button>
      <div className="topbar-right"><span className="streak"><Sparkles size={15}/> Build a daily habit</span><span className="profile-mark" aria-label="Learner profile"><GraduationCap size={16}/></span></div>
    </header>
    <div className="layout">
      <aside className={`sidebar ${menu?'sidebar-open':''}`}>
        <div className="nav-caption">YOUR LEARNING SPACE</div>
        <nav aria-label="Main navigation">{navItems.map(({label,icon:Icon})=><button key={label} className={`nav-link ${active===label?'active':''}`} disabled={label!=='Learn'} onClick={()=>{setActive(label);setMenu(false)}}><Icon size={18}/><span>{label}</span>{label==='Learn'&&<i className="nav-dot"/>}</button>)}</nav>
        <div className="sidebar-card"><span className="help-icon"><CircleHelp size={17}/></span><strong>New to Sarf?</strong><p>Begin with the foundations. No prior knowledge is needed.</p><a href="#course">Explore the course <ChevronRight size={14}/></a></div>
        <div className="sidebar-foot">A thoughtful step, every day.</div>
      </aside>
      <main className="main-content">
        <section className="welcome-row"><div><div className="eyebrow">YOUR PATH INTO ARABIC MORPHOLOGY</div><h1>Understand Arabic.<br/><em>Master Sarf.</em></h1><p className="intro">A clear, step-by-step journey from your very first root to confident word analysis.</p></div><div className="hero-ornament"><span lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</span><small>THE SCIENCE OF WORD FORMS</small><i/></div></section>
        <section className="progress-card"><div className="progress-top"><div><span className="section-kicker">YOUR FOUNDATION COURSE</span><h2>60 days to a stronger foundation</h2></div><span className="progress-pill">Ready when you are</span></div><div className="progress-meta"><span>Lessons available</span><strong>12 lesson drafts</strong></div><div className="progress-bottom"><span>8 carefully sequenced learning units</span><span>20–30 min / day</span></div></section>
        <section className="course-section" id="course"><div className="section-heading"><div><span className="section-kicker">THE LEARNING PATH</span><h2>Build your understanding, one layer at a time</h2></div><span className="text-action">8 learning units <ChevronRight size={15}/></span></div>
          <div className="unit-grid">{units.map(([num,title,days,detail,status],i)=><article className={`unit-card ${i===0?'unit-featured':''}`} key={num}><div className="unit-top"><span className="unit-number">{num}</span><span className={i===0?'unit-status ready':'unit-status'}>{status}</span></div><h3>{title}</h3><p>{detail}</p><div className="unit-bottom"><span>{days}</span><ChevronRight size={17}/></div></article>)}</div>
        <div className="lesson-library">
            <div className="lesson-library-heading"><span className="section-kicker">LESSON LIBRARY</span><h3>Open any lesson directly</h3><p>Each lesson has a stable link, so you can bookmark it or return to it after refreshing.</p></div>
            <div className="lesson-library-groups">
              <div className="lesson-library-group"><div className="lesson-library-group-title"><strong>Unit 1 · Foundations</strong><span>Days 1–6</span></div><div className="lesson-library-list">
                <a className="lesson-library-link" href="#/lesson/01"><span>01</span><div><strong>Introduction to Sarf</strong><small>What the science studies and why it matters</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/02"><span>02</span><div><strong>Arabic word categories</strong><small>Ism, fiʿl, and ḥarf</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/03"><span>03</span><div><strong>Verb and maṣdar</strong><small>Recognising actions and verbal nouns</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/04"><span>04</span><div><strong>Original and added letters</strong><small>Root structure and mujarrad/mazīd</small></div><ChevronRight size={16}/></a>
              </div></div>
              <div className="lesson-library-group"><div className="lesson-library-group-title"><strong>Unit 2 · The Morphological Scale</strong><span>Days 7–12</span></div><div className="lesson-library-list">
                <a className="lesson-library-link" href="#/lesson/05"><span>05</span><div><strong>The Mīzān Ṣarfī</strong><small>Weighing roots and derived patterns</small></div><ChevronRight size={16}/></a>
              </div></div>
              <div className="lesson-library-group"><div className="lesson-library-group-title"><strong>Unit 3 · The Fourteen Forms</strong><span>Days 13–22</span></div><div className="lesson-library-list">
                <a className="lesson-library-link" href="#/lesson/06"><span>06</span><div><strong>The 14 ṣīghahs</strong><small>Pronoun order and the three groups</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/07"><span>07</span><div><strong>Past active</strong><small>Al-māḍī al-maʿrūf</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/08"><span>08</span><div><strong>Present active</strong><small>Al-muḍāriʿ al-maʿrūf</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/09"><span>09</span><div><strong>Past passive</strong><small>Al-māḍī al-majhūl</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/10"><span>10</span><div><strong>Present passive</strong><small>Al-muḍāriʿ al-majhūl</small></div><ChevronRight size={16}/></a>
                <a className="lesson-library-link" href="#/lesson/11"><span>11</span><div><strong>Imperative and prohibitive</strong><small>Amr and nahy · six addressee slots</small></div><ChevronRight size={16}/></a>
              </div></div>
              <div className="lesson-library-group"><div className="lesson-library-group-title"><strong>Unit 4 · The Six Common Abwāb</strong><span>Days 23–30</span></div><div className="lesson-library-list">
                <a className="lesson-library-link" href="#/lesson/12"><span>12</span><div><strong>The six Abwāb</strong><small>Past/present patterns of triliteral mujarrad verbs</small></div><ChevronRight size={16}/></a>
              </div></div>
              <div className="lesson-library-group"><div className="lesson-library-group-title"><strong>Unit 5 · Mujarrad and Mazīd</strong><span>Days 31–38</span></div><div className="lesson-library-list">
                <a className="lesson-library-link" href="#/lesson/13"><span>13</span><div><strong>Triliteral forms I–X</strong><small>Root, pattern, augmentation, and quadriliteral forms</small></div><ChevronRight size={16}/></a>
              </div></div>
            </div>
          </div>
        </section>
        <section className="lesson-preview"><div className="lesson-copy"><span className="section-kicker">A FIRST LOOK · UNIT 01</span><h2>Every word has a story.<br/>Let's find its root.</h2><p>Take the verb <b lang="ar" dir="rtl" className="inline-arabic">كَتَبَ</b>. Before memorising a table, learn to see the three root letters beneath its pattern.</p><a className="primary-button" href="#/lesson/01">Begin lesson one <ChevronRight size={16}/></a></div>
          <div className="word-study"><div className="word-label">A WORD TO EXPLORE</div><div className="arabic-word" lang="ar" dir="rtl">كَتَبَ</div>{translit&&<div className="transliteration">kataba</div>}<div className="word-meaning">He wrote</div><div className="word-divider"/><div className="root-row"><span>ROOT LETTERS</span><strong lang="ar" dir="rtl">ك · ت · ب</strong></div><div className="root-row"><span>ROOT IDEA</span><strong>Writing</strong></div><button className="reveal-button" onClick={()=>setTranslit(!translit)}>{translit?'Hide':'Show'} transliteration</button><div className="audio-note"><Volume2 size={15}/> Verified pronunciation audio will be added with the lesson.</div></div>
        </section>
        <section className="principle-row"><div className="principle-icon"><Brain size={21}/></div><div><strong>Understand first. Memorise with meaning.</strong><p>Each lesson explains the reason behind a rule, answers the questions a beginner is likely to ask, and gives you examples to practise until the pattern becomes familiar.</p></div></section>
        <footer className="footer"><span>SARF MASTERY <b lang="ar" dir="rtl">صَرْف</b></span><span>Learn · Understand · Apply · Teach</span></footer>
      </main>
    </div>
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">{navItems.slice(0,4).map(({label,icon:Icon})=><button key={label} className={active===label?'selected':''} disabled={label!=='Learn'} onClick={()=>setActive(label)}><Icon size={18}/><span>{label}</span></button>)}</nav>
  </div>
}
