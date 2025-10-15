<h1 align='center'> 🛒 SupperFastShop – Full Stack E-Commerce Platform</h1>

A modern, role-based **E-Commerce Web Application** with authentication, cart management, coupon system, payment integration (Stripe), analytics, and admin controls. Built with **MERN Stack**, Tailwind, Zustand, Stripe, and image handling via **Cloudinary + Sharp**.

---

## 📸 Screenshot

![homepage](/client/public/homepage.jpeg)

---

## ⚙️ Tech Stack

### 🧱 Backend
- **Node.js** & **Express.js** – Server-side framework
- **MongoDB + Mongoose** – NoSQL database
- **JWT** – Auth with refresh tokens
- **bcryptjs** – Password hashing
- **ioredis** – Caching (optional)
- **cookie-parser** – Cookie-based sessions
- **Stripe** – Payment processing
- **Multer + Sharp** – Image upload and compression
- **Cloudinary** – Media storage
- **CORS, dotenv, cross-env** – Environment setup and security
- **Role-based middleware** – Admin vs. user access control

### 🎨 Frontend
- **React (v19)** – UI components
- **React Router DOM (v7)** – Routing
- **Zustand** – Global state
- **Tailwind CSS + DaisyUI** – Styling
- **Axios** – API client
- **@stripe/stripe-js** – Frontend Stripe integration
- **Recharts** – Analytics & chart visualizations
- **Framer Motion + React Hot Toast + Confetti** – Animations & UX

---

## ✨ Features

- 🔐 **User Auth with JWT** (access + refresh tokens)
- 🛒 **Cart system** with quantity, remove, and full clear
- 💳 **Stripe Checkout** with real-time success handling
- 📦 **Product filtering by category & recommendations**
- 🎯 **Admin-only routes** for product creation, deletion, and analytics
- 🎉 **Coupon creation and validation**
- 📈 **Sales Analytics API** with daily/weekly data
- 🖼️ **Image Upload** using Multer, Sharp & Cloudinary
- 📤 **Role-based access**: Users vs. Admins

---

## 🔌 API Endpoints Overview

> Base URL: `/api`

---

### 🔑 Auth Routes

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | `/signup`        | Register user           |
| POST   | `/login`         | Login and issue tokens  |
| POST   | `/logout`        | Invalidate session      |
| POST   | `/refresh`       | Refresh token logic     |
| GET    | `/getProfile`    | Get authenticated user profile |

---

### 🛒 Cart Routes

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/`              | Get items in cart          |
| POST   | `/`              | Add item to cart           |
| PUT    | `/:id`           | Update item quantity       |
| DELETE | `/`              | Remove all cart items      |

---

### 🎟️ Coupon Routes

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/`              | Get all coupons         |
| POST   | `/validate`      | Validate a coupon code  |

---

### 💳 Payment Routes

| Method | Endpoint                      | Description                   |
|--------|-------------------------------|-------------------------------|
| POST   | `/create-checkout-session`    | Stripe checkout integration   |
| POST   | `/checkout-success`           | Stripe post-payment webhook   |

---

### 🛍️ Product Routes

| Method | Endpoint                    | Access       | Description                     |
|--------|-----------------------------|--------------|---------------------------------|
| GET    | `/`                         | Admin only   | Get all products                |
| GET    | `/featured`                | Public       | Get featured products           |
| GET    | `/recommendtion`           | Public       | Get recommended items           |
| GET    | `/category/:category`      | Public       | Filter products by category     |
| POST   | `/`                         | Admin only   | Create product (with image)     |
| PATCH  | `/:id`                      | Admin only   | Toggle featured state           |
| DELETE | `/:productId`               | Admin only   | Delete a product                |

---

### 📊 Analytics Route

| Method | Endpoint         | Access       | Description                      |
|--------|------------------|--------------|----------------------------------|
| GET    | `/analytics`     | Admin only   | Get full sales + daily analytics |

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/ExploreInsight/supperFastShop.git
cd supperFastShop

```
### Install Dependencies
Backend
```shell

npm install

```

 Frontend:
 
 ```shell

cd client
npm install

```

### ⚙️ Setup Environment Variables

In the /server folder, create a .env file and add the following:

```js
 PORT=7001
 MONGO_URI=your-mongodb-uri
 JWT_SECRET=your-jwt-secret
 CLOUDINARY_NAME=your-cloud-name
 CLOUDINARY_API_KEY=your-api-key
 CLOUDINARY_SECRET=your-secret
 ACCESS_TOKEN_SECRET=your-token-secret
 REFRESH_TOKEN_SECRET=your-refresh-secret
 STRIPE_SECRET_KEY=your-stripe-secret
 CLIENT_URL=your-client-url
 UPSTASH_REDIS_URL=your-upstash-secret
```
---

### Run the API

```shell
npm run dev
```
The backend (API) should be running at:
http://localhost:7001 

### Run the frontend

```shell
cd client
npm run dev
```

The frontend should be running at:
http://localhost:5173

---

### 👨‍💻 Author
Chirag
