from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('addmeal/', views.addMeal, name='addMeal'),
    path('allmeal/', views.allMeal, name='allMeal'),
    # path('/', views.formtest, name='formcheck'),
    path('thank-you/', views.thank, name='thanks'),
]
