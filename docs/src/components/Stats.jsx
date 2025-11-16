import './Stats.css'

function Stats({ icons }) {
  const stats = {
    total: icons.length,
    gradient: icons.filter(i => i.variants?.gradient).length,
    animated: icons.filter(i => i.variants?.animated).length,
  }

  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-value">{stats.total}+</div>
        <div className="stat-label">Total Icons</div>
      </div>
      <div className="stat">
        <div className="stat-value">{stats.gradient}+</div>
        <div className="stat-label">Gradient</div>
      </div>
      <div className="stat">
        <div className="stat-value">{stats.animated}+</div>
        <div className="stat-label">Animated</div>
      </div>
    </div>
  )
}

export default Stats
