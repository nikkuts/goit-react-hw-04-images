import { useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types';
import { Circles } from  'react-loader-spinner';
import fetchFoto from "servise/api";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

export default function ImageGallery ({query, number}) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchFoto = async (que, num) => {
    setIsLoading(true);

    try {
      const {data} = await fetchFoto(que, num);

      if (num * 12 > data.totalHits) {
        alert("We're sorry, but you've reached the end of search results.");
        return;   
      }
      else if (data.hits.length === 0) {
        alert("Sorry, there are no images matching your search query. Please try again.");
      return;
      }
      setImages([...images, ...data.hits]); 
      } 
      catch (error) {
        alert("ERROR Sorry, there are no images matching your search query. Please try again."); 
      } 
      finally {
        setIsLoading(false);
      }
    };

    const cashedFunc = useCallback(handleFetchFoto, [images]);

  useEffect(() => {

    if (!query) {
      return;
    }
    cashedFunc(query, number);
  }, [query, number, cashedFunc]); 
    
    return (
      <div>
        {isLoading && <Circles/>}
      
      <ul className={css.imageGallery}>
      {images.map(({id, webformatURL, largeImageURL}) => (
      
      <ImageGalleryItem
      id={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      />
      ))}
      </ul>
      </div>
    );
};

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  };