# Deployment Guide - Lok Bandhu Backend

## Local Development

### Start Server
```bash
cd backend
source venv/bin/activate
python manage.py runserver 5000
```

### Run Escalation (Daily)
```bash
python manage.py escalate_issues
```

---

## Production Deployment

### 1. Environment Setup

Create `.env` file:
```env
SECRET_KEY=your-production-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@localhost:5432/lokbandhu
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 2. Database Setup (PostgreSQL)

Install PostgreSQL:
```bash
sudo apt-get install postgresql postgresql-contrib
```

Create database:
```bash
sudo -u postgres psql
CREATE DATABASE lokbandhu;
CREATE USER lokbandhu_user WITH PASSWORD 'your_password';
ALTER ROLE lokbandhu_user SET client_encoding TO 'utf8';
ALTER ROLE lokbandhu_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE lokbandhu_user SET timezone TO 'Asia/Kolkata';
GRANT ALL PRIVILEGES ON DATABASE lokbandhu TO lokbandhu_user;
\q
```

Update `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'lokbandhu',
        'USER': 'lokbandhu_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
pip install gunicorn
```

### 4. Run Migrations

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python seed_data.py
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Gunicorn Setup

Create `gunicorn_config.py`:
```python
bind = "0.0.0.0:5000"
workers = 3
worker_class = "sync"
timeout = 120
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"
loglevel = "info"
```

Create systemd service `/etc/systemd/system/lokbandhu.service`:
```ini
[Unit]
Description=Lok Bandhu Django Application
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/backend
Environment="PATH=/path/to/backend/venv/bin"
ExecStart=/path/to/backend/venv/bin/gunicorn config.wsgi:application -c gunicorn_config.py

[Install]
WantedBy=multi-user.target
```

Start service:
```bash
sudo systemctl start lokbandhu
sudo systemctl enable lokbandhu
sudo systemctl status lokbandhu
```

### 7. Nginx Setup

Install Nginx:
```bash
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/lokbandhu`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 20M;

    location /static/ {
        alias /path/to/backend/staticfiles/;
    }

    location /media/ {
        alias /path/to/backend/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/lokbandhu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 9. Cron Job for Escalation

Edit crontab:
```bash
crontab -e
```

Add daily escalation at 2 AM:
```
0 2 * * * /path/to/backend/venv/bin/python /path/to/backend/manage.py escalate_issues >> /var/log/lokbandhu/escalation.log 2>&1
```

### 10. Logging

Create log directories:
```bash
sudo mkdir -p /var/log/lokbandhu
sudo mkdir -p /var/log/gunicorn
sudo chown -R www-data:www-data /var/log/lokbandhu
sudo chown -R www-data:www-data /var/log/gunicorn
```

---

## Docker Deployment (Alternative)

### Dockerfile
```dockerfile
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 5000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:5000", "--workers", "3"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: lokbandhu
      POSTGRES_USER: lokbandhu_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build: .
    command: gunicorn config.wsgi:application --bind 0.0.0.0:5000
    volumes:
      - .:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - db

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    ports:
      - "80:80"
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

Build and run:
```bash
docker-compose up -d
docker-compose exec web python manage.py migrate
docker-compose exec web python seed_data.py
```

---

## Cloud Deployment

### Heroku

1. Install Heroku CLI
2. Create `Procfile`:
```
web: gunicorn config.wsgi:application
release: python manage.py migrate
```

3. Create `runtime.txt`:
```
python-3.12.3
```

4. Deploy:
```bash
heroku create lokbandhu
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DEBUG=False
git push heroku main
heroku run python seed_data.py
```

### AWS EC2

1. Launch EC2 instance (Ubuntu)
2. Install dependencies
3. Follow production deployment steps above
4. Configure security groups (ports 80, 443, 5000)
5. Use RDS for PostgreSQL
6. Use S3 for media files

### DigitalOcean

1. Create Droplet (Ubuntu)
2. Follow production deployment steps
3. Use Managed PostgreSQL
4. Use Spaces for media files

---

## Monitoring

### Health Check Endpoint

Add to `config/urls.py`:
```python
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})

urlpatterns = [
    path('health/', health_check),
    # ... other urls
]
```

### Monitoring Tools
- Sentry for error tracking
- New Relic for performance monitoring
- Prometheus + Grafana for metrics

---

## Backup

### Database Backup
```bash
# Backup
pg_dump lokbandhu > backup_$(date +%Y%m%d).sql

# Restore
psql lokbandhu < backup_20240101.sql
```

### Media Files Backup
```bash
tar -czf media_backup_$(date +%Y%m%d).tar.gz media/
```

### Automated Backups (Cron)
```bash
0 3 * * * /path/to/backup_script.sh
```

---

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Set up firewall (UFW)
- [ ] Regular security updates
- [ ] Database backups
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection protection (Django ORM)
- [ ] XSS protection (Django templates)
- [ ] CSRF protection (enabled by default)

---

## Performance Optimization

1. **Database Indexing**
```python
# Add indexes to frequently queried fields
class Meta:
    indexes = [
        models.Index(fields=['priority_score', '-created_at']),
        models.Index(fields=['status']),
    ]
```

2. **Caching** (Redis)
```bash
pip install django-redis
```

3. **CDN for Static Files**
- Use CloudFront, Cloudflare, or similar

4. **Database Connection Pooling**
```bash
pip install psycopg2-pool
```

5. **Async Tasks** (Celery)
```bash
pip install celery redis
```

---

## Troubleshooting

### Server won't start
- Check logs: `sudo journalctl -u lokbandhu -f`
- Verify gunicorn: `gunicorn config.wsgi:application --bind 0.0.0.0:5000`

### Database connection errors
- Check PostgreSQL status: `sudo systemctl status postgresql`
- Verify credentials in `.env`

### Static files not loading
- Run: `python manage.py collectstatic`
- Check Nginx configuration

### Media uploads failing
- Check permissions: `sudo chown -R www-data:www-data media/`
- Verify `MEDIA_ROOT` and `MEDIA_URL` settings

---

## Maintenance

### Update Dependencies
```bash
pip list --outdated
pip install --upgrade package_name
pip freeze > requirements.txt
```

### Database Maintenance
```bash
# Vacuum database
python manage.py dbshell
VACUUM ANALYZE;
```

### Log Rotation
Configure in `/etc/logrotate.d/lokbandhu`:
```
/var/log/lokbandhu/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
}
```
