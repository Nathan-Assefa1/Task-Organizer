from django.db import models
from django.contrib.auth.models import User
from datetime import date
# Create your models here.


class Todo(models.Model):
    name = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.SET_NULL, null=True)
    date = models.DateField(default=date.today)