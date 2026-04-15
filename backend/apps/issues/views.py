from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Issue, Like
from .serializers import (
    IssueSerializer, IssueCreateSerializer,
    IssueStatusUpdateSerializer, IssueAssignSerializer
)
from .permissions import IsAdmin
from .services import calculate_priority, assign_to_department

class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['issue_type', 'status', 'location_type', 'department']
    search_fields = ['title', 'description', 'address']
    ordering_fields = ['priority_score', 'created_at', 'likes_count']
    ordering = ['-priority_score', '-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return IssueCreateSerializer
        return IssueSerializer
    
    def perform_create(self, serializer):
        issue = serializer.save(created_by=self.request.user)
        
        # Auto-assign to department and authority
        issue = assign_to_department(issue)
        
        # Calculate initial priority
        issue.priority_score = calculate_priority(issue)
        issue.save()

class IssueDetailView(generics.RetrieveAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_issue(request, pk):
    try:
        issue = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    like, created = Like.objects.get_or_create(user=request.user, issue=issue)
    
    if not created:
        # Unlike
        like.delete()
        return Response({'message': 'Issue unliked', 'liked': False})
    
    return Response({'message': 'Issue liked', 'liked': True})

@api_view(['PATCH'])
@permission_classes([IsAdmin])
def update_issue_status(request, pk):
    try:
        issue = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = IssueStatusUpdateSerializer(issue, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response(IssueSerializer(issue).data)

@api_view(['PATCH'])
@permission_classes([IsAdmin])
def assign_issue(request, pk):
    try:
        issue = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = IssueAssignSerializer(issue, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save(status='ASSIGNED')
    
    return Response(IssueSerializer(issue).data)
