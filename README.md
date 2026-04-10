# Social Media Backend API

A scalable backend API for a social media application built with **Node.js**, **Express**, and **MongoDB**.  
The system supports authentication, real-time communication, and secure user management.

The API follows clean architecture principles and best practices for maintainability, scalability, and security.

---

## Features

- User authentication using **JWT**
- Secure password hashing with **bcrypt**
- RESTful API architecture
- Real-time communication using **WebSockets**
- MongoDB integration with **Mongoose**
- Authentication and authorization middleware
- Modular and scalable project structure
- Centralized error handling
- Environment configuration with **dotenv**

---

## Tech Stack

| Technology | Purpose |
|-----------|--------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| WebSockets | Real-time communication |
| dotenv | Environment configuration |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/social-media-backend.git
```

### 2. Navigate to the project directory

```bash
cd social-media-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 5. Run the development server

```bash
npm run dev
```

---

# Project Structure

```
src
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
│
├── models
│   ├── User.js
│   └── Post.js
│
├── routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── postRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── services
│   └── websocketService.js
│
├── socket
│   └── socketHandler.js
│
├── utils
│   ├── common
│   └── error
│
├── app.controller.js
└── index.js
```

---

# Architecture

The backend follows a **layered architecture** to ensure separation of concerns.

```
Route → Controller → Service → Model → Database
```

### Responsibilities

**Routes**
- Define API endpoints
- Connect endpoints to controllers

**Controllers**
- Handle incoming requests
- Validate input
- Call services

**Services**
- Contain business logic

**Models**
- Interact with MongoDB using Mongoose

---

# Authentication Flow

1. User registers with email and password
2. Password is hashed using **bcrypt**
3. On login, a **JWT token** is generated
4. Protected routes verify the token using middleware

---

# Real-Time Features

WebSockets enable real-time functionality such as:

- Messaging
- Notifications
- Live updates

A dedicated socket handler manages connections and events.

---

# Available Scripts

```bash
npm run dev     # start development server
npm start       # start production server
```

---

# Environment Variables

Example `.env` configuration:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/social_app
JWT_SECRET=your_secret_key
```

---

# Security Practices

- Password hashing using **bcrypt**
- Token-based authentication using **JWT**
- Protected routes with authentication middleware
- Sensitive data stored in environment variables

---

# Future Improvements

- API documentation with Swagger
- Rate limiting and request throttling
- Unit and integration testing
- Docker containerization
- CI/CD pipeline

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request
