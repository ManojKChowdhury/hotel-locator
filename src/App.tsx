import React from "react";
import axios from "axios";

import Hotel from "./model/hotel";
import Place from "./model/place";
import HotelCard from "./component/hotel-card/hotel-card.component";
import SearchInput from "./component/search-input/search-input.component";
import Map from "./component/map/map.component";
import * as LOCATION_CONSTANTS from "./constants";
import "./App.scss";

const API_KEY = "6O8jrQj4SqUbcF2zw8EaJNBPoIjhnA2HMriPnuG-m-I";
const APP_ID = "9FayS3T2s6S64Uig6Loi";
const PLACE_CATEGORY = "accommodation";

interface AppState {
  hotelList: Hotel[];
  placeDetails: Place;
  isLoading: boolean;
}
interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hotelList: [],
      isLoading: false,
      placeDetails: {
        position: [0, 0],
        distance: 0,
        title: "",
        averageRating: 0,
        category: {
          id: "",
          title: "",
          href: "",
          type: "",
          system: ""
        },
        icon: "",
        vicinity: "",
        having: [],
        type: "",
        href: "",
        id: "",
        authoritative: true,
        alternativeNames: [
          {
            name: "",
            language: ""
          }
        ]
      }
    };
  }
  handleSubmit = (searchText: string) => {
    this.setState({ hotelList: [], isLoading: true });
    axios
      .get(
        "https://places.ls.hereapi.com/places/v1/discover/search?" +
          "apiKey=" +
          API_KEY +
          "&at=" +
          LOCATION_CONSTANTS.LATITUDE +
          "," +
          LOCATION_CONSTANTS.LONGITUDE +
          "&q=" +
          searchText +
          "&pretty"
      )
      .then(response => {
        this.setState({ placeDetails: response.data.results.items[0] });
        this.getHotels();
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  getHotels = () => {
    axios
      .get(
        "https://places.sit.ls.hereapi.com/places/v1/discover/explore" +
          "?app_id=" +
          APP_ID +
          "&apiKey=" +
          API_KEY +
          "&at=" +
          this.state.placeDetails.position[0] +
          "," +
          this.state.placeDetails.position[1] +
          "&cat=" +
          PLACE_CATEGORY +
          "&pretty"
      )
      .then(response => {
        this.setState({ hotelList: response.data.results.items });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <div className="App">
        <SearchInput handleSubmit={this.handleSubmit} />
        {this.state.hotelList.length > 0 ? (
          <div>
            <div className="map-container">
              <Map hotels={this.state.hotelList} />
            </div>
            {this.state.hotelList.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="info-text-container">
            {this.state.isLoading ? (
              <div className="lds-dual-ring"></div>
            ) : (
              <span>Please enter a location</span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
