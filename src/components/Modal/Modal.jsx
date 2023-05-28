import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ imgAlt, imgBigUrl, closeModal }) => {
  useEffect(() => {
    const handlePressESC = event => {
      if (event.code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handlePressESC);

    return () => {
      document.removeEventListener('keydown', handlePressESC);
    };
  }, [closeModal]);

  const handleClick = event => {
    if (event.currentTarget === event.target) closeModal();
  };

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={imgBigUrl} alt={imgAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgBigUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
