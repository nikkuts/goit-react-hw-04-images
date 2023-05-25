// import { useState } from "react";
import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button ({onClick}) {
  // const [number, setNumber] = useState(1);

      //  const handleClick = e => { 
      //   setNumber(number + 1); 
      //   onClick(number + 1); 
      // };

      const handleClick = e => {  
        onClick(); 
      };

    return (
        <button type="button" className={css.button} onClick={handleClick}>
          Load more        
        </button>
    )
};
  
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};