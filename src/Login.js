import React, { useState } from 'react';
import axios from 'axios';
import { host_url, host_protocol } from './config.js';

function Login() {
  const savedApiKey = localStorage.getItem('token');
  let [apiKey, setApiKey] = useState(savedApiKey || '');
  const [showSuccessMessage, setShowSuccessMessage] = useState(!!savedApiKey);

  const handleLogin = () => {
    const config = {
      headers: {
        'X-API-Key': apiKey
      }
    };

    axios.get(`${host_protocol}://${host_url}/verify/`, config)
      .then(response => {
        if (response.status === 200 && response.data==true) {
          localStorage.setItem('token', apiKey);
          setShowSuccessMessage(true);
          window.location.reload();

        } else {
          localStorage.removeItem('token');
          alert('Errore durante la verifica della chiave API');
        }
      })
      .catch(error => {
        localStorage.removeItem('token');
        alert('Errore durante la verifica della chiave API');
      });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setApiKey('');
    setShowSuccessMessage(false);
    window.location.reload();    
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
        <>
          <div className="app-container">Chiave inserita con successo. Ora puoi navigare nel menù con i dati!</div>
          <button onClick={handleLogoutClick}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;
