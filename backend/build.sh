#!/usr/bin/env bash
# Render build step. Runs from the backend/ directory.
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate --no-input
