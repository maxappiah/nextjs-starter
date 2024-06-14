import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import style from '@/styles/quiz.module.scss';
import { useRouter } from 'next/router';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

const ResultPage = ({ result, questions }) => {
  const router = useRouter();

  const restartQuiz = () => {
    router.push('/');
  };

  const data = {
    labels: ['Correct Answers', 'Wrong Answers'],
    datasets: [
      {
        data: [result.correctAnswers, result.wrongAnswers],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  return (
    <div className={style.quizContainer}>
      <h3>Results</h3>
      <h3>Overall {(result.score / (questions.length * 5)) * 100}%</h3>
      <p>Total Questions: {questions.length}</p>
      <p>Correct Answers: {result.correctAnswers}</p>
      <p>Wrong Answers: {result.wrongAnswers}</p>
      <div className={style.chartContainer}>
        <Pie data={data} />
      </div>
      <button className={style.button} onClick={restartQuiz}>Restart</button>
    </div>
  );
};

export default ResultPage;
