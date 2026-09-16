import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminApp.css';

const MONEY = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });
const money = minor => MONEY.format((minor || 0) / 100);
const STAGE_LABELS = { idea: 'Idea', designed: 'Designed', running: 'Running', measured: 'Measured', decided: 'Decided' };
const GATE_LABELS = { r100k: 'R100k/mo', r1m: 'R1M/mo', r10m: 'R10M/mo', r100m: 'R100M/mo' };

async function api(path, data, csrf) {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 20000);
  try {
    const r = await fetch(`/api/v1${path}`, { method: data === undefined ? 'GET' : 'POST', credentials: 'same-origin', signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(csrf ? { 'X-CSRF-Token': csrf } : {}), 'Idempotency-Key': crypto.randomUUID() }, ...(data === undefined ? {} : { body: JSON.stringify(data) }) });
    const payload = await r.json();
    if (!r.ok) { const e = new Error(payload.error || 'The request failed.'); e.status = r.status; throw e; }
    return payload;
  } catch (e) { if (e.name === 'AbortError') throw new Error('The request timed out. Refresh and try again.'); throw e; }
  finally { clearTimeout(timer); }
}
const randToMinor = value => { if (!/^\d+(?:\.\d{1,2})?$/.test(String(value || '0'))) throw new Error('Enter a rand amount.'); const [r, c = ''] = String(value).split('.'); return Number(r) * 100 + Number(c.padEnd(2, '0')); };

