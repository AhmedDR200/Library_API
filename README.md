# Library Project

## Project Overview

This project is a Node.js application for managing authors, books, and users. It includes functionalities such as user authentication, author and book management, and file uploading. The application is built using Express.js and MongoDB as the database.

## Table of Contents

1. [Setup](#setup)
2. [Folder Structure](#folder-structure)
3. [Dependencies](#dependencies)
4. [Configuration](#configuration)
5. [Models](#models)
6. [Controllers](#controllers)
7. [Routes](#routes)
8. [Middlewares](#middlewares)
9. [File Upload](#file-upload)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

2. Install dependencies:

```bash
npm install
```

3. Set up the MongoDB connection in the configuration files.

4. Run the application:

```bash
npm start
```

## Folder Structure

The project follows the following folder structure:

```
- controllers
- images
- middlewares
- models
- routes
- views
- uploads
- README.md
- server.js
```

## Dependencies

The main dependencies used in this project include:

- Express.js: Web application framework
- Mongoose: MongoDB object modeling
- Joi: Object schema description language
- Multer: Middleware for handling file uploads
- JWT: JSON Web Token for user authentication

Install these dependencies using `npm install`.

## Configuration

Configuration files are located in the `config` folder. Update the `config.js` file with your MongoDB connection string and any other necessary configurations.

## Models

Three main models are defined:

1. **Author Model**: Represents information about an author.

2. **Book Model**: Represents information about a book, including its author.

3. **User Model**: Represents user information for authentication.

## Controllers

Controllers handle the application's logic. They are responsible for processing requests and returning appropriate responses.

## Routes

Routes define the API endpoints and link requests to the corresponding controllers.

## Middlewares

Middlewares are functions that have access to the request and response objects. They can perform actions before the request reaches the route handler.

## File Upload

The application allows users to upload images. The `/upload` route handles file uploads using Multer middleware.

Feel free to explore the code in each folder for more details on specific functionalities.

**Happy coding!**
