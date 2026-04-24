import React, { useState, useEffect } from 'react';
import './About.css';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  percentage: string;
  description: string;
}

interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: 'Hello, I am Jatin',
    title: '',
    bio: 'I am a Full Stack Developer passionate about creating meaningful and user-focused digital experiences. I enjoy transforming ideas into well-structured and effective solutions, with a focus on simplicity and usability. I am constantly learning, improving, and striving to create better outcomes with every project.',
    email: 'jatinsuryansh4304@gmail.com',
    phone: '08168954304',
    location: 'Palwal , HR',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'MongoDB',  'Responsive design', 'UI/UX Design', 'teamwork', ],
    experience: [],
    education: [
      {
        institution: 'Dayanand Sr. Sec. School',
        degree: '10th class',
        percentage: '84%',
        description: 'HBSE Board - Completed 12th grade with good academic performance'
      },
      {
        institution: 'Jeevan Jyoti Sr. Sec. School',
        degree: '12th class',
        percentage: '78%',
        description: 'HBSE Board - Completed 12th grade with good academic performance'
      },
      {
        institution: 'J.C. BOSE UNIVERSITY OF SCIENCE AND TECHNOLOGY, YMCA',
        degree: 'Bachelor Of Technology in Computer Science Engineering',
        percentage: 'CGPA 7.22',
        description: 'Coursework: DSA, OOPS, DBMS, OS, Computer Network, Computer Architecture, Software Engineering'
      }
    ]
  });

  useEffect(() => {
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
    <div className="about">
      <div className="container">
        <h1 className="page-title">About Me</h1>
        
        <section className="about-intro">
          <div className="intro-content">
            <h2>{aboutData.name}</h2>
            <p className="intro-bio">{aboutData.bio}</p>
          </div>
        </section>

        
        <section className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {aboutData.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <span className="skill-name">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        
        <section className="education-section">
          <h2>Education</h2>
          <div className="timeline">
            {aboutData.education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                    <span className="timeline-date">{edu.percentage}</span>
                  </div>
                  <p>{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
