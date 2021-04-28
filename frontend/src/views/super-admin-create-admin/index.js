import React, { useEffect, useState } from "react";
import SuperAdminCreateAdminControl from "./superAdminCreateAdmin";
import { Alert, Col, Row, Nav } from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";

const SuperAdminCreateAdmin = () => {
  const [values, updateValue] = useState({
    username: "",
    password: "",
    confirmpass: "",
    name: "",
    email: "",
    instituteName: "",
    gender: "",
    isSubmitted: false,
    isCreated: false,
    isCreating: false,
    message: "",
    error: false,
  });

  useEffect(() => {
    if (values.isSubmitted) {
      updateValue({ ...values, isCreating: true });
      const { token } = isAutheticated();
      api
        .createAdmin(values, token)
        .then((response) => {
          updateValue({
            ...values,
            isCreating: false,
            isSubmitted: false,
            message: response.message,
            isCreated:
              response.message === "Institute Admin added Success"
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
            isCreating: false,
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
        <Nav justify fill variant="tabs" activeKey="2" className="d-md-block">
          <Nav.Item>
            <Nav.Link eventKey="1" href="/super-admin/institute/add">
              Add Institute
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" href="/super-admin/admin/create">
              Create Admin
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" href="/super-admin/admin/assign">
              Assign Admin
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4" href="/super-admin/admin/see">
              See Admins
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="5" href="/super-admin/institute/see">
              See Institutes
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
        <SuperAdminCreateAdminControl
          values={values}
          handleSubmit={updateValue}
        />
      </Col>
    </Row>
  );
};

export default SuperAdminCreateAdmin;
