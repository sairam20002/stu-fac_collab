import React, { useState } from "react";
import { Form, Col, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

function ForumPage({ handleSubmit, values }) {
  const [currentData, updateCurrentData] = useState({
    forumName: "",
    forumDescription: "",
    Type: "",
    memberLimit: "",
  });
  //console.log(values.forumType);
  return (
    <div>
      <div>
        <h1>Create a Forum...</h1>
      </div>
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>
                <strong>Forum Name</strong>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Forum Name"
                  value={currentData.forumName}
                  onChange={(e) =>
                    updateCurrentData({
                      ...currentData,
                      forumName: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>
                <strong>Forum Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Forum Description"
                value={currentData.forumDescription}
                onChange={(e) =>
                  updateCurrentData({
                    ...currentData,
                    forumDescription: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              <strong>Form Type</strong>
            </Form.Label>
            <Form.Control
              as="select"
              value={currentData.Type}
              onChange={(e) => {
                updateCurrentData({
                  ...currentData,
                  Type: e.target.value,
                });
              }}
            >
              <option value="">Select</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Form.Control>
          </Form.Group>
          {currentData.Type == "Private" && (
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormikUsername">
                <Form.Label>
                  <strong>Member Limit</strong>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Member Limit"
                    value={currentData.memberLimit}
                    onChange={(e) =>
                      updateCurrentData({
                        ...currentData,
                        memberLimit: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
          )}
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
                  forumName: currentData.forumName,
                  forumDescription: currentData.forumDescription,
                  Type: currentData.Type,
                  memberLimit: currentData.memberLimit,
                  isSubmitted: true,
                });
                console.log("Current Forum Data", currentData);
              }}
            >
              Submit form
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
}

export default ForumPage;
