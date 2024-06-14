import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import style from '@/styles/quiz.module.scss';

const decodeHtml = (html) => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MenuPage = ({ setQuestions, setActiveQuestion, setResult, setShowResult, setChecked, setIsAnswered }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchQuestionsByCategory = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}`);
      const fetchedQuestions = response.data.results.map((question) => ({
        question: decodeHtml(question.question),
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer].map((answer) => decodeHtml(answer))),
        correctAnswer: decodeHtml(question.correct_answer),
      }));
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const startQuiz = () => {
    fetchQuestionsByCategory();
    setActiveQuestion(0);
    setChecked(false);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setIsAnswered(false);
    router.push('/quiz');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <div className={style.container}>
      <h1>Quiz</h1>
      {categories.length > 0 ? (
        <div>
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
            
            <label htmlFor="difficulty">Choose difficulty:</label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className={style.difficultySelect}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            className={`${style.button} ${(!selectedCategory || !selectedDifficulty) && style.buttonDisabled}`}
            onClick={startQuiz}
            disabled={!selectedCategory || !selectedDifficulty}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default MenuPage;
