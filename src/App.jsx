import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import usePortfolioData from './hook/usePortfolioData';
import useContactForm from './hook/useContactForm';

import portfolio from './Portfolio.png';

import {
  ChevronRight, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code2, Database, Globe, Server,Instagram,
  Calendar, GraduationCap, Briefcase, Send, ArrowRight, User, Star, Award, Target, Zap, X, FileText,
  Building, Clock, CheckCircle, Circle, Monitor, Smartphone, Layers, Cpu, Sparkles, Download, Eye,
  Menu, ChevronDown, Play, Pause, Volume2, VolumeX
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [formStatus, setFormStatus] = useState(''); // Add this line


  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const { portfolioData, loading: apiLoading } = usePortfolioData();

  const {
    personalInfo,
    projects,
    skills,
    experiences,
    services,
    faqs,
    stats
  } = portfolioData || {};

const {
  formData,
  status,
  isSubmitting,
  handleChange,
  handleFormSubmit // ✅ use this, not handleSubmit
} = useContactForm();


  





  useEffect(() => {
    if (!apiLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [apiLoading]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    setIsScrolling(true);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        let targetPosition;
        if (sectionId === 'home') {
          targetPosition = 0;
        } else {
          targetPosition = element.offsetTop - navbarHeight - 10;
        }

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = [
        'home',
        'about',
        'services',
        'Projects',
        'experience',
        'contact'
      ];
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const scrollY = window.scrollY;

      let currentSection = 'home';

      if (scrollY < 100) {
        currentSection = 'home';
      } else if (
        scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100
      ) {
        currentSection = 'contact';
      } else {
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (
              scrollY + navbarHeight + 50 >= elementTop &&
              scrollY + navbarHeight + 50 < elementBottom
            ) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const downloadResume = async () => {
    try {
      await portfolioAPI.downloadResume();
    } catch (error) {
      console.error('Error downloading resume:', error);
      const resumeWindow = window.open('', '_blank');
      
      const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo?.name || 'Arun G'} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1f2937;
            color: white;
            line-height: 1.4;
            font-size: 12px;
        }
        
        .resume-container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: #1f2937;
            padding: 15mm;
            position: relative;
            box-sizing: border-box;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 12px;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            color: white;
        }
        
        .subtitle {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 300;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
            height: calc(100% - 120px);
        }
        
        .left-column {
            background: rgba(55, 65, 81, 0.8);
            padding: 20px;
            border-radius: 12px;
            height: fit-content;
        }
        
        .right-column {
            padding: 0 10px;
        }
        
        .section {
            margin-bottom: 18px;
        }
        
        .section-title {
            color: #60a5fa;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #3b82f6;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .contact-info {
            background: rgba(31, 41, 55, 0.8);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 10px;
            color: #d1d5db;
        }
        
        .contact-icon {
            width: 12px;
            height: 12px;
            color: #60a5fa;
        }
        
        .skills-section {
            background: rgba(31, 41, 55, 0.8);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        
        .skill-category {
            margin-bottom: 10px;
        }
        
        .skill-category h4 {
            color: #60a5fa;
            margin-bottom: 4px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .skill-category p {
            font-size: 10px;
            color: #d1d5db;
            line-height: 1.3;
        }
        
        .languages {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .language-item {
            background: rgba(59, 130, 246, 0.2);
            padding: 4px 8px;
            border-radius: 12px;
            border: 1px solid #3b82f6;
            color: #60a5fa;
            font-size: 10px;
            font-weight: 500;
        }
        
        .profile-section {
            background: rgba(55, 65, 81, 0.8);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        
        .profile-text {
            font-size: 11px;
            color: #d1d5db;
            line-height: 1.4;
        }
        
        .experience-item {
            background: rgba(55, 65, 81, 0.8);
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 12px;
        }
        
        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
        }
        
        .experience-title {
            font-weight: 600;
            color: white;
            font-size: 12px;
        }
        
        .experience-company {
            color: #60a5fa;
            font-weight: 500;
            font-size: 11px;
        }
        
        .experience-period {
            background: #3b82f6;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 9px;
            font-weight: 500;
            white-space: nowrap;
        }
        
        .experience-description {
            font-size: 10px;
            color: #d1d5db;
            line-height: 1.3;
        }
        
        .projects-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }
        
        .project-item {
            background: rgba(55, 65, 81, 0.8);
            padding: 8px;
            border-radius: 6px;
        }
        
        .project-title {
            color: white;
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 3px;
        }
        
        .project-tech {
            color: #60a5fa;
            font-size: 9px;
        }
        
        .education-item {
            background: rgba(55, 65, 81, 0.8);
            padding: 12px;
            border-radius: 8px;
        }
        
        .education-title {
            font-weight: 600;
            color: white;
            font-size: 12px;
        }
        
        .education-school {
            color: #60a5fa;
            font-size: 11px;
            margin-bottom: 4px;
        }
        
        .checkmark {
            color: #10b981;
            font-size: 12px;
            margin-right: 4px;
        }
        
        .feature-list {
            font-size: 10px;
            color: #d1d5db;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 3px;
        }
        
        .stats-container {
            display: flex;
            justify-content: space-around;
            margin: 15px 0;
            padding: 10px;
            background: rgba(55, 65, 81, 0.8);
            border-radius: 8px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 16px;
            font-weight: 700;
            color: #60a5fa;
            margin-bottom: 2px;
        }
        
        .stat-label {
            font-size: 9px;
            color: #d1d5db;
        }
        
        @media print {
            body {
                background: #1f2937 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            
            .resume-container {
                width: 100%;
                min-height: 100vh;
                margin: 0;
                padding: 10mm;
                page-break-inside: avoid;
            }
            
            .main-content {
                height: auto;
            }
            
            .section {
                margin-bottom: 12px;
            }
            
            .experience-item, .project-item, .education-item {
                margin-bottom: 8px;
            }
            
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
        }
        
        @page {
            size: A4;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="header">
            <h1>${personalInfo?.name || 'ARUN G'}</h1>
            <div class="subtitle">${personalInfo?.title || 'PYTHON FULL STACK DEVELOPER'}</div>
        </div>
        
        <div class="main-content">
            <div class="left-column">
                <div class="section">
                    <h3 class="section-title">📞 CONTACT</h3>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon">📱</span>
                            <span>${personalInfo?.phone || '+91 7305096778'}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">✉️</span>
                            <span>${personalInfo?.email || 'arunaakash675@gmail.com'}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span>${personalInfo?.location || 'Coimbatore, Tamil Nadu'}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🔗</span>
                            <span>${personalInfo?.github || 'github.com/ArunDev-07'}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">💼</span>
                            <span>${personalInfo?.linkedin || 'linkedin.com/in/arun-g-87515a36b'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3 class="section-title">🛠️ SKILLS</h3>
                    <div class="skills-section">
                        <div class="skill-category">
                            <h4>Frontend:</h4>
                            <p>HTML, CSS, JavaScript, TypeScript, Tailwind CSS, React JS</p>
                        </div>
                        <div class="skill-category">
                            <h4>Backend:</h4>
                            <p>Python, FastAPI</p>
                        </div>
                        <div class="skill-category">
                            <h4>Database:</h4>
                            <p>MySQL</p>
                        </div>
                        <div class="skill-category">
                            <h4>Tools:</h4>
                            <p>Postman, Git, GitHub, Figma</p>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3 class="section-title">🌍 LANGUAGES</h3>
                    <div class="languages">
                        <div class="language-item">Tamil (Native)</div>
                        <div class="language-item">English (Professional)</div>
                    </div>
                </div>
                
                <div class="stats-container">
                    <div class="stat-item">
                        <div class="stat-number">${stats?.years_experience || '2+'}</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats?.projects_completed || '15+'}</div>
                        <div class="stat-label">Projects</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats?.technologies || '8+'}</div>
                        <div class="stat-label">Technologies</div>
                    </div>
                </div>
            </div>
            
            <div class="right-column">
                <div class="section">
                    <h3 class="section-title">👨‍💻 PROFILE</h3>
                    <div class="profile-section">
                        <div class="profile-text">
                            ${personalInfo?.bio || `I'm a Passionate Full Stack Developer with strong expertise in React.js, JavaScript, and Python. I specialize in building modern, responsive, and high-performance web applications that offer great user experiences. My full-stack projects combine React.js on the frontend with FastAPI or Django on the backend, creating scalable and efficient solutions. Currently pursuing a B.E. in Computer Science and Engineering at Hindusthan College of Engineering and Technology, I continuously learn and apply new technologies through internships and real-world projects. I am also experienced in UI/UX tools like Figma, using them to design clean and intuitive user interfaces.`}

                        </div>
                        <div class="feature-list" style="margin-top: 8px;">
                            <div class="feature-item">
                                <span class="checkmark">✓</span>
                                <span>Frontend Development (React, JavaScript)</span>
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span>
                                <span>Backend Development (Python, FastAPI)</span>
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span>
                                <span>Database Design & Management</span>
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span>
                                <span>API Development & Integration</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3 class="section-title">🎓 EDUCATION</h3>
                    <div class="education-item">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div class="education-title">B.E. Computer Science & Engineering</div>
                                <div class="education-school">Hindusthan College of Engineering and Technology</div>
                            </div>
                            <div class="experience-period">2023 - 2027</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3 class="section-title">💼 EXPERIENCE</h3>
                    ${experiences?.map(exp => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <div>
                                <div class="experience-title">${exp.title}</div>
                                <div class="experience-company">${exp.company}</div>
                            </div>
                            <div class="experience-period">${exp.period}</div>
                        </div>
                        <div class="experience-description">${exp.description}</div>
                    </div>
                    `).join('') || ''}
                </div>
                
                <div class="section">
                    <h3 class="section-title">💻 PROJECTS</h3>
                    <div class="projects-grid">
                        ${projects?.slice(0, 5).map(project => `
                        <div class="project-item">
                            <div class="project-title">${project.title}</div>
                            <div class="project-tech">${project.tech.slice(0, 3).join(', ')}</div>
                        </div>
                        `).join('') || ''}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-trigger print dialog
        window.onload = function() {
            setTimeout(() => {
                window.print();
            }, 500);
        };
        
        // Close window after printing
        window.onafterprint = function() {
            window.close();
        };
    </script>
</body>
</html>
      `;
      
      resumeWindow.document.write(resumeHTML);
      resumeWindow.document.close();
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  // ==================== ERROR STATE ====================
  
  // ==================== LOADING SCREEN ====================
  if (isLoading || apiLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-2"
          >
            <h2 className="text-white text-2xl font-bold">
              {personalInfo?.name || 'ARUN G'}
            </h2>
            <p className="text-gray-400 text-lg">
              {personalInfo?.title || 'Full Stack Developer'}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>
        </div>
      </div>
    );
  }

  // Resume Modal Component
  const ResumeModal = () => (
    <AnimatePresence>
      {showResume && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white text-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Resume Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Resume</h2>
              </div>
              <div className="flex items-center gap-2">
                
                <motion.button
                  onClick={() => setShowResume(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold mb-2"
                >
                  {personalInfo?.name || 'ARUN G'}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-300"
                >
                  {personalInfo?.title || 'PYTHON FULL STACK DEVELOPER'}
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Contact */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      CONTACT
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span>{personalInfo?.phone || '+91 7305096778'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <span>{personalInfo?.email || 'arunaakash675@gmail.com'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        <span>{personalInfo?.location || 'Coimbatore, Tamil Nadu'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-gray-600" />
                        <span className="text-xs break-all">{personalInfo?.github || 'github.com/ArunDev-07'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-gray-600" />
                        <span className="text-xs break-all">{personalInfo?.linkedin || 'linkedin.com/in/arun-g-87515a36b'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-blue-600" />
                      SKILLS
                    </h3>
                    <div className="space-y-4 text-sm">
                      {skills && skills.length > 0 ? (
                        ['Frontend', 'Backend', 'Database', 'Tools'].map(category => (
                          <div key={category}>
                            <p className="font-semibold text-blue-600">{category}:</p>
                            <p className="text-gray-700">
                              {skills.filter(skill => skill.category === category).map(skill => skill.name).join(', ')}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p className="font-semibold text-blue-600">Frontend:</p>
                          <p className="text-gray-700">HTML, CSS, JavaScript, TypeScript, Tailwind CSS, React JS</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      LANGUAGES
                    </h3>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Tamil (Native)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>English (Professional)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-6">
                  {/* Profile */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      PROFILE
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                    {personalInfo?.bio || "I'm a Passionate Full Stack Developer with strong expertise in React.js, JavaScript, and Python. I specialize in building modern, responsive, and high-performance web applications that deliver excellent user experiences. My full-stack projects often combine React.js on the frontend with FastAPI or Django on the backend, enabling scalable and efficient solutions. I'm currently pursuing a B.E. in Computer Science and Engineering at Hindusthan College of Engineering and Technology. Beyond development, I’m also skilled in UI/UX design using tools like Figma, allowing me to craft clean, intuitive, and user-centered interfaces. I constantly expand my skill set through internships, hands-on projects, and continuous learning."}

                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      EDUCATION
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">B.E. Computer Science & Engineering</p>
                          <p className="text-gray-600">Hindusthan College of Engineering and Technology</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">2023 - 2027</span>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-blue-600" />
                      PROJECTS
                    </h3>
                    <div className="grid gap-2">
                      {projects && projects.length > 0 ? (
                        projects.slice(0, 5).map((project, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Circle className="w-2 h-2 fill-blue-600 text-blue-600" />
                            <span className="text-gray-700">{project.title} ({project.tech.slice(0, 2).join(', ')})</span>
                          </div>
                        ))
                      ) : (
                        ['Amazon Clone (JavaScript)', 'Movie App (React JS)', 'Weather App (React JS)'].map((project, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Circle className="w-2 h-2 fill-blue-600 text-blue-600" />
                            <span className="text-gray-700">{project}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      EXPERIENCE
                    </h3>
                    <div className="space-y-4">
                      {experiences && experiences.length > 0 ? (
                        experiences.map((exp, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold">{exp.title}</p>
                                <p className="text-blue-600">{exp.company}</p>
                              </div>
                              <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded">{exp.period}</span>
                            </div>
                            <p className="text-sm text-gray-700">{exp.description}</p>
                          </div>
                        ))
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">Full Stack Developer Intern</p>
                              <p className="text-blue-600">VDart (Trichy)</p>
                            </div>
                            <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded">2024 - Present</span>
                          </div>
                          <p className="text-sm text-gray-700">Building scalable web applications using React.js and modern web technologies</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="text-white font-bold text-lg">
                  {personalInfo?.name ? personalInfo.name[0] : 'A'}
                </span>
              </motion.div>
              <div className="block">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {personalInfo?.name || 'Arun G'}
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {personalInfo?.title || 'Full Stack Developer'}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-blue-400' 
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>

              {/* Resume Button */}
              <motion.button
                onClick={() => setShowResume(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Resume
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-500 text-white'
                        : isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    setShowResume(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'} rounded-full filter blur-3xl`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/20'} rounded-full filter blur-3xl`} />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Introduction
                  </span>
                </motion.div>

                <motion.h1 
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {personalInfo?.name || 'Arun G'}
                  </span>
                </motion.h1>

                <motion.h2 
                  className={`text-xl md:text-2xl lg:text-3xl font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {personalInfo?.title || 'Python Full Stack Developer'}
                </motion.h2>

                <motion.p 
                  className={`text-base md:text-lg leading-relaxed max-w-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {personalInfo?.bio || 'I am passionate full stack developer with experience in building responsive and user-friendly web applications. I specialize in Python, React.js, JavaScript, and FastAPI. I enjoy creating clean and efficient code for both frontend and backend, and I am always eager to learn new technologies and build real-world projects.'}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Get In Touch
                  </motion.button>
                  <motion.button
                    onClick={() => setShowResume(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border border-gray-600 rounded-lg font-medium hover:border-gray-400 transition-colors"
                  >
                    View Resume
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href={personalInfo?.github || "https://github.com/ArunDev-07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={personalInfo?.linkedin || "https://www.linkedin.com/in/arun-g-87515a36b"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={`mailto:${personalInfo?.email || 'arunaakash675@gmail.com'}`}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={personalInfo?.instagram || "https://instagram.com/mr.tamizhan__07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-all duration-300"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </motion.a>

              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative w-full max-w-lg mx-auto"
              >
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                    <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-2`}>
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                        <div className="text-6xl font-bold">
                          <img src={portfolio} alt='portfolio' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <Database className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <Server className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 mb-4"
                >
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    About Me
                  </span>
                </motion.div>

                <motion.h2 
                  className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Passionate Developer Creating<br />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Digital Solutions
                  </span>
                </motion.h2>

                <motion.p 
                  className={`leading-relaxed text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
   {personalInfo?.bio || 
"I'm a Computer Science student passionate about building innovative and impactful web applications. I specialize in React.js, JavaScript, Python, and modern web technologies, and I enjoy creating clean, responsive, and user-friendly digital experiences.I love turning creative ideas into real-world projects and continuously learning new tools and technologies. My goal is to become a skilled full stack developer who can solve real problems through technology.I am currently building full stack projects using React and FastAPI, showcasing my technical skills and creativity. I also have experience creating and consuming REST APIs, managing frontend-backend integration, and working with modern deployment tools.Beyond coding, I focus on writing clean, scalable code and following best practices for performance, security, and maintainability. I'm a fast learner, a team player, and always excited to take on new challenges and internship opportunities where I can grow and contribute meaningfully."
}

                </motion.p>

               
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <motion.div 
                        key={skill.name} 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {skill.name}
                          </span>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    // Fallback skills if API fails
                    [
                      { name: 'React JS', level: 90 },
                      { name: 'JavaScript', level: 85 },
                      { name: 'HTML', level: 95 },
                      { name: 'CSS', level: 92 },
                      { name: 'Python', level: 82 },
                      { name: 'FastAPI', level: 78 },
                      { name: 'Typescript', level: 80 },
                       { name: 'Tailwind CSS', level: 78 },
                      {name : 'Mysql' , level : 80}, 
                      {name: 'Figma' , level : 70}
                    ].map((skill, index) => (
                      <motion.div 
                        key={skill.name} 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {skill.name}
                          </span>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 px-6 ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Services
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What I Offer
            </h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I provide comprehensive web development services from concept to deployment, 
              ensuring high-quality, scalable, and user-friendly solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services && services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-8 transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Monitor className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features && service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            ) : (
              // Fallback services if API fails
              [
                {
                  title: 'Frontend Development',
                  description: 'Building responsive and interactive user interfaces with React, JavaScript, and modern CSS frameworks.',
                  features: ['React JS Development', 'HTML5 & CSS3', 'Interactive UI/UX', 'Performance Optimization']
                },
                {
                  title: 'Backend Development',
                  description: 'Developing robust server-side applications with Python, FastAPI, and database management.',
                  features: ['Python & FastAPI', 'RESTful APIs', 'Database Design', 'Server Configuration']
                },
                {
                  title: 'Full Stack Solutions',
                  description: 'End-to-end web application development from concept to deployment.',
                  features: ['Complete Web Apps', 'API Integration', 'Database Management', 'Deployment & Hosting']
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-8 transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {index === 0 && <Monitor className="w-8 h-8 text-white" />}
                    {index === 1 && <Server className="w-8 h-8 text-white" />}
                    {index === 2 && <Layers className="w-8 h-8 text-white" />}
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-20 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Projects
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Projects
            </h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A showcase of my recent work and achievements in web development, 
              demonstrating various technologies and problem-solving approaches.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-white shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ y: -10 }}
                >
                  <div className={`relative h-48 overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
                      : 'bg-gradient-to-br from-blue-100 to-purple-100'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                      >
                        <Code2 className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-bold group-hover:text-blue-400 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-white' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-blue-400' 
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                    
                    <p className="text-blue-400 text-sm mb-2">{project.category}</p>
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech && project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback projects if API fails
              [
                {
                  title: 'Amazon Clone',
                  category: 'E-commerce Platform',
                  description: 'Full-featured e-commerce platform with shopping cart, payment integration, and user authentication.',
                  tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
                  github: 'https://github.com/ArunDev-07/Amazon-clone',
                  demo: 'https://amazondev07.netlify.app/amazon',
                  featured: true
                },
                {
                  title: 'Movie Discovery App',
                  category: 'Entertainment Platform',
                  description: 'Interactive movie discovery application with TMDB API integration and search functionality.',
                  tech: ['React JS', 'TMDB API', 'Tailwind CSS'],
                  github: 'https://github.com/ArunDev-07/Movie-App',
                  demo: 'https://movie-app-ten-zeta-96.vercel.app/',
                  featured: true
                },
                {
                  title: 'Portfolio Website',
                  category: 'Weather Service',
                  description: 'A modern, responsive portfolio web application built with React (Vite) for the frontend and FastAPI for the backend. The site showcases my projects, skills, resume, and contact functionality.',
                  tech: ['React JS', 'FastAPI', 'Tailwind CSS'],
                  github: 'https://github.com/ArunDev-07/Portfolio',
                  demo: 'https://portfolio07-sepia.vercel.app/',
                  featured: false
                },
                {
                  title: 'Weather Forecast App',
                  category: 'Weather Service',
                  description: 'Real-time weather application with location-based forecasting and predictions.',
                  tech: ['React JS', 'OpenWeather API', 'Chart.js'],
                  github: 'https://github.com/ArunDev-07/Weather-app',
                  demo: 'https://arun-weather-app.netlify.app',
                  featured: false
                }
                

              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-white shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ y: -10 }}
                >
                  <div className={`relative h-48 overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
                      : 'bg-gradient-to-br from-blue-100 to-purple-100'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                      >
                        <Code2 className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-bold group-hover:text-blue-400 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-white' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className={`transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-blue-400' 
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                    
                    <p className="text-blue-400 text-sm mb-2">{project.category}</p>
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href={personalInfo?.github || "https://github.com/ArunDev-07"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-12 md:py-20 px-4 md:px-6 ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My Journey
            </h2>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              My professional experience and learning path in web development and technology.
            </p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {experiences && experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 md:p-8 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ x: 10, scale: 1.01 }}
                >
                  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          exp.type === 'internship' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                      >
                        {exp.type === 'internship' ? (
                          <Briefcase className="w-6 h-6 text-white" />
                        ) : (
                          <GraduationCap className="w-6 h-6 text-white" />
                        )}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-medium text-sm md:text-base">{exp.company}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-start md:justify-end">
                      <motion.span 
                        className={`inline-block px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium ${
                          exp.type === 'internship' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {exp.type === 'internship' ? 'Internship' : 'Workshop'}
                      </motion.span>
                      <p className={`text-xs md:text-sm mt-1 ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`leading-relaxed mb-6 text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {exp.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {exp.achievements && exp.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: achIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback experiences if API fails
              [
                {
                  title: 'Full Stack Developer Intern',
                  company: 'VDart',
                  location: 'Trichy, Tamil Nadu',
                  period: '2025',
                  description: 'Working as a Full Stack Developer, building scalable web applications using React.js and modern web technologies.',
                  type: 'internship',
                  achievements: [
                    'Developed responsive web applications using React JS',
                    'Implemented RESTful APIs with Python backend',
                    'Collaborated with design team for UI/UX improvements',
                    'Participated in code reviews and agile development'
                  ]
                },
                {
                  title: 'Web Development Intern',
                  company: 'Learnflu',
                  location: 'Online',
                  period: '2024',
                  description: 'Worked with React JS and API integrations. Assisted in developing cross-platform websites.',
                  type: 'internship',
                  achievements: [
                    'Built cross-platform websites using React JS',
                    'Integrated third-party APIs for enhanced functionality',
                    'Optimized website performance and user experience',
                    'Collaborated with remote development team'
                  ]
                }
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`rounded-xl p-6 md:p-8 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ x: 10, scale: 1.01 }}
                >
                  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-500"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                      >
                        <Briefcase className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-medium text-sm md:text-base">{exp.company}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-start md:justify-end">
                      <motion.span 
                        className="inline-block px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-blue-500 text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        Internship
                      </motion.span>
                      <p className={`text-xs md:text-sm mt-1 ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`leading-relaxed mb-6 text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {exp.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: achIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-12 md:py-20 px-4 md:px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                FAQ
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Common questions about my work, experience, and approach to development.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs && faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#f9fafb' }}
                  >
                    <h3 className={`text-base md:text-lg font-semibold pr-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div className="p-4 md:p-6 pt-4">
                          <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              // Fallback FAQs if API fails
              [
                {
                  question: "What technologies do you specialize in?",
                  answer: "I specialize in React JS, JavaScript, TypeScript, Python, FastAPI, and modern web technologies. I'm passionate about building responsive, user-friendly applications with clean, maintainable code."
                },
                {
                  question: "How do you approach new projects?",
                  answer: "I start by understanding the requirements thoroughly, then plan the architecture, choose appropriate technologies, and follow agile development practices with regular testing and client feedback."
                },
                {
                  question: "What's your experience with full-stack development?",
                  answer: "I have hands-on experience with both frontend (React, JavaScript) and backend (Python, FastAPI) development, working on complete web applications from database design to user interface."
                },
                {
                  question: "Do you work with teams or independently?",
                  answer: "I'm comfortable working both independently and as part of a team. I've collaborated with cross-functional teams during my internships and have experience with version control and agile methodologies."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={`w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#f9fafb' }}
                  >
                    <h3 className={`text-base md:text-lg font-semibold pr-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div className="p-4 md:p-6 pt-4">
                          <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Contact
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Let's Work Together
            </h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm always excited to take on new challenges and collaborate on interesting projects. 
              Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get in Touch
                </h3>
                <p className={`leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I'm currently available for internships, freelance projects, and full-time opportunities. 
                  Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {personalInfo?.phone || '+91 7305096778'}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {personalInfo?.email || 'arunaakash675@gmail.com'}
                    </p>
                  </div>
                </motion.div>
        
        <motion.div 
  className="flex items-center space-x-4"
  whileHover={{ x: 10 }}
>
  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
    <Instagram className="w-6 h-6 text-white" />
  </div>
  <div>
    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instagram</p>
    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {personalInfo?.instagram || 'mr.tamizhan__07'}
    </p>
  </div>
</motion.div>

                <motion.div 
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {personalInfo?.location || 'Coimbatore, Tamil Nadu'}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-8">
                <h4 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  <motion.a
                    href={personalInfo?.github || "https://github.com/ArunDev-07"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500' 
                        : 'bg-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                    }`}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={personalInfo?.linkedin || "https://www.linkedin.com/in/arun-g-87515a36b"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500' 
                        : 'bg-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                    }`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${personalInfo?.email || 'arunaakash675@gmail.com'}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500' 
                        : 'bg-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                    }`}
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>

        <motion.a
          href="https://instagram.com/mr.tamizhan__07"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500' 
              : 'bg-gray-200 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white'
          }`}
        >
          <Instagram className="w-6 h-6" />
        </motion.a>

                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send Message
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-500 text-sm bg-green-100 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>✅ Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-500 text-sm bg-red-100 p-3 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                    <span>❌ Failed to send message. Please try again or contact directly at {personalInfo?.email || 'arunaakash675@gmail.com'}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {personalInfo?.name ? personalInfo.name[0] : 'A'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{personalInfo?.name || 'Arun G'}</h3>
                  <p className="text-xs text-gray-400">{personalInfo?.title || 'Full Stack Developer'}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Building modern web applications with passion and precision.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Full Stack Solutions</li>
                <li>API Development</li>
                <li>Database Design</li>
                <li>Web Optimization</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{personalInfo?.location || 'Coimbatore, Tamil Nadu'}</p>
                <p>{personalInfo?.phone || '+91 7305096778'}</p>
                <p>{personalInfo?.email || 'arunaakash675@gmail.com'}</p>
                 <p>{personalInfo?.instagram || 'mr.tamizhan__07'}</p>
                
              </div>
              <div className="flex space-x-3 mt-4">
                <a
                  href={personalInfo?.github || "https://github.com/ArunDev-07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo?.linkedin || "https://www.linkedin.com/in/arun-g-87515a36b"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo?.email || 'arunaakash675@gmail.com'}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/mr.tamizhan__07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 {personalInfo?.name || 'Arun G'}. All rights reserved. Built with React & FastAPI.
            </p>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal />
    </div>
  );
};

export default Portfolio;