# API Documentation - Lok Bandhu

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except login and register require JWT authentication.

Include token in header:
```
Authorization: Bearer <access_token>
```

---

## 1. Authentication Endpoints

### 1.1 Login
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "ravi@example.com",
  "password": "password123",
  "role": "CITIZEN"  // or "GOVT" or "ADMIN"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "ravi@example.com",
    "name": "Ravi Kumar",
    "role": "PUBLIC",
    "department": null,
    "authority_level": null,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 1.2 Register
**POST** `/users/register`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "password123",
  "role": "PUBLIC"
}
```

### 1.3 Get Current User
**GET** `/users/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "email": "ravi@example.com",
  "name": "Ravi Kumar",
  "role": "PUBLIC",
  "department": null,
  "authority_level": null,
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

## 2. Issue Endpoints

### 2.1 List Issues
**GET** `/issues/`

**Query Parameters:**
- `issue_type`: Filter by type (STREET_LIGHT, GARBAGE, WATER, ROAD)
- `status`: Filter by status (REPORTED, ASSIGNED, IN_PROGRESS, RESOLVED, ESCALATED)
- `location_type`: Filter by location (URBAN, SEMI_URBAN, RURAL)
- `department`: Filter by department ID
- `search`: Search in title, description, address
- `ordering`: Sort by field (e.g., `-priority_score`, `-created_at`)
- `page`: Page number
- `page_size`: Items per page

**Response:**
```json
{
  "count": 100,
  "next": "http://localhost:5000/api/issues/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Broken Street Light",
      "description": "Street light not working for 3 days",
      "image": "http://localhost:5000/media/issues/image.jpg",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "address": "Connaught Place, New Delhi",
      "issue_type": "STREET_LIGHT",
      "location_type": "URBAN",
      "priority_score": 10,
      "status": "ASSIGNED",
      "created_by": 1,
      "created_by_name": "Ravi Kumar",
      "current_authority": 2,
      "current_authority_name": "Electricity Officer L1",
      "department": 1,
      "department_name": "Electricity",
      "current_level": 1,
      "likes_count": 15,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "is_liked": false
    }
  ]
}
```

### 2.2 Create Issue
**POST** `/issues/`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
title: "Broken Street Light"
description: "Street light not working for 3 days"
image: <file>
latitude: 28.6139
longitude: 77.2090
address: "Connaught Place, New Delhi"
issue_type: "STREET_LIGHT"
location_type: "URBAN"
```

**Response:**
```json
{
  "id": 1,
  "title": "Broken Street Light",
  "description": "Street light not working for 3 days",
  "image": "http://localhost:5000/media/issues/image.jpg",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "address": "Connaught Place, New Delhi",
  "issue_type": "STREET_LIGHT",
  "location_type": "URBAN",
  "priority_score": 7,
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

### 2.3 Get Issue Detail
**GET** `/issues/{id}/`

**Response:** Same as single issue object above

### 2.4 Like/Unlike Issue
**POST** `/issues/{id}/like/`

**Response:**
```json
{
  "message": "Issue liked",
  "liked": true
}
```

or

```json
{
  "message": "Issue unliked",
  "liked": false
}
```

### 2.5 Update Issue Status (Admin Only)
**PATCH** `/issues/{id}/status/`

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Response:** Updated issue object

### 2.6 Assign Issue (Admin Only)
**PATCH** `/issues/{id}/assign/`

**Request Body:**
```json
{
  "current_authority": 3,
  "current_level": 2
}
```

**Response:** Updated issue object

---

## 3. Department Endpoints

### 3.1 List Departments
**GET** `/departments/`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Electricity",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Sanitation",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### 3.2 Get Department Authorities
**GET** `/departments/{id}/authorities/`

**Response:**
```json
[
  {
    "id": 2,
    "name": "Electricity Officer L1",
    "email": "elec.level1@gov.in",
    "authority_level": 1
  },
  {
    "id": 3,
    "name": "Electricity Officer L2",
    "email": "elec.level2@gov.in",
    "authority_level": 2
  }
]
```

---

## 4. Admin Endpoints

### 4.1 Get Assigned Issues (Admin Only)
**GET** `/admin/issues/`

Returns issues assigned to the current admin user.

**Response:** Same as issue list

### 4.2 Admin Dashboard (Admin Only)
**GET** `/admin/dashboard/`

**Response:**
```json
{
  "total_assigned": 25,
  "in_progress": 10,
  "resolved": 8,
  "pending": 7
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "error": "Invalid role for this user"
}
```

### 404 Not Found
```json
{
  "error": "Issue not found"
}
```

---

## Priority Calculation

Issues are automatically prioritized based on:

**Priority Score = T + L + U + P**

- **T (Issue Type Score)**
  - STREET_LIGHT: 3
  - GARBAGE: 2
  - WATER: 4
  - ROAD: 5

- **L (Likes Score)**
  - 0-5 likes: 1
  - 5-20 likes: 2
  - 20+ likes: 3

- **U (Urban Score)**
  - URBAN: 3
  - SEMI_URBAN: 2
  - RURAL: 1

- **P (Pending Days Score)**
  - 0-3 days: 1
  - 3-7 days: 2
  - 7+ days: 3

Priority is recalculated automatically when:
- Issue is created
- Issue receives a like/unlike
- Time passes (lazy calculation on fetch)

---

## Auto-Assignment

When an issue is created:
1. System determines department based on issue_type
2. Assigns to Level 1 authority in that department
3. Sets status to "ASSIGNED"
4. Calculates initial priority score

**Issue Type → Department Mapping:**
- STREET_LIGHT → Electricity
- GARBAGE → Sanitation
- WATER → Water Supply
- ROAD → Public Works

---

## Escalation System

Run the escalation command daily:
```bash
python manage.py escalate_issues
```

**Escalation Logic:**
- Issues older than 10 days and not resolved are escalated
- Issue is reassigned to next higher authority level
- If no higher authority exists, status is set to "ESCALATED"

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@example.com","password":"password123","role":"CITIZEN"}'
```

### List Issues
```bash
curl -X GET http://localhost:5000/api/issues/ \
  -H "Authorization: Bearer <your_token>"
```

### Create Issue
```bash
curl -X POST http://localhost:5000/api/issues/ \
  -H "Authorization: Bearer <your_token>" \
  -F "title=Broken Street Light" \
  -F "description=Not working" \
  -F "image=@/path/to/image.jpg" \
  -F "latitude=28.6139" \
  -F "longitude=77.2090" \
  -F "address=Delhi" \
  -F "issue_type=STREET_LIGHT" \
  -F "location_type=URBAN"
```

### Like Issue
```bash
curl -X POST http://localhost:5000/api/issues/1/like/ \
  -H "Authorization: Bearer <your_token>"
```
