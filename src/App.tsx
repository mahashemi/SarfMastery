import { useEffect, useState } from 'react'
import { BookOpen, Headphones, Brain, Search, GraduationCap, Bookmark, ChevronRight, Menu, X, CircleHelp, Sparkles, Volume2, Languages } from 'lucide-react'

const units = [
  ['01','Foundations of Sarf','Days 1–6','Understand morphology, Arabic word structure, and what a root really is.','Start here'],
  ['02','The Morphological Scale','Days 7–12','Learn الميزان الصرفي and how words are weighed against ف ع ل.','Coming next'],
  ['03','The Fourteen Forms','Days 13–22','Build confidence with pronouns, conjugation, person, number, and gender.','Coming next'],
  ['04','The Six Common Abwāb','Days 23–30','Recognise common past-to-present verb patterns.','Coming next'],
  ['05','Mujarrad and Mazīd','Days 31–38','See how additional letters create related verb forms.','Coming next'],
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
        <div className="lesson-end"><a href="#/lesson/03">← Lesson 3: Verb and maṣdar</a><span>Next: the morphological scale (الميزان الصرفي)</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>Original and added letters</li><li>Mujarrad and Mazīd</li><li>One root, three patterns</li><li>سَأَلْتُمُونِيهَا</li><li>Mnemonic limitations</li><li>Classification practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Do not strip letters mechanically. Find the pattern and verify the root.</p></div></aside>
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
        <section className="progress-card"><div className="progress-top"><div><span className="section-kicker">YOUR FOUNDATION COURSE</span><h2>60 days to a stronger foundation</h2></div><span className="progress-pill">Ready when you are</span></div><div className="progress-meta"><span>Course progress</span><strong>0 of 60 days</strong></div><div className="progress-track"><span/></div><div className="progress-bottom"><span>8 carefully sequenced learning units</span><span>20–30 min / day</span></div></section>
        <section className="course-section" id="course"><div className="section-heading"><div><span className="section-kicker">THE LEARNING PATH</span><h2>Build your understanding, one layer at a time</h2></div><span className="text-action">8 learning units <ChevronRight size={15}/></span></div>
          <div className="unit-grid">{units.map(([num,title,days,detail,status],i)=><article className={`unit-card ${i===0?'unit-featured':''}`} key={num}><div className="unit-top"><span className="unit-number">{num}</span><span className={i===0?'unit-status ready':'unit-status'}>{status}</span></div><h3>{title}</h3><p>{detail}</p><div className="unit-bottom"><span>{days}</span><ChevronRight size={17}/></div></article>)}</div>
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
