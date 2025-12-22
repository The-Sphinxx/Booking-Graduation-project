// Services/hotelsApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const hotelsApi = {
    // Get all hotels
    async getAllHotels() {
        try {
            const response = await axios.get(`${API_BASE_URL}/hotels`);
            return response.data;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            throw new Error('Failed to fetch hotels');
        }
    },

    // Get hotel by ID
    async getHotelById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/hotels/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching hotel ${id}:`, error);
            throw new Error('Failed to fetch hotel details');
        }
    },

    // Get top rated hotels
    async getTopRatedHotels(limit = 4) {
        try {
            const response = await axios.get(`${API_BASE_URL}/hotels`, {
                params: {
                    _sort: 'rating',
                    _order: 'desc',
                    _limit: limit
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching top rated hotels:', error);
            throw new Error('Failed to fetch top rated hotels');
        }
    }
};

export default hotelsApi;
