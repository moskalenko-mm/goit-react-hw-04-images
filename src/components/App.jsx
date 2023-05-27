import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPhoto } from '../services/galleryApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { Container } from './App.styled';

const App = () => {
  const [userRequest, setUserRequest] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgBigUrl, setImgBigUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  useEffect(() => {
    if (userRequest === '') return;
    setIsLoading(true);
    getPhoto(userRequest, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }
        setPhotos([...photos, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [userRequest, page]);

  const openModal = (imgBigUrl, imgAlt) => {
    setShowModal(true);
    setImgBigUrl(imgBigUrl);
    setImgAlt(imgAlt);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = userRequest => {
    setUserRequest(userRequest);
    setPage(1);
    setPhotos([]);
    setIsEmpty(false);
    setShowBtn(false);
    setError(null);
    setShowModal(false);
    setImgBigUrl('');
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Searchbar handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isEmpty && (
        <ErrorMessage message="We have no images for this request." />
      )}
      <ImageGallery photos={photos} openModal={openModal} />
      {showBtn && <Button handleLoadMore={handleLoadMore} />}
      {error && <ErrorMessage message={error.message} />}
      {showModal && (
        <Modal imgAlt={imgAlt} imgBigUrl={imgBigUrl} closeModal={closeModal} />
      )}
    </Container>
  );
};

export default App;
