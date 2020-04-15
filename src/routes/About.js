import React, { useState } from 'react';

function About(){
    const [text, setText] = useState("")

    setInterval(() => {
        setText(Date.now())
    }, 100000);

    return(
        <h2>This is about: {text}</h2>
    )
}

export default About;