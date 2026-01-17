from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import ValidationError

from meal_manage.models import Deposit, MessMember
from meal_manage.serializers.serializers_deposit import DepositSerializers


class DepositView(GenericViewSet, mixins.ListModelMixin,
                  mixins.CreateModelMixin):
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializers

    def get_queryset(self):
        member = MessMember.objects.filter(user=self.request.user)
        if member.exists():
            return Deposit.objects.all()
        raise ValidationError('Not Permited!')

    def perform_create(self, serializer):
        mess = MessMember.objects.filter(user=self.request.user).first().mess
        serializer.save(mess=mess)




