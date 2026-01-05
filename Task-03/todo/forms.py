from django import forms 

class TeacherFrom(forms.Form):
    meal_name = forms.CharField()
    meal_price = forms.IntegerField()
    date = forms.DateTimeField()