import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <div>
        {/* <h1>Loading</h1> */}
        <ScaleLoader color={'black'} />
      </div>
    </>
  );
};

export default Loading;
