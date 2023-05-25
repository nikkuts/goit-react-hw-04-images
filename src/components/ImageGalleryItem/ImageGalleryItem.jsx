import { useState } from "react";
import PropTypes from 'prop-types';
import Modal from "components/Modal/Modal";
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem ({id, webformatURL, largeImageURL}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

    return (
      <li className={css.item} key={id}>
        <img src={webformatURL} alt={id} 
        className={css.itemImage} onClick={openModal} />
        
        { isModalOpen && <Modal
        id={id}
        largeImageURL={largeImageURL}
        onClick={closeModal}
        />}  
      </li>
    )
};
  
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};