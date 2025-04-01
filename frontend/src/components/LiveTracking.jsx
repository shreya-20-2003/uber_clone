import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = { lat: -3.745, lng: -38.523 };

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);

    useEffect(() => {
        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        };

        const handleError = (error) => {
            console.error('Geolocation error:', error);
        };

        // Get initial position
        navigator.geolocation.getCurrentPosition(updatePosition, handleError);

        // Watch for position updates
        const watchId = navigator.geolocation.watchPosition(updatePosition, handleError);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={15}>
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
