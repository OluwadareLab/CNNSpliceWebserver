from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('home', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('project/', views.project_view, name='project'),
    path('success/', views.thankyou_view, name='success'),
    path('example/', views.example_view, name='example'),
]