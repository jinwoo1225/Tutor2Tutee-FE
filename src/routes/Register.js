import React, { useState } from 'react';
import jQuery from 'jquery'

function Register() {
    const [webmail, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')

    const onChangeEmail = e => { setEmail(e.target.value) };
    const onChangePassword = e => { setPassword(e.target.value) };
    const onChangeNickname = e => { setNickname(e.target.value) };
    const onChangeUsername = e => { setUsername(e.target.value) };

    return(
        <>
            <h1>This is Register Page</h1>
            <form action='http://tutor2tutee.ddns.net:3000/user/register' method="post">
                <span>username</span>
                <input type='text' name="username" value={username} placeholder="webmail@webmail.com" onChange={onChangeUsername} />
                <span>이메일</span>
                <input type='text' name="webmail" value={webmail} placeholder="email@email.com" onChange={onChangeEmail} />
                <span>비밀번호</span>
                <input type='text' name="password" value={password} placeholder="password" onChange={onChangePassword}/>
                <span>별명</span>
                <input type='text' name="nickname" value={nickname} placeholder="nickname" onChange={onChangeNickname}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Register;