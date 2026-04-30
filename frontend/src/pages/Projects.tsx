import React, { useState, useEffect } from 'react';
import './Projects.css';

interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  images: string[];
  featured: boolean;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'QUICKART',
      description: 'Developed a full-featured e-commerce web application using Django. Implemented features such as login/logout, signup, order placing with existing or new addresses, order tracking, and a beautiful user interface. Classified products into different categories for easy navigation and browsing.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Django'],
      liveUrl: 'https://example-quickart.com',
      githubUrl: 'https://github.com/username/quickart',
      imageUrl: '/quickart1.png',
      images: ['/quickart1.png', '/quickart2.png'],
      featured: true
    },
    {
      title: 'Face Recognition Attendance System',
      description: 'Desktop attendance app with GUI built using Python Tkinter. Features OpenCV for webcam capture, face detection, and training recognition models. Includes NumPy and Pandas for data handling and standard library for file paths and storage. Register with name, roll number, and email; capture face images; train the model; mark attendance or quit from clear, labeled buttons. Status and attendance log areas keep workflow easy to follow during daily use.',
      technologies: ['Python', 'Tkinter', 'OpenCV', 'NumPy', 'Pandas'],
      liveUrl: 'https://example-attendance.com',
      githubUrl: 'https://github.com/username/face-recognition-attendance',
      imageUrl: '/attendance1.png',
      images: ['/attendance1.png', '/attendance2.png'],
      featured: true
    },
    {
      title: 'Coffee Shop Landing Page UI',
      description: 'Created an engaging and conversion-focused coffee shop UI that highlights products and encourages ordering. Designed a hero landing section with strong headline, background imagery, and a primary Order Now call-to-action. Built a product showcase with pricing and descriptions, category-based navigation (Hot Coffee, Cake, Pastries, Cold Coffee), and interactive buttons/icons. Implemented a clean, modern layout with a consistent color palette plus a structured footer containing useful links and social media.',
      technologies: ['UI Design', 'Responsive Design'],
      liveUrl: 'https://example-coffeeshop.com',
      githubUrl: 'https://github.com/username/coffee-shop-ui',
      imageUrl: '/coffee1.png',
      images: ['/coffee1.png'],
      featured: true
    }
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Using local project data only

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiB2aWV3Qm94PSIwIDAgNDAwIDI1MCI+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTI1IiByPSI1MCIgZmlsbD0iIzAwN2JmZiIvPjxyZWN0IHg9IjUwIiB5PSIxNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  };

  return (
    <div className="projects">
      <div className="container">
        <h1 className="page-title">My Projects</h1>
        <p className="page-subtitle">All projects</p>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={project._id || index} className="project-card">
              <div className="project-image" onClick={() => setSelectedProject(project)}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  onError={handleImageError}
                  style={{ cursor: 'pointer' }}
                />
                {project.featured && (
                  <span className="featured-badge">Images</span>
                )}
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found for the selected filter.</p>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="project-modal" onClick={() => setSelectedProject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedProject.title}</h2>
                <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-image">
                  <div className="image-gallery">
                    {selectedProject.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${selectedProject.title} - Image ${index + 1}`}
                        onError={handleImageError}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image, '_blank');
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="modal-details">
                  <p className="modal-description">{selectedProject.description}</p>
                  <div className="modal-technologies">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
