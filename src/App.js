import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './App.css';

// Components
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import ProjectSetup frNeed to install the following packages:
serve@14.2.4
Ok to proceed? (y)om './components/ProjectSetup/ProjectSetup';
import CategoryReport from './components/Reports/CategoryReport';
import CompanyReport from './components/Reports/CompanyReport';
import ConsumerReport from './components/Reports/ConsumerReport';
import CommercialReport from './components/Reports/CommercialReport';
import ChatInterface from './components/Chat/ChatInterface';
import ThreadView from './components/Thread/ThreadView';

// Wrapper component to handle thread routing
const ThreadViewWrapper = ({ threads, addMessage, createThread }) => {
  const { index } = useParams();
  const threadIndex = parseInt(index, 10);
  
  if (isNaN(threadIndex) || threadIndex < 0 || threadIndex >= threads.length) {
    return <Navigate to="/" />;
  }
  
  // Find the full thread path/ancestry for breadcrumbs
  const getThreadAncestry = (threadId) => {
    const thread = threads[threadId];
    if (!thread) return [];
    
    if (thread.parentId !== undefined) {
      return [...getThreadAncestry(thread.parentId), thread];
    }
    
    return [thread];
  };
  
  const threadAncestry = getThreadAncestry(threadIndex);
  
  return (
    <ThreadView 
      thread={threads[threadIndex]} 
      threadId={threadIndex}
      addMessage={addMessage} 
      createThread={createThread}
      ancestry={threadAncestry}
    />
  );
};

function App() {
  // Project data state
  const [projectData, setProjectData] = useState({
    clientName: '',
    brief: '',
    overview: '',
    files: []
  });
  
  // Project setup completion state
  const [projectSetupComplete, setProjectSetupComplete] = useState(false);
  
  // Threads state for conversation threads
  const [threads, setThreads] = useState([]);
  
  // Sidebar width state
  const [sidebarWidth, setSidebarWidth] = useState(256);
  
  // Function to handle project setup submission
  const handleProjectSetup = (data) => {
    setProjectData(data);
    setProjectSetupComplete(true);
  };
  
  // Function to create a new thread
  const createThread = (title, sourceText, sourceLocation, parentId = undefined) => {
    // Extract report type from sourceLocation
    let reportType = 'other';
    
    if (sourceLocation.includes('Category Report')) {
      reportType = 'category';
    } else if (sourceLocation.includes('Company Report')) {
      reportType = 'company';
    } else if (sourceLocation.includes('Consumer Report')) {
      reportType = 'consumer';
    } else if (sourceLocation.includes('Commercial Report')) {
      reportType = 'commercial';
    } else if (sourceLocation.includes('Main Chat')) {
      reportType = 'chat';
    } else if (sourceLocation.includes('Thread:')) {
      // For child threads, inherit the parent's report type if available
      const parentThread = parentId !== undefined ? threads[parentId] : null;
      reportType = parentThread ? parentThread.reportType : 'other';
    }
    
    const newThread = {
      title: title,
      sourceText: sourceText,
      sourceLocation: sourceLocation,
      reportType: reportType,
      parentId: parentId,
      childIds: [],
      messages: [
        {
          text: `This thread was created from "${sourceText}" in the ${sourceLocation}.`,
          sender: 'system',
          timestamp: new Date()
        },
        {
          text: `I've analyzed this excerpt from ${sourceLocation}. What specific insights would you like about "${sourceText}"?`,
          sender: 'ai',
          timestamp: new Date()
        }
      ]
    };
    
    const updatedThreads = [...threads, newThread];
    const newThreadIndex = updatedThreads.length - 1;
    
    // If this is a child thread, update the parent's childIds
    if (parentId !== undefined) {
      updatedThreads[parentId] = {
        ...updatedThreads[parentId],
        childIds: [...(updatedThreads[parentId].childIds || []), newThreadIndex]
      };
    }
    
    setThreads(updatedThreads);
    return newThreadIndex; // Return the index of the new thread
  };
  
  // Function to add a message to a thread
  const addMessage = (threadIndex, message) => {
    const updatedThreads = [...threads];
    updatedThreads[threadIndex].messages.push({
      ...message,
      timestamp: new Date()
    });
    
    // Add an AI response (placeholder)
    setTimeout(() => {
      const aiResponse = {
        text: `I understand your inquiry about "${message.text}". Based on the available documentation and strategic analysis, I can provide the following insights...`,
        sender: 'ai',
        timestamp: new Date()
      };
      updatedThreads[threadIndex].messages.push(aiResponse);
      setThreads([...updatedThreads]);
    }, 1000);
    
    setThreads(updatedThreads);
  };
  
  // Function to handle sidebar width change
  const handleSidebarResize = (width) => {
    setSidebarWidth(width);
  };

  // Conditional rendering based on project setup status
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar 
          projectData={projectData} 
          threads={threads} 
          projectSetupComplete={projectSetupComplete}
          onResize={handleSidebarResize}
        />
        <div className="flex-1 overflow-auto" style={{ marginLeft: `${sidebarWidth}px` }}>
          <main className="h-full">
            <Routes>
              <Route 
                path="/" 
                element={
                  <ProjectSetup 
                    projectData={projectData} 
                    onSubmit={handleProjectSetup} 
                    isComplete={projectSetupComplete}
                  />
                } 
              />
              
              {/* Protected routes - only accessible if project setup is complete */}
              <Route 
                path="/reports/category" 
                element={
                  projectSetupComplete ? 
                  <CategoryReport createThread={createThread} /> : 
                  <Navigate to="/" />
                }
              />
              <Route 
                path="/reports/company" 
                element={
                  projectSetupComplete ? 
                  <CompanyReport createThread={createThread} /> : 
                  <Navigate to="/" />
                }
              />
              <Route 
                path="/reports/consumer" 
                element={
                  projectSetupComplete ? 
                  <ConsumerReport createThread={createThread} /> : 
                  <Navigate to="/" />
                }
              />
              <Route 
                path="/reports/commercial" 
                element={
                  projectSetupComplete ? 
                  <CommercialReport createThread={createThread} /> : 
                  <Navigate to="/" />
                }
              />
              <Route 
                path="/chat" 
                element={
                  projectSetupComplete ? 
                  <ChatInterface createThread={createThread} /> : 
                  <Navigate to="/" />
                }
              />
              <Route 
                path="/thread/:index" 
                element={
                  projectSetupComplete ? 
                  <ThreadViewWrapper 
                    threads={threads} 
                    addMessage={addMessage} 
                    createThread={createThread}
                  /> : 
                  <Navigate to="/" />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
