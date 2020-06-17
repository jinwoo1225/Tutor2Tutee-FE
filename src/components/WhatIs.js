import React from "react";

function WhatIs() {
  //튜터2튜티를 설명하는 컴포넌트
  return (
    <div>
      <div className="text-center">
        <h1>What is Tutor2Tutee?</h1>
        <h4>튜터2튜티는 지식공유 플랫폼입니다!</h4>
      </div>
      <hr style={{ maxWidth: "800px", margin: "auto" }}></hr>
      <div
        className="text-center"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <h4 className="my-md-3">4가지 수업방식을 체험해보세요!</h4>
        <hr></hr>
        <h5>온라인 실시간 강의</h5>
        <p>
          튜터와 튜티가 온라인상에서 실시간 화상회의를 통해서 튜티에게 지식을
          공유하는 수업방식입니다!
        </p>

        <h5>온라인 동영상</h5>
        <p>
          튜터가 올린 강의를 튜티가 언제나 열람하면서 튜터의 지식을 공유하는
          수업방식입니다!
        </p>

        <h5>온라인 질의응답</h5>
        <p>
          정해진 시간에 튜터가 채팅방을 개설하면, 튜티가 들어와 과목에 대한
          질문을 하는 수업방식입니다!
        </p>

        <h5>오프라인</h5>
        <p>
          각자 얼굴보고 이야기할까요? 튜터가 수업장소와 수업시간을 고르면 튜티와
          함께 재밌는 시간을 보낼수 있습니다!
        </p>
        <hr></hr>
      </div>
      <div className="text-center">
        <h4>튜터는 뭐가 좋아요?</h4>
        <p>
          튜터는 수업을 가르쳐주며 포트폴리오를 작성할수있고, 튜티들을 가르치기
          위해 과목에 대한 이해도를 높일수 있습니다.
        </p>
        <hr></hr>
        <h4>튜티는요?</h4>
        <p>
          튜티는 이미 과목을 수강해서 성적이 높은 튜터의 이야기를 들으며 성적을
          높일 수 있습니다.
        </p>
        <hr></hr>
        <h3>아래에서 현재 진행중인 강의를 확인해보세요!</h3>
      </div>
    </div>
  );
}

export default WhatIs;
