import React from 'react';

class GameListItemComponent extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  render() {
    return (
      <li onClick={this.selectGame.bind(this)}>Game by {this.props.game.playerOne}</li>
    );
  }
}

export default GameListItemComponent;
