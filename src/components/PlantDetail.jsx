import { useEffect, useState } from 'react'
import { storage, uid, formatDate, formatRelative, daysBetween } from '../utils/storage.js'
import HealthCheckModal from './HealthCheckModal.jsx'

export default function PlantDetail({ plant, onBack, onEdit, onDelete, onWater }) {
  const [tab, setTab] = useState('care')
  const [entries, setEntries] = useState(() =>
    storage.getJournal().filter((e) => e.plantId === plant.id),
  )
  const [newEntry, setNewEntry] = useState('')
  const [splash, setSplash] = useState(false)
  const [showHealthCheck, setShowHealthCheck] = useState(false)

  useEffect(() => {
    setEntries(storage.getJournal().filter((e) => e.plantId === plant.id))
  }, [plant.id])

  const sinceWater = plant.lastWatered ? daysBetween(plant.lastWatered, new Date()) : null
  const overdue = sinceWater !== null && sinceWater >= (plant.waterEvery || 7)

  function water() {
    onWater()
    setSplash(true)
    setTimeout(() => setSplash(false), 900)
  }

  function addEntry() {
    if (!newEntry.trim()) return
    const all = storage.getJournal()
    const entry = {
      id: uid(),
      plantId: plant.id,
      plantName: plant.name,
      text: newEntry.trim(),
      createdAt: new Date().toISOString(),
    }
    all.unshift(entry)
    storage.setJournal(all)
    setEntries(all.filter((e) => e.plantId === plant.id))
    setNewEntry('')
  }

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back to garden</button>

      <div className="detail-hero">
        {plant.photo ? <img src={plant.photo} alt={plant.name} /> : <span>{plant.emoji || '🪴'}</span>}
      </div>

      <h2 style={{ fontSize: 26, marginBottom: 2 }}>{plant.name}</h2>
      {plant.nickname && (
        <div style={{ fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 4 }}>
          aka "{plant.nickname}"
        </div>
      )}
      {plant.species && (
        <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>
          {plant.species}
        </div>
      )}

      <div className="tabs-mini">
        <button className={tab === 'care' ? 'active' : ''} onClick={() => setTab('care')}>
          Care
        </button>
        <button className={tab === 'journal' ? 'active' : ''} onClick={() => setTab('journal')}>
          Journal ({entries.length})
        </button>
      </div>

      {tab === 'care' && (
        <>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-500)' }}>
                  Last Watered
                </div>
                <div style={{ fontSize: 16, marginTop: 2 }}>
                  {plant.lastWatered ? formatRelative(plant.lastWatered) : 'never'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-500)' }}>
                  Schedule
                </div>
                <div style={{ fontSize: 16, marginTop: 2 }}>every {plant.waterEvery || 7}d</div>
              </div>
            </div>

            <div className={`water-pill ${overdue ? 'late' : 'ok'}`} style={{ display: 'inline-block' }}>
              {sinceWater === null
                ? 'thirsty?'
                : overdue
                  ? `${sinceWater - (plant.waterEvery || 7)} days overdue`
                  : `due in ${(plant.waterEvery || 7) - sinceWater} days`}
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>
            🌱 Added {formatDate(plant.addedAt)}
          </div>

          <button className="btn green" onClick={water}>💧 Mark as Watered</button>
          <button className="btn health" style={{ marginTop: 10 }} onClick={() => setShowHealthCheck(true)}>
            🩺 Health Check
          </button>
          <div className="btn-row">
            <button className="btn ghost" onClick={onEdit}>Edit</button>
            <button className="btn ghost" onClick={onDelete} style={{ color: 'var(--pink-600)' }}>
              Delete
            </button>
          </div>
        </>
      )}

      {tab === 'journal' && (
        <>
          <div className="field">
            <label>New entry</label>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="A new leaf! She's thriving. Or maybe just photosynthesizing aggressively."
            />
          </div>
          <button className="btn primary" onClick={addEntry} disabled={!newEntry.trim()}>
            Add Entry 📓
          </button>

          <div style={{ marginTop: 18 }}>
            {entries.length === 0 ? (
              <div className="empty" style={{ padding: '20px 0' }}>
                <div className="ico">📝</div>
                <p>No entries yet. Tell {plant.name} how she's doing.</p>
              </div>
            ) : (
              entries.map((e) => (
                <div className="entry" key={e.id}>
                  <div className="meta">
                    <span className="plant">{plant.name}</span>
                    <span className="when">{formatRelative(e.createdAt)}</span>
                  </div>
                  <div className="body">{e.text}</div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {splash && <div className="splash">💧</div>}

      {showHealthCheck && (
        <HealthCheckModal
          plantName={plant.name}
          onCancel={() => setShowHealthCheck(false)}
        />
      )}
    </div>
  )
}
