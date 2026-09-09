from rest_framework import generics

from .models import Skill
from .serializers import SkillSerializer


class SkillListView(generics.ListAPIView):
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()
    filterset_fields = ["category", "level"]
