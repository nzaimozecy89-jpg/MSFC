import React from 'react';
import '../styles/styles.css';

const Navigation = ({ isAdmin, onLogout, onLogin }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h3>⚽ Madamani FC</h3>
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/#team">Team</a></li>
          <li><a href="/#fixtures">Fixtures</a></li>
          <li><a href="/#news">News</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
          
          {isAdmin ? (
            <>
              <li><a href="/#admin">Admin</a></li>
              <li>
                <button 
                  className="btn btn-secondary"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button 
                className="btn btn-primary"
                onClick={onLogin}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
