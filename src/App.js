import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';
import WormComponent from './components/WormComponent';

import RayGunComponent from './components/RayGunComponent';

import LaserComponent from './components/LaserComponent';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: null,
      currentPosition: 100,
      laserPosition: null,
      laserActivated: false
    };


    let app = this;
   document.addEventListener("keydown", function(event) {
    let keyCode = event.keyCode;
      if(keyCode===37) {
        app.onLeftArrowKeypress();
      }
      else if(keyCode===39){
        app.onRightArrowKeypress();
      }
      else if(keyCode===32){
        app.onEnterKeypress();
      }
    }, false);

  }

  onRightArrowKeypress() {
    console.log(" hello")
    this.moveWorm(10);

  }

  onLeftArrowKeypress() {
    console.log(" yes")
    this.moveWorm(-10);

  }

  onEnterKeypress(){
    console.log(" shoot her")
    this.shootRayGun(this.state.currentPosition);
  }



  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          component.setState({
            currentGame: game
          });
        }
      });
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
  }


  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
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

  moveWorm(positionDifference) {
    var newPosition = this.state.currentPosition + positionDifference

    if (this.state.currentGame.playerOne == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerOnePosition: newPosition });
    }

    if (this.state.currentGame.playerTwo == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerTwoPosition: newPosition });
    }

    this.setState({
      currentPosition: newPosition
    });
  }


  shootRayGun(Position) {
    console.log("raygun activated");
    this.setState({
      laserPosition: Position,
      laserActivated: true
    });

    if (this.state.laserPosition > 500) {
      this.setState({
        laserActivated: false
      });
    }

    if ( this.state.laserActivated ) {
      var newPosition = Position + 10;
      setTimeout(function(){this.shootRayGun(newPosition)}.bind(this),40);
    }
  }

  renderLaser() {
    if(this.state.laserActivated){
      return <LaserComponent x={this.state.laserPosition}/>
    }
  }



  render() {

    return (
      <div style={this.containerStyles()}>
        <h1 style={this.headerStyle()}>~*LASER WORMZ*~</h1>
        { this.state.currentPlayer !== null &&
          <p>Hi, {this.state.currentPlayer}</p> }

        { this.state.currentPlayer === null &&
          <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

        { this.state.currentGame === null &&
          <GameListComponent games={this.state.games} onSelect={this.joinGame.bind(this)}/> }

        { this.state.currentGame === null &&
          <NewGameComponent onCreate={this.createGame.bind(this)}/> }

        { this.state.currentGame !== null &&
          <div className="game">
            <p>Player one: {this.state.currentGame.playerOne}</p>
            <p>Player two: {this.state.currentGame.playerTwo}</p>
            <WormComponent x={this.state.currentPosition.playerOnePosition} />
            <WormComponent x={this.state.currentGame.playerTwoPosition} />
            <RayGunComponent x={this.state.currentPosition} />
            {this.renderLaser()}
        </div>}
      </div>
    );
  }
}

export default App;
