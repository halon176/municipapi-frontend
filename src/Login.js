import React, { useState } from 'react';
import axios from 'axios';
import { host_url, host_port, host_protocol } from './config.js';


function Login() {
  const [apiKey, setApiKey] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = () => {
    axios.defaults.headers.common['X-API-Key'] = apiKey;
    localStorage.setItem('token', apiKey);
    setShowSuccessMessage(true);
  };

  return (
    <div className="login-container">
      {!showSuccessMessage ? (
        <>
          <h1>Login</h1>
          <div className="form-input">
            <label>API Key:</label>
            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          </div>
          <div className="button-container">
            <button onClick={handleLogin}>Login</button> 
          </div>
        </>
      ) : (
        <div className="app-container">Chiave inserita con successo. Ora puoi navigare nel menù con i dati!</div>
      )}
    </div>
  );
}

export default Login;
