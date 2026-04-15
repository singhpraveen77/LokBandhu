from django.urls import path
from . import views

urlpatterns = [
    path('', views.IssueListCreateView.as_view(), name='issue-list-create'),
    path('<int:pk>/', views.IssueDetailView.as_view(), name='issue-detail'),
    path('<int:pk>/like/', views.like_issue, name='issue-like'),
    path('<int:pk>/status/', views.update_issue_status, name='issue-status'),
    path('<int:pk>/assign/', views.assign_issue, name='issue-assign'),
]
