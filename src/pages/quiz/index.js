import React, { useEffect } from "react";
import Assignment from "@/component/QuestionPage/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "@/slices/quizSlice";
import axios from "axios";

export const getStaticProps = async () => {
  // fetched one at build time and resue it
  const fetchedQuestions = await axios
    .get("https://opentdb.com/api.php?amount=15")
    .then((res) => {
      return res.data.results;
    });
  return { props: { fetchedQuestions } };
};

const Quiz = ({ fetchedQuestions }) => {
  const {} = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  dispatch(setQuestions(fetchedQuestions));

  return <Assignment />;
};

export default Quiz;
