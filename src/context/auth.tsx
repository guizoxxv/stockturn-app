
import React, { createContext, useCallback, useState } from 'react';
import { loginRequest, logoutRequest } from '../services/api';
import { LoginCredentials } from '../interfaces/loginCredentials.interface';
import { AuthData } from './interfaces/authData.interface';
import { useCookies } from 'react-cookie';
import { appDomain } from '../config';

interface AuthContextData {
  authData: AuthData,
  login(credentials: LoginCredentials): Promise<void>,
  logout(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [, , removeCookie] = useCookies(['XSRF-TOKEN', 'products_api_session']);
  const [authData, setAuthData] = useState<AuthData>({} as AuthData);
  
  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    
    setAuthData(response);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await logoutRequest();

    removeCookie('XSRF-TOKEN', { path: '/', domain: appDomain });
    removeCookie('products_api_session', { path: '/', domain: appDomain });

    setAuthData({} as AuthData);
  }, [removeCookie]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};