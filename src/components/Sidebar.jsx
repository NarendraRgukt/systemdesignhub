import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Folder, Star, Clock } from 'lucide-react';
import articlesData from '../data/articles.json';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="space-sidebar">
      <div className="sidebar-section">
        <h4 className="sidebar-heading">Navigation</h4>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <Folder size={18} />
              <span>All Articles</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <Star size={18} />
              <span>Starred</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <Clock size={18} />
              <span>Recent</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Articles</h4>
        <ul className="sidebar-list">
          {articlesData.map((article) => {
            const isActive = location.pathname === `/article/${article.id}`;
            return (
              <li key={article.id} className={`sidebar-item ${isActive ? 'active' : ''}`}>
                <Link to={`/article/${article.id}`} className="sidebar-link">
                  <FileText size={16} />
                  <span>{article.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <p>System Design Space v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
