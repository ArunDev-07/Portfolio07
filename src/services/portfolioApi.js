// src/services/portfolioApi.js
import axios from 'axios';
import { useState, useEffect } from 'react'; // 

// API Configuration
      // Local development
const API_BASE_URL = "https://portfolio-backend-8-lw86.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('📝 Request Data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    console.error('❌ Full Error Object:', error);
    
    // Handle specific error cases
    if (error.response?.status === 422) {
      console.error('❌ Validation Error Details:', error.response.data);
      // DETAILED DEBUG OUTPUT FOR 422 ERRORS
      const validationErrors = error.response.data;
      if (validationErrors.detail && Array.isArray(validationErrors.detail)) {
        console.error('🔍 DETAILED VALIDATION ERRORS:');
        validationErrors.detail.forEach((err, index) => {
          console.error(`🔸 Error ${index + 1}:`);
          console.error(`   Field: ${err.loc?.[1] || 'unknown'}`);
          console.error(`   Message: ${err.msg}`);
          console.error(`   Type: ${err.type}`);
          console.error(`   Input: ${err.input}`);
          console.error(`   Full object:`, err);
        });
      }
    } else if (error.response?.status === 404) {
      console.error('❌ Resource not found');
    } else if (error.response?.status === 500) {
      console.error('❌ Server error');
    }
    
    return Promise.reject(error);
  }
);

