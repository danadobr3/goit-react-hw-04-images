import React, { useEffect } from 'react';

import cssmodal from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const keyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  const onOverlayClose = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={onOverlayClose} className={cssmodal.Overlay}>
      <div className={cssmodal.Modal}>
        <img src={image.largeImageURL} alt="img" />
      </div>
    </div>
  );
};



export default Modal;