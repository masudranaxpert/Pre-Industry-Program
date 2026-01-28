from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from meal_manage.serializers.serializers_mess_member import MessSerializer, MessMemberSerializer, MesMemberWriteSerializer
from meal_manage.models import Mess, MessMember

from drf_spectacular.utils import extend_schema

from django.contrib.auth.models import User

@extend_schema(tags=['Mess'])
class MessView(mixins.ListModelMixin, mixins.CreateModelMixin,
               mixins.DestroyModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Mess.objects.all()
    serializer_class = MessSerializer
    permission_classes = [IsAuthenticated]

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
            raise ValidationError("You are not permitted to perform this action.")



@extend_schema(tags=['Mess Member'])
class AddMember(GenericViewSet, mixins.CreateModelMixin,
                mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = MessMember.objects.all()
    serializer_class = MesMemberWriteSerializer
    permission_classes = [IsAuthenticated]

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

    def create(self, request, *args, **kwargs):
        if not isinstance(request.data.get("user"), int):
            try:
                user_obj_id = User.objects.get(username=request.data.get("user")).id
                request.data["user"] = user_obj_id
            except User.DoesNotExist:
                return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)

        user_obj = User.objects.get(id=request.data.get("user"))
        if MessMember.objects.filter(user=user_obj).exists():
            return Response("User already exists", status=status.HTTP_409_CONFLICT)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



@extend_schema(tags=['Mess Member'])
class Member(GenericViewSet, mixins.ListModelMixin):
    queryset = MessMember.objects.all()
    serializer_class = MessMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        mess = Mess.objects.filter(manager=user).first()
        if mess:
            return MessMember.objects.filter(mess=mess)

        member = MessMember.objects.filter(user=self.request.user).first()
        if member:
            return MessMember.objects.filter(mess=member.mess)
        return MessMember.objects.none()


