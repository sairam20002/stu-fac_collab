import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import api from "../../API/api";
import { isAutheticated } from "../../_helpers";
import { useSelector, useDispatch } from "react-redux";
import { MESSENGER_URL } from "../../endpoints";
import { MESSENGER } from "../../constants";
import { PersonBoundingBox } from "react-bootstrap-icons";

function NavBar() {
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>Campus B34st</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav justify className="mr-auto">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            {isAutheticated() ? (
              auth.user?.Type === "Super Admin" ? null : (
                <>
                  {" "}
                  <Nav.Item>
                    <Nav.Link href="/forum/see">Forums</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href={`${MESSENGER_URL}${MESSENGER}?userId=${auth.user?._id}`}
                    >
                      Messenger
                    </Nav.Link>
                  </Nav.Item>
                </>
              )
            ) : null}
          </Nav>
          <Nav>
            {isAutheticated() ? (
              <>
                {" "}
                <Nav.Item>
                  <Nav.Link href={`/profile/${auth.user?.username}`}>
                    <PersonBoundingBox color="white" size={26} />{" "}
                    {`  ${auth.user?.name}`}
                  </Nav.Link>
                </Nav.Item>
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    api.logout();
                    history.push("/home");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link href="/login">
                  <Button variant="warning">Login</Button>
                </Nav.Link>
                <Nav.Link href="/register">
                  <Button variant="warning">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
