import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ThreadView = ({ thread, threadId, addMessage, createThread, ancestry = [] }) => {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadText, setNewThreadText] = useState('');
  
  // State for text selection thread creation
  const [showThreadCreationModal, setShowThreadCreationModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [threadCreationTitle, setThreadCreationTitle] = useState('');
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages]);
  
  // Add event listener for text selection
  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add the user's message to the thread
    addMessage(threadId, {
      text: newMessage,
      sender: 'user'
    });
    
    // Clear the input and set typing state
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response received
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle creating a child thread
  const handleCreateChildThread = () => {
    setShowNewThreadModal(true);
  };
  
  const handleNewThreadSubmit = (e) => {
    e.preventDefault();
    
    if (!newThreadTitle.trim() || !newThreadText.trim()) return;
    
    // Create a new child thread
    const sourceLocation = `Thread: ${thread.title}`;
    const newThreadId = createThread(newThreadTitle, newThreadText, sourceLocation, threadId);
    
    // Close the modal and reset form
    setShowNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadText('');
    
    // Navigate to the new thread
    navigate(`/thread/${newThreadId}`);
  };
  
  // Handle text selection for thread creation
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && selection.rangeCount > 0) {
      // Check if the selection is within a message
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      
      // Check if the selection is within the messages container
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer && messagesContainer.contains(container)) {
        setSelectedText(selectedText);
        // Prefill the thread title with the selected text (truncate if too long)
        const truncatedTitle = selectedText.length > 50 
          ? selectedText.substring(0, 47) + '...' 
          : selectedText;
        setThreadCreationTitle(truncatedTitle);
        setShowThreadCreationModal(true);
      }
    }
  };
  
  const handleThreadCreationSubmit = (e) => {
    e.preventDefault();
    
    if (!threadCreationTitle.trim() || !selectedText.trim()) return;
    
    // Create a new thread from the selected text
    const sourceLocation = `Thread: ${thread.title}`;
    const newThreadId = createThread(threadCreationTitle, selectedText, sourceLocation, threadId);
    
    // Close the modal and reset form
    setShowThreadCreationModal(false);
    setThreadCreationTitle('');
    setSelectedText('');
    
    // Navigate to the new thread
    navigate(`/thread/${newThreadId}`);
  };
  
  if (!thread) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
              <i className="fas fa-home mr-2"></i>
              Home
            </Link>
          </li>
          
          {/* Insert the appropriate section link based on report type */}
          {thread.reportType && (
            <li>
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-secondary-400 mx-2 text-xs"></i>
                <Link 
                  to={thread.reportType === 'chat' 
                    ? '/chat' 
                    : `/reports/${thread.reportType}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {thread.reportType.charAt(0).toUpperCase() + thread.reportType.slice(1)} Report
                </Link>
              </div>
            </li>
          )}
          
          {/* Show the ancestry path */}
          {ancestry.slice(0, -1).map((ancestor, idx) => (
            <li key={idx}>
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-secondary-400 mx-2 text-xs"></i>
                <Link 
                  to={`/thread/${idx}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {ancestor.title}
                </Link>
              </div>
            </li>
          ))}
          
          {/* Current thread (last item) */}
          <li aria-current="page">
            <div className="flex items-center">
              <i className="fas fa-chevron-right text-secondary-400 mx-2 text-xs"></i>
              <span className="text-sm font-medium text-secondary-500">{thread.title}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      {/* Thread Header */}
      <div className="mb-8 pb-4 border-b border-secondary-200">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">{thread.title}</h1>
        <div className="text-sm text-secondary-600 bg-secondary-50 p-3 rounded-md">
          <p className="mb-1">
            <span className="font-medium">Source:</span> {thread.sourceLocation}
          </p>
          <p>
            <span className="font-medium">Text:</span> "{thread.sourceText}"
          </p>
        </div>
      </div>
      
      {/* Thread Actions */}
      <div className="mb-6 flex">
        <button
          onClick={handleCreateChildThread}
          className="flex items-center px-4 py-2 text-primary-600 rounded-md hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Create Child Thread
        </button>
      </div>
      
      {/* Messages */}
      <div className="mb-6 bg-white rounded-lg shadow-card p-4 messages-container">
        {thread.messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${
              message.sender === 'user' 
                ? 'ml-auto max-w-[80%]' 
                : message.sender === 'system'
                  ? 'mx-auto max-w-[90%] text-center'
                  : 'mr-auto max-w-[80%]'
            }`}
          >
            {message.sender === 'system' ? (
              <div className="bg-secondary-100 text-secondary-600 p-3 rounded-md text-sm italic">
                {message.text}
                <div className="text-xs text-secondary-500 mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ) : (
              <div 
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary-100 text-secondary-800'
                    : 'bg-secondary-100 text-secondary-800'
                }`}
              >
                <p className="mb-1">{message.text}</p>
                <div className="text-xs text-secondary-500 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-secondary-500 mb-4">
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || isTyping}
          className="px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-secondary-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
      
      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Create Child Thread</h3>
            
            <form onSubmit={handleNewThreadSubmit}>
              <div className="mb-4">
                <label htmlFor="newThreadTitle" className="block font-medium text-secondary-700 mb-1">Thread Title</label>
                <input
                  id="newThreadTitle"
                  type="text"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter a title for this thread"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="newThreadText" className="block font-medium text-secondary-700 mb-1">Thread Content</label>
                <textarea
                  id="newThreadText"
                  value={newThreadText}
                  onChange={(e) => setNewThreadText(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
                  placeholder="Enter the content for this thread"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewThreadModal(false);
                    setNewThreadTitle('');
                    setNewThreadText('');
                  }}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Thread Creation Modal (from text selection) */}
      {showThreadCreationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Create Thread from Selection</h3>
            
            <div className="bg-secondary-50 p-3 rounded border-l-4 border-primary-500 mb-4 italic text-secondary-700">
              {selectedText}
            </div>
            
            <form onSubmit={handleThreadCreationSubmit}>
              <div className="mb-4">
                <label htmlFor="threadCreationTitle" className="block font-medium text-secondary-700 mb-1">Thread Title</label>
                <input
                  id="threadCreationTitle"
                  type="text"
                  value={threadCreationTitle}
                  onChange={(e) => setThreadCreationTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter a title for this thread"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowThreadCreationModal(false);
                    setThreadCreationTitle('');
                    setSelectedText('');
                  }}
                  className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadView;
