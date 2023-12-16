import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/services';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import Notiflix from 'notiflix';

import cssapp from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        const { totalHits, hits } = await fetchImages(query, page);

        setItems((prevItems) => (page === 1 ? hits : [...prevItems, ...hits]));
        setTotalHits(totalHits);
      
      } catch (error) {
        
      } finally {
        setLoadingMore(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSubmit = async (newQuery) => {
    if (newQuery.trim() === '') {
      Notiflix.Notify.info('You cannot search by an empty field, try again.');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setItems([]);
    setLoadingMore(false);
  };


  const onNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(true);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={cssapp.App}>
      <Searchbar onSubmit={handleSubmit} />
      {items.length > 0 && (
        <ImageGallery page={page} items={items} openModal={openModal} />
      )}
      {loadingMore && <Loader />}
      {items.length === 0 && <p>No results found.</p>}
      {totalHits > items.length && totalHits > 12 && !loadingMore && (
        <Button type="button" onClick={onNextPage} />
      )}
      {modalImage && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
};



export default App;