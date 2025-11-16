import IconCard from './IconCard'
import './IconGrid.css'

function IconGrid({ icons, variant }) {
  return (
    <div className="icon-grid">
      {icons.map((icon, idx) => (
        <IconCard key={`${icon.name}-${idx}`} icon={icon} variant={variant} />
      ))}
    </div>
  )
}

export default IconGrid
