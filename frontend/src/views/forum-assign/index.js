import React, { useEffect, useState } from "react";
import AssignForumControl from "./assignForum";
import { Alert, Col, Row, Nav } from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";

const AssignForum = () => {
  const [values, updateValue] = useState({
    forumId: "",
    userids: [],
    isSubmitted: false,
    isAssigned: false,
    isAssigning: false,
    message: "",
    skippedUsers: [],
    error: false,
  });

  useEffect(() => {
    if (values.isSubmitted) {
      updateValue({ ...values, isAssigning: true });
      const { token } = isAutheticated();
      console.log("USERIDS", values.userids);
      api
        .assignForum(values.userids, values.forumId, token)
        .then((response) => {
          updateValue({
            ...values,
            isCreating: false,
            isSubmitted: false,
            message: response.message,
            skippedUsers: response.skippedUsers,
            isAssigned:
              response.message === "Users added to pvt forum" ? true : false,
          });
        })
        .catch((error) => {
          console.log(error);
          updateValue({
            ...values,
            error: true,
            isSubmitted: false,
            isAssigning: false,
            message: error,
          });
        });
    }
  }, [values.isSubmitted]);

  return (
    <Row>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <AssignForumControl values={values} handleSubmit={updateValue} />
      </Col>
    </Row>
  );
};

export default AssignForum;
