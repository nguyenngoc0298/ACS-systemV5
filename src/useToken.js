import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };
    
  const [token, setToken] = useState(getToken());
    
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const getName = () => {
      const nameString = localStorage.getItem('name');
      const name = JSON.parse(nameString);
      return name
  };

  const agencyId = () => {
    const agencyIdString = localStorage.getItem('agencyId');
    const agencyId = JSON.parse(agencyIdString);
    return agencyId
};

  return {
    setToken: saveToken,
    token,
    getName,
    agencyId
  }
}