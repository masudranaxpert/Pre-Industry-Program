from django.urls import path
from .views import Registration, Login



urlpatterns = [
    path('register/', Registration.as_view(), name='registration'),
    path('login/', Login.as_view() , name='login'),
]