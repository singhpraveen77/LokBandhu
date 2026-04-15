from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Issue, Like
from .services import calculate_priority

@receiver(post_save, sender=Like)
def update_likes_count_on_create(sender, instance, created, **kwargs):
    """Update likes count and recalculate priority when a like is created"""
    if created:
        issue = instance.issue
        issue.likes_count = issue.likes.count()
        issue.priority_score = calculate_priority(issue)
        issue.save()

@receiver(post_delete, sender=Like)
def update_likes_count_on_delete(sender, instance, **kwargs):
    """Update likes count and recalculate priority when a like is deleted"""
    issue = instance.issue
    issue.likes_count = issue.likes.count()
    issue.priority_score = calculate_priority(issue)
    issue.save()
