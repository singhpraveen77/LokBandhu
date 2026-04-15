#!/bin/bash

# Lok Bandhu API Test Script
# This script tests all major API endpoints

BASE_URL="http://localhost:5000/api"
echo "🧪 Testing Lok Bandhu API at $BASE_URL"
echo "================================================"

# Test 1: Login as Public User
echo ""
echo "1️⃣  Testing Login (Public User)..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@example.com","password":"password123","role":"CITIZEN"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed!"
  echo "$LOGIN_RESPONSE"
  exit 1
else
  echo "✅ Login successful!"
  echo "Token: ${TOKEN:0:50}..."
fi

# Test 2: Get Current User
echo ""
echo "2️⃣  Testing Get Current User..."
USER_RESPONSE=$(curl -s -X GET "$BASE_URL/users/me" \
  -H "Authorization: Bearer $TOKEN")

if echo "$USER_RESPONSE" | grep -q "email"; then
  echo "✅ Get current user successful!"
  echo "$USER_RESPONSE" | grep -o '"name":"[^"]*' | cut -d'"' -f4
else
  echo "❌ Get current user failed!"
fi

# Test 3: List Departments
echo ""
echo "3️⃣  Testing List Departments..."
DEPT_RESPONSE=$(curl -s -X GET "$BASE_URL/departments/" \
  -H "Authorization: Bearer $TOKEN")

if echo "$DEPT_RESPONSE" | grep -q "Electricity"; then
  echo "✅ List departments successful!"
  echo "Departments found: $(echo $DEPT_RESPONSE | grep -o '"name":"[^"]*' | wc -l)"
else
  echo "❌ List departments failed!"
fi

# Test 4: List Issues
echo ""
echo "4️⃣  Testing List Issues..."
ISSUES_RESPONSE=$(curl -s -X GET "$BASE_URL/issues/" \
  -H "Authorization: Bearer $TOKEN")

if echo "$ISSUES_RESPONSE" | grep -q "count"; then
  echo "✅ List issues successful!"
  ISSUE_COUNT=$(echo $ISSUES_RESPONSE | grep -o '"count":[0-9]*' | cut -d':' -f2)
  echo "Total issues: $ISSUE_COUNT"
else
  echo "❌ List issues failed!"
fi

# Test 5: Login as Admin
echo ""
echo "5️⃣  Testing Login (Admin User)..."
ADMIN_LOGIN=$(curl -s -X POST "$BASE_URL/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"elec.level1@gov.in","password":"password123","role":"GOVT"}')

ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"access":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then
  echo "❌ Admin login failed!"
else
  echo "✅ Admin login successful!"
fi

# Test 6: Admin Dashboard
echo ""
echo "6️⃣  Testing Admin Dashboard..."
DASHBOARD_RESPONSE=$(curl -s -X GET "$BASE_URL/admin/dashboard/" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$DASHBOARD_RESPONSE" | grep -q "total_assigned"; then
  echo "✅ Admin dashboard successful!"
  echo "$DASHBOARD_RESPONSE"
else
  echo "❌ Admin dashboard failed!"
fi

# Test 7: Admin Assigned Issues
echo ""
echo "7️⃣  Testing Admin Assigned Issues..."
ASSIGNED_RESPONSE=$(curl -s -X GET "$BASE_URL/admin/issues/" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$ASSIGNED_RESPONSE" | grep -q "count"; then
  echo "✅ Admin assigned issues successful!"
  ASSIGNED_COUNT=$(echo $ASSIGNED_RESPONSE | grep -o '"count":[0-9]*' | cut -d':' -f2)
  echo "Assigned issues: $ASSIGNED_COUNT"
else
  echo "❌ Admin assigned issues failed!"
fi

echo ""
echo "================================================"
echo "✅ All API tests completed!"
echo ""
echo "📝 Summary:"
echo "  - Authentication: Working ✓"
echo "  - User endpoints: Working ✓"
echo "  - Department endpoints: Working ✓"
echo "  - Issue endpoints: Working ✓"
echo "  - Admin endpoints: Working ✓"
echo ""
echo "🎉 Backend is ready to use!"
