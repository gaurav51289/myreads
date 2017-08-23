import React, {Component} from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";


class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    };

    render() {

        let contactsToShow;

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            contactsToShow = this.props.contacts.filter((contact) => (match.test(contact.name)));
        } else {
            contactsToShow = this.props.contacts;
        }

        return (

            <div className="list-contacts">
                <div className="list-contacts">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search Contacts"
                        value={this.state.query}
                        onChange={(event) => {
                            this.updateQuery(event.target.value)
                        }}
                    />
                </div>
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
                            <button onClick={() => this.props.onDeleteContact(contact)}
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