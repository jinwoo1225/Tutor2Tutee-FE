import React, { useState } from "react";
import {
  Container,
  Form,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  Button,
} from "react-bootstrap";
import Axios from "axios";
import { URL } from "../components/App";
import { classTypes, classTypesRaw } from "../components/App";

const weeks = ["월", "화", "수", "목", "금", "토", "일"];
const weeksRaw = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categorys = ["컴퓨터공학", "수학", "영어"];

const tuteeMaxArray = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function MakeClass({ history }) {
  //강의를 만들때 사용되는 컴포넌트 & 라우트
  const [category, setCategory] = useState(categorys[0]);
  const [studyAbout, setStudyAbout] = useState("");
  const [classname, setClassName] = useState("");
  const [price, setPrice] = useState(0);
  const [classTypeSelect, setSelect] = useState(0);

  const [startTime, setStartTime] = useState(1000);
  const [endTime, setEndTime] = useState(1200);
  const [date, setDate] = useState([]);

  const [classDesc, setClDe] = useState("");
  const [courseDesc, setCoDe] = useState("");
  const [maxTutee, setMaxTutee] = useState(tuteeMaxArray[0]);

  const [place, setPlace] = useState("");
  const [grade, setGrade] = useState("");
  let startTimeArray = [];
  let endTimeArray = [];

  for (
    //시간을 30분 단위로 10시부터 22시까지 정할수있게함
    let index = 1000;
    index < 2201;
    index % 100 === 0 ? (index = index + 30) : (index = index + 70)
  ) {
    startTimeArray.push(index);
  }

  for (
    //위와 마찬가지
    //위의 시간을 바꾸면 새로 정해짐
    let index = startTime;
    index < 2201;
    index % 100 === 0 ? (index = index + 30) : (index = index + 70)
  ) {
    endTimeArray.push(index);
  }

  const submitToDB = () => {
    //서버에 전송하는 객체
    let data = {
      classType: classTypesRaw[classTypeSelect],
      category,
      studyAbout,
      className: classname,
      price,
      grade,
      class_description: classDesc,
    };

    let lectureTimes = date.map((date) => {
      return { day: weeksRaw[date], start: startTime, finish: endTime };
    });

    switch (classTypeSelect) {
      case 0:
        //실시간 온라인 강의형을 위한 시간정보, 강의 설명, 최대 튜티수
        data = {
          ...data,
          lectureTimes,
          course_description: courseDesc,
          maxTutee,
        };
        break;

      case 1:
        //온라인 동영상형 강의를 위한 추가 정보는 필요가 없다.
        break;

      case 2:
        //온라인 질의 응답형을 위한 시간 정보
        data = {
          ...data,
          lectureTimes,
        };
        break;

      case 3:
        // 오프라인 질의 응답형을 위한 시간, 장소정보, 최대 튜티수
        data = {
          ...data,
          lectureTimes,
          place,
          maxTutee,
        };
        break;

      default:
        break;
    }
    console.log(data);
    Axios.post(URL + "class", data).then((res) => {
      if (res.data === "fail") {
        alert("등록에 실패했어요.. 잘못된게 있나 확인해주세요!");
      } else {
        alert("등록에 성공했어요!! 홈화면으로 돌아갑니다!");
        // 홈화면으로 화면 이동
        history.push("/");
      }
    });
  };

  return (
    <Container className="mt-md-3">
      <h2>수업방식을 골라주세요!</h2>
      <ToggleButtonGroup
        type="radio"
        name="options"
        style={{ display: "flex" }}
        className="mx-md-2 text-center my-md-3"
        aria-label="Type group"
        defaultValue={0}
        onChange={(e) => {
          setSelect(e);
        }}
      >
        {
          //클래스 타입을 표시, [classTypes...]
          classTypes.map((classType, index) => {
            return (
              <ToggleButton size="lg" key={index} type="radio" value={index}>
                {classType}
              </ToggleButton>
            );
          })
        }
      </ToggleButtonGroup>
      <Card body>
        {/* 카드형태로 표시 */}
        <Form>
          <Form.Group>
            <Form.Label>수업 이름 정하셨나요?</Form.Label>
            <Form.Control
              placeholder="수업이름은 누구든 쉽게 알수있는 이름이 좋아요! 😃"
              onChange={(e) => {
                setClassName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>분야를 알려주세요!</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {
                //카테고리를 select option으로 표시
                categorys.map((category, index) => {
                  return <option key={index}>{category}</option>;
                })
              }
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>간략히 수업 소개</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              placeholder="이 수업을 한줄로 요약한다면!!😄"
              onChange={(e) => {
                setStudyAbout(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>수업 설명</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              placeholder="수업설명"
              onChange={(e) => {
                setClDe(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>성적인증</Form.Label>
            <Form.Control
              onChange={(e) => setGrade(e.target.value)}
              placeholder="성적을 인증할수있는 링크를 주세요!(추후 이미지 저장으로 바뀔예정입니다 😀 )"
            />
          </Form.Group>

          {classTypeSelect !== 1 ? ( //온라인 동영상 강의를 제외한 수업에 필요한 요소
            <>
              <Form.Group>
                <Form.Label style={{ display: "block" }}>
                  수업 요일을 골라주세요!(아직은 하나만 골라주세요!)
                </Form.Label>
                <ToggleButtonGroup
                  type="checkbox"
                  className="mb-2"
                  onChange={(e) => {
                    setDate(e);
                  }}
                >
                  {weeks.map((week, index) => {
                    return (
                      <ToggleButton key={index} value={index}>
                        {week}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>수업시간을 골라주세요!</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setStartTime(Number.parseInt(e.target.value));
                  }}
                >
                  {startTimeArray.map((time, index) => {
                    return (
                      <option key={index} value={time}>
                        {time.toString().substring(0, 2) +
                          ":" +
                          time.toString().substring(2)}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Label>종료시간</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setEndTime(Number.parseInt(e.target.value));
                  }}
                >
                  {endTimeArray.map((time, index) => {
                    return (
                      <option key={index} value={time}>
                        {time.toString().substring(0, 2) +
                          ":" +
                          time.toString().substring(2)}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </>
          ) : null}

          {classTypeSelect === 0 || classTypeSelect === 2 ? (
            <Form.Group>
              <Form.Label>커리큘럼</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="수업을 어떻게 진행하실껀가요?"
                onChange={(e) => setCoDe(e.target.value)}
              />
            </Form.Group>
          ) : null}

          {classTypeSelect === 0 || classTypeSelect === 3 ? (
            <Form.Group>
              <Form.Label>튜티수를 골라주셔야됩니다!</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setMaxTutee(e.target.value);
                }}
              >
                {tuteeMaxArray.map((tuteeMax, index) => {
                  return (
                    <option key={index} value={tuteeMax}>
                      {tuteeMax}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          ) : null}

          {classTypeSelect === 3 ? (
            <Form.Group>
              <Form.Label>어디서 할지 정하셨나요?</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                //우리집은 장난입니다.
                placeholder="ex) 학교 도서관, 혜움, 카페, 우리집😍"
                onChange={(e) => setPlace(e.target.value)}
              />
            </Form.Group>
          ) : null}
          <Form.Group>
            <Form.Label>가격</Form.Label>
            <Form.Control
              placeholder="몇 포인트정도의 수업일까요?(최대 1,000포인트)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button block onClick={submitToDB}>
          수업 개설
        </Button>
      </Card>
    </Container>
  );
}

export default MakeClass;
