import React from 'react';

function Class({match:{params:{id}}}){
    console.log(id)
    return(
    <h1>this is funckin class {id}</h1>
    )
}

export default Class;