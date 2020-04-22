import React, {useState} from 'react';
import { Container } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'

function Login(props) {
    const {history} = props;
    return(
    <Container>
        <LoginForm history={history}>
            
        </LoginForm>
    </Container>
    )
}



export default (Login);