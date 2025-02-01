# 🛋️ Furniture Management System (MERN) 🏡  

A full-stack **Furniture Management System** built with **MERN (MongoDB, Express.js, React, Node.js)**. Users can browse, search, and purchase furniture, while admins manage products and orders.  

## ✨ Features  
- 🔑 **User Authentication** (JWT-based, Admin roles)  
- 🛍️ **Product Management** (CRUD operations, Cloudinary image uploads)  
- 🛒 **Shopping Cart & Orders** (Add to cart, checkout, track orders)  
- 💳 **Secure Payments** (Stripe & Razorpay integration)  
- 🔎 **Search & Filters** (By name, category, price, bestsellers)  

## 🛠️ Tech Stack  
**Frontend:** React.js, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Cloudinary  

## 📂 Directory Structure  
/backend ├── config/ # Configuration files (MongoDB, Cloudinary) ├── controllers/ # Route logic ├── middleware/ # Authentication & file handling ├── models/ # Mongoose models ├── routes/ # API routes ├── server.js # Main server file

/frontend ├── public/ # Static files ├── src/ # Source files ├── assets/ # Images, constants ├── components/ # Reusable UI components ├── context/ # State management ├── pages/ # App pages ├── App.jsx # Main React component ├── main.jsx # React entry point


## 🚀 Getting Started  
### 1️⃣ Clone the repository  
```sh
git clone https://github.com/your-username/furniture-management.git
cd furniture-management

2️⃣ Install dependencies
sh
Copy
Edit
cd backend && npm install
cd ../frontend && npm install
3️⃣ Configure Environment Variables
Create a .env file in the backend/ directory and add:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
4️⃣ Run the application
sh
Copy
Edit
# Start Backend
cd backend && npm run dev

# Start Frontend
cd ../frontend && npm run dev
🔧 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
POST	/api/products	Create a product (Admin)
PUT	/api/products/:id	Update a product (Admin)
DELETE	/api/products/:id	Delete a product (Admin)
Orders
Method	Endpoint	Description
POST	/api/orders	Place an order
GET	/api/orders/:id	Get order details
📜 License
This project is licensed under the MIT License.

🚀 Built with MERN Stack | 💖 Contributions Welcome!

markdown
Copy
Edit

### ✅ What’s Included:  
- **Project Overview**  
- **Features List**  
- **Tech Stack**  
- **Directory Structure**  
- **Setup Instructions**  
- **API Endpoints**  
- **License and Contribution Info**  

This README is **detailed yet concise**, perfect for GitHub! Let me know if you need modifications. 🚀






