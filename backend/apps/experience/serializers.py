from rest_framework import serializers

from .models import Experience


class ExperienceSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    startDate = serializers.SerializerMethodField()
    endDate = serializers.SerializerMethodField()
    highlights = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "type",
            "title",
            "organization",
            "location",
            "startDate",
            "endDate",
            "description",
            "highlights",
        ]

    def get_id(self, obj: Experience) -> str:
        return str(obj.pk)

    def get_startDate(self, obj: Experience) -> str:
        return obj.start_date.strftime("%Y-%m")

    def get_endDate(self, obj: Experience) -> str | None:
        return obj.end_date.strftime("%Y-%m") if obj.end_date else None

    def get_highlights(self, obj: Experience) -> list[str]:
        return [h.text for h in obj.highlights.all()]
