<h2 align="center">Entity Relationship Diagram (ERD) </h2>

> ERD (Entity Relationship Diagram) হলো ডেটাবেস তৈরি করার আগে আঁকা একটা ম্যাপ বা নকশা (Blueprint)।

----

```
১. ER Model (Entity Relationship Model) কী?
ER Model হলো একটি কনসেপ্ট বা লজিক। এটি ঠিক করে যে, আপনার ডেটাবেসে কী কী "জিনিস" (Entity) থাকবে এবং তাদের মধ্যে সম্পর্ক কেমন হবে।

এই মডেলটির ৩টি প্রধান উপাদান ---> 

Entity (এনটিটি): যার সম্পর্কে আমরা তথ্য রাখি।

Attribute (অ্যাট্রিবিউট): Entity বৈশিষ্ট্য।

Relationship (রিলেশনশিপ): দুটি Entity মধ্যে সম্পর্ক।

```

----


```

ERD-এর প্রধান উপাদানসমূহ--->
একটি ERD আঁকার সময় কিছু নির্দিষ্ট জ্যামিতিক আকৃতি (Shape) ব্যবহার করা হয়:

Entity (আয়তক্ষেত্র / Rectangle): বাস্তব জগতের কোনো বস্তু বা ব্যক্তি। যেমন— Student, Teacher, Car, Product। ডেটাবেসে এগুলো এক-একটি টেবিল হয়।

Relationship (ডায়মন্ড / Diamond): দুটি এনটিটি একে অপরের সাথে কীভাবে যুক্ত। যেমন— একজন Student একটি Course-এ Enroll করে। এখানে "Enroll" হলো রিলেশনশিপ।

```

----


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



