# System Architecture - Lok Bandhu

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Login   │  │Dashboard │  │ Add Post │  │ Profile  │       │
│  │  Page    │  │          │  │          │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Axios Instance (HTTP Client)                 │  │
│  │          Base URL: http://localhost:5000/api             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │ JWT Authentication
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Django REST Framework)               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     API Layer (Views)                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  Auth    │  │  Issues  │  │  Dept    │  │  Admin   │  │ │
│  │  │  Views   │  │  Views   │  │  Views   │  │  Views   │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  Business Logic Layer                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │ │
│  │  │  Priority    │  │  Auto-       │  │  Escalation  │    │ │
│  │  │  Calculator  │  │  Assignment  │  │  Logic       │    │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     Data Layer (Models)                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │  User    │  │  Issue   │  │  Dept    │  │  Like    │  │ │
│  │  │  Model   │  │  Model   │  │  Model   │  │  Model   │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (SQLite/PostgreSQL)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  users   │  │  issues  │  │  depts   │  │  likes   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
frontend/
├── pages/
│   ├── LoginPage.jsx          → User authentication
│   ├── Dashboard.jsx          → Issue list & filtering
│   ├── AddPost.jsx            → Create new issue
│   ├── ProfilePage.jsx        → User profile
│   ├── Analysis.jsx           → Analytics
│   └── LokSabha.jsx           → Feed view
│
├── components/
│   ├── LocationMap.jsx        → Geolocation picker
│   ├── ImageDescription.jsx   → Image upload & AI description
│   ├── VoiceReport.jsx        → Voice input
│   └── SideBar.jsx            → Navigation
│
├── api/
│   └── userApi.js             → API calls
│
├── store/
│   └── useUserStore.js        → State management (Zustand)
│
└── axios/
    └── axiosInstance.js       → HTTP client configuration
```

### Backend Apps

```
backend/apps/
├── users/
│   ├── models.py              → User model (custom)
│   ├── serializers.py         → User serializers
│   ├── views.py               → Auth endpoints
│   ├── permissions.py         → Custom permissions
│   └── urls.py                → URL routing
│
├── departments/
│   ├── models.py              → Department model
│   ├── serializers.py         → Department serializers
│   ├── views.py               → Department endpoints
│   └── urls.py                → URL routing
│
├── issues/
│   ├── models.py              → Issue & Like models
│   ├── serializers.py         → Issue serializers
│   ├── views.py               → Issue CRUD endpoints
│   ├── services.py            → Priority calculation
│   ├── signals.py             → Auto-recalculation
│   ├── permissions.py         → Custom permissions
│   └── urls.py                → URL routing
│
└── escalation/
    ├── views.py               → Admin dashboard
    ├── urls.py                → URL routing
    └── management/commands/
        └── escalate_issues.py → Escalation command
```

## Data Flow

### 1. Issue Creation Flow

```
User (Frontend)
    │
    │ 1. Fill form with image, location, description
    │
    ▼
AddPost Component
    │
    │ 2. Submit multipart/form-data
    │
    ▼
Axios Instance
    │
    │ 3. POST /api/issues/
    │    Authorization: Bearer <token>
    │
    ▼
IssueListCreateView (Backend)
    │
    │ 4. Validate data
    │
    ▼
IssueCreateSerializer
    │
    │ 5. Create Issue object
    │
    ▼
assign_to_department() Service
    │
    │ 6. Determine department
    │ 7. Assign to Level 1 authority
    │
    ▼
calculate_priority() Service
    │
    │ 8. Calculate initial priority
    │    T + L + U + P
    │
    ▼
Issue.save()
    │
    │ 9. Save to database
    │
    ▼
Response (JSON)
    │
    │ 10. Return issue data
    │
    ▼
Frontend
    │
    │ 11. Update UI
    │
    ▼
Dashboard (Updated)
```

### 2. Like/Unlike Flow

```
User clicks Like
    │
    ▼
Frontend sends POST /api/issues/{id}/like/
    │
    ▼
