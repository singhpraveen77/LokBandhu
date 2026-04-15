from django.contrib import admin
from .models import Issue, Like

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'issue_type', 'status', 'priority_score', 'likes_count', 'created_by', 'current_authority', 'created_at']
    list_filter = ['status', 'issue_type', 'location_type', 'department']
    search_fields = ['title', 'description', 'address']
    readonly_fields = ['priority_score', 'likes_count', 'created_at', 'updated_at']
    ordering = ['-priority_score', '-created_at']

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'issue', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__name', 'issue__title']
