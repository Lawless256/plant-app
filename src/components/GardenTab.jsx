import { useEffect, useState } from 'react'
import { storage, uid, daysBetween, formatDate } from '../utils/storage.js'
import PlantForm from './PlantForm.jsx'
import PlantDetail from './PlantDetail.jsx'

export default function GardenTab() {
  const [plants, setPlants] = useState(() => storage.getPlants())
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [openId, setOpenId] = useState(null)

  useEffect(() => storage.setPlants(plants), [plants])

  function savePlant(p) {
    if (p.id) {
      setPlants((cur) => cur.map((x) => (x.id === p.id ? p : x)))
    } else {
      setPlants((cur) => [...cur, { ...p, id: uid() }])
    }
    setShowForm(false)
    setEditing(null)
  }

  function deletePlant(id) {
    setPlants((cur) => cur.filter((p) => p.id !== id))
    setOpenId(null)
  }

  function waterPlant(id) {
    setPlants((cur) =>
      cur.map((p) => (p.id === id ? { ...p, lastWatered: new Date().toISOString() } : p)),
    )
  }

  if (openId) {
    const plant = plants.find((p) => p.id === openId)
    if (plant) {
      return (
        <PlantDetail
          plant={plant}
          onBack={() => setOpenId(null)}
          onEdit={() => {
            setEditing(plant)
            setShowForm(true)
            setOpenId(null)
          }}
          onDelete={() => deletePlant(plant.id)}
          onWater={() => waterPlant(plant.id)}
        />
      )
    }
  }

  return (
    <div className="screen">
      <div className="header">
        <h1>My Garden</h1>
        <div className="sub">your beautiful, leafy, slightly-overwatered family 🪴</div>
      </div>

      {plants.length === 0 ? (
        <div className="empty">
          <div className="ico">🌱</div>
          <h3>No plants yet</h3>
          <p>Add your first leafy roommate to start tracking their watering schedule.</p>
          <button className="btn primary" style={{ marginTop: 18 }} onClick={() => setShowForm(true)}>
            + Add a Plant
          </button>
        </div>
      ) : (
        <div className="plant-list">
          {plants.map((p) => {
            const sinceWater = p.lastWatered ? daysBetween(p.lastWatered, new Date()) : null
            const overdue = sinceWater !== null && sinceWater >= (p.waterEvery || 7)
            return (
              <button key={p.id} className="plant-card" onClick={() => setOpenId(p.id)}>
                <div className="plant-thumb">
                  {p.photo ? <img src={p.photo} alt={p.name} /> : (p.emoji || '🪴')}
                </div>
                <div className="plant-meta">
                  <div className="name">{p.name}</div>
                  {p.nickname && <div className="nick">aka "{p.nickname}"</div>}
                  <div className="species">{p.species || '—'}</div>
                </div>
                <div className={`water-pill ${overdue ? 'late' : 'ok'}`}>
                  {sinceWater === null
                    ? 'thirsty?'
                    : overdue
                      ? `${sinceWater - (p.waterEvery || 7)}d overdue`
                      : `${(p.waterEvery || 7) - sinceWater}d`}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {plants.length > 0 && (
        <button className="fab" onClick={() => { setEditing(null); setShowForm(true) }} aria-label="Add plant">
          +
        </button>
      )}

      {showForm && (
        <PlantForm
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          onSave={savePlant}
        />
      )}
    </div>
  )
}
