export const getQuestionOptions = (question) => {
  let options = [...question.incorrect_answers, question.correct_answer];

  return options;
};

export const isEmailValid = (email) => {
  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};
