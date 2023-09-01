# Quiz Application

A responsive web application for timer-based MCQ quizzes with a comparison screen at the end of the quiz

![Uploading screen1.png…]()


## Problem statement

create a quiz application that meets the criteria detailed below.

● The application should have a start page where the user should submit their email address.
● Then the application should display 15 questions to the user.
● A timer should be displayed on the top of the page, counting down from 30 minutes. The quiz
should auto-submit when the timer reaches zero.

● Users should be able to navigate to a specific question.
● An overview panel or similar element should show all questions indicating: Which questions the user has visited and which questions have been attempted.

● After the quiz or when the timer ends, users should be directed to a report page.
● This report should display each question with the user's answer and the correct answer side by
side or in a format that is easy to compare.

## Approach

Step1: Decide the Tech stack:

for me, it's **NextJs**, **redux/toolkit** because nextJs with react library provide you a way to break your application into different reusable component and redux is used for maintaining global state so that props drilling can be prevented as much as possible.

Step2: Components
There are 3 phases of this application

1. Entry
2. Quiz
3. Answer comparison

in phase2 A time will be running for 30 minutes and as soon as the timer expires, the Quiz will end and the user will get redirected to comparison screen

Here is the flow of the application

HomePage => Assesmemt => Timer => Result

HomePage:
This page will take user's email as input and then only the user can proceed to start the quiz

Assessment:
This page is the combination of **Timer component**, **Question Component** and **QuestionNavigator Component**
=>**Timer component** will take care of 30 minutes timer
=>**Question Component** is a reusable component to show each question in the same format and design

=>**QuestionNavigator Component** will take care of navigation between one question to any random question

Result:
This component will show the comparison between the user-selected answer and the actual correct answer.

UI flow is like this

You will see 4 options

**If the user's answer is correct**
-> The correct option background color will be green with a tick icon at the right side of that option

**If the user's answer is wrong**
-> user selected option will be in red color with a cross icon in the right of that option and then one option will marked as in green color denoting it as the correct option, no tick icon will be available

**If the User has not attempted a question**
-> Only the correct answer will marked in green color with no tick icon

`
For maintaining all the possible states and values like questions, submitted answers, current questions etc. are maintained using Redux`

## Local Setup Process

1. Clone this repo using `git clone https://github.com/mohit355/QUIZ-APPLICATION.git`
2. Run the following command in order

   1. `cd QUIZ-APPLICATION`
   2. `npm install`
   3. `npm run dev`

3. Your local server will be up check at `http://localhost:3000`

## Assumptions
All questions have only one correct answer

##Challenged Faced

1. Question Navigator
   There are the following possibilities to show that navigator for each question
   1. **Question Unvisited**
   2. **Question visited but not answered**
   3. **Question visited and attempted**
   4. **Current question**

The challenge was to maintain these states, doing that in different states is easy but how can we achieve it using a single state?

####My approach

1.  Created one state named submitted answer which stores an object whose keys and value are as follows

        `keys - index of the question`
        `value: answer of the question at that index`

This state is also used to store answers selected by User and I used this state to create Navigator

Scenario
-> **Question Unvisited**: entry will not exist in submittedAnswer state, no change in navigator

-> **Quested visited but not answered**: Entry will exist in the submittedAnswer state but the value for that question will be an empty string, Navigator for that question will be of background white

-> **Quest visited and attempted**: Entry will exist in the submittedAnswer state and the value for that question will be a string. The navigator for that question will be of background green

-> **Current question**: Active index will be my current question. The navigator for that question will be of border yellow.

##Data Fetching

I have used Static site generation to fetch the quiz data from the API because as we know SSG will generate and build the page at build time and we don't need to update the page on every requestion.
