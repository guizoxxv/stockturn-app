import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { LogoutModal } from './logoutModal';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { authData } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <>
    <header className="mb-4">
      <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faBarcode} size="2x" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                <Link className="nav-link" to="/">
                  Products
                </Link>
              </li>
              <li className={`nav-item ${pathname === '/uploads' ? 'active' : ''}`}>
                <Link className="nav-link" to="/uploads">
                  Uploads
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <button
                  id="navbarDropdown"
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {authData.username} <span className="caret"></span>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <button
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <LogoutModal />
    </>
  );
}