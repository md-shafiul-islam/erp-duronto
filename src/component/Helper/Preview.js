import React from "react";

const Preview = ({ meta }) => {
  const { name, percent, status } = meta;
  return (
    <span
      style={{
        alignSelf: "flex-start",
        margin: "10px 3%",
        fontFamily: "Helvetica",
      }}
    >
      {name}, {Math.round(percent)}%, {status}
    </span>
  );
};

export default Preview;
