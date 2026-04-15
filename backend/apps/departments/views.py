from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Department
from .serializers import DepartmentSerializer, AuthoritySerializer
from apps.users.models import User

class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

class DepartmentAuthoritiesView(generics.ListAPIView):
    serializer_class = AuthoritySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        department_id = self.kwargs['pk']
        return User.objects.filter(
            department_id=department_id,
            role='ADMIN'
        ).order_by('authority_level')
