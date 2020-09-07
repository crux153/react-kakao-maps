import React, { useContext, useEffect, useMemo } from "react";

import { MapContext } from "./Map";
import { MarkerClustererContext } from "./MarkerClusterer";

export interface MarkerProps {
  options: kakao.maps.MarkerOptions;
  onClick?(event: any): void;
  onMouseOver?(event: any): void;
  onMouseOut?(event: any): void;
}

export const Marker = React.memo(
  ({ options, onClick, onMouseOver, onMouseOut }: MarkerProps) => {
    const marker = useMemo(() => new kakao.maps.Marker(options), []);

    const map = useContext(MapContext);
    const clusterer = useContext(MarkerClustererContext);

    useEffect(() => {
      if (clusterer) {
        clusterer.addMarker(marker);
      } else {
        marker.setMap(map);
      }
      return () => {
        if (clusterer) {
          clusterer.removeMarker(marker);
        } else {
          marker.setMap(null);
        }
      };
    }, [map, clusterer]);

    useEffect(() => {
      if (onClick) {
        kakao.maps.event.addListener(marker, MarkerEvent.click, onClick);
        return () => {
          kakao.maps.event.removeListener(marker, MarkerEvent.click, onClick);
        };
      }
    }, [marker, onClick]);

    useEffect(() => {
      if (onMouseOver) {
        kakao.maps.event.addListener(
          marker,
          MarkerEvent.mouseover,
          onMouseOver
        );
        return () => {
          kakao.maps.event.removeListener(
            marker,
            MarkerEvent.mouseover,
            onMouseOver
          );
        };
      }
    }, [marker, onMouseOver]);

    useEffect(() => {
      if (onMouseOut) {
        kakao.maps.event.addListener(marker, MarkerEvent.mouseout, onMouseOut);
        return () => {
          kakao.maps.event.removeListener(
            marker,
            MarkerEvent.mouseout,
            onMouseOut
          );
        };
      }
    }, [marker, onMouseOut]);

    useEffect(() => {
      if (typeof options.altitude !== "undefined") {
        marker.setAltitude(options.altitude);
      }
    }, [marker, options.altitude]);

    useEffect(() => {
      if (typeof options.clickable !== "undefined") {
        marker.setClickable(options.clickable);
      }
    }, [marker, options.clickable]);

    useEffect(() => {
      if (typeof options.draggable !== "undefined") {
        marker.setDraggable(options.draggable);
      }
    }, [marker, options.draggable]);

    useEffect(() => {
      if (typeof options.image !== "undefined") {
        marker.setImage(options.image);
      }
    }, [marker, options.image]);

    useEffect(() => {
      if (typeof options.map !== "undefined") {
        marker.setMap(options.map);
      }
    }, [marker, options.map]);

    useEffect(() => {
      if (typeof options.opacity !== "undefined") {
        marker.setOpacity(options.opacity);
      }
    }, [marker, options.opacity]);

    useEffect(() => {
      if (typeof options.position !== "undefined") {
        marker.setPosition(options.position);
      }
    }, [marker, options.position]);

    useEffect(() => {
      if (typeof options.range !== "undefined") {
        marker.setRange(options.range);
      }
    }, [marker, options.range]);

    useEffect(() => {
      if (typeof options.title !== "undefined") {
        marker.setTitle(options.title);
      }
    }, [marker, options.title]);

    useEffect(() => {
      if (typeof options.zIndex !== "undefined") {
        marker.setZIndex(options.zIndex);
      }
    }, [marker, options.zIndex]);

    return null;
  }
);

enum MarkerEvent {
  click = "click",
  mouseover = "mouseover",
  mouseout = "mouseout",
}
