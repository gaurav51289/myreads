import React, {Component} from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component{

    static propTypes = {
        title : PropTypes.string.isRequired,
        books : PropTypes.array.isRequired,
        handleShelfChange : PropTypes.func.isRequired
    }

    render() {
        const {books} = this.props;
        return(
            <div>
                <div className="bookshelf">
                    <h3 className="bookshelf-title">{this.props.title}</h3>
                </div>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((bookDetails) => (
                                <li key={bookDetails.id}>
                                    <Book
                                        details={bookDetails}
                                        handleShelfChange={this.props.handleShelfChange}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;