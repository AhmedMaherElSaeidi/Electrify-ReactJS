# E-Commerce App Frontend

## Overview

This is the frontend for the e-commerce application. It provides a user interface to interact with the backend services, allowing users to browse products, manage their cart, and place orders. The frontend is built with React.js, Sass, Bootstrap, and utilizes React Hooks and JWT for authentication.

You can find the backend implementation [here](https://github.com/AhmedMaherElSaeidi/Electrify-NodeJS).

## Tech Stack

- **React.js**: JavaScript library for building user interfaces.
- **Sass**: CSS preprocessor for advanced styling and theming.
- **Bootstrap**: CSS framework for responsive and mobile-first design.
- **React Hooks**: For managing state and lifecycle in functional components.
- **react-router-dom**: For handling routing and navigation within the application.
- **use-form-hook**: For managing and validating form inputs.
- **guards.jsx**: For protecting routes and managing access control based on user authentication.

## Features

### User Interface
- **Product Browsing**: View and filter products with a responsive layout.
- **Product Details**: Detailed view of product information including images, description, and price.
- **Cart Management**: Add products to the cart, view cart contents, and adjust quantities.
- **Order Placement**: Specify delivery location and place orders with an intuitive checkout process.

### Authentication
- **Login**: Users can log in using their credentials and receive a JWT for secure access.
- **Registration**: New users can register an account with necessary details.
- **Profile Management**: Users can update their profile information and view their order history.

### Routing
- **Page Navigation**: Utilize `react-router-dom` for handling navigation between different pages.
- **Protected Routes**: Use `guards.jsx` to protect routes and ensure only authenticated users can access certain pages.

### Form Management
- **Form Handling**: Use `use-form-hook` to manage form states and validation efficiently.

### Styling and Theming
- **Sass**: Custom styles and themes to enhance the look and feel of the application.
- **Bootstrap**: Responsive design elements and components for a consistent user experience.

### State Management
- **React Hooks**: Manage state and side effects in functional components using hooks like `useState`, `useEffect`, and custom hooks.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ecommerce-app.git
    cd ecommerce-app/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

   The application will be available at `http://localhost:3000`.

### Environment Variables

Ensure you have the following environment variables set in your `.env` file:

```plaintext
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_SECRET=your_jwt_secret
