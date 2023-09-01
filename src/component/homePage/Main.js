import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { onChangeEmail, setInValidErrorMsg } from "../../slices/homeSlice";
import styles from "./Main.module.css";
import { isEmailValid } from "@/utils/utils";

const Main = () => {
  const { email, inValidEmail, redirect } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const router = useRouter();

  const validateEmailAndRedirect = () => {
    let isValid = isEmailValid(email);
    if (isValid) {
      router.push("/quiz");
    } else {
      dispatch(setInValidErrorMsg());
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.homePage}>
        <div className={styles.homePage_left}>
          <div className={styles.welcomeText}>
            Welocome To <span style={{ color: "yellow" }}>Josh Talks</span> Quiz
          </div>
          <div className={styles.totalTimetext}>
            Time Limit : <span>30 minutes</span>
          </div>
        </div>
        <div className={styles.homePage_right}>
          <input
            onChange={(e) => {
              dispatch(onChangeEmail(e.target.value));
            }}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email*"
            value={email}
          />
          {inValidEmail && <span className={styles.error}>Invalid Email</span>}
          <button onClick={validateEmailAndRedirect} className="button">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
