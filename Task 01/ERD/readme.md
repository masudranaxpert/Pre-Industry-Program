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
- [Participation Constraints](https://www.youtube.com/watch?v=-t63uwNJNJw)
- [Degree of Relationship](https://www.youtube.com/watch?v=gpcnyLSoppk)
- [Relational Model](https://www.youtube.com/watch?v=lbTiI2KZVBQ)

---

<br><br><br>


```
১. ER Model (Entity Relationship Model) কী?

Entity (এনটিটি): যার সম্পর্কে আমরা তথ্য রাখি।

Attribute (অ্যাট্রিবিউট): Entity বৈশিষ্ট্য।

Relationship (রিলেশনশিপ): দুটি Entity মধ্যে সম্পর্ক।

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

----

<br>

![image.png](https://res.cloudinary.com/dxrdnpp47/image/upload/v1765295929/image_z79ukc.png)



