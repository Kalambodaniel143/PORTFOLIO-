from django.urls import path

from .views import ExperienceListView

urlpatterns = [
    path("experiences/", ExperienceListView.as_view(), name="experience-list"),
]
