import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardForTutor({ _class }) {
  return (
    <Card body className="mt-3 mx-auto col-md-5">
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
      <Link to={`class/id/${_class._id}`}>
        <Button style={{ float: "center" }} block>
          자세히
        </Button>
      </Link>
    </Card>
  );
}

export default CardForTutor;
