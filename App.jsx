import React, { useState } from 'react'

const places = [
  {id:'p1', name:'Blue Elephant', trust:4.8, city:'Bangkok'},
  {id:'p2', name:'Coffee Dream', trust:4.6, city:'Bangkok'},
  {id:'p3', name:'Sky Rooftop', trust:4.5, city:'Bangkok'}
]

function Top({title, onBack, right}){
  return (<div className="sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3">
    <div className="flex items-center gap-2">
      {onBack && <button onClick={onBack} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">← 뒤로</button>}
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
    </div>
    <div>{right}</div>
  </div>)
}

function Login({onNext}){
  const [email, setEmail] = useState('')
  const [crew, setCrew] = useState(true)
  return (<div className="max-w-md mx-auto">
    <Top title="승무원 인증 로그인" />
    <div className="p-4 space-y-4">
      <label className="block text-sm text-slate-700">
        <span className="block mb-1 font-medium">이메일</span>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.name@airline.com" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
      </label>
      <div className="flex items-center gap-2">
        <input id="crew" type="checkbox" checked={crew} onChange={e=>setCrew(e.target.checked)} />
        <label htmlFor="crew" className="text-sm text-slate-700">항공사 승무원입니다</label>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>onNext({email, mode: crew?'crew':'guest'})} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">계속하기</button>
        <button onClick={()=>onNext({email, mode:'guest'})} className="rounded-xl border border-slate-300 px-4 py-2">일반 사용자로 진행</button>
      </div>
    </div>
  </div>)
}

function Detect({onNext, onBack}){
  const [city, setCity] = useState('Bangkok')
  const [hours, setHours] = useState(8)
  return (<div className="max-w-lg mx-auto">
    <Top title="도시 자동 인식" onBack={onBack} />
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm text-slate-700">
          <span className="block mb-1 font-medium">도시</span>
          <select value={city} onChange={e=>setCity(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2">
            <option>Bangkok</option><option>Seoul</option><option>Tokyo</option><option>Singapore</option>
          </select>
        </label>
        <label className="block text-sm text-slate-700">
          <span className="block mb-1 font-medium">체류 시간 (H)</span>
          <input type="number" min="1" max="24" value={hours} onChange={e=>setHours(parseInt(e.target.value||'0',10))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <button onClick={()=>onNext({city, hours})} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">맞춤 추천 보기</button>
    </div>
  </div>)
}

function Home({profile, info, openPlace, openPlanner}){
  const list = places.filter(p=>p.city===info.city)
  return (<div className="max-w-4xl mx-auto">
    <Top title={`오늘의 도시 · ${info.city}`} right={<button onClick={openPlanner} className="rounded-xl border border-sky-200 bg-sky-50 text-sky-700 px-3 py-1.5 hover:bg-sky-100">AI 코스 추천</button>} />
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {list.map(p=> <button key={p.id} onClick={()=>openPlace(p)} className="text-left w-full rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition bg-white p-4">
        <div className="text-base font-semibold text-slate-900">{p.name}</div>
        <div className="text-sm text-slate-600">신뢰도 {p.trust}</div>
      </button>)}
    </div>
  </div>)
}

function Detail({place, onBack, write}){
  return (<div className="max-w-2xl mx-auto">
    <Top title={place.name} onBack={onBack} />
    <div className="p-4 space-y-3">
      <div className="text-sm text-slate-600">신뢰도 {place.trust}</div>
      <button onClick={write} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">후기 작성</button>
    </div>
  </div>)
}

function Review({place, onBack, done}){
  const [stars,setStars]=useState(5); const [text,setText]=useState('')
  return (<div className="max-w-md mx-auto">
    <Top title={`후기 작성 · ${place.name}`} onBack={onBack} />
    <div className="p-4 space-y-4">
      <div className="flex gap-1">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setStars(n)} className={`text-2xl ${n<=stars?'text-amber-500':'text-slate-300'}`}>★</button>)}</div>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows="5" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
      <button onClick={()=>{done({stars,text})}} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">등록</button>
    </div>
  </div>)
}

function Planner({info, onBack}){
  const [route,setRoute]=useState([])
  return (<div className="max-w-xl mx-auto">
    <Top title={`AI 코스 추천 · ${info.city}`} onBack={onBack} />
    <div className="p-4 space-y-3">
      <button onClick={()=>setRoute([{label:'카페',name:'Coffee Dream'},{label:'점심',name:'Blue Elephant'},{label:'루프탑',name:'Sky Rooftop'}])} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">자동 코스 생성</button>
      {route.length>0 && <ol className="rounded-2xl border border-slate-200 overflow-hidden divide-y">
        {route.map((n,i)=><li key={i} className="p-4 flex items-center gap-3"><div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">{i+1}</div><div className="flex-1 font-medium text-slate-800">{n.label} · {n.name}</div></li>)}
      </ol>}
    </div>
  </div>)
}

export default function App(){
  const [screen,setScreen]=useState('login')
  const [profile,setProfile]=useState({email:'',mode:'crew'})
  const [info,setInfo]=useState({city:'Bangkok',hours:8})
  const [place,setPlace]=useState(null)
  return (<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
    {screen==='login' && <Login onNext={p=>{setProfile(p); setScreen('detect')}} />}
    {screen==='detect' && <Detect onBack={()=>setScreen('login')} onNext={i=>{setInfo(i); setScreen('home')}} />}
    {screen==='home' && <Home profile={profile} info={info} openPlace={p=>{setPlace(p); setScreen('detail')}} openPlanner={()=>setScreen('planner')} />}
    {screen==='detail' && place && <Detail place={place} onBack={()=>setScreen('home')} write={()=>setScreen('review')} />}
    {screen==='review' && place && <Review place={place} onBack={()=>setScreen('detail')} done={()=>{alert('후기 등록! 포인트 +50'); setScreen('home')}} />}
    {screen==='planner' && <Planner info={info} onBack={()=>setScreen('home')} />}
    <footer className="max-w-5xl mx-auto px-4 py-6 text-xs text-slate-500">Layover Local · Prototype · © 2025</footer>
  </div>)
}
