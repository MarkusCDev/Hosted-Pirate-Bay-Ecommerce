import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sot1 from "../images/banners/sot1.jpg";
import sot2 from "../images/banners/sot2.jpg";
import kraken from "../images/banners/kraken.jpg";

export default class Banner extends Component {
  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div style={{ paddingTop: 10 }}>
        <Slider {...settings}>
          <div className="d-flex justify-content-center">
            <img
              src={kraken}
              alt="background"
              style={{
                height: "500px",
                width: "100%",
                filter: "brightness(75%)",
                objectFit: "cover",
              }}
            ></img>
            <div
              className="position-fixed text-center"
              style={{
                bottom: "1em",
                color: "#ffd900d6",
                fontSize: "6em",
                fontFamily: "Times New Roman",
                padding: "1em",
                margin: "0px auto",
              }}
            >
              Welcome to PirateBay
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={sot1}
              alt="background"
              style={{
                height: "500px",
                width: "100%",
                filter: "brightness(75%)",
                objectFit: "cover",
              }}
            ></img>
            <div
              className="position-fixed text-center"
              style={{
                bottom: "1em",
                color: "#ffd900d6",
                fontSize: "6em",
                fontFamily: "Times New Roman",
                padding: "1em",
                margin: "0px auto",
              }}
            >
              Become a Pirate
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={sot2}
              alt="background"
              style={{
                height: "500px",
                width: "100%",
                filter: "brightness(75%)",
                objectFit: "cover",
              }}
            ></img>
            <div
              className="position-fixed text-center"
              style={{
                bottom: "1em",
                color: "#ffd900d6",
                fontSize: "6em",
                fontFamily: "Times New Roman",
                padding: "1em",
                margin: "0px auto",
              }}
            >
              Explore Treasure
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
