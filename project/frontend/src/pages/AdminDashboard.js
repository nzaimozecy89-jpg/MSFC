import React, { useState, useEffect } from 'react';
import { team as teamAPI, news as newsAPI, fixtures as fixturesAPI } from '../services/api';
import '../styles/styles.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handlers
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await teamAPI.create(formData);
      setMessage('✓ Team member added successfully!');
      setFormData({});
      loadTeam();
    } catch (err) {
      setMessage('✗ Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await newsAPI.create(formData);
      setMessage('✓ News created successfully!');
      setFormData({});
      loadNews();
    } catch (err) {
      setMessage('✗ Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleFixtureSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await fixturesAPI.create(formData);
      setMessage('✓ Fixture created successfully!');
      setFormData({});
      loadFixtures();
    } catch (err) {
      setMessage('✗ Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'team') await teamAPI.delete(id);
        if (type === 'news') await newsAPI.delete(id);
        if (type === 'fixture') await fixturesAPI.delete(id);
        
        setMessage('✓ Item deleted successfully!');
        
        if (type === 'team') loadTeam();
        if (type === 'news') loadNews();
        if (type === 'fixture') loadFixtures();
      } catch (err) {
        setMessage('✗ Error: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const loadTeam = async () => {
    try {
      const response = await teamAPI.getAll();
      setItems(response.data.data);
    } catch (error) {
      console.error('Error loading team:', error);
    }
  };

  const loadNews = async () => {
    try {
      const response = await newsAPI.getAll();
      setItems(response.data.data);
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const loadFixtures = async () => {
    try {
      const response = await fixturesAPI.getAll();
      setItems(response.data.data);
    } catch (error) {
      console.error('Error loading fixtures:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'team') loadTeam();
    if (activeTab === 'news') loadNews();
    if (activeTab === 'fixture') loadFixtures();
  }, [activeTab]);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Manage Team
        </button>
        <button 
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Manage News
        </button>
        <button 
          className={`tab-btn ${activeTab === 'fixture' ? 'active' : ''}`}
          onClick={() => setActiveTab('fixture')}
        >
          Manage Fixtures
        </button>
      </div>

      {message && (
        <div className={message.includes('✗') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      {/* Team Management */}
      {activeTab === 'team' && (
        <div className="admin-section">
          <h2>Add New Team Member</h2>
          <form onSubmit={handleTeamSubmit} className="admin-form">
            <div className="form-group">
              <label>Name (Required)</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role || 'player'} onChange={handleFormChange}>
                  <option value="player">Player</option>
                  <option value="coach">Coach</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleFormChange}
                  placeholder="e.g., Striker, Midfielder"
                />
              </div>

              <div className="form-group">
                <label>Jersey Number</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number || ''}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality || ''}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status || 'active'} onChange={handleFormChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="injured">Injured</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Team Member'}
            </button>
          </form>

          <h2>Current Team</h2>
          <div className="items-list">
            {items.map((member) => (
              <div key={member._id} className="item-row">
                <div>
                  <h4>{member.name}</h4>
                  <p>{member.position} - {member.role}</p>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(member._id, 'team')}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Management */}
      {activeTab === 'news' && (
        <div className="admin-section">
          <h2>Create News Article</h2>
          <form onSubmit={handleNewsSubmit} className="admin-form">
            <div className="form-group">
              <label>Title (Required)</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Summary (Required)</label>
              <input
                type="text"
                name="summary"
                value={formData.summary || ''}
                onChange={handleFormChange}
                required
                maxLength="200"
              />
            </div>

            <div className="form-group">
              <label>Content (Required)</label>
              <textarea
                name="content"
                value={formData.content || ''}
                onChange={handleFormChange}
                required
                rows="6"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category || 'general'} onChange={handleFormChange}>
                  <option value="match">Match</option>
                  <option value="transfer">Transfer</option>
                  <option value="injury">Injury</option>
                  <option value="achievement">Achievement</option>
                  <option value="announcement">Announcement</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status || 'draft'} onChange={handleFormChange}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create News'}
            </button>
          </form>

          <h2>Published News</h2>
          <div className="items-list">
            {items.map((article) => (
              <div key={article._id} className="item-row">
                <div>
                  <h4>{article.title}</h4>
                  <p>{article.category} - {article.status}</p>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(article._id, 'news')}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fixtures Management */}
      {activeTab === 'fixture' && (
        <div className="admin-section">
          <h2>Add Fixture</h2>
          <form onSubmit={handleFixtureSubmit} className="admin-form">
            <div className="form-group">
              <label>Opponent (Required)</label>
              <input
                type="text"
                name="opponent"
                value={formData.opponent || ''}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date (Required)</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time || '15:00'}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Competition</label>
                <select name="competition" value={formData.competition || 'league'} onChange={handleFormChange}>
                  <option value="league">League</option>
                  <option value="cup">Cup</option>
                  <option value="friendly">Friendly</option>
                  <option value="playoff">Playoff</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Venue (Required)</label>
              <input
                type="text"
                name="venue"
                value={formData.venue || ''}
                onChange={handleFormChange}
                required
                placeholder="Stadium name or location"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Home Game?</label>
                <select name="isHome" value={formData.isHome !== undefined ? formData.isHome.toString() : 'true'} onChange={(e) => handleFormChange({...e, value: e.target.value === 'true'})}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status || 'upcoming'} onChange={handleFormChange}>
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Fixture'}
            </button>
          </form>

          <h2>Upcoming Fixtures</h2>
          <div className="items-list">
            {items.map((fixture) => (
              <div key={fixture._id} className="item-row">
                <div>
                  <h4>{fixture.opponent} ({fixture.competition})</h4>
                  <p>{new Date(fixture.date).toLocaleDateString()} - {fixture.venue}</p>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(fixture._id, 'fixture')}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
