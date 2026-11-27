import { useState, type ReactNode } from 'react'
import { BookOpen, Headphones, Brain, GraduationCap, ChevronRight, Volume2, Sparkles } from 'lucide-react'

type Level = 'comfortable' | 'some' | 'beginner' | ''
const stages = [
  ['00','Arabic script','Optional literacy bridge','Letters, joining, short vowels, and reading fully vowelled words.','Only if needed'],
  ['01','Functional Arabic','Your starting course','Greetings, introductions, classroom language, and useful everyday phrases.','Start here'],
  ['02','Connected Arabic','Build real fluency','Short stories, descriptions, routines, plans, and conversations.','Planned'],
  ['03','Learn in Arabic','Prepare for Arabic explanations','Understand lesson instructions, ask questions, and explain familiar ideas simply.','Readiness stage'],
  ['04','Grammar in Arabic','النَّحْوُ وَالصَّرْفُ','Study formal grammar through accessible Arabic explanations and examples.','Later'],
  ['05','Hawza mastery','Traditional texts and analysis','Work with traditional terminology, paradigms, and authentic classical material.','Advanced'],
] as const

const phrases = [
  ['السَّلَامُ عَلَيْكُمْ','as-salāmu ʿalaykum','Peace be upon you.','A respectful greeting.'],
  ['وَعَلَيْكُمُ السَّلَامُ','wa-ʿalaykumu s-salām','And peace be upon you.','The common reply.'],
  ['مَا اسْمُكَ؟','mā ismuka?','What is your name? (to a male)','To a female: مَا اسْمُكِ؟'],
  ['اِسْمِي مُحَمَّدٌ','ismī Muḥammadun','My name is Muhammad.','Replace the name with your own.'],
  ['كَيْفَ حَالُكَ؟','kayfa ḥāluka?','How are you? (to a male)','To a female: كَيْفَ حَالُكِ؟'],
  ['أَنَا بِخَيْرٍ، شُكْرًا','anā bikhayrin, shukran','I am well, thank you.','A simple response.'],
  ['مِنْ أَيْنَ أَنْتَ؟','min ayna anta?','Where are you from? (to a male)','To a female: مِنْ أَيْنَ أَنْتِ؟'],
  ['أَنَا مِنَ الْهِنْدِ','anā mina l-hindi','I am from India.','Change the country to your own.'],
]
const commands = [
  ['اِسْمَعْ','Listen.','ismaʿ'],
  ['اِقْرَأْ','Read.','iqraʾ'],
  ['أَعِدْ','Repeat.','aʿid'],
  ['اُكْتُبْ','Write.','uktub'],
  ['أَجِبْ','Answer.','ajib'],
  ['اِخْتَرْ','Choose.','ikhtar'],
]
function sayArabic(text:string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ar-SA'
  utterance.rate = 0.78
  window.speechSynthesis.speak(utterance)
}

