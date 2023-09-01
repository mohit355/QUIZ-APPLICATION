import { getQuestionOptions } from "@/utils/utils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Tick from "../../assets/tick.png";
import Cross from "../../assets/cross.png";
import styles from "./result.module.css";

const Result = () => {
  const { questions, submittedAnswers } = useSelector((state) => state.quiz);
  return (
    <div className={styles.comparePage}>
      <p>THANK YOU</p>
      <p>Match Your Answer with the Correct Answer</p>
      <div>
        {questions &&
          questions.map((question, index) => {
            let options = getQuestionOptions(question);

            return (
              <div key={question.question} className={styles.question}>
                <span className={styles.questionText}>
                  [Q{index + 1}]. {question.question}
                </span>
                <div className={styles.radioSection}>
                  {options.map((option) => {
                    let isCorrectAnswer =
                      question.correct_answer === submittedAnswers[index];
                    let isOptionSelected = option === submittedAnswers[index];
                    let isCorrectOption = question.correct_answer === option;
                    return (
                      <div key={option} className="radioItem">
                        <input
                          type="radio"
                          name="radio"
                          checked={option === submittedAnswers[index]}
                        />
                        <label
                          className={`
                         ${isCorrectOption ? styles.correctOption : ""}
                        
                        ${
                          isOptionSelected && isCorrectAnswer
                            ? styles.correctAnswerSelected
                            : ""
                        }
                        ${
                          isOptionSelected && !isCorrectAnswer
                            ? styles.wrongAnswerSelected
                            : ""
                        }
                        `}
                        >
                          <span>{option}</span>
                          {isOptionSelected && (
                            <span>
                              {isCorrectAnswer ? (
                                <Image
                                  height={30}
                                  width={30}
                                  src={Tick}
                                  alt="tick"
                                />
                              ) : (
                                <Image
                                  height={28}
                                  width={28}
                                  src={Cross}
                                  alt="cross"
                                />
                              )}
                            </span>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Result;
