import './CategoryFilter.css'

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter">
      <div className="category-scroll">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selected === cat ? 'active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
