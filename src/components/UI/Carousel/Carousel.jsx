import React, { Component } from "react";
import {
  handleCarouselPrew,
  handleCarouselNext,
} from "../DataWork/dataChanger";

handleCarouselPrew = (id, gal) => {
  const element = document.getElementById(id.replace(/\s/g));
  let pic = element.firstChild.src;
  let indexOfCurrentPic = gal.indexOf(pic);
  indexOfCurrentPic === 0
    ? (element.firstChild.src = gal[gal.length - 1])
    : (element.firstChild.src = gal[indexOfCurrentPic - 1]);
};
handleCarouselNext = (id, gal) => {
  const element = document.getElementById(id.replace(/\s/g));
  let pic = element.firstChild.src;
  let indexOfCurrentPic = gal.indexOf(pic);
  indexOfCurrentPic === gal.length - 1
    ? (element.firstChild.src = gal[0])
    : (element.firstChild.src = gal[indexOfCurrentPic + 1]);
};

export default class CartImgCarousel extends Component {
  render() {
    return (
      <div>
        <div
          id="prew"
          onClick={() =>
            handleCarouselPrew(this.props.indicator, this.props.gallery)
          }
        >
          <svg
            transform="rotate(180)"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="white"
              stroke-width="2"
              fill="gray"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          id="next"
          onClick={() =>
            handleCarouselNext(this.props.indicator, this.props.gallery)
          }
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="white"
              stroke-width="2"
              fill="gray"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
}
