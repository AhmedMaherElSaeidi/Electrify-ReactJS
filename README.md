# E-Commerce App Frontend

## Overview

This is the front end of the e-commerce application. It provides a user interface to interact with the backend services, allowing users to browse products, manage their cart, and place orders. The frontend is built with React.js, Sass, and Bootstrap, and utilizes React Hooks and JWT for authentication.

You can find the backend implementation [here](https://github.com/AhmedMaherElSaeidi/Electrify-NodeJS).

## Features

### User Interface
- **Product Browsing**: View and filter products with a responsive layout.
- **Product Details**: Detailed view of product information including images, description, and price.
- **Cart Management**: Add products to the cart, view cart contents, and adjust quantities.
- **Order Placement**: Specify the delivery location and place orders using an intuitive checkout process.

### Authentication
- **Login**: Users can log in using their credentials and receive a JWT for secure access.
- **Registration**: New users can register an account with the necessary details.
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
    git clone https://github.com/AhmedMaherElSaeidi/Electrify-ReactJS.git
    cd Electrify-ReactJS
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
REACT_APP_SERVER_DOMAIN="http://localhost:3600"
REACT_APP_GOOGLE_MAP_KEY="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"

