import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);

    return (
        <div className="p-5 bg-white shadow-md rounded-xl">
            {/* Captain Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-300" 
                        src={captain?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"} 
                        alt="Captain Profile"
                    />
                    <h4 className="text-lg font-semibold capitalize">
                        {captain?.fullname?.firstname || "Captain"} {captain?.fullname?.lastname || ""}
                    </h4>
                </div>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">
                        ₹{captain?.earnings?.toFixed(2) || "0.00"}
                    </h4>
                    <p className="text-sm text-gray-500">Total Earnings</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex p-4 mt-6 bg-gray-100 rounded-xl justify-around items-center">
                <div className="text-center">
                    <i className="text-3xl text-blue-600 ri-timer-2-line"></i>
                    <h5 className="text-lg font-semibold mt-1">{captain?.hoursOnline || "0.0"}</h5>
                    <p className="text-sm text-gray-500">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl text-green-600 ri-check-double-line"></i>
                    <h5 className="text-lg font-semibold mt-1">{captain?.completedRides || "0"}</h5>
                    <p className="text-sm text-gray-500">Completed Rides</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl text-yellow-500 ri-star-line"></i>
                    <h5 className="text-lg font-semibold mt-1">{captain?.rating || "N/A"}</h5>
                    <p className="text-sm text-gray-500">Average Rating</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;
