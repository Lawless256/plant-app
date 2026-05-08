import { useState } from 'react'

const PLANT_EMOJIS = ['🪴', '🌱', '🌿', '🍃', '🌾', '🌷', '🌸', '🌺', '🌼', '🌻', '🌹', '🥀', '💐', '🌵', '🎋', '🌳']

export default function PlantForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      name: '',
      nickname: '',
      species: '',
      waterEvery: 7,
      emoji: '🪴',
      photo: '',
      addedAt: new Date().toISOString(),
      lastWatered: '',
    },
  )

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave({
      ...form,
      lastWatered: form.lastWatered || new Date().toISOString(),
    })
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{initial ? 'Edit Plant 🌱' : 'Add a New Plant 🌱'}</h3>

        <div className="field">
          <label>Plant name *</label>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Stromanthe Triostar"
            autoFocus
          />
        </div>

        <div className="field">
          <label>Nickname</label>
          <input
            value={form.nickname}
            onChange={(e) => update('nickname', e.target.value)}
            placeholder="e.g. Lil Stinky"
          />
        </div>

        <div className="field">
          <label>Species</label>
          <input
            value={form.species}
            onChange={(e) => update('species', e.target.value)}
            placeholder="Latin name or family"
          />
        </div>

        <div className="field">
          <label>Water every (days)</label>
          <input
            type="number"
            min="1"
            max="60"
            value={form.waterEvery}
            onChange={(e) => update('waterEvery', Math.max(1, parseInt(e.target.value || '7', 10)))}
          />
        </div>

        <div className="field">
          <label>Photo URL (optional)</label>
          <input
            value={form.photo}
            onChange={(e) => update('photo', e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="field">
          <label>…or pick an emoji</label>
          <div className="emoji-grid">
            {PLANT_EMOJIS.map((e) => (
              <button
                type="button"
                key={e}
                className={form.emoji === e && !form.photo ? 'active' : ''}
                onClick={() => update('emoji', e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="btn-row">
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">
            {initial ? 'Save Changes' : 'Add Plant 🌿'}
          </button>
        </div>
      </form>
    </div>
  )
}
