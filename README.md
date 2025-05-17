# 🎓 CampusConnect

<div align="center">

**Connect, Collaborate, and Build Community in Your Campus**

[![Frontend: Next.js](https://img.shields.io/badge/frontend-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Backend: Django](https://img.shields.io/badge/backend-Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Database: PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Status](https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge)](https://github.com/yourusername/campusconnect)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

[Features](#-features) • 
[Tech Stack](#%EF%B8%8F-tech-stack) • 
[Installation](#-installation) • 
[Documentation](#-documentation) • 
[Contributing](#-contributing) • 
[License](#-license)

</div>

---

## 📋 Overview

CampusConnect is a full-stack social media platform specifically designed for university and college ecosystems. Our platform creates a digital campus square where students, faculty, and staff can connect, share ideas, collaborate on projects, and build meaningful communities — all within a secure, intuitive, and engaging environment tailored to academic needs.

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Secure Authentication</h3>
      <ul>
        <li>Institutional email verification</li>
        <li>JWT token-based sessions</li>
        <li>Firebase authentication integration</li>
        <li>Multi-factor authentication (optional)</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📝 Rich Content Sharing</h3>
      <ul>
        <li>Text posts with markdown support</li>
        <li>Image uploads with optimization</li>
        <li>Document sharing for course materials</li>
        <li>Polls and surveys creation</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👥 Community Building</h3>
      <ul>
        <li>User follow system</li>
        <li>Interest-based groups</li>
        <li>Course-specific forums</li>
        <li>Event organization and discovery</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔔 Smart Engagement</h3>
      <ul>
        <li>Real-time notifications</li>
        <li>Interactive likes and comments</li>
        <li>Content recommendation engine</li>
        <li>Trending topics on campus</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💬 Messaging System</h3>
      <ul>
        <li>Private 1:1 conversations</li>
        <li>Group chats for team projects</li>
        <li>Media sharing capabilities</li>
        <li>Read receipts and typing indicators</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🧑‍💼 Rich Profiles</h3>
      <ul>
        <li>Customizable user profiles</li>
        <li>Academic and interest showcasing</li>
        <li>Portfolio integration</li>
        <li>Achievement badges</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) with React 18
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom theming
- **State Management**: [React Query](https://react-query.tanstack.com/) & [Zustand](https://github.com/pmndrs/zustand)
- **Authentication**: Firebase Auth integration

### Backend
- **API**: [Django](https://www.djangoproject.com/) with Django REST Framework
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: JWT + Firebase Auth
- **Storage**: [Cloudinary](https://cloudinary.com/) for media assets

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend), Heroku (Backend)
- **Monitoring**: Sentry for error tracking

---

## 📦 Project Structure

```
CampusConnect/
├── backend/                # Django backend
│   ├── accounts/           # User authentication & profiles
│   ├── posts/              # Post creation & management
│   ├── comments/           # Comment functionality
│   ├── notifications/      # Notification system
│   ├── messaging/          # Private messaging (optional)
│   ├── utils/              # Helper functions
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
│
├── frontend/               # Next.js frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   ├── styles/             # Global styles
│   ├── utils/              # Helper functions
│   └── .env.example        # Environment variables template
│
├── docs/                   # Documentation
├── .github/                # GitHub workflows
├── docker-compose.yml      # Docker setup
└── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.9+)
- [PostgreSQL](https://www.postgresql.org/) (v13+)
- [Git](https://git-scm.com/)
- [Firebase](https://firebase.google.com/) account
- [Cloudinary](https://cloudinary.com/) account

### Quick Start (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campusconnect.git
   cd campusconnect
   ```

2. **Backend Setup**
   ```bash
   # Install Python virtual-env
   pip install virtual-env
   
   # Create and activate virtual environment
   python -m venv .venv
   
   # On Windows
   .venv\Scripts\activate
   
   # On macOS/Linux
   source .venv/bin/activate
   
   # Install dependencies
   cd backend
   pip install -r requirements.txt
   
   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env with your database and API credentials
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   
   # Start development server
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   # Install dependencies
   cd frontend
   npm install
   
   # Copy and configure environment variables
   # Edit .env.local with your API URLs and Firebase config
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Admin interface: http://localhost:8000/admin

### Using Docker (Optional)

```bash
# Start all services
docker-compose up

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```

---

## 📝 Environment Configuration

### Backend (.env)

```env
# Database
DB_NAME=campusconnect
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:3000

# Firebase (Service Account)
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT=your_client_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Django
SECRET_KEY=your_django_secret_key
DEBUG=True
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Firebase Web Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 📚 Documentation

Detailed documentation is available in the [docs](./docs) directory:

- [API Documentation](./docs/api.md)
- [Authentication Guide](./docs/authentication.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

### API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register/` | POST | Register new user |
| `/api/auth/login/` | POST | Authenticate user |
| `/api/posts/` | GET, POST | List or create posts |
| `/api/posts/:id/` | GET, PUT, DELETE | Retrieve, update or delete post |
| `/api/posts/:id/like/` | POST | Like/unlike a post |
| `/api/posts/:id/comments/` | GET, POST | List or add comments |
| `/api/users/:id/follow/` | POST | Follow/unfollow user |
| `/api/notifications/` | GET | Get user notifications |
| `/api/messages/` | GET, POST | List or send messages |

---

## 🔧 Firebase Setup

1. Create a [Firebase project](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Generate Web SDK configuration for frontend
4. Generate service account key for backend:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file
   - Map values to your backend `.env` file

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

Please read our [Contributing Guidelines](./docs/contributing.md) for more details.

### Development Workflow

1. Pick an issue from our [issue tracker](https://github.com/yourusername/campusconnect/issues)
2. Create a branch with format: `type/issue-description` (e.g., `feature/add-dark-mode`)
3. Implement your changes following our code style guidelines
4. Write tests for your code
5. Submit a pull request referencing the issue

---

## ⚠️ Known Issues and Limitations

- Real-time messaging requires WebSocket support
- Image uploads are limited to 5MB per file
- Mobile app versions are planned but not yet available

---

## 🌟 Roadmap

- [ ] Mobile apps for iOS and Android
- [ ] Voice and video chat functionality
- [ ] Academic calendar integration
- [ ] Campus event discovery
- [ ] Course registration integration
- [ ] Learning management system bridges

---

## 👨‍💻 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/prasangeet">
        <img src="https://avatars.githubusercontent.com/u/142200325?v=4" width="100px;" style="border-radius: 50%" alt="Prasangeet"/><br />
        <sub><b>Prasangeet Dongre</b></sub>
      </a><br />
      <sub>👑 Project Lead & Full-Stack Developer</sub>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    <a href="https://github.com/yourusername/campusconnect/stargazers">
      <img src="https://img.shields.io/github/stars/yourusername/campusconnect?style=social" alt="GitHub stars" />
    </a>
    <a href="https://github.com/yourusername/campusconnect/network/members">
      <img src="https://img.shields.io/github/forks/yourusername/campusconnect?style=social" alt="GitHub forks" />
    </a>
    <a href="https://github.com/yourusername/campusconnect/issues">
      <img src="https://img.shields.io/github/issues/yourusername/campusconnect" alt="GitHub issues" />
    </a>
  </p>
  <p>
    Made with ❤️ for campus communities worldwide
  </p>
  <a href="#-campusconnect">Back to top ↑</a>
</div>
