from rest_framework import serializers

from meal_manage.models import Cost, Mess

class CostMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        exclude = ('created_at', 'updated_at')
        read_only_fields = ('mess',)
