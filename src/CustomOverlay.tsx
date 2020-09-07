import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { MapContext } from "./Map";

export interface CustomOverlayProps {
  options: Omit<kakao.maps.CustomOverlayOptions, "content">;
  children: React.ReactNode;
}

export const CustomOverlay = React.memo(function CustomOverlay({
  options,
  children,
}: CustomOverlayProps) {
  const content = useState(() => document.createElement("div"))[0];
  const customOverlay = useState(
    () =>
      new kakao.maps.CustomOverlay({
        ...options,
        content,
      })
  )[0];

  const map = useContext(MapContext);

  useEffect(() => {
    customOverlay.setMap(map);
    return () => customOverlay.setMap(null);
  }, [customOverlay, map]);

  useEffect(() => {
    if (typeof options.position !== "undefined") {
      customOverlay.setPosition(options.position);
    }
  }, [customOverlay, options.position]);

  useEffect(() => {
    if (typeof options.zIndex !== "undefined") {
      customOverlay.setZIndex(options.zIndex);
    }
  }, [customOverlay, options.zIndex]);

  return ReactDOM.createPortal(children, content);
});
