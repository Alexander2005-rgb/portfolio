# Owner Registration & Login Setup Guide

## Overview

This guide explains how to set up and register the portfolio owner account for the first time.

---

## **STEP 1: Install Dependencies**

### Backend Dependencies

```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### Frontend Dependencies (if not already installed)

```bash
cd frontend
npm install axios
```

---

## **STEP 2: Configure Environment Variables**

### Backend `.env` file (d:\porftfolip\backend\.env)

Add or update these lines:

```
PORT=5000
ATLAS_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret_key_here
OWNER_REGISTRATION_CODE=portfolio2024secret
```

### Frontend `.env` file (d:\porftfolip\frontend\.env)

```
REACT_APP_API_URL=http://localhost:5000
```

---

## **STEP 3: Start the Application**

### Terminal 1 - Backend Server

```bash
cd backend
npm start
```

Expected output: `MongoDB database connection established successfully`

### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm start
```

Expected output: Application opens at `http://localhost:3000`

---

## **STEP 4: Register as Owner (First Time Only)**

1. **Visit Registration Page**
   - Go to: `http://localhost:3000/register`
   - Or click the "Register" link if available in your frontend

2. **Fill in Owner Details**
   - **Full Name**: Your name (e.g., "John Doe")
   - **Email**: Your email address (e.g., "john@example.com")
   - **Password**: Create a strong password (minimum 6 characters)
   - **Confirm Password**: Re-enter your password
   - **Registration Code**: Enter the code `portfolio2024secret` (or change it in `.env`)

3. **Click "Create Account"**
   - You will be redirected to the home page
   - Your account is now registered in MongoDB

---

## **STEP 5: Login with Your Owner Account**

1. **Click "Login" Button**
   - Located on the right side of the Navbar header

2. **Enter Your Credentials**
   - **Email**: The email you registered with
   - **Password**: The password you created
   - Click "Login"

3. **After Successful Login**
   - You'll see your email displayed in the Navbar instead of "Login"
   - "Logout" button appears next to your name
   - "Add Project" button appears in the Projects section

---

## **STEP 6: Add Projects (As Logged-In Owner)**

Once logged in, you can add projects:

1. **Navigate to Featured Projects Section**
2. **Click "+ Add Project" Button** (only visible when logged in)
3. **Fill in Project Details**
   - **Project Title**: Name of your project
   - **Project Description**: Brief description
   - **Image URL**: URL to project screenshot/image
   - **Category**: Select from React, Node.js, Full Stack, or Mobile
   - **Project URL**: Link to live project or repository
4. **Click "Submit Project"**
   - Project is added to MongoDB
   - Immediately appears in the projects list

---

## **Security Notes**

### Change the Registration Code

To make registration more secure, change the default code:

1. Update in `backend/.env`:

   ```
   OWNER_REGISTRATION_CODE=your_new_secret_code_here
   ```

2. Remember this code for future registrations

### JWT Secret

Change the default JWT secret for production:

1. Update in `backend/.env`:

   ```
   JWT_SECRET=your_very_secure_random_string_here
   ```

2. Generate a secure string: use online tools or `openssl rand -base64 32`

---

## **Troubleshooting**

### "Invalid registration code" Error

- Check that you're using the correct code from `.env` file
- Default code: `portfolio2024secret`

### "Email already registered" Error

- This email is already registered in the database
- Use a different email or delete the user from MongoDB

### "MongoDB connection error"

- Verify `ATLAS_URI` is correct in `.env`
- Check internet connection
- Ensure IP is whitelisted in MongoDB Atlas

### Login button not appearing

- Clear browser cache and refresh
- Check that frontend and backend are both running
- Check browser console for errors (F12)

### Projects not saving

- Check backend server is running on port 5000
- Verify token is being sent with request (check Network tab in DevTools)
- Check MongoDB connection

---

## **Database Structure**

### Users Collection (MongoDB)

```json
{
  "_id": ObjectId,
  "name": "Your Name",
  "email": "your@email.com",
  "password": "hashed_password",
  "role": "owner",
  "createdAt": ISODate
}
```

### Projects Collection

```json
{
  "_id": ObjectId,
  "title": "Project Name",
  "description": "Description",
  "imageUrl": "https://...",
  "projectUrl": "https://...",
  "category": "React",
  "createdAt": ISODate
}
```

---

## **API Endpoints**

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| POST   | `/auth/register-owner` | Register owner account                 |
| POST   | `/auth/login`          | Login and get JWT token                |
| GET    | `/auth/me`             | Get current user info (requires token) |
| POST   | `/projects`            | Add new project (requires token)       |
| GET    | `/projects`            | Get all projects                       |

---

## **Local Storage Data**

After login, the following is stored in browser localStorage:

```javascript
// User info
localStorage.getItem("user");
// Returns: {"_id": "...", "name": "John", "email": "john@example.com", "role": "owner"}

// Authentication token
localStorage.getItem("token");
// Returns: JWT token string
```

---

## **Next Steps**

After successful setup:

1. ✅ Register owner account
2. ✅ Login to portfolio
3. ✅ Add your projects
4. ✅ Customize portfolio information
5. ✅ Deploy to production

For deployment, see: **DEPLOYMENT.md**
