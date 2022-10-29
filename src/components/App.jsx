import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../api';
import { Loading } from './Loading/Loading';
import { LoadMoreBtn } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

export default function App() {
  const [allPhotos, setAllPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shownBigImgId, setShownBigImgId] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function getPhotos() {
      try {
        setIsLoading(true);

        const arrOfPhotos = await fetchPhotos(query, page, {
          signal: controller.signal,
        });

        if (arrOfPhotos.length === 0) {
          toast.info('Sorry, we did not find any images:( Try another word');
          return;
        }
        setAllPhotos(prevState => [...prevState, ...arrOfPhotos.hits]);
        setTotalPages(Math.ceil(arrOfPhotos.totalHits / 12));
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong! Please try again!');
      } finally {
        setIsLoading(false);
      }
    }
    if (query.trim() === '') {
      return;
    }
    getPhotos();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  const handleSubmitSearchBar = e => {
    console.log('handlesubmit')
    e.preventDefault();
    const form = e.currentTarget;
    const newQuery = form.elements.search.value;
    if (query === newQuery.trim() || newQuery === '') {
      toast.error('Please provide new word for search');
      return;
    }
    setAllPhotos([]);
    setQuery(newQuery);
    setPage(1);
    e.target.reset();
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  const createModalImgId = id => {
    setShownBigImgId(id);
  };
  return (
    <>
      <SearchBar
        handleSubmit={handleSubmitSearchBar}
        isSubmitting={isLoading === true}
      />

      {allPhotos.length > 0 && (
        <ImageGallery
          allPhotos={allPhotos}
          onClick={toggleModal}
          createModalImgId={createModalImgId}
        />
      )}
      {isLoading && <Loading isLoading={isLoading} />}
      {totalPages > 1 && page < totalPages && !isLoading && (
        <LoadMoreBtn type="button" onClick={loadMore}>
          Load more
        </LoadMoreBtn>
      )}
      {showModal && (
        <Modal
          onClick={toggleModal}
          allPhotos={allPhotos}
          shownBigImgId={shownBigImgId}
        />
      )}
      <ToastContainer />
    </>
  );
}
