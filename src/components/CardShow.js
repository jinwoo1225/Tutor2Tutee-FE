import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { classTypesRaw, classTypes } from "./App";

function CardShow({ _class, col }) {
  //보여줄 카드의 정보 컴포넌트
  return (
    <Col md={col} className="my-3" key={_class._id}>
      <Card body>
        <Card.Title>{_class.className}</Card.Title>
        <Card.Subtitle>
          강의유형 : {classTypes[classTypesRaw.indexOf(_class.classType)]}
        </Card.Subtitle>
        <Card.Text>튜터 : {_class.tutorNickName}</Card.Text>
        <Link to={`class/id/${_class._id}`}>
          <Button block>자세히 보기</Button>
        </Link>
      </Card>
    </Col>
  );
}

export default CardShow;
