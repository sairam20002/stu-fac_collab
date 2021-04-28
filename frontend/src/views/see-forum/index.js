import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Button,
  Spinner,
} from "react-bootstrap";
import api from "../../API/api";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { authenticate, isAutheticated } from "../../_helpers";

function buttonFormatter(cell, row) {
  let forum = `/forum/see/${cell}`;
  return (
    <Button href={forum} variant="outline-info">
      Click
    </Button>
  );
}

const columns = [
  {
    dataField: "forumName",
    text: "Forum Name",
    filter: textFilter(),
  },
  {
    dataField: "forumDescription",
    text: "Description",
  },
  {
    dataField: "Type",
    text: "Type",
  },
  {
    dataField: "_id",
    text: "Id",
  },
  {
    dataField: "forumName",
    text: "More",
    formatter: buttonFormatter,
  },
];

const columnsPrivate = [
  {
    dataField: "forumName",
    text: "Forum Name",
    filter: textFilter(),
  },
  {
    dataField: "forumDescription",
    text: "Description",
  },
  {
    dataField: "Type",
    text: "Type",
  },
  {
    dataField: "_id",
    text: "Id",
  },
];

const radios = [
  { name: "Created", value: "created" },
  { name: "Private", value: "private" },
  { name: "Public", value: "public" },
];

const SeeForum = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("created");
  const [values, updateForums] = useState({
    forums: {},
    isFetched: false,
  });

  useEffect(() => {
    const { token } = isAutheticated();
    api
      .getForumsOfLoggedInUser(token)
      .then((response) => {
        console.log(response);
        updateForums({ forums: response, isFetched: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Row>
        <Col>
          <Row
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "#eed202",
              height: 80,
              padding: 20,
            }}
          >
            <h3>CAMPUS B34ST FORUMS </h3>
            <Row>
              <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
                <Button href={`/forum/create`} variant="success">
                  Create Forum
                </Button>
              </ButtonGroup>
            </Row>
          </Row>
          {values.isFetched ? (
            <div style={{ padding: 30 }}>
              <BootstrapTable
                keyField="name"
                data={values.forums[radioValue]}
                columns={radioValue === "private" ? columnsPrivate : columns}
                pagination={paginationFactory()}
                filter={filterFactory()}
              />
            </div>
          ) : (
            <Row
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Spinner animation="border" variant="warning" style={{}} />
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SeeForum;
