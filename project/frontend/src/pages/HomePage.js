import React, { useState, useEffect } from 'react';
import { news as newsAPI } from '../services/api';
import '../styles/styles.css';

const HomePage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await newsAPI.getAll({ featured: 'true' });
      setNewsList(response.data.data.slice(0, 3)); // Featured news
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Madamani Strikers FC</h1>
          <p>Excellence in Every Game</p>
          <button className="btn btn-primary">Explore More</button>
        </div>
      </section>

      {/* Featured News */}
      <section className="featured-news">
        <h2>Latest News</h2>
        {loading ? (
          <p>Loading news...</p>
        ) : (
          <div className="news-grid">
            {newsList.map((article) => (
              <div key={article._id} className="news-card">
                {article.image && <img src={article.image} alt={article.title} />}
                <h3>{article.title}</h3>
                <p className="news-category">{article.category}</p>
                <p className="news-summary">{article.summary}</p>
                <p className="news-date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Quick Section */}
      <section className="about-section">
        <h2>About Madamani Strikers</h2>
        <p>
          Madamani Strikers FC is a professional football club dedicated to excellence,
          teamwork, and sporting integrity. Founded with a vision to develop talented players
          and entertain passionate fans.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