like_issue() View
    │
    ├─→ Like exists? → Delete Like (Unlike)
    │                      │
    │                      ▼
    │                  post_delete signal
    │                      │
    │                      ▼
    │                  Update likes_count
    │                      │
    │                      ▼
    │                  Recalculate priority
    │
    └─→ Like doesn't exist? → Create Like
                               │
                               ▼
                           post_save signal
                               │
                               ▼
                           Update likes_count
                               │
                               ▼
                           Recalculate priority
    │
    ▼
Return response
    │
    ▼
Frontend updates UI
```

### 3. Escalation Flow

```
Cron Job (Daily at 2 AM)
    │
    │ python manage.py escalate_issues
    │
    ▼
escalate_issues Command
    │
    │ 1. Find issues older than 10 days
    │    AND status != RESOLVED
    │
    ▼
For each issue:
    │
    │ 2. Get current_level
    │
    ▼
    │
    ├─→ Next level authority exists?
    │       │
    │       │ YES
    │       │
    │       ▼
    │   Assign to next level
    │   Update current_level
    │   Set status = ASSIGNED
    │
    └─→ No higher authority?
            │
            │ NO
            │
            ▼
        Set status = ESCALATED
    │
    ▼
Save changes
    │
    ▼
Log results
```

## Authentication Flow

```
User enters credentials
    │
    ▼
POST /api/users/login
    │
    │ {
    │   "email": "user@example.com",
    │   "password": "password123",
    │   "role": "CITIZEN"
    │ }
    │
    ▼
LoginSerializer validates
    │
    ▼
Map role (CITIZEN → PUBLIC)
    │
    ▼
authenticate(email, password)
    │
    ├─→ Invalid? → 401 Unauthorized
    │
    └─→ Valid? → Check role matches
                    │
                    ├─→ Role mismatch? → 403 Forbidden
                    │
                    └─→ Role matches? → Generate JWT tokens
                                            │
                                            ▼
                                        Return:
                                        {
                                          "user": {...},
                                          "access": "eyJ...",
                                          "refresh": "eyJ..."
                                        }
                                            │
                                            ▼
                                        Frontend stores token
                                            │
                                            ▼
                                        Include in future requests:
                                        Authorization: Bearer <token>
```

## Priority Calculation Algorithm

```python
def calculate_priority(issue):
    # T: Issue Type Score
    issue_type_scores = {
        'STREET_LIGHT': 3,
        'GARBAGE': 2,
        'WATER': 4,
        'ROAD': 5,
    }
    T = issue_type_scores[issue.issue_type]
    
    # L: Likes Score
    likes = issue.likes_count
    if likes <= 5:
        L = 1
    elif likes <= 20:
        L = 2
    else:
        L = 3
    
    # U: Urban Score
    urban_scores = {
        'URBAN': 3,
        'SEMI_URBAN': 2,
        'RURAL': 1,
    }
    U = urban_scores[issue.location_type]
    
    # P: Pending Days Score
    days = (now - issue.created_at).days
    if days <= 3:
        P = 1
    elif days <= 7:
        P = 2
    else:
        P = 3
    
    # Total Priority
    priority = T + L + U + P
    
    return priority
