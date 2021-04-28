import { Jumbotron, Nav, Image, Row, Col, Container } from "react-bootstrap";
import image2 from "../../assets/images/Campus-B34st.png";
import "../../css/MyDashboard.css";
import Form from "../registerForm";

const AdminAddUsers = () => {
  return (
    <>
      <Row>
        <Col
          xs={1}
          style={{
            height: window.innerHeight,
          }}
          className="bg-light"
        >
          <Nav justify fill variant="tabs" activeKey="2" className="d-md-block">
            <Nav.Item>
              <Nav.Link eventKey="1" href="/admin/see">
                See Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2" href="/admin/add">
                Add Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3" href="/admin/group/add">
                Add New Group
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="4" href="/admin/group/see">
                See All Groups
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="5" href="/admin/group/assign">
                Assign a group
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          {" "}
          <div>
            <div>
              <h1>Create a new user</h1>
            </div>
            <Form />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminAddUsers;