// Portfolio API Service
export const portfolioAPI = {
  // ==================== PERSONAL INFO ====================
  /**
   * Get personal information
   * @returns {Promise} Personal info data
   */
  getPersonalInfo: async () => {
    try {
      const response = await api.get('/personal-info');
      return response.data;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      throw error;
    }
  },

  /**
   * Get portfolio statistics
   * @returns {Promise} Stats data
   */
  getStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // ==================== PROJECTS ====================
  /**
   * Get all projects
   * @param {boolean} featured - Filter by featured projects
   * @returns {Promise} Projects array
   */
  getProjects: async (featured = null) => {
    try {
      const params = featured !== null ? { featured } : {};
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * Get specific project by ID
   * @param {string} id - Project ID
   * @returns {Promise} Project data
   */
  getProject: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new project (for admin use)
   * @param {Object} projectData - Project data
   * @returns {Promise} Created project
   */
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // ==================== SKILLS ====================
  /**
   * Get all skills
   * @param {string} category - Filter by category
   * @returns {Promise} Skills array
   */
  getSkills: async (category = null) => {
    try {
      const params = category ? { category } : {};
      const response = await api.get('/skills', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  /**
   * Get all skill categories
   * @returns {Promise} Categories array
   */
  getSkillCategories: async () => {
    try {
      const response = await api.get('/skills/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching skill categories:', error);
      throw error;
    }
  },

  // ==================== EXPERIENCE ====================
  /**
   * Get all experiences
   * @param {string} type - Filter by type (internship, workshop, etc.)
   * @returns {Promise} Experiences array
   */
  getExperiences: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await api.get('/experiences', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  /**
   * Get specific experience by ID
   * @param {string} id - Experience ID
   * @returns {Promise} Experience data
   */
  getExperience: async (id) => {
    try {
      const response = await api.get(`/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      throw error;
    }
  },

  // ==================== SERVICES ====================
  /**
   * Get all services
   * @returns {Promise} Services array
   */
  getServices: async () => {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // ==================== FAQ ====================
  /**
   * Get all FAQ items
   * @returns {Promise} FAQ array
   */
  getFAQ: async () => {
    try {
      const response = await api.get('/faq');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ:', error);
      throw error;
    }
  },

  // ==================== CONTACT ====================
  /**
   * Submit contact form
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - Name
   * @param {string} contactData.email - Email
   * @param {string} contactData.subject - Subject
   * @param {string} contactData.message - Message
   * @returns {Promise} Submission response
   */
  submitContact: async (contactData) => {
    try {
      // Data validation and sanitization
      const sanitizedData = {
        name: contactData.name?.trim() || '',
        email: contactData.email?.trim() || '',
        subject: contactData.subject?.trim() || '',
        message: contactData.message?.trim() || ''
      };

      // Basic client-side validation
      if (!sanitizedData.name) {
        throw new Error('Name is required');
      }
      if (!sanitizedData.email) {
        throw new Error('Email is required');
      }
      if (!sanitizedData.message) {
        throw new Error('Message is required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedData.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('📧 Submitting contact form with data:', sanitizedData);

      const response = await api.post('/contact', sanitizedData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Extract and format error message for user
      if (error.response?.status === 422) {
        const errorData = error.response.data;
        let errorMessage = 'Please check the following fields:\n';
        
        if (errorData.detail) {
          // Handle FastAPI validation errors
          if (Array.isArray(errorData.detail)) {
            console.error('📋 Detailed validation errors:');
            errorData.detail.forEach((err, index) => {
              const fieldName = err.loc?.[1] || 'Field';
              const message = err.msg || 'Invalid value';
              const inputValue = err.input;
              
              console.error(`  ${index + 1}. Field: ${fieldName}`);
              console.error(`     Error: ${message}`);
              console.error(`     Input: ${inputValue}`);
              console.error(`     Type: ${err.type}`);
              console.error(`     Full: `, err);
              
              errorMessage += `• ${fieldName}: ${message}\n`;
            });
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          } else {
            errorMessage = 'Invalid form data. Please check all fields.';
          }
        } else {
          errorMessage = 'Invalid form data. Please check all fields.';
        }
        
        const validationError = new Error(errorMessage);
        validationError.isValidationError = true;
        throw validationError;
      }
      
      throw error;
    }
  },

  // ==================== SEARCH ====================
  /**
   * Search portfolio content
   * @param {string} query - Search query
   * @param {string} category - Category filter
   * @returns {Promise} Search results
   */
  searchContent: async (query, category = null) => {
    try {
      const params = { q: query };
      if (category) params.category = category;
      const response = await api.get('/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  },

  // ==================== ANALYTICS ====================
  /**
   * Get analytics data
   * @returns {Promise} Analytics data
   */
  getAnalytics: async () => {
    try {
      const response = await api.get('/analytics/views');
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // ==================== RESUME ====================
  /**
   * Download resume
   * @returns {Promise} Blob data
   */
  downloadResume: async () => {
    try {
      const response = await api.get('/resume/download', { 
        responseType: 'blob' 
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Arun_G_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return response.data;
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  },

  // ==================== HEALTH CHECK ====================
  /**
   * Check API health
   * @returns {Promise} Health status
   */
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
};

// ==================== REACT HOOKS ====================
// Custom hooks for React components

/**
 * Custom hook for fetching portfolio data
 * @returns {Object} Portfolio data and loading state
 */
export const usePortfolioData = () => {
  const [data, setData] = useState({
    personalInfo: null,
    projects: [],
    skills: [],
    experiences: [],
    services: [],
    faqs: [],
    stats: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [
          personalInfo,
          projects,
          skills,
          experiences,
          services,
          faqs,
          stats
        ] = await Promise.all([
          portfolioAPI.getPersonalInfo(),
          portfolioAPI.getProjects(),
          portfolioAPI.getSkills(),
          portfolioAPI.getExperiences(),
          portfolioAPI.getServices(),
          portfolioAPI.getFAQ(),
          portfolioAPI.getStats()
        ]);

        setData({
          personalInfo,
          projects,
          skills,
          experiences,
          services,
          faqs,
          stats
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch portfolio data');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const refetch = () => {
    fetchAllData();
  };

  return { data, loading, error, refetch };
};

/**
 * Custom hook for contact form
 * @returns {Object} Contact form methods and state
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await portfolioAPI.submitContact(formData);
      
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Failed to send message. Please try again.');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      
      if (error.isValidationError) {
        setErrorMessage(error.message);
      } else if (error.response?.status === 422) {
        setErrorMessage('Please check all fields and try again.');
      } else if (error.response?.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('Failed to send message. Please try again.');
      }
      
      setTimeout(() => {
        setStatus('');
        setErrorMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    status,
    isSubmitting,
    errorMessage,
    handleChange,
    handleSubmit,
    setFormData
  };
};


export const fetchAllData = async () => {
  const [
    personalInfo,
    projects,
    skills,
    experiences,
    services,
    faqs,
    stats
  ] = await Promise.all([
    portfolioAPI.getPersonalInfo(),
    portfolioAPI.getProjects(),
    portfolioAPI.getSkills(),
    portfolioAPI.getExperiences(),
    portfolioAPI.getServices(),
    portfolioAPI.getFAQ(),
    portfolioAPI.getStats()
  ]);

  return {
    personalInfo,
    projects,
    skills,
    experiences,
    services,
    faqs,
    stats
  };
};

// Export default API instance
export default portfolioAPI;