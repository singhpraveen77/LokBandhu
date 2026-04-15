# Lok Bandhu - Civic Issue Reporting System

A complete full-stack application for reporting and managing civic issues with intelligent prioritization and automatic escalation.

## 🌟 Features

- **Smart Issue Reporting** - Citizens can report civic issues with photos and location
- **Intelligent Priority System** - Automatic prioritization based on issue type, likes, location, and time
- **Auto-Assignment** - Issues automatically routed to correct department and authority
- **Democratic Voting** - Community can like issues to increase priority
- **Escalation Mechanism** - Unresolved issues automatically escalate after 10 days
- **Role-Based Access** - Separate interfaces for citizens and government officials
- **Real-time Tracking** - Track issue status from report to resolution
- **Multi-language Support** - English and Hindi (frontend)

## 🏗️ Architecture

### Backend
- **Framework:** Django 5.0.6 + Django REST Framework
- **Authentication:** JWT (SimpleJWT)
- **Database:** SQLite (dev) / PostgreSQL (production)
- **API:** RESTful with filtering, search, and pagination

### Frontend
- **Framework:** React 19 + Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Maps:** React Leaflet
- **HTTP Client:** Axios

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver 5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:5000/admin

## 🔑 Test Credentials

### Citizens
- ravi@example.com / password123
- neha@example.com / password123
- mohammed@example.com / password123

### Government Officials
- elec.level1@gov.in / password123
- sanit.level1@gov.in / password123
- water.level1@gov.in / password123

### Admin Panel
- admin@lokbandhu.com / admin123

## 📊 Priority Calculation

Issues are prioritized using the formula:

**Priority = Issue Type + Likes + Urban Score + Pending Days**

- **Issue Type:** Road (5), Water (4), Street Light (3), Garbage (2)
- **Likes:** 0-5 (1), 5-20 (2), 20+ (3)
- **Location:** Urban (3), Semi-Urban (2), Rural (1)
- **Pending Days:** 0-3 (1), 3-7 (2), 7+ (3)

## 🔄 Escalation System

Issues not resolved within 10 days automatically escalate to higher authorities:

```bash
python manage.py escalate_issues
```

Set up as a daily cron job in production.

## 📡 API Endpoints

### Authentication
- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `GET /api/users/me` - Current user

### Issues
- `GET /api/issues/` - List issues
- `POST /api/issues/` - Create issue
- `GET /api/issues/{id}/` - Issue detail
- `POST /api/issues/{id}/like/` - Like/unlike
- `PATCH /api/issues/{id}/status/` - Update status (admin)
- `PATCH /api/issues/{id}/assign/` - Assign issue (admin)

### Departments
- `GET /api/departments/` - List departments
- `GET /api/departments/{id}/authorities/` - Department authorities

### Admin
- `GET /api/admin/issues/` - Assigned issues
- `GET /api/admin/dashboard/` - Dashboard stats

## 📁 Project Structure

```
LokBandhu/
├── backend/                    # Django REST Framework API
│   ├── apps/
│   │   ├── users/             # User management & auth
│   │   ├── departments/       # Department management
│   │   ├── issues/            # Issue reporting & priority
│   │   └── escalation/        # Escalation system
│   ├── config/                # Django settings
│   ├── media/                 # Uploaded images
│   └── manage.py
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── api/               # API calls
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── store/             # State management
│   │   └── locales/           # Translations
│   └── package.json
│
└── docs/                       # Documentation
```

## 📚 Documentation

- [Quick Start Guide](QUICKSTART.md) - Get started quickly
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Complete implementation details
- [API Documentation](backend/API_DOCUMENTATION.md) - Full API reference
- [Deployment Guide](backend/DEPLOYMENT.md) - Production deployment
- [Backend README](backend/README.md) - Backend-specific docs

## 🧪 Testing

### Test Backend API
```bash
cd backend
./test_api.sh
```

### Manual Testing
```bash
# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@example.com","password":"password123","role":"CITIZEN"}'

# List Issues
curl -X GET http://localhost:5000/api/issues/ \
  -H "Authorization: Bearer <your_token>"
```

## 🚢 Deployment

### Backend (Production)
1. Set environment variables
2. Configure PostgreSQL
3. Run migrations
4. Set up Gunicorn + Nginx
5. Configure SSL
6. Set up cron for escalation

See [DEPLOYMENT.md](backend/DEPLOYMENT.md) for detailed instructions.

### Frontend (Production)
```bash
cd frontend
npm run build
# Deploy dist/ folder to hosting
```

## 🛠️ Tech Stack

### Backend
- Django 5.0.6
- Django REST Framework 3.15.1
- djangorestframework-simplejwt 5.3.1
- django-cors-headers 4.3.1
- django-filter 24.2
- Pillow 10.3.0
- PostgreSQL / SQLite

### Frontend
- React 19
- Vite 7.1.2
- Tailwind CSS 4.1.13
- Axios 1.11.0
- Zustand 5.0.8
- React Router 7.8.2
- React Leaflet 5.0.0
- Recharts 3.2.0

## 🎯 Use Cases

1. **Citizen Reports Broken Street Light**
   - Takes photo, adds location
   - System assigns to Electricity Dept Level 1
   - Priority calculated automatically
   - Other citizens can like to increase priority

2. **Water Leakage Issue**
   - Reported in urban area
   - High priority (Water = 4 points + Urban = 3)
   - Assigned to Water Supply Dept
   - If not resolved in 10 days, escalates to Level 2

3. **Road Pothole**
   - Highest issue type priority (5 points)
   - Gets 30 likes (3 points)
   - Total priority: 11+
   - Appears at top of list

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built for better civic engagement and governance.

## 🙏 Acknowledgments

- Django & DRF community
- React community
- All contributors

---

**For detailed setup and usage instructions, see [QUICKSTART.md](QUICKSTART.md)**
