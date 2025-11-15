import axios from 'axios';

const API_KEY = '53252560-1c4ffe9c456d309b0775dfd67';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get('', { params });
  return response.data;
}
