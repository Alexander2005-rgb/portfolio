import React from 'react';
import './Hero.css';

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="stars"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="wave">👋</span> Hi, I'm SHIVENDRA PATEL
          </h1>
          <p className="hero-subtitle">
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </p>
          <p className="hero-description">
            Building beautiful and functional web experiences with modern technologies
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
              View My Work
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </button>
            <a href="/Shivendra_Patel_Full_Stack_Developer_Resume_Impact_Optimized.pdf" download className="btn btn-tertiary">
              📄 Download Resume
            </a>
          </div>

          <div className="hero-social">
            <a href="https://github.com/Alexander2005-rgb" className="social-link">GitHub</a>
            <a href="https://www.linkedin.com/feed/" className="social-link">LinkedIn</a>
            <a href="https://leetcode.com/u/Alexander_2005/" className="social-link" aria-label="Leetcode">Leetcode</a>
          </div>
        </div>

        <div className="hero-animation">
          <div className="floating-box box1">💻</div>
          <div className="floating-box box2">🎨</div>
          <div className="floating-box box3">⚡</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
