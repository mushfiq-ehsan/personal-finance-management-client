# Personal Finance Management

[🌐 Live Demo](https://personal-finance-managem-17082.web.app/login)  
[📂 GitHub Repository](https://github.com/mushfiq-ehsan/personal-finance-management-client.git)

---

## 📋 Overview
Personal Finance Management is a full-stack application that helps users track income and expenses, manage categories, and visualize overall financial health. Users can securely register/login, add transactions, view dashboards, and switch between light/dark themes.The project includes both a **React frontend** and a **Node.js/Express backend**.

---

## 🖼️ **Screenshot**
<p align="center">
  <img src="./public/0.png" alt="Hero IO Screenshot" width="700"/>
</p>


---

## 🎯 Features
- 🔐 User authentication (Login / Signup)  
- ➕ Add, ✏️ Edit, 🗑 Delete income & expense transactions  
- 🏷 Categorize transactions (Salary, Food, Bills, etc.)  
- 🔎 Filter & search transactions  
- 📊 Dashboard with charts and statistical summaries  
- 🌗 Light / Dark mode support  
- 📱 Fully responsive (mobile, tablet, desktop)  
- 🧩 REST API backend with CRUD operations  
- ⚡ Fast performance with Vite + optimized UI  

---

## 🧰 Tech Stack

### 🖥 Frontend
- React + Vite  
- React Router  
- Tailwind CSS  
- DaisyUI  
- Axios  

### 🛠 Backend
- Node.js  
- Express.js  
- Database: MongoDB (if you used another DB, update this)  
- JWT Authentication  
- RESTful API Endpoints  

### ☁ Deployment
- **Frontend:** Firebase Hosting  
- **Backend:** Vercel  
- Backend Live URL (if applicable):  
  https://personal-finance-management-89l06ojs9.vercel.app

---

## 📦 Dependencies

### Main Dependencies (Frontend)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "daisyui": "^4.x",
    "tailwindcss": "^3.x"
  },
  "devDependencies": {
    "vite": "^5.x"
  }
}
{
  "dependencies": {
    "express": "^4.x",
    "cors": "^2.x",
    "dotenv": "^16.x",
    "mongoose": "^7.x",
    "jsonwebtoken": "^9.x"
  }
}

```

---

## 🖥️ **How to Run Locally**

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/mushfiq-ehsan/personal-finance-management-client.git

cd personal-finance-management-client

npm install

npm run dev

http://localhost:5173/

