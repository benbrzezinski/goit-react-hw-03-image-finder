import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";

class App extends Component {
  state = {
    searcher: "",
    images: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const { searcher } = form.elements;

    this.setState(() => ({ searcher: searcher.value.toLowerCase().trim() }));
    setTimeout(() => form.reset(), 0);
  };

  render() {
    return <Searchbar handleSubmit={this.handleSubmit} />;
  }
}

export default App;
