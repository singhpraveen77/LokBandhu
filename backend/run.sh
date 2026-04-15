#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Run migrations
python manage.py migrate

# Start server on port 5000
python manage.py runserver 5000
