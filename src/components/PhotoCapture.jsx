import { useRef } from 'react'

// A pair of buttons that open camera or gallery. Calls onFile(file) when the
// user picks one. Used by both the Add-Plant ID modal and the Health Check.
export default function PhotoCapture({ onFile, disabled, takeLabel = '📷 Take Photo', chooseLabel = '🖼️ Choose Photo' }) {
  const cameraInput = useRef(null)
  const galleryInput = useRef(null)

  function handleChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) onFile(file)
  }

  return (
    <>
      <input
        ref={cameraInput}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <input
        ref={galleryInput}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <div className="photo-buttons">
        <button
          type="button"
          className="btn ghost"
          onClick={() => cameraInput.current?.click()}
          disabled={disabled}
        >
          {takeLabel}
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={() => galleryInput.current?.click()}
          disabled={disabled}
        >
          {chooseLabel}
        </button>
      </div>
    </>
  )
}
