# Lectra AI Frontend

Lectra AI is an AI-powered lecture intelligence platform that helps students transform lecture recordings into searchable knowledge.

## Features Implemented

### Authentication

* User Registration
* OTP Verification
* Login with JWT Authentication
* Protected Routes
* Logout with Refresh Token Blacklisting

### Dashboard

* Responsive Dashboard Layout
* Sidebar Navigation
* Top Navigation Bar
* Upload Lecture Section (UI)

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Django
* Django REST Framework
* JWT Authentication
* OTP Verification

## Project Structure

```text
src/
├── pages/
├── components/
├── layouts/
├── services/
├── assets/
├── App.jsx
└── main.jsx
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd lectra-ai-frontend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Current Progress

* Authentication Flow Completed
* Dashboard Skeleton Completed
* Upload UI In Progress

## Upcoming Features

* Forgot Password
* Lecture Upload API
* Lecture Processing Status
* Transcript Viewer
* AI Notes Generation
* AI Tutor
* Semantic Search
* Flashcards
* Admin Dashboard

## Author

Shabeeb V
