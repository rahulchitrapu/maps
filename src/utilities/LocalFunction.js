import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

export const hasCapitalLetter = (str) => /[A-Z]/.test(str);

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const window_is_in_size = (size) => {
  let width = window.innerWidth;

  if (width <= size) {
    return true;
  } else {
    return false;
  }
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const GetStartdateEnddate = () => {
  const [searchParams] = useSearchParams();
  if (
    !localStorage.getItem("start_date") ||
    localStorage.getItem("start_date") === "undefined"
  ) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    localStorage.setItem("start_date", formatDate(startDate));
    localStorage.setItem("end_date", formatDate(new Date()));
  }

  // Update start_date and end_date if "date" search param is present
  if (searchParams.get("date")) {
    const [start, end] = searchParams.get("date").split("to");
    localStorage.setItem("start_date", start);
    localStorage.setItem("end_date", end);
  }
  const startDate = localStorage.getItem("start_date");
  const endDate = localStorage.getItem("end_date");
  return {
    startDate,
    endDate,
  };
};

export function redirectToPath(pathname, target = "_self") {
  // Create a new anchor element
  const anchor = document.createElement("a");

  // Set the href attribute to the provided pathname
  anchor.href = pathname;

  // Set the target attribute
  anchor.target = target;

  // Append the anchor to the document body
  document.body.appendChild(anchor);

  // Simulate a click event on the anchor to redirect the page
  anchor.click();

  // Clean up: remove the anchor from the DOM
  anchor.remove();
}

export const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobi|android|touch|mini/.test(userAgent)) {
    return "mobile";
  } else if (/iphone/.test(userAgent)) {
    return "iphone";
  } else {
    return "desktop";
  }
};

export const GetSearchParam=(search)=>{
  const [searchParams] = useSearchParams();

  return searchParams.get(search)
}
