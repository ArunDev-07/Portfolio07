// src/hook/useContactForm.js
import { useState } from 'react';
import axios from 'axios';

const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await axios.post('https://portfolio-backend-8-lw86.onrender.com/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Error sending message');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleFormSubmit,
    status,
    isSubmitting
  };
};

export default useContactForm;
