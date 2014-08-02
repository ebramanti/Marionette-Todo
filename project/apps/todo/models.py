from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    isActive = models.BooleanField(default=True)
    date = models.CharField(max_length=150)

    def __unicode__(self):
        return self.title
