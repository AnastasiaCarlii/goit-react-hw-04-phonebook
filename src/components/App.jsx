import { nanoid } from 'nanoid';

import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { ContactList } from './ContactList/ContactList';
import { useEffect, useState } from 'react';

const init = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? init
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitData = data => {
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === data.name.toLowerCase() ||
          contact.number === data.number
      )
    ) {
      return alert(
        `${data.name} or ${data.number} is already in your contacts`
      );
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitData} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <SearchFilter value={filter} onChange={changeFilter} />
      )}

      {filterContacts().length > 0 ? (
        <>
          {' '}
          <ContactList contacts={filterContacts()} onDelete={deleteContacts} />
        </>
      ) : (
        <p>you dont have contacts</p>
      )}
    </div>
  );
};
