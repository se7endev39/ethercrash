import { use } from 'express/lib/router';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './sign.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


function Register() {

  const history = useHistory();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_Confirm] = useState('');
  const [username, setUsername] = useState('');
  const [agree, setAgree] = useState(false);
  const [level, setLevel] = useState(0);
  const [passwordShown, setPasswordShown] = useState(false);

  const eye = <FontAwesomeIcon icon={faEye} />;

  const Checkbox = props => (
    <input type="checkbox" {...props} />
  )

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const mySubmitHandler = () => {
    var data = { mail: mail, username: username, password: password, level: 0 };
    console.log('mysubmithandle', password, password_confirm);
    if (mail === "" || password === "" || username === "")
      alert("Please input all data");
    else if (password != password_confirm)
      alert("Passwords Don't Match");
    else {
      if (agree == true) {
        var data = { mail: mail, password: password, username: username, level: level };
        axios.post('http://localhost:8080/register', data)
          .then(
            response => {
              console.log(response.data)
              if (response.data == "Registration Success") {
                localStorage.setItem('mail', mail);
                localStorage.setItem('password', password);
                localStorage.setItem('username', username);
                localStorage.setItem('level', level);
                history.push('/inform');
              } else {
                alert(response.data);
              }
            }
          )
          .catch(
            error => {
              // setState({ errorMessage: error.message });
              console.error('There was an error!', error);
            }
          );
      } else
        alert("Please check your agreement")
    }
  }
  const handleCheckboxChange = event => setAgree(event.target.checked);
  return (
    <>
      <div className='root'>
        <img src="bottom-bg.svg" className='bottom-img' />
        <div className='div-form'>
          <div className='form' >
            <div className='form-title'>CREATE A NEW ACCOUNT</div>
            <div className='text-label'>User Name</div>
            <input type="text" name='username' className='text-input' placeholder='User Name' onChange={(e) => setUsername(e.target.value)} />
            <div className='text-label'>Password</div>
            <input type={passwordShown ? "text" : "password"} name='password' className='text-input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <i onClick={togglePassword} >{eye}</i>
            <div className='text-label'>Password_Cornfirm</div>
            <input type="password" name='password_confirm' className='text-input' placeholder='Confirm Password' onChange={(e) => setPassword_Confirm(e.target.value)} />
            <div className='text-label'>Email Address</div>
            <input type="text" name='mail' className='text-input' placeholder='Email Address' onChange={(e) => setMail(e.target.value)} />
            <p>
              By clicking register you are agreeing to ethercrash.io terms of service. You also agree that you are of legal age, and that gambling is permitted in your jurisdiction.
            </p>
            <div className='text-check'>
              <Checkbox type="checkbox" name="checked" className='checkbox' checked={agree} onChange={handleCheckboxChange} />&nbsp;I Agree
            </div>
            <button className='submit back_button' onClick={mySubmitHandler}>Register</button>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Link to='/login' className="login-signup">Go to <b style={{ color: 'yellow' }}>LogIn</b></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} export default Register;