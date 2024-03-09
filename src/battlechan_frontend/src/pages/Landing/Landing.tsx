import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h1>Landing Page </h1>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Landing;
