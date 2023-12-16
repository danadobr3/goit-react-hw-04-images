import axios from 'axios';

const API_KEY = '41130723-c22d0761764fa8f266f369360';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}