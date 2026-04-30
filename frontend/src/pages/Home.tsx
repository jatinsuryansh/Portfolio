import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
}

const Home: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: 'Jatin',
    title: 'Full Stack Developer',
    bio: 'Building simple, creative, and user-focused digital solutions. I love creating beautiful, functional applications that solve real-world problems.',
    email: 'your.email@example.com'
  });

  useEffect(() => {
    // Fetch about data from API
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setAboutData(data);
          }
        }
      } catch (error) {
        console.log('Using default data, API not available');
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Hello, I'm {aboutData.name}</h1>
              <h2>{aboutData.title}</h2>
              <p className="hero-bio">{aboutData.bio}</p>
              <div className="hero-cta">
                <a href="/(Jatin_Cv).pdf" download="Jatin_CV.pdf" className="btn btn-primary">Download CV</a>
                <Link to="/contact" className="btn btn-secondary">Contact</Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-photo">
                <img 
                  src="/profile-photo.jpg" 
                  alt={aboutData.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-info">
        <div className="container">
          <div className="info-cards">
            <div className="info-card">
              <h3>Projects</h3>
              <p>Check out my latest work and personal projects</p>
              <Link to="/projects" className="btn btn-outline">Browse Projects</Link>
            </div>
            <div className="info-card">
              <h3>About Me</h3>
              <p>Learn more about my background and experience</p>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
            <div className="info-card">
              <h3>Certificates</h3>
              <p>View my professional certifications and achievements</p>
              <Link to="/certificates" className="btn btn-outline">View Certificates</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
