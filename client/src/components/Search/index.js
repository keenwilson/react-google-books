import React, { Component } from "react";
import "./style.css";
import SearchBox from "../common/searchBox";

class Search extends Component {
  state = {};

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8 col-centered">
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-center align-items-center">
              <div class="p-2 bd-highlight">
                <img
                  className="image-250"
                  src="/images/img-books-window.jpg"
                  alt="React Google Books Search"
                />
              </div>
              <div class="p-2 bd-highlight">
                <h1 className="heading-title"> React Google Books Search</h1>
                <SearchBox
                  value={this.searchQuery}
                  onChange={this.handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
