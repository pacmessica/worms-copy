import React from 'react';

class LaserComponent extends React.Component {
  constructor() {
    super();
  }

  laserStyle() {
    return {
      position: "fixed",
      width: "5px",
      height: "5px",
      backgroundColor: "green",
      left: this.props.x + 10 + "px",
      top: "500px"
    };
  }

  render() {
    console.log("shooty shoot")
    return (
      <div style={this.laserStyle()}>
      </div>
    );
  }
}

export default LaserComponent;
