import React from "react";

import "./search-input.styles.scss";

interface SearchInputProps {
  handleSubmit: (searchText: string) => void;
};
interface SearchInputState {
  searchText: string;
};

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {

  constructor(props: SearchInputProps){
    super(props);
    this.state = {
      searchText: ""
    }
  }
  handleSubmitButton = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.searchText);
  };
  onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchText: event.target.value});
  }
  render() {
    return (
      <div className="search-container">
        <form onSubmit={this.handleSubmitButton}>
          <div className="search-input-container">
            <input className="search-input" type="text" onChange={this.onTextChange} name="searchText"/>
            <label className={`${this.state.searchText.length ?'shrink':'' } search-input-label`}>Location</label>
          </div>
          <div className="search-button-container">
            <button className="search-button" type='submit'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchInput;
