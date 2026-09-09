from rest_framework import serializers

from .models import Skill


class SkillSerializer(serializers.ModelSerializer):
    level = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ["name", "category", "level", "icon"]

    def get_level(self, obj: Skill) -> str | None:
        return obj.level or None
