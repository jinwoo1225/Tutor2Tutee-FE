import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardShow({ _class, col }) {
  return (
    <Col md={col} className="my-3" key={_class._id}>
      <Card>
        <Card.Body>
          <Card.Title>{_class.className}</Card.Title>
          <Card.Text>{_class.tutorNickName}</Card.Text>
          <Link to={`class/id/${_class._id}`}>
            <Button>수강하기!!</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardShow;
