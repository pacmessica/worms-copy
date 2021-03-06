import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';
import WormComponent from './components/WormComponent';
import RayGunComponent from './components/RayGunComponent';
import LaserComponent from './components/LaserComponent';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from './lib/Theme';
import FlatButton from 'material-ui/lib/flat-button';

const containerStyles = {
  width: "500px",
  height: "500px",
  margin: "auto"
}

const headerStyle = {
  textAlign: "center",
  fontFamily: "Roboto"
}


class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: null,
      currentXPosition: 100,
      currentYPosition: 500,
      score: 0,
      lasers: []
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
        app.onSpaceKeypress();
      }
      else if(keyCode===38){
        app.onUpArrowKeypress();
      }
      else if(keyCode===40){
        app.onDownArrowKeypress();
      }
    }, false);

    setInterval(this.animateLaserBeam.bind(this), 100)
  }

  onRightArrowKeypress() {
    this.moveWorm(10);
  }

  onLeftArrowKeypress() {
    this.moveWorm(-10);
  }

  onSpaceKeypress(){
    this.shootRayGun(this.state.currentXPosition, this.state.currentYPosition);
  }

  onUpArrowKeypress(){
    this.jumpWorm(-10)
  }

  onDownArrowKeypress(){
    this.jumpWorm(10)
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
      window.alert("Cannot join game, it is full");
    }
  }

  moveWorm(positionDifference) {
    var newPosition = this.state.currentXPosition + positionDifference

    if (this.state.currentGame.playerOne == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerOneXPosition: newPosition });
    }
    if (this.state.currentGame.playerTwo == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerTwoXPosition: newPosition });
    }

    this.setState({
      currentXPosition: newPosition
    });
  }

  jumpWorm(positionDifference) {
    var oldPosition=this.state.currentYPosition
    var newPosition = this.state.currentYPosition + positionDifference

    if (this.state.currentGame.playerOne == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerOneYPosition: newPosition });
    }
    if (this.state.currentGame.playerTwo == this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerTwoYPosition: newPosition });
    }

    this.setState({
      currentYPosition: newPosition
    });

  }

  shootRayGun(x,y){
    this.state.lasers.push({ x: x, y: y,})
    this.setState({
      lasers: this.state.lasers
    });
  }

  animateLaserBeam() {
    let newLasers = []
    this.state.lasers.forEach( function(laser) {

      if (laser.x > 800 || laser.y < 0 ) {
        return;
      }

      if (this.state.currentGame.playerOne == this.state.currentPlayer) {
        if (laser.x == this.state.currentGame.playerTwoXPosition &&
            laser.y == this.state.currentGame.playerTwoYPosition) {

          var newScore = this.state.score + 10;
          this.games.save(this.state.currentGame, { playerOneScore: newScore });
          this.setState({
            score: newScore
          });
          return;
        }
      }

      else if (this.state.currentGame.playerTwo == this.state.currentPlayer) {
        if (laser.x === this.state.currentGame.playerOneXPosition &&
            laser.y === this.state.currentGame.playerOneYPosition
        ) {
          // window.alert("KAPOW," + this.state.currentGame.playerOne + " loses");
          var newScore = this.state.score + 10;
          this.games.save(this.state.currentGame, { playerTwoScore: newScore });
          this.setState({
            score: newScore
          });
          return
        }
      }

      if (this.state.currentGame.playerOne == this.state.currentPlayer) {
        laser.x += 10;
      }
      else if (this.state.currentGame.playerTwo == this.state.currentPlayer) {
        laser.x -= 10;
      }
      newLasers.push(laser)
    }.bind(this))
    this.setState({ lasers: newLasers});
  }

  renderLasers() {
    return this.state.lasers.map(function(laser){
      return <LaserComponent x={laser.x} y={laser.y}/>
    });
  }

  clearCurrentGame() {
      this.setState({
        currentGame: null
      });
    }

showNavBar(){
  if (this.state.currentGame!==null){
    return <AppBar title="LAzer WoRmz" titleStyle={{ textAlign: 'center' }}
      iconElementLeft={<FlatButton label="Back" onClick={ this.clearCurrentGame.bind(this)} />}
     />
  }
  else{
    return  <AppBar title="LAzer WoRmz" titleStyle={{ textAlign: 'center' }} />
    }
  }

  render() {
    return (

      <div>
        {this.showNavBar()}
        <div style={containerStyles}>
          { this.state.currentPlayer !== null &&
            <p>Hi, {this.state.currentPlayer}</p> }

          { this.state.currentPlayer === null &&
            <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

          { this.state.currentGame === null &&
            <GameListComponent games={this.state.games} onSelect={this.joinGame.bind(this)}/> }

          { this.state.currentGame === null &&
            <NewGameComponent onCreate={this.createGame.bind(this)}/> }

          { this.state.currentGame !== null && this.state.currentGame.playerOne == this.state.currentPlayer
            && this.state.currentGame.playerTwo == null &&
            <div className="game">
              <p>Player one: {this.state.currentGame.playerOne}</p>
              <WormComponent x={this.state.currentGame.playerOneXPosition} y={this.state.currentGame.playerOneYPosition} />
              <RayGunComponent x={this.state.currentGame.playerOneXPosition} y={this.state.currentGame.playerOneYPosition}/>
              {this.renderLasers()}
            </div>}

            { this.state.currentGame !== null && this.state.currentGame.playerOne !== null
              && this.state.currentGame.playerTwo !== null &&
              <div className="game">
                <WormComponent x={this.state.currentGame.playerOneXPosition} y={this.state.currentGame.playerOneYPosition} />
                <WormComponent x={this.state.currentGame.playerTwoXPosition} y={this.state.currentGame.playerTwoYPosition} />
                <RayGunComponent x={this.state.currentGame.playerOneXPosition} y={this.state.currentGame.playerOneYPosition}/>
                <RayGunComponent x={this.state.currentGame.playerTwoXPosition -5}  y={this.state.currentGame.playerTwoYPosition}/>
                {this.renderLasers()}
                <div className="scoreBoard">
                  <p>{this.state.currentGame.playerOne}: {this.state.currentGame.playerOneScore}</p>
                  <p>{this.state.currentGame.playerTwo}: {this.state.currentGame.playerTwoScore}</p>
                </div>
              </div>}
        </div>
      </div>
    );
  }
}

export default App;
