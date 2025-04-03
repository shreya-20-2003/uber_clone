import React from 'react';

const RidePopUp = ({ ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {
    return (
        <div className="relative bg-white shadow-lg rounded-lg p-5">
            {/* Close Button */}
            <h5 
                className="p-1 text-center w-[93%] absolute top-0 cursor-pointer" 
                onClick={() => setRidePopupPanel(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Ride Header */}
            <h3 className="text-2xl font-semibold mb-5 text-center">New Ride Available!</h3>

            {/* Driver Info */}
            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src={ride?.user?.profileImage || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} 
                        alt="Driver Profile"
                    />
                    <h2 className="text-lg font-medium">
                        {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                    </h2>
                </div>
                <h5 className="text-lg font-semibold">{ride?.distance || "N/A"} KM</h5>
            </div>

            {/* Ride Details */}
            <div className="w-full mt-5 space-y-3">
                {/* Pickup Location */}
                <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className="text-xl ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">Pickup Location</h3>
                        <p className="text-sm text-gray-600">{ride?.pickup || "Not specified"}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className="text-xl ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">Destination</h3>
                        <p className="text-sm text-gray-600">{ride?.destination || "Not specified"}</p>
                    </div>
                </div>

                {/* Fare */}
                <div className="flex items-center gap-5 p-3">
                    <i className="text-xl ri-currency-line"></i>
                    <div>
                        <h3 className="text-lg font-medium">₹{ride?.fare || "N/A"}</h3>
                        <p className="text-sm text-gray-600">Cash Payment</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2">
                <button 
                    className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg" 
                    onClick={() => {
                        setConfirmRidePopupPanel(true);
                        confirmRide();
                    }}
                >
                    Accept
                </button>
                
                <button 
                    className="w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
                    onClick={() => setRidePopupPanel(false)}
                >
                    Ignore
                </button>
            </div>
        </div>
    );
};

export default RidePopUp;
