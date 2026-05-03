import React, { useState, useMemo } from 'react';
import ArticleCard from '../components/ArticleCard';
import Tag from '../components/Tag';
import './Home.css';

const mdxModules = import.meta.glob('../../content/system-design/*.mdx', { eager: true });
const articlesData = Object.values(mdxModules).map(module => module.meta).filter(Boolean);

const Home = ({ searchQuery }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    articlesData.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter articles based on search query and selected tag
  const filteredArticles = useMemo(() => {
    return articlesData.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="home-page page-transition">
      <header className="hero-section">
        <h1 className="hero-title">System Design Hub</h1>
        <p className="hero-subtitle">
          Master the art of building scalable, reliable, and maintainable systems. 
          A curated collection of deep dives into modern architecture.
        </p>

        <div className="filter-scroll">
          <div className="tag-cloud">
            <Tag 
              active={!selectedTag} 
              onClick={() => setSelectedTag(null)}
            >
              All Articles
            </Tag>
            {allTags.map(tag => (
              <Tag 
                key={tag} 
                active={selectedTag === tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      <main className="container">
        {filteredArticles.length > 0 ? (
          <div className="grid-cards">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="status-empty">
            <h3>No articles found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
