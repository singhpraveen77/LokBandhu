use django rest framework for backend
use the same frontend, and try to do implement everything


below are prompt-
1. there will be two types of user- admin( government authority) and public 2. public user can upload images of civic issue, these images are geotagged(with location), 3. user have to write description, and fill all related information in the form, 4. he will submit the form, 5. every public user can see status of reported problem, that which authority is currently handling this problem 6. there will be a mechanism in backend, in which from the date of reporting the problem,after 10 days that problem will be notified to higher authority. 7. in admin, there will be many department, in each department, there will be many authorities, lower to higher, after 10 days of interval, problem will move to higher authority.

when user will add there civic issue, these civic issue will be shown upper in list 
up- higher priority
below- lower priority

give some value like- street light - 3, dustbin- 2, 
more likes - more  priority, less like lsess priority
urban - more priority, rural - low priority

sum different priority also like street light and more likes and highly populated- highes priority


more detailed prompt-
You are a senior backend engineer. Build a production-ready backend for a **Civic Issue Reporting System** using Django and Django REST Framework.

## 🔧 Tech Stack

* Django
* Django REST Framework (DRF)
* PostgreSQL (preferred, fallback SQLite)
* JWT Authentication (SimpleJWT)
* Clean modular architecture

---

## 📌 Core Features

### 1. User Roles

There are two types of users:

* Public User
* Admin (Government Authority)

Admin hierarchy:

* Department (e.g., Sanitation, Electricity, Water)
* Each department has multiple authority levels (level 1 → level N)

---

## 🧩 Models Design

### User

* id
* name
* email
* password
* role (PUBLIC / ADMIN)
* department (nullable)
* authority_level (integer, nullable)

---

### Department

* id
* name

---

### Issue

* id
* title
* description
* image (ImageField)
* latitude
* longitude
* address (optional string)
* issue_type (choices: STREET_LIGHT, GARBAGE, WATER, ROAD)
* priority_score (integer, auto-calculated)
* status (REPORTED, ASSIGNED, IN_PROGRESS, RESOLVED, ESCALATED)
* created_at
* updated_at
* current_authority (FK to User)
* current_level (integer)
* likes_count (integer, default 0)

---

### Like / Vote

* id
* user (FK)
* issue (FK)

(Ensure one user can like only once)

---

## ⚡ Priority System (VERY IMPORTANT)

Implement a function to calculate priority:

Priority Score = T + L + U + P

### T (Issue Type Score)

* STREET_LIGHT → 3
* GARBAGE → 2
* WATER → 4
* ROAD → 5

### L (Likes Score)

* 0–5 → 1
* 5–20 → 2
* 20+ → 3

### U (Urban Score)

* If location is urban → 3
* semi-urban → 2
* rural → 1

(Use a placeholder boolean or enum for now)

### P (Pending Days Score)

* 0–3 days → 1
* 3–7 → 2
* 7+ → 3

Priority should:

* Auto-update on new like
* Auto-update on fetch (if needed)

---

## 🔁 Escalation System

Implement escalation logic:

* If issue is NOT resolved within 10 days:
  → Increase current_level by 1
  → Assign to next higher authority in same department

If no higher authority:
→ mark as ESCALATED

Use:

* Django management command OR periodic task

---

## 📡 APIs

### Auth

* Register
* Login (JWT)
* Get current user

---

### Issue APIs

#### Create Issue

POST /api/issues/

* Upload image
* Add location
* Select issue_type

Auto:

* Assign department based on issue_type
* Assign to level 1 authority
* Calculate initial priority

---

#### Get Issues

GET /api/issues/

* Sort by priority_score (descending)
* Filters:

  * issue_type
  * status
  * location

---

#### Like Issue

POST /api/issues/{id}/like/

* Increment likes
* Recalculate priority

---

#### Update Status (Admin only)

PATCH /api/issues/{id}/status/

---

#### Assign Issue

PATCH /api/issues/{id}/assign/

---

#### My Assigned Issues (Admin)

GET /api/admin/issues/

---

## 🧠 Backend Logic Rules

* Always recalculate priority when:

  * Issue created
  * Likes updated
  * Time changes (optional lazy calculation)

* Use serializers properly

* Use signals or service layer for priority calculation

* Keep logic reusable (not inside views directly)

---

## 🔒 Permissions

* Public:

  * Create issue
  * View issues
  * Like issues

* Admin:

  * Update status
  * View assigned issues
  * Escalate issues

---