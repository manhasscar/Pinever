import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  AuthProvider.propTypes = {
    children: PropTypes.node,
  };

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};
