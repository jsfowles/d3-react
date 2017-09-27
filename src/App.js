import React, { Component } from 'react';
import Arc from './Arc';
import * as d3 from "d3";

const numeral = require('numeral');

const genderData = 'https://assets.contentful.com/i5wc420v2vd1/1XQ6ipuLRWqYsw2Ki0WSAa/98b3038b6fff112cee6a1254c8df60c5/Test_Spreadsheet_-_Gender.csv';
const ethnicityData = 'https://assets.contentful.com/i5wc420v2vd1/6b4ZyR3KTu688UaQWaMCMi/9bb3fd53a9270b5a406b1e9442aaab4c/Test_Spreadsheet_-_Ethnicity.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { percentComplete: 0.10};
    console.log(this.state.genderData)
    this.togglePercent = this.togglePercent.bind(this);
  }

  componentDidUpdate() {
    const toggleData = numeral(this.state.genderData[0].Female).value();
    console.log(toggleData);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
     d3.csv(genderData, (data) => this.setState(() => ({ genderData: data })));
     d3.csv(ethnicityData, (data) => this.setState(() => ({ ethnicityData: data })));
   }

  togglePercent() {
    const percentage = numeral(this.state.genderData[0].Female).value();
    this.setState({ percentComplete: percentage });
  }

  render() {
    return (
      <div>
        <button onClick={this.togglePercent}>Toggle</button>
        <Arc
          dataText={this.state.percentComplete}
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
          data
        />
      </div>
    );
  }
}

export default App;
