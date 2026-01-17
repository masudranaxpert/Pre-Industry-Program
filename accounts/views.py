from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken import views

from .serializers import RegistrationSerializer

from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Authentication'], request=RegistrationSerializer)
class Registration(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=['Authentication'])
class Login(views.ObtainAuthToken):
    pass
