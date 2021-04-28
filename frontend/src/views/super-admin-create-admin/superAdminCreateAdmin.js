import React, { useState } from "react";
import { Form, Col, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

const SuperAdminCreateAdminControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    username: "",
    password: "",
    confirmpass: "",
    name: "",
    email: "",
    instituteName: "",
    gender: "",
  });

  return (
    <div>
      <div>
        <h1>Create new admin</h1>
      </div>
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormikUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                value={currentData.username}
                onChange={(e) =>
                  updateCurrentData({
                    ...currentData,
                    username: e.target.value,
                  })
                }
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormik03">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={currentData.password}
              onChange={(e) =>
                updateCurrentData({
                  ...currentData,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormik03">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={currentData.confirmpass}
              onChange={(e) =>
                updateCurrentData({
                  ...currentData,
                  confirmpass: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormik033">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={currentData.email}
              onChange={(e) =>
                updateCurrentData({
                  ...currentData,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationFormik03">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Prepend></InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Name"
                value={currentData.name}
                onChange={(e) =>
                  updateCurrentData({
                    ...currentData,
                    name: e.target.value,
                  })
                }
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Institute Name</Form.Label>
              <InputGroup>
                <InputGroup.Prepend></InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="College ID"
                  value={currentData.instituteName}
                  onChange={(e) =>
                    updateCurrentData({
                      ...currentData,
                      instituteName: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik0333">
              <Form.Label>
                <strong>Gender</strong>
              </Form.Label>
              <Form.Control
                as="select"
                value={currentData.gender}
                onChange={(e) => {
                  updateCurrentData({
                    ...currentData,
                    gender: e.target.value,
                  });
                }}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form.Group>
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
                username: currentData.username,
                password: currentData.password,
                confirmpass: currentData.confirmpass,
                name: currentData.name,
                email: currentData.email,
                instituteName: currentData.instituteName,
                gender: currentData.gender,
                isSubmitted: true,
              });
            }}
          >
            Add Admin
          </Button>
          {values.isSubmitted && (
            <Spinner animation="border" variant="warning" />
          )}
        </Form.Row>
        <Form.Row style={{ marginTop: 20 }}>
          {values.message && (
            <Alert variant={values.isCreated ? "success" : "danger"}>
              {values.message}
            </Alert>
          )}
        </Form.Row>
      </Form>
    </div>
  );
};

export default SuperAdminCreateAdminControl;
