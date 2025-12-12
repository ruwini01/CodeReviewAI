# 🚀 CodeReviewAI

> **AI-Powered Code Analysis & Auto-Fix Tool**  
> Analyze code quality, detect bugs, and automatically fix issues using advanced AI technology.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://code-review-ai-six.vercel.app/)
[![Python Backend](https://img.shields.io/badge/python-backend-blue)](https://codereviewai-production-4554.up.railway.app)
[![Java Backend](https://img.shields.io/badge/java-backend-orange)](https://codereviewai-production-5be9.up.railway.app/)

---
## ▶️ Watch Demo


https://github.com/user-attachments/assets/f5ee9876-401e-4603-877c-81abdd10af0b


---
## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Why Two Backends?](#why-two-backends)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**CodeReviewAI** is a comprehensive code analysis platform that helps developers:
- 🔍 **Analyze code** for bugs, security issues, and code smells
- 🔧 **Auto-fix** common coding errors and anti-patterns
- 📊 **Get detailed insights** into code quality metrics
- 🎓 **Learn best practices** through AI-powered recommendations

The platform uses a **three-tier architecture** with separate Python AI backend, Java middleware, and React frontend to provide scalable, maintainable, and enterprise-ready code analysis.

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │  (Vite + React)
│   (Vercel)      │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Java Backend   │  (Spring Boot)
│   (Railway)     │  - API Gateway
│                 │  - Business Logic
│                 │  - Caching (Future)
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Python Backend  │  (FastAPI)
│   (Railway)     │  - AI/ML Processing
│                 │  - Code Analysis
│                 │  - LLM Integration
└─────────────────┘
```

### Request Flow:
1. **User** submits code via React frontend
2. **React** → sends request to **Java backend**
3. **Java** → validates, processes, routes to **Python backend**
4. **Python** → performs AI analysis using LLM
5. **Python** → returns results to **Java**
6. **Java** → enhances response, adds metadata
7. **Java** → returns to **React**
8. **React** → displays results to user

---

## 🤔 Why Two Backends?

### The Rationale Behind Multi-Backend Architecture

While a single backend could handle basic functionality, our two-backend approach provides significant advantages for **scalability, maintainability, and enterprise readiness**:

#### 1️⃣ **Separation of Concerns**
- **Python Backend**: Specializes in AI/ML operations
  - Natural choice for AI libraries (Anthropic, OpenAI, TensorFlow)
  - Rapid prototyping of ML models
  - Easy integration with data science tools
  
- **Java Backend**: Handles enterprise features
  - Business logic and validation
  - Authentication & authorization (future)
  - Database operations (future)
  - Complex transaction management

#### 2️⃣ **Performance Optimization**
- **Python**: CPU-intensive AI operations run on optimized infrastructure
- **Java**: Fast request routing, caching, and I/O operations
- **Independent Scaling**: Scale each backend based on specific load
  - AI processing bottleneck? Scale Python instances
  - High user traffic? Scale Java instances

#### 3️⃣ **Technology Best Practices**
- **Right Tool for the Right Job**
  - Python excels at AI/ML with rich ecosystem
  - Java excels at enterprise features with robust frameworks
  
#### 4️⃣ **Security & Isolation**
- **API Key Protection**: Sensitive AI API keys isolated in Python backend
- **Fail-Safe**: If AI service fails, Java can return cached results (future feature)

#### 5️⃣ **Team Scalability**
- **Parallel Development**: Frontend, Java, and Python teams work independently
- **Technology Expertise**: Developers work in their strongest languages
- **Easier Onboarding**: New developers focus on one service at a time

#### 6️⃣ **Future-Proof Architecture**
The Java middleware enables planned features:
- User authentication & profiles
- Usage analytics & monitoring
- Result caching for faster responses
- Multiple AI provider support (OpenAI, Claude, local models)
- WebSocket support for real-time analysis
- Subscription & payment processing

#### Current State vs. Future Vision

**Current (MVP):**
```
React → Java (simple proxy) → Python (AI processing)
```

**Future (Full Platform):**
```
React → Java → ┬→ Python (AI)
               ├→ PostgreSQL (user data)
               ├→ Redis (caching)
               ├→ Elasticsearch (code search)
               └→ Kafka (async processing)
```

> **Note**: Yes, currently Java acts primarily as a proxy, but this foundation enables rapid addition of enterprise features without refactoring the entire architecture.

---

## ✨ Features

### Current Features
- ✅ **Multi-Language Support**: Python, JavaScript, Java, C++, and more
- ✅ **AI-Powered Analysis**: Detects bugs, security issues, code smells
- ✅ **Auto-Fix**: Automatically corrects common coding errors
- ✅ **Real-time Processing**: Fast response times with optimized backends
- ✅ **Clean UI**: Modern, responsive interface built with React
- ✅ **CORS Configured**: Secure cross-origin resource sharing

### Coming Soon (See [Future Roadmap](#future-roadmap))
- 🔄 User authentication & profiles
- 🔄 Analysis history & comparison
- 🔄 Team collaboration features
- 🔄 Custom rule configuration
- 🔄 IDE plugins (VS Code, IntelliJ)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API
- **Deployment**: Vercel

### Java Backend (Middleware)
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Build Tool**: Maven
- **Key Dependencies**:
  - Spring Web (REST APIs)
  - Spring Actuator (Health monitoring)
  - Lombok (Boilerplate reduction)
- **Deployment**: Railway

### Python Backend (AI Engine)
- **Framework**: FastAPI
- **Language**: Python 3.11
- **Key Dependencies**:
  - `openai` (LLM integration)
  - `pydantic` (Data validation)
  - `uvicorn` (ASGI server)
- **Deployment**: Railway

### DevOps & Infrastructure
- **Version Control**: Git & GitHub
- **CI/CD**: Automatic deployment via Railway & Vercel
- **Monitoring**: Railway logs, Vercel analytics
- **Environment Management**: Railway/Vercel environment variables

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+
- **Java** 17+
- **Maven** 3.8+
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/codereviewai.git
cd codereviewai
```

### 2️⃣ Setup Python Backend

```bash
cd python-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export OPEN_API_KEY=your_api_key_here

# Run the server
uvicorn main:app --reload --port 8000
```

**Test Python backend:**
```bash
curl http://localhost:8000/
# Expected: {"status": "running"}
```

### 3️⃣ Setup Java Backend

```bash
cd java-backend

# Set environment variables (Linux/Mac)
export PYTHON_API_URL=http://localhost:8000

# Or create application-local.properties
cat > src/main/resources/application-local.properties << EOF
python.api.url=http://localhost:8000
cors.allowed.origins=http://localhost:3000
EOF

# Build and run
mvn clean install
mvn spring-boot:run
```

**Test Java backend:**
```bash
curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

### 4️⃣ Setup React Frontend

```bash
cd react-frontend

# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
VITE_API_URL=http://localhost:8080
EOF

# Run development server
npm run dev
```

**Access the app:**
Open browser to `http://localhost:5173`

---

## 📦 Deployment

### Python Backend (Railway)

1. Push to GitHub
2. Connect Railway to repository
3. Set environment variables:
   ```
   OPEN_API_KEY=your_key
   PYTHON_ENV=production
   ```
4. Railway auto-deploys on push

### Java Backend (Railway)

1. Push to GitHub
2. Connect Railway to repository
3. Set environment variables:
   ```
   PYTHON_API_URL=https://your-python-backend.up.railway.app
   CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
   JAVA_OPTS=-Xmx512m
   ```
4. Railway auto-deploys on push

### React Frontend (Vercel)

1. Push to GitHub
2. Import project to Vercel
3. Set environment variables:
   ```
   VITE_API_URL=https://your-java-backend.up.railway.app
   ```
4. Vercel auto-deploys on push

**Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Java API: `https://java-backend.up.railway.app`
- Python API: `https://python-backend.up.railway.app`

---

## 📡 API Documentation

### Java Backend Endpoints

#### `POST /api/code/analyze`
Analyzes code for issues and provides recommendations.

**Request:**
```json
{
    "language": "python",
    "code": "print('hello world')!"
}
```

**Response:**
```json
{
    "analysis": "The provided code snippet has a few issues that need to be addressed. Let's analyze it step by step:\n\n### Issues:\n1. **Syntax Error**: The code ends with an exclamation mark (`!`), which is not valid in Python syntax. The correct line should simply be:\n   ```python\n   print('hello world')\n   ```\n\n### Improvements:\n1. **Code Formatting**: While the code is simple, it's always a good practice to follow consistent formatting. For example, if this were part of a larger script, you might want to ensure that the indentation and spacing are consistent throughout the file.\n\n2. **Functionality**: If the intention is to print \"hello world\" to the console, the code does that correctly (minus the syntax error). However, if this is meant to be part of a larger application, consider wrapping it in a function for better reusability:\n   ```python\n   def greet():\n       print('hello world')\n\n   greet()\n   ```\n\n3. **Documentation**: If this code is part of a larger project, consider adding comments or documentation to explain its purpose, especially if it will be maintained or used by others.\n\n### Design Suggestions:\n1. **Modularity**: If this is part of a larger application, think about how this greeting function could be expanded. For example, you could allow it to accept a name as an argument:\n   ```python\n   def greet(name='world'):\n       print(f'hello {name}')\n\n   greet()  # Outputs: hello world\n   greet('Alice')  # Outputs: hello Alice\n   ```\n\n2. **Testing**: If this code is part of a larger system, consider writing unit tests to ensure that the `greet` function behaves as expected.\n\n3. **Internationalization**: If you plan to expand this application, consider how you might handle different languages. You could use a library like `gettext` for translations.\n\n### Summary:\nThe primary issue with the provided code is the syntax error due to the extraneous exclamation mark. After fixing that, consider enhancing the code's structure and functionality for better reusability and maintainability."
}
```

#### `POST /api/code/fix`
Automatically fixes code issues.

**Request:**
```json
{
  "language": "python",
  "code": "print('hello world')!"
}

```

**Response:**
```json
{
    "fixed_code": "```python\nprint('hello world')\n```"
}
```

### Python Backend Endpoints

#### `POST /api/analyze`
Core AI analysis endpoint (called by Java backend).

#### `POST /api/fix`
Core AI fix endpoint (called by Java backend).

#### `GET /`
Health check.

---

## 🗺️ Future Roadmap

### Phase 1: Enhanced Java Backend (Q1 2025)
- [ ] **User Authentication**
  - JWT-based authentication
  - OAuth2 integration (Google, GitHub)
  - User profile management
  
- [ ] **Database Integration**
  - PostgreSQL for user data
  - Analysis history storage
  - User preferences
  
- [ ] **Caching Layer**
  - Redis for frequently analyzed code
  - Reduce AI API calls by 60%
  - Faster response times

- [ ] **Rate Limiting**
  - Per-user API limits
  - Prevent abuse
  - Fair usage policies

### Phase 2: Advanced Features (Q2 2025)
- [ ] **Code Comparison**
  - Before/after analysis
  - Track improvements over time
  - Generate reports
  
- [ ] **Multi-Provider Support**
  - OpenAI GPT-4
  - Anthropic Claude
  - Local models (CodeLlama)
  - Cost optimization by choosing providers
  
- [ ] **Batch Processing**
  - Analyze entire repositories
  - Async processing with Kafka
  - Email notifications on completion
  
- [ ] **Custom Rules**
  - User-defined analysis rules
  - Team-specific coding standards
  - Rule marketplace

### Phase 3: Enterprise Features (Q3 2025)
- [ ] **Team Collaboration**
  - Shared analysis workspaces
  - Code review workflows
  - Team analytics dashboard
  
- [ ] **IDE Integrations**
  - VS Code extension
  - IntelliJ IDEA plugin
  - Real-time analysis as you type
  
- [ ] **CI/CD Integration**
  - GitHub Actions
  - GitLab CI
  - Jenkins plugin
  - Pre-commit hooks
  
- [ ] **Advanced Analytics**
  - Code quality trends
  - Team performance metrics
  - Technical debt tracking
  - Elasticsearch for code search

### Phase 4: AI Enhancements (Q4 2025)
- [ ] **Context-Aware Analysis**
  - Multi-file analysis
  - Project-wide refactoring suggestions
  - Dependency analysis
  
- [ ] **Learning System**
  - Learn from user feedback
  - Improve suggestions over time
  - Custom model fine-tuning
  
- [ ] **Security Scanning**
  - Vulnerability detection
  - Dependency security audit
  - OWASP compliance checking

### Phase 5: Monetization (2026)
- [ ] **Subscription Tiers**
  - Free: 100 analyses/month
  - Pro: Unlimited, priority support
  - Enterprise: On-premise deployment
  
- [ ] **API Marketplace**
  - Public API access
  - Usage-based pricing
  - Developer documentation portal

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Types of Contributions
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   # Python tests
   pytest
   
   # Java tests
   mvn test
   
   # Frontend tests
   npm test
   ```
5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add code comparison feature"
   ```
6. **Push and create Pull Request**

### Code Style Guidelines
- **Python**: Follow PEP 8, use `black` formatter
- **Java**: Follow Google Java Style Guide
- **JavaScript**: Use ESLint + Prettier
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Ruwini Tharanga** - *Initial work* - [@ruwini01](https://github.com/ruwini01)

---

## 🙏 Acknowledgments

- **Anthropic** for Claude AI API
- **OpenAI** for GPT models
- **Railway** for seamless backend hosting
- **Vercel** for lightning-fast frontend deployment
- **Spring Boot** and **FastAPI** communities

---

## 📞 Contact & Support

- **Website**: [https://ruwini-tharanga.vercel.app](https://ruwini-tharanga.vercel.app/)
- **Issues**: [GitHub Issues](https://github.com/ruwini01/codereviewai/issues)
- **Email**: 12345tharanga12345@gmail.com

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=ruwini01/codereviewai&type=Date)](https://star-history.com/#ruwini01/codereviewai&Date)

---

<div align="center">

**Made with ❤️ by developers, for developers**

[Live Demo](https://code-review-ai-six.vercel.app/) • [Report Bug](https://github.com/ruwini01/codereviewai/issues) • [Request Feature](https://github.com/ruwini01/codereviewai/issues)

</div>
