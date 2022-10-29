import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ allPhotos, shownBigImgId, onClick }) {
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  useEffect(() => {
    const modalImg = allPhotos.find(({ id }) => id === shownBigImgId);
    setLargeImageURL(modalImg.largeImageURL);
  }, [allPhotos, shownBigImgId]);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClick();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalBox>
        <img src={largeImageURL} alt="yoursearch" />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  allPhotos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  shownBigImgId: PropTypes.number.isRequired,
};
