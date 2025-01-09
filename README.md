# E-Commerce Website

# Overview

A fully functional e-commerce platform featuring shopping cart, favorites, and product displays, including various brands. The project includes two user roles: **Admin** and **User**. Admins have advanced control over data, while users can browse and interact with products.

# Features

### General Features

- **Product Display**: Showcase products with details like brand and description.
- **Shopping Cart**: Add products to a cart for purchasing.
- **Favorites**: Save favorite products for later.

### Admin Features

- **Dashboard Management**:
  - Full control over products (add, edit, delete).
  - Manage users (delete only).

### User Features

- Browse and view products.
- Add products to cart or favorites.

# Technologies Used

- **Frontend**:
  - React.js
  - Bootstrap
  - CSS
  - Pure JavaScript
- **State Management**:
  - Context API
- **API Integration**: All data and functionalities are powered by APIs.

# Folder Structure

```bash
src/
|-- ComponentsProducts/  # Product components
|   |-- Auth/            # Authentication components (login and registration)
|   |-- Brands/          # Brand components
|   |-- Cart/            # Shopping cart components
|   |-- Context/         # Context API files
|   |-- Dashboard/       # Admin dashboard components
|   |-- Home/            # Home page components
|   |-- Navbar/          # Navigation bar components
|   |-- Products/        # Product-related components
|-- images/              # Image files
|-- App.css              # Application styling file
|-- App.js               # Main application component
|-- App.test.js          # Application test files
|-- index.css            # Main page styling file
|-- index.js             # React entry point file
|-- logo.svg             # Application logo file
|-- reportWebVitals.js   # Application performance reporting
|-- setupTests.js        # Testing setup configuration
```
