import React, { useState } from "react";
import { Form, Col, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

const AdminCreateGroupControl = ({ handleSubmit, values }) => {
  const [currentData, updateCurrentData] = useState({
    groupName: "",
    groupDescription: "",
  });

  //console.log(values.forumType);
  return (
    <div>
      <div>
        <h1>Create a Group</h1>
      </div>
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>
                <strong>Group Name</strong>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Group Name"
                  value={currentData.groupName}
                  onChange={(e) =>
                    updateCurrentData({
                      ...currentData,
                      groupName: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>
                <strong>Group Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Group Description"
                value={currentData.groupDescription}
                onChange={(e) =>
                  updateCurrentData({
                    ...currentData,
                    groupDescription: e.target.value,
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
                  groupName: currentData.groupName,
                  groupDescription: currentData.groupDescription,
                  isSubmitted: true,
                });
                console.log(currentData);
              }}
            >
              Create Group
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
    </div>
  );
};

export default AdminCreateGroupControl;
