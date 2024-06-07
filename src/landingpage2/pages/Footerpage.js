import React, { useState } from "react";
import "./Footerpage.css";
import fb from "../images/social_media/fb.png";
import insta from "../images/social_media/Insta.png";
import linkdin from "../images/social_media/Lnk.png";
import quora from "../images/social_media/Quora.png";
import x from "../images/social_media/X.png";
import youtube from "../images/social_media/Youtube.png";
import { useNavigate } from "react-router";

import { GetSearchParam, getDeviceType } from "../../utilities/LocalFunction";
import { addEvent } from "../../utilities/Events";

export default function Footerpage() {
  const social_media = [
    { logo: linkdin, route: "https://www.linkedin.com/company/smytten-pulse/" },
    { logo: youtube, route: " https://www.youtube.com/@smyttenpulse" },
    { logo: x, route: "https://twitter.com/smyttenpulse" },
    { logo: insta, route: "https://www.instagram.com/smyttenpulse/" },
    { logo: fb, route: "https://www.facebook.com/smyttenpulse" },
    { logo: quora, route: "https://www.quora.com/profile/Smytten-Pulse" },
  ];

  const our_solutions_arr = [
    {
      name: "Smytten Pulse Check",
      route: "https://pulse.smytten.com/check",
      event: "footer_check",
    },
    {
      name: "Smytten Pulse Scan",
      route: "https://pulse.smytten.com/scan",
      event: "footer_scan",
    },
    {
      name: "Smytten Pulse Boost",
      route: "https://pulse.smytten.com/boost",
      event: "footer_boost",
    },
  ];
  const our_solutions_arr1 = [
    {
      name: "About Smytten",
      route: "https://blog.smytten.com/about-me/",
      event: "footer_about_smytten",
    },
    {
      name: "Partners Program",
      route: "https://pulse.smytten.com/partners/",
      event: "footer_partners",
    },
    // { name: "Blog", route: "https://blog.smytten.com/" },
  ];
  const [our_solutions, setOurSolutions] = useState(false);
  const navigate = useNavigate();
  const signup = () => {
    navigate({
      pathname: "/brandsdashboard/signup",
      search: "",
    });
  };
  return (
    <>
      <div className="page-view-div mobile-only mt-20px">
        <div className="footer-top-container ">
          <h1 className="footer-top-container-header">
            Experience Smytten Pulse Lite
          </h1>
          <p className="footer-top-container-text mt-8px">
            A do-it-yourself, next-gen platform that empowers you and your brand
            with real-time consumer research and intent-targeted advertising
          </p>
          <a href="/brandsdashboard/signup#request-demo-form-container">
            <div
              style={{ width: "fit-content", marginTop: "20px" }}
              className="signup-btn"
              onClick={() => {
                addEvent("button_click", {
                  type: "User_signup",
                });
              }}
            >
              Sign Up Now
            </div>
          </a>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ height: "21px" }} className="flex-space-between-center">
            <h2 className="redirection-page-header">Our Solutions</h2>
            <p
              onClick={() => {
                setOurSolutions(!our_solutions);
              }}
              className="redirection-page-header-anchor"
            >
              {our_solutions ? "-" : "+"}
            </p>
          </div>
          {our_solutions && (
            <div className=" our-solutions-container">
              {our_solutions_arr.map((name, ind) => {
                return (
                  <a
                    onClick={() => {
                      addEvent(name.event, {
                        time: Date(),
                        device_type: getDeviceType(),
                        campaign: GetSearchParam("utm_campaign"),
                        source: GetSearchParam("utm_source"),
                        medium: GetSearchParam("utm_medium"),
                      });
                    }}
                    href={name.route}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <p
                      className="redirection-pages redirection-pages-1"
                      key={ind}
                    >
                      {name.name}
                    </p>
                  </a>
                );
              })}
            </div>
          )}
          {our_solutions_arr1.map((name, ind) => {
            return (
              <a
                onClick={() => {
                  addEvent(name.event, {
                    time: Date(),
                    device_type: getDeviceType(),
                    campaign: GetSearchParam("utm_campaign"),
                    source: GetSearchParam("utm_source"),
                    medium: GetSearchParam("utm_medium"),
                  });
                }}
                href={name.route}
                rel="noreferrer"
                target="_blank"
              >
                <h3 className="redirection-pages" key={ind}>
                  {name.name}
                </h3>
              </a>
            );
          })}
          <div
            style={{ gap: "16px", margin: "24px 0px" }}
            className="flex-flex-start-flex-start"
          >
            {social_media.map((e, i) => (
              <a key={i} href={e.route} target="blank">
                <img src={e.logo} alt="" />
              </a>
            ))}
          </div>
          <div className="width-100 hr-tag"></div>
          <p className="copyright-text">
            Smytten. © 2024. All Rights Reserved.
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pulse.smytten.com/privacy_policy.html"
            >
              (Privacy Policy)
            </a>
          </p>
        </div>
      </div>

      <div className="page-view-div desktop-only">
        <div className="footer-top-container">
          <h1 className="footer-top-container-header">
            Experience Smytten Pulse Lite
          </h1>
          <p className="footer-top-container-text mt-8px">
            A do-it-yourself, next-gen platform that empowers you and your brand
            with real-time <br /> consumer research and intent-targeted
            advertising
          </p>

          <div
            style={{ width: "fit-content", marginTop: "28px" }}
            className="signup-btn"
            onClick={() => {
              addEvent("button_click", {
                type: "User_signup",
              });
              signup();
            }}
          >
            Sign Up Now
          </div>
        </div>
        <div className="footer-bottom-container">
          <div className="flex-space-between-flex-start width-100 ">
            <div className="flex-flex-start-flex-start flex-column">
              <h2 className="redirection-page-header mb-16px">Our Solutions</h2>
              {our_solutions_arr.map((name, ind) => {
                return (
                  <a
                    onClick={() => {
                      addEvent(name.event, {
                        time: Date(),
                        device_type: getDeviceType(),
                        campaign: GetSearchParam("utm_campaign"),
                        source: GetSearchParam("utm_source"),
                        medium: GetSearchParam("utm_medium"),
                      });
                    }}
                    href={name.route}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <p className="redirection-pages" key={ind}>
                      {name.name}
                    </p>
                  </a>
                );
              })}
            </div>
            <div className="flex-flex-start-flex-start flex-column">
              <p className="redirection-page-header mb-16px"></p>
              {our_solutions_arr1.map((name, ind) => {
                return (
                  <a
                    onClick={() => {
                      addEvent(name.event, {
                        time: Date(),
                        device_type: getDeviceType(),
                        campaign: GetSearchParam("utm_campaign"),
                        source: GetSearchParam("utm_source"),
                        medium: GetSearchParam("utm_medium"),
                      });
                    }}
                    href={name.route}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {" "}
                    <p className="redirection-pages" key={ind}>
                      {name.name}
                    </p>
                  </a>
                );
              })}
            </div>
            <div className="flex-flex-start-flex-start flex-column">
              <h2 className="redirection-page-header mb-16px">
                Connect with us
              </h2>
              <div
                style={{ gap: "16px" }}
                className="flex-flex-start-flex-start"
              >
                {social_media.map((e, i) => (
                  <a key={i} href={e.route} target="blank">
                    <img src={e.logo} alt="" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="width-100 hr-tag"></div>
          <p className="copyright-text">
            Smytten. © 2024. All Rights Reserved.
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pulse.smytten.com/privacy_policy.html"
            >
              (Privacy Policy)
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
