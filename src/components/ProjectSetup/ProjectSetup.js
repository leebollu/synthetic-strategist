import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Layout/Breadcrumb';

const ProjectSetup = ({ onSubmit, projectData, isComplete }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(projectData || {
    clientName: '',
    brief: '',
    overview: '',
    files: []
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate breadcrumb items
  const breadcrumbItems = [
    { text: 'Project Setup', link: null }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    
    if (uploadedFiles.length === 0) return;
    
    // Add new files to the existing ones
    setFormData(prevData => ({
      ...prevData,
      files: [...prevData.files, ...uploadedFiles]
    }));
    
    // Reset the file input
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    setFormData(prevData => ({
      ...prevData,
      files: prevData.files.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData.brief.trim()) {
      newErrors.brief = 'Project brief is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call or processing
    setTimeout(() => {
      onSubmit(formData);
      setSuccess('Project setup completed successfully!');
      setIsSubmitting(false);
      
      // Redirect to the first report after successful setup
      setTimeout(() => {
        navigate('/reports/category');
      }, 1500);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      clientName: '',
      brief: '',
      overview: '',
      files: []
    });
    setErrors({});
    setSuccess('');
  };

  // If project setup is already complete, show a success message and navigation options
  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-success-50 border-l-4 border-success-500 p-4 mb-6 text-success-700">
          <p className="font-medium">Project setup is complete!</p>
          <p className="mt-2">You can now navigate to the reports section to begin your analysis.</p>
        </div>
        
        <h2 className="text-2xl font-bold text-secondary-800 mb-6">Project Details</h2>
        
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-secondary-800 mb-2">Client</h3>
            <p className="text-secondary-600">{projectData.clientName}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-secondary-800 mb-2">Brief</h3>
            <p className="text-secondary-600">{projectData.brief}</p>
          </div>
          
          {projectData.overview && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-secondary-800 mb-2">Overview</h3>
              <p className="text-secondary-600">{projectData.overview}</p>
            </div>
          )}
          
          {projectData.files && projectData.files.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-secondary-800 mb-2">Uploaded Files</h3>
              <ul className="mt-2 space-y-1">
                {projectData.files.map((file, index) => (
                  <li key={index} className="flex items-center py-1 px-2 bg-secondary-50 rounded">
                    <i className="fas fa-file-alt text-secondary-500 mr-2"></i>
                    <span className="text-secondary-700">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/reports/category')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <i className="fas fa-layer-group mr-2"></i>
            Category Report
          </button>
          
          <button
            onClick={() => navigate('/reports/company')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <i className="fas fa-building mr-2"></i>
            Company Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <h2 className="text-2xl font-bold text-secondary-800 mb-6">Project Setup</h2>
      
      {success && (
        <div className="bg-success-50 border-l-4 border-success-500 p-4 mb-6 text-success-700">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="clientName" className="block font-medium text-secondary-700 mb-1">
              Client Name <span className="text-danger-500">*</span>
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              value={formData.clientName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.clientName ? 'border-danger-500' : 'border-secondary-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Enter client name"
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-danger-500">{errors.clientName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="brief" className="block font-medium text-secondary-700 mb-1">
              Project Brief <span className="text-danger-500">*</span>
            </label>
            <textarea
              id="brief"
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 border ${errors.brief ? 'border-danger-500' : 'border-secondary-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical`}
              placeholder="Enter a brief description of the project"
            ></textarea>
            {errors.brief && (
              <p className="mt-1 text-sm text-danger-500">{errors.brief}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="overview" className="block font-medium text-secondary-700 mb-1">
              Project Overview
            </label>
            <textarea
              id="overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
              placeholder="Enter a detailed overview of the project (optional)"
            ></textarea>
          </div>
          
          <div>
            <label className="block font-medium text-secondary-700 mb-1">
              Upload Files
            </label>
            <div 
              onClick={() => document.getElementById('fileInput').click()}
              className="border-2 border-dashed border-secondary-300 rounded-md p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              <input
                id="fileInput"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <i className="fas fa-cloud-upload-alt text-3xl text-secondary-400 mb-2"></i>
              <p className="text-secondary-600">Click to upload or drag and drop files here</p>
              <p className="text-xs text-secondary-500 mt-1">Supported file types: PDF, DOCX, XLSX, CSV, TXT</p>
            </div>
            
            {formData.files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {formData.files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-secondary-50 rounded">
                    <div className="flex items-center">
                      <i className="fas fa-file-alt text-secondary-500 mr-2"></i>
                      <span className="text-secondary-700">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-danger-500 hover:text-danger-700 focus:outline-none"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-secondary-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectSetup;
