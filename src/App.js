/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import Question from "./component/Question";

function App() {
  //initial state for form
  const initialState = {
    answer: "",
  };
  //component state
  const [answers, setAnswers] = useState();
  const [response, setResponse] = useState("");
  const [newQuestion, setNewQuestion] = useState([]);
  const [answerOfQue, setAnswerOfQue] = useState(initialState);

  useEffect(() => {
    // fetch new Question using function
    getNewQuestion();
  }, []);

  useEffect(() => {
    if (newQuestion.length !== 0) {
      var item = Math.floor(Math.random() * answers?.length);
      answers?.splice(item, 0, newQuestion?.correct_answer);
      setAnswers([...answers]);
    }
  }, [newQuestion]);

  // function to fetch new question from api
  const getNewQuestion = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=1");
    const newQuestionResponse = await response.json();
    const newQuestion1 = newQuestionResponse.results[0];
    setNewQuestion(newQuestion1);
    setAnswers(newQuestion1.incorrect_answers);
    localStorage.setItem("correct_answer", newQuestion1.correct_answer);
    setResponse("");
  };

  //get input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswerOfQue({ ...answerOfQue, [name]: value });
  };

  //clear state
  const clearState = () => {
    setAnswerOfQue({ ...initialState });
  };

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answerOfQue.answer === "") {
      setResponse("Please enter your answer");
      toast.warning("Please enter your answer", {
        position: "top-center",
      });
    } else {
      const rightAnswer = localStorage.getItem("correct_answer");
      if (rightAnswer.toLowerCase() === answerOfQue.answer.toLowerCase()) {
        setResponse(
          "Congratulation,You're answer is right,We are gonna move to next question"
        );
        toast.success(
          "Congratulation,You're answer is right,let's move to next question",
          {
            position: "top-center",
          }
        );
        getNewQuestion();
        clearState();
      } else {
        setResponse("You're answer is wrong,please try again");
        toast.warning("You're answer is wrong,please try again", {
          position: "top-center",
        });
        clearState();
        setResponse("");
      }
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <Question
        options={answers}
        response={response}
        newQuestion={newQuestion}
        answerOfQue={answerOfQue}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default App;
