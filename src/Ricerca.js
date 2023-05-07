import React, { useState } from 'react';
import axios from 'axios';
import { host_url, host_port, host_protocol } from './config.js';


function RicercaPerCAP() {
  const [items, setItems] = useState([]);
  const [cap, setCap] = useState('');
  const [token, setToken] = useState('');

  const handleChange = (event) => {
    setCap(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const config = {
      headers: { 'X-API-Key': storedToken },
    };
    const response = await axios.get(`${host_protocol}://${host_url}/comuni/${cap}/`, config);
    const responseData = response.data;

    const responseItems = Array.isArray(responseData) ? responseData : [responseData];
    setItems(responseItems);
  }

  return (
    <div className="app-container">
      <form className="subButton" onSubmit={handleSubmit}>
        <label>
          CAP:
          <input type="text" value={cap} onChange={handleChange} />
        </label>
        <button className="subBotton" type="submit">Cerca comuni</button>
      </form>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(items[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.nome}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

function RicercaPerProvincia() {
  const [items, setItems] = useState([]);
  const [provincia, setProvincia] = useState('');
  const [token, setToken] = useState('');

  const handleChange = (event) => {
    setProvincia(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const config = {
      headers: { 'X-API-Key': storedToken },
    };
    const response = await axios.get(`${host_protocol}://${host_url}/province/r/${provincia}/`, config);
    const responseData = response.data;

    const responseItems = Array.isArray(responseData) ? responseData : [responseData];
    setItems(responseItems);
  }

  return (
    <div className="app-container">
      <h3>Ricerca Per Provincia</h3>
      <p>Questa ricerca mostra l'elenco del comuni che fanno riferimento ad una determinata provincia.</p>
      <form className="subButton" onSubmit={handleSubmit}>
        <label>
          Provincia:
          <input type="text" value={provincia} onChange={handleChange} />
        </label>
        <button className="subBotton" type="submit">Cerca comuni</button>
      </form>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(items[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

function RicercaRegionePerSuperficie() {
  const [items, setItems] = useState([]);
  const [superficie, setCap] = useState('');
  const [token, setToken] = useState('');

  const handleChange = (event) => {
    setCap(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const config = {
      headers: { 'X-API-Key': storedToken },
    };
    const response = await axios.get(`${host_protocol}://${host_url}/regioni/superficie_superiore_di/${superficie}/`, config);
    const responseData = response.data;

    const responseItems = Array.isArray(responseData) ? responseData : [responseData];
    setItems(responseItems);
  }

  return (
    <div className="app-container">
      <form className="subButton" onSubmit={handleSubmit}>
        <label>
          Più grandi della seguente superficie:
          <input type="text" value={superficie} onChange={handleChange} />
        </label>
        <button className="subBotton" type="submit">Cerca Regioni</button>
      </form>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(items[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.nome}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}
export {RicercaPerCAP, RicercaPerProvincia, RicercaRegionePerSuperficie};
