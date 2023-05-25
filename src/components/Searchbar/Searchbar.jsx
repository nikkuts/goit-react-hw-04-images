import { useState } from "react";
import PropTypes from 'prop-types';
import {ImSearch} from 'react-icons/im'; 
import css from './Searchbar.module.css';

export default function Searchbar ({onSubmit}) {
  const [query, setQuery] = useState('');
  
  const handleChange = e => {
    setQuery(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if (query.trim() === '') {
      alert('Enter a search word');
      return;
    }
    onSubmit(query);
    setQuery(''); 
  };

    return (
        <header className={css.searchbar} onSubmit={handleSubmit}>
            <form className={css.searchForm}>
                <button type="submit" className={css.button}>
                  <ImSearch />
                <span className={css.buttonLabel}>Search</span>
                </button>

                <input
                className={css.input}
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
                onChange={handleChange}
                />
            </form>
        </header>
        );
};
  
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};