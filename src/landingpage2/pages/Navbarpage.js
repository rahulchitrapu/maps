import React, { useEffect, useRef, useState } from "react";
import "./Navbarpage.css";
import smyttenlogo from "../images/smyttenLogo.svg";

import topring from "../images/top_ring.png";
import pulse_check from "../images/pulse_check.png";
import pulse_boost from "../images/pulse_boost.png";
import pulse_scan from "../images/pulse_scan.png";

import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

import { Popover, Typography, styled } from "@mui/material";
import scanlogo from "../images/navbar/scan.svg";
import boostlogo from "../images/navbar/boost.svg";
import checklogo from "../images/navbar/check.svg";
import scanlogo_p from "../images/navbar/ScanPurple.svg";
import boostlogo_p from "../images/navbar/BoostPurple.svg";
import checklogo_p from "../images/navbar/CheckPurple.svg";
import { redirectToPath } from "../../utilities/LocalFunction";
import farightup from "../images/navbar/farightup.svg";
import { addEvent } from "../../utilities/Events";
import { add_ga_event } from "../../utilities/Gaevents";
const StyledPopover = styled(Popover)`
  .MuiTypography-root {
    padding: 8px 16px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    font-family: Inter;
    font-weight: 500;
    letter-spacing: -0.24px;
    width: 200px;
  }
  .MuiTypography-root:hover {
    background-color: #f4f5ff;
  }
`;
// import animation from "../images/page-1-animation.json";

const cross_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <g clip-path="url(#clip0_591_914)">
      <path
        d="M15 5.5L5 15.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 5.5L15 15.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_591_914">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
const plus_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <g clip-path="url(#clip0_707_224)">
      <path
        d="M10 4.99622V16.6629"
        stroke="#242424"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.16663 10.8296H15.8333"
        stroke="#242424"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_707_224">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0 0.82959)"
        />
      </clipPath>
    </defs>
  </svg>
);

let signup_page_link = `/brandsdashboard/signup/${window.location.search}#request-demo-form-container`;
signup_page_link = signup_page_link.split("#")[0];

