import Backend from './axios';

/*
  fetches all the events data
*/
const createAccount = async (username, password) => {
  const requestBody = {
    username: username,
    password: password,
  };

  // Perform a POST request to the endpoint with the username and password in the body
  const response = await Backend.post('/signup/', requestBody);
  // Return the response data
  return response.data;
};

const addPhotos = async (userId, happyImage, sadImage) => {
  const requestBody = {
    user_id: userId,
    happy_photo: happyImage,
    sad_photo: sadImage
  };

  // Perform a POST request to the endpoint with the username and password in the body
  const response = await Backend.post('/photo/', requestBody);
  // Return the response data
  return response.data;
};

const login = async (username, password) => {
  const requestBody = {
    username: username,
    password: password,
  };

  // Perform a POST request to the endpoint with the username and password in the body
  const response = await Backend.post('/login', requestBody);
  if (response.data.code != 200) {
    return 400;
  }
  // Return the response data
  return response.data;
};

export { createAccount, addPhotos, login };
