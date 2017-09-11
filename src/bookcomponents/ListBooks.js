import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import OpenSearch from "./OpenSearch";


class ListBooks extends Component{

    static SHELF = {
        cr : "currentlyReading",
        r : "read",
        wr : "wantToRead"
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleShelfChange : PropTypes.func.isRequired
    };

    filterBooksForShelf = (shelf) => {
        const {books} = this.props;
        return books.filter((book) => (book.shelf === shelf))
    }

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h2>My Reads</h2>
                </div>
                <div className="list-books-content">
                    <BookShelf
                        title="Currently Reading"
                        books={this.filterBooksForShelf(ListBooks.SHELF.cr)}
                        handleShelfChange={this.props.handleShelfChange}
                    />
                    <BookShelf
                        title="Want to Read"
                        books={this.filterBooksForShelf(ListBooks.SHELF.wr)}
                        handleShelfChange={this.props.handleShelfChange}
                    />
                    <BookShelf
                        title="Read"
                        books={this.filterBooksForShelf(ListBooks.SHELF.r)}
                        handleShelfChange={this.props.handleShelfChange}
                    />
                </div>
                <OpenSearch/>
            </div>
        )

    }
}

export default ListBooks;