import React, { useState } from "react";
import { Form, Col, Button, InputGroup, Alert } from "react-bootstrap";

function LoginForm({ handleSubmit, values }) {
  const [currentData, updateCurrentData] = useState({
    username: "",
    password: "",
  });
  return (
    <Form
    /*       style={{
        backgroundColor: "red",
        height: window.innerHeight * 0.5,
        padding: 50,
      }} */
    >
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationFormikUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Username"
              value={currentData.username}
              onChange={(e) =>
                updateCurrentData({
                  ...currentData,
                  username: e.target.value,
                })
              }
            />
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationFormik03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={currentData.password}
            onChange={(e) =>
              updateCurrentData({
                ...currentData,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form.Row>
      <Button
        variant="warning"
        onClick={() => {
          handleSubmit({
            username: currentData.username,
            password: currentData.password,
            isSubmitted: true,
          });
        }}
      >
        Submit form
      </Button>
      {values.message ? (
        <Alert variant={"danger"}>{values.message}</Alert>
      ) : null}
    </Form>
  );
}

export default LoginForm;
