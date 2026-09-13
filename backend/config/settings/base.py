"""
Base settings shared by every environment.
Environment-specific overrides live in dev.py / prod.py.
"""
from pathlib import Path

import dj_database_url
from django.urls import reverse_lazy
from dotenv import load_dotenv
import os

# backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent

load_dotenv(BASE_DIR / ".env")


def env(key: str, default: str | None = None) -> str | None:
    return os.environ.get(key, default)


def env_bool(key: str, default: bool = False) -> bool:
    return env(key, str(default)).lower() in {"1", "true", "yes", "on"}


def env_list(key: str, default: str = "") -> list[str]:
    return [item.strip() for item in env(key, default).split(",") if item.strip()]


SECRET_KEY = env("SECRET_KEY", "insecure-dev-key-change-me")
DEBUG = env_bool("DEBUG", False)

ALLOWED_HOSTS = env_list("ALLOWED_HOSTS", "localhost,127.0.0.1")

INSTALLED_APPS = [
    # Unfold must come before django.contrib.admin to replace its templates.
    "unfold",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    "django_filters",
    # Local
    "apps.projects",
    "apps.experience",
    "apps.skills",
    "apps.contact",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# --- Database ---------------------------------------------------------------
# DATABASE_URL drives everything. Falls back to local SQLite when unset so a
# fresh clone runs with zero configuration.
DATABASES = {
    "default": dj_database_url.config(
        default=env("DATABASE_URL", f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --- Static & media --------------------------------------------------------
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"
    },
}

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# Admin-uploaded files (cover images, project PDFs) go to Supabase Storage
# when configured, so they survive Render's ephemeral filesystem and are
# actually reachable over HTTP in production (nothing serves /media/ there
# otherwise). Unset SUPABASE_URL locally and everything falls back to plain
# local disk storage under MEDIA_ROOT above — zero config for a fresh clone.
SUPABASE_URL = env("SUPABASE_URL")
if SUPABASE_URL:
    _supabase_host = SUPABASE_URL.removeprefix("https://").removeprefix("http://").rstrip("/")
    _supabase_bucket = env("SUPABASE_BUCKET_NAME", "media")

    STORAGES["default"] = {"BACKEND": "storages.backends.s3.S3Storage"}
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = _supabase_bucket
    # Supabase's S3-compatible gateway accepts uploads here...
    AWS_S3_ENDPOINT_URL = f"https://{_supabase_host}/storage/v1/s3"
    AWS_S3_REGION_NAME = env("SUPABASE_S3_REGION", "us-east-1")
    AWS_S3_ADDRESSING_STYLE = "path"
    AWS_DEFAULT_ACL = None
    AWS_QUERYSTRING_AUTH = False
    AWS_S3_FILE_OVERWRITE = False
    # ...but public reads go through Supabase's own REST path instead of the
    # S3 endpoint, since that's the URL format a public bucket actually
    # serves objects from.
    AWS_S3_CUSTOM_DOMAIN = f"{_supabase_host}/storage/v1/object/public/{_supabase_bucket}"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# The only login flow this project has is the Admin dashboard.
LOGIN_URL = "/admin/login/"
LOGIN_REDIRECT_URL = "/admin/"

# --- Admin dashboard theme (django-unfold) ---------------------------------
# Purely visual: a themed skin over the same Django Admin views, colored to
# match the portfolio's own indigo accent, with a shortcut sidebar to every
# content type. No new auth system, no new API surface.
UNFOLD = {
    "SITE_TITLE": "Portfolio dashboard",
    "SITE_HEADER": "Daniel Kalambo",
    "SITE_SUBHEADER": "Portfolio dashboard",
    "SITE_URL": "/",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": False,
    "COLORS": {
        "primary": {
            "50": "#eef2ff",
            "100": "#e0e7ff",
            "200": "#c7d2fe",
            "300": "#a5b4fc",
            "400": "#818cf8",
            "500": "#6366f1",
            "600": "#4f46e5",
            "700": "#4338ca",
            "800": "#3730a3",
            "900": "#312e81",
            "950": "#1e1b4b",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "navigation": [
            {
                "title": "Portfolio",
                "items": [
                    {
                        "title": "Projects",
                        "icon": "rocket_launch",
                        "link": reverse_lazy("admin:projects_project_changelist"),
                    },
                    {
                        "title": "Epitech projects",
                        "icon": "school",
                        "link": reverse_lazy("admin:projects_schoolproject_changelist"),
                    },
                    {
                        "title": "Technologies",
                        "icon": "code",
                        "link": reverse_lazy("admin:projects_technology_changelist"),
                    },
                    {
                        "title": "Experience",
                        "icon": "work_history",
                        "link": reverse_lazy("admin:experience_experience_changelist"),
                    },
                    {
                        "title": "Skills",
                        "icon": "psychology",
                        "link": reverse_lazy("admin:skills_skill_changelist"),
                    },
                    {
                        "title": "Contact messages",
                        "icon": "mail",
                        "link": reverse_lazy("admin:contact_contactmessage_changelist"),
                    },
                ],
            },
        ],
    },
}

# --- DRF ------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "120/hour",
        "contact": "5/hour",
    },
    "DEFAULT_PAGINATION_CLASS": None,
}

# --- CORS ---------------------------------------------------------------
CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
)
CORS_ALLOW_CREDENTIALS = False
