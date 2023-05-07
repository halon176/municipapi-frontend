import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { host_url, host_port, host_protocol } from './config.js';


function ElencoComuni() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    async function fetchItems() {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      const config = {
        headers: { 'X-API-Key': storedToken },
      };
      const response = await axios.get(`${host_protocol}://${host_url}/comuni/`, config);
      setItems(response.data);
    }
    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.nome.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Elenco dei Comuni</h1>
      <div className="search-bar">
        <input
          id="search-input"
          type="text"
          placeholder="Cerca nella lista"
          value={searchString}
          onChange={handleSearchChange}
        />
      </div>
      {filteredItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(filteredItems[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.nome}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p align="center">Nessuna risultato.</p>
      )}
    </div>
  );
}

function ElencoProvince() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    async function fetchItems() {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      const config = {
        headers: { 'X-API-Key': storedToken },
      };
      const response = await axios.get(`${host_protocol}://${host_url}/province/`, config);
      setItems(response.data);
    }
    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.nome.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Elenco delle Province</h1>
      <div className="search-bar">
        <input
          id="search-input"
          type="text"
          placeholder="Cerca nella lista"
          value={searchString}
          onChange={handleSearchChange}
        />
      </div>
      {filteredItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(filteredItems[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.nome}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p align="center">Nessuna risultato.</p>
      )}
    </div>
  );
}
function ElencoRegioni() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchItems() {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      const config = {
        headers: { 'X-API-Key': storedToken },
      };

      const response = await axios.get(`${host_protocol}://${host_url}/regioni/`, config);
      setItems(response.data);
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const values = Object.values(item).join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="app-container">
      <h1>Elenco delle Regioni</h1>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Cerca nella lista"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(filteredItems[0]).map(key => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.nome}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p align="center">Nessuna risultato.</p>
      )}
    </div>
  );
}
export { ElencoComuni, ElencoProvince, ElencoRegioni };
