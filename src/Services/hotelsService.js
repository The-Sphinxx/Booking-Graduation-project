import axios from 'axios';

const API_URL = 'http://localhost:3001';

export default {
    async getHotels() {
        try {
            const response = await axios.get(`${API_URL}/hotels`);
            return response.data;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            throw error;
        }
    },

    async getHotelById(id) {
        try {
            const response = await axios.get(`${API_URL}/hotels/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching hotel with id ${id}:`, error);
            throw error;
        }
    },

    async searchHotels(filters) {
        try {
            let query = `${API_URL}/hotels?`;

            // Basic filtering examples - adjust based on json-server capabilities or custom logic
            if (filters.city) {
                query += `city_like=${filters.city}&`;
            }
            // Note: json-server basic filtering might not handle complex ranges or array intersections perfectly without custom routes or client-side filtering.
            // We will fetch all and filter in store if complex logic is needed, or try to use json-server params where possible.

            const response = await axios.get(query);
            return response.data;
        } catch (error) {
            console.error('Error searching hotels:', error);
            throw error;
        }
    }
};
