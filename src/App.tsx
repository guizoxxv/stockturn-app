import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { toast } from 'react-toastify';
import { AuthProvider } from './context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'Accept': 'application/json',
}

toast.configure({
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
