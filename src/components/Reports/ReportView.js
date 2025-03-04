import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Layout/Breadcrumb';

const ReportView = ({ title, description, children, createThread }) => {
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [threadTitle, setThreadTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Initialize messages with the report content as the first message
  const [messages, setMessages] = useState([
    {
      text: description,
      sender: 'ai',
      timestamp: new Date(),
      isReport: true
    }
  ]);
  
  // Generate breadcrumb items based on the title
  const breadcrumbItems = [
    { text: 'Reports', link: null },
    { text: title, link: null }
  ];
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0) {
      setSelectedText(text);
      setShowModal(true);
      
      // Generate a default title from the selected text
      setThreadTitle(text.length > 30 
        ? text.substring(0, 30) + '...' 
        : text);
      
      // Keep selection visible until modal is closed
    }
  };
  
  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    if (!threadTitle.trim()) return;
    
    // Create the thread and get its index
    const threadIndex = createThread(threadTitle, selectedText, `${title}`);
    
    // Close the modal and reset selection
    setShowModal(false);
    setSelectedText('');
    setThreadTitle('');
    window.getSelection().removeAllRanges();
    
    // Navigate to the new thread
    navigate(`/thread/${threadIndex}`);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedText('');
    setThreadTitle('');
    window.getSelection().removeAllRanges();
  };
  
  const handleChatSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: `Based on the ${title}, I can provide insights about "${newMessage}". The data suggests that this area has significant strategic implications for market positioning and competitive advantage.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-secondary-800 mb-3">{title}</h2>
        <div className="bg-secondary-50 border-l-4 border-primary-500 p-4 text-sm text-secondary-600">
          <strong>Highlight any text</strong> in the report to create a focused conversation thread. 
          This allows you to discuss specific insights or get more detailed information.
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="flex flex-col border border-secondary-200 rounded-lg shadow-sm mb-6">
        <div className="bg-primary-50 p-3 border-b border-secondary-200">
          <h3 className="font-medium text-primary-800">Chat with {title} AI</h3>
        </div>
        
        {/* Messages Container */}
        <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: '600px' }}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.sender === 'user' 
                  ? 'ml-auto max-w-[80%]' 
                  : 'mr-auto max-w-[90%]'
              }`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary-100 text-secondary-800'
                    : message.isReport 
                      ? 'bg-white border border-secondary-200 text-secondary-800' 
                      : 'bg-secondary-100 text-secondary-800'
                }`}
              >
                {message.isReport ? (
                  <div className="prose prose-sm" onMouseUp={handleTextSelection}>
                    {children}
                  </div>
                ) : (
                  <p className="mb-1">{message.text}</p>
                )}
                <div className="text-xs text-secondary-500 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
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
        <form onSubmit={handleChatSubmit} className="p-3 border-t border-secondary-200 flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about this report..."
            className="flex-1 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isTyping}
            className="px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-secondary-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
      
      {/* Thread Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md p-6">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Create Thread</h3>
            
            <div className="bg-secondary-50 p-3 rounded border-l-4 border-primary-500 mb-4 italic text-secondary-700">
              {selectedText}
            </div>
            
            <form onSubmit={handleModalSubmit}>
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
                  onClick={handleCloseModal}
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

export default ReportView;
