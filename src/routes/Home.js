import React, { useState } from "react";
import CardComp from "../components/CardComp";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { checkClass } from "../components/App";
import { updateClass } from "../store";
import WhatIs from "../components/WhatIs";
import CurrentClass from "../components/CurrentClass";

// checkClass({dispatchClass})
function Home({ loginState, history, dispatchClass }) {
  const [updated, setUpdated] = useState(true);

  if (updated) {
    checkClass({ dispatchClass });
    setUpdated(false);
  }

  return (
    <Container className="pt-3">
      {loginState.user.nickname === "" ? <WhatIs /> : <CurrentClass />}
      <CardComp />
    </Container>
  );
}

function mapStateToProps(state, ownProps) {
  return { loginState: state, props: ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClass: (classes) => dispatch(updateClass(classes)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
