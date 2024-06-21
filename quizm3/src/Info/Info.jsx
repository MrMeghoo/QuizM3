import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=18")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setLoading(false);
        setWaiting(false);
      });
  }, []);

  const nextQuestions = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= questions.length) {
        setModal(true);
        return 0;
      }
      return newIndex;
    });
  };

  const checkAnswers = (isCorrect) => {
    if (isCorrect) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    }
    nextQuestions();
  };

  const closeModal = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0);
    setIndex(0);
  };

  return (
    <AppContext.Provider value={{
      waiting,
      loading,
      questions,
      index,
      correct,
      modal,
      nextQuestions,
      checkAnswers,
      closeModal,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
