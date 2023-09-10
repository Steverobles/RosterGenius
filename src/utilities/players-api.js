import sendRequest from "./send-request";
const BASE_URL = '/api/players';

export async function getAll() {
  return sendRequest(BASE_URL);
}


export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function createRoster(rosterData) {
    const response = await fetch(`${BASE_URL}/rosters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rosterData),
    });
  
    if (!response.ok) {
      throw new Error(`Error creating roster: ${response.statusText}`);
    }
  
    return response.json();
  }
  