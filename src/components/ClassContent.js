import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { URL, dateToString } from "./App";

//클래스 관련 컴포넌트 모음집

function Overview({ studyAbout, courses }) {
  //클래스의 개요 컴포넌트
  return (
    <>
      <h3 className="text-center mt-3">{studyAbout}</h3>
      <ol>
        {courses.map((course) => {
          //코스 정보를 표시
          return <li key={course._id}>{course.description}</li>;
        })}
      </ol>
    </>
  );
}

function Attendance({ amITutor, classID, classType }) {
  //출석 정보 표시
  const [attendances, setAttenDances] = useState(undefined);
  const [attenCode, setAttenCode] = useState("");
  const [authenticationCode, setAuthCode] = useState(undefined);

  function postAttendance() {
    Axios.post(URL + "class/" + classID + "/attendance", {
      auth: attenCode,
    }).then(({ data }) => {
      alert(data);
      setAttenDances(undefined);
    });
  }

  function startAttendance() {
    Axios.get(URL + "class/" + classID + "/attendance").then(({ data }) => {
      setAuthCode(data);
      alert(
        data === "fail"
          ? "출석에 실패했습니다. 수업시간을 확인해주세요."
          : "출석이 시작되었습니다! 인증번호 : " + data
      );
    });
  }

  if (!amITutor && attendances === undefined) {
    Axios.get(URL + "class/" + classID + "/attendance/my").then(({ data }) =>
      setAttenDances(data)
    );
  }
  return (
    <Card body>
      {amITutor && (
        <Button block onClick={startAttendance}>
          출석시작
        </Button>
      )}
      {authenticationCode === undefined ? null : authenticationCode ===
        "fail" ? (
        <Card body bg="light" className="text-center mt-3">
          <Card.Title>출석에 실패했어요!</Card.Title>
          <Card.Text>현재 강의 시간이 맞는지 확인해주세요!</Card.Text>
        </Card>
      ) : (
        <Card body bg="light" className="text-center mt-3">
          <Card.Title>출석 번호 : {authenticationCode}</Card.Title>
          <Card.Text>출석번호는 튜티들에게 알려주세요!</Card.Text>
        </Card>
      )}
      {!amITutor && [0, 3].includes(classType) && (
        <InputGroup size="lg" style={{ margin: "auto", maxWidth: "600px" }}>
          <InputGroup.Append>
            <InputGroup.Text>출석번호</InputGroup.Text>
          </InputGroup.Append>
          <Form.Control onChange={(e) => setAttenCode(e.target.value)} />
          <InputGroup.Prepend>
            <Button onClick={postAttendance}>출석</Button>
          </InputGroup.Prepend>
        </InputGroup>
      )}
      {!amITutor && ( //TODO 튜터일 경우 모든 튜티들의 출결상황을 보는 상황판을 만들어야 할것
        <div style={{ margin: "auto", maxWidth: "600px" }}>
          <hr></hr>
          <h1 className="text-center">출석 정보입니다.</h1>
          <hr></hr>
          {attendances !== undefined && attendances !== "fail"
            ? attendances.map((attendance, index) => {
                return (
                  <Card body key={index} className="text-center mt-3">
                    <h4>
                      {index + 1} : {dateToString(new Date(attendance.date))}
                    </h4>
                    <h5>{attendance.isAttend ? "출석" : "결석"}</h5>
                  </Card>
                );
              })
            : null}
        </div>
      )}
    </Card>
  );
}

function SkypeLink({ skypeLink }) {
  //스카이프 링크 표시
  //온라인 실시간 강의 전용
  return (
    <>
      {skypeLink === undefined ? (
        <h4>Skype 링크가 아직 없어요! 잠시만 기다려주세요~~</h4>
      ) : (
        <a href={skypeLink}>
          <Button>Link to Skype Call</Button>
        </a>
      )}
    </>
  );
}

function LectureNote({ LectureNotes }) {
  //강의 노트
  return LectureNotes.length === 0 ? (
    <h4 className="text-center">아직 수업노트가 없습니다.</h4>
  ) : (
    // 수업노트가 존재할 경우
    <div className="text-center">
      {LectureNotes.map((lectureNote, index) => {
        return (
          <Card body>
            <Card.Title>
              {index + 1}
              {" : "}
              {lectureNote.title}
            </Card.Title>
            <Card.Text>{lectureNote.content}</Card.Text>
          </Card>
        );
      })}
    </div>
  );
}

function VideoLinks({ VideoLinks, participations, classID, userID }) {
  return (
    <ol>
      {VideoLinks.map((link, index) => {
        return (
          <VideoLink
            link={link}
            course={participations[index]}
            classID={classID}
            userID={userID}
            index={index}
          />
        );
      })}
    </ol>
  );
}

