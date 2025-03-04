import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ projectData, threads, projectSetupComplete, onResize }) => {
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(256); // 16rem = 256px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  
  // Track expanded state for all expandable sections
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    company: true,
    consumer: true,
    commercial: true,
    chat: true,
    other: false
  });
  
  // Track expanded state for individual threads (up to 10 levels of nesting)
  const [expandedThreads, setExpandedThreads] = useState({});
  
  // Group root-level threads by report type (threads with no parent)
  const rootThreads = threads.filter(thread => thread.parentId === undefined);
  
  const groupedThreads = {
    category: rootThreads.filter(thread => thread.reportType === 'category'),
    company: rootThreads.filter(thread => thread.reportType === 'company'),
    consumer: rootThreads.filter(thread => thread.reportType === 'consumer'),
    commercial: rootThreads.filter(thread => thread.reportType === 'commercial'),
    chat: rootThreads.filter(thread => thread.reportType === 'chat'),
    other: rootThreads.filter(thread => !['category', 'company', 'consumer', 'commercial', 'chat'].includes(thread.reportType))
  };
  
  const toggleExpand = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const toggleThreadExpand = (threadKey) => {
    setExpandedThreads({
      ...expandedThreads,
      [threadKey]: !expandedThreads[threadKey]
    });
  };
  
  // Handle resize functionality
  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      // Set min and max constraints
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth);
        // Communicate the width to parent
        if (onResize) {
          onResize(newWidth);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);
  
  // Recursive component for thread items with children
  const ThreadWithChildren = ({ thread, threadIndex, threads, location, expandedThreads, toggleThreadExpand }) => {
    const hasChildren = thread.childIds && thread.childIds.length > 0;
    const isExpanded = expandedThreads[`thread-${threadIndex}`];
    const isActive = location.pathname === `/thread/${threadIndex}`;

    return (
      <li key={threadIndex} className="mb-1">
        <Link 
          to={`/thread/${threadIndex}`}
          className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${isActive ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
        >
          <span className="truncate">{thread.title}</span>
          {hasChildren && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleThreadExpand(`thread-${threadIndex}`);
              }}
              className="ml-2 text-xs text-secondary-500 hover:text-secondary-700 focus:outline-none"
            >
              <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
            </button>
          )}
        </Link>
        
        {/* Render child threads if they exist and section is expanded */}
        {hasChildren && isExpanded && (
          <ul className="pl-3 mt-1 border-l border-secondary-200">
            {thread.childIds.map((childId) => (
              <ThreadWithChildren
                key={childId}
                thread={threads[childId]}
                threadIndex={childId}
                threads={threads}
                location={location}
                expandedThreads={expandedThreads}
                toggleThreadExpand={toggleThreadExpand}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };
  
  return (
    <div 
      ref={sidebarRef}
      className="h-screen bg-white border-r border-secondary-200 overflow-y-auto fixed shadow-md"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
          <i className="fas fa-brain mr-2"></i>
          Synthetic Strategist
        </h2>
        
        <div className="mb-4 border-b border-secondary-200 pb-4">
          <h3 className="text-sm font-medium text-secondary-500 uppercase tracking-wider mb-2">Project</h3>
          {projectData.clientName ? (
            <div>
              <p className="font-medium text-secondary-800">{projectData.clientName}</p>
              <div className={`mt-1 px-2 py-1 rounded-md text-xs font-medium text-center ${projectSetupComplete ? 'bg-success-50 text-success-700' : 'bg-warning-50 text-warning-700'}`}>
                {projectSetupComplete ? 'Project Active' : 'Setup in Progress'}
              </div>
            </div>
          ) : (
            <p className="text-secondary-500 text-sm">No project loaded</p>
          )}
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-secondary-500 uppercase tracking-wider mb-2">Reports</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/"
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
              >
                <i className="fas fa-cog mr-2 w-5 text-center"></i>
                Project Setup
              </Link>
            </li>
            
            <li>
              <div className="mb-1">
                <Link 
                  to="/reports/category"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/reports/category' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-layer-group mr-2 w-5 text-center"></i>
                    <span>Category Report</span>
                    {groupedThreads.category.length > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {groupedThreads.category.length}
                      </span>
                    )}
                  </div>
                  {groupedThreads.category.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand('category');
                      }}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.category ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  )}
                </Link>
              </div>
              {groupedThreads.category.length > 0 && expandedSections.category && (
                <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                  {groupedThreads.category.map((thread, index) => {
                    const threadIndex = threads.indexOf(thread);
                    return (
                      <ThreadWithChildren
                        key={threadIndex}
                        thread={thread}
                        threadIndex={threadIndex}
                        threads={threads}
                        location={location}
                        expandedThreads={expandedThreads}
                        toggleThreadExpand={toggleThreadExpand}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
            
            <li>
              <div className="mb-1">
                <Link 
                  to="/reports/company"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/reports/company' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-building mr-2 w-5 text-center"></i>
                    <span>Company Report</span>
                    {groupedThreads.company.length > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {groupedThreads.company.length}
                      </span>
                    )}
                  </div>
                  {groupedThreads.company.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand('company');
                      }}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.company ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  )}
                </Link>
              </div>
              {groupedThreads.company.length > 0 && expandedSections.company && (
                <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                  {groupedThreads.company.map((thread, index) => {
                    const threadIndex = threads.indexOf(thread);
                    return (
                      <ThreadWithChildren
                        key={threadIndex}
                        thread={thread}
                        threadIndex={threadIndex}
                        threads={threads}
                        location={location}
                        expandedThreads={expandedThreads}
                        toggleThreadExpand={toggleThreadExpand}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
            
            <li>
              <div className="mb-1">
                <Link 
                  to="/reports/consumer"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/reports/consumer' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-users mr-2 w-5 text-center"></i>
                    <span>Consumer Report</span>
                    {groupedThreads.consumer.length > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {groupedThreads.consumer.length}
                      </span>
                    )}
                  </div>
                  {groupedThreads.consumer.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand('consumer');
                      }}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.consumer ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  )}
                </Link>
              </div>
              {groupedThreads.consumer.length > 0 && expandedSections.consumer && (
                <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                  {groupedThreads.consumer.map((thread, index) => {
                    const threadIndex = threads.indexOf(thread);
                    return (
                      <ThreadWithChildren
                        key={threadIndex}
                        thread={thread}
                        threadIndex={threadIndex}
                        threads={threads}
                        location={location}
                        expandedThreads={expandedThreads}
                        toggleThreadExpand={toggleThreadExpand}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
            
            <li>
              <div className="mb-1">
                <Link 
                  to="/reports/commercial"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/reports/commercial' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-chart-line mr-2 w-5 text-center"></i>
                    <span>Commercial Report</span>
                    {groupedThreads.commercial.length > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {groupedThreads.commercial.length}
                      </span>
                    )}
                  </div>
                  {groupedThreads.commercial.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand('commercial');
                      }}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.commercial ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  )}
                </Link>
              </div>
              {groupedThreads.commercial.length > 0 && expandedSections.commercial && (
                <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                  {groupedThreads.commercial.map((thread, index) => {
                    const threadIndex = threads.indexOf(thread);
                    return (
                      <ThreadWithChildren
                        key={threadIndex}
                        thread={thread}
                        threadIndex={threadIndex}
                        threads={threads}
                        location={location}
                        expandedThreads={expandedThreads}
                        toggleThreadExpand={toggleThreadExpand}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
            
            <li>
              <div className="mb-1">
                <Link 
                  to="/chat"
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-primary-50 ${location.pathname === '/chat' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-secondary-700'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-comments mr-2 w-5 text-center"></i>
                    <span>Main Chat</span>
                    {groupedThreads.chat.length > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                        {groupedThreads.chat.length}
                      </span>
                    )}
                  </div>
                  {groupedThreads.chat.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand('chat');
                      }}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.chat ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  )}
                </Link>
              </div>
              {groupedThreads.chat.length > 0 && expandedSections.chat && (
                <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                  {groupedThreads.chat.map((thread, index) => {
                    const threadIndex = threads.indexOf(thread);
                    return (
                      <ThreadWithChildren
                        key={threadIndex}
                        thread={thread}
                        threadIndex={threadIndex}
                        threads={threads}
                        location={location}
                        expandedThreads={expandedThreads}
                        toggleThreadExpand={toggleThreadExpand}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
            
            {/* Other threads section */}
            {groupedThreads.other.length > 0 && (
              <li>
                <div className="mb-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-secondary-700">
                    <div className="flex items-center">
                      <i className="fas fa-folder mr-2 w-5 text-center"></i>
                      <span>Other Threads</span>
                      {groupedThreads.other.length > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                          {groupedThreads.other.length}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => toggleExpand('other')}
                      className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                    >
                      <i className={`fas ${expandedSections.other ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                    </button>
                  </div>
                </div>
                {expandedSections.other && (
                  <ul className="pl-6 space-y-1 border-l border-secondary-200 ml-3">
                    {groupedThreads.other.map((thread, index) => {
                      const threadIndex = threads.indexOf(thread);
                      return (
                        <ThreadWithChildren
                          key={threadIndex}
                          thread={thread}
                          threadIndex={threadIndex}
                          threads={threads}
                          location={location}
                          expandedThreads={expandedThreads}
                          toggleThreadExpand={toggleThreadExpand}
                        />
                      );
                    })}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
        
        <div className="mt-auto pt-4 border-t border-secondary-200">
          <div className="text-xs text-secondary-500 text-center">
            <p>Synthetic Strategist v1.0</p>
            <p className="mt-1"> 2025 AI Strategy Labs</p>
          </div>
        </div>
      </div>
      {/* Resize handle */}
      <div 
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-secondary-300 hover:bg-primary-500 transition-colors"
        onMouseDown={startResizing}
      ></div>
    </div>
  );
};

export default Sidebar;
