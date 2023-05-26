import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal ({id,largeImageURL, onClick}) {
  
  const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => {window.removeEventListener('keydown', keyDown);}
  }, [onClick])

    return (
        <div className={css.overlay} onClick={onBackdropClose}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={id} />
        </div>
      </div>
    );
};
  
Modal.propTypes = {
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};