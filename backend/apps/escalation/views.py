from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.issues.models import Issue
from apps.issues.serializers import IssueSerializer
from apps.issues.permissions import IsAdmin

class AdminAssignedIssuesView(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAdmin]
    
    def get_queryset(self):
        return Issue.objects.filter(current_authority=self.request.user)

@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard(request):
    user = request.user
    
    # Get statistics
    total_assigned = Issue.objects.filter(current_authority=user).count()
    in_progress = Issue.objects.filter(current_authority=user, status='IN_PROGRESS').count()
    resolved = Issue.objects.filter(current_authority=user, status='RESOLVED').count()
    pending = Issue.objects.filter(current_authority=user, status__in=['REPORTED', 'ASSIGNED']).count()
    
    return Response({
        'total_assigned': total_assigned,
        'in_progress': in_progress,
        'resolved': resolved,
        'pending': pending,
    })
