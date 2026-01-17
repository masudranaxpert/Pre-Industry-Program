from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

from meal_manage.serializers import MessSerializer, MessMemberSerializer, MesMemberWriteSerializer
from meal_manage.models import Mess, MessMember

class MessView(mixins.ListModelMixin, mixins.CreateModelMixin,
               mixins.DestroyModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Mess.objects.all()
    serializer_class = MessSerializer

    def get_queryset(self):
        user = self.request.user

        mess = Mess.objects.filter(manager=user)
        if mess.exists():
            return mess

        member = MessMember.objects.filter(user=user).first()
        if member:
            return Mess.objects.filter(id=member.mess.id)

        return Mess.objects.none()

    def perform_create(self, serializer):
        mess = serializer.save(manager=self.request.user)
        MessMember.objects.create(
            mess=mess,
            user=mess.manager,
            status=True
        )

    def perform_destroy(self, instance):
        if instance.manager == self.request.user:
            instance.delete()
        else:
            raise ValidationError("Not Permited")




class AddMember(GenericViewSet, mixins.CreateModelMixin,
                mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = MessMember.objects.all()
    serializer_class = MesMemberWriteSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user == instance.mess.manager:
            instance.mess.delete()
            return Response(
                {"detail": "Manager left. Mess deleted."},
                status=status.HTTP_204_NO_CONTENT
            )
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Member(GenericViewSet, mixins.ListModelMixin):
    queryset = MessMember.objects.all()
    serializer_class = MessMemberSerializer

    def get_queryset(self):
        user = self.request.user

        mess = Mess.objects.filter(manager=user).first()
        if mess:
            return MessMember.objects.filter(mess=mess)

        member = MessMember.objects.filter(user=self.request.user).first()
        if member:
            return MessMember.objects.filter(mess=member.mess)
        return MessMember.objects.none()


