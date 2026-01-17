from rest_framework import serializers
from meal_manage.models import Mess, MessMember

from django.contrib.auth.models import User

class MessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mess
        fields = ('id', 'name', 'manager')
        extra_kwargs = {
            'id': {'read_only': True},
            'manager': {'read_only': True}
        }
    def validate(self, attrs):
        if self.instance is None:
            if Mess.objects.filter(manager=self.context['request'].user).exists():
                raise serializers.ValidationError({
                    'manager':  "You already manage a mess."
                })
        return attrs

class MesMemberWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessMember
        fields = ('mess', 'user', 'status')

    def validate(self, attrs):
        request = self.context.get('request')
        mess = attrs['mess']
        if mess.manager != request.user:
            raise serializers.ValidationError("Only manager can add members.")
        return attrs



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class MessMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = serializers.SerializerMethodField()

    class Meta:
        model = MessMember
        fields = ('id' ,'mess', 'user', 'status', 'role')
        extra_kwargs = {
            'id': {'read_only': True}
        }

    def get_role(self, obj):
        if obj.user == obj.mess.manager:
            return "manager"
        return "user"