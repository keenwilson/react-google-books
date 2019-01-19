import http from "../services/httpService";
import { apiUrl } from "../config.json";

export default {
  // Gets books from the Google API
  getBooks: function(q) {
    return http.get(apiUrl + "/google", { params: { q: "title:" + q } });
  },
  // Gets all saved books
  getSavedBooks: function() {
    return http.get(apiUrl + "/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function(id) {
    return http.delete(apiUrl + "/books/" + id);
  },
  // Saves an book to the database
  saveBook: function(bookData) {
    return http.post(apiUrl + "/books", bookData);
  }
};
