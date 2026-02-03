const router = require('express').Router();
const jwt = require('jsonwebtoken');
let Project = require('../models/project.model');

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
}

// Get all projects (Public)
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new project (Owner/Authenticated Users Only)
router.route('/add').post(authenticateToken, (req, res) => {
    // Only owner can add projects
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can add projects' });
    }

    const { title, description, imageUrl, projectUrl, category } = req.body;

    // Validation
    if (!title || !description || !imageUrl || !projectUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({
        title,
        description,
        imageUrl,
        projectUrl,
        category: category || 'React'
    });

    newProject.save()
        .then(() => res.status(201).json({ message: 'Project added!', project: newProject }))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get single project (Public)
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update project (Owner Only)
router.route('/update/:id').post(authenticateToken, (req, res) => {
    // Only owner can update projects
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can update projects' });
    }

    Project.findById(req.params.id)
        .then(project => {
            project.title = req.body.title || project.title;
            project.description = req.body.description || project.description;
            project.imageUrl = req.body.imageUrl || project.imageUrl;
            project.projectUrl = req.body.projectUrl || project.projectUrl;
            project.category = req.body.category || project.category;

            project.save()
                .then(() => res.json({ message: 'Project updated!', project }))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete project (Owner Only)
router.route('/:id').delete(authenticateToken, (req, res) => {
    // Only owner can delete projects
    if (req.userRole !== 'owner') {
      return res.status(403).json({ message: 'Only owner can delete projects' });
    }

    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
