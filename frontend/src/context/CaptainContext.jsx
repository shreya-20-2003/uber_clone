import { createContext, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

export const CaptainDataContext = createContext();

/**
 * Provider for Captain data context.
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 */
const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = useMemo(() => ({
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  }), [captain, isLoading, error]);

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

CaptainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainProvider;
