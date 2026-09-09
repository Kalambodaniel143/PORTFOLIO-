"""Local development settings."""
from .base import *  # noqa: F401,F403
from .base import env_list

DEBUG = True

ALLOWED_HOSTS = env_list("ALLOWED_HOSTS", "localhost,127.0.0.1,0.0.0.0")

# Convenience: allow any localhost port for the frontend during development.
CORS_ALLOWED_ORIGIN_REGEXES = [r"^http://localhost:\d+$", r"^http://127\.0\.0\.1:\d+$"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
