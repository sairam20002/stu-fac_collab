import React, { useEffect, useState } from "react";
import FormSignup from "./FormSignup";
import { Alert, Col, Row } from "react-bootstrap";
import api from "../../API/api";

const SignUp = () => {
  const [values, updateValue] = useState({
    Type: "",
    username: "",
    password: "",
    name: "",
    email: "",
    instituteName: "",
    department: "",
    gender: "",
    batch: "",
    registrationNumber: "",
    enrolledDate: "",
    rollNumber: "",
    course: "",
    courseDuration: "",
    isSubmitted: false,
    signingIn: false,
    isRegistered: false,
    message: "",
    error: false,
  });

  useEffect(() => {
    if (values.isSubmitted) {
      updateValue({ ...values, loggingIn: true });
      console.log("Values", values);
      api
        .signUp(values)
        .then((response) => {
          console.log("Rgistered ", response);
          updateValue({
            ...values,
            signingIn: false,
            isSubmitted: false,
            message: response.message,
            isRegistered:
              response.message === "Faculty added successfully" ||
              response.message === "Student added successfully"
                ? true
                : false,
          });
        })
        .catch((error) => {
          console.log(error);
          updateValue({
            ...values,
            error: true,
            isSubmitted: false,
            signingIn: false,
            message: error,
          });
        });
    }
  }, [values.isSubmitted]);

  return (
    <Col
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormSignup values={values} handleSubmit={updateValue} />
    </Col>
  );
};

export default SignUp;
