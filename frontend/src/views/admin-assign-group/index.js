import React, { useEffect, useState } from "react";
import AdminAssignGroupControl from "./adminAssignGroup";
import { Alert, Col, Row, Nav } from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";

const AdminAssignGroup = () => {
  const [values, updateValue] = useState({
    groupName: "",
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
      api
        .assignGroup(values.userids, values.groupName, token)
        .then((response) => {
          updateValue({
            ...values,
            isCreating: false,
            isSubmitted: false,
            message: response.message,
            skippedUsers: response.skippedUsers,
            isAssigned:
              response.message === "Success, users added succes" ? true : false,
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
        xs={1}
        style={{
          height: window.innerHeight,
        }}
        className="bg-light"
      >
        <Nav justify fill variant="tabs" activeKey="5" className="d-md-block">
          <Nav.Item>
            <Nav.Link eventKey="1" href="/admin/see">
              See Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" href="/admin/add">
              Add Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" href="/admin/group/add">
              Add New Group
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4" href="/admin/group/see">
              See All Groups
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="5" href="/admin/group/assign">
              Assign a group
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <AdminAssignGroupControl values={values} handleSubmit={updateValue} />
      </Col>
    </Row>
  );
};

export default AdminAssignGroup;
