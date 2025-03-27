import React from 'react';

const ConfirmRide = ({ setConfirmRidePanel, pickup, destination, fare, vehicleType, setVehicleFound, createRide }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {/* Close Button */}
            <h5 className="p-2 text-center cursor-pointer" onClick={() => setConfirmRidePanel(false)}>
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold text-center mb-5">Confirm Your Ride</h3>

            {/* Image */}
            <div className="flex flex-col items-center">
                <img 
                    className="h-20 w-auto rounded-md"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                    alt="Ride Type"
                />
            </div>

            {/* Ride Details */}
            <div className="w-full mt-5">
                {/* Pickup Location */}
                <div className="flex items-center gap-4 p-3 border-b">
                    <i className="text-xl text-blue-600 ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">{pickup || "Unknown Pickup"}</h3>
                        <p className="text-sm text-gray-600">Pickup Location</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-4 p-3 border-b">
                    <i className="text-xl text-red-600 ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">{destination || "Unknown Destination"}</h3>
                        <p className="text-sm text-gray-600">Drop-off Location</p>
                    </div>
                </div>

                {/* Fare */}
                <div className="flex items-center gap-4 p-3">
                    <i className="text-xl text-green-600 ri-currency-line"></i>
                    <div>
                        <h3 className="text-lg font-medium">₹{fare?.[vehicleType] || "N/A"}</h3>
                        <p className="text-sm text-gray-600">Cash Payment</p>
                    </div>
                </div>
            </div>

            {/* Confirm Button */}
            <button
                onClick={() => {
                    setVehicleFound(true);
                    setConfirmRidePanel(false);
                    createRide();
                }}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 transition text-white font-semibold p-3 rounded-lg"
            >
                Confirm Ride
            </button>
        </div>
    );
};

export default ConfirmRide;
