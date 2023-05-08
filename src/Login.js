import React, { useState } from 'react';
import axios from 'axios';
import { host_url, host_protocol } from './config.js';


function Login() {
  const [apiKey, setApiKey] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleLogin = () => {
    const config = {
      headers: {
        'X-API-Key': apiKey
      }
    };

    axios.get(`${host_protocol}://${host_url}/regioni/`, config)
      .then(response => {
        if (response.status === 200) {
          axios.defaults.headers.common['X-API-Key'] = apiKey;
          localStorage.setItem('token', apiKey);
          setShowSuccessMessage(true);
          window.location.reload();
        } else {
          delete axios.defaults.headers.common['X-API-Key'];
          localStorage.removeItem('token');
          alert('Errore durante la verifica della chiave API');
        }
      })
      .catch(error => {
        delete axios.defaults.headers.common['X-API-Key'];
        localStorage.removeItem('token');
        alert('Errore durante la verifica della chiave API');
      });
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
