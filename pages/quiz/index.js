import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const AnswersList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Answer = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;

const Feedback = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: #909;
`;

const decodeHtml = (html) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get('https://opentdb.com/api.php?amount=10');
          setQuestions(response.data.results.map((question) => ({
            ...question,
            question: decodeHtml(question.question),
            correct_answer: decodeHtml(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) => decodeHtml(answer))
          })));
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      fetchQuestions();
    }, []);
  
    const handleAnswerClick = (correctAnswer) => {
      setAnswer(correctAnswer ? 'Correct!' : 'Wrong!');
    };
  
    return (
      <Container>
        <h1>Quiz</h1>
        {questions.map((question, index) => (
          <div key={index}>
            <Question>{question.question}</Question>
            <AnswersList>
              {question.incorrect_answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(false)}
                >
                  {answer}
                </Answer>
              ))}
              <Answer
                onClick={() => handleAnswerClick(true)}
              >
                {question.correct_answer}
              </Answer>
            </AnswersList>
            {answer && <Feedback>{answer}</Feedback>}
          </div>
        ))}
      </Container>
    );
  };
  

export default Quiz;
