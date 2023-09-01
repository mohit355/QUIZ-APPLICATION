// merge incorrect and correct option to get options
export const getQuestionOptions = (question) => {
  let options = [...question.incorrect_answers, question.correct_answer];

  return options;
};

// email validator
export const isEmailValid = (email) => {
  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};
