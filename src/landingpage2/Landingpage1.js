import React, { useEffect, useRef, useState } from "react";
import Navbarpage, { Navbar } from "./pages/Navbarpage";
import Page1 from "./pages/Page1";
import RequestHandler from "./pages/RequestHandler";
import Pageboost from "./pages/Pageboost";
import Pagecheck from "./pages/Pagecheck";
import Pagescan from "./pages/Pagescan";
import Footerpage from "./pages/Footerpage";
import "../global.css";
// import FacebookPixel from "../../utilities/FacebookPixel";

export default function Landingpage1() {
  const [isScrolled, setIsScrolled] = useState(0);
  const [open_drawer, setOpenDrawer] = useState(false);
  const demoref = useRef(null);
  const checkref = useRef(null);
  const scanref = useRef(null);
  const boostref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute("href", window.location.href);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }
    return () => {
      if (linkCanonical) {
        linkCanonical.remove();
      }
    };
  }, []);

  return (
    <div style={{}}>
      <Navbar
        open_drawer={open_drawer}
        setOpenDrawer={(flag) => setOpenDrawer(flag)}
        isScrolled={isScrolled}
        partner={true}
      />

      <div className={`${open_drawer && "blur-container-mobile"}`}>
        <Navbarpage isScrolled={isScrolled} />
        <Page1 checkref={checkref} boostref={boostref} scanref={scanref} />

        <RequestHandler demoref={demoref} />

        <Pageboost demoref={demoref} boostref={boostref} />

        <Pagecheck demoref={demoref} checkref={checkref} />
        <Pagescan demoref={demoref} scanref={scanref} />

        <Footerpage />
      </div>

      {/* <FacebookPixel /> */}
    </div>
  );
}
