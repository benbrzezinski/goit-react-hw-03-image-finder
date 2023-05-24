import { Component } from "react";
import scss from "./Searchbar.module.scss";

class Searchbar extends Component {
  state = {
    searcher: "",
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { searcher } = this.state;

    return (
      <header className={scss.searchForm__box}>
        <form className={scss.searchForm}>
          <input
            className={scss.searchForm__searcher}
            type="text"
            name="searcher"
            value={searcher}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images..."
            required
          />
          <button className={scss.searchForm__btn} type="submit"></button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
