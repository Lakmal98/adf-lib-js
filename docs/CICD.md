# CI/CD Documentation

This document explains the CI/CD setup for the adf-lib-js package.

## Overview

The project uses GitHub Actions for continuous integration and deployment with two main workflows:

1. **Test Workflow** - Runs on every push and PR
2. **Release & Deploy Workflow** - Runs on version tags

## Workflows

### Test Workflow (`.github/workflows/test.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

**What it does:**
- Tests against Node.js versions 16, 18, and 20
- Installs dependencies with `npm ci`
- Runs ESLint for code quality
- Executes Jest test suite with coverage
- Builds the TypeScript code
- Uploads coverage to Codecov (Node.js 18 only)

**Matrix Strategy:**
The workflow uses a matrix strategy to test against multiple Node.js versions, ensuring compatibility across supported versions.

### Release & Deploy Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Tags matching pattern `v*` (e.g., `v1.0.0`, `v0.2.1`)

**Jobs:**

1. **Test Job**
   - Runs the same checks as the test workflow
   - Must pass before proceeding to release/publish

2. **Release Job**
   - Creates a GitHub release
   - Extracts version from tag
   - Generates release notes automatically

3. **Publish Job**
   - Depends on both test and release jobs
   - Updates package.json version to match tag
   - Publishes to npm registry
   - Uses npm environment for security

## Security

### Environment Protection
The `publish` job uses a GitHub environment named `npm` which provides:
- Required reviewers (optional)
- Deployment protection rules
- Environment-specific secrets

### Secrets Required

| Secret | Description | How to Create |
|--------|-------------|---------------|
| `NPM_TOKEN` | npm access token for publishing | 1. Go to npmjs.com<br>2. User Settings → Access Tokens<br>3. Generate New Token (Automation)<br>4. Add to GitHub repository secrets |

## Release Process

### Automated Release (Recommended)

Use the provided release scripts:

```bash
# Patch release (0.2.1 → 0.2.2)
npm run release:patch

# Minor release (0.2.1 → 0.3.0) 
npm run release:minor

# Major release (0.2.1 → 1.0.0)
npm run release:major
```

### Manual Release

```bash
# 1. Bump version
npm version patch  # or minor/major

# 2. Push tag
git push origin --tags
```

## Release Script Features

The release script (`scripts/release.sh`) provides safety checks:

- ✅ Ensures you're on main/master branch
- ✅ Checks working directory is clean
- ✅ Runs full test suite before release
- ✅ Runs linting checks
- ✅ Builds the package
- ✅ Creates proper git commit and tag
- ✅ Pushes changes and tags

## Monitoring

### GitHub Actions
Monitor workflow progress at:
- `https://github.com/[username]/adf-lib-js/actions`

### npm Publishing
Check package status at:
- `https://www.npmjs.com/package/adf-lib-js`

### Coverage Reports
View test coverage at:
- `https://codecov.io/gh/[username]/adf-lib-js`

## Troubleshooting

### Common Issues

**1. npm publish fails with authentication error**
- Verify `NPM_TOKEN` secret is set correctly
- Ensure token has publish permissions
- Check if 2FA is required for publishing

**2. Version already exists error**
- Version was already published to npm
- Use `npm version` to bump to a new version
- Cannot republish the same version

**3. Tests fail in CI but pass locally**
- Different Node.js versions might behave differently
- Check if all dependencies are properly declared
- Verify test isolation (no shared state)

**4. Release workflow doesn't trigger**
- Ensure tag follows `v*` pattern (e.g., `v1.0.0`)
- Check if tag was pushed: `git push origin --tags`
- Verify workflow file syntax

### Debug Steps

1. **Check workflow logs** in GitHub Actions tab
2. **Verify secrets** are configured in repository settings
3. **Test locally** before pushing tags:
   ```bash
   npm test
   npm run build
   npm run lint
   ```
4. **Check npm token** permissions and expiration

## Best Practices

1. **Always test before release** - The release script enforces this
2. **Use semantic versioning** - patch/minor/major have specific meanings
3. **Keep changelog updated** - GitHub auto-generates release notes
4. **Monitor CI status** - Don't ignore failing workflows
5. **Protect main branch** - Require PR reviews and status checks

## Environment Setup

### Repository Settings

1. **Secrets** (Settings → Secrets and variables → Actions)
   - Add `NPM_TOKEN` 

2. **Environments** (Settings → Environments)
   - Create `npm` environment
   - Add deployment protection rules if desired

3. **Branch Protection** (Settings → Branches)
   - Protect main/master branch
   - Require status checks
   - Require PR reviews

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run tests locally**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Make release script executable**
   ```bash
   chmod +x scripts/release.sh
   ``` 