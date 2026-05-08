import { useEffect, useState } from 'react'
import { storage, uid, formatRelative } from '../utils/storage.js'
import { readImageResized } from '../utils/image.js'
import PhotoCapture from './PhotoCapture.jsx'

export default function WishlistModal({ onCancel }) {
  const [list, setList] = useState(() => storage.getWishlist())
  const [view, setView] = useState('list') // 'list' | 'add'
  const [draft, setDraft] = useState({ name: '', whereToBuy: '', photo: '' })
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState('')

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function remove(id) {
    const next = list.filter((p) => p.id !== id)
    setList(next)
    storage.setWishlist(next)
  }

  function clearAll() {
    if (!confirm('Clear your whole wishlist?')) return
    setList([])
    storage.setWishlist([])
  }

  async function handleFile(file) {
    setPhotoError('')
    setPhotoBusy(true)
    try {
      const dataUrl = await readImageResized(file, 720, 0.82)
      setDraft((d) => ({ ...d, photo: dataUrl }))
    } catch (e) {
      setPhotoError('Could not read that photo. Try a different one?')
    } finally {
      setPhotoBusy(false)
    }
  }

  function clearPhoto() {
    setDraft((d) => ({ ...d, photo: '' }))
  }

  function startAdd() {
    setDraft({ name: '', whereToBuy: '', photo: '' })
    setPhotoError('')
    setView('add')
  }

  function cancelAdd() {
    setDraft({ name: '', whereToBuy: '', photo: '' })
    setPhotoError('')
    setView('list')
  }

  function saveDraft(e) {
    e?.preventDefault?.()
    if (!draft.name.trim()) return
    const item = {
      id: uid(),
      addedAt: Date.now(),
      name: draft.name.trim(),
      whereToBuy: draft.whereToBuy.trim(),
      photo: draft.photo,
      manual: true,
    }
    const next = [item, ...list]
    setList(next)
    storage.setWishlist(next)
    setDraft({ name: '', whereToBuy: '', photo: '' })
    setView('list')
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={(e) => e.preventDefault()}>
        <h3>My Wishlist 💕</h3>
        <div style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: 13, marginTop: -8, marginBottom: 14 }}>
          {view === 'add' ? 'add a plant you want next' : "plants you've saved"}
        </div>

        {view === 'list' && (
          <>
            <button
              type="button"
              className="btn primary"
              style={{ marginBottom: 16 }}
              onClick={startAdd}
            >
              + Add a Plant
            </button>

            {list.length === 0 ? (
              <div className="empty" style={{ padding: '20px 8px' }}>
                <div className="ico">🌸</div>
                <h3>No saved plants yet</h3>
                <p>Take the quiz and tap "Add to Wishlist" 💕 — or use the button above to add one yourself.</p>
              </div>
            ) : (
              <>
                <div className="wishlist">
                  {list.map((p) => (
                    <div className="wish-card" key={p.id}>
                      <div className="wish-photo">
                        {p.photo ? (
                          <img
                            src={p.photo}
                            alt=""
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        ) : null}
                        <div className="wish-photo-fallback" aria-hidden>
                          <span>{p.emoji || '🪴'}</span>
                        </div>
                      </div>
                      <div className="wish-body">
                        <div className="wish-name">{p.name}</div>
                        {p.latin && <div className="wish-latin">{p.latin}</div>}
                        {p.tagline && <div className="wish-tag">"{p.tagline}"</div>}
                        <div className="wish-meta">
                          {p.price && <span className="wish-chip">💸 {p.price}</span>}
                          {p.light && <span className="wish-chip">{p.light}</span>}
                        </div>
                        {p.whereToBuy && (
                          <div className="wish-where">
                            <b>Find at:</b> {p.whereToBuy}
                          </div>
                        )}
                        {p.addedAt && (
                          <div className="wish-added">added {formatRelative(p.addedAt)}</div>
                        )}
                        <button
                          type="button"
                          className="wish-remove"
                          onClick={() => remove(p.id)}
                        >
                          💔 Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn ghost"
                  style={{ marginTop: 14, color: 'var(--pink-600)' }}
                  onClick={clearAll}
                >
                  Clear wishlist
                </button>
              </>
            )}
          </>
        )}

        {view === 'add' && (
          <>
            <div className="field">
              <label>Plant name *</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Pink Princess Philodendron"
                autoFocus
              />
            </div>

            <div className="field">
              <label>Where to find / notes</label>
              <input
                value={draft.whereToBuy}
                onChange={(e) => setDraft((d) => ({ ...d, whereToBuy: e.target.value }))}
                placeholder="e.g. Etsy, ~$30"
              />
            </div>

            <div className="field">
              <label>Photo</label>
              {draft.photo ? (
                <div className="photo-preview">
                  <img src={draft.photo} alt="" />
                  <button type="button" className="photo-preview-x" onClick={clearPhoto} aria-label="Remove photo">
                    ✕
                  </button>
                </div>
              ) : (
                <PhotoCapture onFile={handleFile} disabled={photoBusy} />
              )}
              {photoBusy && <div className="photo-status">Processing… 🌱</div>}
              {photoError && <div className="photo-status err">{photoError}</div>}
            </div>

            <div className="btn-row">
              <button type="button" className="btn ghost" onClick={cancelAdd}>
                Cancel
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={saveDraft}
                disabled={!draft.name.trim() || photoBusy}
              >
                Save 💕
              </button>
            </div>
          </>
        )}

        {view === 'list' && (
          <button type="button" className="btn ghost" style={{ marginTop: 10 }} onClick={onCancel}>
            Close
          </button>
        )}
      </form>
    </div>
  )
}
