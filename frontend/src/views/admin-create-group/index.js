import React, { useState, useEffect } from "react";
import { Jumbotron, Nav, Image, Row, Col, Container } from "react-bootstrap";
import image2 from "../../assets/images/Campus-B34st.png";
import "../../css/MyDashboard.css";
import { authenticate, isAutheticated } from "../../_helpers";
import api from "../../API/api";

import AdminCreateGroupControl from "./adminCreateGroup";

const AdminCreateGroup = () => {
  const [values, updateValue] = useState({
    groupName: "",
    groupDescription: "",
    isSubmitted: false,
    creatingGroup: false,
    error: false,
    isCreated: false,
  });

  useEffect(() => {
    if (values.isSubmitted) {
      //updateValue({ ...values, addingCollege: true });
      const { token } = isAutheticated();
      api
        .addGroup(values.groupName, values.groupDescription, token)
        .then((response) => {
          console.log("Group res ", response);
          updateValue({
            ...values,
            creatingGroup: false,
            isSubmitted: false,
            message: response.message,
            isCreated:
              response.message === "Group added successfully" ? true : false,
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
    <>
      <Row>
        <Col
          xs={1}
          style={{
            height: window.innerHeight,
          }}
          className="bg-light"
        >
          <Nav justify fill variant="tabs" activeKey="3" className="d-md-block">
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
          <AdminCreateGroupControl values={values} handleSubmit={updateValue} />
        </Col>
      </Row>
    </>
  );
};

export default AdminCreateGroup;
