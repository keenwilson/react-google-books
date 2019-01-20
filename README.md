# react-google-books

A `React`-based Google Books Search app

## Technologies used
- Create `React components`
- Work with helper/util functions,
- Utilize `React lifecycle methods` to query and display books based on user searches
- Use `Node`, `Express` and `MongoDB` so that users can save books to review or purchase later

---

A working version of the application can be found at [https://react-googlebooks.herokuapp.com/](https://react-googlebooks.herokuapp.com/ "React Google Books Search")

---
## What This Application Does

![Search books](./screenshots/screenshot-search.png)
* Search - User can search for books via the `Google Books API` and render them here. User has the option to "View" a book, bringing them to the book on Google Books, or "Save" a book, saving it to the `Mongo` database.

![Save books](./screenshots/screenshot-saved.png)
* Saved - Renders all books saved to the `Mongo` database. User has an option to "View" the book, bringing them to the book on Google Books, or "Delete" a book, removing it from the `Mongo` database.
