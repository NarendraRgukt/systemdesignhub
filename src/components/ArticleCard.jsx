import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen } from 'lucide-react';
import Tag from './Tag';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="article-card-link">
      <div className="article-card">
        <div className="card-header">
          <BookOpen size={20} className="card-icon" />
          <span className="card-read-time">10 min read</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-description">{article.description}</p>
        <div className="card-tags">
          {article.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="card-footer">
          <span className="view-link">
            Read Article
            <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
