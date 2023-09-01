import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTimeCompleted } from "../../slices/quizSlice";

const Timer = ({ Ref, calculateScore }) => {
  const { isTimeCompleted } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds),
      );
    } else {
      clearInterval(Ref.current);
      console.log("working");
      dispatch(setIsTimeCompleted());
    }
  };

  const clearTimer = (e) => {
    setTimer("00:30:00");

    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 1800);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <div className="timer">
      <h1>{timer}</h1>
    </div>
  );
};

export default Timer;
