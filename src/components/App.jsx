import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchPhotos } from '../api';
import { Loading } from './Loading/Loading';
import { LoadMoreBtn } from './LoadMore/LoadMore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    allPhotos: [],
    query: '',
    page: 1,
    totalPages: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
      if (query !== prevState.query || page !== prevState.page) {
        try {
          this.setState({ isLoading: true });
          const { query, page } = this.state;
          const arrOfPhotos = await fetchPhotos(query, page);
          this.setState(({ allPhotos }) => ({
            allPhotos: [...allPhotos, ...arrOfPhotos.hits],
            totalPages: Math.ceil(arrOfPhotos.totalHits / 12),
          }));
        } catch {
          toast.error('Something went wrong! Please try again!')
          
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

  render() {
    const { allPhotos, isLoading, totalPages, page } = this.state;
    return (
      <>
        <SearchBar
          handleSubmit={this.handleSubmit}
          isSubmitting={this.state.isLoading}
        />
        {isLoading && <Loading isLoading={isLoading} />}
        {allPhotos.length > 0 && <ImageGallery allPhotos={allPhotos} />}
        {totalPages > 1 &&
          (page < totalPages) && !isLoading &&(
            <LoadMoreBtn onClick={this.loadMore}/>
          )}
        <ToastContainer />
      </>
    );
  }
}
