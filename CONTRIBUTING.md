# Contributing to Rocky Icons

Thank you for your interest in contributing to Rocky Icons! We welcome contributions from everyone.

## Ways to Contribute

- 🎨 Design new icons
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Fix issues
- ⚡ Optimize performance

## Design Guidelines

### Icon Design Requirements

1. **Size**: Design on a 24x24px canvas
2. **Safe Area**: Keep content within 20x20px (2px padding)
3. **Stroke Width**: Use 1.5px (default), 1px (thin), or 2px (bold)
4. **Style**: Follow our [Design System](DESIGN_SYSTEM.md)
5. **Format**: Save as optimized SVG
6. **Naming**: Use kebab-case (e.g., `user-profile.svg`)

### Icon Design Checklist

- [ ] Aligned to pixel grid
- [ ] Consistent stroke width
- [ ] Optical balance achieved
- [ ] Works at multiple sizes (16px, 24px, 48px)
- [ ] Recognizable at small sizes
- [ ] Clean, optimized SVG code
- [ ] File size < 2KB
- [ ] Follows design system guidelines

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Rocky.git
   cd Rocky
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Adding New Icons

1. Create your icon SVG file in the appropriate category folder:
   ```
   icons/
   ├── essential/
   ├── business/
   ├── technology/
   └── ...
   ```

2. Follow the SVG template:
   ```svg
   <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
     <!-- Your icon paths here -->
   </svg>
   ```

3. Optimize your SVG:
   ```bash
   npm run optimize
   ```

4. Generate components:
   ```bash
   npm run generate
   ```

5. Test your icon:
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for new code
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Format code with Prettier:
  ```bash
  npm run format
  ```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add new shopping cart icon
fix: correct heart icon alignment
docs: update installation instructions
```

## Pull Request Process

1. Update documentation if needed
2. Add/update tests if applicable
3. Ensure all tests pass:
   ```bash
   npm test
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Create a Pull Request with:
   - Clear title and description
   - Screenshots (for visual changes)
   - Link to related issue (if any)

## Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, your PR will be merged

## Testing

Run tests before submitting:
```bash
npm test
```

## Questions?

- Open an [issue](https://github.com/mieneticg101/Rocky/issues)
- Join our [Discord](https://discord.gg/rocky-icons)
- Email: contribute@rocky-icons.dev

## Code of Conduct

Be respectful and inclusive. We follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Rocky Icons! 🎨
