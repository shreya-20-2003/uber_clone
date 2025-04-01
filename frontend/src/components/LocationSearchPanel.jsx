import React from 'react';

const LocationSearchPanel = React.memo(({ 
    suggestions = [], 
    setVehiclePanel, 
    setPanelOpen, 
    setPickup, 
    setDestination, 
    activeField 
}) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else if (activeField === 'destination') {
            setDestination(suggestion);
        }
        setVehiclePanel(true);
        setPanelOpen(false);
    };

    return (
        <div>
            {suggestions.length > 0 ? (
                suggestions.map((elem, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleSuggestionClick(elem)} 
                        onKeyPress={(e) => e.key === 'Enter' && handleSuggestionClick(elem)}
                        role="button" 
                        tabIndex={0}
                        className='flex gap-4 border-2 p-3 border-gray-200 hover:border-black rounded-xl items-center my-2 cursor-pointer transition-all duration-200 ease-in-out'
                    >
                        <h2 className='bg-gray-200 h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium text-gray-700'>{elem}</h4>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-sm mt-2">No suggestions available.</p>
            )}
        </div>
    );
});

export default LocationSearchPanel;
