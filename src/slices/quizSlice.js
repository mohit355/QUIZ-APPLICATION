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
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
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
    onPreviousQuestion: (state, action) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion = state.currentQuestion - 1;
      }
    },
    onAssignmentSubmit: (state, action) => {
      clearInterval(action.payload.Ref.current);
      state.onSubmitClick = true;
    },
    clearTimeInterval: (state, payload) => {
      clearInterval(action.payload.Ref.current);
      state.isTimeCompleted = true;
    },
    updateAnswers: (state, action) => {
      let index = action.payload.index;
      let value = action.payload.value;
      state.submittedAnswers = { ...state.submittedAnswers, [index]: value };
    },
    setIsTimeCompleted: (state) => {
      state.isTimeCompleted = true;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload.questionIndex;
    },
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
