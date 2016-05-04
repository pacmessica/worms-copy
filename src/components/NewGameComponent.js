import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class NewGameComponent extends React.Component {
  createGame(event) {
    event.preventDefault();
    console.log("Create Game Called!");
    this.props.onCreate();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.createGame.bind(this)}>
          <div>
            <input type="submit" value="Create New Game"/>
          </div>
        </form>
      </div>
    );
  }
}

export default NewGameComponent;
