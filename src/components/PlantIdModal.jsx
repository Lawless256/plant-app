import { useEffect, useState } from 'react'
import PhotoCapture from './PhotoCapture.jsx'
import { identifyPlant, fileToBase64, hasApiKey } from '../api/plantId.js'

const LOADING_MESSAGES = [
  'asking the plant experts… 🌿',
  'flipping through the botany book… 📖',
  'consulting the leaves… 🍃',
  'matching against thousands of species… 🌱',
]

export default function PlantIdModal({ onCancel, onPick }) {
  const [photoData, setPhotoData] = useState(null) // { base64, dataUrl }
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])

  // lock background scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // rotate the loading message every ~2s for a little personality
  useEffect(() => {
    if (!busy) return
    let i = 0
    const t = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[i])
    }, 2000)
    return () => clearInterval(t)
  }, [busy])

  async function handleFile(file) {
    setError('')
    setResults(null)
    setBusy(true)
    try {
      const photo = await fileToBase64(file)
      setPhotoData(photo)
      const matches = await identifyPlant([photo.base64])
      setResults(matches)
    } catch (e) {
      setError(e.message || 'Something went wrong identifying the plant.')
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setPhotoData(null)
    setResults(null)
    setError('')
  }

  const topConfidence = results?.[0]?.probability || 0
  const lowConfidence = results && topConfidence < 0.6

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={(e) => e.preventDefault()}>
        <h3>Identify a Plant 🔍</h3>

        {!hasApiKey() && (
          <div className="alert pink" style={{ marginBottom: 14 }}>
            Plant ID isn't set up yet — your VITE_PLANTID_API_KEY is missing.
          </div>
        )}

        {!photoData && !busy && !results && (
          <>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5, textAlign: 'center', margin: '0 0 16px' }}>
              Snap a clear photo of a leaf or the whole plant — we'll find the closest matches. 🌱
            </p>
            <PhotoCapture onFile={handleFile} disabled={busy || !hasApiKey()} />
          </>
        )}

        {photoData && (
          <div className="photo-preview" style={{ marginBottom: 14 }}>
            <img src={photoData.dataUrl} alt="" />
          </div>
        )}

        {busy && (
          <div className="loading-card">
            <div className="loading-spinner">🌿</div>
            <div className="loading-text">{loadingMsg}</div>
          </div>
        )}

        {error && (
          <div className="alert pink">
            {error}
            <button type="button" className="alert-retry" onClick={reset}>Try another photo</button>
          </div>
        )}

        {results && results.length === 0 && (
          <div className="alert pink">
            Couldn't find a match. Try a closer-up shot of the leaves?
            <button type="button" className="alert-retry" onClick={reset}>Try again</button>
          </div>
        )}

        {results && results.length > 0 && (
          <>
            {lowConfidence ? (
              <div className="confidence-banner low">
                Not totally sure — pick the one that looks right 🤔
              </div>
            ) : (
              <div className="confidence-banner ok">
                Top match looks pretty confident! ✨
              </div>
            )}
            <div className="match-list">
              {results.map((r, i) => (
                <button
                  key={r.id || i}
                  type="button"
                  className={`match-card ${i === 0 && !lowConfidence ? 'top' : ''}`}
                  onClick={() => onPick({ name: r.commonName || r.name, species: r.name })}
                >
                  <div className="match-thumb">
                    {r.similarImage
                      ? <img src={r.similarImage} alt="" />
                      : <span>🌿</span>}
                  </div>
                  <div className="match-info">
                    <div className="match-name">{r.commonName || r.name}</div>
                    <div className="match-latin">{r.name}</div>
                  </div>
                  <div className="match-conf">{Math.round(r.probability * 100)}%</div>
                </button>
              ))}
            </div>
            <button type="button" className="btn ghost" style={{ marginTop: 10 }} onClick={reset}>
              Try another photo
            </button>
          </>
        )}

        <button type="button" className="btn ghost" style={{ marginTop: 10 }} onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}
