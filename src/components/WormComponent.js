import React from 'react';

class WormComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      x: 100,
      y: 500
    };
  }



 goRight() {
   this.setState ({
     x: this.state.x + 10
   });
  }

  goLeft() {
    this.setState ({
      x: this.state.x - 10
    });
   }

  createElement(){
    this.element = document.createElement('div');
    this.element.style.position = "fixed";
    this.element.style.left = this.state.x + "px";
    this.element.style.top = this.state.y + "px";
    this.element.style.width = "10px";
    this.element.style.height = "10px";
    this.element.style.backgroundColor = "red";
    document.body.appendChild(this.element);
  }

  render() {
    return (
      <div>
        <p>Hello World</p>
        <button onClick={this.createElement.bind(this)}>Create Worm!</button>
        <button onClick={this.goRight.bind(this)}>Right!</button>
        <button onClick={this.goLeft.bind(this)}>Left!</button>
      </div>
    );
  }
}

export default WormComponent;
