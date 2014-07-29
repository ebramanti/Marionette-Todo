from django.db import models
from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'isActive')

admin.site.register(Task, TaskAdmin)
