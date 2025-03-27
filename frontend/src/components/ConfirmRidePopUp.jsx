import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: { rideId: ride?._id, otp },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
                setConfirmRidePopupPanel(false);
                setRidePopupPanel(false);
                navigate('/captain-riding', { state: { ride } });
            }
        } catch (error) {
            console.error('Error starting ride:', error);
            alert('Failed to start ride. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* Close Button */}
            <h5 className="text-center text-gray-200 text-3xl cursor-pointer absolute top-0 w-full" 
                onClick={() => setRidePopupPanel(false)}>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold text-center mb-5">Confirm this ride to Start</h3>

            {/* Ride Details */}
            <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
                        alt="User" 
                    />
                    <h2 className="text-lg font-medium capitalize">
                        {ride?.user?.fullname?.firstname || 'User'}
                    </h2>
                </div>
                <h5 className="text-lg font-semibold">2.2 KM</h5>
            </div>

            {/* Ride Info */}
            <div className="w-full mt-5">
                {[{
                    icon: "ri-map-pin-user-fill",
                    title: "Pickup",
                    value: ride?.pickup,
                }, {
                    icon: "ri-map-pin-2-fill",
                    title: "Destination",
                    value: ride?.destination,
                }, {
                    icon: "ri-currency-line",
                    title: `₹${ride?.fare}`,
                    value: "Cash Payment",
                }].map((item, index) => (
                    <div key={index} className="flex items-center gap-5 p-3 border-b-2 last:border-b-0">
                        <i className={`${item.icon} text-lg`}></i>
                        <div>
                            <h3 className="text-lg font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* OTP Input & Buttons */}
            <div className="mt-6 w-full">
                <form onSubmit={submitHandler}>
                    <input 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        type="text" 
                        className="bg-gray-100 px-6 py-4 font-mono text-lg rounded-lg w-full mt-3" 
                        placeholder="Enter OTP" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className={`w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={loading}>
                        {loading ? 'Confirming...' : 'Confirm'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => {
                            setConfirmRidePopupPanel(false);
                            setRidePopupPanel(false);
                        }} 
                        className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;
