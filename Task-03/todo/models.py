from django.db import models

# Create your models here.
class meal(models.Model):
    meal_name = models.CharField(max_length=200)
    meal_price = models.IntegerField(max_length=100)
    created = models.DateTimeField('DateFiled')
    