import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User
from apps.departments.models import Department

# Create departments
departments_data = [
    'Electricity',
    'Sanitation',
    'Water Supply',
    'Public Works',
]

print("Creating departments...")
for dept_name in departments_data:
    dept, created = Department.objects.get_or_create(name=dept_name)
    if created:
        print(f"✓ Created department: {dept_name}")
    else:
        print(f"- Department already exists: {dept_name}")

# Create admin users for each department
print("\nCreating admin users...")

electricity_dept = Department.objects.get(name='Electricity')
sanitation_dept = Department.objects.get(name='Sanitation')
water_dept = Department.objects.get(name='Water Supply')
public_works_dept = Department.objects.get(name='Public Works')

admin_users = [
    # Electricity Department
    {'email': 'elec.level1@gov.in', 'name': 'Electricity Officer L1', 'password': 'password123', 'department': electricity_dept, 'level': 1},
    {'email': 'elec.level2@gov.in', 'name': 'Electricity Officer L2', 'password': 'password123', 'department': electricity_dept, 'level': 2},
    {'email': 'elec.level3@gov.in', 'name': 'Electricity Officer L3', 'password': 'password123', 'department': electricity_dept, 'level': 3},
    
    # Sanitation Department
    {'email': 'sanit.level1@gov.in', 'name': 'Sanitation Officer L1', 'password': 'password123', 'department': sanitation_dept, 'level': 1},
    {'email': 'sanit.level2@gov.in', 'name': 'Sanitation Officer L2', 'password': 'password123', 'department': sanitation_dept, 'level': 2},
    
    # Water Supply Department
    {'email': 'water.level1@gov.in', 'name': 'Water Officer L1', 'password': 'password123', 'department': water_dept, 'level': 1},
    {'email': 'water.level2@gov.in', 'name': 'Water Officer L2', 'password': 'password123', 'department': water_dept, 'level': 2},
    
    # Public Works Department
    {'email': 'works.level1@gov.in', 'name': 'Public Works Officer L1', 'password': 'password123', 'department': public_works_dept, 'level': 1},
    {'email': 'works.level2@gov.in', 'name': 'Public Works Officer L2', 'password': 'password123', 'department': public_works_dept, 'level': 2},
]

for user_data in admin_users:
    if not User.objects.filter(email=user_data['email']).exists():
        user = User.objects.create_user(
            email=user_data['email'],
            name=user_data['name'],
            password=user_data['password'],
            role='ADMIN',
            department=user_data['department'],
            authority_level=user_data['level']
        )
        print(f"✓ Created admin: {user_data['name']} ({user_data['email']})")
    else:
        print(f"- Admin already exists: {user_data['email']}")

# Create public users
print("\nCreating public users...")
public_users = [
    {'email': 'ravi@example.com', 'name': 'Ravi Kumar', 'password': 'password123'},
    {'email': 'neha@example.com', 'name': 'Neha Sharma', 'password': 'password123'},
    {'email': 'mohammed@example.com', 'name': 'Mohammed Ali', 'password': 'password123'},
]

for user_data in public_users:
    if not User.objects.filter(email=user_data['email']).exists():
        user = User.objects.create_user(
            email=user_data['email'],
            name=user_data['name'],
            password=user_data['password'],
            role='PUBLIC'
        )
        print(f"✓ Created public user: {user_data['name']} ({user_data['email']})")
    else:
        print(f"- Public user already exists: {user_data['email']}")

# Create superuser
print("\nCreating superuser...")
if not User.objects.filter(email='admin@lokbandhu.com').exists():
    User.objects.create_superuser(
        email='admin@lokbandhu.com',
        name='Super Admin',
        password='admin123'
    )
    print("✓ Created superuser: admin@lokbandhu.com (password: admin123)")
else:
    print("- Superuser already exists")

print("\n✅ Database seeded successfully!")
print("\n📝 Login credentials:")
print("=" * 50)
print("Superuser: admin@lokbandhu.com / admin123")
print("\nPublic Users:")
print("  - ravi@example.com / password123")
print("  - neha@example.com / password123")
print("  - mohammed@example.com / password123")
print("\nAdmin Users (sample):")
print("  - elec.level1@gov.in / password123")
print("  - sanit.level1@gov.in / password123")
print("=" * 50)
