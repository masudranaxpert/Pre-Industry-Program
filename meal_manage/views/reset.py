from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from meal_manage.models import Mess, MessMember, DailyMeal, Deposit, Cost

from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Authentication'])
class Reset(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            mess = Mess.objects.get(manager=user)
            DailyMeal.objects.filter(mess=mess).delete()
            Deposit.objects.filter(mess=mess).delete()
            Cost.objects.filter(mess=mess).delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Mess.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

