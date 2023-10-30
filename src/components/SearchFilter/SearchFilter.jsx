import css from './SearchFilter.module.css';

export const SearchFilter = ({ value, onChange }) => (
  <label>
    Find contacts by name
    <input
      className={css.searchInput}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);
