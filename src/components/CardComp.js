import React from "react";
import { connect } from "react-redux";
import { Row, Button } from "react-bootstrap";
import CardShow from "./CardShow";

function CardComp({ classes, user }) {
  return (
    <Row className="text-center">
      {classes.length === 0 ? (
        // eslint-disable-next-line jsx-a11y/accessible-emoji
        <>
          {user.nickname === "" ? (
            <h1 className="col-12 mt-3">개설된 수업이 없습니다.</h1>
          ) : (
            <>
              <h1 className="col-12 mt-3">
                아무런 수업이 없어요! 개설하실레요?
              </h1>
              <Button>개설하러 가기!!</Button>
            </>
          )}
        </>
      ) : (
        classes.map((_class) => {
          return <CardShow key={_class._id} _class={_class} />;
        })
      )}
    </Row>
  );
}

function mapStateToProps(state) {
  return { classes: state.class, user: state.user };
}

export default connect(mapStateToProps)(CardComp);
