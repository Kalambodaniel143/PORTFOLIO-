#!/usr/bin/env bash
# Render build step. Runs from the backend/ directory.
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate --no-input

# Seeds/backfills project, experience and school-project content on every
# deploy (blank or still-"[placeholder]" fields only — never touches
# anything already confirmed or hand-edited in Admin); skills are only
# seeded once, on the very first deploy.
python manage.py seed_demo --if-empty

# Create the admin user once, from env vars, if it doesn't exist yet.
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
  python manage.py shell -c "
import os
from django.contrib.auth import get_user_model
U = get_user_model()
name = os.environ['DJANGO_SUPERUSER_USERNAME']
if U.objects.filter(username=name).exists():
    print('Superuser already exists.')
else:
    U.objects.create_superuser(name, os.environ.get('DJANGO_SUPERUSER_EMAIL', ''), os.environ['DJANGO_SUPERUSER_PASSWORD'])
    print('Superuser created.')
"
fi
