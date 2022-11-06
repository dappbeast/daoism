import dynamic from "next/dynamic";
import React from "react";

const NoSSR = dynamic(() => import("./NoSSRWrapper"), {
  ssr: false,
});

export default NoSSR;
