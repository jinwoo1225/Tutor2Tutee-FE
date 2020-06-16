import React from "react";
import { Card, ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { URL } from "./App";
import Axios from "axios";

function Rating({ classInfo, userInfo, amITutor }) {
  const [star, setStar] = useState(3);
  const [tutees, setTutees] = useState(undefined);
  const [tuteeRate, setTuteeRate] = useState(undefined);

  useEffect(() => {
    classInfo !== undefined &&
      Axios.get(URL + "class/" + classInfo._id + "/tutees").then(({ data }) => {
        setTutees(() => data);
      });
  }, [classInfo]);

  const submitRate = (uID) => {
    Axios.post(URL + "class/" + classInfo._id + "/rating/" + uID, {
      value: star,
    });
  };

  return (
    <Card
      body
      className="text-center"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <Card.Title>평가하기</Card.Title>
      {amITutor ? (
        <>
          <Card.Text>튜티들을 평가합니다.</Card.Text>
          <select
            className="custom-select mb-3"
            style={{ maxWidth: "300px", margin: "auto" }}
            onChange={(e) => setTuteeRate(e.target.value)}
          >
            <option>튜티를 골라주세요!</option>
            {tutees !== undefined &&
              tutees.map((tutee, index) => {
                return (
                  <option key={index} value={tutee.uID}>
                    {tutee.nickname}
                  </option>
                );
              })}
          </select>
          {tuteeRate !== undefined && (
            <ToggleButtonGroup
              style={{ display: "flex", maxWidth: "300px", margin: "auto" }}
              type="radio"
              name="options"
              className="mb-2"
              defaultValue={3}
              onChange={(e) => setStar(e)}
            >
              {[5, 4, 3, 2, 1].map((star, index) => (
                <ToggleButton type="radio" key={index} value={star}>
                  {star}점
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
          {tuteeRate !== undefined && (
            <>
              <h5>
                {tutees !== undefined &&
                  tutees
                    .filter((tutee) => tutee.uID === tuteeRate)
                    .map((tutee) => tutee.nickname)[0]}
                님에게 {star}점을 드리겠어요?
              </h5>
              <Button
                className="mt-3"
                onClick={() => submitRate(tuteeRate)}
                block
              >
                평가 완료
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Card.Text>튜터를 평가해주세요!</Card.Text>

          {star !== "" && <p>{star}점</p>}
          <ToggleButtonGroup
            style={{ display: "flex", maxWidth: "300px", margin: "auto" }}
            type="radio"
            name="options"
            className="mb-2"
            defaultValue={3}
            onChange={(e) => setStar(e)}
          >
            {[5, 4, 3, 2, 1].map((star, index) => (
              <ToggleButton type="radio" key={index} value={star}>
                {star}점
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            block
            onClick={() => {
              submitRate(classInfo.tutor);
            }}
          >
            평가 완료
          </Button>
        </>
      )}
    </Card>
  );
}

export default Rating;
