import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ControlPanel from './components/ControlPanel'

function useTimerData() {
  const [data, setData] = React.useState<{player1:{name:string,score:number}, player2:{name:string,score:number}}>({player1:{name:'Player 1',score:0}, player2:{name:'Player 2',score:0}});
  React.useEffect(() => {
    (async () => setData(await window.api.timer.get()))();
    const off = window.api.timer.onSync((d:any) => setData(d));
    return () => { /* ipcRenderer removes automatically on reload */ };
  }, []);
  const commit = (next:any) => { setData(next); window.api.timer.set(next); };
  return [data, commit] as const;
}

function NumberField(props:{value:number,onChange:(v:number)=>void}) {
  return (
    <div className="flex items-center gap-2">
      <button className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700" onClick={()=>props.onChange(props.value-1)}>-</button>
      <div className="min-w-10 text-center">{props.value}</div>
      <button className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700" onClick={()=>props.onChange(props.value+1)}>+</button>
    </div>
  )
}

function App() {
  const [data, setData] = useTimerData();
  const [overlayOn, setOverlayOn] = React.useState(false);
  const [locked, setLocked] = React.useState(false);
  const [scale, setScale] = React.useState(100);

  React.useEffect(() => {
    window.api.overlay.onReady((v:boolean) => setOverlayOn(v));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto font-ui">
      <h1 className="text-2xl font-semibold mb-4">DBD 1v1 Timer — Control Panel</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm text-zinc-400">Player 1 name</label>
          <input className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
            value={data.player1.name}
            onChange={e=>setData({...data, player1:{...data.player1, name:e.target.value}})} />
          <label className="block text-sm text-zinc-400">Score</label>
          <NumberField value={data.player1.score} onChange={(v)=>setData({...data, player1:{...data.player1, score:Math.max(0,v)}})} />
        </div>

        <div className="space-y-3">
          <label className="block text-sm text-zinc-400">Player 2 name</label>
          <input className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-800 outline-none"
            value={data.player2.name}
            onChange={e=>setData({...data, player2:{...data.player2, name:e.target.value}})} />
          <label className="block text-sm text-zinc-400">Score</label>
          <NumberField value={data.player2.score} onChange={(v)=>setData({...data, player2:{...data.player2, score:Math.max(0,v)}})} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        {overlayOn ? (
          <button className="px-3 py-2 rounded bg-red-700 hover:bg-red-600" onClick={()=>window.api.overlay.hide()}>Hide Overlay</button>
        ) : (
          <button className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-600" onClick={()=>window.api.overlay.show()}>Show Overlay</button>
        )}
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={locked} onChange={(e)=>{setLocked(e.target.checked); window.api.overlay.updateSettings({locked:e.target.checked})}} />
          <span>Lock (click-through)</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <span>Scale</span>
          <input type="range" min={50} max={200} value={scale} onChange={e=>{const v=Number(e.target.value); setScale(v); window.api.overlay.updateSettings({scale:v})}} />
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" defaultChecked onChange={(e)=>window.api.overlay.updateSettings({alwaysOnTop:e.target.checked})}/>
          <span>Always on top</span>
        </label>
      </div>

      <div className="mt-6 text-sm text-zinc-400">
        Hotkeys: <b>F1</b> start/pause/reset — <b>F2</b> swap active timer.
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<ControlPanel />)
