import React from 'react';
import { connect } from 'react-redux'

function Class({match:{params:{id}}, classState}){
    const _class = classState.filter(_class => parseInt(id) === _class.classID)[0]
    return(
    <>
        <h1>this is class : {_class.title}</h1>
        <h3>{_class.description}</h3>
        <h5>Class Tutor : {_class.teacher}</h5>
    </>
    )
}
function mapStateToProps(state){
    return {classState : state.class};
}


export default connect(mapStateToProps, null) (Class);