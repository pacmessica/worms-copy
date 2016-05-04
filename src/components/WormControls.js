import React from 'react';

class WormControls extends React.Component {
  goRight() {
    this.props.onMove(10);
  }

  goLeft() {
    this.props.onMove(-10);
  }

  arrowPress() {
    this.props.onMove(this.props.difference);
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
