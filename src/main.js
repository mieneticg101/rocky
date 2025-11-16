// Rocky Icons - Main JavaScript

// Search functionality
const searchInput = document.getElementById('searchInput');
const iconCards = document.querySelectorAll('.icon-card');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    iconCards.forEach(card => {
      const iconName = card.dataset.icon.toLowerCase();
      const shouldShow = iconName.includes(searchTerm);

      card.style.display = shouldShow ? 'flex' : 'none';
    });
  });
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Show/hide sections based on filter
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      if (filter === 'all') {
        section.style.display = 'block';
      } else {
        section.style.display = section.id === filter ? 'block' : 'none';
      }
    });
  });
});

// Copy icon code on click
iconCards.forEach(card => {
  card.addEventListener('click', () => {
    const iconName = card.dataset.icon;
    const svg = card.querySelector('svg').outerHTML;

    // Copy to clipboard
    navigator.clipboard.writeText(svg).then(() => {
      // Show feedback
      const originalName = card.querySelector('.icon-name').textContent;
      card.querySelector('.icon-name').textContent = 'Copied!';

      setTimeout(() => {
        card.querySelector('.icon-name').textContent = originalName;
      }, 1500);
    });
  });
});

// Add hover effect to icon cards
iconCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const iconWrapper = card.querySelector('.icon-wrapper');
    // Random animation on hover
    const animations = ['rocky-icon-hover-lift', 'rocky-icon-hover-scale', 'rocky-icon-hover-rotate'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    // Add temporary animation class
    if (!iconWrapper.classList.contains('rocky-icon-spin')) {
      iconWrapper.classList.add(randomAnimation);
    }
  });

  card.addEventListener('mouseleave', () => {
    const iconWrapper = card.querySelector('.icon-wrapper');
    iconWrapper.classList.remove('rocky-icon-hover-lift', 'rocky-icon-hover-scale', 'rocky-icon-hover-rotate');
  });
});

console.log('🎨 Rocky Icons loaded successfully!');
console.log('5000+ icons available');
console.log('Documentation: https://rocky-icons.dev/docs');
