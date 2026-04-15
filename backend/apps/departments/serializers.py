from rest_framework import serializers
from .models import Department
from apps.users.models import User

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'created_at']
        read_only_fields = ['id', 'created_at']

class AuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'authority_level']
