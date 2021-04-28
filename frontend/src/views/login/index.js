import React, { useEffect, useState } from "react";
import { LoginForm } from "../../components";
import { Alert, Button } from "react-bootstrap";
import { THEME } from "../../constants";
import { BehaviorSubject } from "rxjs";
import api from "../../API/api";
import { authenticate, isAutheticated } from "../../_helpers";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSuccess, authError } from "../../redux/auth/authActions";

const Login = (props) => {
  const [values, updateValue] = useState({
    username: "",
    password: "",
    isSubmitted: false,
    loggingIn: false,
    error: false,
    isLoggedIn: false,
    message: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.isSubmitted) {
      updateValue({ ...values, loggingIn: true });
      api
        .login(values.username, values.password)
        .then((response) => {
          console.log("LOGIN RESPONSE ", response);
          response.token
            ? authenticate(response, () => {
                updateValue({
                  ...values,
                  loggingIn: false,
                  isSubmitted: false,
                  isLoggedIn: true,
                });
                dispatch(authSuccess(response["user"]));
              })
            : updateValue({
                ...values,
                loggingIn: false,
                isSubmitted: false,
                isLoggedIn: false,
                message: response.message,
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
  /* postLoginDataHandler = () => {
    axios.post('');
  } */
  const { user } = isAutheticated();
  return (
    <div
      style={{
        display: "flex",
        height: window.innerHeight * 0.95,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.turquoiseBlue,
      }}
    >
      {" "}
      <div
        style={{
          backgroundColor: "white",
          height: window.innerHeight * 0.5,
          width: window.innerWidth * 0.5,
          padding: 50,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {isAutheticated() ? (
          <>
            <Alert variant={"success"}>
              {`${user?.Type} ${user?.name} logged into Campus B34st!`}
              {"\n"}
              <Alert.Link
                href={
                  user?.Type == "Super Admin"
                    ? "/super-admin"
                    : user?.Type == "Admin"
                    ? "/admin"
                    : "/"
                }
              >
                Goto
                {user?.Type == "Super Admin"
                  ? " Super Admin Panel"
                  : user?.Type == "Admin"
                  ? " Admin Panel"
                  : " Home"}
              </Alert.Link>
              .
            </Alert>
          </>
        ) : (
          <LoginForm values={values} handleSubmit={updateValue} />
        )}
      </div>
    </div>
  );
};

export default Login;
