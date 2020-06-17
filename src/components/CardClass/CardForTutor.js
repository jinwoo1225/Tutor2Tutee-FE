import React from "react";
import { Card, Button, Col } from "react-bootstrap";

function CardForTutor({ _class }) {
  return (
    <Col md={3} className="mt-3">
      <Card body>
        <Card.Title className="text-center">{_class.className}</Card.Title>
        <Card.Subtitle className="text-center">
          {_class.tutorNickName}
        </Card.Subtitle>
        {_class.LectureTimes === undefined ? null : (
          <Card.Text>
            수업요일 : {_class.LectureTimes.map((time) => time.day)}
          </Card.Text>
        )}
        <Card.Text>{_class.tutees.length}명이 수강중이예요!</Card.Text>

        <Button
          href={`/#/class/id/${_class._id}`}
          style={{ float: "center" }}
          block
        >
          입장
        </Button>
      </Card>
    </Col>
  );
}

export default CardForTutor;
