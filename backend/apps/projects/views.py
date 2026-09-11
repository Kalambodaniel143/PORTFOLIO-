from rest_framework import generics

from .models import Project, SchoolProject
from .serializers import (
    ProjectDetailSerializer,
    ProjectListSerializer,
    SchoolProjectSerializer,
)


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectListSerializer
    filterset_fields = ["category", "featured", "status"]

    def get_queryset(self):
        return Project.objects.prefetch_related(
            "projecttechnology_set__technology"
        )


class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Project.objects.prefetch_related(
            "projecttechnology_set__technology", "points"
        )


class SchoolProjectListView(generics.ListAPIView):
    serializer_class = SchoolProjectSerializer

    def get_queryset(self):
        return SchoolProject.objects.prefetch_related("technologies")
