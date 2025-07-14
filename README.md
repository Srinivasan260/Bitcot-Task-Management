# Task Management API (JavaScript)

This is a backend service for a Task Management application, built with Node.js and Express.js. It uses MongoDB for data storage, Elasticsearch for search, and supports file uploads.

## Tech Stack

-   **Framework**: Express.js
-   **Language**: JavaScript (ESM)
-   **Database**: MongoDB with Mongoose
-   **Search**: Elasticsearch
-   **Authentication**: JSON Web Tokens (JWT)
-   **Validation**: Joi
-   **File Uploads**: Multer


## Prerequisites

-   [Node.js](https://nodejs.org/) (v16.x or higher recommended)
-   [MongoDB](https://www.mongodb.com/)
-   [Elasticsearch](https://www.elastic.co/elasticsearch/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Srinivasan260/Bitcot-Task-Management.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Task_Management
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Server Port
PORT=3000

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/task_management_db

# Elasticsearch Node URL
ELASTICSEARCH_NODE=http://localhost:9200

# JWT Secret and Expiry
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h


```

## Available Scripts

-   **`npm start`**: Runs the server in production mode.
-   **`npm run dev`**: Runs the server in development mode with hot-reloading using `nodemon`.
-   **`npm test`**: (Not yet implemented).

## API Endpoints

### Authentication

-   `POST /api/auth/login`: Authenticate a user.
-   `POST /api/auth/forgot-password`: Send a password reset email.
-   `POST /api/auth/reset-password/:token`: Update password using a reset token.

### Users

-   `POST /api/users/register`: Register a new user.
-   `PUT /api/users/update/:id`: Update a user's details (protected).
-   `DELETE /api/users/:id`: Delete a user (protected).

### Tasks

-   `POST /api/tasks`: Create a new task, with optional file upload (protected).
-   `GET /api/tasks`: Get all tasks for the logged-in user (protected).
-   `PUT /api/tasks/:id/status`: Update the status of a specific task (protected).

### Activity Logs

-   `GET /api/activities`: Fetch activity logs for the logged-in user (protected).