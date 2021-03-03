import axios from 'axios';
import { LoginCredentials } from '../interfaces/loginCredentials.interface';
import { apiBaseUrl } from '../config';
import { GetUserResponse } from './interfaces/getUserResponse.interface';
import { AuthData } from '../context/interfaces/authData.interface';

export async function loginRequest(
  { email, password }: LoginCredentials
): Promise<AuthData> {
  await axios.get(apiBaseUrl + '/sanctum/csrf-cookie');
  await axios.post(
    apiBaseUrl + '/login',
    {
      email,
      password,
    },
    {
      headers: {
        'Accept': 'application/json',
      }
    }
  );

  const response = await axios.get<GetUserResponse>(apiBaseUrl + '/api/user');

  return {
    username: response.data.name,
    email: response.data.email,
  }
};

export async function logoutRequest(): Promise<void> {
  await axios.post(apiBaseUrl + '/logout');
};