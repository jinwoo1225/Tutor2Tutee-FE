import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import jQuery from 'jquery'
import { login } from "../store"
import { connect } from 'react-redux';
import { URL } from './App'

function LoginForm({state, dlogin, history}) {
    const [userID, setUserID] = useState("");
    const [userPW, setPassword] = useState("");

    const onClickLogin = () => {
        console.log(userID, userPW)
        const data = 'username=' + userID + '&password=' + userPW;
        jQuery.ajax({
            type: "POST",
            url: URL + "auth/login",
            data : data,
            dataType: "text",
            success: (res)=>{
                if(res === 'success'){
                    console.log('로그인 성공')
                    dlogin(userID)
                    history.push("/")
                }else{
                    alert("로그인 실패")
                }
            },
            error: (xhr, status, responseTxt)=>{
                console.log(xhr);
            }
        })
    };

    return(
        <Form className="mt-md-3">
            <Form.Group>
                <Form.Label>아이디</Form.Label>
                <Form.Control placeholder="아이디" onChange={e =>{setUserID(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="current-password" placeholder="비밀번호" onChange={e =>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="비밀번호 저장" />
            </Form.Group>
            <Button onClick={onClickLogin}>Submit</Button>
            </Form>
    )
}

function mapDispatchToProps(dispatch){
    return {
        dlogin: data=>dispatch(login(data)),
    }
}

function mapStateToProps(state){
    return {
        loginState: state,
    }
}

export default connect(null, mapDispatchToProps) (LoginForm);