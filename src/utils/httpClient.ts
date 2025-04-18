import axios, { AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string, apiKey: string): AxiosInstance {
  console.error('Creating HTTP client with baseURL:', baseURL, 'and apiKey:', apiKey);
  return axios.create({
    baseURL,
    headers: {
      'apiKey': apiKey,
      'Content-Type': 'application/json',
    },
  });
}