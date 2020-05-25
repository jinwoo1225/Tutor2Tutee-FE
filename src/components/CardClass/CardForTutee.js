import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardForTutee({ _class }) {
  return (
    <Card body className="mt-3 mx-auto col-md-5">
      <Card.Title className="text-center">{_class.className}</Card.Title>
      <Card.Subtitle className="text-center">
        {_class.tutorNickName}
      </Card.Subtitle>
      <Link to={`class/id/${_class._id}`}>
        <Button style={{ float: "center" }} block>
          자세히
        </Button>
      </Link>
    </Card>
  );
}

export default CardForTutee;
