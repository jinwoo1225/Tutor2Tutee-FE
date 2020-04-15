import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    const onChangeEmail = e => { setEmail(e.target.value) };
    const onChangePassword = e => { setPassword(e.target.value) };
    const onChangeNickname = e => { setNickname(e.target.value) };

    const onSubmit = () =>{
        console.log(
            {
                email,
                password,
                nickname,
            }
        )
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <span>이메일</span>
                <input type='text' value={email} placeholder="email@email.com" onChange={onChangeEmail} />
                <span>비밀번호</span>
                <input type='text' value={password} placeholder="password" onChange={onChangePassword}/>
                <span>별명</span>
                <input type='text' value={nickname} placeholder="nickname" onChange={onChangeNickname}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Register;