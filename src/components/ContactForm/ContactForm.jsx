import React, { Component } from 'react';

import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formContainer} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            className={css.formInput}
            autoComplete="off"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            required
          />
        </label>

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
