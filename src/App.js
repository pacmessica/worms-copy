import React from 'react';
import GameModel from './models/GameModel';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';



const headerStyle = {
  textAlign: "center"
};

const containerStyles = {
  width: "500px",
  height: "500px",
  margin: "auto",
};

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

    this.state = {
      games: [],
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });
  }

  createGame( newPlayer ) {
    this.games.addResource({
      playerOne: newPlayer
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={containerStyles}>
        <h1 style={headerStyle}>Games Menu</h1>
        <NewGameComponent onCreate={this.createGame.bind(this)}/>
        <GameListComponent games={this.state.games}/>
      </div>
    );
  }
}

export default App;
