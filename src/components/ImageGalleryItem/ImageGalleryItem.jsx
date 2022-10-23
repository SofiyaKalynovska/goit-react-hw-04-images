import PropTypes from 'prop-types';
import { ImageItem, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  url,
  title,
  onOpen,
  showModal,
  id,
}) {
  return (
    <ImageItem onClick={onOpen}>
      <GalleryImage
        src={url}
        alt={title}
        onClick={() => {
          showModal(id);
        }}
      />
    </ImageItem>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};
