import React from 'react';

class WormControls extends React.Component {
  goRight() {
    this.props.onMove(10);
  }

  goLeft() {
    this.props.onMove(-10);
  }

  render() {
    return (
      <div>
        <button onClick={this.goRight.bind(this)}>Right!</button>
        <button onClick={this.goLeft.bind(this)}>Left!</button>
      </div>
    );
  }
}

export default WormControls;
