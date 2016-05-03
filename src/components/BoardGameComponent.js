import React from 'react';

class BoardGameComponent extends React.Component {
  selectGame(game) {
    this.props.onSelect(game);
  }

  render() {
    return (

    );
  }
}

export default BoardGameComponent;
