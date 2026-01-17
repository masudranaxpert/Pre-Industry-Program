from django.urls import path
from .views import Registration
from rest_framework.authtoken import views


urlpatterns = [
    path('register/', Registration.as_view(), name='registration'),
    path('login/', views.obtain_auth_token, name='login'),
]