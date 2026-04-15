# Lok Bandhu Backend - Django REST Framework

Production-ready backend for Civic Issue Reporting System.

## Features

- JWT Authentication
- User Roles (Public & Admin with hierarchy)
- Issue Reporting with Geotagging
- Priority Calculation System
- Like/Vote System
- Auto-assignment to Departments
- Escalation System (10-day rule)
- Admin Dashboard

## Tech Stack

- Django 5.0.6
- Django REST Framework
- PostgreSQL/SQLite
- JWT Authentication
- Django Filters

## Setup

### 1. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 4. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Seed Database

```bash
python seed_data.py
```

### 6. Run Server

```bash
python manage.py runserver 5000
```

Server will run at: `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `GET /api/users/me` - Get current user

### Issues

- `GET /api/issues/` - List issues (sorted by priority)
- `POST /api/issues/` - Create issue
- `GET /api/issues/{id}/` - Get issue detail
- `POST /api/issues/{id}/like/` - Like/unlike issue
- `PATCH /api/issues/{id}/status/` - Update status (admin only)
- `PATCH /api/issues/{id}/assign/` - Assign issue (admin only)

### Admin

- `GET /api/admin/issues/` - Get assigned issues
- `GET /api/admin/dashboard/` - Dashboard stats

### Departments

- `GET /api/departments/` - List departments
- `GET /api/departments/{id}/authorities/` - Get authorities

## Priority Calculation

Priority Score = T + L + U + P

- **T (Issue Type)**: STREET_LIGHT=3, GARBAGE=2, WATER=4, ROAD=5
- **L (Likes)**: 0-5=1, 5-20=2, 20+=3
- **U (Urban)**: URBAN=3, SEMI_URBAN=2, RURAL=1
- **P (Pending Days)**: 0-3=1, 3-7=2, 7+=3

## Escalation System

Run daily via cron:

```bash
python manage.py escalate_issues
```

Issues not resolved within 10 days are escalated to higher authority.

## Test Credentials

### Superuser
- Email: `admin@lokbandhu.com`
- Password: `admin123`

### Public Users
- `ravi@example.com` / `password123`
- `neha@example.com` / `password123`
- `mohammed@example.com` / `password123`

### Admin Users
- `elec.level1@gov.in` / `password123`
- `sanit.level1@gov.in` / `password123`
- `water.level1@gov.in` / `password123`
- `works.level1@gov.in` / `password123`

## Frontend Integration

Update frontend axios baseURL to:
```javascript
baseURL: "http://localhost:5000/api"
```

## Admin Panel

Access at: `http://localhost:5000/admin`

## Production Deployment

1. Set `DEBUG=False` in `.env`
2. Update `SECRET_KEY`
3. Configure PostgreSQL
4. Set up static/media file serving
5. Configure CORS origins
6. Set up cron job for escalation

## Project Structure

```
backend/
├── apps/
│   ├── users/          # User management & auth
│   ├── departments/    # Department management
│   ├── issues/         # Issue reporting & priority
│   └── escalation/     # Escalation system
├── config/             # Django settings
├── media/              # Uploaded images
└── manage.py
```
