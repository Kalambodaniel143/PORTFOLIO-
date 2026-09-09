from django.contrib import admin

from .models import Experience, ExperienceHighlight


class ExperienceHighlightInline(admin.TabularInline):
    model = ExperienceHighlight
    extra = 2


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["title", "organization", "type", "start_date", "end_date", "order"]
    list_editable = ["order"]
    list_filter = ["type"]
    search_fields = ["title", "organization"]
    inlines = [ExperienceHighlightInline]
