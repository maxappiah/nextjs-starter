import React from 'react';
import style from '@/styles/quiz.module.scss';
import { useRouter } from 'next/router';

const ResultPage = ({ result, questions }) => {
  const router = useRouter();

  const restartQuiz = () => {
    router.push('/');
   // window.location.reload();
  };

  return (
    <div className={style.quizContainer}>
      <h3>Results</h3>
      <h3>Overall {(result.score / (questions.length * 5)) * 100}%</h3>
      <p>Total Questions: {questions.length}</p>
      <p>Correct Answers: {result.correctAnswers}</p>
      <p>Wrong Answers: {result.wrongAnswers}</p>
      <button className={style.button} onClick={restartQuiz}>Restart</button>
    </div>
  );
};

export default ResultPage;
