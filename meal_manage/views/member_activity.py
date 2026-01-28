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
        member = MessMember.objects.filter(user=user).first()

        #deposit Balance
        deposit = Deposit.objects.aggregate(total=Coalesce(Sum('deposit_amount'), 0))['total']
        user_deposit = Deposit.objects.filter(member=member).aggregate(total=Coalesce(Sum('deposit_amount'), 0))['total']

        #Cost
        cost = Cost.objects.aggregate(total=Coalesce(Sum('meal_cost'), 0))['total']

        #Meal
        mess_total_meal = DailyMeal.objects.aggregate(total=Coalesce(Sum(F('breakfast') + F('lunch') + F('dinner')), 0.0))['total']
        user_mess_meal = DailyMeal.objects.filter(member=member).aggregate(
            total=Coalesce(Sum(F('breakfast') + F('lunch') + F('dinner')), 0.0))['total']
        mess_meal_rate = cost / mess_total_meal if mess_total_meal > 0 else 0

        #Mess
        mess_balance = deposit - cost

        #user
        user_cost = user_mess_meal * mess_meal_rate
        user_balance = user_deposit - user_cost

        response_data = {
            "mess": member.mess.name,
            "deposit": deposit,
            "user_deposit": user_deposit,
            "mess_balance": mess_balance,
            "user_balance": round(user_balance, 2),
            "mess_total_meal": mess_total_meal,
            "user_mess_meal": user_mess_meal,
            "mess_meal_rate": mess_meal_rate,
            "user_cost": user_cost,
        }
        return Response(response_data, status=status.HTTP_200_OK)






