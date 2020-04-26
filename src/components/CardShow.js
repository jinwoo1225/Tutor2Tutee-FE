import React, { useState } from "react";
import Axios from "axios";
import { URL } from "./App";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardShow({ _class }) {
  const [tutorName, setTutorName] = useState("");
  Axios.get(URL + "user/" + _class.tutor).then((response) => {
    setTutorName(response.data.nickname);
  });
  return (
    <Col md="4" className="my-3" key={_class._id}>
      <Card>
        <Card.Body>
          <Card.Title>{_class.className}</Card.Title>
          {tutorName === "" ? (
            <Card.Text>로딩중입니다.</Card.Text>
          ) : (
            <>
              <Card.Text>{tutorName}</Card.Text>
              <Link to={`class/id/${_class._id}`}>
                <Button>수강하기!!</Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default (CardShow);
