// Read a File (from camera or photo library) and return a small JPEG data URL.
// Resizes to maxDim px on the longest edge so we don't blow out localStorage
// (~5MB total per origin).
export function readImageResized(file, maxDim = 720, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file'))
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not decode image'))
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(dataUrl)
        } catch (e) {
          reject(e)
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
