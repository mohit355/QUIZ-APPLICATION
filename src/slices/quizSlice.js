import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  questions: [
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "hard",
      question:
        "Electronic music producer Kygo&#039;s popularity skyrocketed after a certain remix. Which song did he remix?",
      correct_answer: "Ed Sheeran - I See Fire",
      incorrect_answers: [
        "Marvin Gaye - Sexual Healing",
        "Coldplay - Midnight",
        "a-ha - Take On Me",
      ],
    },
    {
      category: "Sports",
      type: "boolean",
      difficulty: "medium",
      question:
        "Soccer player Cristiano Ronaldo opened a museum dedicated to himself.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "General Knowledge",
      type: "boolean",
      difficulty: "easy",
      question:
        "It is automatically considered entrapment in the United States if the police sell you illegal substances without revealing themselves.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science & Nature",
      type: "multiple",
      difficulty: "medium",
      question: "What is the chemical formula for ammonia?",
      correct_answer: "NH3",
      incorrect_answers: ["CO2", "NO3", "CH4"],
    },
    {
      category: "Entertainment: Comics",
      type: "multiple",
      difficulty: "hard",
      question:
        "In the Homestuck Series, what is the alternate name for the Kingdom of Lights?",
      correct_answer: "Prospit",
      incorrect_answers: ["No Name", "Golden City", "Yellow Moon"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "hard",
      question:
        "&quot;All the Boys&quot; by Panic! At the Disco was released as a bonus track on what album?",
      correct_answer: "Too Weird To Live, Too Rare To Die!",
      incorrect_answers: [
        "A Fever You Can&#039;t Sweat Out",
        "Death Of A Bachelor",
        "Vices &amp; Virtues",
      ],
    },
    {
      category: "Entertainment: Cartoon & Animations",
      type: "boolean",
      difficulty: "easy",
      question:
        "Waylon Smithers from &quot;The Simpsons&quot; was originally black when he first appeared in the series.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "Entertainment: Cartoon & Animations",
      type: "multiple",
      difficulty: "hard",
      question:
        "In &quot;Rick and Morty&quot;, from which dimension do Rick and Morty originate from?",
      correct_answer: "C-137",
      incorrect_answers: ["J1977", "C-136", "C500-a"],
    },
    {
      category: "Entertainment: Board Games",
      type: "multiple",
      difficulty: "hard",
      question:
        "What was the development code name for the &quot;Weatherlight&quot; expansion for &quot;Magic: The Gathering&quot;, released in 1997?",
      correct_answer: "Mocha Latte",
      incorrect_answers: ["Decaf", "Frappuccino", "Macchiato"],
    },
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "hard",
      question:
        "In the Magic: The Gathering universe,  the Antiquities, Ice Age, and Alliances expansions take place on which continent?",
      correct_answer: "Terisiare",
      incorrect_answers: ["Aerona", "Shiv", "Jamuraa"],
    },
    {
      category: "Entertainment: Television",
      type: "multiple",
      difficulty: "medium",
      question:
        "On the NBC show Community what was Star Burns&#039; real name?",
      correct_answer: "Alex",
      incorrect_answers: ["Todd", "Neal", "Grimus"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "medium",
      question: "Who released the 1991 album &quot;Out of Time&quot;?",
      correct_answer: "R.E.M.",
      incorrect_answers: ["U2", "Coldplay", "The Rolling Stones"],
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "hard",
      question:
        "The ancient city of Chich&eacute;n Itz&aacute; was built by which civilization?",
      correct_answer: "Mayans",
      incorrect_answers: ["Aztecs", "Incas", "Toltecs"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "medium",
      question: "What is the opening track on Lorde&#039;s Pure Heroine?",
      correct_answer: "Tennis Court",
      incorrect_answers: ["Team", "Royals", "400 Lux"],
    },
    {
      category: "Entertainment: Video Games",
      type: "boolean",
      difficulty: "easy",
      question:
        "The game &quot;Jetpack Joyride&quot; was created by &quot;Redbrick Studios&quot;.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
  ],
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
} = quizSlice.actions;
export default quizSlice.reducer;
