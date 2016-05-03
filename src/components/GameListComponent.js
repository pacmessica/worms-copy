import React from 'react';

class GameListComponent extends React.Component {
  render() {
    console.log(this.state);
    return (
      <ul>
        {this.props.games.map(function(game) {
          return (<li key={game._id}>Game by {game.playerOne}</li>);
        })}
      </ul>
    );
  }
}

export default GameListComponent;
