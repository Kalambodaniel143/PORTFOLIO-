from django.db import models


class Skill(models.Model):
    class Category(models.TextChoices):
        PROGRAMMING = "Programming", "Programming"
        WEB = "Web Development", "Web Development"
        DEVOPS = "DevOps & Infrastructure", "DevOps & Infrastructure"
        AI = "AI & Robotics", "AI & Robotics"
        TOOLS = "Tools", "Tools"

    class Level(models.TextChoices):
        LEARNING = "learning", "Learning"
        COMFORTABLE = "comfortable", "Comfortable"
        STRONG = "strong", "Strong"

    name = models.CharField(max_length=80)
    category = models.CharField(max_length=40, choices=Category.choices)
    level = models.CharField(
        max_length=12, choices=Level.choices, blank=True
    )
    icon = models.CharField(
        max_length=60, blank=True, help_text="Optional icon name / slug."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self) -> str:
        return self.name
