from django.db import models
from django.utils.timezone import now
import uuid

class Job(models.Model):
    reference = models.TextField(max_length=256, blank=False, null=False, unique=True, default=uuid.uuid4())
    email = models.EmailField(max_length=256, blank=False, null=False, default='example@example.com')
    model_name = models.TextField(max_length=32, blank=False, null=False, default='example_model')
    data_dir = models.TextField(max_length=512, blank=False, null=False, default='example_dir')
    status = models.TextField(max_length=16, blank=False, null=False, default='example_status')
    created_at = models.DateTimeField(default=now(), null=True, blank=True)
    modified_at = models.DateTimeField(default=now(), null=True, blank=True)

class JobRequest(models.Model):
    email = models.EmailField(max_length=256, blank=False, null=False, default='example@example.com')
    model_name = models.TextField(max_length=32, blank=False, null=False, default='example_model')
    text_data = models.TextField(blank=True, null=True, default='')
    file_data = models.FileField(blank=True, null=True, default='./jobs/default/default.txt')

class JobResponse(models.Model):
    reference = models.TextField(max_length=256, blank=False, null=False)
    email = models.EmailField(max_length=256, blank=False, null=False)
    model_name = models.TextField(max_length=32, blank=False, null=False)
    status = models.TextField(max_length=16, blank=False, null=False)
    link = models.TextField(max_length=512, blank=False, null=False)