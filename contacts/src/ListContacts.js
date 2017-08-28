import React, {Component} from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import { Link } from "react-router-dom";


class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    constructor(){
        super();

        this.state = {
            query: ''
        };
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    };

    clearQuery = () => {
        this.setState({
           query: ''
        });
    }

    filterContacts = (query) => {
        const {contacts} = this.props;
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            return contacts.filter((contact) => (match.test(contact.name)));
        } else {
            return contacts;
        }
    };

    render() {

        const {onDeleteContact, contacts} = this.props;
        const {query} = this.state;

        let contactsToShow = this.filterContacts(query);

        return (

            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search Contacts"
                        value={query}
                        onChange={(event) => {
                            this.updateQuery(event.target.value)
                        }}
                    />
                    <Link
                        to="/create"
                        className="add-contact"
                    >Add Contact</Link>
                </div>

                {contactsToShow.length !== contacts.length &&
                    <div className="showing-contacts">
                        <span>Now showing {contactsToShow.length} of {contacts.length} contacts.</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                }

                <ol className='contact-list'>
                    {contactsToShow.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)}
                                    className="contact-remove">Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>


        )
    }
}


export default ListContacts;