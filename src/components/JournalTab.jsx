import { useEffect, useMemo, useState } from 'react'
import { storage, uid, formatRelative } from '../utils/storage.js'

export default function JournalTab() {
  const [plants] = useState(() => storage.getPlants())
  const [entries, setEntries] = useState(() => storage.getJournal())
  const [selected, setSelected] = useState(plants[0]?.id || '')
  const [text, setText] = useState('')

  useEffect(() => storage.setJournal(entries), [entries])

  const sorted = useMemo(
    () => [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [entries],
  )

  function addEntry() {
    if (!text.trim() || !selected) return
    const plant = plants.find((p) => p.id === selected)
    const entry = {
      id: uid(),
      plantId: selected,
      plantName: plant?.name || 'Unknown',
      plantEmoji: plant?.emoji || '🪴',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }
    setEntries((cur) => [entry, ...cur])
    setText('')
  }

  function deleteEntry(id) {
    setEntries((cur) => cur.filter((e) => e.id !== id))
  }

  return (
    <div className="screen">
      <div className="header">
        <h1>Plant Diary</h1>
        <div className="sub">a love letter to your leafy children 📓</div>
      </div>

      {plants.length === 0 ? (
        <div className="empty">
          <div className="ico">📓</div>
          <h3>No plants yet</h3>
          <p>Add a plant in the Garden tab first, then come back to write about her.</p>
        </div>
      ) : (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="field">
              <label>Pick a plant</label>
              <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                {plants.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.emoji || '🪴'} {p.name}
                    {p.nickname ? ` (${p.nickname})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>What's the gossip?</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="A new leaf unfurled today. I cried. I think she heard me singing yesterday."
              />
            </div>
            <button className="btn primary" onClick={addEntry} disabled={!text.trim()}>
              Add to Diary 💕
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="empty" style={{ padding: '20px 0' }}>
              <p>No entries yet — be her first historian.</p>
            </div>
          ) : (
            sorted.map((e) => (
              <div className="entry" key={e.id}>
                <div className="meta">
                  <span className="plant">{e.plantEmoji || '🪴'} {e.plantName}</span>
                  <span className="when">{formatRelative(e.createdAt)}</span>
                </div>
                <div className="body">{e.text}</div>
                <button
                  onClick={() => deleteEntry(e.id)}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    fontSize: 11, color: 'var(--ink-soft)', opacity: 0.6,
                  }}
                  aria-label="Delete entry"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}
