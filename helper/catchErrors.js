export function catchErrors(error, displayError) {
  let errorMeg;
  if (error.response) {
    // The request was made and the server responsed with a status code that is not in the range of 2XX.
    errorMeg = error.response.data;
    console.error('Error Response', errorMeg);

    //  For Cloudinary image uploads
    if (error.response.data.error) {
      errorMeg = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response received.
    errorMeg = error.request;
    console.error('Error Request', errorMeg);
  } else {
    // Something else happened in making the request that triggered the error
    errorMeg = error.message;
    console.error('Error Message', errorMeg);
  }

  displayError(errorMeg);
}
