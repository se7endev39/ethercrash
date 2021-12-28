import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import './sign.css'


function Login() {

  const history = useHistory();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const mySubmitHandler = () => {
    if (username === "" || password === "")
      alert("Please input all data");
    else {
      var data = { username: username, password: password, level: 0 };
      console.log(data)
      axios.post('http://localhost:8080/login', data)
        .then(
          response => {
            console.log(response.data)
            if (response.data == "matching") {
              let data = [
                { oauth: 'true' },
              ]
              history.push({ pathname: '/', data: data });
            } else {
              alert(response.data);
            }
          }
        )
        .catch(
          error => {
            setState({ errorMessage: error.message });
            console.error('There was an error!', error);
          }
        );
    }
  }
  
    return (
      <>
        <div className='root'>
          <img src="bottom-bg.svg" className='bottom-img' />
          <div className='div-form'>
            <div className='form' >
              <div className='form-title'>PLEASE LOGIN</div>
              <div className='text-label'>UserName</div>
              <input type="text" name='username' className='text-input' placeholder='UserName' onChange={(e) => setUsername(e.target.value)} />
              <div className='text-label'>Password</div>
              <input type="password" name='password' className='text-input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              <button className='submit back_button' onClick={mySubmitHandler}>Log In</button>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Link to='/register' className="login-signup">Go to <b style={{ color: 'yellow' }}>Register</b></Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default Login;