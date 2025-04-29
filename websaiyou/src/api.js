import axios from 'axios';

const API_URL = 'https://67e24f6897fc65f535355b9b.mockapi.io/jobs'; // Thay bằng URL MockAPI của bạn

export const fetchJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};