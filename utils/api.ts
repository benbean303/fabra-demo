import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Save the design to the database
export const saveDesign = async (designData: any) => {
  try {
    const response = await api.post('/save', designData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};