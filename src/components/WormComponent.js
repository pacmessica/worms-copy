import React from 'react';

class WormComponent extends React.Component {
  constructor() {
    super();
  }

  wormStyle() {
    return {
      position: "fixed",
      width: "10px",
      height: "10px",
      backgroundColor: "red",
      left: this.props.x + "px",
      top: this.props.y + "px"
    };
  }

  render() {
    console.log("position x is " + this.props.x)
    console.log("position y is " + this.props.y)
    return (
      <div style={this.wormStyle()}>
      </div>
    );
  }
}

export default WormComponent;
