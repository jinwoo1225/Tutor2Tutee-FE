import React, { useState } from 'react';
import { Container, Form, ToggleButton, ToggleButtonGroup } from  'react-bootstrap'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { TimePicker } from "@material-ui/pickers";
import moment from 'moment';



function ClassForm(){
    const [classtype, setClassType] = useState("")
    const [category, setCategory] = useState("")
    const [studyAbout, setStudyAbout] = useState("")
    const [className, setClassName] = useState("")
    const [price, setPrice] = useState("1")
    const [select, setSelect] = useState(0)
    const [startTime, setStartTime] = useState(new moment());
    const [endTime, setEndTime] = useState(new moment());
    const [textAreaCount, setTextAreaCount] = useState(1)

    const onClassTypeChange = e => { setClassType(e.target.value) }
    const onCategoryChange = e => { setCategory(e.target.value) }
    const onStudyAboutChange = e => { setStudyAbout(e.target.value) }
    const onClassNameChange = e => { setClassName(e.target.value) }
    const onPriceChange = e => { setPrice(e.target.value) }

    const classTypes = ['온라인 실시간','온라인 동영상', '온라인 질의응답', '오프라인 질의응답'];
    const weeks = ['월', '화', '수', '목', '금', '토', '일'];
    const hoursOfStudy = ["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
    return(
        <Container>
            <h2>수업방식을 골라주세요!</h2>
            <ToggleButtonGroup  type='radio' name='options' className="mx-2" aria-label="Type group" defaultValue={0} onChange= { e => {setSelect(e)}}>
                {classTypes.map((classType, index) => {
                    return <ToggleButton key={index} type="radio"  value={index} >{classType}</ToggleButton> 
                })}
            </ToggleButtonGroup>
            <h3>{classTypes[select]}</h3>
            <Form>
                <Form.Group>
                    <Form.Label>성적인증</Form.Label>
                    <Form.Control type="degree" placeholder="성적을 인증할수있는 링크를 주세요!(추후 이미지 저장으로 바뀔예정입니다 😀 )" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>수업 소개</Form.Label>
                    <Form.Control as="textarea" rows="5" placeholder="수업을 소개하는 글을 써주세요!"/>
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
            </Form>
        </Container>
        )
    }

    // <Form.Group controlId="exampleForm.ControlSelect1">
    //                 <Form.Label>Example select</Form.Label>
    //                 <Form.Control as="select">
    //                     <option>1</option>
    //                     <option>2</option>
    //                     <option>3</option>
    //                     <option>4</option>
    //                     <option>5</option>
    //                 </Form.Control>
    //             </Form.Group>
    
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