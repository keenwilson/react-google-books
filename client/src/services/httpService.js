import axios from "axios";
import logger from "./logService";

// Whenever we have an response with an error, this function will be called first and then the controller will pass to a catch block
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // Unexpected (network down, server down, database down, bug)
    // - Log them
    // - Display a generic and friendly error message
    logger.log(error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
