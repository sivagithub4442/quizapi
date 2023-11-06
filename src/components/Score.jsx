import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Score.css';

function Score() {
  const {state} = useLocation();
  const score = state ? state.score : 0;
  const navigate = useNavigate();

  const handleTryAgainClick = () => {
    // Navigate to the opening page when the "Try Again" button is clicked
    navigate('/');
  };

  return (
    <div style={{ height: '100vh', width: '100%' }} className='bg'>
      <div className='scoreboard d-flex justify-content-center align-items-center flex-column '>
        <h1>Your Score</h1>
        <h3>{score} out of 10</h3>
        <p>{score >= 5 ? 'Great job! Well done!' : 'Better luck next time. Keep practicing!'}</p>
        <div>
          <button className='btn btn-success shadow' onClick={handleTryAgainClick}>Try Again</button>
        </div>
      </div>
    </div>
  );
}

export default Score;
