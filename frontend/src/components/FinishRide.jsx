import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = ({ ride, setFinishRidePanel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const endRide = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                { rideId: ride?._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                navigate('/captain-home');
            }
        } catch (error) {
            console.error("Error ending ride:", error);
            alert("Failed to finish the ride. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-white rounded-lg shadow-lg">
            <button
                className="p-1 text-center w-full absolute top-0"
                aria-label="Close Finish Ride Panel"
                onClick={() => setFinishRidePanel(false)}
            >
                <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </button>

            <h3 className="text-2xl font-semibold mb-5 text-center">Finish this Ride</h3>

            <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt="User Avatar"
                    />
                    <h2 className="text-lg font-medium">{ride?.user?.fullname?.firstname || "Guest"}</h2>
                </div>
                <h5 className="text-lg font-semibold">2.2 KM</h5>
            </div>

            <div className="w-full mt-5 space-y-3">
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-user-fill text-xl"></i>
                    <div>
                        <h3 className="text-lg font-medium">Pickup</h3>
                        <p className="text-sm text-gray-600">{ride?.pickup || "N/A"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-2-fill text-xl"></i>
                    <div>
                        <h3 className="text-lg font-medium">Destination</h3>
                        <p className="text-sm text-gray-600">{ride?.destination || "N/A"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-3">
                    <i className="ri-currency-line text-xl"></i>
                    <div>
                        <h3 className="text-lg font-medium">₹{ride?.fare || "0.00"}</h3>
                        <p className="text-sm text-gray-600">Cash Payment</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 w-full">
                <button
                    onClick={endRide}
                    className="w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Finishing Ride..." : "Finish Ride"}
                </button>
            </div>
        </div>
    );
};

export default FinishRide;
