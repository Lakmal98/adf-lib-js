#!/bin/bash

# Release script for adf-lib-js
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Check if we're on main/master branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" && "$BRANCH" != "master" ]]; then
  echo "❌ Error: You must be on the main or master branch to create a release"
  exit 1
fi

# Check if working directory is clean
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Error: Working directory is not clean. Please commit or stash your changes."
  exit 1
fi

# Get version type (default to patch)
VERSION_TYPE=${1:-patch}

if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "❌ Error: Version type must be 'patch', 'minor', or 'major'"
  exit 1
fi

echo "🚀 Starting release process..."

# Run tests first
echo "🧪 Running tests..."
npm test

# Run build
echo "🔨 Building package..."
npm run build

# Run linting
echo "🔍 Running linting..."
npm run lint

# Bump version
echo "📦 Bumping $VERSION_TYPE version..."
NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)
echo "New version: $NEW_VERSION"

# Commit version change
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo "🏷️  Creating and pushing tag..."
git tag $NEW_VERSION
git push origin $BRANCH
git push origin $NEW_VERSION

echo "✅ Release $NEW_VERSION has been initiated!"
echo "🔄 Check GitHub Actions for build and publish progress"
echo "📦 Package will be available on npm shortly" 