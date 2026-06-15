import React, { useState, useEffect } from 'react';
import { team as teamAPI } from '../services/api';
import '../styles/styles.css';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, [selectedRole]);

  const loadTeam = async () => {
    try {
      const filters = selectedRole !== 'all' ? { role: selectedRole } : {};
      const response = await teamAPI.getAll(filters);
      setTeamMembers(response.data.data);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="team-page">
      <h1>Our Team</h1>

      {/* Role Filter */}
      <div className="role-filters">
        <button
          className={`filter-btn ${selectedRole === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedRole('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${selectedRole === 'player' ? 'active' : ''}`}
          onClick={() => setSelectedRole('player')}
        >
          Players
        </button>
        <button
          className={`filter-btn ${selectedRole === 'coach' ? 'active' : ''}`}
          onClick={() => setSelectedRole('coach')}
        >
          Coaches
        </button>
        <button
          className={`filter-btn ${selectedRole === 'staff' ? 'active' : ''}`}
          onClick={() => setSelectedRole('staff')}
        >
          Staff
        </button>
      </div>

      {/* Team Grid */}
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member._id} className="team-card">
              {member.photo && <img src={member.photo} alt={member.name} />}
              <div className="team-card-content">
                <h3>{member.name}</h3>
                {member.position && <p className="position">{member.position}</p>}
                {member.number && <p className="number">#{member.number}</p>}
                <p className="role">{member.role}</p>
                {member.nationality && <p className="nationality">{member.nationality}</p>}
                <p className={`status status-${member.status}`}>{member.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPage;
