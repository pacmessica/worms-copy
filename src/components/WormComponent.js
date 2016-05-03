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
      top: "500px"
    };
  }

  render() {
    console.log(this.props.x)
    return (
      <div style={this.wormStyle()}>
      </div>
    );
  }
}

export default WormComponent;
