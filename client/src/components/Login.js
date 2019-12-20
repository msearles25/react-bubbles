import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const loginChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const loginSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles-page')
      })
      .catch(err => console.log('Error: ', err))
  }

  return (
    <>
      <div>
        <form onSubmit={loginSubmit}>
          <input
            type='text'
            name='username'
            value={user.username}
            onChange={loginChange}
          />
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={loginChange}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
