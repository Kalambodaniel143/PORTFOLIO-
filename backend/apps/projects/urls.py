from django.urls import path

from .views import ProjectDetailView, ProjectListView, SchoolProjectListView

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("projects/<slug:slug>/", ProjectDetailView.as_view(), name="project-detail"),
    path(
        "school-projects/",
        SchoolProjectListView.as_view(),
        name="school-project-list",
    ),
]
