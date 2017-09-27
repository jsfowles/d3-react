import React, { Component } from 'react';
import Arc from './Arc';
import * as d3 from "d3";

const numeral = require('numeral');

const genderData = 'https://assets.contentful.com/i5wc420v2vd1/1XQ6ipuLRWqYsw2Ki0WSAa/98b3038b6fff112cee6a1254c8df60c5/Test_Spreadsheet_-_Gender.csv';
const ethnicityData = 'https://assets.contentful.com/i5wc420v2vd1/6b4ZyR3KTu688UaQWaMCMi/9bb3fd53a9270b5a406b1e9442aaab4c/Test_Spreadsheet_-_Ethnicity.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { percentComplete: .41};
    this.toggleCompany = this.toggleCompany.bind(this);
    this.toggleLeadership = this.toggleLeadership.bind(this);
    this.toggleTech = this.toggleTech.bind(this);
    this.toggleCreative = this.toggleCreative.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState){
    const { percentComplete } = this.state;
      if(percentComplete !== prevState.percentComplete){
        console.log('updated')
      }
    console.log(prevState.percentComplete)
}

  getData() {
     d3.csv(genderData, (data) => this.setState(() => ({ genderData: data })));
     d3.csv(ethnicityData, (data) => this.setState(() => ({ ethnicityData: data })));
   }

  toggleCompany() {
    const company = numeral(this.state.genderData[0].Female).value();
    this.setState({ percentComplete: company });
  }

  toggleLeadership() {
    const leadership = numeral(this.state.genderData[1].Female).value();
    this.setState({ percentComplete: leadership });
  }

  toggleTech() {
    const tech = numeral(this.state.genderData[2].Female).value();
    this.setState({ percentComplete: tech });
  }

  toggleCreative() {
    const creative = numeral(this.state.genderData[3].Female).value();
    this.setState({ percentComplete: creative });
  }

  render(props) {
    return (
      <div>
        <button onClick={this.toggleCompany}>Company</button>
        <button onClick={this.toggleLeadership}>Leadership</button>
        <button onClick={this.toggleTech}>Tech</button>
        <button onClick={this.toggleCreative}>Creative</button>
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
          duration={2000}
          data
        />
      </div>
    );
  }
}

export default App;