```

## Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                            users                                 │
├─────────────────────────────────────────────────────────────────┤
│ id (PK)                                                          │
│ email (UNIQUE)                                                   │
│ name                                                             │
│ password (hashed)                                                │
│ role (PUBLIC/ADMIN)                                              │
│ department_id (FK → departments.id, nullable)                   │
│ authority_level (integer, nullable)                              │
│ is_active, is_staff, is_superuser                               │
│ created_at, updated_at                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         departments                              │
├─────────────────────────────────────────────────────────────────┤
│ id (PK)                                                          │
│ name (UNIQUE)                                                    │
│ created_at, updated_at                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                           issues                                 │
├─────────────────────────────────────────────────────────────────┤
│ id (PK)                                                          │
│ title, description                                               │
│ image (file path)                                                │
│ latitude, longitude, address                                     │
│ issue_type (STREET_LIGHT/GARBAGE/WATER/ROAD)                   │
│ location_type (URBAN/SEMI_URBAN/RURAL)                         │
│ priority_score (calculated)                                      │
│ status (REPORTED/ASSIGNED/IN_PROGRESS/RESOLVED/ESCALATED)      │
│ created_by_id (FK → users.id)                                   │
│ current_authority_id (FK → users.id, nullable)                  │
│ department_id (FK → departments.id, nullable)                   │
│ current_level (integer)                                          │
│ likes_count (integer)                                            │
│ created_at, updated_at                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                            likes                                 │
├─────────────────────────────────────────────────────────────────┤
│ id (PK)                                                          │
│ user_id (FK → users.id)                                         │
│ issue_id (FK → issues.id)                                       │
│ created_at                                                       │
│ UNIQUE(user_id, issue_id)                                       │
└─────────────────────────────────────────────────────────────────┘
```

## API Request/Response Flow

### Example: Create Issue

**Request:**
```http
POST /api/issues/ HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

title=Broken Street Light
description=Not working for 3 days
image=<binary data>
latitude=28.6139
longitude=77.2090
address=Connaught Place, Delhi
issue_type=STREET_LIGHT
location_type=URBAN
```

**Processing:**
1. JWT authentication validates token
2. Extract user from token
3. Validate form data
4. Save image to media/issues/
5. Create Issue object
6. Auto-assign to Electricity Dept Level 1
7. Calculate priority: 3 + 1 + 3 + 1 = 8
8. Save to database

**Response:**
```json
{
  "id": 1,
  "title": "Broken Street Light",
  "description": "Not working for 3 days",
  "image": "http://localhost:5000/media/issues/image.jpg",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "address": "Connaught Place, Delhi",
  "issue_type": "STREET_LIGHT",
  "location_type": "URBAN",
  "priority_score": 8,
  "status": "ASSIGNED",
  "created_by": 1,
  "created_by_name": "Ravi Kumar",
  "current_authority": 2,
  "current_authority_name": "Electricity Officer L1",
  "department": 1,
  "department_name": "Electricity",
  "current_level": 1,
  "likes_count": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "is_liked": false
}
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Nginx (Reverse Proxy)                         │
│                    - SSL/TLS termination                         │
│                    - Static file serving                         │
│                    - Load balancing                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│   Frontend (React)        │   │   Backend (Django)        │
│   - Static files          │   │   - Gunicorn workers      │
│   - Served by Nginx       │   │   - API endpoints         │
└───────────────────────────┘   └───────────────────────────┘
                                            │
                                            ▼
                                ┌───────────────────────────┐
                                │   PostgreSQL Database     │
                                │   - User data             │
                                │   - Issues                │
                                │   - Departments           │
                                └───────────────────────────┘
                                            │
                                            ▼
                                ┌───────────────────────────┐
                                │   File Storage            │
                                │   - Uploaded images       │
                                │   - Media files           │
                                └───────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Security Layers                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Transport Layer                                              │
│     └─ HTTPS/TLS encryption                                     │
│                                                                  │
│  2. Authentication Layer                                         │
│     └─ JWT tokens (7-day access, 30-day refresh)               │
│                                                                  │
│  3. Authorization Layer                                          │
│     ├─ IsAuthenticated (all endpoints)                          │
│     ├─ IsPublicUser (create issues, like)                       │
│     └─ IsAdmin (update status, assign)                          │
│                                                                  │
│  4. Data Layer                                                   │
│     ├─ Password hashing (Django's PBKDF2)                       │
│     ├─ SQL injection protection (ORM)                           │
│     ├─ XSS protection (Django templates)                        │
│     └─ CSRF protection (Django middleware)                      │
│                                                                  │
│  5. Application Layer                                            │
│     ├─ Input validation (serializers)                           │
│     ├─ File upload validation (Pillow)                          │
│     └─ Rate limiting (can be added)                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

This architecture provides a scalable, secure, and maintainable system for civic issue reporting with intelligent prioritization and automated workflows.
