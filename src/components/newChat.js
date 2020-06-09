import React, { useEffect, useState } from "react";
import socketio from "socket.io-client";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { URL } from "./App";
let socket;

function NewChat({ classInfo, userInfo }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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

  useEffect(() => {
    socket = socketio.connect(URL);
    if (classInfo.chattingRoom !== undefined) {
      socket
        .emit("join", {
          room: classInfo.chattingRoom,
          userID: userInfo._id,
        })
        .on("chat", (data) => {
          setChat((chat) => {
            return chat.concat(data);
          });
        })
        .on("system", (data) => {
          setChat((chat) => {
            return chat.concat(data);
          });
        });
    }
  }, [classInfo, userInfo]);

  return (
    <>
      {classInfo.chattingRoom === undefined ? (
        <p>아직 채팅방이 만들어지지 않았어요!</p>
      ) : (
        <div
          style={{
            overflow: "auto",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {chat.map(({ username, time, message, system }, index) => {
            return (
              <Card
                body
                key={index}
                style={{
                  float: username === userInfo.nickname ? "right" : "left",
                }}
              >
                {message}
              </Card>
            );
          })}
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
            <InputGroup.Prepend>
              <Button onClick={SendMessage}>Send</Button>
            </InputGroup.Prepend>
          </InputGroup>
        </div>
      )}
    </>
  );
}

export default NewChat;
