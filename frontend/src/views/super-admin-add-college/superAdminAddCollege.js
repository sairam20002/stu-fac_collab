import React, { useState } from "react";
import { Form, Col, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

const SuperAdminAddCollegeControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    instituteName: "",
    instituteDescription: "",
  });

  //console.log(values.forumType);
  return (
    <div>
      <div>
        <h1>Add a Institute</h1>
      </div>
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>
                <strong>Institute Name</strong>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="College Name"
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
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>
                <strong>Institute Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="College Description"
                value={currentData.instituteDescription}
                onChange={(e) =>
                  updateCurrentData({
                    ...currentData,
                    instituteDescription: e.target.value,
                  })
                }
              />
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
                  instituteName: currentData.instituteName,
                  instituteDescription: currentData.instituteDescription,
                  isSubmitted: true,
                });
                console.log(currentData);
              }}
            >
              Add College
            </Button>
            {values.isSubmitted && (
              <Spinner animation="border" variant="warning" />
            )}
          </Form.Row>
          <Form.Row style={{ marginTop: 20 }}>
            {values.message && (
              <Alert variant={values.isAdded ? "success" : "danger"}>
                {values.message}
              </Alert>
            )}
          </Form.Row>
        </Form>
      </div>
    </div>
  );
};

export default SuperAdminAddCollegeControl;
