import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29607217-805863a5c8e578a841483d4f2';

export const fetchPhotos = async (query, page) => {
  const response = await axios.get(`?`, {
    params: {
      q: `${query}`,
      page: `${page}`,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    }
  })
  return response.data;
}

