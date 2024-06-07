import React from "react";
import DatamapsIndia from "react-datamaps-india";
import "./map.css";

let obj = {
  "Andhra Pradesh": {
    value: 3,
  },
  "Arunachal Pradesh": {
    value: 5,
  },
  Assam: {
    value: 5,
  },
  Bihar: {
    value: 6,
  },
  Chhattisgarh: {
    value: 4,
  },
  Goa: {
    value: 1,
  },
  Gujarat: {
    value: 1,
  },
  Haryana: {
    value: 2,
  },
  "Himachal Pradesh": {
    value: 2,
  },
  Jharkhand: {
    value: 6,
  },
  Karnataka: {
    value: 3,
  },
  Kerala: {
    value: 3,
  },
  "Madhya Pradesh": {
    value: 4,
  },
  Maharashtra: {
    value: 1,
  },
  Manipur: {
    value: 5,
  },
  Meghalaya: {
    value: 5,
  },
  Mizoram: {
    value: 5,
  },
  Nagaland: {
    value: 5,
  },
  Odisha: {
    value: 6,
  },
  Punjab: {
    value: 2,
  },
  Rajasthan: {
    value: 1,
  },
  Sikkim: {
    value: 5,
  },
  "Tamil Nadu": {
    value: 3,
  },
  Telangana: {
    value: 3,
  },
  Tripura: {
    value: 5,
  },
  "Uttar Pradesh": {
    value: 2,
  },
  Uttarakhand: {
    value: 2,
  },
  "West Bengal": {
    value: 6,
  },
  "Jammu & Kashmir": {
    value: 2,
  },
};

export default function Map1() {
  return (
    <div
      className="map-container"
      style={{ width: "500px", height: "500px", border: "1px solid red" }}
    >
      <DatamapsIndia
        regionData={obj}
        hoverComponent={({ value }) => {
          return (
            <div className="" style={{ top: "0px", left: "0px" }}>
              {/* <img
                src="https://www.shutterstock.com/image-photo/vidhan-soudha-bangalore-_-image-600nw-1433353757.jpg"
                alt=""
              /> */}
              <div>hello {value.name}</div>
            </div>
          );
        }}
        fills={{
          defaultFill: "#ABDDA4",
          "IN-AP": "white",
        }}
        mapLayout={{
          title: "",
          legendTitle: "Number of Tenders",
          startColor: "#F9F7F3",
          endColor: "#3EBF6D",
          //   startColor: "red",
          //   endColor: "green",
          hoverTitle: "Count",
          noDataColor: "#f5f5f5",
          borderColor: "#8D8D8D",
          hoverBorderColor: "#8D8D8D",
          hoverColor: "orange",
          height: 70,
          weight: 30,
          fill: {
            Kerala: "#fff", // Set custom color for Kerala
            defaultFill: "#ABDDA4", // Default fill color for other regions
          },
        }}
        className={"test"}
      />
    </div>
  );
}
