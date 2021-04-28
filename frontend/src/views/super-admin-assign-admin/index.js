import React, { useEffect, useState } from "react";
import SuperAdminAssignAdminControl from "./superAdminAssignAdmin";
import { Alert, Col, Row, Nav } from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";

const SuperAdminAssignAdmin = () => {
  const [values, updateValue] = useState({
    email: "",
    instituteName: "",
    isSubmitted: false,
    isAssigned: false,
    isAssigning: false,
    message: "",
    error: false,
  });

  useEffect(() => {
    if (values.isSubmitted) {
      updateValue({ ...values, isAssigning: true });
      const { token } = isAutheticated();
      api
        .assignAdmin(values.instituteName, values.email, token)
        .then((response) => {
          updateValue({
            ...values,
            isCreating: false,
            isSubmitted: false,
            message: response.message,
            isAssigned:
              response.message === "Assigned Admin success" ? true : false,
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
        <Nav justify fill variant="tabs" activeKey="3" className="d-md-block">
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
        <SuperAdminAssignAdminControl
          values={values}
          handleSubmit={updateValue}
        />
      </Col>
    </Row>
  );
};

export default SuperAdminAssignAdmin;
