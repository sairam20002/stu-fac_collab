import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Row,
  Col,
  Container,
  Spinner,
  Button,
  Badge,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { authenticate, isAutheticated } from "../../_helpers";
import api from "../../API/api";
import SeePosts from "../see-post";

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

const Forum = () => {
  const { forumName } = useParams();
  const [forumDetail, updateForum] = useState({
    forumName: "",
    forumDescription: "",
    forumType: "",
    id: "",
    isLoading: true,
    posts: [],
  });
  console.log("Forum Name", forumName);
  const { token } = isAutheticated();
  useEffect(() => {
    /////
    var tempForumData, tempPosts;
    const fetchData = async () => {
      await api
        .getForum(forumName, token)
        .then((response) => {
          tempForumData = response.data.foundForum;
        })
        .catch((error) => {
          console.log(error);
          updateForum({
            ...forumDetail,
            error: true,
            message: error,
            isLoading: false,
          });
        });
      console.log("1", tempForumData._id);
      let forumId = tempForumData._id;
      console.log("hjjhjh", forumId);
      await api
        .getPostsByForum(forumId, token)
        .then((response) => {
          tempPosts = response.data.foundPosts;
        })
        .catch((error) => {
          console.log(error);
          updateForum({
            ...forumDetail,
            error: true,
            message: error,
            isLoading: false,
          });
        });

      console.log("2", tempPosts);
      updateForum({
        ...forumDetail,
        forumName: tempForumData.forumName,
        forumDescription: tempForumData.forumDescription,
        forumType: tempForumData.Type,
        id: tempForumData._id,
        posts: tempPosts,
        isLoading: false,
      });
      console.log("Final", tempForumData, tempPosts, forumDetail);
    };
    fetchData();
  }, []);
  return (
    <div>
      {forumDetail.isLoading ? (
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
        <div>
          <Jumbotron>
            <Container>
              <h1>
                {forumDetail.forumName}{" "}
                <Badge variant="info">{forumDetail.forumType}</Badge>
              </h1>
              <Row>
                <Col>Description: {forumDetail.forumDescription}</Col>
              </Row>
              <Button
                href={`/forum/${forumDetail.id}/post/create`}
                variant="success"
                style={{ marginTop: 30 }}
              >
                Add Post
              </Button>
            </Container>
          </Jumbotron>
          <Container>
            <SeePosts posts={forumDetail.posts} />
          </Container>
        </div>
      )}
    </div>
  );
};

export default Forum;
