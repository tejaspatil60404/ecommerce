from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # Fix the clash by setting related_name
    groups = models.ManyToManyField(
        "auth.Group", related_name="customuser_groups", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="customuser_permissions", blank=True
    )

    # Remove unnecessary fields
    is_staff = None  
    is_superuser = None

    def __str__(self):
        return self.username
