import React, { Component } from 'react';
import Arc from './Arc';
import * as d3 from "d3";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { percentComplete: 0.2 };
    this.togglePercent = this.togglePercent.bind(this);
  }

  togglePercent() {
    const percentage = this.state.percentComplete === 0.2 ? 0.8 : 0.2;
    this.setState({ percentComplete: percentage });
  }

  componentWillMount() {
    d3.csv("file.csv", function(error, data) {
      if (error) throw error;
      console.log(data.columns); 
    });
  }


  render() {
    console.log(this.state.percentComplete);
    return (
      <div>
        <button onClick={this.togglePercent}>Toggle</button>
        <Arc
          text="Gender"
          height={300}
          width={300}
          innerRadius={100}
          outerRadius={125}
          id="d3-arc"
          backgroundColor="#e6e6e6"
          foregroundColor="#E80000"
          percentComplete={this.state.percentComplete}
          duration={1000}
        />
      </div>
    );
  }
}

export default App;
