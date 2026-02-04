# User Management via Postman Guide

## **Overview**

This guide explains how to manage users using Postman. Only the portfolio owner can create, view, and delete users via these endpoints.

---

## **Prerequisites**

1. Backend server running on `http://localhost:5000`
2. Postman installed ([Download here](https://www.postman.com/downloads/))
3. Owner account created and logged in once to get JWT token

---

## **Step 1: Owner Registration (First Time Only)**

### Register Owner Account

**URL:** `POST http://localhost:5000/auth/register-owner`

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "name": "Your Name",
  "email": "owner@example.com",
  "password": "securepassword123",
  "registrationCode": "portfolio2024secret"
}
```

**Response (Success 201):**

```json
{
  "message": "Owner registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1234567890abcdef12345",
    "name": "Your Name",
    "email": "owner@example.com",
    "role": "owner"
  }
}
```

**Save the token!** You'll need it for admin operations.

---

## **Step 2: Owner Login**

### Login to Get Fresh Token

**URL:** `POST http://localhost:5000/auth/login`

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "email": "owner@example.com",
  "password": "securepassword123"
}
```

**Response (Success 200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1234567890abcdef12345",
    "name": "Your Name",
    "email": "owner@example.com",
    "role": "owner"
  }
}
```

**Copy the token value** (without quotes) - You'll use this in Authorization headers for admin operations.

---

## **Step 3: Create User via Postman (Admin Only)**

### Add New User

**URL:** `POST http://localhost:5000/auth/create-user`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <YOUR_JWT_TOKEN_HERE>
```

**Important:** Replace `<YOUR_JWT_TOKEN_HERE>` with the token you got from login. Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWYxMjM0NTY3ODkwYWJjZGVmMTIzNDUiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3MTA0MDAwMDB9.xyz...
```

**Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "userpassword123"
}
```

**Response (Success 201):**

```json
{
  "message": "User created successfully by owner",
  "user": {
    "_id": "65f2345678901bcdef234567",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**

- `400 - "Email already registered"` → Email exists in database
- `400 - "Password must be at least 6 characters"` → Password too short
- `403 - "Only owner can create users"` → Token is not from owner account
- `401 - "No token provided"` → Missing Authorization header

---

## **Step 4: View All Users (Admin Only)**

### Get All Users List

**URL:** `GET http://localhost:5000/auth/users`

**Headers:**

```
Authorization: Bearer <YOUR_JWT_TOKEN_HERE>
```

**Response (Success 200):**

```json
[
  {
    "_id": "65f1234567890abcdef12345",
    "name": "Your Name",
    "email": "owner@example.com",
    "role": "owner",
    "createdAt": "2024-02-03T10:30:00.000Z"
  },
  {
    "_id": "65f2345678901bcdef234567",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-02-03T11:45:00.000Z"
  }
]
```

---

## **Step 5: Delete User (Admin Only)**

### Remove a User

**URL:** `DELETE http://localhost:5000/auth/delete-user/{userId}`

Replace `{userId}` with the actual user ID. Example:

```
DELETE http://localhost:5000/auth/delete-user/65f2345678901bcdef234567
```

**Headers:**

```
Authorization: Bearer <YOUR_JWT_TOKEN_HERE>
```

**Response (Success 200):**

```json
{
  "message": "User deleted successfully",
  "user": {
    "_id": "65f2345678901bcdef234567",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## **Step 6: Add Project (Owner Only)**

### Create New Project

**URL:** `POST http://localhost:5000/projects/add`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <YOUR_JWT_TOKEN_HERE>
```

**Body (JSON):**

```json
{
  "title": "My React App",
  "description": "A modern portfolio built with React",
  "imageUrl": "https://example.com/image.jpg",
  "projectUrl": "https://myapp.com",
  "category": "React"
}
```

**Response (Success 201):**

```json
{
  "message": "Project added!",
  "project": {
    "_id": "65f3456789012cdef345678",
    "title": "My React App",
    "description": "A modern portfolio built with React",
    "imageUrl": "https://example.com/image.jpg",
    "projectUrl": "https://myapp.com",
    "category": "React",
    "createdAt": "2024-02-03T12:00:00.000Z"
  }
}
```

---

## **Quick Reference Table**

| Operation          | Method | URL                     | Auth Required | Role Required |
| ------------------ | ------ | ----------------------- | ------------- | ------------- |
| Register Owner     | POST   | `/auth/register-owner`  | Code          | -             |
| Login              | POST   | `/auth/login`           | No            | -             |
| Get Current User   | GET    | `/auth/me`              | Token         | Any           |
| Create User        | POST   | `/auth/create-user`     | Token         | Owner         |
| View All Users     | GET    | `/auth/users`           | Token         | Owner         |
| Delete User        | DELETE | `/auth/delete-user/:id` | Token         | Owner         |
| Get All Projects   | GET    | `/projects`             | No            | -             |
| Add Project        | POST   | `/projects/add`         | Token         | Owner         |
| Get Single Project | GET    | `/projects/:id`         | No            | -             |
| Update Project     | POST   | `/projects/update/:id`  | Token         | Owner         |
| Delete Project     | DELETE | `/projects/:id`         | Token         | Owner         |

---

## **Setting Up Postman Environment Variables**

To avoid manually entering the token each time:

1. **Create Environment** (Top left dropdown)
2. **Add Variable:**
   - Variable name: `token`
   - Initial value: (leave empty)
   - Current value: (leave empty)

3. **After login**, copy the token and set in Postman:

   ```
   {{token}}
   ```

4. **In headers**, use:

   ```
   Authorization: Bearer {{token}}
   ```

5. **In URLs**, use:
   ```
   {{baseUrl}}/auth/login
   ```

---

## **Security Best Practices**

1. **Change the registration code** in `backend/.env`:

   ```
   OWNER_REGISTRATION_CODE=your_new_secret_code
   ```

2. **Change the JWT secret** in `backend/.env`:

   ```
   JWT_SECRET=a_very_long_random_string_here
   ```

3. **Never share tokens publicly** - They grant full access to admin functions

4. **Use HTTPS in production** - Tokens should only travel over encrypted connections

5. **Set token expiration** - Current setting is 7 days

---

## **Common Issues & Solutions**

| Issue                               | Solution                                        |
| ----------------------------------- | ----------------------------------------------- |
| `403 - Only owner can create users` | Use owner's token, not regular user's           |
| `401 - No token provided`           | Add Authorization header with Bearer token      |
| `400 - Email already registered`    | User already exists, use different email        |
| `undefined is not a function`       | Check token format - should be `Bearer {token}` |
| Token expired                       | Login again to get fresh token                  |

---

## **Example Postman Collection**

Import this JSON into Postman (File → Import):

```json
{
  "info": {
    "name": "Portfolio API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register Owner",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/register-owner",
            "body": {
              "mode": "raw",
              "raw": "{\"name\":\"Your Name\",\"email\":\"owner@example.com\",\"password\":\"password123\",\"registrationCode\":\"portfolio2024secret\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"owner@example.com\",\"password\":\"password123\"}"
            }
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/create-user",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"name\":\"User Name\",\"email\":\"user@example.com\",\"password\":\"password123\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

End of Guide ✅
