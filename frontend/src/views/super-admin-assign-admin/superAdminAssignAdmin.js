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

const SuperAdminAssignAdminControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    instituteName: "",
    adminEmail: "",
    admins: [],
    institutes: [],
    error: false,
    message: "",
    isLoading: true,
  });

  useEffect(() => {
    const { token } = isAutheticated();
    let tempInstitutes, tempAdmins;

    const fetchData = async () => {
      await api
        .getInstitutes(token)
        .then((response) => {
          tempInstitutes = response.institute;
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
      await api
        .getAdmins(token)
        .then((response) => {
          tempAdmins = response.admins;
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

      updateCurrentData({
        ...currentData,
        institutes: tempInstitutes,
        admins: tempAdmins,
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
            <h1>Assign an Admin</h1>
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik0333">
                <Form.Label>
                  <strong>Institute</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={currentData.instituteName}
                  onChange={(e) => {
                    updateCurrentData({
                      ...currentData,
                      instituteName: e.target.value,
                    });
                  }}
                >
                  <option value={""}>{"Select Institute"}</option>
                  {currentData.institutes?.map(
                    (institute) =>
                      !institute.assignedAdmin && (
                        <option value={institute.instituteName}>
                          {institute.instituteName}
                        </option>
                      )
                  )}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik0333">
                <Form.Label>
                  <strong>Admin</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={currentData.adminEmail}
                  onChange={(e) => {
                    updateCurrentData({
                      ...currentData,
                      adminEmail: e.target.value,
                    });
                  }}
                >
                  <option value={""}>{"Select Admin"}</option>
                  {currentData.admins?.map(
                    (admin) =>
                      !admin.isAssigned && (
                        <option value={admin.email}>{admin.name}</option>
                      )
                  )}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => {
                  handleSubmit({
                    email: currentData.adminEmail,
                    instituteName: currentData.instituteName,
                    isSubmitted: true,
                  });
                }}
              >
                Submit
              </Button>
              {values.isSubmitted && (
                <Spinner animation="border" variant="warning" />
              )}
            </Form.Row>
            <Form.Row style={{ marginTop: 20 }}>
              {values.message && (
                <Alert variant={values.isAssigned ? "success" : "danger"}>
                  {values.message}
                </Alert>
              )}
              {currentData.error && (
                <Alert variant="danger">{currentData.message}</Alert>
              )}
            </Form.Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default SuperAdminAssignAdminControl;
