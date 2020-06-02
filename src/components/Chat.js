import React, { Component } from "react";
import socketio from "socket.io-client";
import { InputGroup, FormControl, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { URL } from "./App";
import { connect } from "react-redux";
import { render } from "@testing-library/react";
import "../css/chat.css";

const socket = socketio.connect(URL);


class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    //this.classInfo = this.props.classInfo;
    this.state = {
      classInfo: this.props.classInfo,
      joined: false,
      user: this.props.user,
      userID: this.props.user._id,
      chat: new Array(),
      msg: "",
    };
    this.send = this.send.bind(this);
    this.keysend = this.keysend.bind(this);
    this.inputMSG = this.inputMSG.bind(this);
    this.join = this.join.bind(this);
    this.joinTest = this.joinTest.bind(this);
  }
  
  joinTest(){
    socket.emit("join", {
        room: "TEST",
        userID: this.state.userID,
      });
    this.state.joined = true;
  }

  join() {
    socket.emit("join", {
        room: this.state.classInfo.chattingRoom,
        userID: this.state.userID,
      });
    this.state.joined = true
  }

  componentDidMount() {
    console.log(this.state.classInfo._id);

    socket.on("chat", (data) => {
      this.setState({ chat: this.state.chat.concat([data]) });
      document
        .querySelector(".chattingView")
        .scrollTo(0, document.querySelector(".chattingView").scrollHeight);
    });
    socket.on("system", (data) => {
      this.setState({ chat: this.state.chat.concat([data]) });
    });
  }
  componentWillReceiveProps() {
    console.log("퇴장");
    socket.emit("quit", { userID: this.state.userID });
    // this.setState({channel:changeProps.channel},()=>{
    //     this.setState({chatList:[]});
    //     socket.emit('channelJoin', this.state.channel);
    // });
  }
  keysend(event) {
    if (event.keyCode == 13) {
      this.send();
    }
  }
  send() {
    socket.emit("chat", {
      userID: this.state.userID,
      message: this.state.msg,
    });
    this.setState({ msg: "" });
    document.querySelector(".inputMsg").value = "";
  }
  inputMSG(event) {
    this.setState({
      msg: event.target.value,
    });
  }
  render() {
    let list = this.state.chat.map((item, index) => {
      let alignType = item.username == this.state.user.nickname ? "right" : "left";

      let result = item.system ? (
        <div className="system">{item.message}</div>
      ) : (
        <div className="msg">
          <div className={alignType}>
            <div>{item.username}</div>
            <div className={"chat-time"}>{item.time}</div>
            <div key={index} className={"content " + alignType}>
              {item.message}
            </div>
          </div>
        </div>
      );
      return result;
    });

    let chatRoom = (
        <div>
          <h1>userName : {this.state.user.nickname}</h1>
          <div className="chattingView">{list}</div>
          <div className="input-group -input">
            <Form.Control
              className="inputMsg"
              placeholder="내용을 입력해 주세요."
              onKeyUp={this.keysend}
              onChange={this.inputMSG}
            />
            <Button block className="my-md-3 send" onClick={this.send}>
              전송
            </Button>
          </div>
        </div>
    );

    return this.state.joined ? (
        <div>
            {chatRoom}
        </div>
    ) : (
        <div>
            <Button block className="my-md-3 send" onClick={this.join}>
                입장하기
            </Button>
            <Button block className="my-md-3 send" onClick={this.joinTest}>
                테스트 채널 입장하기
            </Button>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(Chat);