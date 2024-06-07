import React from "react";
import "./pages.css";
import logo from "../images/pulse_boost_logo.png";
import boost_image from "../images/pulse_boost_image.png";

import { addEvent } from "../../utilities/Events";
import { GetSearchParam, getDeviceType } from "../../utilities/LocalFunction";

export const handleScroll = (ref) => {
  ref.scrollIntoView({ top: -300, behavior: "smooth" });
};

export default function Pageboost({ demoref, boostref }) {
  return (
    <>
      <div ref={boostref}></div>
      <div className="page-view-div pages-container">
        <div className="page-logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="flex-center-center pages-container-discription-cont flex-column">
          <h1 className="pages-container-heading">
            Reach Early Adopters Of D2C Brands
          </h1>
          <p className="flex-center-center pages-container-discription  text-center flex-column desktop-only">
            Advertise on India's first retail media platform with a flat fee and
            target <br /> an intent-driven audience with precision
          </p>
          <p className="flex-center-center pages-container-discription  text-center flex-column mobile-only">
            Advertise on India's first retail media platform with a flat fee and
            target an intent-driven audience with precision
          </p>
          <a href="https://pulse.smytten.com/boost">
            <div
              onClick={() => {
                addEvent("get_started_boost", {
                  time: Date(),
                  device_type: getDeviceType(),
                  campaign: GetSearchParam("utm_campaign"),
                  source: GetSearchParam("utm_source"),
                  medium: GetSearchParam("utm_medium"),
                });

                // handleScroll(demoref.current);
              }}
              style={{ width: "fit-content" }}
              className="signup-btn mt-16px"
            >
              Get Started
            </div>
          </a>
        </div>
        <img
          style={{ marginTop: "48px", maxWidth: "100%" }}
          src={boost_image}
          alt=""
        />
      </div>
    </>
  );
}
