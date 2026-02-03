# 🚀 Modern Interactive Portfolio Website - MERN Stack

A beautiful, fully-functional portfolio website built with the MERN (MongoDB, Express, React, Node.js) stack. Features a modern design with smooth animations, interactive components, and a fully functional contact system.

## ✨ Features

- **🎨 Modern Design**: Gradient backgrounds, smooth animations, and responsive layout
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **🎯 Interactive Components**:
  - Animated Hero Section with floating emojis
  - Project Showcase with category filtering
  - Skills Display with proficiency levels
  - Contact Form with MongoDB integration
  - Smooth Navigation with scroll effects
- **⚡ Performance Optimized**: Fast loading, optimized animations
- **🔄 Full CRUD Operations**: Manage projects, skills, and contact messages
- **📊 RESTful API**: Well-structured backend API endpoints

## 📋 Project Structure

```
portfolio/
├── backend/
│   ├── models/
│   │   ├── project.model.js      # Project schema
│   │   ├── skill.model.js        # Skill schema
│   │   └── contact.model.js      # Contact schema
│   ├── routes/
│   │   ├── projects.js           # Project routes
│   │   ├── skills.js             # Skills routes
│   │   └── contact.js            # Contact routes
│   ├── server.js                 # Express server setup
│   ├── .env                      # Environment variables
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   ├── Hero.js           # Hero section
│   │   │   ├── ProjectsList.js   # Projects display
│   │   │   ├── Skills.js         # Skills section
│   │   │   ├── Contact.js        # Contact form
│   │   │   ├── Footer.js         # Footer component
│   │   │   └── [styles].css      # Component styles
│   │   ├── App.js                # Main App component
│   │   ├── App.css               # Global styles
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   ├── public/
│   ├── .env                      # Frontend environment variables
│   └── package.json              # Frontend dependencies
```

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing

### Frontend

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with animations
- **Bootstrap 5** - (Optional) Additional styling

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for cloud database) or local MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the frontend directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the React development server**
   ```bash
   npm start
   ```
   The application will open on `http://localhost:3000`

## 🔌 API Endpoints

### Projects

- `GET /projects` - Get all projects
- `POST /projects/add` - Create new project
- `GET /projects/:id` - Get specific project
- `POST /projects/update/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Skills

- `GET /skills` - Get all skills
- `POST /skills/add` - Create new skill
- `GET /skills/:id` - Get specific skill
- `POST /skills/update/:id` - Update skill
- `DELETE /skills/:id` - Delete skill

### Contact

- `GET /contact` - Get all messages
- `POST /contact/add` - Submit contact form
- `GET /contact/:id` - Get specific message
- `POST /contact/update/:id` - Mark as read
- `DELETE /contact/:id` - Delete message

## 📝 Sample Project Data

To add sample projects to your MongoDB:

```javascript
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution with payment integration",
  "imageUrl": "https://via.placeholder.com/400x250",
  "projectUrl": "https://github.com/username/ecommerce",
  "category": "Full Stack"
}
```

## 🎨 Customization

### Change Colors

Edit the gradient colors in CSS files:

- Primary gradient: `#667eea` to `#764ba2`
- Modify in: `Navbar.css`, `Hero.css`, `Skills.css`, etc.

### Update Personal Info

- Update name in `Hero.js`
- Update contact details in `Contact.js`
- Update social links in `Navbar.js` and `Footer.js`

### Add Your Own Content

- Replace placeholder images with your own project screenshots
- Update skill categories and proficiency levels
- Customize color scheme to match your brand

## 🚀 Deployment

### Backend (Heroku, Railway, or similar)

1. Update `.env` with production database URL
2. Deploy using platform-specific instructions

### Frontend (Vercel, Netlify, or GitHub Pages)

1. Update `REACT_APP_API_URL` in `.env` with your production API URL
2. Run `npm run build`
3. Deploy the `build` folder to your hosting service

## 📱 Features in Detail

### Hero Section

- Animated greeting with waving emoji
- Call-to-action buttons with smooth scroll
- Floating animated elements
- Social media links

### Projects Section

- Grid layout with hover effects
- Category filtering
- Image overlays with project links
- Responsive design

### Skills Section

- Categorized by Frontend/Backend/Tools
- Proficiency level indicators
- Color-coded skill levels
- Smooth animations

### Contact Section

- Fully functional contact form
- Form validation
- Success/error messages
- Stores messages in MongoDB
- Contact information display

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure username and password are correct

### CORS Errors

- Verify `CLIENT_URL` in backend `.env`
- Check if backend is running on correct port

### Styles Not Loading

- Clear browser cache
- Restart development servers
- Check file paths in imports

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest improvements
- Submit pull requests
- Share your portfolio modifications

## 📞 Support

For questions or issues, please open an issue in the repository or contact the developers.

---

**Happy Coding! 🎉**

Built with ❤️ using MERN Stack
