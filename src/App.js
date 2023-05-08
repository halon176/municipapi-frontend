import React, { useState } from 'react';
import { ElencoProvince, ElencoRegioni } from './Elenchi';
import { RicercaPerCAP, RicercaPerProvincia, RicercaRegionePerSuperficie } from './Ricerca';
import Login from './Login';
import './App.css';


function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('token'));
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = (appName) => {
    setActiveApp(appName);
    setShowDropdown(false);
  };

  const handleLoginClick = () => setActiveApp(null);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setApiKey("");
    window.location.reload();
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const shouldShowButtons = apiKey !== null;

  return (
    <div className="homepage-container">
      <div className="container">
        <div className="left-section">
          <h1>MunicipAPI</h1>
        </div>
        <div className="buttons-container">
          {shouldShowButtons && (
            <div className="dropdown">
              <button onClick={toggleDropdown}>Ricerca</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <button onClick={() => handleButtonClick('RicercaPerCAP')}>Ricerca per CAP</button>
                  <button onClick={() => handleButtonClick('RicercaPerProvincia')}>Ricerca per Provincia</button>
                  <button onClick={() => handleButtonClick('RicercaRegionePerSuperficie')}>Ricerca Regione per Superficie</button>
                </div>
              )}
            </div>
          )}

          {shouldShowButtons && (
            <div className="dropdown">
              <button onClick={toggleDropdown}>Elenchi</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <button onClick={() => handleButtonClick('elencoRegioni')}>Elenco Regioni</button>
                  <button onClick={() => handleButtonClick('elencoProvince')}>Elenco Province</button>
                </div>
              )}
            </div>
          )}

        </div>
        <div className="right-section">
          <button onClick={apiKey ? handleLogoutClick : handleLoginClick}>
            {apiKey ? 'Estrai API KEY' : 'Inserisci API Key'}
          </button>
        </div>
      </div>
      <div className="app-container">
        {activeApp === 'elencoRegioni' && <ElencoRegioni />}
        {activeApp === 'elencoProvince' && <ElencoProvince />}
        {activeApp === 'RicercaPerCAP' && <RicercaPerCAP />}
        {activeApp === 'RicercaPerProvincia' && <RicercaPerProvincia />}
        {activeApp === 'RicercaRegionePerSuperficie' && <RicercaRegionePerSuperficie />}
        {!activeApp && (
          <div className="login-container">
            <Login setApiKey={setApiKey} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
