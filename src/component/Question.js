import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Question({
  options,
  response,
  answerOfQue,
  newQuestion,
  handleSubmit,
  handleInputChange,
}) {
  return (
    <Form className="main-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 question" controlId="formBasicEmail">
        <Form.Label>Question</Form.Label>
        <Form.Text className="mb-3">
          <h3 name="question">{newQuestion?.question}</h3>
        </Form.Text>
      </Form.Group>
      {options?.map((ans, index) => (
        <div className="options" key={index}>
          <h5>
            {index + 1}) {ans}
          </h5>
        </div>
      ))}

      <Form.Group className="mb-3 answer" controlId="formBasicPassword">
        <Form.Label>Enter your answer</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter answer"
          name="answer"
          value={answerOfQue.answer}
          onChange={handleInputChange}
        />
      </Form.Group>
      <h6 className="response">{response}</h6>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Question;
