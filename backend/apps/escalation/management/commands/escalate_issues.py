from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.issues.models import Issue
from apps.users.models import User

class Command(BaseCommand):
    help = 'Escalate issues that are not resolved within 10 days'

    def handle(self, *args, **options):
        # Get issues older than 10 days and not resolved
        ten_days_ago = timezone.now() - timedelta(days=10)
        
        issues_to_escalate = Issue.objects.filter(
            created_at__lte=ten_days_ago,
            status__in=['REPORTED', 'ASSIGNED', 'IN_PROGRESS']
        )
        
        escalated_count = 0
        
        for issue in issues_to_escalate:
            # Find next higher authority in the same department
            next_level = issue.current_level + 1
            
            next_authority = User.objects.filter(
                department=issue.department,
                role='ADMIN',
                authority_level=next_level
            ).first()
            
            if next_authority:
                # Escalate to next level
                issue.current_authority = next_authority
                issue.current_level = next_level
                issue.status = 'ASSIGNED'
                issue.save()
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Escalated issue #{issue.id} to {next_authority.name} (Level {next_level})'
                    )
                )
                escalated_count += 1
            else:
                # No higher authority, mark as escalated
                issue.status = 'ESCALATED'
                issue.save()
                
                self.stdout.write(
                    self.style.WARNING(
                        f'Issue #{issue.id} marked as ESCALATED (no higher authority available)'
                    )
                )
                escalated_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully escalated {escalated_count} issues'
            )
        )
