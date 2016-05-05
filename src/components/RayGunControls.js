import React from 'react';

class RayGunControls extends React.Component {
  shoot() {
    this.props.onShoot(this.props.x);
  }

  render() {
    return (
      <div>
        <button onClick={this.shoot.bind(this)}>Shoot!</button>
      </div>
    );
  }
}

export default RayGunControls;
