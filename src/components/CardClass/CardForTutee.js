import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { classTypes, classTypesRaw } from "../App";

function CardForTutee({ _class }) {
  return (
    <Col md={3} className="mt-3">
      <Card body>
        <Card.Title className="text-center">{_class.className}</Card.Title>
        <Card.Subtitle className="text-center">
          강의 유형 : {classTypes[classTypesRaw.indexOf(_class.classType)]}
        </Card.Subtitle>
        <Card.Text className="mt-3">
          <Button
            href={`/#/class/id/${_class._id}`}
            style={{ float: "center" }}
            block
          >
            입장
          </Button>
        </Card.Text>
      </Card>
    </Col>
  );
}

export default CardForTutee;
