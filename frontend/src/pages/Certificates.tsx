import React, { useState, useEffect } from 'react';
import './Certificates.css';

interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  score?: string;
  assessments?: string;
  description?: string;
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      title: 'The Joy of Computing using Python',
      issuer: 'NPTEL · IIT Madras',
      date: '2021',
      credentialId: 'Elite certificate (NPTEL Online Certification)',
      credentialUrl: 'https://nptel.ac.in/certificate',
      imageUrl: '/nptel-joy-python.png',
      score: 'Consolidated score: 69%',
      assessments: 'Online Assignments: 23.94/25, Programming Exam: 25/25, Proctored Exam: 20/50',
      description: 'Built strong foundations in Python programming and computational thinking through graded assignments and exams.'
    },
    {
      title: 'Data Analytics with Python',
      issuer: 'NPTEL · IIT Roorkee',
      date: '2023',
      credentialId: 'Completed the 12-week NPTEL course (Jan–Apr 2023)',
      credentialUrl: 'https://nptel.ac.in/certificate',
      imageUrl: '/nptel-data-analytics-python.png',
      score: 'Consolidated score: 56%',
      assessments: 'Online Assignments: 24.06/25, Proctored Exam: 31.91/75',
      description: 'Strengthened skills in working with data, basic analysis workflow, and Python-based problem solving through graded assignments and exams.'
    },
    {
      title: 'Technical Project Competition',
      issuer: 'NGF College of Engineering & Technology, Palwal · Ingenious Club (NGFCET Technical Club)',
      date: '11th May 2023',
      credentialId: 'Certificate of Merit / Participation',
      credentialUrl: 'https://ngfcet.ac.in',
      imageUrl: '/ngf-technical-project.jpg',
      score: 'College-level technical competition',
      assessments: 'Event: Technical Project Competition',
      description: 'Participated in a college-level technical competition, showcasing project development, innovation, and problem-solving skills in a competitive environment. Demonstrated practical implementation of technical concepts through a project, enhanced presentation and communication skills, and gained experience in real-world problem-solving and competition environment.'
    }
  ]);

  // Using local certificate data only

  // Simple direct loading without error handling

  return (
    <div className="certificates">
      <div className="container">
        <h1 className="page-title">My Certificates</h1>
        <p className="page-subtitle">
          Certifications and Achievements
        </p>
        
        <div className="certificates-grid">
          {certificates.map((certificate, index) => (
            <div key={certificate._id || index} className="certificate-card">
              <div className="certificate-image" onClick={() => window.open(certificate.imageUrl, '_blank')}>
                <img 
                  src={certificate.imageUrl} 
                  alt={certificate.title}
                  style={{ cursor: 'pointer' }}
                />
                <span className="certificate-badge">{certificate.issuer.includes('IIT Madras') ? 'NPTEL' : certificate.issuer.includes('NGF') ? 'COLLEGE' : 'NPTEL'}</span>
              </div>
              
              <div className="certificate-content">
                <h3>{certificate.title}</h3>
                <p className="certificate-description">{certificate.description}</p>
                
                <div className="certificate-technologies">
                  {certificate.score && (
                    <span className="tech-tag">{certificate.score}</span>
                  )}
                  {certificate.date && (
                    <span className="tech-tag">{certificate.date}</span>
                  )}
                </div>
                
                <div className="certificate-meta">
                  <div className="issuer">
                    <strong>Issuer:</strong> <span>{certificate.issuer}</span>
                  </div>
                  {certificate.credentialId && (
                    <div className="credential-id">
                      <strong>Certificate:</strong> <span>{certificate.credentialId}</span>
                    </div>
                  )}
                  {certificate.assessments && (
                    <div className="assessments">
                      <strong>Assessments:</strong> <span>{certificate.assessments}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="no-certificates">
            <p>No certificates available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
