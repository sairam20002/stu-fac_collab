import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import "../../css/MyDashboard.css";
import api from "../../API/api";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { authenticate, isAutheticated } from "../../_helpers";

function buttonFormatter(cell, row) {
  let profile = `/profile/${cell}`;
  return (
    <Button href={profile} variant="outline-info">
      Click
    </Button>
  );
}

const columns = [
  {
    dataField: "name",
    text: "Name",
    filter: textFilter(),
  },
  {
    dataField: "username",
    text: "User Name",
    filter: textFilter(),
  },
  {
    dataField: "course",
    text: "Course",
  },
  {
    dataField: "batch",
    text: "Batch",
  },
  {
    dataField: "department",
    text: "Department",
  },
  {
    dataField: "enrolledDate",
    text: "Date of Enrollment",
  },
  {
    dataField: "gender",
    text: "Gender",
  },
  {
    dataField: "username",
    text: "More",
    formatter: buttonFormatter,
  },
];

const AdminSeeUsers = () => {
  const [currentState, updateList] = useState({
    isLoading: true,
    listItems: [],
  });
  const { token } = isAutheticated();
  useEffect(() => {
    api
      .getUsers("Student", token)
      .then((response) => {
        console.log({ ...response });
        let tempList = [...response.data.users];
        updateList({
          isLoading: false,
          listItems: tempList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Row>
        <Col
          xs={1}
          style={{
            height: window.innerHeight,
            paddingTop: 5,
          }}
          className="bg-light"
        >
          <Nav justify fill variant="tabs" activeKey="1" className="d-md-block">
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
        <Col>
          {currentState.isLoading ? (
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
            <div style={{ padding: 20 }}>
              <BootstrapTable
                keyField="username"
                data={currentState.listItems}
                columns={columns}
                pagination={paginationFactory()}
                filter={filterFactory()}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminSeeUsers;
