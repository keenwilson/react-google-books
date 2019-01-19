import React from "react";

const Save = props => {
  let classes = "far fa-bookmark";
  if (!props.saved) classes = "fas fa-bookmark";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Save;
