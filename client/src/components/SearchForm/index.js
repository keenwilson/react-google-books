import React from "react";
import "./style.css";

function SearchForm({ q, handleInputChange, handleFormSubmit }) {
  return (
    <form className="form-inline" role="form">
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="Title" className="sr-only">
          Search Book Title
        </label>
        <input
          className="form-control heading-subtitle "
          id="Title"
          type="text"
          value={q}
          placeholder="Book Title..."
          name="q"
          onChange={handleInputChange}
          size="55"
          required
        />
      </div>
      <button
        onClick={handleFormSubmit}
        type="submit"
        className="btn btn-lg search-button heading-subtitle"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
