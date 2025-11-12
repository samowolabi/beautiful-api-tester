# Beautiful API Tester 🚀# React + TypeScript + Vite



A modern, beautiful, and embeddable API testing tool built with React, TypeScript, and Tailwind CSS. Test your APIs with ease, import cURL commands, and share your requests via iframe embedding.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



![Beautiful API Tester](./public/screenshot.png)Currently, two official plugins are available:



## ✨ Features- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- 🎨 **Beautiful UI** - Clean, modern interface with dark theme

- 🔄 **cURL Import** - Paste cURL commands and auto-populate request details## React Compiler

- 🔗 **URL Embedding** - Share requests via URL parameters

- 📋 **Copy to Clipboard** - One-click copy for body, response, and cURL commandsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- 🔐 **Authentication** - Support for Bearer token authentication

- 📝 **Auto-format JSON** - Automatic JSON formatting on blur## Expanding the ESLint configuration

- 📊 **Response Panel** - View formatted JSON, raw data, and headers

- 🎯 **HTTP Methods** - Support for GET, POST, PUT, PATCH, DELETEIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- 📤 **Share & Embed** - Generate iframe code to embed API tester anywhere

- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance```js

export default defineConfig([

## 🚀 Quick Start  globalIgnores(['dist']),

  {

### Installation    files: ['**/*.{ts,tsx}'],

    extends: [

```bash      // Other configs...

# Clone the repository

git clone https://github.com/yourusername/beautiful-api-tester.git      // Remove tseslint.configs.recommended and replace with this

cd beautiful-api-tester      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

# Install dependencies      tseslint.configs.strictTypeChecked,

npm install      // Optionally, add this for stylistic rules

      tseslint.configs.stylisticTypeChecked,

# Start development server

npm run dev      // Other configs...

```    ],

    languageOptions: {

Visit `http://localhost:5173` to see the app in action.      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

### Build for Production        tsconfigRootDir: import.meta.dirname,

      },

```bash      // other options...

npm run build    },

npm run preview  },

```])

```

## 📖 Usage

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

### Basic API Testing

```js

1. Enter your API endpoint URL// eslint.config.js

2. Select HTTP method (GET, POST, PUT, etc.)import reactX from 'eslint-plugin-react-x'

3. Add headers (optional)import reactDom from 'eslint-plugin-react-dom'

4. Add request body for POST/PUT/PATCH requests

5. Configure authentication if neededexport default defineConfig([

6. Click "Send" to execute the request  globalIgnores(['dist']),

7. View the response in the right panel  {

    files: ['**/*.{ts,tsx}'],

### Importing cURL Commands    extends: [

      // Other configs...

Click the **Import** button and paste your cURL command:      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

```bash      // Enable lint rules for React DOM

curl -X POST \      reactDom.configs.recommended,

  -H "Content-Type: application/json" \    ],

  -H "Authorization: Bearer YOUR_TOKEN" \    languageOptions: {

  -d '{      parserOptions: {

    "email": "user@example.com",        project: ['./tsconfig.node.json', './tsconfig.app.json'],

    "name": "John Doe"        tsconfigRootDir: import.meta.dirname,

  }' \      },

  "https://api.example.com/users"      // other options...

```    },

  },

The tool will automatically extract:])

- ✅ URL```

- ✅ HTTP Method
- ✅ Headers
- ✅ Request Body
- ✅ Authentication Token

### Sharing Requests

Click the **Share** button to:
- Generate a shareable URL with pre-loaded request
- Get iframe embed code for your documentation
- Copy cURL command for terminal use

### URL Parameters

Load requests directly via URL:

```
http://localhost:5173?curl=BASE64_ENCODED_CURL
```

Example:
```javascript
const curlCommand = `curl -X POST -H "Content-Type: application/json" ...`;
const encoded = btoa(curlCommand);
const shareUrl = `http://localhost:5173?curl=${encodeURIComponent(encoded)}`;
```

## 🏗️ Project Structure

```
beautiful-api-tester/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Tab.tsx
│   │   │   └── TextArea.tsx
│   │   └── molecules/       # Composite components
│   │       ├── AuthorizationPanel.tsx
│   │       ├── BodyEditor.tsx
│   │       ├── HeadersPanel.tsx
│   │       ├── ImportCurlModal.tsx
│   │       ├── Modal.tsx
│   │       ├── RequestPanel.tsx
│   │       ├── ResponsePanel.tsx
│   │       └── ShareModal.tsx
│   ├── utils/
│   │   ├── api-client.ts    # HTTP request handler
│   │   ├── curl-parser.ts   # cURL command parser
│   │   └── clipboard.ts     # Copy to clipboard utilities
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
└── README.md
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icon library

## 🎨 Component Architecture

### Atomic Design Pattern

This project follows atomic design principles:

- **Atoms**: Basic building blocks (Button, Input, Tab)
- **Molecules**: Combinations of atoms (RequestPanel, BodyEditor)
- **Organisms**: Complex UI sections (not yet implemented)

### Key Components

#### `CurlParser`
Modular parser that extracts request details from cURL commands:
- URL extraction
- HTTP method detection
- Header parsing
- Body extraction (preserves formatting)
- Authentication detection

#### `ApiClient`
Handles HTTP requests with:
- Automatic header management
- Bearer token authentication
- Response parsing (JSON/text)
- Error handling
- Performance metrics

#### `BodyEditor`
Smart JSON editor with:
- Auto-format on blur
- Syntax validation
- Copy to clipboard
- Disabled state styling

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (if available)
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Write meaningful commit messages
- Add JSDoc comments for functions
- Keep components small and focused

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by [Postman](https://www.postman.com/) and [Hoppscotch](https://hoppscotch.io/)

## 📧 Contact

Sam Owolabi - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/beautiful-api-tester](https://github.com/yourusername/beautiful-api-tester)

## 🗺️ Roadmap

- [ ] Add request history
- [ ] Environment variables support
- [ ] Collections/folders for organizing requests
- [ ] GraphQL support
- [ ] WebSocket testing
- [ ] Request chaining
- [ ] Import from Postman collections
- [ ] Dark/light theme toggle
- [ ] Keyboard shortcuts
- [ ] Response caching

## 💖 Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation
- 🔀 Contributing code

---

Made with ❤️ by Sam Owolabi
# beautiful-api-tester
