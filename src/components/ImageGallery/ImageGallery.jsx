import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { Circles } from  'react-loader-spinner';
import fetchFoto from "servise/api";
import local from 'servise/localStorage';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

export default function ImageGallery ({query, number}) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const handleFetchFoto = async (que, num) => {
    setIsRender(false);
    
    if (num === 1) {
      setIsLoading(true);
      local.remove('imagesLocal');

    try {
      const {data} = await fetchFoto(que, num);

      if (data.hits.length === 0) {
        alert("Sorry, there are no images matching your search query. Please try again.");
      return;
      }
      setImages(data.hits);
      setIsRender(true);
      local.save('imagesLocal', data.hits); 
      } 
      catch (error) {
        alert("ERROR Sorry, there are no images matching your search query. Please try again."); 
      } 
      finally {
        setIsLoading(false);
      };
    }
    else {
      setIsLoading(true);

    try {
      const {data} = await fetchFoto(que, num);

      if (num * 12 > data.totalHits) {
        alert("We're sorry, but you've reached the end of search results.");
        return;   
      }
      const imgLocal = local.load('imagesLocal');
      setImages([...imgLocal, ...data.hits]);
      setIsRender(true);
      local.save('imagesLocal', [...imgLocal, ...data.hits]); 
      } 
      catch (error) {
        alert("ERROR Sorry, there are no images matching your search query. Please try again."); 
      } 
      finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {

    if (!query) {
      return;
    }
    handleFetchFoto (query, number) 
  }, [query, number]); 

   return (
    isRender &&
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