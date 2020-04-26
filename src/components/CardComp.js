import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import CardShow from "./CardShow";

function CardComp({ classes }) {
  return (
    <Row className="text-center">
      {classes.length === 0 ? (
        // eslint-disable-next-line jsx-a11y/accessible-emoji
        <h1 className="col-12 mt-3">로딩중입니다! 잠시만 기다려주세요!😁</h1>
      ) : (
        classes.map((_class) => {
          return <CardShow key={_class._id} _class={_class} />;
        })
      )}
    </Row>
  );
}

function mapStateToProps(state) {
  return { classes: state.class };
}

export default connect(mapStateToProps)(CardComp);
