# Todo List API

This project implements a RESTful API for managing a Todo List using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)


## Features

- **CRUD Operations:** Create, Read, Update, and Delete todos.
- **Validation:** Input validation using Joi.
- **Error Handling:** Middleware for centralized request logging, authentication, and error handling.
- **Testing:** Unit testing with Jest and integration testing with Supertest.
- **Documentation:** Well-documented API endpoints.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aayushb007/To-Do-List-API.git
   ```

2. Install dependencies:

   ```bash
   cd To-Do-List-API
   npm install
   ```
3. Set up environment variables:

   Create a .env file in the root directory and add the following:
    ```bash
      DB_URL=your_mongodb_uri
      JWT_SECRET=your_secret_key
      PORT=3000
     ```
   Replace your_mongodb_uri with your MongoDB connection string.

## Usage

Once the server is running, you can access the API endpoints using tools like Postman or curl.

### Authentication endpoints
- **POST /api/sign-up** - Sign Up
- **POST /api/login** - Login
### Endpoints for managing todos
- **GET /api/todos** - Get all todos
- **GET /api/todos/{id}** - Get a todo by ID
- **POST /api/todos** - Create a new todo
- **PUT /api/todos/{id}** - Update a todo by ID
- **DELETE /api/todos/{id}** - Delete a todo by ID

For detailed request and response examples, refer to the API documentation.

## Testing

Run tests using Jest:

```bash
npm test
