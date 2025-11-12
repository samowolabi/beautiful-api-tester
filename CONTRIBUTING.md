# Contributing to Beautiful API Tester

First off, thank you for considering contributing to Beautiful API Tester! It's people like you that make this tool better for everyone.

## 🎯 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [your-email@example.com].

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. Chrome 120, Safari 17]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the enhancement
- **Use cases** - Explain why this would be useful
- **Possible implementation** - If you have ideas on how to implement it
- **Screenshots or mockups** - If applicable

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our code style guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

#### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No new warnings generated
- [ ] Changes are tested
- [ ] Commit messages are clear and descriptive

## 💻 Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/beautiful-api-tester.git
cd beautiful-api-tester

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid `any` types when possible
- Use meaningful variable and function names

```typescript
// Good
interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers: Header[];
}

// Avoid
interface Req {
  u: string;
  m: any;
  h: any[];
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused (Single Responsibility Principle)
- Use proper TypeScript types for props
- Add JSDoc comments for complex components

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * Reusable button component with variant support
 */
export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  // Component logic
};
```

### File Organization

- Place components in appropriate folders (`atoms/`, `molecules/`, `organisms/`)
- Keep utility functions in `utils/`
- Define types in `types/`
- One component per file
- Export from index files for cleaner imports

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `RequestPanel.tsx`)
- **Utilities**: camelCase (`api-client.ts`, `curl-parser.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Interfaces/Types**: PascalCase (`ApiRequest`, `HttpMethod`)

### Comments

- Add JSDoc comments for functions and complex logic
- Use inline comments sparingly for complex code only
- Keep comments up to date with code changes

```typescript
/**
 * Parse a cURL command and extract request details
 * @param curlCommand - The cURL command string to parse
 * @returns Parsed request object with URL, method, headers, and body
 */
static parse(curlCommand: string): ParsedCurlRequest {
  // Implementation
}
```

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

```
feat: Add GraphQL support to request panel

- Implement GraphQL query editor
- Add syntax highlighting for GraphQL
- Update documentation

Closes #123
```

**Commit Message Prefixes:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semi-colons, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🧪 Testing

While we don't have automated tests yet, please manually test your changes:

1. Test the feature/fix in development mode
2. Build and test in production mode
3. Test across different browsers if UI changes
4. Test edge cases and error scenarios

## 📚 Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions
- Update inline code comments if logic changes
- Consider adding examples for complex features

## 🎨 Design Guidelines

- Follow existing UI patterns
- Use Tailwind CSS classes for styling
- Maintain dark theme consistency
- Ensure responsive design
- Use Lucide icons for consistency

## 🔍 Code Review Process

1. **Automated checks** - Code must pass linting
2. **Maintainer review** - At least one maintainer approval required
3. **Testing** - Changes should be manually tested
4. **Documentation** - Relevant docs should be updated

## 📦 Release Process

Releases are handled by maintainers. Version numbering follows [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backwards compatible)
- **PATCH** - Bug fixes

## 🤝 Community

- Be respectful and constructive
- Help others in issues and discussions
- Share your use cases and feedback
- Spread the word about the project

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Start a discussion on GitHub Discussions
- Reach out to maintainers

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for their contributions
- GitHub contributors page

Thank you for contributing to Beautiful API Tester! 🎉
