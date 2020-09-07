import React from "react";

import { MapContext } from "./Map";

interface MarkerClustererContextValue {
  addMarker(marker: kakao.maps.Marker): void;
  removeMarker(marker: kakao.maps.Marker): void;
}

export const MarkerClustererContext = React.createContext<MarkerClustererContextValue | null>(
  null
);

export interface MarkerClustererProps {
  options: kakao.maps.MarkerClustererOptions;
}

export class MarkerClusterer extends React.PureComponent<MarkerClustererProps> {
  public static contextType = MapContext;
  public context!: React.ContextType<typeof MapContext>;

  private readonly markerClusterer: kakao.maps.MarkerClusterer;
  private readonly contextValue: MarkerClustererContextValue;

  private addMarkerQueue: kakao.maps.Marker[] = [];
  private removeMarkerQueue: kakao.maps.Marker[] = [];

  private addMarkerTimeout: number | null = null;
  private removeMarkerTimeout: number | null = null;

  constructor(props: MarkerClustererProps) {
    super(props);
    this.markerClusterer = new kakao.maps.MarkerClusterer(props.options);
    this.contextValue = {
      addMarker: this.addMarker.bind(this),
      removeMarker: this.removeMarker.bind(this),
    };
  }

  public componentDidMount() {
    const map = this.context;
    this.markerClusterer.setMap(map);
  }

  public componentWillUnmount() {
    this.markerClusterer.clear();
    this.markerClusterer.setMap(null);
  }

  public render() {
    return (
      <MarkerClustererContext.Provider value={this.contextValue}>
        {this.props.children}
      </MarkerClustererContext.Provider>
    );
  }

  private addMarker(marker: kakao.maps.Marker) {
    this.addMarkerQueue.push(marker);
    if (this.addMarkerTimeout) {
      clearTimeout(this.addMarkerTimeout);
      this.addMarkerTimeout = null;
    }
    this.addMarkerTimeout = setTimeout(() => {
      this.markerClusterer.addMarkers(this.addMarkerQueue);
      this.addMarkerQueue = [];
    }, 10);
  }

  private removeMarker(marker: kakao.maps.Marker) {
    this.removeMarkerQueue.push(marker);
    if (this.removeMarkerTimeout) {
      clearTimeout(this.removeMarkerTimeout);
      this.removeMarkerTimeout = null;
    }
    this.removeMarkerTimeout = setTimeout(() => {
      this.markerClusterer.removeMarkers(this.removeMarkerQueue);
      this.removeMarkerQueue = [];
    }, 10);
  }
}
