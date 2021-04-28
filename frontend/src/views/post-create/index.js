import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authenticate, isAutheticated } from "../../_helpers";
import { Link, useHistory } from "react-router-dom";
import api from "../../API/api";

import Post from "./Post";

const PostControl = () => {
  const { id } = useParams();
  const history = useHistory();
  const [values, updateValue] = useState({
    postName: "",
    postDescription: "",
    parentForumId: id,
    isPosted: false,
    isSubmitted: false,
  });

  useEffect(() => {
    console.log("ID", values.parentForumId);
    if (values.isSubmitted) {
      const { token } = isAutheticated();

      api
        .createPost(
          values.postName,
          values.postDescription,
          values.parentForumId,
          token
        )
        .then((response) => {
          console.log("Post Res ", response);
          updateValue({
            ...values,
            isSubmitted: false,
            message: response.message,
            isPosted: response.message === "Post Added" ? true : false,
          });
        })
        .catch((error) => {
          console.log(error);
          updateValue({
            ...values,
            error: true,
            isSubmitted: false,
          });
        });
    }
  }, [values.isSubmitted]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Post values={values} handleSubmit={updateValue} />
      {values.isPosted && history.goBack()}
    </div>
  );
};

export default PostControl;