function VideoLink({ link, course, classID, userID, index }) {
  const [_course, setCourse] = useState(course);
  console.log(_course);
  function getAttendance() {
    Axios.post(URL + "class/" + classID + "/attendance", {
      auth: _course.courseID,
    }).then(() => {
      Axios.get(URL + "class/" + classID).then(({ data }) => {
        setCourse(data.participations[index]);
        console.log(data);
      });
    });
  }
  return (
    <li>
      <h4>{link.description}</h4>
      <a href={link.link} onClick={getAttendance}>
        <Button>
          {_course === undefined || _course.tutees.includes(userID)
            ? "봤어요"
            : "수강"}
        </Button>
      </a>
    </li>
  );
}

function AddCourse({ classID }) {
  const [course, setCourse] = useState("");

  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/course", {
      description: course,
    }).then(({ data }) => {
      console.log(data);
      data === "success"
        ? alert("커리큘럼 추가에 성공했어요!")
        : alert("커리큘럼 추가에 실패했어요.");
    });
  };
  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h2>강의 커리큘럼 등록</h2>
      </Card.Title>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>강의 커리큘럼 등록</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            placeholder="커리큘럼 내용"
            type="text"
            onChange={(e) => setCourse(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          저장
        </Button>
      </Card.Body>
    </Card>
  );
}

function VideoLinkInput({ classID }) {
  //동영상 강의 링크 업로드
  const [description, setDesc] = useState("");
  const [link, setLink] = useState("");
  const sendLink = () => {
    if (description === "" || link === "") {
      alert("모든란을 채워주세요.");
      return;
    }
    Axios.post(URL + "class/" + classID + "/course", {
      link,
      description,
    }).then(({ data }) => {
      data === "success"
        ? alert("링크 추가에 성공했어요!")
        : alert("링크 추가에 실패했어요.");
    });
  };
  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h2>온라인 강의 등록</h2>
      </Card.Title>
      <Card.Subtitle className="text-center">
        강의는 유튜브 링크로 대체해주세요
      </Card.Subtitle>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>온라인 강의 등록</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="col-3"
            placeholder="강의 제목"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Form.Control
            className="col-9"
            placeholder="강의 링크"
            type="text"
            onChange={(e) => setLink(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          저장
        </Button>
      </Card.Body>
    </Card>
  );
}
function SkypeLinkInput({ classID }) {
  const [link, setLink] = useState("");
  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/skype", {
      skypeLink: link,
    }).then(({ data }) => {
      data === "success"
        ? alert("링크 추가에 성공했어요!")
        : alert("링크 추가에 실패했어요.");
    });
  };
  return (
    <Card className="mt-3">
      <Card.Title className="mt-3 text-center">
        <h2>스카이프 링크 입력</h2>
      </Card.Title>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>스카이프 공유 링크</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setLink(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          입력
        </Button>
      </Card.Body>
    </Card>
  );
}

function MaxTuteeInput({ classID, classMaxTutee, history }) {
  const tuteeMaxArray = [...Array(10).keys()];
  const [maxTutee, setMaxTutee] = useState(classMaxTutee);
  const sendLink = () => {
    Axios.post(URL + "class/" + classID + "/max-tutee", { maxTutee }).then(
      ({ data }) => {
        alert("최대 튜티수를 " + maxTutee + "명으로 늘렸습니다.");
        history.push("/");
      }
    );
  };
  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h3>최대 튜티수 변경</h3>
      </Card.Title>
      <Card.Body>
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>현재 : {classMaxTutee}명</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            onChange={(e) => {
              setMaxTutee(e.target.value);
            }}
          >
            {tuteeMaxArray.map((tuteeMax, index) => {
              return (
                <option key={index} value={tuteeMax + 3}>
                  {tuteeMax + 3}
                </option>
              );
            })}
          </Form.Control>
        </InputGroup>
        <Button className="mt-3" block onClick={sendLink}>
          완료
        </Button>
      </Card.Body>
    </Card>
  );
}

function LectureNoteInput({ classID }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const sendLectureNote = () => {
    if (title === "" || content === "") {
      alert("강의노트 모든란을 채워주세요.");
      return;
    }
    Axios.post(URL + "class/" + classID + "/lecture-note", {
      title,
      content,
    }).then((res) => {
      res.data === "success"
        ? alert("강의노트 추가에 성공했어요!")
        : alert("강의노트 추가에 실패했어요...");
    });
  };

  return (
    <Card className="mt-3">
      <Card.Title className="text-center mt-3">
        <h3>수업노트 추가</h3>
      </Card.Title>
      <Card.Subtitle className="text-center">
        수업노트의 내용 창은 우측하단을 눌러서 확장이 가능해요!!
      </Card.Subtitle>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>수업노트 제목</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            placeholder="노트 제목"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>수업노트 내용</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            placeholder="노트 내용"
            as="textarea"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
        </InputGroup>
        <Button className="mt-3" block onClick={sendLectureNote}>
          저장
        </Button>
      </Card.Body>
    </Card>
  );
}

export {
  Overview,
  Attendance,
  AddCourse,
  SkypeLink,
  SkypeLinkInput,
  LectureNote,
  VideoLinks,
  VideoLinkInput,
  MaxTuteeInput,
  LectureNoteInput,
};
