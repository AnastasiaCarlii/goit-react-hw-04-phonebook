import css from './ContactListItem.module.css';

export const ContactListItem = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.listItem}>
      <span className={css.contactItem}>
        {name}:{number}
      </span>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};
