import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import cssgallery from './ImageGallery.module.css'


const ImageGallery = ({ items, openModal }) => {
  return (
    <>
      <ul className={cssgallery.ImageGallery}>
        {items.map((item) => (
          <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;

