import { useEffect, useState } from 'react'
import { BookOpen, Headphones, Brain, Search, GraduationCap, Bookmark, ChevronRight, Menu, X, CircleHelp, Sparkles, Volume2 } from 'lucide-react'

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

function LessonPage() {
  const [showTransliteration,setShowTransliteration] = useState(true)
  const [answer,setAnswer] = useState('')
  const [showAnswer,setShowAnswer] = useState(false)
  return <main className="lesson-page">
    <header className="lesson-header">
      <a href="#/" className="back-link">← Back to learning path</a>
      <span className="lesson-progress-label">UNIT 01 · LESSON 01</span>
    </header>
    <div className="lesson-layout">
      <article className="lesson-article">
        <div className="eyebrow">THE FIRST STEP · NO PRIOR KNOWLEDGE NEEDED</div>
        <h1>What is <em>Sarf?</em></h1>
        <p className="lesson-lead">Before we learn to change Arabic words, let's understand what we are studying, why it matters, and how to look at a word.</p>
        <section className="lesson-block">
          <div className="lesson-term" lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</div>
          {showTransliteration && <div className="lesson-translit">ʿilm al-ṣarf</div>}
          <h2>The study of word forms</h2>
          <p><strong>Sarf</strong> is the study of how Arabic words are formed and how a word's form changes to express related meanings. It helps us recognise the family of words built from a shared root.</p>
          <button className="quiet-button" onClick={()=>setShowTransliteration(!showTransliteration)}>{showTransliteration?'Hide':'Show'} transliteration</button>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">TWO COMPLEMENTARY LENSES</span>
          <h2>Sarf and Nahw: what is the difference?</h2>
          <div className="compare-grid">
            <div><span className="compare-label">الصَّرْفُ · SARF</span><h3>The word itself</h3><p>How is the word built? What form is it? How is it related to other words?</p></div>
            <div><span className="compare-label">النَّحْوُ · NAḤW</span><h3>The word in a sentence</h3><p>What role does the word play? How does its ending relate to the sentence?</p></div>
          </div>
          <p className="example-sentence">Think of it this way: Sarf studies the word's shape; Nahw studies the word's job in a sentence.</p>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">YOUR FIRST WORD FAMILY</span>
          <h2>Look closely at كَتَبَ</h2>
          <p>These words are related to the idea of writing. Notice that the three root consonants remain recognisable while the word forms differ.</p>
          <div className="word-family">
            <div><b lang="ar" dir="rtl">كَتَبَ</b><span>kataba</span><small>he wrote</small></div>
            <div><b lang="ar" dir="rtl">يَكْتُبُ</b><span>yaktubu</span><small>he writes</small></div>
            <div><b lang="ar" dir="rtl">كَاتِبٌ</b><span>kātibun</span><small>a writer</small></div>
            <div><b lang="ar" dir="rtl">مَكْتُوبٌ</b><span>maktūbun</span><small>written</small></div>
          </div>
          <div className="root-callout"><span>THE ROOT CONSONANTS</span><strong lang="ar" dir="rtl">ك · ت · ب</strong><p>The short vowels are important for pronunciation and word pattern, but they are not counted as root consonant letters here.</p></div>
        </section>
        <section className="lesson-block">
          <span className="section-kicker">A QUESTION BEGINNERS OFTEN ASK</span>
          <h2>Is كِتَابٌ the same as كَتَبَ?</h2>
          <p>They are related through the root ك ت ب, but they are not the same word. <b lang="ar" dir="rtl">كَتَبَ</b> (kataba) is a verb meaning “he wrote”. <b lang="ar" dir="rtl">كِتَابٌ</b> (kitābun) is a noun meaning “a book”. The pattern helps shape the word and its role.</p>
        </section>
        <section className="lesson-block practice-block">
          <span className="section-kicker">CHECK YOUR UNDERSTANDING</span>
          <h2>Quick practice</h2>
          <p>In <b lang="ar" dir="rtl">كَتَبَ</b>, which letters are the root consonants?</p>
          <div className="answer-options">
            {['كَ · تَ · بَ','ك · ت · ب','كَتَبَ as one root letter'].map((v,i)=><button key={i} className={answer===String(i)?'answer-option chosen':'answer-option'} onClick={()=>{setAnswer(String(i));setShowAnswer(false)}}>{v}</button>)}
          </div>
          <button className="primary-button" disabled={!answer} onClick={()=>setShowAnswer(true)}>Check answer</button>
          {showAnswer&&<p className={answer==='1'?'answer-feedback correct':'answer-feedback'}>{answer==='1'?'Correct. The root consonants are kāf, tāʾ, and bāʾ.':'Not quite. Look for the three consonant letters; the short vowel marks are not separate root letters.'}</p>}
        </section>
        <section className="lesson-block">
          <span className="section-kicker">SAY IT BACK</span>
          <h2>Teach-back</h2>
          <p>Try explaining, in your own words, the difference between Sarf and Nahw. Then explain why كَتَبَ and كِتَابٌ are related but not identical.</p>
          <div className="audio-unavailable">Pronunciation recordings are not available in this first checkpoint. Verified Arabic audio will be added before audio practice is enabled.</div>
        </section>
        <div className="lesson-end"><a href="#/">Return to the learning path</a></div>
      </article>
      <aside className="lesson-aside"><span className="section-kicker">IN THIS LESSON</span><ol><li>What Sarf studies</li><li>Sarf vs Nahw</li><li>Root letters</li><li>A first word family</li><li>Quick practice</li><li>Teach-back</li></ol><div className="aside-note"><strong>Study tip</strong><p>Take your time. Read the Arabic aloud, then say the explanation without looking.</p></div></aside>
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
