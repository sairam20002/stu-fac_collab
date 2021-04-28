import React, { useEffect, useState } from "react";
import {
  Form,
  Col,
  Button,
  InputGroup,
  Alert,
  Spinner,
  Row,
} from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";
import SelectedUsers from "./SelectedUsers";

var user = [];
var userDisplay = [];

const AssignForumControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    forum: "",
    forumId: "",
    users: [],
    forums: [],
    error: false,
    message: "",
    isLoading: true,
    lastSelectedUser: "",
  });

  useEffect(() => {
    const { token } = isAutheticated();
    var tempForums, tempUsers;
    const fetchData = async () => {
      await api
        .getForumsOfLoggedInUser(token)
        .then((response) => {
          tempForums = response["created"];
          console.log("FORUMS", tempForums);
        })
        .catch((error) => {
          console.log(error);
          updateCurrentData({
            ...currentData,
            error: true,
            message: error,
            isLoading: false,
          });
        });
      console.log("1", tempForums);
      await api
        .getUsersOfLoggedInUser(token)
        .then((response) => {
          console.log("Users ", response.users);
          tempUsers = response.users;
        })
        .catch((error) => {
          console.log(error);
          updateCurrentData({
            ...currentData,
            error: true,
            message: error,
            isLoading: false,
          });
        });

      console.log("2", tempUsers);
      updateCurrentData({
        ...currentData,
        forums: tempForums,
        users: tempUsers,
        isLoading: false,
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {currentData.isLoading ? (
        <Row
          style={{
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Spinner animation="border" variant="warning" style={{}} />
        </Row>
      ) : (
        <div>
          <div>
            <h1>Assign a Forum</h1>
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik0333">
                <Form.Label>
                  <strong>Forum</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={currentData.forum}
                  onChange={(e) => {
                    console.log(e.target.value);
                    updateCurrentData({
                      ...currentData,
                      forum: e.target.value,
                    });
                  }}
                >
                  <option value={""}>{"Select Forum"}</option>
                  {currentData.forums
                    ? currentData.forums?.map((forum) => (
                        <option value={forum._id}>{forum.forumName}</option>
                      ))
                    : null}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik0333">
                <Form.Label>
                  <strong>Users</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={currentData.lastSelectedUser}
                  onChange={(e) => {
                    if (user.indexOf(e.target.value) === -1) {
                      user.push(e.target.value);
                      let result = currentData.users?.filter((obj) => {
                        return obj._id === e.target.value;
                      });
                      userDisplay.push(result[0]);
                    }
                    updateCurrentData({
                      ...currentData,
                      lastSelectedUser: e.target.value,
                    });
                  }}
                >
                  {currentData.users?.map((user) => (
                    <option value={user._id}>
                      {user.name}
                      {" - "}
                      {user._id}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button
              onClick={() => {
                handleSubmit({
                  userids: user,
                  forumId: currentData.forum,
                  isSubmitted: true,
                });
                user = [];
                userDisplay = [];
              }}
            >
              Submit
            </Button>
            {values.message && (
              <Alert variant={values.isAssigned ? "success" : "danger"}>
                {values.message}
              </Alert>
            )}
            {currentData.error && (
              <Alert variant="danger">{currentData.message}</Alert>
            )}
          </Form>
          <SelectedUsers
            userData={userDisplay}
            isAssigned={values.isAssigned}
            skippedUsers={values.skippedUsers}
          />
        </div>
      )}
    </>
  );
};

export default AssignForumControl;
