// import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ allPhotos, onClick, createModalImgId }) => {
  return (
    <ImageGalleryList>
      {allPhotos.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          id={id}
          title={tags}
          onOpen={onClick}
          showModal={createModalImgId}
        />
      ))}
    </ImageGalleryList>
  );
};