import { useState } from 'react'
import './IconCard.css'

function IconCard({ icon, variant }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // In production, load actual SVG content
      const svgContent = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
  <!-- ${icon.name} icon -->
</svg>`

      await navigator.clipboard.writeText(svgContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    // Create download link
    const svgContent = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
  <!-- ${icon.name} icon -->
</svg>`

    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${icon.name}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="icon-card">
      <div className="icon-preview">
        {/* Preview placeholder - will be replaced with actual SVG */}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>

      <div className="icon-name">{icon.name}</div>

      <div className="icon-actions">
        <button
          className="action-btn"
          onClick={handleCopy}
          title="Copy SVG"
        >
          {copied ? '✓' : '📋'}
        </button>
        <button
          className="action-btn"
          onClick={handleDownload}
          title="Download SVG"
        >
          ⬇️
        </button>
      </div>
    </div>
  )
}

export default IconCard
