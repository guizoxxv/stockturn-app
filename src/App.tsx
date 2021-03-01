import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const apiBaseUrl = 'http://api.local.test:8001';

const App: React.FC = () => {
  const [logged, setLogged] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogout = () => {
    axios.post(apiBaseUrl + '/logout')
      .then(res => {
        setLogged(false);
      })
      .catch(err => console.log('[POST /logout]', err));
  }

  const handleLogin = () => {
    axios.get(apiBaseUrl + '/sanctum/csrf-cookie')
      .then(res => {
        axios.post(apiBaseUrl + '/login', {
          email: 'admin@example.com',
          password: 'secret123',
        })
          .then(res => {
            setLogged(true);

            axios.get(apiBaseUrl + '/api/user')
              .then(res => {
                alert('Worked');
              })
              .catch(err => {
                console.log('[GET /api/user]', err);
                setMsg('Fail to get logged user');
              });
          })
          .catch(err => console.log('[POST /login]', err));
      })
      .catch(err => console.log('[GET /sanctum/csrf-cookie]', err));
  }

  return (
    <div className="App">
      <p>Is logged in? <b>{logged ? 'YES' : 'NO'}</b></p>
      <button onClick={handleLogin} style={{marginRight:'3px'}}>LOGIN</button>
      <button onClick={handleLogout}>LOGOUT</button>
      {msg && (
        <p><b>Message:</b> {msg}</p>
      )}
    </div>
  );
}

export default App;
