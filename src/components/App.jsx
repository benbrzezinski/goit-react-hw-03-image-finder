import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";
import Button from "./Button/Button";
import Api from "../utils/services/api";

class App extends Component {
  PER_PAGE = 12;

  state = {
    searcher: "",
    page: 1,
    images: [],
    status: null,
    areThereMorePhotos: null,
  };

  async componentDidUpdate() {
    const { searcher, page, status } = this.state;

    if (status) {
      try {
        const { hits: photos, totalHits: totalPhotos } =
          await Api.fetchPhotosByQuery(searcher, page, this.PER_PAGE);

        const areThereMorePhotos =
          Math.ceil(totalPhotos / this.PER_PAGE) > page;
        this.setState({ status: false, areThereMorePhotos });

        if (page === 1) {
          this.setState({ images: photos });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (page > 1) {
          this.setState(({ images }) => ({
            images: [...images, ...photos],
          }));
        }
      } catch (err) {
        console.error(err.stack);
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const searcher = form.elements.searcher.value;

    this.setState({
      searcher: searcher.toLowerCase().trim(),
      page: 1,
      status: true,
    });
  };

  getNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1, status: true }));
  };

  render() {
    const { images, areThereMorePhotos } = this.state;

    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        {areThereMorePhotos && <Button getNextPage={this.getNextPage} />}
      </>
    );
  }
}

export default App;
