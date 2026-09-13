from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import Experience, ExperienceHighlight


class ExperienceHighlightInline(TabularInline):
    model = ExperienceHighlight
    extra = 2


@admin.register(Experience)
class ExperienceAdmin(ModelAdmin):
    list_display = ["title", "organization", "type", "start_date", "end_date", "order"]
    list_editable = ["order"]
    list_filter = ["type"]
    search_fields = ["title", "organization"]
    inlines = [ExperienceHighlightInline]
