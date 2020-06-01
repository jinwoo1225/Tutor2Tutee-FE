import React from "react";
import { connect } from "react-redux";
import { Row, Button } from "react-bootstrap";
import CardShow from "./CardShow";

function CardComp({ classes, user }) {
  return (
    <>
      <h3>
        현재 모집중인 강의 :{" "}
        {classes.filter((_class) => _class.state !== "InProgress").length}개
      </h3>
      <Row className="text-center">
        {classes.length === 0 ? (
          //클래스가 하나도 없는 경우 or 아직 로딩이 안된경우
          user.nickname === "" ? (
            //유저가 로그인하지 않은 경우.
            <h1 className="col-12 mt-3">개설된 수업이 없습니다.</h1>
          ) : (
            //유저가 로그인을 한경우
            <>
              <h1 className="col-12 mt-3">
                아무런 수업이 없어요! 개설하실레요?
              </h1>
              <Button>개설하러 가기!!</Button>
            </>
          )
        ) : (
          //클래스가 있을 경우
          classes
            .filter((_class) => _class.state !== "InProgress")
            //InProgress인 강의는 제외한다.
            .map((_class) => {
              return <CardShow col={4} key={_class._id} _class={_class} />;
            })
        )}
      </Row>
    </>
  );
}

function mapStateToProps(state) {
  return { classes: state.class, user: state.user };
}

export default connect(mapStateToProps)(CardComp);
