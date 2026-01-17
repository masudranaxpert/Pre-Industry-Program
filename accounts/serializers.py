from rest_framework import serializers
from django.contrib.auth.models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "email", "password", "password2")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, value):
        if value['password'] != value['password2']:
            raise serializers.ValidationError({
                "password2": "Password does not match"
            })
        if User.objects.filter(email=value['email']).exists():
            raise serializers.ValidationError({
                "email": "Email already exists"
            })
        return value

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user