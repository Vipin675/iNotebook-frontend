import React from "react";

const Alert = (props) => {
  return (
    <>
      {props.alert && (
        <div
          className={`container alert alert-${props.alert.type}`}
          role="alert"
        >
          <strong>
            {props.alert.type}: {props.alert.message}
          </strong>
        </div>
      )}
    </>
  );
};

export default Alert;
