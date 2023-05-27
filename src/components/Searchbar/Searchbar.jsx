import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';

const Searchbar = ({ handleSubmit }) => {
  const [userRequest, setUserRequest] = useState('');

  const handleChange = event => {
    setUserRequest(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!userRequest) {
      Notify.failure('Search field is empty!!!');
      return;
    }
    handleSubmit(userRequest);
    setUserRequest('');
  };

  return (
    <header className={css.Searchbar} onSubmit={onSubmit}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
