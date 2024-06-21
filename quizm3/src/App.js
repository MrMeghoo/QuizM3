import React from "react";
import Form from "./Form/Form.jsx";
import Loading from "./Load/Loading.jsx";
import Modal from "./Modal/Modal.jsx";
import { useGlobalContext } from "./Info/Info.jsx";


function App() {
  const {waiting,loading,questions,index,correct,nextQuestions,checkAnswers,
  } = useGlobalContext();

  if (waiting) {
    return <Form />;
  }
  if (loading) {
    return <Loading />;
  }

  const { incorrect_answers, correct_answer, question } = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correct_answer) {
      checkAnswers(true);
    } else {
      checkAnswers(false);
    }
  };

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
         </p>
        <article className="container">
          <h2>{question}</h2>
          <div className="btn-container">
            {answers.map((answer, idx) => (
              <button
              key={idx}
              className="answer-btn"
              onClick={() => checkAnswer(answer)}
              >
              {answer}
              </button>
            ))}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestions}>
          next question
        </button>
      </section>
      <a
        className="donate-button" href="https://buy.stripe.com/test_aEUg1F1dk9Lw2yI9AA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate Now
      </a>
    </main>
  );
}

export default App;
