import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Row,
  Col,
  Badge,
  Container,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { authenticate, isAutheticated } from "../../_helpers";
import api from "../../API/api";

/* const data = {
  username: "ishanarya0",
  name: "Ishan Arya",
  email: "ishan.arya@iiitg.ac.in",
  collegeName: "IIITG",
  forums: [
    "cse",
    "gaming",
    "react",
    "batch2018",
    "friends",
    "photography",
    "dsa",
    "music",
  ],
  department: "CSE",
}; */

const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];
function myFunction(data) {
  if (data?.length > 0) {
    return data.map((item) => (
      <>
        <Badge
          pill
          variant={variants[Math.floor(Math.random() * variants.length)]}
        >
          {item}
        </Badge>{" "}
      </>
    ));
  } else return null;
}

const Profile = () => {
  const { username } = useParams();
  const [profileState, updateProfile] = useState({
    username: "",
    name: "",
    email: "",
    collegeName: "",
    collegeGroups: [],
    department: "",
    Type: "",
    batch: "",
    course: "",
    rollNumber: "",
    enrolledDate: "",
    isLoading: true,
  });

  useEffect(() => {
    const { token } = isAutheticated();
    api
      .getUser(username, token)
      .then((response) => {
        console.log("USER DATA", response.data);
        updateProfile({
          username: response.data.username,
          name: response.data.name,
          email: response.data.email,
          courseDuration: response.data.courseDuration,
          Type: response.data.Type,
          batch: response.data.batch,
          course: response.data.course,
          rollNumber: response.data.rollNumber,
          enrolledDate: response.data.enrolledDate,
          collegeGroup: [
            "cse",
            "gaming",
            "react",
            "batch2018",
            "friends",
            "photography",
            "dsa",
            "music",
          ],
          department: response.data.department,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Jumbotron>
        {profileState.isLoading ? (
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Spinner animation="border" variant="warning" style={{}} />
          </Row>
        ) : (
          <Container>
            <h1>
              {profileState.name}{" "}
              <Badge variant="info">{profileState.Type}</Badge>
            </h1>
            <Row>
              <Col>Username: {profileState.username}</Col>
              <Col>Email: {profileState.email}</Col>
            </Row>
            <Row>
              {profileState.rollNumber ? (
                <Col>Roll Number: {profileState.rollNumber}</Col>
              ) : null}
              {profileState.enrolledDate ? (
                <Col>Enrolled Date: {profileState.enrolledDate}</Col>
              ) : null}
            </Row>
            <Row>
              {profileState.department ? (
                <Col>Department: {profileState.department}</Col>
              ) : null}
              {profileState.batch ? (
                <Col>Batch: {profileState.batch}</Col>
              ) : null}
            </Row>
            <Row>
              {profileState.course ? (
                <Col>Course: {profileState.course}</Col>
              ) : null}
              {profileState.courseDuration ? (
                <Col>Course Duration: {profileState.courseDuration}</Col>
              ) : null}
            </Row>
            {/*      <br />
            <Row>{myFunction(profileState.collegeGroup)}</Row> */}
          </Container>
        )}
      </Jumbotron>
    </div>
  );
};

export default Profile;
