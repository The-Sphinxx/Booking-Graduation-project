// services/bookingService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const bookingService = {
    /**
     * Create a new booking
     */
    async createBooking(bookingData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/bookings`, {
                ...bookingData,
                bookingDate: new Date().toISOString(),
                status: 'pending',
                bookingNumber: this.generateBookingNumber()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('Failed to create booking');
        }
    },

    /**
     * Get all bookings
     */
    async getAllBookings() {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`);
            return response.data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw new Error('Failed to fetch bookings');
        }
    },

    /**
     * Get booking by ID
     */
    async getBookingById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching booking ${id}:`, error);
            throw new Error('Failed to fetch booking details');
        }
    },

    /**
     * Get bookings by user
     */
    async getBookingsByUser(userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            throw new Error('Failed to fetch user bookings');
        }
    },

    /**
     * Get bookings by type
     */
    async getBookingsByType(type) {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                params: { type }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching bookings by type:', error);
            throw new Error('Failed to fetch bookings by type');
        }
    },

    /**
     * Update booking status
     */
    async updateBookingStatus(bookingId, status) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/bookings/${bookingId}`, {
                status,
                updatedAt: new Date().toISOString()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw new Error('Failed to update booking status');
        }
    },

    /**
     * Cancel booking
     */
    async cancelBooking(bookingId) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/bookings/${bookingId}`, {
                status: 'cancelled',
                cancelledDate: new Date().toISOString()
            });
            return response.data;
        } catch (error) {
            console.error('Error cancelling booking:', error);
            throw new Error('Failed to cancel booking');
        }
    },

    /**
     * Confirm booking payment
     */
    async confirmPayment(bookingId, paymentData) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/bookings/${bookingId}`, {
                status: 'confirmed',
                paymentStatus: 'paid',
                paymentData: {
                    ...paymentData,
                    paidAt: new Date().toISOString()
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw new Error('Failed to confirm payment');
        }
    },

    /**
     * Generate unique booking number
     */
    generateBookingNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `BK${timestamp}${random}`;
    },

    /**
     * Check availability for specific dates
     */
    async checkAvailability(itemId, type, dates) {
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                params: {
                    itemId,
                    type,
                    status: 'confirmed'
                }
            });

            const existingBookings = response.data;

            // Check if dates overlap with existing bookings
            // This is a simple implementation - you may need more complex logic
            const isAvailable = !existingBookings.some(booking => {
                const bookingStart = new Date(booking.startDate);
                const bookingEnd = new Date(booking.endDate);
                const requestStart = new Date(dates.startDate);
                const requestEnd = new Date(dates.endDate);

                return (requestStart >= bookingStart && requestStart <= bookingEnd) ||
                    (requestEnd >= bookingStart && requestEnd <= bookingEnd) ||
                    (requestStart <= bookingStart && requestEnd >= bookingEnd);
            });

            return { isAvailable, existingBookings };
        } catch (error) {
            console.error('Error checking availability:', error);
            throw new Error('Failed to check availability');
        }
    }
};

export default bookingService;