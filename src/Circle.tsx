import React from "react";

import { MapContext } from "./Map";

export interface CircleProps {
  options: kakao.maps.CircleOptions;
}

export class Circle extends React.PureComponent<CircleProps> {
  public static contextType = MapContext;
  public context!: React.ContextType<typeof MapContext>;

  private readonly circle: kakao.maps.Circle;

  constructor(props: CircleProps) {
    super(props);
    this.circle = new kakao.maps.Circle(this.props.options);
  }

  public componentDidMount() {
    const map = this.context;
    this.circle.setMap(map);
  }

  public componentDidUpdate(prevProps: Readonly<CircleProps>) {
    if (prevProps.options !== this.props.options) {
      this.circle.setOptions(this.props.options);
    }
  }

  public componentWillUnmount() {
    this.circle.setMap(null);
  }

  public render() {
    return null;
  }
}
