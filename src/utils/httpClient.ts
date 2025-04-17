import axios, { AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string, apiKey: string): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
}