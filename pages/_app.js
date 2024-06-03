
import Layout from '@/components/Layout/Layout';
import React, { useState } from 'react';
import '@/styles/globals.scss';

//export default function MyApp({ Component, pageProps }) {
//  return (
//    <Layout>
//      <Component {...pageProps} />
//    </Layout>
//  );

function MyApp({ Component, pageProps }) {
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

  return (
    <Component
      {...pageProps}
      questions={questions}
      setQuestions={setQuestions}
      activeQuestion={activeQuestion}
      setActiveQuestion={setActiveQuestion}
      selectedAnswerIndex={selectedAnswerIndex}
      setSelectedAnswerIndex={setSelectedAnswerIndex}
      checked={checked}
      setChecked={setChecked}
      showResult={showResult}
      setShowResult={setShowResult}
      result={result}
      setResult={setResult}
      isAnswered={isAnswered}
      setIsAnswered={setIsAnswered}
    />
  );
}

export default MyApp;