import React from "react";
import "./Page1.css";
import pulseboost from "../images/PulseBoost.png";
import pulsescan from "../images/PulseScanLogo.png";
import pulsecheck from "../images/PulseCheck.png";

import brand1 from "../images/brands/Coke.png";
import brand2 from "../images/brands/Foxtale.png";
import brand3 from "../images/brands/Dabur.png";
import brand4 from "../images/brands/Dr.Oetker.png";
import brand5 from "../images/brands/Emami.png";
import brand6 from "../images/brands/FabOil.png";
// import brand7 from "../images/brands/Colgate-Palmolive-1.png";
import brand8 from "../images/brands/Himalaya.png";
import brand9 from "../images/brands/Marico.png";
import brand10 from "../images/brands/Protinex.png";
import brand11 from "../images/brands/Simple.png";
import brand12 from "../images/brands/Vaseline.png";
import brand13 from "../images/brands/Colgate-Palmolive.png";
import Scroller1 from "./Scroller1";
// import { Carousel } from "antd";
import { handleScroll } from "./Pageboost";

import { Carousel } from "react-bootstrap";
import { GetSearchParam, getDeviceType } from "../../utilities/LocalFunction";

import { addEvent } from "../../utilities/Events";
import { add_ga_event } from "../../utilities/Gaevents";


const dot_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="8"
    viewBox="0 0 9 8"
    fill="none"
  >
    <path
      d="M4.50009 8C3.39535 8 2.44775 7.61151 1.65729 6.83453C0.876355 6.04796 0.490649 5.09353 0.500172 3.97122C0.490649 2.8777 0.876355 1.94245 1.65729 1.16547C2.44775 0.38849 3.39535 0 4.50009 0C5.54768 0 6.47147 0.38849 7.27146 1.16547C8.08096 1.94245 8.49048 2.8777 8.5 3.97122C8.49048 4.71943 8.29524 5.40048 7.9143 6.01439C7.54288 6.61871 7.05717 7.10312 6.45719 7.46763C5.8572 7.82254 5.20483 8 4.50009 8Z"
      fill="#6D00F9"
    />
  </svg>
);
export default function Page1({ checkref, boostref, scanref }) {
  const cards = [
    {
      logo: pulsecheck,
      content:
        "Launch consumer research with ready-to-use survey templates and get insights in just 72 hours                    ",
      button: "Know More",
      spacecount: 0,
      event_name: "know_more_check",
      ref: checkref,
    },
    {
      logo: pulsescan,
      content:
        "Discover consumer insights, and market trends in real-time across lifestyle categories",
      button: "Know More",
      spacecount: 10,
      event_name: "know_more_scan",
      ref: scanref,
    },
    {
      logo: pulseboost,
      content:
        "Advertise to a high-intent audience and target them precisely across the funnel and open web",
      button: "Know More",
      spacecount: 0,
      event_name: "know_more_boost",
      ref: boostref,
    },
  ];

  const getsapces = (count) => {
    let arr = Array.from({ length: count }, () => "");
    return arr.map((e, i) => <span key={i}>&nbsp;</span>);
  };

  return (
    <>
      <div className="page-view-div pages-1-main-container max-width-landing-page">
        <div className="page1-top-header  flex-center-center ">
          {["Ask", "Analyse", "Advertise"].map((name, index) => {
            return (
              <h2 className="page1-top-header-text m-0px" key={index}>
                {name}
                {index < 2 && <span>&nbsp;{dot_svg}&nbsp;</span>}
              </h2>
            );
          })}
        </div>
        <div className="desktop-only">
          <div className="page1-cards-container  hide-scroll mt-24px">
            {cards.map((card, index) => {
              return (
                <div key={index} className="page1-single-card">
                  <img style={{ maxWidth: "100%" }} src={card.logo} alt="" />
                  <p className="text-left mt-24px page1-single-card-content">
                    {card.content}
                    {getsapces(card.spacecount)}
                  </p>
                  <div
                    onClick={() => {
                      addEvent(card.event_name, {
                        time: Date(),
                        device_type: getDeviceType(),
                        campaign: GetSearchParam("utm_campaign"),
                        source: GetSearchParam("utm_source"),
                        medium: GetSearchParam("utm_medium"),
                      });
                      add_ga_event(card.event_name, {
                        time: Date(),
                        device_type: getDeviceType(),
                        campaign: GetSearchParam("utm_campaign"),
                        source: GetSearchParam("utm_source"),
                        medium: GetSearchParam("utm_medium"),
                      });
                      handleScroll(card.ref.current);
                    }}
                    className="page1-single-card-button mt-24px"
                  >
                    {card.button}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{ height: "260px", padding: "0px 20px" }}
          className="mobile-only"
        >
          <Carousel
            dotWidth={3}
            dotActiveWidth={3}
            className="carousel-custom-page1 position-relative"
            autoplay
            controls={false}
            indicators={true}
          >
            {cards.slice(0).map((card, index) => {
              return (
                <Carousel.Item>
                  <div
                    key={index}
                    className="page1-single-card position-realtive "
                  >
                    <img style={{ maxWidth: "100%" }} src={card.logo} alt="" />
                    <p className="text-left mt-24px page1-single-card-content">
                      {card.content}
                    </p>
                    <div
                      onClick={() => {
                        handleScroll(card.ref.current);
                      }}
                      className="page1-single-card-button mt-24px"
                    >
                      {card.button}
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div className="page-view-div scoller-component-page-1">
        <h3 className="trusted-brands">Trusted By India’s Leading Brands</h3>
        <div
          className="scoller-component-page-1-inner"
          style={{ height: "90px" }}
        >
          <Scroller1
            arr={[
              brand1,
              brand2,
              brand3,
              brand4,
              brand5,
              brand6,
              // brand7,
              brand8,
              brand9,
              brand10,
              brand11,
              brand12,
              brand13,
            ]}
          />
        </div>
      </div>
    </>
  );
}
