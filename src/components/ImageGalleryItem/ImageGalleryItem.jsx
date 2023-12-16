import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';

import cssgallitem from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(!shownModal);
  };

  return (
    <li className={cssgallitem.ImageGalleryItem}>
      <img
        onClick={onModal}
        className={cssgallitem.ImageGalleryItem_image}
        src={item.webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};



export default ImageGalleryItem;