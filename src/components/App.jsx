import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../api';
import { Loading } from './Loading/Loading';
import { LoadMoreBtn } from './LoadMore/LoadMore';
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
        {totalPages > 1 &&
          page < totalPages &&
          !isLoading && (<LoadMoreBtn onClick={this.loadMore} />)}
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
