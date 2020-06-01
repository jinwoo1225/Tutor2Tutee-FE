import React, { Component } from "react";
import socketio from "socket.io-client";
import { InputGroup, FormControl, Button, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import "../css/chat.css";

let socket;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    socket = socketio.connect("https://localhost:3000/");
    console.log(this.props);
    this.state = {
      user: this.props.user,
      username: this.props.user.nickname,
      chat: new Array(),
      msg: "",
    };
    this.send = this.send.bind(this);
    this.keysend = this.keysend.bind(this);
    this.inputMSG = this.inputMSG.bind(this);
  }

  componentDidMount() {
    socket.emit("join", {
      username: this.state.username,
    });
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
    socket.emit("quit", { username: this.state.username });
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
      username: this.state.username,
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
      let alignType = item.username == this.state.username ? "right" : "left";

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

    return (
      <div>
        <h1>userName : {this.state.username}</h1>
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
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(Chat);

// var socket = io()

// /* 접속 되었을 때 실행 */
// socket.on('connect', function() {
//   /* 이름을 입력받고 */
//   var name = prompt('반갑습니다! 채팅방에서 사용할 닉네임을 작성하세요!', '')

//   /* 이름이 빈칸인 경우 */
//   if(!name) {
//     name = '익명'
//   }

//   /* 서버에 새로운 유저가 왔다고 알림 */
//   socket.emit('newUser', name)
// })

// /* 서버로부터 데이터 받은 경우 */
// socket.on('update', function(data) {
//   var chat = document.getElementById('chat')

//   var message = document.createElement('div')
//   var node = document.createTextNode(`${data.name}: ${data.message}`)
//   var className = ''

//   // 타입에 따라 적용할 클래스를 다르게 지정
//   switch(data.type) {
//     case 'message':
//       className = 'other'
//       break

//     case 'connect':
//       className = 'connect'
//       break

//     case 'disconnect':
//       className = 'disconnect'
//       break
//   }

//   message.classList.add(className)
//   message.appendChild(node)
//   chat.appendChild(message)
// })

// /* 메시지 전송 함수 */
// function send() {
//   // 입력되어있는 데이터 가져오기
//   var message = document.getElementById('test').value

//   // 가져왔으니 데이터 빈칸으로 변경
//   document.getElementById('test').value = ''

//   // 내가 전송할 메시지 클라이언트에게 표시
//   var chat = document.getElementById('chat')
//   var msg = document.createElement('div')
//   var node = document.createTextNode(message)
//   msg.classList.add('me')
//   msg.appendChild(node)
//   chat.appendChild(msg)

//   // 서버로 message 이벤트 전달 + 데이터와 함께
//   socket.emit('message', {type: 'message', message: message})
// }
