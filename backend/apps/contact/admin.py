from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ["name", "email", "created_at", "is_read"]
    list_filter = ["is_read", "created_at"]
    search_fields = ["name", "email", "message"]
    readonly_fields = ["name", "email", "message", "created_at"]
    list_editable = ["is_read"]

    def has_add_permission(self, request):
        return False
