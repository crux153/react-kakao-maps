import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { MapContext } from "./Map";

export interface InfoWindowProps {
  options: Omit<kakao.maps.InfoWindowOptions, "content">;
  children: React.ReactNode;
}

export const InfoWindow = React.memo(function InfoWindow({
  options,
  children,
}: InfoWindowProps) {
  const content = useState(() => document.createElement("div"))[0];
  const infoWindow = useState(
    () =>
      new kakao.maps.InfoWindow({
        ...options,
        content,
      })
  )[0];

  const map = useContext(MapContext);

  useEffect(() => {
    infoWindow.open(map);
    return () => infoWindow.close();
  }, [infoWindow, map]);

  useEffect(() => {
    if (typeof options.altitude !== "undefined") {
      infoWindow.setAltitude(options.altitude);
    }
  }, [infoWindow, options.altitude]);

  useEffect(() => {
    if (typeof options.position !== "undefined") {
      infoWindow.setPosition(options.position);
    }
  }, [infoWindow, options.position]);

  useEffect(() => {
    if (typeof options.range !== "undefined") {
      infoWindow.setRange(options.range);
    }
  }, [infoWindow, options.range]);

  useEffect(() => {
    if (typeof options.zIndex !== "undefined") {
      infoWindow.setZIndex(options.zIndex);
    }
  }, [infoWindow, options.zIndex]);

  return ReactDOM.createPortal(children, content);
});
