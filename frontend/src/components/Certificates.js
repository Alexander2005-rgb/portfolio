import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Certificates.css';

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    certificateUrl: '',
    certificateImage: '',
    description: '',
    category: 'Web Development'
  });

  useEffect(() => {
    fetchCertificates();
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

  const fetchCertificates = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    axios.get(`${apiUrl}/certificates`)
      .then(res => {
        setCertificates(res.data);
        setFilteredCertificates(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter(c => c.category === category));
    }
  };

  const categories = ['All', 'Web Development', 'Backend', 'Cloud', 'DevOps', 'Database', 'Other'];

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!newCertificate.title || !newCertificate.issuer || !newCertificate.issueDate || !newCertificate.certificateUrl) {
      alert('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to add certificates');
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    if (editingId) {
      // Update certificate
      axios.post(`${apiUrl}/certificates/update/${editingId}`, newCertificate, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setCertificates(certificates.map(c => c._id === editingId ? res.data.certificate : c));
          setFilteredCertificates(filteredCertificates.map(c => c._id === editingId ? res.data.certificate : c));
          setNewCertificate({
            title: '',
            issuer: '',
            issueDate: '',
            credentialId: '',
            credentialUrl: '',
            certificateUrl: '',
            description: '',
            category: 'Web Development'
          });
          setShowAddCertificate(false);
          setEditingId(null);
          alert('Certificate updated successfully!');
        })
        .catch(err => {
          console.error('Error updating certificate:', err);
          alert(err.response?.data?.message || 'Error updating certificate');
        });
    } else {
      // Add new certificate
      axios.post(`${apiUrl}/certificates/add`, newCertificate, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setCertificates([...certificates, res.data.certificate]);
          setFilteredCertificates([...filteredCertificates, res.data.certificate]);
          setNewCertificate({
            title: '',
            issuer: '',
            issueDate: '',
            credentialId: '',
            credentialUrl: '',
            certificateUrl: '',
            description: '',
            category: 'Web Development'
          });
          setShowAddCertificate(false);
          alert('Certificate added successfully!');
        })
        .catch(err => {
          console.error('Error adding certificate:', err);
          alert(err.response?.data?.message || 'Error adding certificate');
        });
    }
  };

  const handleEditCertificate = (certificate) => {
    setNewCertificate(certificate);
    setEditingId(certificate._id);
    setShowAddCertificate(true);
  };

  const handleDeleteCertificate = (certificateId) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to delete certificates');
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    axios.delete(`${apiUrl}/certificates/${certificateId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setCertificates(certificates.filter(c => c._id !== certificateId));
        setFilteredCertificates(filteredCertificates.filter(c => c._id !== certificateId));
        alert('Certificate deleted successfully!');
      })
      .catch(err => {
        console.error('Error deleting certificate:', err);
        alert(err.response?.data?.message || 'Error deleting certificate');
      });
  };

  const handleCancelEdit = () => {
    setNewCertificate({
      title: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
      credentialUrl: '',
      certificateUrl: '',
      certificateImage: '',
      description: '',
      category: 'Web Development'
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="loading">Loading certificates...</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-container">
        <div className="certificates-header">
          <div>
            <h2 className="section-title">Professional Certificates</h2>
            <p className="section-subtitle">Certifications and achievements in my learning journey</p>
          </div>
          {isAuthenticated && (
            <button className="add-certificate-btn" onClick={() => {
              handleCancelEdit();
              setShowAddCertificate(!showAddCertificate);
            }}>
              {showAddCertificate ? '✕ Cancel' : '+ Add Certificate'}
            </button>
          )}
        </div>

        {showAddCertificate && (
          <form className="add-certificate-form" onSubmit={handleAddCertificate}>
            <h3>{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Certificate Title"
                value={newCertificate.title}
                onChange={(e) => setNewCertificate({...newCertificate, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Issuing Organization"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  value={newCertificate.issueDate.split('T')[0]}
                  onChange={(e) => setNewCertificate({...newCertificate, issueDate: new Date(e.target.value).toISOString()})}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={newCertificate.category}
                  onChange={(e) => setNewCertificate({...newCertificate, category: e.target.value})}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Backend">Backend</option>
                  <option value="Cloud">Cloud</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Database">Database</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Certificate URL (link to certificate)"
                value={newCertificate.certificateUrl}
                onChange={(e) => setNewCertificate({...newCertificate, certificateUrl: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Certificate Image URL (optional - image preview)"
                value={newCertificate.certificateImage}
                onChange={(e) => setNewCertificate({...newCertificate, certificateImage: e.target.value})}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Credential ID (optional)"
                  value={newCertificate.credentialId}
                  onChange={(e) => setNewCertificate({...newCertificate, credentialId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Credential URL (optional)"
                  value={newCertificate.credentialUrl}
                  onChange={(e) => setNewCertificate({...newCertificate, credentialUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Description (optional)"
                value={newCertificate.description}
                onChange={(e) => setNewCertificate({...newCertificate, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update Certificate' : 'Add Certificate'}
              </button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        )}

        <div className="certificates-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredCertificates.length === 0 ? (
          <div className="no-certificates">
            <p>No certificates found in this category.</p>
          </div>
        ) : (
          <div className="certificates-grid">
            {filteredCertificates.map(certificate => (
              <div key={certificate._id} className="certificate-card">
                {certificate.certificateImage ? (
                  <div className="certificate-card-image-only">
                    <img src={certificate.certificateImage} alt={certificate.title} className="certificate-full-image" />
                    {isAuthenticated && (
                      <div className="certificate-card-actions">
                        <button className="edit-btn" onClick={() => handleEditCertificate(certificate)}>
                          ✎ Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteCertificate(certificate._id)}>
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="certificate-card-content">
                    <div className="certificate-top">
                      <div className="certificate-badge">🏆</div>
                      <h3>{certificate.title}</h3>
                      <p className="certificate-issuer">{certificate.issuer}</p>
                      <p className="certificate-date">{formatDate(certificate.issueDate)}</p>
                      <div className="certificate-category">
                        <span className="category-tag">{certificate.category}</span>
                      </div>
                      <div className="certificate-links">
                        {certificate.certificateUrl && (
                          <a href={certificate.certificateUrl} target="_blank" rel="noopener noreferrer" className="view-cert-link">
                            View Certificate
                          </a>
                        )}
                        {certificate.credentialUrl && (
                          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="view-cert-link">
                            Verify Credential
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="certificate-bottom">
                      {certificate.description && (
                        <p className="certificate-description">{certificate.description}</p>
                      )}
                      {isAuthenticated && (
                        <div className="certificate-actions">
                          <button className="edit-btn" onClick={() => handleEditCertificate(certificate)}>
                            ✎ Edit
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteCertificate(certificate._id)}>
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
