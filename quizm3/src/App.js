import React from "react";
import Form from "./Form/Form.jsx";
import Loading from "./Load/Loading.jsx";
import Modal from "./Modal/Modal.jsx";
import { useGlobalContext } from "./Info/Info.jsx";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestions,
    checkAnswers,
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

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => (
              <button
                key={index}
                className="answer-btn"
                onClick={() => checkAnswers(correct_answer === answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestions}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
