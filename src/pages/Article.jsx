import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, Share2, MoreVertical, MessageSquare } from 'lucide-react';
import Tag from '../components/Tag';

const mdxModules = import.meta.glob('../../content/system-design/*.mdx');
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [MDXComponent, setMDXComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const modulePath = Object.keys(mdxModules).find(path => path.includes(`/${id}.mdx`));
    
    if (modulePath) {
      const loadModule = mdxModules[modulePath];
      loadModule().then((module) => {
        setArticle(module.meta);
        // We set the component wrapped in a function because useState treats functions as initializers
        setMDXComponent(() => module.default);
        setLoading(false);
      }).catch(err => {
        console.error("Failed to load MDX", err);
        setArticle(null);
        setLoading(false);
      });
    } else {
      setArticle(null);
      setLoading(false);
    }
  }, [id]);

  if (!article && !loading) {
    return (
      <div className="container status-empty page-transition">
        <h2 className="hero-title">Page Not Found</h2>
        <p className="hero-subtitle">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          <ChevronLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED': return 'lozenge-success';
      case 'IN REVIEW': return 'lozenge-warning';
      case 'DRAFT': return 'lozenge-default';
      default: return 'lozenge-default';
    }
  };

  return (
    <div className="article-layout-container">
      <Sidebar />
      
      <main className="article-main-content page-transition">
        <div className="article-inner-container">
          <Breadcrumbs currentArticle={article?.title} />

          {loading ? (
            <div className="skeleton-container">
              <div className="skeleton title-skeleton"></div>
              <div className="skeleton meta-skeleton"></div>
              <div className="skeleton iframe-skeleton"></div>
            </div>
          ) : (
            <div className="article-content">
              <header className="article-header">
                <div className="article-status-container">
                  <span className={`lozenge ${getStatusColor(article.status)}`}>
                    {article.status}
                  </span>
                </div>
                
                <h1 className="article-title">{article.title}</h1>
                
                <div className="confluence-meta">
                  <div className="meta-avatar">
                    {article.author.charAt(0)}
                  </div>
                  <div className="meta-info">
                    <span className="author-name">Created by {article.author}</span>
                    <span className="last-updated">Last updated {article.lastUpdated} • <Clock size={12} style={{marginRight: 4}} /> 12 min read</span>
                  </div>
                  
                  <div className="header-actions">
                    <button className="icon-btn-ghost"><Share2 size={18} /></button>
                    <button className="icon-btn-ghost"><MessageSquare size={18} /></button>
                    <button className="icon-btn-ghost"><MoreVertical size={18} /></button>
                  </div>
                </div>

                <div className="article-tags">
                  {article.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </header>

              <div className="mdx-content-container">
                {MDXComponent && <MDXComponent />}
              </div>

              <footer className="article-footer-meta">
                <p>Did this page help you? <a href="#">Send Feedback</a></p>
                <div className="view-count">842 views • 12 reactions</div>
              </footer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Article;
