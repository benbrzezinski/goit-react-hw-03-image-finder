import PropTypes from "prop-types";
import scss from "./ImageGallery.module.scss";

const ImageGalleryItem = ({ photos }) =>
  photos.map(({ id, webformatURL, tags }) => (
    <li className={scss.gallery__card} key={id}>
      <img
        className={scss.gallery__img}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </li>
  ));

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGalleryItem;
