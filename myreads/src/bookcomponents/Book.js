import React, {Component} from "react";
import ShelfChanger from "./ShelfChanger";
import PropTypes from "prop-types";


class Book extends Component {

    static propTypes = {
        details: PropTypes.object.isRequired,
        handleShelfChange: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.setState({
            bookDetails: this.props.details
        });
    }

    handleShelfChange = (newShelf) => {
        const book = this.props.details;
        this.props.handleShelfChange(book, newShelf);
    }

    render() {
        const {details} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${details.imageLinks.thumbnail})`
                    }}/>
                    <ShelfChanger
                        currentShelf={this.props.details.shelf}
                        handleShelfChange={this.handleShelfChange}
                    />
                </div>
                <div className="book-title">{details.title}</div>
                <div className="book-authors">
                    {details.authors && details.authors}
                </div>
            </div>
        )
    }
}

export default Book;