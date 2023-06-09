import { useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import css from './App.module.css';

export default function App () {
  const [query, setQuery] = useState('');
  const [number, setNumber] = useState(1);

  const handleFormSubmit = query => {
    setQuery(query);
    setNumber(1);
  };
  
  const handleButtonClick = () => {
    setNumber(number + 1);
  };

    return (
      <div className={css.app}>
        <Searchbar 
        onSubmit={handleFormSubmit}
        />
        <ImageGallery 
        query={query}
        number={number}
        />
        {query !== '' && 
        <Button 
        onClick={handleButtonClick}
        />}
      </div>
    );
};
