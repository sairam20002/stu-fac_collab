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

const AdminAssignGroupControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    group: "",
    users: [],
    groups: [],
    error: false,
    message: "",
    isLoading: true,
    lastSelectedUser: "",
  });

  useEffect(() => {
    const { token } = isAutheticated();
    /////

    var tempGroups, tempUsers;
    const fetchData = async () => {
      await api
        .getGroups(token)
        .then((response) => {
          tempGroups = response.groups;
          console.log("FORUMS", tempGroups);
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
      console.log("1", tempGroups);
      await api
        .getUsers("Student", token)
        .then((response) => {
          console.log("Users ", response.users);
          tempUsers = response.data.users;
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
        groups: tempGroups,
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
            <h1>Assign a Group</h1>
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik0333">
                <Form.Label>
                  <strong>Groups</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={currentData.group}
                  onChange={(e) => {
                    updateCurrentData({
                      ...currentData,
                      group: e.target.value,
                    });
                  }}
                >
                  <option value={""}>{"Select Group"}</option>
                  {currentData.groups?.map((group) => (
                    <option value={group.groupName}>{group.groupName}</option>
                  ))}
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
                      let result = currentData.users.filter((obj) => {
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
                  groupName: currentData.group,
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

export default AdminAssignGroupControl;
