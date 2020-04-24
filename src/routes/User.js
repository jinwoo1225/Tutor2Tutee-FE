import React from 'react';
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { URL } from '../components/App'

function User({userState:{user}, history}){
    let classesAsTutor = [];
    user.classesAsTutor.map(_class => {
        Axios.get(URL + 'class/' + _class)
        .then(response => {
            classesAsTutor.push(response.data.className);
        })
        .catch(error => {
            console.log(error)
        })
    })
    
    return (
    <Container>
        {
            user.nickname === ""
            ? <>{ history.push('/') }</>
            : <>
                <h1>안녕하세요! {user.nickname} 😀</h1>
                <h5>id : {user._id} 👽</h5>
                <h5>em : {user.webmail} 📪</h5>
                <p>내가 튜터인 강의</p>
                <ol>
                    {classesAsTutor.map(className => {
                        console.log(classesAsTutor)
                        return<li>{className}</li>
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
            </>
        }
        
    </Container>
    )
}
function mapStateToProps(state, ownProps){
    return {userState : state,
            props:ownProps};
}
export default connect(mapStateToProps) (User);