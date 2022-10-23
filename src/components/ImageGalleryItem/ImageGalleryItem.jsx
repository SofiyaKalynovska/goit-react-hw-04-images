import { ImageItem, GalleryImage } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ url, title, onOpen, showModal, id }) {
  return (
    <ImageItem onClick={onOpen}>
      <GalleryImage src={url} alt={title} onClick={() => { showModal(id) }}/>
    </ImageItem>
  )
}
