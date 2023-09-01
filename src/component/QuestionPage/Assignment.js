import React, { useRef, useState } from "react";
import Result from "../outputPage/Result";
import Timer from "../timer/Timer";
import QuestionPage from "./QuestionPage.js/QuestionPage";
import QuestionNavigation from "./QuestionNavigation/QuestionNavigation";
import {
  onNextQuestion,
  onPreviousQuestion,
  onAssignmentSubmit,
  updateAnswers,
} from "../../slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Assignment.module.css";

const Assignment = () => {
  const {
    questions,
    onSubmitClick,
    isTimeCompleted,
    currentQuestion,
    submittedAnswers,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const Ref = useRef(null);

  return (
    <div className={styles.quiz}>
      {isTimeCompleted || onSubmitClick ? (
        <div className={styles.resultPage}>
          <Result
            totalScore={0}
            totalQuestions={questions.length}
            submittedAnswers={submittedAnswers}
          />
        </div>
      ) : (
        <>
          <div className={styles.quiz__leftContainer}>
            <div className="">
              <div className={styles.timer}>
                <Timer Ref={Ref} />
              </div>
              <div className={styles.assignment}>
                <div className={styles.questions}>
                  <QuestionPage
                    questions={questions[currentQuestion]}
                    index={currentQuestion}
                    updateAnswers={updateAnswers}
                    optionSelected={submittedAnswers[currentQuestion]}
                  />
                </div>
                <div className={styles.buttons}>
                  <div>
                    <button
                      disabled={currentQuestion === 0 ? true : false}
                      className={`button ${
                        currentQuestion === 0 ? "disable" : null
                      }`}
                      onClick={() => {
                        dispatch(onPreviousQuestion());
                      }}
                    >
                      Prev
                    </button>
                  </div>
                  <div>
                    <button
                      className={`button ${
                        currentQuestion === questions.length - 1
                          ? "disable"
                          : null
                      }`}
                      onClick={() => {
                        dispatch(onNextQuestion());
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div>
                  {currentQuestion === questions.length - 1 ? (
                    <button
                      className={styles.submit}
                      onClick={() => {
                        dispatch(onAssignmentSubmit({ Ref }));
                      }}
                    >
                      SUBMIT
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.quiz__rightContainer}>
            <QuestionNavigation />
          </div>
        </>
      )}
    </div>
  );
};

export default Assignment;
