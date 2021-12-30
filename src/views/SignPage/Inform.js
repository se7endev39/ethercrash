import { use } from 'express/lib/router';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './sign.css'

function Inform() {

  const history = useHistory();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_Confirm] = useState('');
  const [username, setUsername] = useState('');
  const [agree, setAgree] = useState(false);
  const [level, setLevel] = useState(0);

 useEffect (() => {
   setMail(localStorage.getItem('mail'));
   setPassword(localStorage.getItem('password'));
   setUsername(localStorage.getItem('username'));

   console.log(mail,password,username);
 });
 

  const mySubmitHandler = () => {
    console.log('mysubmithandle',password,password_confirm);
    var data = { username: username, password: password, level: 0 };
    history.push('/');
  }
  return (
    <>
      <div className='root'>
        <img src="bottom-bg.svg" className='bottom-img' />
        <div className='div-form'>
          <div className='form' >
            <div className='form-title'>THANK YOU FOR REGISTERATION</div>
            <div className='text-label'>Username</div>
            <input type="text" name='username' className='text-input' placeholder='User Name'
            value={username} onChange={(e) => setUsername(e.target.value)} />
            <div className='text-label'>Password</div>
            <input type="text" name='password' className='text-input' placeholder='Password' 
            value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className='text-label'>Email Address</div>
            <input type="text" name='mail' className='text-input' placeholder='Email Address' 
            value={mail} onChange={(e) => setMail(e.target.value)} />
            <p>
              Make sure you write down your password or you may lose your account without this.
            </p>
            <button className='submit back_button' onClick={mySubmitHandler}>Play Now</button>
          </div>
        </div>
      </div>
    </>
  );
} export default Inform;