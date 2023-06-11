import React, { Fragment, useState, useEffect } from "react";
import styles from "./QuizPage.module.css";
import Button from "../../components/UI/Button/Button";
import Answer from "../../components/UI/Button/Answer"
import ButtonCircle from '../../components/UI/Button/ButtonCircle';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Results from "../../components/Results/Results";
import { faArrowRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


function QuizPage(props) {
  var QuestionAns = props.data;
  const [userAnswers, setUserAnswers] = useState(Array(QuestionAns.results.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState(null); //lưu đáp án được chọn
  const [isSelected, setIsSelected] = useState([false, false, false, false]); //lưu đáp án được chọn vào mảng
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [score, setScore] = useState(0); // Trạng thái lưu điểm số
  const [isCorrect, setIsCorrect] = useState(false); // Trạng thái xác định câu trả lời đúng/sai
  const [showResult, setShowResult] = useState(false);
  const [newNextButton, setNewNextButton] = useState(false);
  const [showCorrectAns, setShowCorrectAns] = useState(false);
  const [showIncorrectAns, setShowIncorrectAns] = useState([false, false, false, false]);
  const [reviewClick, setReviewClick] = useState(false);
  const isPass = score > QuestionAns.results.length / 2;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const question = QuestionAns.results[currentQuestion]
    const inAnswers = question.incorrect_answers.concat(question.correct_answer);
    const inAnswerIndex = inAnswers.indexOf(answer);
    setIsSelected([...showIncorrectAns.slice(0, inAnswerIndex), true, ...showIncorrectAns.slice(inAnswerIndex + 1)]);
    setUserAnswers([...userAnswers.slice(0, currentQuestion), answer, ...userAnswers.slice(currentQuestion + 1)]); // lưu lại các câu trả lời cũ
    console.log('userAnswers');
    console.log(userAnswers);
  };

  const handleButtonClick = () => { // button start
    setShowContent(true);
  };

  const handleNextQuestion = () => {
    if (reviewClick === false && newNextButton === false) {
      const correctAnswer = QuestionAns.results[currentQuestion].correct_answer;
      if (selectedAnswer === correctAnswer) {
        setIsCorrect(true); // Đánh dấu câu trả lời đúng
        setScore(score + 1); // Tăng điểm số lên
      } else {
        setIsCorrect(false); // Đánh dấu câu trả lời sai
        const incorrectAnswers = QuestionAns.results[currentQuestion].incorrect_answers;
        const incorrectAnswerIndex = incorrectAnswers.indexOf(selectedAnswer);
        setShowIncorrectAns([...showIncorrectAns.slice(0, incorrectAnswerIndex), true, ...showIncorrectAns.slice(incorrectAnswerIndex + 1)]);
      }
      setShowCorrectAns(true);
      setNewNextButton(true);
    }
    if (newNextButton === true && reviewClick === false) {
      if (currentQuestion === QuestionAns.results.length - 1) {
        stopTimer();
        setShowResult(true);
      } else {
        setCurrentQuestion(currentQuestion + 1); // Chuyển đến câu hỏi tiếp theo
        setShowResult(false); // Đặt lại trạng thái hiển thị kết quả khi chuyển câu hỏi tiếp theo
      }
      setIsCorrect(false); // Đặt lại trạng thái xác định câu trả lời đúng/sai khi chuyển câu hỏi tiếp theo
      setShowCorrectAns(false);
      setSelectedAnswer(false);
      setNewNextButton(false);
      console.log(showIncorrectAns);
      setShowIncorrectAns([false, false, false, false]);
      setIsSelected([false, false, false, false]);
      console.log('userAnswers');
      console.log(userAnswers);
    }
    if (reviewClick === true) {
      if (currentQuestion === QuestionAns.results.length - 1) {
        setShowResult(true);
      } else {
        setCurrentQuestion(currentQuestion + 1); // Chuyển đến câu hỏi tiếp theo
        console.log('check');
        console.log(userAnswers[currentQuestion + 1]);
        const incorrectAnswers = QuestionAns.results[currentQuestion].incorrect_answers;
        const incorrectAnswerIndex = incorrectAnswers.indexOf(userAnswers[currentQuestion + 1]);
        setShowIncorrectAns([false, false, false, false]);
        setShowIncorrectAns([...showIncorrectAns.slice(0, incorrectAnswerIndex), true, ...showIncorrectAns.slice(incorrectAnswerIndex + 1)]);
        console.log(showIncorrectAns);
        console.log(showCorrectAns);
      }
      setShowCorrectAns(true);
      setNewNextButton(true);
    }
  };
  const handleReplayClick = () => {
    setCurrentQuestion(0);
    setReviewClick(false);
    setShowContent(false);
    setScore(0);
    setIsCorrect(false);
    setShowResult(false);
  };
  const handleReviewClick = () => {
    console.log('userAnswers');
    console.log(userAnswers);
    setCurrentQuestion(0);
    setReviewClick(true);
    setShowContent(true); // Hiển thị nội dung câu hỏi và câu trả lời
    setShowResult(false); // Ẩn kết quả
  };

  // TÍNH THỜI GIAN LÀM QUIZ
  const [time, setTime] = useState(0); // Trạng thái lưu thời gian đã trôi qua
  const [timerRunning, setTimerRunning] = useState(false); // Trạng thái xác định trạng thái của đồng hồ chạy

  // Hàm bắt đầu/đặt lại đồng hồ
  const startTimer = () => {
    setTime(0);
    setTimerRunning(true);
  };

  // Hàm dừng đồng hồ
  const stopTimer = () => {
    setTimerRunning(false);
  };

  // Hook useEffect để tính thời gian khi timerRunning thay đổi
  useEffect(() => {
    let timerInterval;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerRunning]);

  return (
    <Fragment>
      <section className={`${styles["sub-container"]} ${showResult ? styles["result-container"] : ""}`}>
        {!showResult && showContent ? (
          <div className={styles['container-ansques']}>
            <div className={styles['answer-question']}>
              <div className={styles.progress}>
                <ProgressBar value={`${((currentQuestion + 1) / QuestionAns.results.length) * 100}`}></ProgressBar>
              </div>
              <div className={styles['question-count']}>
                <span>{currentQuestion + 1}</span> of {QuestionAns.results.length}
              </div>
              <div className={styles['question-section']}>
                <p className={styles.question}>{QuestionAns.results[currentQuestion].question}</p>
              </div>

              <div className={styles['answer-section']}>
                {QuestionAns.results[currentQuestion].incorrect_answers.map((answer, index) => (
                  <Answer
                    key={index}
                    value={answer}
                    onClick={handleAnswerClick}
                    isCorrect={isCorrect}
                    showCorrectAns={showIncorrectAns[index]}
                    icon={faCircleXmark}
                    isSelected={isSelected[index]}
                  />
                ))}
                <Answer
                  value={QuestionAns.results[currentQuestion].correct_answer}
                  onClick={handleAnswerClick}
                  isCorrect={isCorrect}
                  showCorrectAns={showCorrectAns}
                  icon={faCircleCheck}
                  isSelected={isSelected[QuestionAns.results[currentQuestion].incorrect_answers.length]}
                />
              </div>
              <div className={styles['icon-container']}>
                <ButtonCircle styles={newNextButton ? 'exit' : ''} icon={faArrowRight} onClick={handleNextQuestion}></ButtonCircle>
              </div>
            </div>
          </div>
        ) : (!showResult
          &&
          <Fragment>
            <p className={styles["title-start"]}>Time To Quiz</p>
            <p className={styles["content-start"]}>
              Discover, challenge, and enjoy our Quiz App – where knowledge meets fun!
              <br />
              Test your expertise, compete with friends, and embark on a trivia adventure now.
              <br />
              Let's start the excitement together!
            </p>
            <div className={styles["button-container"]}>
              <Button styles="start" value="Get Started"
                onClick={() => {
                  handleButtonClick();
                  startTimer(); // Bắt đầu đồng hồ khi bắt đầu quiz
                }}
              />
            </div>
          </Fragment>
        )}
        {showResult &&
          (isPass ?
            (
              <div className={styles['result-section']}>
                <Results
                  title='Congratulations'
                  content='You are amazing !!'
                  score={score}
                  all={QuestionAns.results.length}
                  time={time}
                  percent={`${(score / QuestionAns.results.length) * 100}`}
                  replayClick={handleReplayClick}
                  reviewClick={handleReviewClick}
                >
                </Results>
              </div>
            )
            :
            (
              <div className={styles['result-section']}>
                <Results
                  title='Completed'
                  content='Better luck next time !'
                  score={score}
                  all={QuestionAns.results.length}
                  time={time}
                  percent={`${(score / QuestionAns.results.length) * 100}`}
                  replayClick={handleReplayClick}
                  reviewClick={handleReviewClick}
                >
                </Results>
              </div>
            )
          )
        }
      </section>
    </Fragment>
  );
}

export default QuizPage;

