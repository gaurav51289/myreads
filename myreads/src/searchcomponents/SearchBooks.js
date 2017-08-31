import React, {Component} from "react";
import Book from "../bookcomponents/Book";
import {Link} from "react-router-dom";
import * as BookAPI from "../API/BookAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {

    static MAX_RESULTS = 15;

    static propTypes = {
        handleBookAddition: PropTypes.func.isRequired,
        booksOnShelf: PropTypes.array
    };

    state = {
        searchedBooks: [],
        query: ""
    };

    handleQueryChange = (query) => {
        this.setState((state) => {
            state.query = query.trim();
        });

        BookAPI.search(query, SearchBooks.MAX_RESULTS).then((books) => {

            const {booksOnShelf} = this.props;

            this.setState((state) => {
                if (!books) {
                    books = [];
                } else if (books.hasOwnProperty("error")) { //handles the error response from the api
                    books = [];
                }

                state.searchedBooks = books.map((book) => {

                    let found = false;

                    let shelfIndex = booksOnShelf.findIndex((bookOnShelf) => {
                                        if (bookOnShelf.id === book.id) {
                                            found = true;
                                            return bookOnShelf;
                                        }
                                        return -1;
                                    });

                    if(found){
                        return booksOnShelf[shelfIndex];
                    } else {
                        return book;
                    }
                });
            });
        });
    };

    addToShelf = (bookSelected, shelf) => {
        let {searchedBooks} = this.state;
        searchedBooks.forEach((book) => {
            if (book.id === bookSelected.id) {
                book.shelf = shelf;
            }
        });
        this.setState((state) => {
            state.searchedBooks = searchedBooks;
        });
        BookAPI.update(bookSelected, shelf);
        this.props.handleBookAddition(bookSelected, shelf);
    }


    render() {

        const {searchedBooks, query} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => {
                                this.handleQueryChange(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchedBooks.map((bookDetails) => (
                                <li key={bookDetails.id}>
                                    <Book
                                        details={bookDetails}
                                        handleShelfChange={this.addToShelf}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );

    }
}

export default SearchBooks;