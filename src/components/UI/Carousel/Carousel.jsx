import React, { Component } from "react";

export default class Carousel extends Component {
  constructor(props) {
    super();
  }

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

  render() {
    console.log("props>>", this.props.indicator, this.props.gallery);
    return (
      <div>
        <div
          id="prew"
          onClick={() =>
            this.handleCarouselPrew(this.props.indicator, this.props.gallery)
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
              strokeWidth="2"
              fill="gray"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          id="next"
          onClick={() =>
            this.handleCarouselNext(this.props.indicator, this.props.gallery)
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
              strokeWidth="2"
              fill="gray"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
}
