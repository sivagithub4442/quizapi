import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
import mainbg from '../mainbg.mp4'

function Mainpage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from the API
    fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        // Decode HTML entities in questions and options
        const decodedQuestions = data.results.map((question) => {
          return {
            ...question,
            question: decodeEntities(question.question),
            incorrect_answers: question.incorrect_answers.map((option) => decodeEntities(option)),
            correct_answer: decodeEntities(question.correct_answer),
          };
        });
        setQuestions(decodedQuestions);
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // Function to decode HTML entities
  const decodeEntities = (text) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent;
    return decodedString;
  };

  const handleOptionClick = (option) => {
    // Update selected option
    setSelectedOption(option);

    // Check if the selected option is correct
    if (option === questions[currentQuestionIndex].correct_answer) {
      // Increase score if the answer is correct
      setScore(score + 1);
    }

    // Move to the next question after a short delay (1 second)
    setTimeout(() => {
      // Reset selected option
      setSelectedOption(null);

      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // Check if all questions are answered
      if (currentQuestionIndex + 1 >= questions.length) {
        // Navigate to the score page with the final score
        navigate(`/score`,{state: {score}});
      }
    }, 1000);
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // Display a loading message while fetching questions or show the score if all questions are answered
    return (
      <div className='loading-container'>
        <p>Loading questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  options.sort(() => Math.random() - 0.5); // Shuffle options

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center flex-column'>
      <video src={mainbg} autoPlay muted loop className='video-bg'></video>
      <div style={{width:'800px',height:'500px'}} className='quizview'>
        <h2 className='text-light'>{currentQuestion.question}</h2>
        <div className='d-flex justify-content-center text-light flex-column'>
          {options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;




