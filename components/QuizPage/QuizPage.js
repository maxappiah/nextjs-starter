import React from 'react';
import style from '@/styles/quiz.module.scss';
import { useRouter } from 'next/router';

const QuizPage = ({ questions, activeQuestion, setActiveQuestion, selectedAnswerIndex, setSelectedAnswerIndex, checked, setChecked, showResult, setShowResult, result, setResult, isAnswered, setIsAnswered }) => {
  const router = useRouter();

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
      router.push('/result');
    }
    setChecked(false);
    setIsAnswered(false);
  };

  return (
    <div className={style.quizContainer}>
      <h2>Question: {activeQuestion + 1}/{questions.length}</h2>
      <h3>{questions[activeQuestion]?.question}</h3>
      <ul className={style.answerList}>
        {questions[activeQuestion]?.answers?.map((answer, idx) => (
          <li
            key={idx}
            onClick={() => handleAnswerSelected(answer, idx)}
            className={
              (selectedAnswerIndex === idx && isAnswered) ||
              (isAnswered && answer === questions[activeQuestion].correctAnswer)
                ? answer === questions[activeQuestion].correctAnswer
                  ? `${style.liSelected} ${style.correctAnswer}`
                  : `${style.liSelected} ${style.wrongAnswer}`
                : style.answerItem
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
      <button className={`${style.button} ${!checked && style.buttonDisabled}`} onClick={nextQuestion} disabled={!checked}>
        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default QuizPage;
