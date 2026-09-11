from django.contrib import admin

from .models import (
    CaseStudyPoint,
    Project,
    ProjectTechnology,
    SchoolProject,
    Technology,
)


class ProjectTechnologyInline(admin.TabularInline):
    model = ProjectTechnology
    extra = 3
    autocomplete_fields = ["technology"]


class CaseStudyPointInline(admin.StackedInline):
    model = CaseStudyPoint
    extra = 0
    fields = ["kind", "heading", "body", "order"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "featured", "status", "year", "order"]
    list_editable = ["featured", "order"]
    list_filter = ["category", "featured", "status"]
    search_fields = ["title", "short_description"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectTechnologyInline, CaseStudyPointInline]
    fieldsets = [
        (
            None,
            {
                "fields": [
                    "title",
                    "slug",
                    "tagline",
                    "short_description",
                    ("category", "status"),
                    ("featured", "order"),
                    ("year", "role"),
                    "cover_image",
                ]
            },
        ),
        ("Links", {"fields": ["github_url", "live_url", "docs_url"]}),
        (
            "Case study",
            {
                "classes": ["collapse"],
                "fields": [
                    "overview",
                    "problem",
                    "contribution",
                    "stack",
                    "architecture",
                    "results",
                    "learned",
                ],
            },
        ),
    ]


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]
    list_filter = ["category"]
    search_fields = ["name"]


@admin.register(SchoolProject)
class SchoolProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "code", "module", "order"]
    list_editable = ["order"]
    search_fields = ["title", "code", "module"]
    filter_horizontal = ["technologies"]
