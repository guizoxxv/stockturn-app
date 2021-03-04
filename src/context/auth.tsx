
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getUserData, loginRequest, logoutRequest } from '../services/api';
import { LoginCredentials } from '../interfaces/loginCredentials.interface';
import { AuthData } from './interfaces/authData.interface';
import { useCookies } from 'react-cookie';
import { appDomain } from '../config';

interface AuthContextData {
  logged: boolean,
  authData: AuthData,
  login(credentials: LoginCredentials): Promise<void>,
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [cookies, , removeCookie] = useCookies(['XSRF-TOKEN', 'products_api_session']);
  const [authData, setAuthData] = useState<AuthData>({} as AuthData);
  const [logged, setLogged] = useState<boolean>(false);

  const clearCookies = useCallback((): void => {
    removeCookie('XSRF-TOKEN', { path: '/', domain: appDomain });
    removeCookie('products_api_session', { path: '/', domain: appDomain });
  }, [removeCookie]);
  
  useEffect(() => {
    if (cookies['XSRF-TOKEN']) {
      getUserData()
        .then(res => {
          setLogged(true);
          setAuthData({
            username: res.name,
            email: res.email,
          })
        })
        .catch(err => {
          console.log(`Fail to get logged user. Clearing cookies.`);

          clearCookies();
          
          setAuthData({} as AuthData);
        });
    }

    setLogged(false);
  }, [clearCookies, cookies]);
  
  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    
    setAuthData(response);
    setLogged(true);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutRequest();
    } catch(err) {
      throw err;
    } finally {
      clearCookies();

      setAuthData({} as AuthData);
      setLogged(false);
    }
  }, [clearCookies]);

  return (
    <AuthContext.Provider
      value={{
        logged,
        authData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};