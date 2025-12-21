import apiService from './apiService';

export const getHomePageData = async () => {
  const response = await apiService.get('/Home');
  return response.data;
};

export default {
  getHomePageData,
};
