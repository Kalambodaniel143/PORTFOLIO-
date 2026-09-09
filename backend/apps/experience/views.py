from rest_framework import generics

from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceListView(generics.ListAPIView):
    serializer_class = ExperienceSerializer
    filterset_fields = ["type"]

    def get_queryset(self):
        return Experience.objects.prefetch_related("highlights")
