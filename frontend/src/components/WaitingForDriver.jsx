import React from 'react';

const WaitingForDriver = ({ ride, waitingForDriver }) => {
  return (
    <div className="p-4 relative">
      {/* Header - Close Button */}
      <button
        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl text-gray-400"
        onClick={() => waitingForDriver(false)}
        aria-label="Hide Waiting Screen"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Driver Info */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Driver and Vehicle"
        />
        <div className="text-right">
          <h2 className="text-lg font-semibold capitalize">{ride?.captain?.fullname?.firstname}</h2>
          <h4 className="text-xl font-bold text-gray-700 -mt-1">{ride?.captain?.vehicle?.plate}</h4>
          <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
          <h1 className="text-xl font-bold mt-1">{ride?.otp}</h1>
        </div>
      </div>

      {/* Ride Info */}
      <div className="flex flex-col gap-4">
        <InfoBlock
          icon="ri-map-pin-user-fill"
          title="Pickup"
          subtitle={ride?.pickup}
        />
        <InfoBlock
          icon="ri-map-pin-2-fill"
          title="Destination"
          subtitle={ride?.destination}
        />
        <InfoBlock
          icon="ri-currency-line"
          title={`₹${ride?.fare}`}
          subtitle="Cash"
        />
      </div>
    </div>
  );
};

// Reusable component for ride info sections
const InfoBlock = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-4 p-3 border-b last:border-b-0">
    <i className={`${icon} text-xl text-gray-700`} />
    <div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 -mt-1">{subtitle}</p>
    </div>
  </div>
);

export default WaitingForDriver;
