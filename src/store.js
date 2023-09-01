import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import quizSlice from "./slices/quizSlice";

export default configureStore({
  reducer: {
    home: homeSlice,
    quiz: quizSlice,
  },
});
