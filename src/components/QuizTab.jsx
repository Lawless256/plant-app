import { useState, useEffect } from 'react'
import { QUESTIONS, ARCHETYPES, ARCHETYPE_ORDER } from '../data/quiz.js'
import { storage, uid } from '../utils/storage.js'
import WishlistModal from './WishlistModal.jsx'

function tally(answers) {
  const counts = Object.fromEntries(ARCHETYPE_ORDER.map((a) => [a, 0]))
  answers.forEach((a) => {
    if (a) counts[a] = (counts[a] || 0) + 1
  })
  let best = ARCHETYPE_ORDER[0]
  let bestN = -1
  for (const k of ARCHETYPE_ORDER) {
    if (counts[k] > bestN) {
      best = k
      bestN = counts[k]
    }
  }
  return best
}

export default function QuizTab({ onGoToGarden }) {
  const saved = storage.getQuizResult()
  const [step, setStep] = useState(saved ? 'result' : 'intro')
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [archetype, setArchetype] = useState(saved?.archetype || null)
  const [matchIdx, setMatchIdx] = useState(0)
  const [wishToast, setWishToast] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [wishCount, setWishCount] = useState(() => storage.getWishlist().length)

  // refresh wish count whenever the wishlist modal closes (item may have been removed)
  useEffect(() => {
    if (!showWishlist) setWishCount(storage.getWishlist().length)
  }, [showWishlist])

  useEffect(() => {
    if (saved) {
      setArchetype(saved.archetype)
      setMatchIdx(saved.matchIdx || 0)
    }
  }, [])

  function startQuiz() {
    setIdx(0)
    setAnswers([])
    setStep('quiz')
  }

  function pick(option) {
    const next = [...answers, option.archetype]
    if (next.length >= QUESTIONS.length) {
      const winner = tally(next)
      setAnswers(next)
      setArchetype(winner)
      setMatchIdx(0)
      storage.setQuizResult({ archetype: winner, matchIdx: 0, takenAt: Date.now() })
      setStep('result')
    } else {
      setAnswers(next)
      setIdx(idx + 1)
    }
  }

  function retake() {
    setStep('intro')
    setArchetype(null)
    setAnswers([])
    setIdx(0)
    storage.setQuizResult(null)
  }

  function cycleMatch() {
    const list = ARCHETYPES[archetype].matches
    const next = (matchIdx + 1) % list.length
    setMatchIdx(next)
    storage.setQuizResult({ archetype, matchIdx: next, takenAt: Date.now() })
  }

  function addToWishlist(plant) {
    const list = storage.getWishlist()
    if (list.find((p) => p.name === plant.name)) {
      setWishToast('already on your wishlist 💕')
    } else {
      list.push({ id: uid(), addedAt: Date.now(), ...plant })
      storage.setWishlist(list)
      setWishToast('added to wishlist 🌸')
      setWishCount(list.length)
    }
    setTimeout(() => setWishToast(false), 1800)
  }

  if (step === 'intro') {
    return (
      <div className="screen">
        <div className="header">
          <h1>What's Your Plant Personality?</h1>
          <div className="sub">a wildly unscientific quiz for plant people 🌿</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 68, marginBottom: 8 }}>🪴💕🌸</div>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Find Your Plant Soulmate</h2>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.5, fontSize: 14, marginBottom: 18 }}>
            8 deeply important questions. One perfectly-matched houseplant. Possibly some emotional damage.
          </p>
          <button className="btn primary" onClick={startQuiz}>
            Begin the Vibes Check ✨
          </button>
        </div>
        {saved && (
          <button className="btn ghost" style={{ marginTop: 12 }} onClick={() => setStep('result')}>
            See my last match →
          </button>
        )}
        {wishCount > 0 && (
          <button className="btn ghost" style={{ marginTop: 10 }} onClick={() => setShowWishlist(true)}>
            💕 My Wishlist ({wishCount})
          </button>
        )}
        {showWishlist && <WishlistModal onCancel={() => setShowWishlist(false)} />}
      </div>
    )
  }

  if (step === 'quiz') {
    const q = QUESTIONS[idx]
    const pct = ((idx) / QUESTIONS.length) * 100
    return (
      <div className="screen" key={idx}>
        <div className="progress"><div style={{ width: `${pct}%` }} /></div>
        <div className="q-num">Question {idx + 1} of {QUESTIONS.length}</div>
        <div className="q-text">{q.q}</div>
        <div className="q-options">
          {q.options.map((opt, i) => (
            <button key={i} className="q-option" onClick={() => pick(opt)}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // result
  const arch = ARCHETYPES[archetype]
  const plant = arch.matches[matchIdx]
  return (
    <div className="screen">
      <div className="archetype-banner">
        <div className="pre">You are…</div>
        <h2>{arch.label}</h2>
        <div className="tag">{arch.tagline}</div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>{arch.blurb}</p>
      </div>

      <div className="profile">
        <div className="photo">
          <img
            src={plant.photo}
            alt={plant.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="photo-fallback" aria-hidden>
            <span className="photo-fallback-emoji">{plant.emoji || '🪴'}</span>
          </div>
          <div className="badge">Match #{matchIdx + 1}</div>
        </div>
        <div className="body">
          <h2>{plant.name}</h2>
          <div className="latin">{plant.latin}</div>
          <div className="tag">"{plant.tagline}"</div>
          <p className="blurb">{plant.blurb}</p>

          <div className="stats">
            <div className="stat">
              <div className="label">💧 Water</div>
              <div>{plant.water}</div>
            </div>
            <div className="stat">
              <div className="label">☀️ Light</div>
              <div>{plant.light}</div>
            </div>
            <div className="stat">
              <div className="label">Difficulty</div>
              <div>{plant.difficulty}</div>
            </div>
            <div className="stat">
              <div className="label">💸 Price</div>
              <div>{plant.price}</div>
            </div>
          </div>

          <div className="where">
            <b>Where to find her:</b> {plant.whereToBuy}
          </div>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn ghost" onClick={cycleMatch}>Meet Another Match →</button>
        <button className="btn primary" onClick={() => addToWishlist(plant)}>
          Add to Wishlist 💕
        </button>
      </div>

      <button className="btn green" style={{ marginTop: 10 }} onClick={onGoToGarden}>
        Start My Plant Tracker →
      </button>

      <button
        className="btn ghost"
        style={{ marginTop: 10 }}
        onClick={() => setShowWishlist(true)}
      >
        💕 My Wishlist {wishCount > 0 ? `(${wishCount})` : ''}
      </button>

      <button className="btn ghost" style={{ marginTop: 10 }} onClick={retake}>
        Retake Quiz 🔁
      </button>

      {showWishlist && <WishlistModal onCancel={() => setShowWishlist(false)} />}

      {wishToast && (
        <div
          style={{
            position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(74, 48, 82, 0.92)', color: 'white', padding: '10px 18px',
            borderRadius: 999, fontSize: 13, fontWeight: 700, zIndex: 60,
          }}
        >
          {wishToast}
        </div>
      )}
    </div>
  )
}
