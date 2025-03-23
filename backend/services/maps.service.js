const axios = require('axios');
const captainModel = require('../models/captain.model');

const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

if (!GOOGLE_MAPS_API) {
    throw new Error('Missing Google Maps API key in environment variables');
}

/**
 * Fetches coordinates for a given address.
 * @param {string} address - Address to fetch coordinates for.
 * @returns {Promise<{ lat: number, lng: number }>} - Latitude and longitude.
 */
module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API}`;
    
    try {
        const response = await axios.get(url);
        
        if (response.data.status !== 'OK') {
            throw new Error(`Geocoding API error: ${response.data.status}`);
        }
        
        const location = response.data.results[0]?.geometry?.location;
        if (!location) throw new Error('No location found');

        return { lat: location.lat, lng: location.lng };
    } catch (error) {
        console.error('Error fetching address coordinates:', error.message);
        throw error;
    }
};

/**
 * Fetches distance and estimated travel time between two locations.
 * @param {string} origin - Origin address.
 * @param {string} destination - Destination address.
 * @returns {Promise<object>} - Distance and duration.
 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error('Both origin and destination are required');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API}`;
    
    try {
        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            throw new Error(`Distance Matrix API error: ${response.data.status}`);
        }

        const result = response.data.rows[0]?.elements[0];
        if (!result || result.status === 'ZERO_RESULTS') {
            throw new Error('No routes found');
        }

        return result;
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw error;
    }
};

/**
 * Fetches autocomplete suggestions for a given input.
 * @param {string} input - Partial address or place query.
 * @returns {Promise<string[]>} - List of place suggestions.
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) throw new Error('Query input is required');

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API}`;
    
    try {
        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            throw new Error(`Autocomplete API error: ${response.data.status}`);
        }

        return response.data.predictions.map(prediction => prediction.description).filter(Boolean);
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw error;
    }
};

/**
 * Fetches captains within a given radius.
 * @param {number} lat - Latitude of the center point.
 * @param {number} lng - Longitude of the center point.
 * @param {number} radius - Search radius in km.
 * @returns {Promise<object[]>} - List of captains in the area.
 */
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    if (typeof lat !== 'number' || typeof lng !== 'number' || typeof radius !== 'number') {
        throw new Error('Latitude, longitude, and radius must be numbers');
    }

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lat, lng], radius / 6371] // Convert radius from km to radians
                }
            }
        });

        return captains;
    } catch (error) {
        console.error('Error fetching captains in radius:', error.message);
        throw error;
    }
};