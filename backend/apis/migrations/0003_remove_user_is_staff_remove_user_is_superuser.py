# Generated by Django 5.1.5 on 2025-02-24 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0002_rename_customuser_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_superuser',
        ),
    ]
