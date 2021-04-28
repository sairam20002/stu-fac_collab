import React, { useState, useEffect } from "react";
import ForumPage from "./forumPage";
import { authenticate, isAutheticated } from "../../_helpers";
import { Link, useHistory } from "react-router-dom";
import api from "../../API/api";
import { Spinner, Col } from "react-bootstrap";

const ForumControl = () => {
  const history = useHistory();
  const [values, updateValue] = useState({
    forumName: "",
    forumDescription: "",
    Type: "",
    memberLimit: "",
    isSubmitted: false,
    message: "",
    isCreated: "",
  });

  useEffect(() => {
    if (values.isSubmitted) {
      //updateValue({ ...values, addingCollege: true });
      const { token } = isAutheticated();
      console.log("Token", token);
      api
        .createForum(
          values.forumName,
          values.forumDescription,
          values.Type,
          values.memberLimit,
          token
        )
        .then((response) => {
          console.log("Forum res ", response);
          updateValue({
            ...values,
            isSubmitted: false,
            message: response.message,
            isCreated:
              response.message === "Forum added success" ? true : false,
          });
        })
        .catch((error) => {
          console.log(error);
          updateValue({
            ...values,
            error: true,
            isSubmitted: false,
          });
        });
    }
  }, [values.isSubmitted]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <ForumPage values={values} handleSubmit={updateValue} />
      {values.isCreated && history.push("/forum/see")}
    </div>
  );
};

export default ForumControl;
