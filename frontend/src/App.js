import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import ProjectsList from "./components/ProjectsList";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <Navbar />
            <Hero />
            <ProjectsList />
            <Certificates />
            <Skills />
            <Contact />
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
