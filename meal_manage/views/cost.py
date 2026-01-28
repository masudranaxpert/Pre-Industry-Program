from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import extend_schema

from meal_manage.serializers.serializers_cost import CostMemberSerializer
from meal_manage.models import Cost, Mess, MessMember


@extend_schema(tags=['Cost'])
class CostView(generics.ListCreateAPIView):
    queryset = Cost.objects.all()
    serializer_class = CostMemberSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        member = MessMember.objects.filter(user=user).first()
        if member:
            mess = member.mess
            serializer.save(mess=mess)