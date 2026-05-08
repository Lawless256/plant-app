const KEYS = {
  plants: 'pp.plants',
  wishlist: 'pp.wishlist',
  journal: 'pp.journal',
  quizResult: 'pp.quizResult',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export const storage = {
  getPlants: () => read(KEYS.plants, []),
  setPlants: (v) => write(KEYS.plants, v),
  getWishlist: () => read(KEYS.wishlist, []),
  setWishlist: (v) => write(KEYS.wishlist, v),
  getJournal: () => read(KEYS.journal, []),
  setJournal: (v) => write(KEYS.journal, v),
  getQuizResult: () => read(KEYS.quizResult, null),
  setQuizResult: (v) => write(KEYS.quizResult, v),
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
}

export function daysBetween(a, b) {
  const ms = new Date(b).setHours(0, 0, 0, 0) - new Date(a).setHours(0, 0, 0, 0)
  return Math.floor(ms / 86400000)
}

export function formatDate(d) {
  return new Date(d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelative(d) {
  const days = daysBetween(d, new Date())
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 14) return 'last week'
  return formatDate(d)
}
