import React, { useState } from 'react';
import { Tabs, Tab, ProgressBar } from 'react-bootstrap';

function ShowClass(props) {
    const [key, setKey] = useState("overview");
    const { _class, history } = props;
    console.log(props)
    if(_class === undefined){
        // prop을 받지 못한다면 home으로 리턴
        alert("잘못된 접근입니다.");
        history.push('/');
        return null;
    }

    return (
        <div>
            <h1>{_class.className}</h1>
            <p>ClassType : {_class.classType} Category : {_class.category}<br/>Tutor : {_class.tutor}</p>
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={e => setKey(e)}
            >
                <Tab eventKey="overview" title="개요">
                    <h2>개요</h2>
                    <p>{_class.studyAbout}</p>
                </Tab>
                <Tab eventKey="attendance" title="출결">
                    <h2>현재 진행 상황(60%)</h2>
                    <ProgressBar now={60} />
                </Tab>
                <Tab eventKey="note" title="강의노트">
                    <h2>강의노트</h2>
                    <p>{_class.lectureNote}</p>
                </Tab>

                <Tab eventKey="question" title="질의응답">
                    <h2>질의응답</h2>
                    <p>{_class.qna}</p>
                </Tab>
                

            </Tabs>
        </div>
    )
}

export default ShowClass;