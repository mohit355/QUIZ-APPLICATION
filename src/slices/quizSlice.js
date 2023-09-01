import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  questions: [],
  onSubmitClick: false,
  isTimeCompleted: false,
  currentQuestion: 0,
  totalScore: 0,
  submittedAnswers: { 0: "" },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    // update question fetched from api
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    // on next button click
    onNextQuestion: (state, action) => {
      // first check if answer already exist or not
      let ans = state.submittedAnswers;
      if (!ans[state.currentQuestion + 1]) {
        state.submittedAnswers = {
          ...state.submittedAnswers,
          [state.currentQuestion + 1]: "",
        };
      }

      if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion = state.currentQuestion + 1;
      }
    },

    // on previous button click
    onPreviousQuestion: (state, action) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion = state.currentQuestion - 1;
      }
    },

    // on click of submit button
    onAssignmentSubmit: (state, action) => {
      clearInterval(action.payload.Ref.current);
      state.onSubmitClick = true;
    },

    // on time out
    clearTimeInterval: (state, payload) => {
      clearInterval(action.payload.Ref.current);
      state.isTimeCompleted = true;
    },

    // on selecting any answer by user
    updateAnswers: (state, action) => {
      let index = action.payload.index;
      let value = action.payload.value;
      state.submittedAnswers = { ...state.submittedAnswers, [index]: value };
    },

    // checking for timeout
    setIsTimeCompleted: (state) => {
      state.isTimeCompleted = true;
    },

    // update current question state
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload.questionIndex;
    },

    // question navigator
    handleQuestionNaviagtion: (state, action) => {
      let questionIndex = action.payload.index;
      // check if that answer index already exist or not
      if (!state.submittedAnswers[questionIndex]) {
        state.submittedAnswers = {
          ...state.submittedAnswers,
          [questionIndex]: "",
        };
      }
      state.currentQuestion = questionIndex;
    },
  },
});

export const {
  onNextQuestion,
  onPreviousQuestion,
  onAssignmentSubmit,
  clearTimeInterval,
  updateAnswers,
  setIsTimeCompleted,
  setCurrentQuestion,
  handleQuestionNaviagtion,
  setQuestions,
} = quizSlice.actions;
export default quizSlice.reducer;
