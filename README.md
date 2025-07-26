# 🛒 E-Commerce App

A full-stack E-Commerce web application built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend. This app supports product management, user authentication, admin control, cart management, and secure online payments with **Razorpay**.

---

## 📸 Demo (Optional)

<!-- Replace with your live link or screenshot -->
![App Screenshot](./screenshot.png)

---

## 🚀 Tech Stack

### 🔧 Frontend
- React with Vite
- React Router DOM
- Axios
- Tailwind CSS or Bootstrap (whichever you're using)
- Context API or Redux (if applicable)

### 🛠 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Razorpay for payments
- dotenv for environment config

---

## 🎯 Features

### ✅ User Features
- User Registration and Login
- View Products by Category
- Search and Filter Products
- Add to Cart / Remove from Cart
- Checkout with Razorpay
- View Orders

### ⚙️ Admin Features
- Admin Dashboard
- Create / Update / Delete Products
- Manage Categories
- View All Orders
- Update Order Status

---

## 📁 Project Structure
<img width="469" height="606" alt="image" src="https://github.com/user-attachments/assets/3dd7412e-9cf3-4e10-9d12-cfa792604ada" />

ecommerce-app/
├── client/ # Frontend - React + Vite
│ ├── src/
│ ├── .env # Frontend environment variables
│ └── vite.config.js
│
├── server/ # Backend - Node.js + Express
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/db.js # MongoDB connection
│ ├── .env # Backend environment variables
│ └── server.js # Entry point
│
├── .gitignore
└── README.md



---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Rahulkrcse124/ecommerce-app.git
cd ecommerce-app

2. Backend Setup
cd server
npm install

Create a .env file in the server/ folder:
PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret


Start the server:
npm run dev

3. Frontend Setup
cd ../client
npm install

Create a .env file in the client/ folder:
VITE_API=http://localhost:8080
VITE_RAZORPAY_KEY_ID=your_key_id


Start the frontend:
npm run dev

🧪 API Endpoints (Sample)
POST /api/v1/auth/register – Register user
POST /api/v1/auth/login – Login
GET /api/v1/products – All products
POST /api/v1/products – Create product (admin)
POST /api/v1/orders – Place order
GET /api/v1/orders – Get user/admin orders



🧾 Environment Variables Summary
| Key                    | Description                        |
| ---------------------- | ---------------------------------- |
| `MONGO_URI`            | MongoDB connection string          |
| `JWT_SECRET`           | JWT secret for auth                |
| `RAZORPAY_KEY_ID`      | Razorpay public key                |
| `RAZORPAY_KEY_SECRET`  | Razorpay secret key                |
| `VITE_API`             | Backend API base URL (frontend)    |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key for frontend checkout |


✅ .gitignore Summary
node_modules/
.env
.env.*
client/node_modules/
client/.env
dist/
build/
config/db.js
.vscode/


💡 Future Improvements
Add Stripe/PayPal support

Product reviews and ratings

Email/SMS notifications

Pagination & infinite scroll

Mobile responsive enhancements


👨‍💻 Author
Rahul Kumar
GitHub: @Rahulkrcse124
