import React, { useState } from 'react';
import { useEffect } from 'react';
import hufLogo from '../../../assets/images/logo/logohuf.png';

import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import axios from 'axios';
import jwt_decode from 'jsonwebtoken';
import { isNotExpiredBoolean } from './token'; // Certifique-se de que o caminho para token.js está correto
import "./style.css"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Adicione a URL completa do backend aqui
});

const LoginComponent = () => {
    const [error, setError] = useState('');
    const history = useHistory();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

console.log(isNotExpiredBoolean())
// useEffect(() => {
//     if (isNotExpiredBoolean()) {
//       // Verificar se o token é válido e foi emitido pelo backend
//       axiosInstance.post('/verify-token', { token: localStorage.getItem('token') })
//         .then((response) => {
//           if (response.data.valid) {
//             history.push('/');
//           } else {
//             setError('Invalid token');
//             localStorage.removeItem('token'); // Remover o token inválido do localStorage
//           }
//         })
//         .catch((error) => {
//           setError('Error occurred while verifying token');
//           localStorage.removeItem('token'); // Remover o token inválido do localStorage
//         });
//     }
//   }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setmessage("");
        try {
            const response = await axiosInstance.post('/login', { username: username, password: password });
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                localStorage.setItem("token", data?.token);
                window.location.href = "/";
            }


            // setpassword('');
            // if(lembrar) localStorage.setItem('email', username)
  
            // if(verify == 0){
            //   forcePassword(accessToken, nome, cargo, imagem)
            // }else{
            //   login({
            //     accessToken, nome, cargo, imagem
            //   });
            //   navigate(from, { replace: true });
            // }
  
        } catch (err) {
            // const motivo = err?.response?.data?.message
            // if (!err?.response) {
            //   setmessage('Atualmente não é póssivel comunicar com o servidor. ' + err);
            // } else {
            //   setmessage(motivo);
            // }
        }
    }


  return (
    <div className="login-container">
  {/* <div className="diagonal-background diagonal-top"></div> */}
  <div className="diagonal-background diagonal-bottom"></div>
  <div className="login-form">
    <img src={hufLogo} alt="Huf Logo" className="huf-logo" />
    <h2 className="login-header">Welcome to Huf</h2>
    {error && <Alert message={error} type="error" showIcon />}
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <label htmlFor="email-address">Username</label>
        <input
          value={username}
          onChange={(value) => setusername(value.target.value)}
          type="text"
          id="email"
          className="input-field"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="input-box">
        <label htmlFor="email-address">Password</label>
        <input
          value={password}
          onChange={(value) => setpassword(value.target.value)}
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="input-box">
        <input type="submit" value="Log In" className="submit-btn" />
      </div>
    </form>
  </div>
  <div className="diagonal-background"></div>

</div>




  

  );
};

export default LoginComponent;
