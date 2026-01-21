from django.contrib import admin

from .models import (
    Mess,
    MessMember,
    Deposit,
    DailyMeal
)




@admin.register(Mess)
class MessAdmin(admin.ModelAdmin):
    list_display = ['name', 'manager']
    empty_value_display = 'unknown'
    # list_editable = ['manager']


@admin.register(MessMember)
class MessMemberAdmin(admin.ModelAdmin):
    pass



@admin.register(Deposit)
class DepositAdmin(admin.ModelAdmin):
    pass



@admin.register(DailyMeal)
class DailyMealAdmin(admin.ModelAdmin):
    pass