import React, { useState } from "react";
import "./RequestHandler.css";
import smyttenpointers from "../images/SmyttenPointers.png";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import SuccessModal from "./SuccesModal";
import { checkSurveyEnv } from "../../utilities/CheckEnv";

export const describeOptions = [
  "Skin care, Haircare, Bath & Shower",
  "Makeup & Fragrance",
  "Petcare",
  "Food & Beverages, Health & Wellness",
  "Pharma",
  "Manufacturing/Industrial",
  "Apparels",
  "Education",
  "Automobile industry",
  "Tourism & Hospitality",
  "Media & Entertainment",
  "Other",
];

export const aboutOptions = [
  "LinkedIn",
  "Social Media",
  "Search engine",
  "Blogs",
  "Friends / Colleagues",
  "Other",
];

export const validatePhoneNumber = (inputNumber) => {
  // Your custom regular expression for phone number validation
  const phoneNumberRegex =
    /^((091|\+91)?|\((091|\+91)?\)|(91)?|\(91\)|0)? ?[6-9][0-9]{9}$/gm;
  return phoneNumberRegex.test(inputNumber);
};
export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export default function RequestHandler({ demoref }) {
  const [searchParams] = useSearchParams();
  const [landingpagePopup, setLandingPagePopup] = useState(false);
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [error, setError] = useState(false);
  const [spin, setspin] = useState(false);
  const [data, setData] = useState({
    fitst_name: "",
    last_name: "",
    companyName: "",
    companyWebSite: "",
    Phone: "",
    personal_email: "",
    business_email: "",
    message: "",
    about: "",
    describe: "",
    describe_text: "",
    about_text: "",
  });

  const surveyUrl = checkSurveyEnv();

  const onchangeHandler = (e, key) => {
    let copy = data;
    copy[key] = e.target.value;
    if (key === "fitst_name" || key === "last_name") {
      copy[key] = e.target.value.replace(
        /[0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/g,
        ""
      );
    }
    setData({ ...copy });
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;

    const regex = /^[0-9]{0,10}$/;
    if (value.length <= 10 && regex.test(value)) {
      let copy = data;
      copy[key] = e.target.value;
      setData({ ...copy });
    }
  };

  let searchparamsobj = {};

  for (let entry of searchParams.entries()) {
    searchparamsobj[entry[0]] = entry[1];
  }

  const requestDemoHandler = (e) => {
    e.preventDefault();
    // setLandingPagePopup(true)
    let error = false;
    Object.keys(data).forEach((e) => {
      // ['message','personal_email','describe_text','about_text']
      if (
        !["message", "personal_email", "describe_text", "about_text"].includes(
          e
        ) &&
        data[e] === ""
      ) {
        error = true;
        setError(true);
      }
    });

    if (!data.business_email.match(validRegex)) {
      error = true;
      setError(true);
    }

    if (!validatePhoneNumber(data.Phone)) {
      error = true;
      setError(true);
    }

    if (!isValidUrl(data.companyWebSite)) {
      error = true;
      setError(true);
    }

    if (data.describe === "Other" && data.describe_text === "") {
      error = true;
      setError(true);
    }
    if (data.about === "Other" && data.about_text === "") {
      error = true;
      setError(true);
    }

    if (!error) {
      setspin(true);
      axios
        .post(`${surveyUrl}/smyttenresearch/landingpage/`, {
          first_name: data.fitst_name,
          last_name: data.last_name,
          organization_name: data.companyName,
          organization_website: data.companyWebSite,
          personal_email: data.personal_email,
          phone_number: data.Phone,
          medium: data.about === "Other" ? data.about_text : data.about,
          company_identity:
            data.describe === "Other" ? data.describe_text : data.describe,
          message: data.message,
          business_email: data.business_email,
          white_paper_request: true,
          page_source: "pulse-dashboard",
          ...searchparamsobj,
        })
        .then((e) => {
          setspin(false);

          window.gtag("event", "demo_requested", {
            business_email: data.email,
            company_identity: data.companyName,
            first_name: data.fitst_name,
            last_name: data.last_name,
            personal_email: data.personal_email,
            organization_website: data.companyWebSite,
            medium: data.about === "Other" ? data.about_text : data.about,
            message: data.message,
            organization_name:
              data.describe === "Other" ? data.describe_text : data.describe,

            phone_number: data.Phone,
            white_paper_request: data.business_email,
            extra_params: { ...searchparamsobj },
            page_source: "pulse-dashboard",
            lead_id: e.data?.id,
            related_lead_id: e.data?.related_id,
          });

          setLandingPagePopup(true);
          setError(false);
          setData({
            fitst_name: "",
            last_name: "",
            companyName: "",
            companyWebSite: "",
            Phone: "",
            personal_email: "",
            business_email: "",
            message: "",
            about: "",
            describe: "",
          });
        })
        .catch((e) => {
          if (e.response.status === 413) {
            setLandingPagePopup(true);
            setData({
              fitst_name: "",
              last_name: "",
              companyName: "",
              companyWebSite: "",
              Phone: "",
              personal_email: "",
              business_email: "",
              message: "",
              about: "",
              describe: "",
            });
          }
          setError(false);
          setspin(false);
        });
    }
  };

  return (
    <>
      <div className="page-view-div request-handler-main-container ">
        <h1 className="request-handler-main-container-header">
          Find Consumers That Matter
        </h1>
        <p className="request-handler-main-container-content mt-8px">
          Discover insights, research, and engage with early adopters on Smytten
          (India’s largest tech-enabled trial & discovery platform) and enter
          the world of technology-driven marketing
        </p>
        <div className="request-handler-main-container-inner ">
          <div className="request-handler-main-container-left">
            <img style={{ maxWidth: "100%" }} src={smyttenpointers} alt="" />
          </div>
          <div className="request-handler-main-container-right position-relative">
            <div
              ref={demoref}
              className="width-100  request-handler-main-container-ref"
            ></div>
            <div className="width-100">
              <h1 className="request-handler-main-container-right-heading">
                {" "}
                Schedule a Free Demo{" "}
              </h1>
              <p className=" request-handler-main-container-right-text">
                Connect with our product experts for a personalised walk-through
                of our platform
              </p>
            </div>

            <form
              onSubmit={requestDemoHandler}
              className="width-100 request-demo-new-form"
            >
              <div className="flex-start">
                <label className="request-demo-single-label">
                  <p>
                    First Name <span className="color-red">*</span>
                  </p>
                  <input
                    required
                    value={data.fitst_name}
                    onChange={(e) => {
                      onchangeHandler(e, "fitst_name");
                    }}
                    type={"text"}
                    placeholder="First Name"
                    pattern="[A-Za-z]+"
                    title="Please enter only alphabetic characters"
                    className={error && data.fitst_name === "" && "border-red"}
                  ></input>
                </label>
                <label className="request-demo-single-label">
                  <p>
                    Last Name <span className="color-red">*</span>
                  </p>
                  <input
                    required
                    value={data.last_name}
                    onChange={(e) => {
                      onchangeHandler(e, "last_name");
                    }}
                    type={"text"}
                    placeholder="Last name"
                    className={error && data.last_name === "" && "border-red"}
                  ></input>
                </label>
              </div>
              <div className="flex-start">
                <label className="request-demo-single-label">
                  <p>
                    Phone Number<span className="color-red">*</span>
                  </p>
                  <input
                    required
                    type={"number"}
                    value={data.Phone}
                    onChange={(e) => {
                      handleInputChange(e, "Phone");
                    }}
                    placeholder="Phone number"
                    className={
                      error && !validatePhoneNumber(data.Phone) && "border-red"
                    }
                  ></input>
                </label>
                <label className="request-demo-single-label">
                  <p>Personal Email</p>
                  <input
                    type="email"
                    value={data.personal_email}
                    onChange={(e) => {
                      onchangeHandler(e, "personal_email");
                    }}
                    placeholder="example@gmail.com"
                  ></input>
                </label>
              </div>

              <div className="flex-start">
                <label className="request-demo-single-label">
                  <p>
                    Business Email <span className="color-red">*</span>
                  </p>
                  <input
                    required
                    type="email"
                    value={data.business_email}
                    onChange={(e) => {
                      onchangeHandler(e, "business_email");
                    }}
                    placeholder="example@yourcompany.com"
                    className={
                      error &&
                      !data.business_email.match(validRegex) &&
                      "border-red"
                    }
                  ></input>
                </label>
                <label className="request-demo-single-label">
                  <p>
                    Organization Name <span className="color-red">*</span>
                  </p>
                  <input
                    required
                    value={data.companyName}
                    onChange={(e) => {
                      onchangeHandler(e, "companyName");
                    }}
                    type={"text"}
                    placeholder="Organization name"
                    className={error && data.companyName === "" && "border-red"}
                  ></input>
                </label>
              </div>

              <div className="flex-start">
                <label className="request-demo-single-label">
                  <p>
                    Organization Website <span className="color-red">*</span>
                  </p>
                  <input
                    required
                    value={data.companyWebSite}
                    onChange={(e) => {
                      onchangeHandler(e, "companyWebSite");
                    }}
                    type={"text"}
                    placeholder="pulse.smytten.com"
                    className={
                      error && !isValidUrl(data.companyWebSite) && "border-red"
                    }
                  ></input>
                </label>
                <label className="request-demo-single-label">
                  <p>
                    {" "}
                    Organization Type <span className="color-red">*</span>
                  </p>
                  <select
                    value={data.describe}
                    required
                    onChange={(e) => {
                      onchangeHandler(e, "describe");
                    }}
                    className={error && data.describe === "" && "border-red"}
                  >
                    <option value={""}>Select</option>
                    {describeOptions.map((option) => {
                      return (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              {data.describe === "Other" && (
                <div className="flex-start">
                  <label className="request-demo-single-label width-100">
                    <p>
                      Please Specify <span className="color-red">*</span>
                    </p>
                    <input
                      required
                      type={"text"}
                      value={data.describe_text}
                      onChange={(e) => {
                        onchangeHandler(e, "describe_text");
                      }}
                      placeholder="Describe your Company"
                      className={
                        error && data.describe_text === "" && "border-red"
                      }
                    ></input>
                  </label>
                </div>
              )}
              <div className="flex-start">
                <label className="request-demo-single-label width-100">
                  <p>
                    How did you hear about Smytten Pulse?{" "}
                    <span className="color-red">*</span>
                  </p>
                  <select
                    value={data.about}
                    onChange={(e) => {
                      onchangeHandler(e, "about");
                    }}
                    className={error && data.about === "" && "border-red"}
                  >
                    <option value={""}>Select</option>
                    {aboutOptions.map((option) => {
                      return (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              {data.about === "Other" && (
                <div className="flex-start">
                  <label className="request-demo-single-label width-100">
                    <p>
                      {" "}
                      Please Specify <span className="color-red">*</span>
                    </p>
                    <input
                      required
                      type={"text"}
                      value={data.about_text}
                      onChange={(e) => {
                        onchangeHandler(e, "about_text");
                      }}
                      placeholder="How did you hear about Smytten Pulse"
                      className={
                        error && data.about_text === "" && "border-red"
                      }
                    ></input>
                  </label>
                </div>
              )}

              <div className="flex-start width-100">
                <label className="request-demo-single-label width-100">
                  <p>Message</p>
                  <textarea
                    value={data.message}
                    onChange={(e) => onchangeHandler(e, "message")}
                  ></textarea>
                </label>
              </div>
              <div className="flex-center-center">
                <button
                  type="submit"
                  onClick={(e) => {
                    requestDemoHandler(e);
                  }}
                  className="width-100 signup-btn"
                >
                  Submit Request
                  {spin && (
                    <Spinner
                      size={"sm"}
                      animation="border"
                      style={{ color: "white" }}
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {landingpagePopup && (
          <SuccessModal
            show={landingpagePopup}
            onHide={() => setLandingPagePopup(false)}
          />
        )}
      </div>
    </>
  );
}
