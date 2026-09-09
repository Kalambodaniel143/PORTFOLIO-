from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health(_request):
    return JsonResponse({"status": "ok"})


api_patterns = [
    path("", include("apps.projects.urls")),
    path("", include("apps.experience.urls")),
    path("", include("apps.skills.urls")),
    path("", include("apps.contact.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("healthz/", health),
    path("api/", include(api_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Portfolio administration"
admin.site.site_title = "Portfolio admin"
admin.site.index_title = "Content"
