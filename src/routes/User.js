import React from 'react';
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';

function User({userState:{user}}){
    console.log(user)
    return (
    <Container>
        <h1>안녕하세요! {user.nickname} 😀</h1>
        <h5>id : {user._id} 👽</h5>
        <h5>em : {user.webmail} 📪</h5>
        <p>내가 튜터인 강의</p>
        <ol>
            {user.classesAsTutor.map(_class => {
                return <li>{_class}</li>
            })}
        </ol>
        <p>내가 튜티인 강의</p>
        <ol>
            {user.classesAsTutee.map(_class => {
                return <li>{_class}</li>
            })}
        </ol>
        <p>내 포인트 </p>
        <p>{user.point}</p>
    </Container>
    )
}
function mapStateToProps(state, ownProps){
    return {userState : state,
            props:ownProps};
}
export default connect(mapStateToProps) (User);