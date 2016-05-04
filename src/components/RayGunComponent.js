import React from 'react';

class RayGunComponent extends React.Component {
  constructor() {
    super();
  }

  gunStyle() {
    return {
      position: "fixed",
      width: "5px",
      height: "5px",
      backgroundColor: "black",
      left: this.props.x + 5 + "px",
      top: "500px"
    };
  }

  render() {
    console.log(this.props.x)
    return (
      <div style={this.gunStyle()}>
      </div>
    );
  }
}

export default RayGunComponent;
