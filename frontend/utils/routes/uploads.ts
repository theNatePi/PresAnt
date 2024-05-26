import Backend from './axios';

/*
  fetches all the events data
*/
const uploadICSFile = async (userID, filecontents) => {
  const requestBody = {
    student_id: userID,
    ics_text: filecontents,
  };

  // Perform a POST request to the endpoint with the username and password in the body
  const response = await Backend.post('/uploadics/', requestBody);
  // Return the response data
  return response.data;
};

export { uploadICSFile };
