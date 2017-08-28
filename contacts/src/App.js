import React, {Component} from "react";
import {Route} from "react-router-dom";
import ListContacts from "./ListContacts";
import * as ConatactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";


class App extends Component {

    state = {
        contacts: []
    }

    componentDidMount(){
        ConatactsAPI.getAll().then((contacts) => {
            this.setState({contacts});
        })
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts : state.contacts.filter((c) => (c.id !== contact.id))
        }))
        ConatactsAPI.remove(contact)
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => {
                    return(
                        <ListContacts
                            contacts={this.state.contacts}
                            onDeleteContact={this.removeContact}
                        />
                    )
                }}/>
                <Route path="/create" component={CreateContact}/>
            </div>
        )
    }
}

export default App;
