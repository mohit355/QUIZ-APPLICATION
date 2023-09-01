import { getQuestionOptions } from "@/utils/utils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./QuestionPage.module.css";

const QuestionPage = ({ questions, index, updateAnswers, optionSelected }) => {
  const {} = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  let options = getQuestionOptions(questions);
  const onOptionChange = (event) => {
    dispatch(updateAnswers({ index, value: event.target.value }));
  };

  return (
    <div className={styles.questionPage}>
      <div className={styles.questionText}>
        [Q{index + 1}]. {questions.question}
      </div>
      <div className={styles.radioSection}>
        {options.map((option, ind) => {
          let isSelected = optionSelected && optionSelected === option;
          return (
            <div key={ind} className="radioItem">
              <label
                className={` ${
                  isSelected ? styles.optionSelected : styles.optionLabel
                } `}
              >
                <input
                  type="radio"
                  value={option}
                  checked={optionSelected && optionSelected === option}
                  onChange={onOptionChange}
                />
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPage;
