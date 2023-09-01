import React from "react";
import styles from "./questionNavigator.module.css";
import { handleQuestionNaviagtion } from "../../../slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";

const QuestionNavigation = () => {
  const { questions, currentQuestion, submittedAnswers } = useSelector(
    (state) => state.quiz,
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.navigator}>
      <p>Question Navigator</p>
      <div className={styles.qNavigator}>
        {questions.map((_, index) => {
          return (
            <span
              key={index}
              id={index}
              onClick={() => {
                dispatch(handleQuestionNaviagtion({ index }));
              }}
              className={`${styles.questionNav} 
              ${
                submittedAnswers[index] && submittedAnswers[index].length !== 0
                  ? styles.attended
                  : ""
              }
              ${
                submittedAnswers[index] === "" && currentQuestion !== index
                  ? styles.visited
                  : ""
              }

              ${currentQuestion === index ? styles.currentQuestion : ""}
              `}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionNavigation;
