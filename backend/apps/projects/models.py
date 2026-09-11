from django.db import models
from django.utils.text import slugify

from apps.common.models import TimeStampedModel


class Technology(models.Model):
    class Category(models.TextChoices):
        LANGUAGE = "language", "Programming language"
        FRONTEND = "frontend", "Frontend"
        BACKEND = "backend", "Backend"
        DATABASE = "database", "Database"
        DEVOPS = "devops", "DevOps & Infrastructure"
        AI = "ai", "AI & Robotics"
        TOOL = "tool", "Tool"

    name = models.CharField(max_length=60, unique=True)
    category = models.CharField(
        max_length=20, choices=Category.choices, default=Category.TOOL
    )

    class Meta:
        ordering = ["category", "name"]
        verbose_name_plural = "technologies"

    def __str__(self) -> str:
        return self.name


class Project(TimeStampedModel):
    class Category(models.TextChoices):
        DEVOPS = "DevOps", "DevOps"
        AI = "AI", "AI"
        ROBOTICS = "Robotics", "Robotics"
        FULLSTACK = "Full-Stack", "Full-Stack"

    class Status(models.TextChoices):
        COMPLETED = "completed", "Completed"
        IN_PROGRESS = "in-progress", "In progress"
        MAINTAINED = "maintained", "Maintained"

    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    tagline = models.CharField(max_length=200, blank=True)
    short_description = models.CharField(max_length=280)
    category = models.CharField(max_length=20, choices=Category.choices)
    featured = models.BooleanField(
        default=False, help_text="Shown in the homepage 'Selected work' section."
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.COMPLETED
    )
    year = models.CharField(max_length=9, help_text="e.g. 2025 or 2024–2025")
    role = models.CharField(max_length=120, blank=True)
    order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers appear first."
    )

    cover_image = models.ImageField(
        upload_to="projects/", blank=True, null=True
    )
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    docs_url = models.URLField(blank=True)

    technologies = models.ManyToManyField(
        Technology, through="ProjectTechnology", related_name="projects", blank=True
    )

    # --- Case-study long form ---------------------------------------------
    overview = models.TextField(blank=True)
    problem = models.TextField(blank=True)
    contribution = models.TextField(blank=True)
    stack = models.TextField(blank=True)
    architecture = models.TextField(blank=True)
    results = models.TextField(blank=True)
    learned = models.TextField(blank=True)

    class Meta:
        ordering = ["order", "-year", "title"]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:140]
        super().save(*args, **kwargs)


class ProjectTechnology(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "technology__name"]
        unique_together = ("project", "technology")
        verbose_name = "technology"
        verbose_name_plural = "technologies"

    def __str__(self) -> str:
        return f"{self.project} · {self.technology}"


class CaseStudyPoint(models.Model):
    class Kind(models.TextChoices):
        DECISION = "decision", "Technical decision"
        CHALLENGE = "challenge", "Challenge & solution"

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="points"
    )
    kind = models.CharField(max_length=12, choices=Kind.choices)
    heading = models.CharField(max_length=160)
    body = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["kind", "order"]

    def __str__(self) -> str:
        return f"{self.get_kind_display()}: {self.heading}"


class SchoolProject(models.Model):
    """
    A lightweight entry for coursework completed during a school curriculum
    (e.g. an Epitech project), as opposed to the flagship `Project` entries
    which get a full case study. Meant to scale to a large number of rows.
    """

    title = models.CharField(max_length=120)
    code = models.CharField(
        max_length=40, blank=True, help_text="Project code, e.g. G-CPE-110."
    )
    module = models.CharField(
        max_length=160,
        blank=True,
        help_text="Curriculum module, e.g. Elementary Programming in C.",
    )
    pitch = models.CharField(max_length=280)
    technologies = models.ManyToManyField(
        Technology, blank=True, related_name="school_projects"
    )
    github_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers appear first."
    )

    class Meta:
        ordering = ["order", "code", "title"]

    def __str__(self) -> str:
        return f"{self.code} — {self.title}" if self.code else self.title
