import React from "react";

import Hotel from "../../model/hotel";
import * as LOCATION_CONSTANTS from '../../constants';
import "./map.styles.scss";

interface AppState {}
interface AppProps {
  hotels: Hotel[];
}

class Map extends React.Component<AppProps, AppState> {
  componentDidMount() {
    const platform = new H.service.Platform({
      apikey: "s6kFr-4FfqQq1QuH2RUam8WrW73unCxwo26lbfXke24"
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      document.getElementById("map-content") as HTMLElement,
      defaultLayers.vector.normal.map,
      {
        center: { lat: LOCATION_CONSTANTS.LATITUDE, lng: LOCATION_CONSTANTS.LONGITUDE },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    window.addEventListener("resize", () => map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    for (const hotel of this.props.hotels) {
      // hack to avoid CORS issue
      const icon = new H.map.Icon(
        "https://cors-anywhere.herokuapp.com/" + hotel.icon
      );
      const marker = new H.map.Marker(
        { lat: hotel.position[0], lng: hotel.position[1] },
        { icon: icon }
      );
      map.addObject(marker);
    }

    map.setCenter({ lat: LOCATION_CONSTANTS.LATITUDE, lng: LOCATION_CONSTANTS.LONGITUDE });
    map.setZoom(14);
  }
  render() {
    return <div id="map-content" className="map-content"></div>;
  }
}

export default Map;
