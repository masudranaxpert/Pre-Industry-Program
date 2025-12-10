<h2 align="center">Entity Relationship Diagram (ERD) </h2>

> ERD (Entity Relationship Diagram) হলো ডেটাবেস তৈরি করার আগে আঁকা একটা ম্যাপ বা নকশা (Blueprint)।

<br>

---

<br>

# Video Link

- [ER Diagram | Entity Relationship Diagram](https://www.youtube.com/watch?v=G0XffHxohqY)
- [Symbols of ER Diagram](https://www.youtube.com/watch?v=S4cBelRt2D8)
- [Types of Entity | Strong Entity | Weak Entity](https://www.youtube.com/watch?v=3ia2B7W2ETY)
- [Types of Attributes](https://www.youtube.com/watch?v=79XdTzaD7XI)
- [Types of Relationship](https://www.youtube.com/watch?v=jHRfpEdNKQs)
- [Types of Relationship | One to Many | Many to One](https://www.youtube.com/watch?v=-f9jsqA3-IU)
- [Types of Relationship | Many to Many](https://www.youtube.com/watch?v=yCxixT7476g)
- [Degree of Relationship](https://www.youtube.com/watch?v=gpcnyLSoppk)
- [Participation Constraints](https://www.youtube.com/watch?v=-t63uwNJNJw)
- [Relational Model](https://www.youtube.com/watch?v=lbTiI2KZVBQ)


<br><br><br>


```
১. ER Model (Entity Relationship Model) --->

Entity : যার সম্পর্কে আমরা তথ্য রাখি।

Attribute : Entity বৈশিষ্ট্য।

Relationship : দুটি Entity মধ্যে সম্পর্ক।

```

<br><br><br>

```
ERD-এর প্রধান উপাদানসমূহ--->
একটি ERD আঁকার সময় কিছু নির্দিষ্ট জ্যামিতিক আকৃতি (Shape) ব্যবহার করা হয়:

Entity (আয়তক্ষেত্র / Rectangle): বাস্তব জগতের কোনো বস্তু বা ব্যক্তি।
যেমন— Student, Teacher, Car, Product।
ডেটাবেসে এগুলো এক-একটি টেবিল হয়।

Relationship (ডায়মন্ড / Diamond): দুটি এনটিটি একে অপরের সাথে কীভাবে যুক্ত।
যেমন— একজন Student একটি Course-এ Enroll করে। এখানে "Enroll" হলো রিলেশনশিপ।
```

<br><br><br>

```
Attributes হলো কোনো Entity-র বিস্তারিত তথ্য বা বৈশিষ্ট্য। ERD-তে একে ডিম্বাকৃতি (Oval/Ellipse) দিয়ে প্রকাশ করা হয়।

যেমন, Student যদি একটি Entity হয়, তবে তার Attributes হতে পারে:
Name (নাম)
Roll Number (রোল নম্বর)
Email (ইমেইল)
```


| অ্যাট্রিবিউটের ধরন       | বিবরণ                                                       | উদাহরণ                                          | চিহ্ন (Symbol)                                  |
|--------------------------|------------------------------------------------------------|--------------------------------------------------|-------------------------------------------------|
| Key Attribute            | যা দিয়ে কাউকে ইউনিকভাবে চেনা যায় (Primary Key)।             | Roll Number বা NID                               | টেক্সটের নিচে দাগ (Underline)                  |
| Composite Attribute      | যেটাকে ভেঙে আরও ছোট করা যায়।                               | Address (City, Zip Code-এ ভাঙা যায়)              | একটি Oval থেকে আরও শাখা বের হয়                  |
| Multivalued Attribute    | যার একাধিক মান থাকতে পারে।                                 | Phone Number (একজনের একাধিক নম্বর থাকতে পারে)   | ডাবল লাইনযুক্ত Oval (Double Oval)              |
| Derived Attribute        | যা অন্য ডেটা থেকে হিসাব করে বের করা হয়।                    | Age (Date of Birth জানা থাকলে বের করা যায়)       | ড্যাশ বা ভাঙা লাইনের Oval (Dashed Oval)        |




<br><br><br>

# Types of Constraints

## Primary Key
  > Not NULL & Must be Unique

## Foreign Key
  > অন্য টেবিলের Primary Key কে Reference করার জন্য ব্যবহৃত হয়।

<br><br><br>

----

<br>

<h2 align="center">Entity Relationship Diagram Symbols </h2>

![image.png](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765295929/image_z79ukc.png)

<br>

## Types of Entity

- **Strong Entity**
  > যার Primary Key আছে।  
  > Strong Entity represent করি আমরা Single Rectangle দিয়ে।

- **Weak Entity**
  > যার Primary Key নাই।  
  > Weak Entity represent করি আমরা Double Rectangle দিয়ে।


![Entity](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765338379/Screenshot_20_cq7gm5.png)

<br>

![Entity Example](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765338779/Screenshot_21_jcvhpp.png)

  > Strong Entity তে যেই Primary Key থাকবে তা Weak Entity তে Foreign Key বা Reference Key হিসেবে ব্যবহার হবে।
  > অর্থাৎ Strong Entity Weak Entity এর উপর Dependent.

<br>

## Types of Attributes

- Simple Attributes
- Composite Attributes
- Single valued Attributes
- Multivalued Attributes
- Derived Attributes
- Key Attributes
- Stored Attributes

**Simple Attributes**

  > যেই Attributes কে ভাঙা যাবে না। 

**Composite Attributes**

  > যেই Attributes কে ভাঙা যাবে।

**Single valued Attributes**

  >  যাদের শুধুমাত্র একটা মাত্র Value হবে।

**Multivalued Attributes**

  >  যাদের একের অধিক Value হবে।

**Derived Attributes**

  > যে Attributes এর Value আমরা অন্য Attributes এর সাহায্য পেয়ে থাকি ।
  > Date of Birth থেকে আমরা Age পেয়ে থাকি ।

**Key Attributes**

  >  যদি কোন Entity এর এমন কোন Attributes থাকে যার মাধ্যমে প্রত্যেকটা Row কে Uniquely Identify করা যায়।

**Stored Attributes**

  > যে Attributes এর Value Fixed

<br>

![1st](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765340191/Screenshot_23_dyi9t5.png)
![2nd](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765340191/Screenshot_22_f5si2e.png)

<br>

## Types of Relationship 

![Types of Relationship](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765342207/Screenshot_25_ddiy31.png)

<br>

- **One to One**
  > দুইটা entity-তেই Primary Key থাকে, কিন্তু তাদের মধ্যে একটি টেবিলের PK অন্যটির FK হয়।
  ![One to One](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765342207/Screenshot_24_ikejsp.png)

- **One to Many**
  > দুইটা entity-তেই Primary Key থাকে, কিন্তু One টেবিলের PK → Many টেবিলে FK হয় এবং একই PK অনেকবার ব্যবহার হতে পারে।

- **Many to One**
  >দুইটা entity-তেই Primary Key থাকে, কিন্তু “Many” টেবিলের FK → “One” টেবিলের PK কে রেফার করে, এবং অনেকগুলো রেকর্ড একই একটি PK কে রেফার করতে পারে।
  
  ![One to Many](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765342818/Screenshot_26_b0phh3.png)

- **Many to Many**
  >দুইটা entity-তেই Primary Key থাকে, কিন্তু তারা সরাসরি যুক্ত থাকে না; একটি আলাদা “Junction / Bridge টেবিল” লাগে, যেখানে দুই টেবিলের PK গুলো FK হিসেবে থাকে।
  ![Many to Many](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765344584/Screenshot_27_siaqz2.png)

<br>

## Degree of Relationship

  > একটা Relationship এ কত ধরনের Entity Add হইতেছে ।
  > Relation-যত গুলো Entity = Degree

- **Types**
  - Unary (1 টা Entity)
  - Binary (2 টা Differnet Type Entity)
  - Ternary (3 টা Differnet Type Entity)
  - N-ary (n টা Differnet Type Entity)

![Degree](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765345164/Screenshot_28_dqczpa.png)

<br>

##Participation Constraints

  > Relationship এ Entity Participation করবে নাকি করবে না
  > যদি করে তাহলে Total Participation নাকি Partial Participation হবে।

  ![Participation](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765345753/Screenshot_29_e5s1xz.png)

<br>

# Relational Model

### Example Relation

| Student_id | Name | Dept. |
| :--- | :---: | :---: |
| 101 | A | - |
| 102 | B | - |
| 103 | C | - |
| 104 | D | - |
| 105 | E | - |

## Components
1. **Relation**  
   > Tabular format (rows and columns)

2. **Tuple**  
   > Each Row

3. **Attribute**  
   > Each Column

4. **Attribute Domain**  
   > Each Column Data Type

5. **Degree**  
   > Total Number of Attributes

6. **Cardinality**  
   > Total Number of Rows

7. **Relational Schema**  
   > Logical Represent | `tablename(attribute1, attribute2, ..., attributeN)`

8. **Relational Instance**  
   > Table-এর current data / rows

9. Relation Key
    - Primary key
    - Foreign key
    - Super key
       >  {StudentID} ✅
       >  {RollNo} ✅
       >  {StudentID, Name} ✅
    - Candidate key
       >   {StudentID} ✅
       >   {RollNo} ✅
       >   {StudentID, Name} ❌
    - Composite key
    - Alternate key
