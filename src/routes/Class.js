import React from 'react';
import { connect } from 'react-redux'
import {Container} from 'react-bootstrap'
import ShowClass from '../components/ShowClass.js'

function Class(props){
    const {match:{params:{id}}, classState, history} = props 
    const _class = classState.filter(_class => id === _class._id)[0]
    console.log(history)
    return(
    <Container>
        <ShowClass _class={_class} history={history}/>
    </Container>
    )
}
function mapStateToProps(state){
    return {classState : state.class};
}


export default connect(mapStateToProps, null) (Class);