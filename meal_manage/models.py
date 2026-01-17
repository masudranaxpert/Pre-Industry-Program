from django.db import models
from django.contrib.auth.models import User


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