function GateHeader({ gates, onSave, busy }) {
  const [mrr, setMrr] = useState(String((gates.current_mrr_minor || 0) / 100));
  const [note, setNote] = useState(gates.note || '');
  const next = gates.targets.find(t => t.target_minor > (gates.current_mrr_minor || 0)) || gates.targets[gates.targets.length - 1];
  return <section className="ad-gates">
    <div className="ad-gate-row">{gates.targets.map(t => {
      const reached = (gates.current_mrr_minor || 0) >= t.target_minor;
      return <div key={t.key} className={`ad-gate ${reached ? 'is-reached' : ''} ${t.key === next.key && !reached ? 'is-next' : ''}`}><strong>{GATE_LABELS[t.key]}</strong><span>{money(t.target_minor)}</span></div>;
    })}</div>
    <form className="ad-mrr" onSubmit={e => { e.preventDefault(); onSave(randToMinor(mrr), note.trim()); }}>
      <label>Current MRR (R)<input value={mrr} onChange={e => setMrr(e.target.value)} inputMode="decimal" /></label>
      <label>Note<input value={note} onChange={e => setNote(e.target.value)} maxLength={500} placeholder="e.g. one managed site" /></label>
      <button className="ad-primary" disabled={busy}>Save MRR</button>
      <p className="ad-next">Next gate: <strong>{GATE_LABELS[next.key]}</strong> · {money(Math.max(0, next.target_minor - (gates.current_mrr_minor || 0)))} to go</p>
    </form>
  </section>;
}
function Card({ exp, onPatch, onDelete, busy }) {
  const [result, setResult] = useState(exp.result || '');
  return <article className="ad-card">
    <h4>{exp.title}</h4>
    <p className="ad-hyp">{exp.hypothesis}</p>
    <p className="ad-test"><span>Cheapest test</span>{exp.cheapest_test}</p>
    <p className="ad-meta">{money(exp.cost_minor)} · target {GATE_LABELS[exp.gate]}</p>
    <div className="ad-controls">
      <label>Stage<select value={exp.stage} disabled={busy} onChange={e => onPatch({ stage: e.target.value })}>{Object.entries(STAGE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
      <label>Decision<select value={exp.decision || ''} disabled={busy} onChange={e => onPatch({ decision: e.target.value })}><option value="">Undecided</option><option value="pursue">Pursue</option><option value="kill">Kill</option><option value="iterate">Iterate</option></select></label>
    </div>
    <form className="ad-result" onSubmit={e => { e.preventDefault(); onPatch({ result }); }}><input value={result} onChange={e => setResult(e.target.value)} maxLength={2000} placeholder="What did the test show?" /><button disabled={busy}>Save result</button></form>
    <button className="ad-delete" disabled={busy} onClick={() => onDelete()}>Delete</button>
  </article>;
}
export default function AdminApp() {
  const [session, setSession] = useState(null), [board, setBoard] = useState(null), [status, setStatus] = useState(''), [busy, setBusy] = useState(false), [ready, setReady] = useState(false);
  const [email, setEmail] = useState('info@Khuselaworkflow.com'), [password, setPassword] = useState(''), [otp, setOtp] = useState('');
  const [form, setForm] = useState({ title: '', hypothesis: '', cheapest_test: '', cost: '', gate: 'r100k' });
  async function loadBoard() { setBoard(await api('/admin/rnd')); }
  useEffect(() => { (async () => { try { const s = await api('/admin/session'); setSession(s); await loadBoard(); } catch (e) { if (e.status !== 401 && e.status !== 403) setStatus(e.message); } finally { setReady(true); } })(); }, []);
  async function act(fn) { setBusy(true); setStatus(''); try { await fn(); await loadBoard(); } catch (e) { if (e.status === 401) { setSession(null); setBoard(null); setStatus('Session ended. Sign in again.'); } else setStatus(e.message); } finally { setBusy(false); } }
  async function doLogin(e) { e.preventDefault(); setBusy(true); setStatus(''); try { const s = await api('/admin/login', { email: email.trim(), password, otp: otp.trim() }); setSession({ csrf: s.csrf, operator: s.operator, admin: true }); setPassword(''); setOtp(''); await loadBoard(); } catch (err) { setStatus(err.message); } finally { setBusy(false); } }
  const csrf = session?.csrf;
  const addExperiment = () => act(async () => { await api('/admin/rnd/experiments', { title: form.title.trim(), hypothesis: form.hypothesis.trim(), cheapest_test: form.cheapest_test.trim(), cost_minor: form.cost ? randToMinor(form.cost) : 0, gate: form.gate }, csrf); setForm({ title: '', hypothesis: '', cheapest_test: '', cost: '', gate: 'r100k' }); setStatus('Experiment added.'); });

  if (!ready) return <main className="ad-app ad-gate"><p role="status">Loading…</p></main>;
  if (!session) return <main className="ad-app ad-signin"><Link to="/" className="ad-brand">EDGEBOX<span>Admin</span></Link><section className="ad-panel"><h1>Operator sign-in</h1><p>Email, password and your authenticator code.</p><form onSubmit={doLogin}><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></label><label>Authenticator code<input value={otp} onChange={e => setOtp(e.target.value)} inputMode="numeric" pattern="\d{6}" maxLength={6} required placeholder="123456" autoComplete="one-time-code" /></label><button className="ad-primary" disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button></form><p className="ad-status" role="status" aria-live="polite">{status}</p><Link to="/">Back to site</Link></section></main>;

  return <div className="ad-app"><header className="ad-header"><Link to="/" className="ad-brand">EDGEBOX<span>Admin</span></Link><nav className="ad-nav"><span aria-current="page">R&amp;D pipeline</span><Link to="/commercial">Commercial ↗</Link></nav><div className="ad-who"><span>{session.operator?.email}</span><button disabled={busy} onClick={() => act(async () => { await api('/admin/logout', {}, csrf); setSession(null); setBoard(null); })}>Sign out</button></div></header>
    <main className="ad-main">
      <div className="ad-title"><div><p className="ad-kicker">R&amp;D PIPELINE</p><h1>Experiments toward R100M / month</h1></div><button disabled={busy} onClick={() => act(async () => {})}>Refresh</button></div>
      <p className="ad-status" role="status" aria-live="polite">{status}</p>
      {board && <>
        <GateHeader gates={board.gates} busy={busy} onSave={(minor, note) => act(() => api('/admin/rnd/gates', { current_mrr_minor: minor, note }, csrf))} />
        <section className="ad-panel ad-add"><h2>New experiment</h2><form onSubmit={e => { e.preventDefault(); addExperiment(); }}>
          <label>Title<input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={200} required placeholder="Depot dwell-time pilot" /></label>
          <label>Hypothesis<input value={form.hypothesis} onChange={e => setForm({ ...form, hypothesis: e.target.value })} maxLength={1000} required placeholder="A depot will pay R25k to cut queue dwell exceptions" /></label>
          <label>Cheapest test<input value={form.cheapest_test} onChange={e => setForm({ ...form, cheapest_test: e.target.value })} maxLength={1000} required placeholder="One paid 30-day pilot at one depot" /></label>
          <label>Cost (R)<input value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} inputMode="decimal" placeholder="25000" /></label>
          <label>Target gate<select value={form.gate} onChange={e => setForm({ ...form, gate: e.target.value })}>{Object.entries(GATE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <button className="ad-primary" disabled={busy}>Add experiment</button>
        </form></section>
        <div className="ad-board">{board.stages.map(stage => {
          const cards = board.experiments.filter(e => e.stage === stage);
          return <section className="ad-col" key={stage}><h3>{STAGE_LABELS[stage]} <span>{cards.length}</span></h3>{cards.length ? cards.map(exp => <Card key={exp.id} exp={exp} busy={busy} onPatch={patch => act(() => api(`/admin/rnd/experiments/${exp.id}`, patch, csrf))} onDelete={() => act(() => api(`/admin/rnd/experiments/${exp.id}/delete`, {}, csrf))} />) : <p className="ad-empty">Nothing here yet.</p>}</section>;
        })}</div>
      </>}
    </main>
  </div>;
}
