import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import "../../css/MyDashboard.css";
import api from "../../API/api";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { authenticate, isAutheticated } from "../../_helpers";

const columns = [
  {
    dataField: "groupName",
    text: "Group Name",
    filter: textFilter(),
  },
  {
    dataField: "groupDescription",
    text: "Description",
  },
  {
    dataField: "createdAt",
    text: "Create Time",
  },
  {
    dataField: "updatedAt",
    text: "Updated At",
  },
];

const AdminSeeGroups = () => {
  const [currentState, updateList] = useState({
    isLoading: true,
    listItems: [],
  });
  const { token } = isAutheticated();
  useEffect(() => {
    api
      .getGroups(token)
      .then((response) => {
        console.log(response);
        updateList({
          isLoading: false,
          listItems: response.groups,
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
          <Nav justify fill variant="tabs" activeKey="4" className="d-md-block">
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
          style={{
            padding: 20,
          }}
        >
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
            <BootstrapTable
              keyField="instituteName"
              data={currentState.listItems}
              columns={columns}
              pagination={paginationFactory()}
              filter={filterFactory()}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminSeeGroups;
