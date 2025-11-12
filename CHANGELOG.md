# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-12

### 🎉 Initial Release

#### ✨ Features
- Beautiful dark theme UI for API testing
- Support for GET, POST, PUT, PATCH, DELETE methods
- Import cURL commands with automatic parsing
- Export requests as cURL commands
- Share requests via URL parameters (base64 encoded)
- Generate iframe embed code for documentation
- Bearer token authentication support
- Custom headers management
- JSON auto-formatting on blur
- Copy to clipboard functionality (body, response, cURL)
- Real-time request/response metrics (time, size)
- Tabbed interface (Body, Authorization, Headers)
- Response viewer (JSON, Raw, Headers tabs)

#### 🎨 Components
- Modular atomic design architecture
- Reusable atoms (Button, Input, Tab, TextArea)
- Composite molecules (RequestPanel, BodyEditor, etc.)
- Modal system for Import and Share features

#### 🛠️ Technical
- Built with React 19 and TypeScript
- Vite for fast builds and HMR
- Tailwind CSS 4 for styling
- Lucide React icons
- Modular cURL parser with newline support
- Clipboard utilities with fallback support

#### 📝 Documentation
- Comprehensive README with usage examples
- Contributing guidelines
- MIT License
- Issue and PR templates
- Code of conduct

### 🔧 Known Issues
- No request history yet
- No environment variables support
- Limited to REST APIs (no GraphQL yet)

---

## [Unreleased]

### Planned Features
- Request history/collections
- Environment variables
- GraphQL support
- WebSocket testing
- Dark/light theme toggle
- Keyboard shortcuts
- Import from Postman collections
