import PropTypes from 'prop-types';
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
ImageGallery.propTypes = {
  allPhotos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  createModalImgId: PropTypes.func.isRequired,
};
