import { useState } from "react";
import { Bot, Mic, Sparkles, X } from "lucide-react";

export default function JarvisButton() {
  const [open, setOpen] = useState(false);
  return <>
    {open && <section className="jarvis-panel" aria-label="J.A.R.V.I.S. assistant">
      <div className="jarvis-panel-head"><div className="jarvis-orb-small"><Bot size={20}/></div><div><strong>J.A.R.V.I.S.</strong><span>ACHIEVER AI MENTOR</span></div><button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18}/></button></div>
      <div className="jarvis-panel-body"><div className="jarvis-message"><Sparkles size={16}/><p>Your government-exam assistant workspace is being connected. The voice-first assistant and student-data integrations are scheduled in the intelligence phase.</p></div><div className="jarvis-status"><span className="status-dot"/> Assistant interface ready · AI service not connected</div></div>
      <div className="jarvis-panel-foot"><Mic size={16}/> Voice interaction will be enabled after the assistant service is configured.</div>
    </section>}
    <button className="jarvis-fab" onClick={() => setOpen(!open)} aria-label={open ? "Close J.A.R.V.I.S." : "Open J.A.R.V.I.S."} title="J.A.R.V.I.S."><span className="jarvis-ring"/><Bot size={24}/></button>
  </>;
}
