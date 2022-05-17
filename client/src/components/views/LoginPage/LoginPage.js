import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
     setEmail(event.currentTarget.value);
  };
 
  const onPwHandler = (event) => {
    setPassword(event.currentTarget.value);
 };

 const goRegister = () => {
  navigate('/register');
};

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('Email', Email);
    // console.log('Password', Password);

    let body = {
        email: Email,
        password: Password
    }

    dispatch(loginUser(body))
    .then(res => {
      if(res.payload.loginSuccess){
        navigate('/');
      } else {
        alert("Error");
      } 
    });

  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPwHandler} />
        <br />
        <button type="submit">
          로그인
        </button>
        <br />
        <button onClick={goRegister}>
          회원 가입
        </button>
      </form>
    </div>
  )
}

export default LoginPage