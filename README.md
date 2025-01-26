# Product Hunt Website

A dynamic platform for discovering, sharing, and upvoting tech products. Built using the **MERN stack** with responsive design and role-based user functionalities.

---

## Live Demo

🔗 **[View Live Demo](https://product-hunt-12rr.netlify.app)**

---

## Features

### General Features

- **Responsive Design**: Mobile-first UI with custom components.
- **User Roles**: Normal Users, Moderators, and Admins.
- **JWT Authentication**: Secure login and role-based authorization.
- **Tech Products Management**:
  - Submit, upvote, and review products.
  - Moderators approve/reject submitted products.
  - Admins manage users and website activities.
- **Search and Pagination**: Easily find and navigate through products.
- **Error Handling**: Friendly error pages and toast notifications.
- **Pie Chart Statistics**: Visual insights in the Admin dashboard.

---

## User Roles and Functionalities

### **Normal Users**

- Browse and view tech products.
- Upvote products to show appreciation.
- Submit new tech products for moderation and review.
- Add reviews and report inappropriate or misleading products.

### **Moderators**

- Review product submissions and approve or reject them.
- Handle product reports submitted by users.
- Mark products as featured for enhanced visibility.

### **Admins**

- Manage user roles (Normal User, Moderator, Admin).
- Monitor all site activities through the statistics page in the dashboard.

---

## Tech Stack

### Frontend

- **React** (with Vite)
- **Tailwind CSS**
- **React Router DOM**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB Atlas**

### Authentication & Authorization

- **Firebase Authentication**
- **JWT** for secure access control
