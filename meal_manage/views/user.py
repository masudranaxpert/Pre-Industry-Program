from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from meal_manage.models import Mess, DailyMeal, Deposit, MessMember
from meal_manage.serializers.serializers_user import UserSerializer

from django.db.models import Sum, F
from django.db.models.functions import Coalesce

from drf_spectacular.utils import extend_schema

from django.contrib.auth.models import User

@extend_schema(tags=['Authentication'])
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        mess_obj = Mess.objects.filter(manager=user)
        mess_member = MessMember.objects.filter(user=user).first()
        user_serializer = UserSerializer(instance=user)

        deposit_total = Deposit.objects.filter(member=mess_member).aggregate(total=Coalesce(Sum('deposit_amount'), 0))['total']
        mess_meal_total = DailyMeal.objects.filter(member=mess_member).aggregate(total=Coalesce(Sum(F('breakfast') + F('lunch') + F('dinner')), 0.0))['total']
        mess_meal_rate = deposit_total // mess_meal_total if mess_meal_total > 0 else 0
        mess_meal_cost = mess_meal_rate * mess_meal_total if mess_meal_total > 0 else 0
        balance = deposit_total - mess_meal_cost if mess_meal_cost > 0 else 0

        response_data = {
            'user': user_serializer.data,
        }

        response_data_extend = {
            'balance': balance,
            'mess_meal': mess_meal_cost,
            'mess_meal_rate': mess_meal_rate,
            'mess_meal_cost': mess_meal_cost,
            'deposit': deposit_total,
        }

        if mess_obj.exists() and mess_member:
            response_data['manager'] = True
            response_data['mess_name'] = mess_obj.first().name
            response_data['mess_id'] = mess_obj.first().id
            response_data.update(response_data_extend)
        elif mess_obj.exists() or mess_member:
            response_data['manager'] = False
            response_data['mess_name'] = mess_member.mess.name
            response_data['mess_id'] = mess_obj.first().id if mess_obj.exists() else mess_member.mess.id
            response_data.update(response_data_extend)
        else:
            response_data['mess'] = "No Mess Member"

        return Response(response_data, status=status.HTTP_200_OK)


@extend_schema(tags=['Authentication'])
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, username):
        user = User.objects.get(username=username)
        user_serializer = UserSerializer(instance=user)

        response_data = {
            'user': user_serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)