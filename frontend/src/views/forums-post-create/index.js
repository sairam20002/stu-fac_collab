import React, { useState } from "react";
import { Jumbotron, Row, Col, Badge, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ForumCreatePost = () => {
  const { id } = useParams();
  return (
    <div>
      <Row>
        {"Yoyo"}
        {id}
      </Row>
    </div>
  );
};

export default ForumCreatePost;
