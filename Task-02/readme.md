# What is Django?

> Django হলো একটা Python-এর ওয়েব ফ্রেমওয়ার্ক।  

<br>

# ORM কী? (Object-Relational Mapping)

```
ORM হলো এমন একটা সিস্টেম যেটা তোমাকে Python ক্লাস দিয়ে ডাটাবেসের টেবিল হ্যান্ডল করতে দেয়।
অর্থাৎ, তুমাকে SQL কোয়েরি (SELECT, INSERT, UPDATE) লিখতে হয় না – Python কোড লিখলেই হয়ে যায়।
Django নিজে থেকে সেগুলোকে SQL-এ কনভার্ট করে ডাটাবেসে চালায়।
```

<br>

# MVT কী?

> Django ফলো করে MVT প্যাটার্ন।  
> Model-View-Template  
> MVT → Model (ডাটা), View (লজিক), Template (ডিজাইন) – এই তিন অংশে কাজ ভাগ করে নেয়।

## Model

- কি: Database এর structure
- কাজ: Data কিভাবে save হবে, কি ধরনের data হবে
- উদাহরণ: User table, Product table
- ফাইল: models.py

## View

- কি: Business logic
- কাজ: User এর request process করা, database থেকে data নিয়ে আসা
- উদাহরণ: Login করলে user verify করা, product list দেখানো
- ফাইল: views.py

## Template

- কি: Presentation layer (যা user দেখে)
- কাজ: Data কে HTML format এ দেখানো
- উদাহরণ: Homepage, Product details page
- ফোল্ডার: templates/

<br>

```
User Request (Browser)
        ↓
    urls.py (URL Routing)
        ↓
    views.py (Logic Processing)
        ↓
    models.py (Database Query)
        ↓
    Database (Data Fetch)
        ↓
    views.py (Data Processing)
        ↓
    templates/ (HTML Rendering)
        ↓
    Response (Browser এ দেখানো)
```

<br>

# django-admin কী?
> django-admin হলো Django-এর একটা কমান্ড লাইন টুল।
> Django-তে কোনো ওয়েবসাইট/অ্যাপ বানানোর প্রথম স্টেপ হলো একটা প্রজেক্ট বানানো।

```
django-admin startproject project_name
```

<br>

```
mysite/                  ← তোমার প্রজেক্টের মেইন ফোল্ডার
├── manage.py            ← খুব গুরুত্বপূর্ণ ফাইল
└── project_name/              ← ভিতরের ফোল্ডার (প্রজেক্টের নামে)
    ├── __init__.py      ← পাইথনকে বলে এটা একটা প্যাকেজ
    ├── settings.py      ← সবচেয়ে গুরুত্বপূর্ণ! প্রজেক্টের সেটিংস
    ├── urls.py          ← URL কনফিগারেশন (কোন লিঙ্কে কী দেখাবে)
    ├── asgi.py          ← অ্যাসিনক্রোনাস সার্ভারের জন্য (পরে লাগবে)
    └── wsgi.py          ← ওয়েব সার্ভারের সাথে কানেক্ট করার জন্য (প্রোডাকশনে লাগে)
```

<br>

# manage.py কী? কেন ইউজ হয়?

## manage.py হলো তোমার প্রজেক্টের প্রধান কমান্ড লাইন টুল।

> সার্ভার চালানো: ``` python manage.py runserver ```  
> নতুন অ্যাপ বানানো: ``` python manage.py startapp todo ```    
> ডাটাবেস মাইগ্রেশন: ``` python manage.py makemigrations | python manage.py migrate ```    
> অ্যাডমিন ইউজার বানানো: ``` python manage.py createsuperuser ```    
> সব static ফাইল (CSS, JS, images) এক জায়গায় কালেক্ট করে: ``` python manage.py collectstatic ```    
> Django-এর Python shell খোলে – মডেল দিয়ে এক্সপেরিমেন্ট করা যায়: ``` python manage.py shell ```    

<br>

# settings.py  কী?
> project এর configuration  
> Database connection, installed apps, security settings  

```
DEBUG = True/False - Development mode
INSTALLED_APPS - কোন apps use হবে
DATABASES - Database connection info
TEMPLATES - HTML template settings
STATIC_URL - CSS/JS files এর location
```

<br>

# admin.py

- Django admin panel customize করা
- Admin panel থেকে data সহজে manage করার জন্য

```
admin.site.register(Blog)
```

<br>

নতুন অ্যাপ বানানো: ``` python manage.py startapp todo ```

```
├── todo/                  # Individual App Directory
│   ├── __init__.py
│   ├── admin.py            # Admin panel customization
│   ├── apps.py             # App configuration
│   ├── models.py           # Database models (tables)
│   ├── views.py            # Logic এবং data processing
│   ├── urls.py             # App specific URLs
│   ├── tests.py            # Testing code
│   ├── migrations/         # Database changes history
│   ├── templates/          # HTML files
│   └── static/             # CSS, JS, images
```

