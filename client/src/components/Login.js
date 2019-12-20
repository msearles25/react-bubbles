import React, { useState } from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  
  const loginChange = e => [
    setUser({...user, [e.target.name]: e.target.value})
  ]

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default Login;
