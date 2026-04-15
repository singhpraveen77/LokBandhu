from django.db import models
from django.conf import settings
from apps.departments.models import Department

class Issue(models.Model):
    ISSUE_TYPE_CHOICES = [
        ('STREET_LIGHT', 'Street Light'),
        ('GARBAGE', 'Garbage'),
        ('WATER', 'Water'),
        ('ROAD', 'Road'),
    ]
    
    STATUS_CHOICES = [
        ('REPORTED', 'Reported'),
        ('ASSIGNED', 'Assigned'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
        ('ESCALATED', 'Escalated'),
    ]
    
    LOCATION_TYPE_CHOICES = [
        ('URBAN', 'Urban'),
        ('SEMI_URBAN', 'Semi Urban'),
        ('RURAL', 'Rural'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='issues/')
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=500, blank=True)
    
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE_CHOICES)
    location_type = models.CharField(max_length=20, choices=LOCATION_TYPE_CHOICES, default='URBAN')
    
    priority_score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='REPORTED')
    
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_issues')
    current_authority = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_issues')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    current_level = models.IntegerField(default=1)
    
    likes_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.issue_type}"
    
    class Meta:
        db_table = 'issues'
        ordering = ['-priority_score', '-created_at']

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'likes'
        unique_together = ('user', 'issue')
    
    def __str__(self):
        return f"{self.user.name} likes {self.issue.title}"
