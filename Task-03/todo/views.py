from django.shortcuts import render, redirect,get_object_or_404
from .models import meal
from django.db.models import Sum
from django.utils import timezone
from django.http import HttpResponseRedirect, HttpResponse
from .forms import TeacherFrom
# Create your views here.
def home(request):
    today = timezone.now().date()
    # print(today)
    daily = meal.objects.filter(created__date=today).aggregate(mealPrice = Sum('meal_price'))['mealPrice']
    total = meal.objects.aggregate(mealPrice = Sum('meal_price'))['mealPrice']
    
    data = {
        'daily': daily,
        'total': total,
    }
    print(daily)
    return render(request, 'index.html', data)

def addMeal(request):
    
    if request.method == 'POST':
        form = TeacherFrom(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            print(data['date'].date())
            # date = str(data['date'].date()) + " 00:00:00"
            meal.objects.create(meal_name=data['meal_name'], meal_price=data['meal_price'], created=data['date'].date())
            return HttpResponseRedirect('/thank-you')
    else:
        form = TeacherFrom()
    return render(request, 'form.html', {'form':form})

def allMeal(request):
    all_meal = meal.objects.all()
    total = meal.objects.aggregate(mealPrice = Sum('meal_price'))['mealPrice']
    data = {
        'allmeal': all_meal,
        'total': total,
    }
    
    # if request.method == 'POST':
        
    
    
    return render(request, 'allmeal.html', data)



def formtest(request):
    from .forms import TeacherFrom
    
    if request.method == 'POST':
        form = TeacherFrom(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            meal.objects.create(meal_name=data['name'], meal_price=data['price'])
            return HttpResponseRedirect('/thank-you')
    else:
        form = TeacherFrom()
    return render(request, 'form.html', {'form':form})



def thank(request):
    return HttpResponse('Thank You')