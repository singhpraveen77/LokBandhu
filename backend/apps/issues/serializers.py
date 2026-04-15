from rest_framework import serializers
from .models import Issue, Like
from apps.users.serializers import UserSerializer

class IssueSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.name', read_only=True)
    current_authority_name = serializers.CharField(source='current_authority.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Issue
        fields = [
            'id', 'title', 'description', 'image', 'latitude', 'longitude', 'address',
            'issue_type', 'location_type', 'priority_score', 'status',
            'created_by', 'created_by_name', 'current_authority', 'current_authority_name',
            'department', 'department_name', 'current_level', 'likes_count',
            'created_at', 'updated_at', 'is_liked'
        ]
        read_only_fields = ['id', 'priority_score', 'likes_count', 'created_by', 'created_at', 'updated_at']
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, issue=obj).exists()
        return False

class IssueCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = [
            'title', 'description', 'image', 'latitude', 'longitude', 'address',
            'issue_type', 'location_type'
        ]

class IssueStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['status']

class IssueAssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['current_authority', 'current_level']
