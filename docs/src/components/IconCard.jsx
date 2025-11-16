import { useState } from 'react'
import './IconCard.css'

function IconCard({ icon, variant }) {
  const [copied, setCopied] = useState(false)

  const getSvgContent = () => {
    return icon.svg || `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
  <!-- ${icon.name} icon -->
</svg>`
  }

  const handleCopy = async () => {
    try {
      const svgContent = getSvgContent()
      await navigator.clipboard.writeText(svgContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    const svgContent = getSvgContent()
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${variant === 'normal' ? '' : variant + '-'}${icon.name}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="icon-card">
      <div className="icon-preview" dangerouslySetInnerHTML={{ __html: getSvgContent() }} />


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
