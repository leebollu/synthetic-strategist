import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Layout/Breadcrumb';

const ChatInterface = ({ createThread }) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the Synthetic Strategist chat. How can I assist with your strategic analysis today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [threadTitle, setThreadTitle] = useState('');
  
  // Generate breadcrumb items
  const breadcrumbItems = [
    { text: 'Main Chat', link: null }
  ];
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: `I understand your inquiry about "${newMessage}". Based on strategic analysis principles, I can provide the following insights...`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle thread creation from a message
  const handleCreateThread = (message) => {
    setSelectedMessage(message);
    setThreadTitle(message.text.length > 30 ? message.text.substring(0, 30) + '...' : message.text);
    setShowThreadModal(true);
  };
  
  const handleThreadModalSubmit = (e) => {
    e.preventDefault();
    
    if (!threadTitle.trim() || !selectedMessage) return;
    
    // Create a new thread
    const threadIndex = createThread(
      threadTitle, 
      selectedMessage.text, 
      'Main Chat'
    );
    
    // Close modal and reset
    setShowThreadModal(false);
    setSelectedMessage(null);
    setThreadTitle('');
    
    // Navigate to the new thread
    navigate(`/thread/${threadIndex}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 h-full flex flex-col">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">Main Chat</h2>
        <p className="text-secondary-600">
          Ask questions and discuss strategic insights across all reports and analyses.
        </p>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-6 p-4 border border-secondary-200 rounded-lg bg-white">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`relative mb-4 group ${
              message.sender === 'user' 
                ? 'ml-auto max-w-[80%]' 
                : 'mr-auto max-w-[80%]'
            }`}
            onMouseEnter={() => setHoveredMessage(index)}
            onMouseLeave={() => setHoveredMessage(null)}
          >
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
            
            {/* Message Actions */}
            {message.sender === 'ai' && (
              <div 
                className={`absolute top-0 right-0 transform -translate-y-1/2 flex space-x-1 ${
                  hoveredMessage === index ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-200 group-hover:opacity-100`}
              >
                <button
                  onClick={() => handleCreateThread(message)}
                  className="bg-white text-xs px-2 py-1 rounded border border-secondary-200 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <i className="fas fa-comment-dots mr-1"></i>
                  Thread
                </button>
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
      
      {/* Message Input Form */}
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
      
      {/* Thread Creation Modal */}
      {showThreadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Create Thread</h3>
            
            <div className="bg-secondary-50 p-3 rounded border-l-4 border-primary-500 mb-4 italic text-secondary-700">
              {selectedMessage?.text}
            </div>
            
            <form onSubmit={handleThreadModalSubmit}>
              <div className="mb-4">
                <label htmlFor="threadTitle" className="block font-medium text-secondary-700 mb-1">Thread Title</label>
                <input
                  id="threadTitle"
                  type="text"
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter a title for this thread"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowThreadModal(false);
                    setSelectedMessage(null);
                    setThreadTitle('');
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

export default ChatInterface;
