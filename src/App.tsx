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
      <article className="lesson-article" lang={language} dir={rtl?'rtl':'ltr'}>
        <div className="eyebrow">THE FIRST STEP · NO PRIOR KNOWLEDGE NEEDED</div>
        <h1>What is <em>Sarf?</em></h1>
        <p className="lesson-lead">{copy.lead}</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</div>
          {showTransliteration && <div className="lesson-translit" dir="ltr">ʿilm al-ṣarf</div>}
          <h2>The study of word forms</h2>
          <p>{copy.definition}</p>
        <div className="term-glossary" aria-label="Key Sarf vocabulary">
          <div><b lang="ar" dir="rtl">الْجِذْرُ</b><strong>Root</strong><span>ریشه · مادّہ</span><small>al-jidhr</small></div>
          <div><b lang="ar" dir="rtl">الْوَزْنُ</b><strong>Pattern / scale</strong><span>وزن · وزن</span><small>al-wazn</small></div>
          <div><b lang="ar" dir="rtl">الصِّيغَةُ</b><strong>Form</strong><span>صیغه · صیغہ</span><small>aṣ-ṣīghah</small></div>
          <div><b lang="ar" dir="rtl">كَلِمَةٌ</b><strong>Word</strong><span>واژه · لفظ</span><small>kalimah</small></div>
        </div>
          <div className="objective-panel"><strong>{copy.objectiveTitle}</strong><p>{copy.objective}</p></div>
          <h3 className="subheading">{copy.whyTitle}</h3><p>{copy.why}</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">TWO COMPLEMENTARY LENSES</span>
          <h2>Sarf and Nahw: what is the difference?</h2>
          <div className="compare-grid">
            <div><span className="compare-label">الصَّرْفُ · SARF</span><h3>{copy.sarfTitle}</h3><p>{copy.sarfDesc}</p></div>
            <div><span className="compare-label">النَّحْوُ · NAḤW</span><h3>{copy.nahwTitle}</h3><p>{copy.nahwDesc}</p></div>
          </div>
          <p className="example-sentence">{copy.compare}</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">YOUR FIRST WORD FAMILY</span>
          <h2>Look closely at كَتَبَ</h2>
          <p>{copy.familyIntro}</p>
          <div className="word-family">
            <div><b lang="ar" dir="rtl">كَتَبَ</b>{showTransliteration&&<span dir="ltr">kataba</span>}<small>he wrote</small></div>
            <div><b lang="ar" dir="rtl">يَكْتُبُ</b>{showTransliteration&&<span dir="ltr">yaktubu</span>}<small>he writes</small></div>
            <div><b lang="ar" dir="rtl">كَاتِبٌ</b>{showTransliteration&&<span dir="ltr">kātibun</span>}<small>a writer</small></div>
            <div><b lang="ar" dir="rtl">مَكْتُوبٌ</b>{showTransliteration&&<span dir="ltr">maktūbun</span>}<small>written</small></div>
            <div><b lang="ar" dir="rtl">كِتَابَةٌ</b>{showTransliteration&&<span dir="ltr">kitābatun</span>}<small>writing</small></div>
            <div><b lang="ar" dir="rtl">مَكْتَبٌ</b>{showTransliteration&&<span dir="ltr">maktabun</span>}<small>office / desk</small></div>
          </div>
          <div className="root-callout"><span>THE ROOT CONSONANTS · الْحُرُوفُ الْأَصْلِيَّةُ</span><strong lang="ar" dir="rtl">ك · ت · ب</strong><p>{copy.rootNote}</p></div>
          <div className="caution-note">{copy.patternCaution}</div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A QUESTION BEGINNERS OFTEN ASK</span>
          <h2>{copy.kitābQuestion}</h2>
          <p>{copy.kitābAnswer}</p>
          <div className="mini-example"><b lang="ar" dir="rtl">كَتَبَ</b><span>Verb · فعل</span><b lang="ar" dir="rtl">كِتَابٌ</b><span>Noun · اسم</span></div>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">CHECK YOUR UNDERSTANDING</span>
          <h2>{copy.practiceTitle}</h2>
          <p>{copy.practicePrompt}</p>
          <div className="answer-options">
            {copy.options.map((v,i)=><button key={i} dir={rtl?'rtl':'ltr'} className={answer===String(i)?'answer-option chosen':'answer-option'} onClick={()=>{setAnswer(String(i));setShowAnswer(false)}}>{v}</button>)}
          </div>
          <button className="primary-button" disabled={!answer} onClick={()=>setShowAnswer(true)}>{copy.check}</button>
          {showAnswer&&<p className={answer==='1'?'answer-feedback correct':'answer-feedback'}>{answer==='1'?copy.correct:copy.incorrect}</p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">SAY IT BACK</span>
          <h2>{copy.teachTitle}</h2>
          <p>{copy.teach}</p>
          <div className="audio-unavailable"><Volume2 size={16}/>{copy.audio}</div>
        </section>
        <section className="lesson-block source-block">
          <span className="section-kicker">REFERENCES</span>
          <h2>{copy.sourceTitle}</h2>
          <p>{copy.sourceNote}</p>
          <ul>
            <li><a href="https://academic.oup.com/edited-volume/44744/chapter-abstract/380148608" target="_blank" rel="noreferrer">Ramzi Baalbaki, “Arabic Linguistic Tradition I: Naḥw and ṣarf,” The Oxford Handbook of Arabic Linguistics (2013).</a></li>
            <li><a href="https://academic.oup.com/edited-volume/44744/chapter-abstract/380148475" target="_blank" rel="noreferrer">Robert R. Ratcliffe, “Morphology,” The Oxford Handbook of Arabic Linguistics (2013).</a></li>
            <li><a href="https://corpus.quran.com/documentation/morphologicalfeatures.jsp" target="_blank" rel="noreferrer">The Quranic Arabic Corpus — morphological features, roots, and lemmas.</a></li>
          </ul>
        </section>
        <div className="lesson-end"><a href="#/">Return to the learning path</a><span>{copy.next}</span></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>What Sarf studies</li><li>Sarf vs Nahw</li><li>Root letters and patterns</li><li>A first word family</li><li>Quick practice</li><li>Teach-back</li><li>Sources</li></ol><div className="aside-note"><strong>Study tip</strong><p>Take your time. Read the Arabic aloud, then say the explanation without looking.</p></div></aside>
    </div>
  </main>
}

