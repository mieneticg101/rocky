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
      // In production, we'll load from a generated icons.json
      // For now, create a sample dataset
      const iconData = await generateIconData()
      setIcons(iconData)
    } catch (error) {
      console.error('Error loading icons:', error)
    }
  }

  const generateIconData = async () => {
    // This will be replaced with actual icon loading from the icons folder
    const categories = [
      'essential', 'arrow', 'business', 'technology', 'social',
      'entertainment', 'dev', 'brand', 'thai'
    ]

    const sampleIcons = []
    const iconNames = [
      'github', 'twitter', 'facebook', 'instagram', 'linkedin',
      'youtube', 'tiktok', 'discord', 'spotify', 'netflix',
      'amazon', 'apple', 'google', 'microsoft', 'slack',
      'figma', 'notion', 'zoom', 'teams', 'trello',
      // ... more icons will be loaded from actual files
    ]

    iconNames.forEach((name, idx) => {
      sampleIcons.push({
        name,
        category: categories[idx % categories.length],
        path: `icons/${categories[idx % categories.length]}/${name}.svg`,
        variants: {
          normal: true,
          gradient: true,
          animated: idx % 3 === 0,
          'animated-gradient': idx % 3 === 0
        }
      })
    })

    return sampleIcons
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
