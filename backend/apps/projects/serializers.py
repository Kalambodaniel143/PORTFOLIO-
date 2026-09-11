from rest_framework import serializers

from .models import CaseStudyPoint, Project, SchoolProject


class ProjectListSerializer(serializers.ModelSerializer):
    """Shape matches the frontend `Project` type (camelCase, nested links)."""

    shortDescription = serializers.CharField(source="short_description")
    coverImage = serializers.SerializerMethodField()
    technologies = serializers.SerializerMethodField()
    links = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "slug",
            "title",
            "tagline",
            "shortDescription",
            "category",
            "featured",
            "status",
            "year",
            "role",
            "technologies",
            "coverImage",
            "links",
        ]

    def get_coverImage(self, obj: Project) -> str | None:
        if not obj.cover_image:
            return None
        request = self.context.get("request")
        url = obj.cover_image.url
        return request.build_absolute_uri(url) if request else url

    def get_technologies(self, obj: Project) -> list[str]:
        return list(
            obj.projecttechnology_set.select_related("technology").values_list(
                "technology__name", flat=True
            )
        )

    def get_links(self, obj: Project) -> dict:
        links = {}
        if obj.github_url:
            links["github"] = obj.github_url
        if obj.live_url:
            links["live"] = obj.live_url
        if obj.docs_url:
            links["docs"] = obj.docs_url
        return links


class ProjectDetailSerializer(ProjectListSerializer):
    caseStudy = serializers.SerializerMethodField()

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + ["caseStudy"]

    def get_caseStudy(self, obj: Project) -> dict:
        points = list(obj.points.all())

        def block(kind: str) -> list[dict]:
            return [
                {"heading": p.heading, "body": p.body}
                for p in points
                if p.kind == kind
            ]

        data: dict = {}
        for field in (
            "overview",
            "problem",
            "contribution",
            "stack",
            "architecture",
            "results",
            "learned",
        ):
            value = getattr(obj, field)
            if value:
                data[field] = value

        decisions = block(CaseStudyPoint.Kind.DECISION)
        challenges = block(CaseStudyPoint.Kind.CHALLENGE)
        if decisions:
            data["decisions"] = decisions
        if challenges:
            data["challenges"] = challenges
        return data


class SchoolProjectSerializer(serializers.ModelSerializer):
    technologies = serializers.SerializerMethodField()
    githubUrl = serializers.SerializerMethodField()
    details = serializers.SerializerMethodField()

    class Meta:
        model = SchoolProject
        fields = [
            "title",
            "code",
            "module",
            "pitch",
            "details",
            "technologies",
            "githubUrl",
        ]

    def get_technologies(self, obj: SchoolProject) -> list[str]:
        return list(obj.technologies.values_list("name", flat=True))

    def get_githubUrl(self, obj: SchoolProject) -> str | None:
        return obj.github_url or None

    def get_details(self, obj: SchoolProject) -> str | None:
        return obj.details or None
