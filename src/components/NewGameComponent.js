import React from 'react';

class NewGameComponent extends React.Component {
  createGame(event) {
    event.preventDefault();
    console.log("Create Game Called!");
    let newPlayer = this.refs.playerName.value;
    this.props.onCreate(newPlayer);
    this.refs.playerName.value = "";
  }

  render() {
    return(
      <div>
        <form onSubmit={this.createGame.bind(this)}>
          <div>
            <label>Player Name:</label>
            <input type="text" ref="playerName" placeholder="What's your name?"/>
          </div>
          <div>
            <input type="submit" value="Create Game"/>
          </div>
        </form>
      </div>
    );
  }
}

export default NewGameComponent;
