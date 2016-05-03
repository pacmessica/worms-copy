import React from 'react';
import GameModel from './models/GameModel';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

    this.state = {
      games: [],
      currentGame: null
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });
  }

  createGame(newPlayer) {
    this.games.addResource({
      playerOne: newPlayer
    });
  }

  containerStyles() {
    return {
      width: "500px",
      height: "500px",
      margin: "auto",
    };
  }

  headerStyle() {
    return {
      textAlign: "center"
    };
  }

  selectGame(game) {
    this.setState({
      currentGame: game
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={this.containerStyles()}>
        <h1 style={this.headerStyle()}>Rock Paper Scissors</h1>
        <NewGameComponent onCreate={this.createGame.bind(this)}/>
        <GameListComponent games={this.state.games} onSelect={this.selectGame.bind(this)}/>
      </div>
    );
  }
}

export default App;
