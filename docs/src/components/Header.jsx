import './Header.css'

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>Rocky Icons</span>
        </div>

        <nav className="nav">
          <a href="https://github.com/mieneticg101/Rocky" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
