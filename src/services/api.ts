import axios from 'axios';
import { LoginCredentials } from '../interfaces/loginCredentials.interface';
import { apiBaseUrl } from '../config';
import { GetUserResponse } from './interfaces/getUserResponse.interface';
import { AuthData } from '../context/interfaces/authData.interface';
import * as qs from 'query-string';
import { GetProductsResponse } from '../interfaces/getProductsResponse.interface';

export async function loginRequest(
  { email, password }: LoginCredentials
): Promise<AuthData> {
  await axios.get(apiBaseUrl + '/sanctum/csrf-cookie');
  await axios.post(apiBaseUrl + '/login', {
    email,
    password,
  });

  const userData = await getUserData();

  return {
    username: userData.name,
    email: userData.email,
  }
}

export async function getUserData(): Promise<GetUserResponse> {
  const response = await axios.get(apiBaseUrl + '/api/user');

  return response.data;
}

export async function logoutRequest(): Promise<void> {
  await axios.post(apiBaseUrl + '/logout');
}

export async function getProductsRequest(queryParams?: any): Promise<GetProductsResponse> {
  const queryString = queryParams ? '?' + qs.stringify(queryParams) : "";

  const response = await axios.get(apiBaseUrl + `/api/products${queryString}`);

  return response.data;
}