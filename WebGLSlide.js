import React from "react";
import start from "./visualisation";

export default class WebGLSlide extends React.Component {
  componentDidMount() {
    const canvas = document.createElement("canvas");

    canvas.setAttribute("height", window.innerHeight);
    canvas.setAttribute("width", window.innerWidth);
    canvas.style.position = "static";
    canvas.style.top = 0;
    canvas.style.left = 0;

    this.canvas = canvas;
    this._output.appendChild(canvas);

    start(canvas);
  }

  componentWillUnmount() {
    this._output.removeChild(this.canvas);
  }

  render() {
    return <div ref={el => (this._output = el)} />;
  }
}
