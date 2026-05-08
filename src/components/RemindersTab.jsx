import { useEffect, useMemo, useState } from 'react'
import { storage, daysBetween } from '../utils/storage.js'

export default function RemindersTab() {
  const [plants, setPlants] = useState(() => storage.getPlants())
  const [splash, setSplash] = useState(false)
  const [waterAnimId, setWaterAnimId] = useState(null)

  useEffect(() => {
    storage.setPlants(plants)
  }, [plants])

  // re-read when tab opened
  useEffect(() => {
    setPlants(storage.getPlants())
  }, [])

  const sorted = useMemo(() => {
    return [...plants]
      .map((p) => {
        const since = p.lastWatered ? daysBetween(p.lastWatered, new Date()) : 9999
        const overdueBy = since - (p.waterEvery || 7)
        return { ...p, since, overdueBy }
      })
      .sort((a, b) => b.overdueBy - a.overdueBy)
  }, [plants])

  function water(id) {
    setWaterAnimId(id)
    setSplash(true)
    setTimeout(() => {
      setPlants((cur) =>
        cur.map((p) => (p.id === id ? { ...p, lastWatered: new Date().toISOString() } : p)),
      )
      setSplash(false)
      setWaterAnimId(null)
    }, 700)
  }

  return (
    <div className="screen">
      <div className="header">
        <h1>Water Time</h1>
        <div className="sub">who's thirsty? probably most of them. 💧</div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty">
          <div className="ico">💧</div>
          <h3>No plants to water yet</h3>
          <p>Add plants in the Garden tab and they'll show up here on a schedule.</p>
        </div>
      ) : (
        <div>
          {sorted.map((p) => {
            const overdue = p.overdueBy >= 0
            const dueText =
              p.since === 9999
                ? 'never been watered'
                : overdue
                  ? p.overdueBy === 0
                    ? 'thirsty today'
                    : `${p.overdueBy}d overdue`
                  : `due in ${-p.overdueBy}d`
            return (
              <div
                key={p.id}
                className={`reminder ${waterAnimId === p.id ? 'watered' : ''}`}
              >
                <div className="plant-thumb" style={{ width: 44, height: 44, fontSize: 22, borderRadius: 12 }}>
                  {p.photo ? <img src={p.photo} alt="" /> : (p.emoji || '🪴')}
                </div>
                <div className="info">
                  <div className="name">{p.name}</div>
                  <div className="due" style={{ color: overdue ? 'var(--pink-600)' : 'var(--ink-soft)', fontWeight: overdue ? 700 : 400 }}>
                    {dueText}
                  </div>
                </div>
                <button className="water-btn" onClick={() => water(p.id)}>
                  💧 Water
                </button>
              </div>
            )
          })}
        </div>
      )}

      {splash && <div className="splash">💧</div>}
    </div>
  )
}
