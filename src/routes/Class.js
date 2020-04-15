import React from 'react';

function Class({match:{params:{id}}}){
    return(
    <h1>this is class : {id}</h1>
    )
}

export default Class;