# 🍽️ Meal Management System

A Django-based web application for tracking and managing daily meal expenses with real-time statistics and reporting.

<p align="center">
  <img src="https://res.cloudinary.com/dxrdnpp47/image/upload/v1767857170/Gemini_Generated_Image_4bgbsh4bgbsh4bgb_ymh5qc.png" width="600"/>
</p>


## 🎯 Overview

The **Meal Management System** is a comprehensive Django web application designed to help users track their daily meal expenses. It provides an intuitive interface for adding meals, viewing historical data, and analyzing spending patterns with real-time statistics.




## This application is perfect for:
- 🏠 Hostels and dormitories
- 👨‍👩‍👧‍👦 Shared living spaces
- 📊 Personal expense tracking
- 🍴 Restaurant meal logging


---


## 🚀 Installation

### Prerequisites
- Python 3.13 or higher
- UV package manager (recommended) or pip

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mysite
   ```


2. **Install dependencies**
   ```bash
   # Using UV
   uv add django django-widget-tweaks
   ```

3. **Apply database migrations**
   ```bash
   uv run manage.py migrate
   ```

4. **Run the development server**
   ```bash
   uv run manage.py runserver
   ```

5. **Access the application**
   - Open your browser and navigate to: `http://127.0.0.1:8000/`

---

## 💡 Usage
<p align="center">
  <img src="https://res.cloudinary.com/dxrdnpp47/image/upload/v1767857740/1st_cwog7d.gif" width="600" />
</p>

### Adding a Meal
1. Navigate to the home page
2. Click on the **"Add Meal"** button
3. Fill in the form:
   - **Meal Name**: Enter the name of the meal
   - **Meal Price**: Enter the price in BDT
   - **Date**: Select the date and time
4. Click **Submit**
5. You'll be redirected to a thank you page

### Viewing Statistics
- **Daily Total**: Displayed on the home page (yellow card)
- **Overall Total**: Displayed on the home page (green card)
- Both statistics update automatically based on database records

### Viewing All Meals
1. Click on the **"All Meal"** button from the home page
2. Browse through all recorded meals
3. View total expenses at the bottom

---


**Made with ❤️ Masud Rana**

