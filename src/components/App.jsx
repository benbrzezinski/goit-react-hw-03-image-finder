import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Api from "../utils/services/api";

const body = document.querySelector("body");

class App extends Component {
  PER_PAGE = 12;

  state = {
    searchQuery: "",
    largeImageURL: "",
    tags: "",
    page: 1,
    images: [],
    status: null,
    areThereMorePhotos: null,
    isModalOpen: false,
  };

  async componentDidUpdate() {
    const { searchQuery, page, status } = this.state;

    if (status) {
      try {
        const { hits: photos, totalHits: totalPhotos } =
          await Api.fetchPhotosByQuery(searchQuery, page, this.PER_PAGE);

        const areThereMorePhotos =
          Math.ceil(totalPhotos / this.PER_PAGE) > page;
        this.setState({ status: false, areThereMorePhotos });

        if (page === 1) {
          this.setState({ images: photos });
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        }

        if (page > 1) {
          this.setState(({ images }) => ({
            images: [...images, ...photos],
          }));

          setTimeout(
            () => window.scrollBy({ top: 400, behavior: "smooth" }),
            0
          );
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
      searchQuery: searcher.toLowerCase().trim(),
      page: 1,
      status: true,
    });
  };

  getNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1, status: true }));
  };

  openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    const tags = e.currentTarget.getAttribute("alt");

    body.style.overflow = "hidden";
    this.setState({ largeImageURL, tags, isModalOpen: true });
  };

  closeModalOnClick = e => {
    if (e.currentTarget === e.target) {
      body.style.overflow = "unset";
      this.setState({ largeImageURL: "", tags: "", isModalOpen: false });
    }
  };

  closeModalOnEsc = e => {
    if (e.code === "Escape") {
      body.style.overflow = "unset";
      this.setState({ largeImageURL: "", tags: "", isModalOpen: false });
    }
  };

  render() {
    const { largeImageURL, tags, images, areThereMorePhotos, isModalOpen } =
      this.state;

    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} openModal={this.openModal} />
        </ImageGallery>
        {areThereMorePhotos && <Button getNextPage={this.getNextPage} />}
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          isModalOpen={isModalOpen}
          closeModalOnClick={this.closeModalOnClick}
          closeModalOnEsc={this.closeModalOnEsc}
        />
      </>
    );
  }
}

export default App;
