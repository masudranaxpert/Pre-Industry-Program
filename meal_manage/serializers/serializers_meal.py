from rest_framework import serializers

from meal_manage.models import DailyMeal, MessMember

class MealSerializers(serializers.ModelSerializer):
    class Meta:
        model = DailyMeal
        exclude = ('created_at', 'updated_at')
        extra_kwargs = {
            'mess': {'read_only': True}
        }

    def validate(self, attrs):
        user = self.context.get('request').user
        member = MessMember.objects.filter(user=user)
        if member.exists():
            return attrs
        raise serializers.ValidationError("Not Permited")