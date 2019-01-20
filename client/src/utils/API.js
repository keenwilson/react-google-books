import http from "../services/httpService";

export default {
  // Gets books from the Google API
  getBooks: function(q) {
    return http.get("/api/google", {
      params: { q: "title:" + q }
    });
  },
  // Gets all saved books
  getSavedBooks: function() {
    return http.get("/api//books");
  },
  // Deletes the saved book with the given id
  deleteBook: function(id) {
    return http.delete("/api//books/" + id);
  },
  // Saves an book to the database
  saveBook: function(bookData) {
    return http.post("/api//books", bookData);
  }
};