function Home() {
  const done = localStorage.getItem('arabic-diagnostic-done') === 'yes'
  const weekDone = localStorage.getItem('arabic-week-01-done') === 'yes'
  return <div className="app-shell language-home">
    <header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar" dir="rtl">عَرَبِيَّة</span><span className="brand-copy"><strong>ARABIC LEARNING</strong><small>Language first · Grammar next</small></span></a><div className="topbar-right"><span className="streak"><Sparkles size={15}/> A little Arabic every day</span><span className="profile-mark"><GraduationCap size={16}/></span></div></header>
    <main className="language-page language-home-page">
      <section className="language-hero"><div className="eyebrow">YOUR JOURNEY INTO ARABIC</div><h1>Learn to use Arabic.<br/><em>Then learn how it works.</em></h1><p>First understand and use the language in real situations. When Arabic explanations become comfortable, we will study grammar in Arabic itself—and later connect it to traditional Hawza texts.</p><div className="language-hero-actions"><a className="primary-button" href={done?'#/week/01':'#/diagnostic'}>{done?'Continue Week 1':'Find my starting point'} <ChevronRight size={16}/></a><span>20–30 minutes a day · progress at your pace</span></div></section>
      <section className="language-principle-grid"><article><Headphones/><strong>Hear and understand</strong><p>Start with meaningful phrases and short conversations.</p></article><article><BookOpen/><strong>Read and notice</strong><p>Meet Arabic in context before memorising grammar labels.</p></article><article><Brain/><strong>Speak and write</strong><p>Use what you learn, retrieve it, and make it your own.</p></article></section>
      <section className="language-path-section"><div className="language-section-heading"><span className="section-kicker">THE LEARNING PATH</span><h2>From your first words to Arabic-medium study</h2><p>Move forward when you can use the language—not just when a calendar says so.</p></div><div className="language-stage-list">{stages.map((s,i)=><article className={'language-stage '+(i===1?'current':i>2?'future':'')} key={s[0]}><div className="language-stage-number">{s[0]}</div><div className="language-stage-copy"><small>{s[2]}</small><h3>{s[1]}</h3><p>{s[3]}</p></div><div className="language-stage-status">{i===0?<a href="#/literacy">Check <ChevronRight size={14}/></a>:i===1?<a href="#/week/01">{weekDone?'Review Week 1':'Open Week 1'} <ChevronRight size={14}/></a>:<span>{s[4]}</span>}</div></article>)}</div></section>
      <section className="language-start-card"><div><span className="section-kicker">YOUR FIRST WEEK</span><h2>Greetings and classroom Arabic</h2><p>Learn to greet someone, introduce yourself, ask a simple question, and understand common classroom instructions.</p><div className="language-start-meta"><span>4 skill areas</span><span>14 useful phrases</span><span>Short daily practice</span></div></div><a className="primary-button" href="#/week/01">Start Week 1 <ChevronRight size={16}/></a></section>
      <section className="language-grammar-note"><div className="language-grammar-lock"><GraduationCap/></div><div><strong>Where did the Sarf lessons go?</strong><p>They are being kept for the later grammar stage. We will return to roots, patterns, the fourteen forms, and traditional morphology after you have built enough Arabic to study those subjects in Arabic.</p><a href="#/grammar-preview">See what comes later <ChevronRight size={14}/></a></div></section>
      <footer className="footer"><span>ARABIC LEARNING <b lang="ar">عَرَبِيَّة</b></span><span>Understand · Use · Reflect · Master</span></footer>
    </main>
  </div>
}

function Diagnostic() {
  const [a,setA] = useState<Level[]>(['','','','',''])
  const [result,setResult] = useState(false)
  const labels = [
    ['Arabic script','Can you read a simple, fully vowelled Arabic word aloud?'],
    ['Listening','Can you understand a short, slow Arabic greeting without seeing its translation?'],
    ['Speaking','Can you introduce yourself in one or two simple Arabic sentences?'],
    ['Reading','Can you understand a short, fully vowelled Arabic sentence?'],
    ['Writing','Can you write a simple Arabic sentence about yourself?'],
  ]
  const complete = a.every(Boolean)
  const literacy = a[0] === 'beginner'
  const mostlyNew = a.slice(1).filter(x=>x==='beginner').length >= 3
  return <Shell title="Starting-point check"><main className="language-page"><div className="eyebrow">A SHORT, FRIENDLY SELF-CHECK</div><h1>Where should we begin?</h1><p className="language-page-lead">This is not an exam. It helps us choose a comfortable starting point. Be honest; you can change your path later.</p><div className="diagnostic-fields">{labels.map((f,i)=><section className="diagnostic-field" key={f[0]}><div className="diagnostic-field-title"><span>{String(i+1).padStart(2,'0')}</span><div><strong>{f[0]}</strong><p>{f[1]}</p></div></div><div className="diagnostic-options">{[['comfortable','Yes, comfortably'],['some','A little / with support'],['beginner','Not yet']].map(([v,t])=><button type="button" key={v} className={a[i]===v?'selected':''} aria-pressed={a[i]===v} onClick={()=>{setA(old=>old.map((x,j)=>j===i?v as Level:x));setResult(false)}}>{t}</button>)}</div></section>)}</div>{!result?<button className="primary-button diagnostic-submit" disabled={!complete} onClick={()=>{localStorage.setItem('arabic-diagnostic-done','yes');localStorage.setItem('arabic-literacy-needed',literacy?'yes':'no');setResult(true)}}>See my suggested starting point <ChevronRight size={16}/></button>:<section className="diagnostic-result"><span className="section-kicker">YOUR SUGGESTED START</span><h2>{literacy?'Begin with the Arabic script bridge.':mostlyNew?'Start with functional beginner Arabic.':'Start with Week 1 and use the supports you need.'}</h2><p>{literacy?'Strengthen letter recognition, joining, and short vowels. You can explore spoken phrases alongside it.':'The first lessons build listening, speaking, reading, and writing together. Use the supports you need and repeat activities at your own pace.'}</p><div className="diagnostic-result-actions">{literacy&&<a className="quiet-button" href="#/literacy">Open literacy bridge</a>}<a className="primary-button" href="#/week/01">Continue to Week 1 <ChevronRight size={16}/></a></div></section>}<p className="diagnostic-footnote">Your answers stay in this browser on this device. This is guidance, not a certified proficiency assessment.</p></main></Shell>
}

