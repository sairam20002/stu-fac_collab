import React, { useEffect, useState } from "react";
import AdminAssignGroupControl from "./adminAssignGroup";
import { Alert, Col, Row, Nav } from "react-bootstrap";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";

const SelectedUsers = ({ userData, isAssigned, skippedUsers }) => {
  let toDisplay = isAssigned ? skippedUsers : userData;
  return (
    <>
      {" "}
      {skippedUsers?.length > 0 ? <div>SKIPPED USERS</div> : null}
      {toDisplay.map((user) => (
        <div>
          {user.name}
          {"-"}
          {user._id}
        </div>
      ))}
    </>
  );
};

export default SelectedUsers;
