from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from rest_framework.exceptions import ValidationError

def validate_meal_value(value):
    """
    Validate that meal value is in increments of 0.5
    """
    if (value * 2) % 1 != 0:
        raise ValidationError("Meal value must be in increments of 0.5")


class Mess(models.Model):
    name = models.CharField(max_length=100)
    manager = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mess_manager')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Mess'
        verbose_name_plural = 'Mess'


STATUS = [
    (True, 'Active'),
    (False, 'Deactive'),
]
class MessMember(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=False, choices=STATUS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('mess', 'user')
        verbose_name = 'Mess Member'
        verbose_name_plural = 'Members'

    def __str__(self):
        return f"{self.user.username} - {self.mess.name}"




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

    def __str__(self):
        return f"{self.member.user.username if self.member else 'Deleted Member'} - {self.deposit_amount}"



class DailyMeal(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    member = models.ForeignKey(
        MessMember,
        on_delete=models.CASCADE,
        related_name='meal',
        null=False, blank=False
    )
    breakfast = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        validate_meal_value
    ])
    lunch = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        validate_meal_value
    ])
    dinner = models.FloatField(validators=[
        MaxValueValidator(100),
        MinValueValidator(0),
        validate_meal_value
    ])
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Cost(models.Model):
    mess = models.ForeignKey(Mess, on_delete=models.CASCADE)
    member = models.ForeignKey(
        MessMember,
        on_delete=models.SET_NULL,
        related_name='cost',
        null=True, blank=True
    )
    meal_cost = models.PositiveIntegerField()
    meal_cost_details = models.CharField(max_length=255, blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)