import React, { useState } from 'react';
import { ElencoComuni, ElencoProvince, ElencoRegioni } from './Elenchi';
import {RicercaPerCAP, RicercaPerProvincia, RicercaRegionePerSuperficie} from './Ricerca';
import Login from './Login';
import axios from 'axios';
import './App.css';

function Host() {
  const host_port = '8000';
}

function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('token'));
  const [showRicercaDropdown, setShowRicercaDropdown] = useState(false);
  const [showElenchiDropdown, setShowElenchiDropdown] = useState(false);

  const handleElencoRegioniClick = () => {
    setActiveApp('elencoRegioni');
    setShowRicercaDropdown(false);
  };
  const handleElencoProvinceClick = () => {
    setActiveApp('elencoProvince');
    setShowRicercaDropdown(false);
  };
  const handleElencoComuniClick = () => {
    setActiveApp('elencoComuni');
    setShowRicercaDropdown(false);
  };
  const handleRicercaPerCAPClick = () => {
    setActiveApp('RicercaPerCAP');
    setShowElenchiDropdown(false);
  };
  const handleRicercaPerProvinciaClick = () => {
    setActiveApp('RicercaPerProvincia');
    setShowElenchiDropdown(false);
  }
  const handleRicercaRegionePerSuperficieClick = () => {
      setActiveApp('RicercaRegionePerSuperficie');
      setShowElenchiDropdown(false);
  };
  const handleLoginClick = () => {
    setActiveApp(null);
  };

  const handleLogoutClick = () => {
    localStorage.setItem('token', null);
    setApiKey(null);
    window.location.reload();
  };

  const toggleDropdownRicerca = () => {
    setShowRicercaDropdown(!showRicercaDropdown);
    setShowElenchiDropdown(false);
  };
  const toggleDropdownElenchi = () => {
    setShowElenchiDropdown(!showElenchiDropdown);
    setShowRicercaDropdown(false);
  };

  return (
    <div className="homepage-container">
      <div className="container">
        <div className="left-section">
          <h1>MunicipAPI</h1>
        </div>
        <div className="buttons-container">
          <div className="dropdown">
            <button onClick={toggleDropdownRicerca}>Ricerca</button>
            {showRicercaDropdown && (
              <div className="dropdown-content">
                <button onClick={handleRicercaPerCAPClick}>Ricerca per CAP</button>
                <button onClick={handleRicercaPerProvinciaClick}>Ricerca per Provincia</button>
                <button onClick={handleRicercaRegionePerSuperficieClick}>Ricerca Regione per Superficie</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={toggleDropdownElenchi}>Elenchi</button>
            {showElenchiDropdown && (
              <div className="dropdown-content">
                <button onClick={handleElencoRegioniClick}>Elenco Regioni</button>
                <button onClick={handleElencoProvinceClick}>Elenco Province</button>
              </div>
            )}
          </div>

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
