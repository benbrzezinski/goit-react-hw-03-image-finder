import { Component } from "react";
import Api from "../utils/js/api";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";

class App extends Component {
  state = {
    searcher: "",
    page: 1,
    photos: [],
  };

  async componentDidUpdate(_, prevState) {
    const { searcher, page } = this.state;
    const { hits: photos, totalHits: _ } = await Api.fetchPhotosByQuery(
      searcher,
      page
    );

    if (prevState.searcher !== searcher) {
      this.setState(() => ({ photos }));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const form = e.currentTarget;
    const { searcher } = form.elements;

    this.setState(() => ({ searcher: searcher.value.toLowerCase().trim() }));
    setTimeout(() => form.reset(), 0);
  };

  render() {
    const { photos } = this.state;

    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem photos={photos} />
        </ImageGallery>
      </>
    );
  }
}

export default App;
