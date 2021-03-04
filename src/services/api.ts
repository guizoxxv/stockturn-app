import axios from 'axios';
import { LoginCredentials } from '../shared/interfaces/loginCredentials.interface';
import { apiBaseUrl } from '../config';
import { GetUserResponse } from '../shared/components/getUserResponse.interface';
import { AuthData } from '../shared/interfaces/authData.interface';
import * as qs from 'query-string';
import { GetProductsResponse } from '../shared/interfaces/getProductsResponse.interface';
import { GetProductsQuery } from '../shared/interfaces/getProductsQuery.interface';

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

export async function getProductsRequest(
  link: string|null,
  queryParams?: GetProductsQuery,
): Promise<GetProductsResponse> {
  if (link) {
    const response = await axios.get(link);

    return response.data;
  }

  const queryString = queryParams ? '?' + qs.stringify(queryParams) : "";

  const response = await axios.get(apiBaseUrl + `/api/products${queryString}`);

  return response.data;
}