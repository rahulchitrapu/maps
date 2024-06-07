import React from "react";
import scan_image from "../images/pulse_scan_image.png";
import logo from "../images/pulse_scan_logo.png";
import { handleScroll } from "./Pageboost";
import { addEvent } from "../../utilities/Events";
import { GetSearchParam, getDeviceType } from "../../utilities/LocalFunction";
import { add_ga_event } from "../../utilities/Gaevents";

export default function Pagescan({ demoref, scanref }) {
  return (
    <>
      <div ref={scanref}></div>
      <div className="page-view-div pages-container">
        <div className="page-logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="flex-center-center pages-container-discription-cont flex-column">
          <h1 className="pages-container-heading">
            Decode Consumer Behaviour & Purchase Insights
          </h1>
          <p className="flex-center-center pages-container-discription  text-center flex-column desktop-only">
            Discover how advanced online shoppers on Smytten interact with your
            brand and <br /> unlock category trends to stay ahead of competition
          </p>
          <p className="flex-center-center pages-container-discription  text-center flex-column mobile-only">
            Discover how advanced online shoppers on Smytten interact with your
            brand and unlock category trends to stay ahead of competition
          </p>
          <a href="https://pulse.smytten.com/scan">
            <div
              onClick={() => {
                addEvent("get_started_scan", {
                  time: Date(),
                  device_type: getDeviceType(),
                  campaign: GetSearchParam("utm_campaign"),
                  source: GetSearchParam("utm_source"),
                  medium: GetSearchParam("utm_medium"),
                });
                add_ga_event("get_started_scan", {
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
          src={scan_image}
          alt=""
        />
      </div>
    </>
  );
}
