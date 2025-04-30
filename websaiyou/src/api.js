import axios from 'axios';

const API_URL = 'https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/jobDatas'; // Thay bằng URL MockAPI của bạn

export const fetchJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};