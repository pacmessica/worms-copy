import React from 'react';

class Car extends React.Component {
  constructor() {
    super();

    this.state = {
      x: 10,
      y: 10
    };
  }



 drive() {
   this.setState ({
     y: this.state.y + 10
   });
  }

  createElement(){
    this.element = document.createElement('div');
    this.element.style.position = "fixed";
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = "10px";
    this.element.style.height = "10px";
    this.element.style.backgroundColor = "red";
    document.body.appendChild(this.element);
  }

  render() {
    return (
      <div>
        <p>Hello World</p>
        <button onClick={this.createElement.bind(this)}>Create Car!</button>
        <button onClick={this.drive.bind(this)}>Drive up!</button>
      </div>
    );
  }
}

export default Car;
