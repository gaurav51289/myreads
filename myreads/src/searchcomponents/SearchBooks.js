import React, {Component} from "react";
import Book from "../bookcomponents/Book";
import {Link} from "react-router-dom";
import * as BookAPI from "../API/BookAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {

    static MAX_RESULTS = 15;

    static propTypes = {
        handleBookAddition : PropTypes.func.isRequired
    }

    state = {
        books : [],
        query : ""
    }

    handleQueryChange = (query) => {
        this.setState((state) => {
            state.query = query.trim();
        })

        BookAPI.search(query, SearchBooks.MAX_RESULTS).then((books) => {
            this.setState((state) => {

                if(!books){
                    books = [];
                } else if(books.hasOwnProperty("error")){
                    books = [];
                }
                state.books = books;
                console.log(books);
            });
        });
    }

    addToShelf = (bookSelected, shelf) => {
        var {books} = this.state;
        books.forEach((book) => {
            if(book.id === bookSelected.id){
                book.shelf = shelf;
            }
        });
        this.setState((state) => {
            state.books = books;
        });
        BookAPI.update( bookSelected, shelf);
        this.props.handleBookAddition(bookSelected, shelf);
    }



    render() {

        const {books, query} = this.state;

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
                            books.map((bookDetails) => (
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