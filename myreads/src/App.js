import React, {Component} from 'react';
import './App.css';
import ListBooks from "./bookcomponents/ListBooks";
import {Route} from "react-router-dom";
import * as BookAPI from "./API/BookAPI";
import SearchBooks from "./searchcomponents/SearchBooks";

class App extends Component {

    state = {
        books:[]
    }

    componentDidMount(){

        BookAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        });

    }

    changeShelf = (bookid, newShelf) => {

        var books = this.state.books;

        books.forEach((book) => {
           if(book.id === bookid){
               book.shelf = newShelf;
           }
        });

        this.setState({
            books: books
        });

    }

    render() {
        return (
            <div>
                <Route exact path="/"
                       render={() => (
                           <ListBooks
                               books={this.state.books}
                               handleShelfChange={this.changeShelf}
                           />
                       )}
                />
                <Route path="/search"
                       render={() => (
                           <SearchBooks/>
                       )}
                />
            </div>

        );
    }
}

export default App;
