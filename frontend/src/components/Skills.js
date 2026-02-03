import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultSkills = [
    { name: 'React', category: 'Frontend', icon: '⚛️', level: 'Expert' },
    { name: 'JavaScript', category: 'Frontend', icon: '📜', level: 'Expert' },
    { name: 'CSS/SCSS', category: 'Frontend', icon: '🎨', level: 'Expert' },
    { name: 'C++', category: 'Coding', icon: '🧑‍💻', level: 'Expert' },
     { name: 'Python', category: 'Coding', icon: '🐍', level: 'Advanced' },
    { name: 'Node.js', category: 'Backend', icon: '🟢', level: 'Advanced' },
    
    { name: 'MongoDB', category: 'Backend', icon: '🍃', level: 'Advanced' },
    { name: 'Express', category: 'Backend', icon: '⚡', level: 'Advanced' },
     { name: 'Git', category: 'Tools', icon: '🔧', level: 'Advanced' },
    { name: 'Docker', category: 'Tools', icon: '🐳', level: 'Intermediate' },
  ];

  const fetchSkills = useCallback(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    axios.get(`${apiUrl}/skills`)
      .then(res => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        // Set default skills if API fails
        setSkills(defaultSkills);
        setLoading(false);
      });
  }, [defaultSkills]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const groupedSkills = {};
  (skills.length > 0 ? skills : defaultSkills).forEach(skill => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });

  const levelColors = {
    'Beginner': '#FFA500',
    'Intermediate': '#FFD700',
    'Advanced': '#4169E1',
    'Expert': '#228B22'
  };

  if (loading) {
    return <div className="loading">Loading skills...</div>;
  }

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills-grid">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-level">
                      <div className="level-bar">
                        <div
                          className="level-fill"
                          style={{
                            width: getLevelWidth(skill.level),
                            backgroundColor: levelColors[skill.level] || '#667eea'
                          }}
                        ></div>
                      </div>
                      <span className="level-text">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const getLevelWidth = (level) => {
  const levels = {
    'Beginner': '25%',
    'Intermediate': '50%',
    'Advanced': '75%',
    'Expert': '100%'
  };
  return levels[level] || '50%';
};

export default Skills;
