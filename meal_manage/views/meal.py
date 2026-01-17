from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.exceptions import ValidationError

from meal_manage.models import DailyMeal, MessMember
from meal_manage.serializers.serializers_meal import MealSerializers

from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Meal'])
class MealView(GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = DailyMeal.objects.all()
    serializer_class = MealSerializers

    def get_queryset(self):
        user = self.request.user
        member = MessMember.objects.filter(user=user)
        if member.exists():
            return DailyMeal.objects.all()
        raise ValidationError("Not Permited")

    def perform_create(self, serializer):
        user = self.request.user
        mess = MessMember.objects.filter(user=user).first().mess
        serializer.save(mess=mess)
