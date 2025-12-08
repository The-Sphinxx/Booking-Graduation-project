import { defineStore } from 'pinia';
import hotelsService from '../Services/hotelsService';

export const useHotelsStore = defineStore('hotels', {
    state: () => ({
        hotels: [],
        selectedHotel: null,
        loading: false,
        error: null,
        // Booking State
        currentBooking: {
            step: 1,
            hotelId: null,
            roomType: null,
            roomPrice: 0,
            checkIn: '',
            checkOut: '',
            guests: 2,
            roomsCount: 1,
            addOns: [], // e.g., { name: 'Breakfast', price: 20 }
            guestDetails: {
                fullName: '',
                email: '',
                phone: '',
                specialRequests: ''
            },
            paymentDetails: {
                method: 'card', // or 'hotel'
                cardNumber: '',
                expiry: '',
                cvv: ''
            },
            isConfirmed: false,
            confirmationCode: null
        }
    }),

    actions: {
        async fetchHotels() {
            this.loading = true;
            this.error = null;
            try {
                this.hotels = await hotelsService.getHotels();
            } catch (err) {
                this.error = err.message || 'Failed to fetch hotels';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async fetchHotel(id) {
            this.loading = true;
            this.error = null;
            try {
                this.selectedHotel = await hotelsService.getHotelById(id);
                // Initialize booking state with hotel price if needed
                this.currentBooking.hotelId = id;
            } catch (err) {
                this.error = 'Failed to fetch hotel details';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async searchHotels(filters) {
            this.loading = true;
            try {
                let results = await hotelsService.getHotels();

                if (filters.minPrice) {
                    results = results.filter(h => h.price >= filters.minPrice);
                }
                if (filters.maxPrice) {
                    results = results.filter(h => h.price <= filters.maxPrice);
                }
                if (filters.rating) {
                    results = results.filter(h => h.rating >= filters.rating);
                }
                if (filters.amenities && filters.amenities.length > 0) {
                    results = results.filter(h =>
                        filters.amenities.every(amenity => h.facilities.includes(amenity))
                    );
                }

                this.hotels = results;
            } catch (err) {
                this.error = 'Failed to search hotels';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        // Booking Actions
        setBookingStep(step) {
            this.currentBooking.step = step;
        },

        updateBookingData(data) {
            this.currentBooking = { ...this.currentBooking, ...data };
        },

        async confirmBooking() {
            this.loading = true;
            try {
                // Mock API call to save booking
                // In real app: await hotelsService.createBooking(this.currentBooking);

                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                this.currentBooking.isConfirmed = true;
                this.currentBooking.confirmationCode = 'BK' + Date.now().toString().slice(-8);
                this.currentBooking.step = 4;
            } catch (err) {
                this.error = 'Failed to confirm booking';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        resetBooking() {
            this.currentBooking = {
                step: 1,
                hotelId: null,
                roomType: null,
                roomPrice: 0,
                checkIn: '',
                checkOut: '',
                guests: 2,
                roomsCount: 1,
                addOns: [],
                guestDetails: {
                    fullName: '',
                    email: '',
                    phone: '',
                    specialRequests: ''
                },
                paymentDetails: {
                    method: 'card',
                    cardNumber: '',
                    expiry: '',
                    cvv: ''
                },
                isConfirmed: false,
                confirmationCode: null
            };
        }
    }
});
