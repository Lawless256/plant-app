import { useEffect, useMemo, useState } from 'react'
import PhotoCapture from './PhotoCapture.jsx'
import { assessHealth, fileToBase64, hasApiKey } from '../api/plantId.js'

const LOADING_MESSAGES = [
  'asking the plant doctor… 🩺',
  'examining the leaves… 🍃',
  'checking for tiny bugs… 🐛',
  'looking up plant illnesses… 📚',
]

// Pull a friendly summary out of the API's treatment object.
// API can return: { biological: [...], chemical: [...], prevention: [...] }
function flattenTreatment(treatment) {
  if (!treatment) return []
  const order = ['biological', 'prevention', 'chemical']
  const out = []
  for (const key of order) {
    const items = treatment[key]
    if (!items) continue
    const arr = Array.isArray(items) ? items : [items]
    arr.forEach((s) => out.push({ kind: key, text: s }))
  }
  return out.slice(0, 6)
}

export default function HealthCheckModal({ plantName, onCancel }) {
  const [photoData, setPhotoData] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

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
    setResult(null)
    setBusy(true)
    try {
      const photo = await fileToBase64(file)
      setPhotoData(photo)
      const r = await assessHealth([photo.base64])
      setResult(r)
    } catch (e) {
      setError(e.message || 'Something went wrong checking your plant.')
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setPhotoData(null)
    setResult(null)
    setError('')
  }

  // confetti emojis used in the healthy state
  const confetti = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    char: ['🌱', '✨', '💚', '🌸', '💕'][i % 5],
    left: Math.random() * 100,
    delay: Math.random() * 600,
    duration: 1600 + Math.random() * 1000,
  })), [result?.isHealthy])

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={(e) => e.preventDefault()}>
        <h3>Health Check 🩺</h3>
        {plantName && (
          <div style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: 13, marginTop: -8, marginBottom: 14 }}>
            for {plantName}
          </div>
        )}

        {!hasApiKey() && (
          <div className="alert pink" style={{ marginBottom: 14 }}>
            Health Check isn't set up yet — your VITE_PLANTID_API_KEY is missing.
          </div>
        )}

        {!photoData && !busy && !result && (
          <>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.5, textAlign: 'center', margin: '0 0 16px' }}>
              Show us a leaf or two — we'll spot anything that looks off. 🍃
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
            <div className="loading-spinner">🩺</div>
            <div className="loading-text">{loadingMsg}</div>
          </div>
        )}

        {error && (
          <div className="alert pink">
            {error}
            <button type="button" className="alert-retry" onClick={reset}>Try another photo</button>
          </div>
        )}

        {result && result.isHealthy && (
          <div className="health-card healthy">
            <div className="confetti">
              {confetti.map((c, i) => (
                <span
                  key={i}
                  style={{
                    left: `${c.left}%`,
                    animationDelay: `${c.delay}ms`,
                    animationDuration: `${c.duration}ms`,
                  }}
                >
                  {c.char}
                </span>
              ))}
            </div>
            <div className="health-emoji">🌱</div>
            <h4>She's thriving! ✨</h4>
            <p>
              No signs of trouble. Whatever you're doing, keep doing it —
              you're {Math.round(result.healthyProb * 100)}% goals.
            </p>
            <button type="button" className="btn green" onClick={reset}>
              Check another photo
            </button>
          </div>
        )}

        {result && !result.isHealthy && (
          <>
            <div className="health-banner sick">
              <div className="health-banner-emoji">🤒</div>
              <div>
                <div className="health-banner-title">Something looks off</div>
                <div className="health-banner-sub">
                  We spotted {result.issues.length === 1 ? '1 possible issue' : `${result.issues.length} possible issues`} — here's what it might be:
                </div>
              </div>
            </div>

            {result.issues.length === 0 ? (
              <div className="alert pink">
                Couldn't pin down a specific issue from this photo. Try a closer-up of the affected leaves?
              </div>
            ) : (
              <div className="issue-list">
                {result.issues.map((issue, i) => {
                  const tips = flattenTreatment(issue.treatment)
                  return (
                    <div className="issue-card" key={i}>
                      <div className="issue-head">
                        <div className="issue-name">{issue.name}</div>
                        <div className="issue-conf">{Math.round(issue.probability * 100)}%</div>
                      </div>
                      {issue.description && (
                        <p className="issue-desc">{issue.description}</p>
                      )}
                      {issue.cause && (
                        <p className="issue-cause"><b>Likely cause:</b> {issue.cause}</p>
                      )}
                      {tips.length > 0 && (
                        <div className="issue-treatment">
                          <div className="issue-treatment-label">What to try:</div>
                          <ul>
                            {tips.map((t, j) => (
                              <li key={j}>
                                <span className={`tip-tag tip-${t.kind}`}>{t.kind}</span>
                                {t.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            <button type="button" className="btn ghost" onClick={reset} style={{ marginTop: 10 }}>
              Try another photo
            </button>
          </>
        )}

        <button type="button" className="btn ghost" style={{ marginTop: 10 }} onClick={onCancel}>
          Close
        </button>
      </form>
    </div>
  )
}
