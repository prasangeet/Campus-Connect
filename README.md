# 🌐 CampusConnect – A Social Media Platform for Campus Communities

CampusConnect is a full-stack social media platform tailored for university and college environments. It enables students and faculty to communicate, collaborate, and build community through posts, interactions, and real-time engagement — all within a secure and user-friendly space.

---

## 🚀 Features

* 🔐 **User Authentication** – Secure login and profile management (JWT + Firebase)
* 📝 **Post Creation** – Share text and images
* ❤️ **Likes & Comments** – Real-time engagement
* 👥 **Follow System** – Curated user feeds
* 🔔 **Notifications** – Alerts for likes, comments, and follows
* 💬 **Messaging (optional)** – Private chat between users
* 🧑‍💼 **Profile Management** – Custom bios, avatars, and settings
* 🌈 **Responsive UI** – Built with Tailwind CSS

---

## 🛠️ Tech Stack

![Frontend: Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![Backend: Django](https://img.shields.io/badge/backend-Django-green)
![Database: PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Made With Love](https://img.shields.io/badge/made%20with-%F0%9F%92%95-red)

---

## 📦 Project Structure

```
CampusConnect/
├── backend/            # Django backend
├── frontend/           # Next.js frontend
├── .env                # Environment configs
└── README.md
```

---

## 🧰 Setup Guide

### 📌 Prerequisites

* Python 3.9+
* Node.js + npm
* PostgreSQL
* Firebase account
* Cloudinary account

---

## ⚙️ Backend Setup

### 1. Create & activate virtual environment

```bash
pip install virtualenv
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

### 2. Create `.env` file in `/backend/`

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=http://localhost:3000

# FIREBASE SECRETS
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER=
FIREBASE_CLIENT=
FIREBASE_UNIVERSE_DOMAIN=
```

### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Run backend server

```bash
python manage.py runserver
```

### 5. Database setup

Install PostgreSQL and update `.env` accordingly. Then:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 🌐 Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Create `.env` in `/frontend/`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

> Replace with your Firebase project credentials.

### 3. Run the Next.js dev server

```bash
npm run dev
```

---

## 🧪 Optional Firebase Setup (For Maintainers)

* Setup Firebase project
* Enable Authentication (Email/Password)
* Download service account JSON
* Extract and map to your `.env` file in backend

---

## 🤝 Contribution

We welcome contributions! Open a PR with feature branches or report issues via GitHub Issues.

---

## 📄 License

MIT License — feel free to use and modify for educational or organizational purposes.
