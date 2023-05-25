import PropTypes from "prop-types";
import scss from "./ImageGallery.module.scss";

const ImageGallery = ({ children }) => (
  <ul className={scss.gallery}>{children}</ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
