from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin', admin.site.urls),
    path('job/submit', views.create_job),
    path('job/status', views.get_job_status)
]