export const Navbar = ({ isScrolled, partner, open_drawer, setOpenDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [clicked, setClicked] = useState({});
  const open = Boolean(anchorEl);
  const iconsid = open ? "options-popover" : undefined;

  const [hover_obj, setHoverObj] = useState({});
  const [rendered, setRendered] = useState([]);

  const [mobile_main_pages, setmobile_main_pages] = useState({
    our_solutions: true,
  });

  const opensubpage = (key) => {
    let copy = { ...mobile_main_pages };
    copy[key] = !copy[key];
    setmobile_main_pages({ ...copy });
  };

  const showDrawer = () => {
    setOpenDrawer(!open_drawer);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setClicked({});
    setHoverObj({});
  };

  const our_solutions = [
    {
      name: "Pulse Check",
      route: "https://pulse.smytten.com/check",
      logo: checklogo,
      activelogo: checklogo_p,
    },
    {
      name: "Pulse Scan",
      route: "https://pulse.smytten.com/scan",
      logo: scanlogo,
      activelogo: scanlogo_p,
    },
    {
      name: "Pulse Boost",
      route: "https://pulse.smytten.com/boost",
      logo: boostlogo,
      activelogo: boostlogo_p,
    },
    // { name: "Pulse Lite", route: "" },
  ];

  const Resources = [
    { name: "Blog", route: "https://blog.smytten.com/" },
    // { name: "Success Stories", route: "" },
    { name: "About Us", route: "https://blog.smytten.com/about-me/" },
  ];

  const navigate_partners = () => {
    redirectToPath("/partners");
  };

  const navigateclickhandler = (name, e) => {
    // if (name === "Our Solutions") {
    //   setAnchorEl(e.currentTarget);
    //   return
    // }

    if (Object.keys(clicked).length > 0) {
      setClicked({});
    } else {
      if (name.id !== 2) {
        setClicked(name);
        // setContainerVisible(true);
        setAnchorEl(e.currentTarget);
        if (name.id === 1) {
          setRendered(our_solutions);
        } else {
          setRendered(Resources);
        }
      }
      if (name.id === 2) {
        navigate_partners();
      }
    }
  };

  const optionsClickHandler = (e) => {
    setAnchorEl(null);
    setRendered([]);
    setClicked({});
    setHoverObj({});
  };
  const navbar_list = partner
    ? [
        { name: "Our Solutions", id: 1 },
        { name: "Partners Program", id: 2 },
      ]
    : [{ name: "Our Solutions", id: 1 }];

  return (
    <>
      <div
        className={`width-100 ${
          !isScrolled
            ? "srcolled-navbar-component-container"
            : "navbar-component-container"
        } desktop-only`}
      >
        <div className="navbar-component-cotainer-inner flex-space-between-center">
          <img
            style={{ height: "54px" }}
            onClick={() => {
              if (partner === undefined) {
              }
              navigate("/");
            }}
            src={smyttenlogo}
            alt=""
          />
          <div className="flex-flex-end-center">
            <div className="flex-flex-start-center top-navigation-container">
              {navbar_list.map((name, ind) => {
                return (
                  <div
                    className=" top-navigation-container-cell position-relative"
                    key={ind}
                    style={{
                      color: clicked.name === name.name ? "#8639fc" : "#242424",
                      paddingLeft: "8px",
                    }}
                  >
                    <div
                      onClick={(e) => {
                        navigateclickhandler(name, e);
                      }}
                    >
                      {name.name}
                      {name.id !== 2 && (
                        <FontAwesomeIcon
                          style={{
                            marginTop: "3px",
                            marginLeft: "8px",
                            color:
                              clicked.name === name.name ? "#8639fc" : "#000",
                          }}
                          icon={
                            clicked.name === name.name ? faAngleUp : faAngleDown
                          }
                        />
                      )}
                    </div>

                    {/* {Object.keys(clicked).length > 0 &&
                      containerVisible &&
                      clicked.name === name.name && (
                        <div
                          ref={containerRef}
                          className="my-custom-styledpop-over"
                        >
                          {rendered.map((e, i) => {
                            return <p>hello</p>;
                            return (
                              <a
                                className="top-nav-bar-redirection-links-anchor"
                                href={e.route}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <div
                                  key={i}
                                  className="single-custom-styledpop-over"
                                >
                                  <div className="flex-flex-start-center">
                                    <img
                                      src={e.logo}
                                      alt="s"
                                      className="mr-8px"
                                      style={{ width: "20px", height: "20px" }}
                                    />
                                    <p className="top-nav-bar-redirection-links">
                                      {e?.name}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      )} */}
                  </div>
                );
              })}
            </div>
            <a href="/brandsdashboard">
              <div
                onClick={() => {
                  addEvent("button_click", {
                    type: "User_login",
                  });
                  add_ga_event("button_click", {
                    type: "User_login",
                  });
                }}
                className="signin-btn mr-8px"
              >
                Sign In
              </div>
            </a>
            <a href={signup_page_link}>
              <div
                onClick={() => {
                  addEvent("button_click", {
                    type: "User_signup",
                  });
                  add_ga_event("button_click", {
                    type: "User_signup",
                  });
                }}
                className="signup-btn"
              >
                Sign Up
              </div>
            </a>
          </div>
          <StyledPopover
            id={iconsid}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: 12,
            }}
            style={{ top: "30px" }}
            className="custom-styled-pop-over"
          >
            {rendered.map((e, i) => {
              return (
                <div
                  onMouseEnter={() => {
                    setHoverObj(e);
                  }}
                  onMouseLeave={() => {
                    setHoverObj({});
                  }}
                >
                  <Typography
                    onClick={() => {
                      optionsClickHandler(e);
                    }}
                    key={i}
                  >
                    <a
                      className="top-nav-bar-redirection-links-anchor"
                      href={e.route}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <div className="flex-flex-start-center">
                        <img
                          src={
                            hover_obj?.name === e.name ? e.activelogo : e.logo
                          }
                          alt=""
                          className="mr-8px"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <p className="top-nav-bar-redirection-links m-0px">
                          {e?.name}
                        </p>
                      </div>
                    </a>
                  </Typography>
                </div>
              );
            })}
          </StyledPopover>
        </div>
      </div>

      <div className="mobile-only">
        <div
          style={{ transition: "all 1s ease" }}
          className={`width-100 navbar-component-container-mobile ${
            open_drawer && "navbar-component-container-mobile-open"
          }`}
        >
          <div
            style={{ height: "72px", padding: "0px 20px", background: "#fff" }}
            className="flex-space-between-center width-100"
          >
            <img
              onClick={() => {
                navigate("/");
              }}
              style={{ height: "32px" }}
              src={smyttenlogo}
              alt=""
            />
            <FontAwesomeIcon
              onClick={() => {
                showDrawer();
              }}
              icon={open_drawer ? faClose : faBars}
            />
          </div>

          {open_drawer && (
            <div
              className={`${
                open_drawer ? "menu-container-open" : "menu-container-close"
              } menu-container width-100`}
            >
              <div
                style={{ gap: "32px" }}
                className="flex-space-between-center width-100"
              >
                {/* <div
                  onClick={() => {
                    addEvent("button_click", {
                      type: "User_login",
                    });
                    add_ga_event("button_click", {
                      type: "User_login",
                    });
                    redirectToPath("/brandsdashboard/");
                  }}
                  className="signin-btn width-50"
                >
                  Sign In
                </div> */}

                <div
                  onClick={() => {
                    addEvent("button_click", {
                      type: "User_signup",
                    });
                    add_ga_event("button_click", {
                      type: "User_signup",
                    });
                    redirectToPath(
                      "/brandsdashboard/signup#request-demo-form-container"
                    );
                  }}
                  className="signup-btn width-100"
                >
                  Sign Up
                </div>
              </div>
              <div className="width-100 main-page-redirection-container">
                <div className="flex-space-between-center width-100">
                  <h1
                    style={{
                      color: mobile_main_pages.our_solutions
                        ? "#242424"
                        : "#242424",
                    }}
                    className=" flex-center-center m-0px main-page-redirection"
                  >
                    Our Solutions{" "}
                  </h1>

                  <FontAwesomeIcon
                    onClick={() => {
                      opensubpage("our_solutions");
                    }}
                    icon={
                      mobile_main_pages.our_solutions ? faAngleUp : faAngleDown
                    }
                  />
                </div>

                {mobile_main_pages.our_solutions && (
                  <div className="sub-pages-main-container flex-flex-start-flex-start flex-column">
                    {our_solutions.map((single, index) => {
                      return (
                        <a
                          key={index}
                          href={single.route}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={single?.logo} className="mr-8px" alt="" />
                          {single.name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              {partner && (
                <div
                  style={{ paddingBottom: "16px" }}
                  className="width-100 main-page-redirection-container"
                >
                  <div
                    onClick={() => {
                      navigate_partners();
                    }}
                    className="flex-space-between-center width-100"
                  >
                    <h1 className=" flex-flex-start-center m-0px main-page-redirection">
                      Partners program
                    </h1>
                    <img src={farightup} alt="" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function Navbarpage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getcontent = (index) => {
    switch (index) {
      case 0:
        return <img src={pulse_check} alt="" />;
      case 1:
        return <img src={pulse_boost} alt="" />;
      case 2:
        return <img src={pulse_scan} alt="" />;
      default:
        return "";
    }
  };

  return (
    <div className="navbar-component-main width-100">
      <div className="page-1-main-container max-width-landing-page width-100">
        <div className="page-1-left  height-100  ">
          <div className="page-1-left-heading-changer text-left position-relative">
            <h1
              className={`page-1-left-heading heading-text-1 ${
                currentIndex === 0 ? "active-11" : ""
              }`}
              style={{ animationDelay: `${2}s` }}
            >
              Get{" "}
              <span className="color-pulse weight-700"> Consumer Research</span>{" "}
              Done
              <br /> In Just 72 Hours
            </h1>
            <h1
              className={`page-1-left-heading heading-text-3 ${
                currentIndex === 1 ? "active-11" : ""
              }`}
              style={{ animationDelay: `${2}s` }}
            >
              <span className="color-pulse weight-700"> Advertise</span> To Your
              Audience <br />
              With Intent-Targeting
            </h1>
            <h1
              className={`page-1-left-heading heading-text-2 ${
                currentIndex === 2 ? "active-11" : ""
              }`}
              style={{ animationDelay: `${2}s` }}
            >
              Turn Data Into Actions <br />
              With Genuine{" "}
              <span className="color-pulse weight-700">
                {" "}
                Consumer Insights
              </span>{" "}
            </h1>
          </div>

          <div className="page-1-partician mt-16px mb-16px"></div>
          <p className="page-1-left-text desktop-only">
            Step into the new era of consumer engagement, and make strategic
            decisions based on real-time, accurate, and targeted consumer
            insights
          </p>
          <p className="page-1-left-text mobile-only">
            Step into the new era of consumer engagement, and make strategic
            decisions based on real-time, accurate, and targeted consumer
            insights
          </p>
          <a href={signup_page_link}>
            <div
              onClick={() => {
                addEvent("button_click", {
                  type: "User_signup",
                });
                add_ga_event("button_click", {
                  type: "User_signup",
                });
              }}
              style={{ width: "156px" }}
              className="signup-btn mt-32px"
            >
              Sign Up
            </div>
          </a>
        </div>
        <div className="page-1-right  lottie-in-page-1">
          {/* <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="lottie-in-page-1"
          /> */}
          <img
            style={{ maxWidth: "100%" }}
            className="ring-image"
            src={topring}
            alt=""
          />
          <div className="render-image-details">
            {getcontent(currentIndex1)}
          </div>
        </div>
      </div>
    </div>
  );
}
