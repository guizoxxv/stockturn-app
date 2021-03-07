import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { toast } from 'react-toastify';
import { AuthProvider } from './context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ProductProvider } from './context/product';
import { PaginationProvider } from './context/pagination';
import { UploadProvider } from './context/upload';

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
          <PaginationProvider>
            <ProductProvider>
              <UploadProvider>
                <Routes />
              </UploadProvider>
            </ProductProvider>
          </PaginationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
