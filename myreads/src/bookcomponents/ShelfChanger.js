import React, {Component} from "react";
import PropTypes from "prop-types";


class ShelfChanger extends Component{

    static propTypes = {
        currentShelf : PropTypes.string,
        handleShelfChange : PropTypes.func.isRequired
    }

    render(){
        return(
            <div className="book-shelf-changer">
                <select value={this.props.currentShelf} onChange={(event) => {
                    this.props.handleShelfChange(event.target.value);
                }}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ShelfChanger;