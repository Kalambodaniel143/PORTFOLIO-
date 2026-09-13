from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Skill


@admin.register(Skill)
class SkillAdmin(ModelAdmin):
    list_display = ["name", "category", "level", "order"]
    list_editable = ["category", "level", "order"]
    list_filter = ["category", "level"]
    search_fields = ["name"]
