from django.urls import path
from . import views

urlpatterns = [
    path('issues/', views.AdminAssignedIssuesView.as_view(), name='admin-issues'),
    path('dashboard/', views.admin_dashboard, name='admin-dashboard'),
]
