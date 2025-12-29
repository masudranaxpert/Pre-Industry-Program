# Django

## VsCode Setup

- settings.json এর মধ্যে আমাকে ``` "emmet.includeLanguages": {
        "django-html": "html"
    }, ```
- Tailwind Intelligence কাজ করার জন্য প্রজেক্ট ফোল্ডার এ Empty File tailwind.config.js বানাতে হবে।


<br>

## Project Create
> pip install uv  
> uv init  
> uv add django  
> django-admin startproject mysite  
> open --> settings.py এইখান থেকে Global Template ডিরেক্টরি করতে পারি।  
> 'DIRS': [BASE_DIR / 'template'],  
> BASE_DIR মানে হলো পুরো Path return করে।   

<br>

## Server Run  
> uv run manage.py runserver

<br>

## App Create
- ```uv run manage.py stratapp todo```
- open ---> settings.py এইখানে app অ্যাড করতে হবে।
- INSTALLED_APPS এইখানে 'todo', অ্যাড করতে হবে।

<br>

## Url Setup
- mysite/urls.py এইখানে path এর সাথে include function import করতে হবে।
- ```from django.urls import path, include```
- ```path('', include('todo.urls')),```
- এখন todo/urls.py তে আমরা url অ্যাড করলেই হবে।
- ```path('', views.home, name='home'),```
- views.home যেখানে সব লজিক আছে। 


