import React from "react";
import logo from "../images/pulse_check_logo.png";
import product_testing from "../images/checkimages/Product-Testing.png";
import concept_testing from "../images/checkimages/Concept-Testing.png";
import brand_track from "../images/checkimages/brand_track.png";
import ad_testing from "../images/checkimages/Ad-Testing.png";
import quick_survey from "../images/checkimages/quick survey.png";
import usage from "../images/checkimages/Usage-and-attitude.png";
import { handleScroll } from "./Pageboost";

import { addEvent } from "../../utilities/Events";
import {
  GetSearchParam,
  getDeviceType,
  redirectToPath,
} from "../../utilities/LocalFunction";

export default function Pagecheck({ demoref, checkref }) {
  const cards = [
    {
      name: "Concept Testing",
      logo: concept_testing,
      redirect: "https://pulse.smytten.com/concept-testing",
    },
    {
      name: "Product Testing",
      logo: product_testing,
      redirect: "https://pulse.smytten.com/product-testing",
    },
    {
      name: "Video Ad Testing",
      logo: ad_testing,
      redirect: "https://pulse.smytten.com/video-testing",
    },
    {
      name: "Usage & Attitude Study",
      logo: usage,
      redirect: " https://pulse.smytten.com/usage-and-attitude-survey",
    },
    {
      name: "Quick Surveys",
      logo: quick_survey,
      redirect: "https://pulse.smytten.com/quick-survey",
    },
    {
      name: "Brand Track",
      logo: brand_track,
      redirect: "https://pulse.smytten.com/brand-track",
    },
  ];
  return (
    <>
      <div ref={checkref}></div>
      <div className="page-view-div pages-container">
        <div className="page-logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="flex-center-center pages-container-discription-cont flex-column">
          <h1 className="pages-container-heading">
            Gain A Deeper Understanding Of Consumer Preferences
          </h1>
          <p className="flex-center-center pages-container-discription  text-center flex-column desktop-only">
            Set up consumer research to get insights in 72 hours with
            ready-to-use survey templates for
            <br /> concept testing, brand track, usage & attitude study, and
            more
          </p>
          <p className="flex-center-center pages-container-discription  text-center flex-column mobile-only">
            Set up consumer research to get insights in 72 hours with
            ready-to-use survey templates for concept testing, brand track,
            usage & attitude study, and more
          </p>
          <a href="https://pulse.smytten.com/check">
            <div
              onClick={() => {
                addEvent("get_started_check", {
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

        <div className="flex-center-center ">
          <div className="pages-container-single-card-container ">
            {cards.map((card, index) => {
              return (
                <div
                  onClick={() => {
                    // handleScroll(demoref.current);
                    redirectToPath(card.redirect, "blank");
                  }}
                  className="pages-container-single-card cursor-p"
                  key={index}
                >
                  <img style={{ maxWidth: "100%" }} src={card.logo} alt="" />
                  <div
                    style={{ padding: "16px" }}
                    className="flex-space-between-center"
                  >
                    <p className="pages-container-single-card-text">
                      {card.name}
                    </p>
                    <div className="pages-container-single-card-arrow">
                      {"->"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
