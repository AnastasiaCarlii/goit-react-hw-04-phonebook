import { useState } from 'react';

import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [data, setData] = useState({
    name: '',
    number: '',
  });
  const { name, number } = data;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(data);
    setData({ name: '', number: '' });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          className={css.formInput}
          autoComplete="off"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Number
        <input
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          className={css.formInput}
          autoComplete="off"
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>

      <button className={css.submitBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
