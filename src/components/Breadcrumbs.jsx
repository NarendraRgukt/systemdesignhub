import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ currentArticle }) => {
  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">Space Home</Link>
        </li>
        <li className="breadcrumb-separator">
          <ChevronRight size={14} />
        </li>
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">Articles</Link>
        </li>
        {currentArticle && (
          <>
            <li className="breadcrumb-separator">
              <ChevronRight size={14} />
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {currentArticle}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
