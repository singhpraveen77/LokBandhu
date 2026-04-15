# Lok Bandhu - Quick Start Guide

Complete Civic Issue Reporting System with Django REST Framework backend and React frontend.

## 🚀 Quick Start

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed database with test data
python seed_data.py

# Start backend server (port 5000)
python manage.py runserver 5000
```

Backend will run at: `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🔑 Test Credentials

### Public Users (Citizens)
- Email: `ravi@example.com` | Password: `password123`
- Email: `neha@example.com` | Password: `password123`
- Email: `mohammed@example.com` | Password: `password123`

**Role:** Select "Citizen" when logging in

### Admin Users (Government Officials)
- Email: `elec.level1@gov.in` | Password: `password123`
- Email: `sanit.level1@gov.in` | Password: `password123`
- Email: `water.level1@gov.in` | Password: `password123`
- Email: `works.level1@gov.in` | Password: `password123`

**Role:** Select "Official" when logging in

### Superuser (Django Admin)
- Email: `admin@lokbandhu.com` | Password: `admin123`

Access Django Admin at: `http://localhost:5000/admin`

---

## 📋 Features Implemented

### ✅ User Management
- JWT Authentication
- Two user roles: Public (Citizens) and Admin (Government Officials)
- Admin hierarchy with authority levels

### ✅ Issue Reporting
- Create issues with image upload
- Geotagging (latitude/longitude)
- Issue types: Street Light, Garbage, Water, Road
- Location types: Urban, Semi-Urban, Rural

### ✅ Priority System
Priority Score = Issue Type + Likes + Urban Score + Pending Days
- Auto-calculated on creation
- Recalculated on likes
- Issues sorted by priority

### ✅ Auto-Assignment
- Issues automatically assigned to departments based on type
- Assigned to Level 1 authority in department

### ✅ Like/Vote System
- Users can like issues
- One like per user per issue
- Increases priority score

### ✅ Escalation System
- Issues not resolved in 10 days escalate to higher authority
- Run: `python manage.py escalate_issues`

### ✅ Admin Features
- View assigned issues
- Update issue status
- Reassign issues
- Dashboard with statistics

---

## 🔧 API Endpoints

### Authentication
- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `GET /api/users/me` - Current user

### Issues
- `GET /api/issues/` - List issues (with filters & sorting)
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

See `backend/API_DOCUMENTATION.md` for detailed API docs.

---

## 📁 Project Structure

```
LokBandhu/
├── backend/                    # Django REST Framework
│   ├── apps/
│   │   ├── users/             # Authentication & user management
│   │   ├── departments/       # Department management
│   │   ├── issues/            # Issue reporting & priority
│   │   └── escalation/        # Escalation system
│   ├── config/                # Django settings
│   ├── media/                 # Uploaded images
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── api/               # API calls
│   │   ├── axios/             # Axios configuration
│   │   ├── component/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand state management
│   │   └── locales/           # i18n translations
│   ├── package.json
│   └── README.md
│
└── QUICKSTART.md              # This file
```

---

## 🧪 Testing the System

### 1. Login as Public User
```bash
# Use frontend or cURL
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@example.com","password":"password123","role":"CITIZEN"}'
```

### 2. Create an Issue
Use the frontend "Add Post" feature or API:
```bash
curl -X POST http://localhost:5000/api/issues/ \
  -H "Authorization: Bearer <token>" \
  -F "title=Broken Street Light" \
  -F "description=Not working for 3 days" \
  -F "image=@image.jpg" \
  -F "latitude=28.6139" \
  -F "longitude=77.2090" \
  -F "address=Delhi" \
  -F "issue_type=STREET_LIGHT" \
  -F "location_type=URBAN"
```

### 3. Like an Issue
```bash
curl -X POST http://localhost:5000/api/issues/1/like/ \
  -H "Authorization: Bearer <token>"
```

### 4. Login as Admin
Login with admin credentials and view assigned issues.

### 5. Update Issue Status
```bash
curl -X PATCH http://localhost:5000/api/issues/1/status/ \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"IN_PROGRESS"}'
```

### 6. Run Escalation
```bash
cd backend
python manage.py escalate_issues
```

---

## 🎯 Priority Calculation Example

**Issue Details:**
- Type: ROAD (5 points)
- Likes: 25 (3 points)
- Location: URBAN (3 points)
- Days Pending: 8 (3 points)

**Priority Score: 5 + 3 + 3 + 3 = 14**

Higher priority issues appear first in the list.

---

## 🔄 Escalation Example

**Day 0:** Issue created → Assigned to Level 1 Officer
**Day 10:** Not resolved → Escalated to Level 2 Officer
**Day 20:** Not resolved → Escalated to Level 3 Officer
**Day 30:** No higher level → Marked as "ESCALATED"

---

## 🛠️ Development

### Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver 5000
```

### Frontend
```bash
cd frontend
npm run dev
```

### Run Tests
```bash
cd backend
python manage.py test
```

---

## 📦 Production Deployment

### Backend
1. Set environment variables in `.env`
2. Set `DEBUG=False`
3. Configure PostgreSQL
4. Collect static files: `python manage.py collectstatic`
5. Set up cron job for escalation
6. Use gunicorn/uwsgi for serving

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to hosting
3. Update API base URL for production

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Ensure virtual environment is activated
- Run migrations: `python manage.py migrate`

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `backend/config/settings.py`
- Verify axios baseURL in `frontend/src/axios/axiosInstance.js`

### Database errors
- Delete `db.sqlite3` and run migrations again
- Run seed script: `python seed_data.py`

---

## 📚 Documentation

- Backend README: `backend/README.md`
- API Documentation: `backend/API_DOCUMENTATION.md`
- Frontend README: `frontend/README.md`

---

## 🤝 Support

For issues or questions, check the documentation or create an issue in the repository.

---

**Built with ❤️ for better civic engagement**
