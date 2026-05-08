import { useEffect, useRef, useState } from 'react'
import { readImageResized } from '../utils/image.js'

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
  // separate string state for the number input so the user can clear it
  // without React forcing it back to the parsed value mid-type.
  const [waterStr, setWaterStr] = useState(String(initial?.waterEvery ?? 7))
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const cameraInput = useRef(null)
  const galleryInput = useRef(null)

  // lock background scroll while the modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleFile(e) {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-selecting same file
    if (!file) return
    setPhotoError('')
    setPhotoBusy(true)
    try {
      const dataUrl = await readImageResized(file, 720, 0.82)
      update('photo', dataUrl)
    } catch (err) {
      setPhotoError('Could not read that image. Try a different photo.')
    } finally {
      setPhotoBusy(false)
    }
  }

  function clearPhoto() {
    update('photo', '')
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    const days = Math.max(1, Math.min(365, parseInt(waterStr, 10) || 7))
    onSave({
      ...form,
      waterEvery: days,
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
            inputMode="numeric"
            min="1"
            max="365"
            value={waterStr}
            onChange={(e) => setWaterStr(e.target.value)}
            onBlur={() => {
              if (waterStr === '') setWaterStr(String(form.waterEvery || 7))
            }}
          />
        </div>

        <div className="field">
          <label>Photo</label>

          {/* hidden inputs — the camera one uses capture="environment" so it
              opens the rear camera directly on mobile; the gallery one lets
              you pick from your library. */}
          <input
            ref={cameraInput}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <input
            ref={galleryInput}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          {form.photo ? (
            <div className="photo-preview">
              <img src={form.photo} alt="" />
              <button type="button" className="photo-preview-x" onClick={clearPhoto} aria-label="Remove photo">
                ✕
              </button>
            </div>
          ) : (
            <div className="photo-buttons">
              <button
                type="button"
                className="btn ghost"
                onClick={() => cameraInput.current?.click()}
                disabled={photoBusy}
              >
                📷 Take Photo
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => galleryInput.current?.click()}
                disabled={photoBusy}
              >
                🖼️ Choose Photo
              </button>
            </div>
          )}

          {photoBusy && <div className="photo-status">Processing… 🌱</div>}
          {photoError && <div className="photo-status err">{photoError}</div>}
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
