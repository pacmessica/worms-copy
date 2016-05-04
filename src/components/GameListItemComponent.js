import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

class GameListItemComponent extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  render() {
    return (
      <li>
        <FlatButton onClick={this.selectGame.bind(this)} label="Join" primary={true}/>
        Game by {this.props.game.playerOne}
      </li>
    );
  }
}

export default GameListItemComponent;
