import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../api';
import { Loading } from './Loading/Loading';
import { LoadMoreBtn } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    allPhotos: [],
    query: '',
    page: 1,
    totalPages: 0,
    isLoading: false,
    showModal: false,
    shownBigImgId: '',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const { query, page } = this.state;
        const arrOfPhotos = await fetchPhotos(query, page);
        if (arrOfPhotos.hits.length === 0) {
          toast.info('Sorry, we did not find any images:( Try another word');
        }
        this.setState(({ allPhotos }) => ({
          allPhotos: [...allPhotos, ...arrOfPhotos.hits],
          totalPages: Math.ceil(arrOfPhotos.totalHits / 12),
        }));
      } catch {
        toast.error('Something went wrong! Please try again!');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.search.value;
    if (query === this.state.query.trim()) {
      toast.error('Please provide new word for search');
      return;
    }
    this.setState({
      allPhotos: [],
      query: query,
      page: 1,
    });
    e.target.reset();
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  createModalImgId = id => {
    this.setState({ shownBigImgId: id });
  };

  render() {
    const { allPhotos, isLoading, totalPages, page, shownBigImgId } =
      this.state;
    return (
      <>
        <SearchBar
          handleSubmit={this.handleSubmit}
          isSubmitting={isLoading === true}
        />

        {allPhotos.length > 0 && (
          <ImageGallery
            allPhotos={allPhotos}
            onClick={this.toggleModal}
            createModalImgId={this.createModalImgId}
          />
        )}
        {isLoading && <Loading isLoading={isLoading} />}
        {totalPages > 1 && page < totalPages && !isLoading && (
          <LoadMoreBtn type="button" onClick={this.loadMore}>
            Load more
          </LoadMoreBtn>
        )}
        {this.state.showModal && (
          <Modal
            onClick={this.toggleModal}
            allPhotos={allPhotos}
            shownBigImgId={shownBigImgId}
          />
        )}
        <ToastContainer />
      </>
    );
  }
}

// const modalRoot = document.querySelector('#modal-root');
// export default class Modal extends Component {
//   state = {
//     largeImageURL: '',
//   };
//   componentDidMount() {
//     const { allPhotos, shownBigImgId } = this.props;
//     const modalImg = allPhotos.find(({ id }) => id === shownBigImgId);
//     this.setState({ largeImageURL: modalImg.largeImageURL });
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClick();
//     }
//   };
//   handleBackdropClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClick();
//     }
//   };
//   render() {
//     const { largeImageURL } = this.state;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalBox>
//           <img src={largeImageURL} alt="yoursearch" />
//         </ModalBox>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   allPhotos: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     })
//   ),
//   onClick: PropTypes.func.isRequired,
//   shownBigImgId: PropTypes.number.isRequired,
// };
