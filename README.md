# CLYN - Full-Stack E-commerce Platform

Welcome to CLYN! This is a complete, modern e-commerce web application I built from the ground up using the MERN stack (MongoDB, Express, React, Node.js). It serves as a portfolio project to showcase my full-stack development skills.

**Live Demo:** https://clynshop.vercel.app 
---

## What It Does

CLYN simulates a real online store with features for both customers and administrators.

### For Customers:
* Browse a product catalog with images, details, pricing, and options (size/color).
* Filter products by category on the homepage.
* View individual product details.
* Add items to a shopping cart and remove them.
* Register for an account or log in securely (using JWT and httpOnly cookies).
* Go through a checkout process (enter shipping address, review order).
* Place an order (currently saved to the database without live payment processing).
* View their personal order history and details.
* Enjoy a responsive, dark-themed interface with toast notifications and loading indicators.

### For Admins (Protected Area):
* Securely log in with admin privileges.
* Manage the product inventory:
    * Create new products using a form.
    * View a list of all existing products.
    * Update product details through an edit form.
    * Delete products from the store.
* Manage customer orders:
    * View a list of all orders placed.
    * Mark orders as "Delivered".

---

## Tech Stack

This project uses a standard MERN stack configuration:

* **Frontend:** Built with React (using Vite), React Router for navigation, Axios for API calls, CSS Modules for styling, React Toastify for notifications, and React Icons.
* **Backend:** Powered by Node.js and the Express.js framework.
* **Database:** MongoDB Atlas cloud database, using Mongoose as the ODM.
* **Authentication:** Implemented with JSON Web Tokens (jsonwebtoken) for session management, bcryptjs for secure password hashing, and cookie-parser for handling cookies on the backend.
* **Deployment:** The frontend is deployed on Vercel, and the backend runs on Render.

---

## Project Status & Next Steps

This project covers the essential foundation of an e-commerce platform.

* **Payment Integration Note:** The current version features a mock payment flow. Orders are saved successfully to the database, but real payment processing is not implemented. The next logical step for a production site would be integrating a payment gateway like Stripe or Razorpay. The backend has foundational routes prepared for this.
* **Potential Future Ideas:** Search/filtering, user profiles, admin dashboard charts, enhanced mobile table views, quantity adjustments, pagination.

---

## Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Backend Setup:**
    * `cd server`
    * `npm install`
    * Create a `.env` file in the `/server` directory with your `MONGO_URI` (MongoDB connection string) and a `JWT_SECRET` (any secure random string).
    * `npm run dev` (starts on `http://localhost:5000`)
3.  **Frontend Setup:**
    * `cd ../client` (from the root directory)
    * `npm install`
    * `npm run dev` (starts on `http://localhost:5173` or similar)

---

## Author

* **Nishad Raval**
    * [GitHub](https://github.com/NishadRaval)
    * [LinkedIn](https://www.linkedin.com/in/nishadraval)
