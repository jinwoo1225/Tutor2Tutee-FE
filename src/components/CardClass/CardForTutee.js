import React from "react";
import { Card, Button } from "react-bootstrap";

function CardForTutee({ _class }) {
  return (
    <Card body className="mx-auto col-md-5">
      <Card.Title className="text-center">{_class.className}</Card.Title>
      <Card.Subtitle className="text-center">
        {_class.tutorNickName}
      </Card.Subtitle>

      <Button
        href={`/#/class/id/${_class._id}`}
        style={{ float: "center" }}
        block
      >
        자세히
      </Button>
    </Card>
  );
}

export default CardForTutee;
