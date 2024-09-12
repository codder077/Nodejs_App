# Nodejs App

## Description

This project is a Node.js application with a REST API that includes authentication and CRUD functionality. It uses JWT for authentication and MongoDB for data storage. The application consists of two main parts:
- **Authentication API**: Handles user registration, login, and token refreshing.
- **CRUD API**: Provides basic CRUD operations for managing items.

## Features

- User registration and login with JWT authentication.
- Token-based authentication for secure access to CRUD operations.
- Ability to create, read, update, and delete items.
- Test suite using Jest to ensure functionality and correctness.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Jest (for testing)
- Supertest (for API testing)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate into the project directory:

    ```bash
    cd project-directory

3. Install dependencies:

    ```bash
    npm install

4. Set up environment variables:

-Create a .env file in the root directory and add the following:

.env
    ```bash
    MONGO_URI=<your-mongodb-connection-string>
    ACCESS_TOKEN_SECRET=<your-access-token-secret>
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    PORT=3001


## Usage

1. Start the server:
    ```bash
    npm start

The server will run on port 3001 (or the port specified in your .env file).

2.  Use the API:

# Authentication API:

- POST /auth/register - Register a new user.
- POST /auth/login - Login and receive access and refresh tokens.
- POST /auth/refresh-token - Refresh access token using the refresh token.

# CRUD API:

- GET /api/items - Get all items.
- POST /api/items - Create a new item.
- PUT /api/items/:id - Update an existing item.
- DELETE /api/items/:id - Delete an item.

## Testing

Run tests:
    ```bash
    npm test
    
This command will run all tests using Jest. Ensure the server is not running on the test port before executing the tests.