export default function App() {
  const [lessonOpen,setLessonOpen] = useState(window.location.hash === '#/lesson/01')
  useEffect(()=>{
    const syncRoute=()=>setLessonOpen(window.location.hash === '#/lesson/01')
    window.addEventListener('hashchange',syncRoute)
    return ()=>window.removeEventListener('hashchange',syncRoute)
  },[])
  const [active,setActive] = useState('Learn')
  const [menu,setMenu] = useState(false)
  const [translit,setTranslit] = useState(true)
  if (lessonOpen) return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a><span className="lesson-top-unit">UNIT 01 · LESSON 01</span></header><LessonPage/></div>
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'}>{menu?<X/>:<Menu/>}</button>
      <div className="topbar-right"><span className="streak"><Sparkles size={15}/> Build a daily habit</span><span className="profile-mark" aria-label="Learner profile"><GraduationCap size={16}/></span></div>
    </header>
    <div className="layout">
      <aside className={\`sidebar \${menu?'sidebar-open':''}\`}>
        <div className="nav-caption">YOUR LEARNING SPACE</div>
        <nav aria-label="Main navigation">{navItems.map(({label,icon:Icon})=><button key={label} className={\`nav-link \${active===label?'active':''}\`} disabled={label!=='Learn'} onClick={()=>{setActive(label);setMenu(false)}}><Icon size={18}/><span>{label}</span>{label==='Learn'&&<i className="nav-dot"/>}</button>)}</nav>
        <div className="sidebar-card"><span className="help-icon"><CircleHelp size={17}/></span><strong>New to Sarf?</strong><p>Begin with the foundations. No prior knowledge is needed.</p><a href="#course">Explore the course <ChevronRight size={14}/></a></div>
        <div className="sidebar-foot">A thoughtful step, every day.</div>
      </aside>
      <main className="main-content">
        <section className="welcome-row"><div><div className="eyebrow">YOUR PATH INTO ARABIC MORPHOLOGY</div><h1>Understand Arabic.<br/><em>Master Sarf.</em></h1><p className="intro">A clear, step-by-step journey from your very first root to confident word analysis.</p></div><div className="hero-ornament"><span lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</span><small>THE SCIENCE OF WORD FORMS</small><i/></div></section>
        <section className="progress-card"><div className="progress-top"><div><span className="section-kicker">YOUR FOUNDATION COURSE</span><h2>60 days to a stronger foundation</h2></div><span className="progress-pill">Ready when you are</span></div><div className="progress-meta"><span>Course progress</span><strong>0 of 60 days</strong></div><div className="progress-track"><span/></div><div className="progress-bottom"><span>8 carefully sequenced learning units</span><span>20–30 min / day</span></div></section>
        <section className="course-section" id="course"><div className="section-heading"><div><span className="section-kicker">THE LEARNING PATH</span><h2>Build your understanding, one layer at a time</h2></div><span className="text-action">8 learning units <ChevronRight size={15}/></span></div>
          <div className="unit-grid">{units.map(([num,title,days,detail,status],i)=><article className={\`unit-card \${i===0?'unit-featured':''}\`} key={num}><div className="unit-top"><span className="unit-number">{num}</span><span className={i===0?'unit-status ready':'unit-status'}>{status}</span></div><h3>{title}</h3><p>{detail}</p><div className="unit-bottom"><span>{days}</span><ChevronRight size={17}/></div></article>)}</div>
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