function Shell({children,title}:{children:ReactNode;title:string}) {
 return <div className="app-shell"><header className="topbar"><a className="brand" href="#/"><span className="brand-mark" lang="ar">عَرَبِيَّة</span><span className="brand-copy"><strong>ARABIC LEARNING</strong><small>{title}</small></span></a><a className="back-link" href="#/">← Learning path</a></header>{children}</div>
}

function WeekOne() {
 const [revealed,setRevealed] = useState<number[]>([])
 const [answer,setAnswer] = useState('')
 const [checked,setChecked] = useState(false)
 const [writing,setWriting] = useState('')
 const [completed,setCompleted] = useState<string[]>(JSON.parse(localStorage.getItem('arabic-week-01-sections')||'[]'))
 const [support,setSupport] = useState(false)
 const toggle = (key:string) => setCompleted(old=>{const next=old.includes(key)?old.filter(x=>x!==key):[...old,key];localStorage.setItem('arabic-week-01-sections',JSON.stringify(next));if(next.length===4)localStorage.setItem('arabic-week-01-done','yes');else localStorage.removeItem('arabic-week-01-done');return next})
 const progress = completed.length/4*100
 return <Shell title="Week 1 · Greetings and classroom"><main className="language-page week-one-page"><div className="eyebrow">WEEK 01 · GREETINGS AND CLASSROOM</div><h1>Let’s begin speaking Arabic.</h1><p className="language-page-lead">By the end of this week, you can greet someone, introduce yourself, ask a simple question, and understand common classroom instructions.</p><div className="week-progress-card"><div><strong>Your Week 1 practice</strong><span>{completed.length} of 4 learning areas explored</span></div><div className="diagnostic-progress"><span style={{width:progress+'%'}}/></div></div>
 <section className="language-lesson-section"><div className="language-section-heading"><span className="section-kicker">01 · USEFUL PHRASES</span><h2>Meet someone</h2><p>Tap a phrase to reveal its meaning. Use the speaker button for your browser’s computer-generated Arabic voice, if available.</p></div><div className="phrase-grid">{phrases.map((p,i)=><article className={'phrase-card '+(revealed.includes(i)?'revealed':'')} key={p[0]}><button type="button" className="phrase-reveal" onClick={()=>setRevealed(old=>old.includes(i)?old.filter(x=>x!==i):[...old,i])}><span>PHRASE {String(i+1).padStart(2,'0')} · {revealed.includes(i)?'HIDE':'REVEAL'}</span><b lang="ar" dir="rtl">{p[0]}</b><small>{p[1]}</small>{revealed.includes(i)&&<span className="phrase-meaning"><strong>{p[2]}</strong><i>{p[3]}</i></span>}</button><button className="phrase-speak" onClick={()=>sayArabic(p[0])}><Volume2 size={14}/> Hear computer voice</button></article>)}</div><button className="quiet-button section-complete-button" onClick={()=>toggle('phrases')}>{completed.includes('phrases')?'✓ Phrases explored':'Mark phrases explored'}</button></section>
 <section className="language-lesson-section"><div className="language-section-heading"><span className="section-kicker">02 · LISTEN AND UNDERSTAND</span><h2>A short conversation</h2><p>Listen to each line, then follow the meaning. If no Arabic voice is installed, read aloud or ask a partner to read it.</p></div><div className="dialogue-card">{[['A','السَّلَامُ عَلَيْكُمْ','Peace be upon you.'],['B','وَعَلَيْكُمُ السَّلَامُ','And peace be upon you.'],['A','مَا اسْمُكَ؟','What is your name?'],['B','اِسْمِي عَلِيٌّ','My name is Ali.']].map((x,i)=><div className="dialogue-line" key={i}><span>{x[0]}</span><div><b lang="ar" dir="rtl">{x[1]}</b><small>{x[2]}</small></div><button aria-label="Hear Arabic line" onClick={()=>sayArabic(x[1])}><Volume2 size={17}/></button></div>)}</div><div className="comprehension-check"><strong>Check what you understood</strong><p>What did B say after being asked مَا اسْمُكَ؟</p><div className="diagnostic-options">{[['name','He gave his name.'],['greeting','He returned the greeting.'],['origin','He said where he was from.']].map(x=><button key={x[0]} className={answer===x[0]?'selected':''} onClick={()=>{setAnswer(x[0]);setChecked(false)}}>{x[1]}</button>)}</div><button className="primary-button" disabled={!answer} onClick={()=>setChecked(true)}>Check answer</button>{checked&&<p className={answer==='name'?'correct-feedback':'retry-feedback'}>{answer==='name'?'Correct. اِسْمِي عَلِيٌّ means “My name is Ali.”':'Not quite. The final line gives the speaker’s name.'}</p>}</div><button className="quiet-button section-complete-button" onClick={()=>toggle('listening')}>{completed.includes('listening')?'✓ Listening explored':'Mark listening explored'}</button></section>
 <section className="language-lesson-section"><div className="language-section-heading"><span className="section-kicker">03 · READ AND NOTICE</span><h2>Read the classroom words</h2><p>These are instructions you will meet often. Notice the sound and meaning; no grammar table is needed.</p></div><div className="classroom-word-list">{commands.map(x=><div key={x[0]}><b lang="ar" dir="rtl">{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small><button aria-label="Hear classroom instruction" onClick={()=>sayArabic(x[0])}><Volume2 size={15}/></button></div>)}</div><div className="reading-passage"><span className="section-kicker">A MINI READING</span><p lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ. اِسْمِي عَلِيٌّ. أَنَا طَالِبٌ. أَقْرَأُ الْعَرَبِيَّةَ.</p><small>Peace be upon you. My name is Ali. I am a student. I read Arabic.</small><button className="quiet-button" onClick={()=>setSupport(!support)}>{support?'Hide reading support':'Show reading support'}</button>{support&&<p className="reading-support">Read in short groups: السَّلَامُ عَلَيْكُمْ / اِسْمِي عَلِيٌّ / أَنَا طَالِبٌ / أَقْرَأُ الْعَرَبِيَّةَ. Cover the translation and say what you understood.</p>}</div><button className="quiet-button section-complete-button" onClick={()=>toggle('reading')}>{completed.includes('reading')?'✓ Reading explored':'Mark reading explored'}</button></section>
 <section className="language-lesson-section"><div className="language-section-heading"><span className="section-kicker">04 · SPEAK AND WRITE</span><h2>Make the language yours</h2><p>Say the lines aloud, then write a short introduction. You may use your own name and country.</p></div><div className="speaking-prompt"><strong>Speaking challenge</strong><p>Greet someone and introduce yourself using these frames:</p><div lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ. اِسْمِي _____. أَنَا مِنْ _____.</div><button className="quiet-button" onClick={()=>sayArabic('السَّلَامُ عَلَيْكُمْ. اِسْمِي عَلِيٌّ. أَنَا مِنَ الْهِنْدِ.')}>Hear an example <Volume2 size={14}/></button></div><label className="writing-task"><strong>Writing challenge</strong><span>Write two or three simple Arabic sentences about yourself.</span><textarea dir="rtl" lang="ar" value={writing} onChange={e=>setWriting(e.target.value)} placeholder="السَّلَامُ عَلَيْكُمْ. اِسْمِي ..."/></label><p className="writing-feedback">{writing.trim().length>=8?'Good start. Read your sentences aloud and check that each one communicates what you intend.':'Try writing at least one greeting and one sentence about yourself.'}</p><button className="quiet-button section-complete-button" onClick={()=>toggle('production')}>{completed.includes('production')?'✓ Speaking and writing explored':'Mark speaking and writing explored'}</button></section>
 <section className="week-finish-card"><span className="section-kicker">WEEK 1 CHECKPOINT</span><h2>{completed.length===4?'You have explored all four learning areas.':'Keep going, one small step at a time.'}</h2><p>{completed.length===4?'Repeat the activities over several days to make the phrases easier to recall.':'Explore each learning area and return to the phrases for spaced practice.'}</p><a className="primary-button" href="#/">Return to your learning path <ChevronRight size={16}/></a></section><p className="audio-disclaimer">Pronunciation note: audio buttons use the voice installed by your browser/device. It is computer-generated, may not be available, and is not a verified human recording. Early Arabic content is fully vowelled.</p></main></Shell>
}

function Literacy() {
 const items=[['بَ','ba','Fatḥah: a short “a” sound.'],['بِ','bi','Kasrah: a short “i” sound.'],['بُ','bu','Ḍammah: a short “u” sound.'],['بْ','b','Sukūn: no vowel after the consonant.'],['بَّ','bba','Shaddah: a doubled consonant.'],['بَا','bā','Alif can mark a long “ā” vowel.']]
 return <Shell title="Optional literacy bridge"><main className="language-page"><div className="eyebrow">OPTIONAL STAGE 00</div><h1>Get comfortable with Arabic script.</h1><p className="language-page-lead">Use this path if reading fully vowelled Arabic words is still difficult. If you already read confidently, skip it and begin Week 1.</p><div className="literacy-topic-grid">{items.map(x=><article key={x[0]}><b lang="ar" dir="rtl">{x[0]}</b><strong>{x[1]}</strong><p>{x[2]}</p></article>)}</div><div className="reading-passage"><span className="section-kicker">TRY READING</span><p lang="ar" dir="rtl">بَابٌ · بَيْتٌ · كِتَابٌ · قَلَمٌ</p><small>bābun · baytun · kitābun · qalamun</small><p>door · house · book · pen</p></div><a className="primary-button" href="#/week/01">Continue to Week 1 <ChevronRight size={16}/></a></main></Shell>
}

function GrammarPreview() {
 return <Shell title="The later grammar stage"><main className="language-page"><div className="eyebrow">STAGE 04 · AFTER ARABIC READINESS</div><h1>Grammar, taught in Arabic.</h1><p className="language-page-lead">The formal Sarf lessons are retained for this stage. They are not the beginner entry course.</p><div className="language-grammar-note"><GraduationCap/><div><strong>What will you study here?</strong><p>Word categories, roots and patterns, past and present forms, pronouns, the fourteen ṣīghahs, common Abwāb, derived nouns, sound and weak verbs, iʿlāl, and idghām—first through simple Arabic explanations, with optional English, Persian, or Urdu support.</p></div></div><a className="quiet-button" href="#/">Return to language learning</a></main></Shell>
}

export default function LanguageFirstApp({route}:{route:string}) {
 if(route==='#/diagnostic') return <Diagnostic/>
 if(route==='#/week/01') return <WeekOne/>
 if(route==='#/literacy') return <Literacy/>
 if(route==='#/grammar-preview') return <GrammarPreview/>
 return <Home/>
}
