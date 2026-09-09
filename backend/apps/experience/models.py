from django.db import models

from apps.common.models import TimeStampedModel


class Experience(TimeStampedModel):
    class Type(models.TextChoices):
        EDUCATION = "education", "Education"
        WORK = "work", "Work experience"
        COMPETITION = "competition", "Competition / event"

    type = models.CharField(max_length=12, choices=Type.choices)
    title = models.CharField(max_length=160)
    organization = models.CharField(max_length=160)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(
        null=True, blank=True, help_text="Leave empty if ongoing."
    )
    description = models.TextField(blank=True)
    order = models.IntegerField(
        default=0, help_text="Lower numbers appear first (top of the timeline)."
    )

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self) -> str:
        return f"{self.title} — {self.organization}"


class ExperienceHighlight(models.Model):
    experience = models.ForeignKey(
        Experience, on_delete=models.CASCADE, related_name="highlights"
    )
    text = models.CharField(max_length=240)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self) -> str:
        return self.text
