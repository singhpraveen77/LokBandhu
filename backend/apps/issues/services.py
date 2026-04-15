from datetime import datetime, timedelta
from django.utils import timezone

def calculate_priority(issue):
    """
    Calculate priority score based on:
    T (Issue Type) + L (Likes) + U (Urban) + P (Pending Days)
    """
    
    # T: Issue Type Score
    issue_type_scores = {
        'STREET_LIGHT': 3,
        'GARBAGE': 2,
        'WATER': 4,
        'ROAD': 5,
    }
    t_score = issue_type_scores.get(issue.issue_type, 0)
    
    # L: Likes Score
    likes = issue.likes_count
    if likes <= 5:
        l_score = 1
    elif likes <= 20:
        l_score = 2
    else:
        l_score = 3
    
    # U: Urban Score
    urban_scores = {
        'URBAN': 3,
        'SEMI_URBAN': 2,
        'RURAL': 1,
    }
    u_score = urban_scores.get(issue.location_type, 1)
    
    # P: Pending Days Score
    days_pending = (timezone.now() - issue.created_at).days
    if days_pending <= 3:
        p_score = 1
    elif days_pending <= 7:
        p_score = 2
    else:
        p_score = 3
    
    total_priority = t_score + l_score + u_score + p_score
    
    return total_priority

def assign_to_department(issue):
    """Auto-assign issue to department based on issue type"""
    from apps.departments.models import Department
    from apps.users.models import User
    
    # Map issue types to department names
    department_mapping = {
        'STREET_LIGHT': 'Electricity',
        'GARBAGE': 'Sanitation',
        'WATER': 'Water Supply',
        'ROAD': 'Public Works',
    }
    
    dept_name = department_mapping.get(issue.issue_type)
    if dept_name:
        department, _ = Department.objects.get_or_create(name=dept_name)
        issue.department = department
        
        # Assign to level 1 authority in this department
        level_1_authority = User.objects.filter(
            department=department,
            role='ADMIN',
            authority_level=1
        ).first()
        
        if level_1_authority:
            issue.current_authority = level_1_authority
            issue.current_level = 1
            issue.status = 'ASSIGNED'
    
    return issue
