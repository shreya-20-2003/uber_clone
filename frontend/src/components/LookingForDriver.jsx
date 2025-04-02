import React from 'react';
import PropTypes from 'prop-types';

const LookingForDriver = ({ setVehicleFound, pickup, destination, fare, vehicleType }) => {
    return (
        <div className="relative text-center">
            <h5 className="p-1 w-[93%] absolute top-0 cursor-pointer" onClick={() => setVehicleFound(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

            <div className="flex flex-col items-center gap-2">
                <img
                    className="h-20"
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                    alt="Car"
                />

                <div className="w-full mt-5">
                    {/* Pickup Location */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{pickup}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Pickup Location</p>
                        </div>
                    </div>

                    {/* Destination Location */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{destination}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Destination</p>
                        </div>
                    </div>

                    {/* Fare Section */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{fare?.[vehicleType] || 'N/A'}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes validation
LookingForDriver.propTypes = {
    setVehicleFound: PropTypes.func.isRequired,
    pickup: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    fare: PropTypes.object.isRequired,
    vehicleType: PropTypes.string.isRequired,
};

export default LookingForDriver;
