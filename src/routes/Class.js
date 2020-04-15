import React from 'react';

function Class({match:{params:{id}}, location:{_class}}){
    return(
    <>
        <h1>this is class : {_class.title}</h1>
        <h3>{_class.description}</h3>
        <h5>Class Tutor : {_class.teacher}</h5>
    </>
    )
}

export default (Class);

