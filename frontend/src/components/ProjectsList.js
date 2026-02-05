import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectsList.css';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', projectUrl: '', category: 'React' });

  useEffect(() => {
    fetchProjects();
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Listen for storage changes (login/logout from other components)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchProjects = () => {
    const apiUrl = 'http://localhost:5000/api';
    axios.get(`${apiUrl}/projects`)
      .then(res => {
        setProjects(res.data);
        setFilteredProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === category));
    }
  };

  const categories = ['All', 'React', 'Node.js', 'Full Stack', 'Mobile'];

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.imageUrl || !newProject.projectUrl) {
      alert('Please fill in all fields');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to add projects');
      return;
    }

    const apiUrl = 'http://localhost:5000/api';
    
    if (editingId) {
      // Update project
      axios.post(`${apiUrl}/projects/update/${editingId}`, newProject, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setProjects(projects.map(p => p._id === editingId ? res.data.project : p));
          setFilteredProjects(filteredProjects.map(p => p._id === editingId ? res.data.project : p));
          setNewProject({ title: '', description: '', imageUrl: '', projectUrl: '', category: 'React' });
          setShowAddProject(false);
          setEditingId(null);
          alert('Project updated successfully!');
        })
        .catch(err => {
          console.error('Error updating project:', err);
          alert(err.response?.data?.message || 'Error updating project');
        });
    } else {
      // Add new project
      axios.post(`${apiUrl}/projects/add`, newProject, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setProjects([...projects, res.data.project]);
          setFilteredProjects([...filteredProjects, res.data.project]);
          setNewProject({ title: '', description: '', imageUrl: '', projectUrl: '', category: 'React' });
          setShowAddProject(false);
          alert('Project added successfully!');
        })
        .catch(err => {
          console.error('Error adding project:', err);
          alert(err.response?.data?.message || 'Error adding project');
        });
    }
  };

  const handleEditProject = (project) => {
    setNewProject(project);
    setEditingId(project._id);
    setShowAddProject(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const token = localStorage.getItem('token');
      const apiUrl = 'http://localhost:5000/api';
      
      axios.delete(`${apiUrl}/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          setProjects(projects.filter(p => p._id !== projectId));
          setFilteredProjects(filteredProjects.filter(p => p._id !== projectId));
          alert('Project deleted successfully!');
        })
        .catch(err => {
          console.error('Error deleting project:', err);
          alert(err.response?.data?.message || 'Error deleting project');
        });
    }
  };

  const handleCancelEdit = () => {
    setNewProject({ title: '', description: '', imageUrl: '', projectUrl: '', category: 'React' });
    setEditingId(null);
    setShowAddProject(false);
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Explore my latest work and achievements</p>
          </div>
          {isAuthenticated && (
            <button className="add-project-btn" onClick={() => {
              handleCancelEdit();
              setShowAddProject(!showAddProject);
            }}>
              {showAddProject ? '✕ Cancel' : '+ Add Project'}
            </button>
          )}
        </div>

        {showAddProject && (
          <form className="add-project-form" onSubmit={handleAddProject}>
            <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                >
                  <option value="React">React</option>
                  <option value="Node.js">Node.js</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="url"
                placeholder="Project URL"
                value={newProject.projectUrl}
                onChange={(e) => setNewProject({...newProject, projectUrl: e.target.value})}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-project-btn">
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        )}

        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="project-overlay">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span className="date">{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  {isAuthenticated && (
                    <div className="project-actions">
                      <button className="edit-btn" onClick={() => handleEditProject(project)}>
                        ✎ Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteProject(project._id)}>
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects">No projects in this category</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsList;


