import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import jQuery from 'jquery'
import { login, updateUser } from "../store"
import { connect } from 'react-redux';
import { URL } from './App'
import { Link } from 'react-router-dom'
import axios from 'axios'

function LoginForm({dispatchUser, history}) {
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
                    checkAuth();
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

    const checkAuth = () => {
        axios.get(URL + 'auth/isAuthenticated')
        .then(response => {
            console.log(response.data)
            dispatchUser(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    
            

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
            <Button className="my-md-3" onClick={onClickLogin}>로그인</Button>
            <p> 아이디가 없으신가요?<span role="img" aria-label="sweat">😅</span> : <Link to='/user/register'><Button className="btn-light">회원가입</Button></Link></p>
            </Form>
    )
}

function mapDispatchToProps(dispatch){
    return {
        dlogin: data=>dispatch(login(data)),
        dispatchUser : data=>dispatch(updateUser(data))
    }
}

export default connect(null, mapDispatchToProps) (LoginForm);