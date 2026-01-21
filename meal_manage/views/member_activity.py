from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Sum, F
from django.db.models.functions import Coalesce

from meal_manage.models import (
    Mess, MessMember,
    DailyMeal, Cost, Deposit
)

from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Mess Member'])
class MemberActivityView(APIView):
    def get(self, request):
        user = request.user
        #object
        mess = Mess.objects.filter(manager=user).first()
        member = MessMember.objects.filter(user=user).first()

        #deposit Balance
        deposit = Deposit.objects.aggregate(total=Coalesce(Sum('deposit_amount'), 0))['total']
        user_deposit = Deposit.objects.filter(member=member).aggregate(total=Coalesce(Sum('deposit_amount'), 0))['total']
        mess_total_meal = DailyMeal.objects.aggregate(total=Coalesce(Sum(F('breakfast') +F('lunch') + F('dinner')), 0.0))['total']
        user_mess_meal = DailyMeal.objects.filter(member=member).aggregate(total=Coalesce(Sum(F('breakfast') +F('lunch') + F('dinner')), 0.0))['total']
        mess_meal_rate = deposit / mess_total_meal if mess_total_meal > 0 else 0

        user_mess_meal_cost = user_mess_meal * mess_meal_rate
        user_balance = user_deposit - user_mess_meal_cost


        response_data = {
            "mess": mess.name,
            "deposit": deposit,
            "user_deposit": user_deposit,
            "mess_total_meal": mess_total_meal,
            "user_mess_meal": user_mess_meal,
            "mess_meal_rate": mess_meal_rate,
            "user_mess_meal_cost": user_mess_meal_cost,
            "user_balance": user_balance
        }
        return Response(response_data, status=status.HTTP_200_OK)






