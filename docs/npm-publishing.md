# NPM Publishing Guide

## Prerequisites

1. **NPM Account**
   - Create account at https://www.npmjs.com/signup
   - Verify your email

2. **NPM Token**
   - Login: `npm login`
   - Create token: `npm token create`
   - Add to GitHub Secrets: `NPM_TOKEN`

3. **GitHub Setup**
   - Add `NPM_TOKEN` to repository secrets
   - Repository Settings → Secrets and variables → Actions → New repository secret

## Publishing Methods

### Method 1: GitHub Actions (Recommended)

#### Automatic on Release
1. Create a new release on GitHub
2. GitHub Actions will automatically publish to NPM

#### Manual Workflow Dispatch
1. Go to Actions → Publish to NPM
2. Click "Run workflow"
3. Select version type (patch/minor/major)
4. Click "Run workflow"

### Method 2: Local Publishing

```bash
# 1. Make sure you're logged in
npm login

# 2. Test the package
npm run build:lib
npm pack

# 3. Test locally
npm install ./rocky-icons-library-0.1.0.tgz

# 4. Publish
npm publish --access public

# Or bump version and publish
npm version patch  # or minor, major
npm publish --access public
```

## Version Management

### Semantic Versioning

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes

### Bump Version

```bash
# Patch release (0.1.0 → 0.1.1)
npm version patch

# Minor release (0.1.0 → 0.2.0)
npm version minor

# Major release (0.1.0 → 1.0.0)
npm version major

# Pre-release
npm version prerelease --preid=beta  # 0.1.0 → 0.1.1-beta.0
```

## Pre-Publish Checklist

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build:lib`
- [ ] Icons optimized: `npm run optimize`
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Git tag created

## Post-Publish

1. **Verify on NPM**
   - Check package page: https://www.npmjs.com/package/@rocky-icons/library
   - Verify files included
   - Check package size

2. **Test Installation**
   ```bash
   npm install @rocky-icons/library
   ```

3. **Update Documentation**
   - Update README badges
   - Update version references
   - Announce on social media

## Troubleshooting

### "You do not have permission to publish"
- Make sure you're logged in: `npm login`
- Check package name isn't taken
- Use scoped package: `@yourname/package-name`

### "Version already exists"
- Bump version: `npm version patch`
- Check current version: `npm view @rocky-icons/library version`

### Build Errors
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node version: `node --version` (should be 18+)

## Continuous Deployment

Every push to `main` branch:
- ✅ Runs tests
- ✅ Builds package
- ✅ Deploys website

Every release:
- ✅ Publishes to NPM
- ✅ Creates GitHub release
- ✅ Updates documentation

---

For more information, see [NPM Documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)
