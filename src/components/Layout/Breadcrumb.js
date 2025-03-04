import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
            <i className="fas fa-home mr-2"></i>
            Home
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <i className="fas fa-chevron-right text-secondary-400 mx-2 text-xs"></i>
              {item.link ? (
                <Link 
                  to={item.link}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {item.text}
                </Link>
              ) : (
                <span className="text-sm font-medium text-secondary-500">{item.text}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
