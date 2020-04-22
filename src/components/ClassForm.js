import React, { useState } from 'react';
import { Container, Form, ToggleButton, ToggleButtonGroup } from  'react-bootstrap'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { TimePicker } from "@material-ui/pickers";
import moment from 'moment';
import jQuery from 'jquery';
import {URL} from './App'

const classTypes = ['온라인 실시간','온라인 동영상', '온라인 질의응답', '오프라인 질의응답'];
const classTypesRaw = ['RealtimeOnlineCourseType', 'OnlineCourseType', 'QnAType', 'OfflineType']
const weeks = ['월', '화', '수', '목', '금', '토', '일'];
const categorys = ['컴퓨터공학','수학','영어']

function ClassForm({history}){
    const [category, setCategory] = useState(categorys[0])
    const [studyAbout, setStudyAbout] = useState("")
    const [classname, setClassName] = useState("")
    const [price, setPrice] = useState(0)
    const [select, setSelect] = useState(0)
    const [startTime, setStartTime] = useState(new moment());
    const [endTime, setEndTime] = useState(new moment());


    const submitToDB = () => {
        const data = "classType=" + classTypesRaw[select] + "&category=" + category 
            + "&studyAbout=" + studyAbout + "&className=" + classname + "&price=" + price;
        console.log(data)
        jQuery.ajax({
            type: "POST",
            url: URL + "class",
            data : data,
            dataType: "text",
            success: (res)=>{
                if(res === 'success'){
                    //로그인 성공
                    console.log('저장 성공')
                    history.push('/');
                }else{
                    //로그인 실패
                    alert('로그인 실패');
                }
                console.log(res);
            },
            error: (xhr, status, responseTxt)=>{
                console.log(xhr);
            }
        })
    }

    
    return(
        <Container className="mt-md-3">
            <h2>수업방식을 골라주세요!</h2>
            <ToggleButtonGroup  type='radio' name='options' className="mx-2" aria-label="Type group" defaultValue={0} onChange= { e => {setSelect(e)}}>
                {classTypes.map((classType, index) => {
                    return <ToggleButton key={index} type="radio"  value={index} >{classType}</ToggleButton> 
                })}
            </ToggleButtonGroup>
            <h3>{classTypes[select]}</h3>
            <Form>
                <Form.Group>
                    <Form.Label>수업 이름 정하셨나요?</Form.Label>
                    <Form.Control placeholder="수업이름은 누구든 쉽게 알수있는 이름이 좋아요! 😃" onChange={e => {setClassName(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>분야를 알려주세요!</Form.Label>
                    <Form.Control as="select" onChange={e => {setCategory(e.target.value)}}>
                        {categorys.map((category, index) => {
                            return <option key={index}>{category}</option>
                        })}
                    </Form.Control>
               </Form.Group>
                <Form.Group>
                    <Form.Label>수업 소개</Form.Label>
                    <Form.Control as="textarea" rows="5" placeholder="수업을 소개하는 글을 써주세요!" onChange={e => {setStudyAbout(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>성적인증</Form.Label>
                    <Form.Control placeholder="성적을 인증할수있는 링크를 주세요!(추후 이미지 저장으로 바뀔예정입니다 😀 )" />
                </Form.Group>
                
                {select !== 1
                ?<>
                <Form.Group>
                    <Form.Label style={{display:"block"}}>수업 요일을 골라주세요!</Form.Label>
                    {weeks.map((week, index) => {
                       return <Form.Check key={index} inline label={week} type='checkbox'/>
                    })}
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{display:"block"}}>수업시간을 골라주세요!</Form.Label>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <div style={{display:"block",marginTop:"3px"}}>
                            <TimePicker  label="시작시간" value={startTime} onChange={setStartTime}/>
                        </div>
                        <div style={{display:"block", marginTop:'3px'}}>
                            <TimePicker  label="종료시간" value={endTime}   onChange={setEndTime}/>
                        </div>
                    </MuiPickersUtilsProvider>
                </Form.Group>
                </>
                :null}
                <Form.Group>
                    <Form.Label>커리큘럼</Form.Label>
                    <Form.Control as="textarea" rows="4" placeholder="수업을 어떻게 진행하실껀가요?"/>
                </Form.Group>
                {select === 3
                ?<Form.Group>
                    <Form.Label>어디서 할지 정하셨나요?</Form.Label>
                    <Form.Control as="textarea" rows="4" placeholder="ex) 학교 도서관, 혜움, 카페, 우리집😍"/>
                </Form.Group>
            :null}
            <Form.Group>
                    <Form.Label>가격</Form.Label>
                    <Form.Control  placeholder="몇 포인트정도의 수업일까요?(최대 1,000포인트)" onChange={e => setPrice(e.target.value)} />
                </Form.Group>
            </Form>
            <button onClick={submitToDB}>Submit</button>
        </Container>
        )
    }

    export default ClassForm;
    
    

    
    // classType, category,
    // studyAbout, className
    // price
    
    // 
    // <>
    //     <h1>This is ClassForm</h1>
    //     <form onSubmit={() => console.log({classtype, category, studyAbout, className, price})}>
    //         <p>Hello this is Class form<br/>Please form this sheet</p>
    //         <input text={classtype} placeholder='classtype' onChange={onClassTypeChange}/>
    //         <input text={category} placeholder='category'  onChange={onCategoryChange}/>
    //         <input text={studyAbout} placeholder='studyAbout'onChange={onStudyAboutChange}/>
    //         <input text={className} placeholder='className' onChange={onClassNameChange}/>
    //         <input text={price} placeholder='price'     onChange={onPriceChange}/>
    //         <button>Submit</button>
    //     </form>
    // </>

    // const onClassTypeChange = e => { setClassType(e.target.value) }
    // const onCategoryChange = e => { setCategory(e.target.value) }
    // const onStudyAboutChange = e => { setStudyAbout(e.target.value) }
    // const onClassNameChange = e => { setClassName(e.target.value) }
    // const onPriceChange = e => { setPrice(e.target.value) }