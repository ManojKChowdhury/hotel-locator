import React from "react";

import Hotel from "../../model/hotel";
import "./hotel-card.styles.scss";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="card-container">
      <div className="card-details-container">
        <div className="card-header">
          <span>
            <b>{hotel.title}</b>
          </span>
          <span>Rating: {hotel.averageRating}</span>
        </div>
        <div>
          <span>
            Opening Hours: {hotel.openingHours ? hotel.openingHours.text : ""}
          </span>
          {hotel.openingHours ? (
            <span
              className={`${hotel.openingHours.isOpen ? "open" : "closed"}`}
            >
              &nbsp;{hotel.openingHours.isOpen ? "Open" : "Closed"}
            </span>
          ) : "-"}
        </div>
        <div>
          <span dangerouslySetInnerHTML={{__html: hotel.vicinity}}></span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
