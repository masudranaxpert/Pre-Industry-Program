# Custom Error কী?
> তুমি যখন ফর্মে নিজের মতো করে ভ্যালিডেশন লিখো (যেমন clean()
> মেথডে বা clean_field()-এ), আর কোনো সমস্যা পেলে এরর দেখাতে
> চাও — সেটাই custom error।

<br>

## Custom Error দুই ধরনের হতে পারে:

## Error টাইপসমূহ

| ধরন                      | কোথায় যায়?               | কীভাবে তৈরি করবে?                       | টেমপ্লেটে কোথায় দেখাবে?        |
| ------------------------ | ------------------------ | --------------------------------------- | ------------------------------ |
| **Field-specific error** | নির্দিষ্ট ফিল্ডের নিচে   | `self.add_error('field_name', 'মেসেজ')` | `{{ form.field_name.errors }}` |
| **Non-field error**      | পুরো ফর্মের উপরে বা নিচে | `raise forms.ValidationError('মেসেজ')`  | `{{ form.non_field_errors }}`  |

---

## উদাহরণ

### 1️⃣ Field-specific error

```python
from django import forms

class MyForm(forms.Form):
    username = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')

        if username == 'admin':
            self.add_error('username', 'এই ইউজারনেম ব্যবহার করা যাবে না')
```

**Template:**

```html
{{ form.username.errors }}
```

---

### 2️⃣ Non-field error

```python
from django import forms

class MyForm(forms.Form):
    password = forms.CharField()
    confirm_password = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()
        p1 = cleaned_data.get('password')
        p2 = cleaned_data.get('confirm_password')

        if p1 and p2 and p1 != p2:
            raise forms.ValidationError('দুটি পাসওয়ার্ড মিলছে না')
```

**Template:**

```html
{{ form.non_field_errors }}
```

---

<br>

<br>

# Python Django Errors কিভাবে দেখায় :

```python
print(form.errors)
```

<br>

```html
<ul class="errorlist">
    <li>email<ul class="errorlist" id="id_email_error"><li>Enter a valid email address.</li></ul></li>
    <li>__all__<ul class="errorlist nonfield"><li>valo hoye jao</li></ul></li>
</ul>
```

<br>

```python
print(form.errors.keys())
```
```python
dict_keys(['email', '__all__'])
```
<br>

## form.errors একটা ডিকশনারি (dict) — কিন্তু এটা স্পেশাল ডিকশনারি।

| Key        | Value                               | ব্যাখ্যা |
|------------|-------------------------------------|----------|
| `email`    | `['Enter a valid email address.']`  | email ফিল্ডের এরর (field-specific) |
| `__all__`  | `['valo hoye jao']`                 | non-field error (পুরো ফর্মের কাস্টম এরর) |

<br>


## কিন্তু print(form.errors) কেন HTML দিচ্ছে, শুধু ভ্যালু না?

Django-এর form.errors একটা ErrorDict অবজেক্ট, যার __str__() মেথড ওভাররাইড করা আছে।
যখন তুমি print(form.errors) করো:

- Python অটোম্যাটিক __str__() কল করে
- আর __str__() মেথডটা সুন্দর HTML ফরম্যাটে সব এরর রেন্ডার করে দেয়

<br>

## Raw data
```python
print(form.errors.as_data())
```
```python
{'email': [ValidationError(['Enter a valid email address.'])], '__all__': [ValidationError(['valo hoye jao'])]}
```

## JSON data
```python
print(form.errors.as_json())
```
```python
{"email": [{"message": "Enter a valid email address.", "code": "invalid"}], "__all__": [{"message": "valo hoye jao", "code": "invalid"}]}
```

<br>

<br>

# Template Errors কিভাবে দেখায় :

| টেমপ্লেটে লেখা | কী দেয়? (আসলে) | টাইপ (পাইথনে) | টেমপ্লেটে কীভাবে দেখায়? |
|----------------|----------------|---------------|--------------------------|
| `{{ form.bio.errors }}` | bio ফিল্ডের সব এরর মেসেজের লিস্ট | `list` | অটোম্যাটিক `<ul class="errorlist"><li>মেসেজ</li></ul>` |
| `{{ form.bio.errors.0 }}` | প্রথম এরর মেসেজ (যদি থাকে) | `string` বা খালি | শুধু টেক্সট |
| `{{ form.errors }}` | পুরো ফর্মের সব এরর (ফিল্ড + নন-ফিল্ড) | `ErrorDict → HTML` | সুন্দর HTML লিস্ট |
| `{{ form.non_field_errors }}` | শুধু non-field এররের লিস্ট (যেমন `clean()` থেকে) | `list` | অটো `<ul class="errorlist nonfield">...</ul>` |

<br>

## Loop ব্যবহার না করলে HTML List Return করে । 

```html
<div class="field">
    {{ form.bio.label_tag }}
    {{ form.bio }}
    
    <!-- এটা যথেষ্ট! লুপ লাগবে না -->
    {{ form.bio.errors }}
</div>
```
```html
<ul class="errorlist">
    <li>Bio খুব ছোট!</li>
    <li>অশ্লীল শব্দ আছে!</li>
</ul>
```
<br>

## Loop ব্যবহার করলে Text Return করে

```html
{% if form.bio.errors %}
    <div class="my-errors" style="color: red;">
        {% for error in form.bio.errors %}
            <small>⚠ {{ error }}</small><br>
        {% endfor %}
    </div>
{% endif %}
```

```html
⚠ Bio খুব ছোট!
⚠ অশ্লীল শব্দ আছে!
```





# form.errors
- form.errors হলো ফর্ম অবজেক্টের একটা অ্যাট্রিবিউট (attribute)।
- স্পেসিফিকভাবে: এটা Django-এর django.forms.utils.ErrorDict ক্লাসের একটা ইন্সট্যান্স।
- শুরুতে form.errors খালি থাকে (কোনো এরর নেই)।
- কিন্তু তুমি যখন প্রথমবার form.errors অ্যাক্সেস করো (যেমন print(form.errors)), তখনই Django অটোম্যাটিক
- ফর্মের সব ফিল্ড ভ্যালিডেট করে, clean() মেথড চালায়
- একটা ErrorDict অবজেক্ট তৈরি করে রিটার্ন করে
- form.errors একটা lazy property — দরকার না হলে ক্যালকুলেট হয় না।
- শুধু is_valid() ট্রু হলে --> তৈরি হয় --> `form.cleaned_data`

## form অবজেক্টের ভিতরে অনেক অ্যাট্রিবিউট থাকে
- `form.data` → ইউজার যে ডেটা পাঠিয়েছে  
- `form.is_bound` → `True / False` (ফর্মে ডেটা আছে কি না)  
- `form.cleaned_data` → ভ্যালিড হলে পরিষ্কার করা ডেটা  
- `form.errors` → এররগুলো (প্রোপার্টি)
