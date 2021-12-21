import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

    // set up a timeout to run after 1 sec
  useEffect(() => {
    const timer = setTimeout(() => {   // decrement the time remaining by 1
      setTimeRemaining(timeRemaining => timeRemaining - 1)
    }, 1000);

    return function cleanup() {   // clean up after timeout func
      clearTimeout(timer)
    }
  }, [timeRemaining, onAnswered]);  // was given on the console's warning mssg  


  useEffect(() => {
    if (timeRemaining === 0) {  // when time remaining hits 0
      setTimeRemaining(10);     // reset time remaining back to 10
      onAnswered(false);        // when the timer runs out-- answer will be false
      return;                   // exit early
    }
  })

  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
