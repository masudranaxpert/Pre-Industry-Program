from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from meal_manage.views.mess_member import MessView, AddMember, Member
from meal_manage.views.deposit import DepositView
from meal_manage.views.meal import MealView
from meal_manage.views.cost import CostView
from meal_manage.views.member_activity import MemberActivityView

router = DefaultRouter()
router.register(r"mess", MessView, basename="mess")
router.register(r"add-del-member", AddMember, basename="add-del-member")
router.register(r"memberlist", Member, basename="memberlist")
router.register(r"deposit", DepositView, basename="deposit")
router.register(r"meal", MealView, basename="meal")

urlpatterns = [
    path('', include(router.urls)),
]


urlpatterns +=[
    re_path('cost/', CostView.as_view(), name='cost'),
    re_path('mess_activity/', MemberActivityView.as_view(), name='mess_activity'),
]