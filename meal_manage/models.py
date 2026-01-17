from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework.exceptions import ValidationError

def meal_validator(value):
    if (value * 2) % 1 != 0:
        raise ValidationError("Meal value must be in increments of 0.5")


class Mess(models.Model):
    name = models.CharField(max_length=100)
    manager = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


STATUS = [
    (0, 'Active'),
    (1, 'Deactive'),
]
class MessMember(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=False, choices=STATUS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('mess', 'user')



class Deposit(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    member = models.ForeignKey(
        MessMember,
        on_delete=models.SET_NULL,
        related_name='deposits',
        null=True, blank=True
    )
    deposit_amount = models.PositiveIntegerField()
    deposit_details = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']



class DailyMeal(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    member = models.ForeignKey(
        MessMember,
        on_delete=models.SET_NULL,
        related_name='deposits',
        null=True, blank=True
    )
    breakfast = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        meal_validator
    ])
    lunch = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        meal_validator
    ])
    dinner = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        meal_validator
    ])
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
