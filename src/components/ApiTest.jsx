// src/components/ApiTest.jsx
import React, { useEffect, useState } from 'react';
import { portfolioAPI } from '../services/portfolioApi';

const ApiTest = () => {
  const [projects, setProjects] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        
        // Test health check
        const health = await portfolioAPI.healthCheck();
        console.log('Health check:', health);
        
        // Test projects
        const projectsData = await portfolioAPI.getProjects();
        console.log('Projects:', projectsData);
        setProjects(projectsData);
        
        // Test personal info
        const personalData = await portfolioAPI.getPersonalInfo();
        console.log('Personal info:', personalData);
        setPersonalInfo(personalData);
        
        setLoading(false);
      } catch (err) {
        console.error('API test error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div>Testing API connection...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>✅ API Connection Test Successful!</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Personal Info:</h3>
        <pre>{JSON.stringify(personalInfo, null, 2)}</pre>
      </div>
      
      <div>
        <h3>Projects ({projects.length}):</h3>
        {projects.map(project => (
          <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p><strong>Tech:</strong> {project.tech.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;