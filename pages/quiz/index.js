import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './quiz.module.scss';

const decodeHtml = (html) => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api_category.php'
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchQuestionsByCategory = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}`
      );
      const fetchedQuestions = response.data.results.map((question) => ({
        question: decodeHtml(question.question),
        answers: [...question.incorrect_answers, question.correct_answer].map(answer => decodeHtml(answer)),
        correctAnswer: decodeHtml(question.correct_answer),
      }));
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const startQuiz = () => {
    fetchQuestionsByCategory();
    setActiveQuestion(0);
    setChecked(false);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0
    });
    setIsAnswered(false);
  };

  const handleAnswerSelected = (answer, idx) => {
    if (!checked) {
      setChecked(true);
      setSelectedAnswerIndex(idx);
      setIsAnswered(true);

      const isCorrect = answer === questions[activeQuestion].correctAnswer;
      setResult((prev) => ({
        ...prev,
        score: prev.score + (isCorrect ? 5 : 0),
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
      }));
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
    setIsAnswered(false);
  };

  return (
    <div className={style.container}>
      <h1>Quiz</h1>
      {categories.length > 0 ? (
        <div>
          <label htmlFor="category">Choose a category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={style.categorySelect}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <p>Loading categories...</p>
      )}

      {showResult ? (
        <div className={style['quiz-container']}>
          <h3>Results</h3>
          <h3>Overall {(result.score / (questions.length * 5)) * 100}%</h3>
          <p>Total Questions: {questions.length}</p>
          <p>Total Score: {result.score}</p>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      ) : (
        <div className={style['quiz-container']}>
          <h2>
            Question: {activeQuestion + 1}/{questions.length}
          </h2>
          <h3>{questions[activeQuestion]?.question}</h3>
          <ul>
            {questions[activeQuestion]?.answers?.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => handleAnswerSelected(answer, idx)}
                className={ 
                  (selectedAnswerIndex === idx && isAnswered) ||
                  (isAnswered && answer === questions[activeQuestion].correctAnswer)
                    ? answer === questions[activeQuestion].correctAnswer
                    ? `${style['li-selected']} ${style['correct-answer']}`
                    : `${style['li-selected']} ${style['wrong-answer']}`
                  : style['li']
                }
                style={{
                  cursor: selectedAnswerIndex !== null ? 'not-allowed' : 'pointer',
                  pointerEvents: isAnswered ? 'none' : 'auto',
                }}
              >
                {answer}
              </li>
            ))}
          </ul>
          <button onClick={nextQuestion} disabled={!checked} className="btn">
            {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
