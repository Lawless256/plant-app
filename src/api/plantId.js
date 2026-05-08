// Plant.id v3 (Kindwise) client.
// Docs: https://github.com/flowerchecker/Plant-id-API/wiki
//
// Reads the API key from VITE_PLANTID_API_KEY at build time. The key is
// embedded in the JS bundle (any client-side key is — it's the trade-off
// for a backend-less app). To rotate, redeploy with a new key in the env.

import { readImageResized } from '../utils/image.js'

const BASE = 'https://api.plant.id/v3'
const API_KEY = import.meta.env.VITE_PLANTID_API_KEY || ''

export class PlantIdError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'PlantIdError'
    this.code = code
  }
}

export function hasApiKey() {
  return Boolean(API_KEY)
}

async function postJson(path, body) {
  if (!API_KEY) {
    throw new PlantIdError(
      "The plant ID service isn't set up yet — your key is missing. (Add VITE_PLANTID_API_KEY in your .env or GitHub Secrets.)",
      'no_key',
    )
  }

  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (e) {
    throw new PlantIdError(
      "Couldn't reach the plant experts — check your internet and try again.",
      'network',
    )
  }

  if (res.status === 401 || res.status === 403) {
    throw new PlantIdError(
      "Hmm, that API key doesn't look right. Try a fresh one.",
      'auth',
    )
  }
  if (res.status === 402 || res.status === 429) {
    throw new PlantIdError(
      "Out of plant ID credits this month! 🌱💸",
      'quota',
    )
  }
  if (!res.ok) {
    let detail = ''
    try {
      const json = await res.json()
      detail = json?.error || ''
    } catch {}
    throw new PlantIdError(
      `Plant ID service had a hiccup (${res.status})${detail ? ': ' + detail : ''}. Try again in a sec.`,
      'http',
    )
  }
  return res.json()
}

// Convert a File (from camera or gallery) to a base64 string (no data: prefix).
// Resizes to 1024px so the API has clear pixels but the upload stays small.
export async function fileToBase64(file) {
  const dataUrl = await readImageResized(file, 1024, 0.88)
  // strip "data:image/jpeg;base64," prefix
  const idx = dataUrl.indexOf(',')
  return { base64: dataUrl.slice(idx + 1), dataUrl }
}

// POST /v3/identification — "what plant is this?"
export async function identifyPlant(base64Images) {
  const params = new URLSearchParams({
    details: 'common_names,description,watering,best_light_condition',
    language: 'en',
  })
  const data = await postJson(`/identification?${params}`, {
    images: base64Images,
    similar_images: true,
  })

  const isPlant = data?.result?.is_plant
  if (isPlant && isPlant.binary === false && isPlant.probability < 0.3) {
    throw new PlantIdError(
      "Hmm, that doesn't look like a plant. Try a clearer photo of the leaves?",
      'not_a_plant',
    )
  }

  const suggestions = data?.result?.classification?.suggestions || []
  return suggestions.slice(0, 3).map((s) => ({
    id: s.id,
    name: s.name,
    commonName: s.details?.common_names?.[0] || s.name,
    probability: s.probability || 0,
    description: s.details?.description?.value || s.details?.description || '',
    watering: s.details?.watering || null,
    light: s.details?.best_light_condition || '',
    similarImage: s.similar_images?.[0]?.url_small || s.similar_images?.[0]?.url || '',
  }))
}

// POST /v3/health_assessment — "is my plant okay?"
export async function assessHealth(base64Images) {
  const params = new URLSearchParams({
    details: 'description,treatment,cause',
    language: 'en',
  })
  const data = await postJson(`/health_assessment?${params}`, {
    images: base64Images,
    similar_images: true,
  })

  const result = data?.result
  const healthyProb = result?.is_healthy?.probability ?? 1
  const isHealthy = result?.is_healthy?.binary ?? healthyProb > 0.6

  const issues = (result?.disease?.suggestions || [])
    .filter((s) => (s.probability || 0) > 0.15)
    .slice(0, 4)
    .map((s) => ({
      name: s.name,
      probability: s.probability || 0,
      description: s.details?.description || '',
      cause: s.details?.cause || '',
      treatment: s.details?.treatment || {},
      similarImage: s.similar_images?.[0]?.url_small || s.similar_images?.[0]?.url || '',
    }))

  return { isHealthy, healthyProb, issues }
}
