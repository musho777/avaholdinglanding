import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VectorSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M17 12H8M11 8l-4 4 4 4"
        stroke="#200E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default VectorSvg;
