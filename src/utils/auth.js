import decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    const checkToken = decode(token);
    if (checkToken.exp < new Date().getTime() / 1000) {
      throw new Error('Token has expired!');
    }
  } catch (err) {
    return false;
  }

  return true;
};

export const deleteToken = () => {
  localStorage.removeItem('token');
};
