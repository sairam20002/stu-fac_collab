import React, { useEffect, useState } from "react";

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
