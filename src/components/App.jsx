import React, { Component } from 'react';

import { nanoid } from 'nanoid';

import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { ContactList } from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitData = data => {
    const currentContact = this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === data.name.toLowerCase() ||
        contact.number === data.number
    );
    if (currentContact) {
      alert(
        `${currentContact.name} or ${currentContact.number} is already in your contacts`
      );

      return;
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitData} />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 && (
          <SearchFilter value={filter} onChange={this.changeFilter} />
        )}

        {this.filterContacts().length > 0 ? (
          <>
            {' '}
            <ContactList
              contacts={this.filterContacts()}
              onDelete={this.deleteContacts}
            />
          </>
        ) : (
          <p>you dont have contacts</p>
        )}
      </div>
    );
  }
}
export default App;
