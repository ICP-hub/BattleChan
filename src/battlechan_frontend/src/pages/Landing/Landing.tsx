import React from 'react';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <div className='text-center '>
      <h1>Landing Page </h1>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <button className='bg-blue-400 rounded-md p-3 m-3 '>
          Go to Dashboard
        </button>
        <button className='bg-blue-400 rounded-md p-3 m-3 font-istok'>
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Landing;
