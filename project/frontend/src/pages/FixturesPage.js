import React, { useState, useEffect } from 'react';
import { fixtures as fixturesAPI } from '../services/api';
import '../styles/styles.css';

const FixturesPage = () => {
  const [fixtures, setFixtures] = useState([]);
  const [filterStatus, setFilterStatus] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFixtures();
  }, [filterStatus]);

  const loadFixtures = async () => {
    try {
      const response = await fixturesAPI.getAll({ status: filterStatus });
      setFixtures(response.data.data);
    } catch (error) {
      console.error('Error loading fixtures:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixtures-page">
      <h1>Fixtures & Results</h1>

      {/* Status Filter */}
      <div className="status-filters">
        <button
          className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilterStatus('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
        >
          Results
        </button>
      </div>

      {/* Fixtures List */}
      {loading ? (
        <p>Loading fixtures...</p>
      ) : (
        <div className="fixtures-list">
          {fixtures.map((fixture) => (
            <div key={fixture._id} className="fixture-card">
              <div className="fixture-date">
                <div className="date">{formatDate(fixture.date)}</div>
                <div className="time">{fixture.time}</div>
              </div>

              <div className="fixture-match">
                <div className="fixture-team">
                  <h4>Madamani Strikers</h4>
                  {fixture.status === 'completed' && (
                    <p className="score">{fixture.result.msfc_score}</p>
                  )}
                </div>

                <div className="fixture-vs">
                  <p>vs</p>
                  <p className="competition">{fixture.competition}</p>
                </div>

                <div className="fixture-team">
                  <h4>{fixture.opponent}</h4>
                  {fixture.status === 'completed' && (
                    <p className="score">{fixture.result.opponent_score}</p>
                  )}
                </div>
              </div>

              <div className="fixture-venue">
                <p>{fixture.venue}</p>
                <p className={`status status-${fixture.status}`}>{fixture.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FixturesPage;
