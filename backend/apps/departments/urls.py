from django.urls import path
from . import views

urlpatterns = [
    path('', views.DepartmentListView.as_view(), name='department-list'),
    path('<int:pk>/authorities/', views.DepartmentAuthoritiesView.as_view(), name='department-authorities'),
]
