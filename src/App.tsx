import React, { useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  useEffect(() => {
    axios.get('http://api.local.test:8001/sanctum/csrf-cookie').then(res => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <h1>Opa!</h1>
    </div>
  );
}

export default App;
