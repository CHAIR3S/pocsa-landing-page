"use client"  

import { useMemo } from "react";
import Lottie from "lottie-react";
import furData from "../public/animations/deliver.json"; 

export function PackageAnimation({
  width = 300,
  height = 300,
  loop = true,
  autoplay = true,
}: {
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
}) {
  const animationData = useMemo(() => furData, []);

  return (
    <div style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
