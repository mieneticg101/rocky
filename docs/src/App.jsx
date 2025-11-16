import { useState, useEffect, useMemo } from 'react'
import './App.css'
import IconGrid from './components/IconGrid'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import Header from './components/Header'
import Stats from './components/Stats'

function App() {
  const [icons, setIcons] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [variant, setVariant] = useState('normal')
  const [theme, setTheme] = useState('light')

  // Load icons from the icons directory
  useEffect(() => {
    loadIcons()
  }, [])

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const loadIcons = async () => {
    try {
      // Load from generated icons.json
      const response = await fetch('/Rocky/icons.json')
      const data = await response.json()
      setIcons(data.icons || [])
    } catch (error) {
      console.error('Error loading icons:', error)
      // Fallback to empty array
      setIcons([])
    }
  }

  const filteredIcons = useMemo(() => {
    return icons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || icon.category === category
      const hasVariant = icon.variants[variant]
      return matchesSearch && matchesCategory && hasVariant
    })
  }, [icons, search, category, variant])

  const categories = useMemo(() => {
    const cats = new Set(icons.map(icon => icon.category))
    return ['all', ...Array.from(cats).sort()]
  }, [icons])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="container">
        <section className="hero">
          <h1 className="hero-title">
            Rocky Icons
            <span className="gradient-text">2025</span>
          </h1>
          <p className="hero-subtitle">
            A beautiful collection of 2,200+ free SVG icons for your projects
          </p>
          <Stats icons={icons} />
        </section>

        <section className="controls">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />
          <div className="variant-selector">
            <button
              className={`variant-btn ${variant === 'normal' ? 'active' : ''}`}
              onClick={() => setVariant('normal')}
            >
              Normal
            </button>
            <button
              className={`variant-btn ${variant === 'gradient' ? 'active' : ''}`}
              onClick={() => setVariant('gradient')}
            >
              Gradient
            </button>
            <button
              className={`variant-btn ${variant === 'animated' ? 'active' : ''}`}
              onClick={() => setVariant('animated')}
            >
              Animated
            </button>
            <button
              className={`variant-btn ${variant === 'animated-gradient' ? 'active' : ''}`}
              onClick={() => setVariant('animated-gradient')}
            >
              Animated Gradient
            </button>
          </div>
        </section>

        <IconGrid icons={filteredIcons} variant={variant} />

        {filteredIcons.length === 0 && (
          <div className="no-results">
            <p>No icons found matching your criteria</p>
            <button onClick={() => { setSearch(''); setCategory('all'); }} className="reset-btn">
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Made with ❤️ by Rocky Icons</p>
        <p>MIT License - Free for personal and commercial use</p>
      </footer>
    </div>
  )
}

export default App
