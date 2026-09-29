import { apiClient } from "./api-client.js";

export async function getApiHealth() {
  const response = await apiClient.get('/api/health');

  console.log('[API CLIENT] - GET /api/health: ', response);

  return response;
}

export async function getApiData() {
  const response = await apiClient.get(
    '/api/data',
    { 'x-api-key': 'F1qHISGk6cwnrRea1dAaSdhevVnVTFhgLHlmaohvibN6SZ' }

  );

  console.log('[API CLIENT] - GET /api/data: ', response);

  return response;
}

export async function postApiData() {
  const response = await apiClient.post(
    '/api/data',
    {}
  );

  console.log('[API CLIENT] - POST /api/data: ', response);

  return response;
}