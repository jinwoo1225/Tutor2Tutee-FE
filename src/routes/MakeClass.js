import React from 'react';
import ClassForm from '../components/ClassForm'

function MakeClass(props){
    const {history} = props;
    return(
    <>
        <h1>This is MakeClass</h1>
        <ClassForm history={history}/>
    </>
    )
}

export default (MakeClass);

