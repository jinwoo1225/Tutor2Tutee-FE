import React, { useEffect, useState } from "react";
import socketio from "socket.io-client";
import { Button, Form, InputGroup } from "react-bootstrap";
import { URL } from "./App";
import "../css/chat.css";
import Axios from "axios";
let socket;

function NewChat({ classInfo, userInfo }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [status, setStatus] = useState(false);

  const SendMessage = () => {
    if (message.length === 0) {
      alert("메시지를 입력하세요.");
      return;
    }
    socket.emit("chat", {
      userID: userInfo._id,
      message: message,
    });
    setMessage("");
    document.querySelector(".MessageSendForm").value = "";
  };

  const startChat = () => {
    if (!classInfo.participations[0].tutees.includes(userInfo._id)) {
      Axios.post(URL + "class/" + classInfo._id + "/attendance").then(
        ({ data }) => {
          console.log(data);
        }
      );
    }

    socket.emit("join", {
      room: classInfo.chattingRoom,
      userID: userInfo._id,
    });
    setStatus(true);
  };

  useEffect(() => {
    socket = socketio.connect(URL);
    if (classInfo.chattingRoom !== undefined) {
      socket
        .on("chat", (data) => {
          setChat((chat) => {
            return chat.concat(data);
          });
          document
            .querySelector(".chattingView")
            .scrollTo(0, document.querySelector(".chattingView").scrollHeight);
        })
        .on("system", (data) => {
          setChat((chat) => {
            return chat.concat(data);
          });
        });
    }
    return () => {
      socket.emit("quit", { userID: userInfo._id });
    };
  }, [classInfo, userInfo]);

  return status ? (
    <div>
      <div className="chattingView">
        {chat.map((item, index) => {
          let alignType =
            item.username === userInfo.nickname ? "right" : "left";

          return item.system ? (
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
        })}
      </div>
      <div className="input-group -input">
        <InputGroup>
          <Form.Control
            className="MessageSendForm"
            placeholder="메시지를 입력하세요"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                SendMessage(e.target.value);
              }
            }}
          />
          <InputGroup.Append>
            <Button onClick={SendMessage}>전송</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  ) : (
    <Button
      block
      style={{ maxWidth: "400px", margin: "auto" }}
      onClick={startChat}
    >
      채팅방 입장
    </Button>
  );
}

export default NewChat;
// <>
//   {classInfo.chattingRoom === undefined ? (
//     <p>아직 채팅방이 만들어지지 않았어요!</p>
//   ) : (
//     <div
//       style={{
//         overflow: "auto",
//         height: "50vh",
//         display: "flex",
//         flexDirection: "column",
//         flexWrap: "nowrap",
//       }}
//     >
//       {chat.map(({ username, time, message, system }, index) => {
//         return (
//           <div
//             key={index}
//             style={{
//               height: "auto",
//               width: "100%",
//             }}
//           >
//             <div style={{ float: username === userInfo.nickname ? 'right' : 'left',
//           margin:'10px' }}>
//               <div>{username}</div>
//               <div>
//                 <div style={{ display: "inline" }}>{time}</div>
//                 <div
//                   style={{
//                     display: "inline",
//                     borderRadius: "10px",
//                     padding: "5px",
//                     border: "1px solid Red",
//                   }}
//                 >
//                   {message}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       <InputGroup>
//         <Form.Control
//           className="MessageSendForm"
//           placeholder="메시지를 입력하세요"
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//           onKeyUp={(e) => {
//             if (e.keyCode === 13) {
//               SendMessage(e.target.value);
//             }
//           }}
//         />
//         <InputGroup.Prepend>
//           <Button onClick={SendMessage}>Send</Button>
//         </InputGroup.Prepend>
//       </InputGroup>
//     </div>
//   )}
// </>
