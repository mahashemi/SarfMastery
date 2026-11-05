import { useState } from 'react'
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

export default function App() {
  const [active,setActive] = useState('Learn')
  const [menu,setMenu] = useState(false)
  const [translit,setTranslit] = useState(true)
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">صَرْف</span><span className="brand-copy"><strong>SARF MASTERY</strong><small>Arabic morphology, made clear</small></span></a>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'}>{menu?<X/>:<Menu/>}</button>
      <div className="topbar-right"><span className="streak"><Sparkles size={15}/> Build a daily habit</span><span className="profile-mark" aria-label="Learning profile">S</span></div>
    </header>
    <div className="layout">
      <aside className={`sidebar ${menu?'sidebar-open':''}`}>
        <div className="nav-caption">YOUR LEARNING SPACE</div>
        <nav aria-label="Main navigation">{navItems.map(({label,icon:Icon})=><button key={label} className={`nav-link ${active===label?'active':''}`} onClick={()=>{setActive(label);setMenu(false)}}><Icon size={18}/><span>{label}</span>{label==='Learn'&&<i className="nav-dot"/>}</button>)}</nav>
        <div className="sidebar-card"><span className="help-icon"><CircleHelp size={17}/></span><strong>New to Sarf?</strong><p>Begin with the foundations. No prior knowledge is needed.</p><a href="#course">Explore the course <ChevronRight size={14}/></a></div>
        <div className="sidebar-foot">A thoughtful step, every day.</div>
      </aside>
      <main className="main-content">
        <section className="welcome-row"><div><div className="eyebrow">YOUR PATH INTO ARABIC MORPHOLOGY</div><h1>Understand Arabic.<br/><em>Master Sarf.</em></h1><p className="intro">A clear, step-by-step journey from your very first root to confident word analysis.</p></div><div className="hero-ornament"><span lang="ar" dir="rtl">عِلْمُ الصَّرْفِ</span><small>THE SCIENCE OF WORD FORMS</small><i/></div></section>
        <section className="progress-card"><div className="progress-top"><div><span className="section-kicker">YOUR FOUNDATION COURSE</span><h2>60 days to a stronger foundation</h2></div><span className="progress-pill">Ready when you are</span></div><div className="progress-meta"><span>Course progress</span><strong>0 of 60 days</strong></div><div className="progress-track"><span/></div><div className="progress-bottom"><span>8 carefully sequenced learning units</span><span>20–30 min / day</span></div></section>
        <section className="course-section" id="course"><div className="section-heading"><div><span className="section-kicker">THE LEARNING PATH</span><h2>Build your understanding, one layer at a time</h2></div><button className="text-action" onClick={()=>setActive('Learn')}>View course map <ChevronRight size={15}/></button></div>
          <div className="unit-grid">{units.map(([num,title,days,detail,status],i)=><article className={`unit-card ${i===0?'unit-featured':''}`} key={num}><div className="unit-top"><span className="unit-number">{num}</span><span className={i===0?'unit-status ready':'unit-status'}>{status}</span></div><h3>{title}</h3><p>{detail}</p><div className="unit-bottom"><span>{days}</span><ChevronRight size={17}/></div></article>)}</div>
        </section>
        <section className="lesson-preview"><div className="lesson-copy"><span className="section-kicker">A FIRST LOOK · UNIT 01</span><h2>Every word has a story.<br/>Let's find its root.</h2><p>Take the verb <b lang="ar" dir="rtl" className="inline-arabic">كَتَبَ</b>. Before memorising a table, learn to see the three root letters beneath its pattern.</p><button className="primary-button" onClick={()=>setActive('Learn')}>Preview the first lesson <ChevronRight size={16}/></button></div>
          <div className="word-study"><div className="word-label">A WORD TO EXPLORE</div><div className="arabic-word" lang="ar" dir="rtl">كَتَبَ</div>{translit&&<div className="transliteration">kataba</div>}<div className="word-meaning">He wrote</div><div className="word-divider"/><div className="root-row"><span>ROOT LETTERS</span><strong lang="ar" dir="rtl">ك · ت · ب</strong></div><div className="root-row"><span>ROOT IDEA</span><strong>Writing</strong></div><button className="reveal-button" onClick={()=>setTranslit(!translit)}>{translit?'Hide':'Show'} transliteration</button><div className="audio-note"><Volume2 size={15}/> Verified pronunciation audio will be added with the lesson.</div></div>
        </section>
        <section className="principle-row"><div className="principle-icon"><Brain size={21}/></div><div><strong>Understand first. Memorise with meaning.</strong><p>Each lesson explains the reason behind a rule, answers the questions a beginner is likely to ask, and gives you examples to practise until the pattern becomes familiar.</p></div></section>
        <footer className="footer"><span>SARF MASTERY <b lang="ar" dir="rtl">صَرْف</b></span><span>Learn · Understand · Apply · Teach</span></footer>
      </main>
    </div>
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">{navItems.slice(0,4).map(({label,icon:Icon})=><button key={label} className={active===label?'selected':''} onClick={()=>setActive(label)}><Icon size={18}/><span>{label}</span></button>)}</nav>
  </div>
}
