import { ImageItem, GalleryImage } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ url, title }) {
  return (
    <ImageItem>
      <GalleryImage  src={url} alt={title} />
    </ImageItem>
  )
}
