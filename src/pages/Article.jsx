import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Download, Clock, Share2 } from 'lucide-react';
import articlesData from '../data/articles.json';
import Tag from '../components/Tag';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const foundArticle = articlesData.find(a => a.id === id);
    setArticle(foundArticle);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (!article && !loading) {
    return (
      <div className="container status-empty page-transition">
        <h2 className="hero-title">Article Not Found</h2>
        <p className="hero-subtitle">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          <ChevronLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="article-page page-transition">
      <div className="container">
        <nav className="article-nav">
          <Link to="/" className="back-link">
            <ChevronLeft size={20} />
            Back to Articles
          </Link>
        </nav>

        {loading ? (
          <div className="skeleton-container">
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton tags-skeleton"></div>
            <div className="skeleton iframe-skeleton"></div>
          </div>
        ) : (
          <div className="article-content">
            <header className="article-header">
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <div className="meta-group">
                  <Clock size={16} />
                  <span>12 min read</span>
                </div>
                <div className="meta-group">
                  <Download size={16} />
                  <span>2.4 MB</span>
                </div>
                <button className="icon-btn" aria-label="Share">
                  <Share2 size={18} />
                </button>
              </div>
              <div className="article-tags">
                {article.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              
              <div className="article-actions">
                <a 
                  href={article.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <ExternalLink size={18} />
                  Open PDF in New Tab
                </a>
              </div>
            </header>

            <div className="pdf-viewer-container">
              <div className="pdf-viewer-wrapper">
                <iframe 
                  src={article.fileUrl} 
                  title={article.title}
                  className="pdf-iframe"
                  onLoad={() => console.log('PDF loaded')}
                >
                  This browser does not support PDFs. 
                  Please download the PDF to view it: 
                  <a href={article.fileUrl}>Download PDF</a>.
                </iframe>
              </div>
              <p className="pdf-footer-note">
                Note: Some browsers might block embedded PDFs. If nothing appears, use the "Open PDF in New Tab" button.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
