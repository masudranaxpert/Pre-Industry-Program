## Tuple/List Unpacking

```python
fruits = ("apple", "banana", "cherry")  # tuple
a, b, c = fruits
print(a)  # apple
print(b)  # banana
print(c)  # cherry
```
<br>

## `*` দিয়ে Extended Unpacking

```python
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5
```

<br>

## Dictionary Unpacking
- .items() দিয়ে key-value আলাদা করা

```python
person = {"name": "Rahim", "age": 25, "city": "Dhaka"}
for key, value in person.items():
    print(key, ":", value)
# Output:
# name : Rahim
# age : 25
# city : Dhaka
```

<br>

# Function Argument Pass
- `**` দিয়ে ফাংশনে dictionary পাস করা:
```python
def info(name, age, city):
    print(name, age, city)

data = {"name": "Karim", "age": 30, "city": "Chittagong"}
info(**data)
# Output: Karim 30 Chittagong
```

<br>

- `*` দিয়ে ফাংশনে list/tuple পাস করা
```python
def add(a, b, c):
    return a + b + c

nums = [10, 20, 30]
print(add(*nums))  # 60
```
