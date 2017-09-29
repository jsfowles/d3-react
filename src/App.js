import React, { Component } from 'react';
import GenderArc from './GenderArc';
import EthnicityArc from './EthnicityArc';
import GenderText from './GenderText';
import * as d3 from "d3";

const numeral = require('numeral');

const divStyle = {
  display: 'flex',
};

const dot = {
  width: 20,
  height: 20,
  marginTop: 10,
  marginRight: 10,
};

const gender = {

};

const center = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: center,
};

const labelContainer = {
  display: 'flex',
  alignItems: 'center',
  marginRight: 10,
};

const label = {
  fontWeight: 300,
  marginBottom: 5,
  width: 50,
};

const data = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  fontWeight: 400,
  height: 300,
  width: 200,
};


const color = {
  White: '#E6E6E6',
  Black: '#FFD23F',
  Asian: '#F5751E',
  Hispanic: '#FFAA00',
  Unidentified: '#E80000',
  Other: 'green',
}

const genderData = 'https://assets.contentful.com/i5wc420v2vd1/1XQ6ipuLRWqYsw2Ki0WSAa/98b3038b6fff112cee6a1254c8df60c5/Test_Spreadsheet_-_Gender.csv';
const ethnicityData = 'https://assets.contentful.com/i5wc420v2vd1/5wHDBu1LhK8cMIiimWMgYE/aa377384e6a58832802dbd9e365101e7/Diversity_Stats_-_Ethnicity__1_.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderUpdate: .41,
      ethnicityUpdate: .5,
    };
    this.toggleCompany = this.toggleCompany.bind(this);
    this.toggleLeadership = this.toggleLeadership.bind(this);
    this.toggleTech = this.toggleTech.bind(this);
    this.toggleCreative = this.toggleCreative.bind(this);
  }

  componentDidMount() {

    this.getData();
  }

  componentDidUpdate(prevProps, prevState){
    const { genderUpdate } = this.state;
      if(genderUpdate !== prevState.genderUpdate){
        console.log('Gender updated')
      }

    const { ethnicityUpdate } = this.state;
      if(ethnicityUpdate !== prevState.ethnicityUpdate){
        console.log('Ethnicity updated')
      }
  }

  getData() {
     d3.csv(genderData, (data) => this.setState(() => ({ genderData: data })));
     d3.csv(ethnicityData, (data) => this.setState(() => ({ ethnicityData: data })));
   }

  toggleCompany() {
    const companyGender = numeral(this.state.genderData[0].Female).value();
    this.setState({ genderUpdate: companyGender });

    const companyEthnicity = numeral(this.state.ethnicityData).value();
    this.setState({ ethnicityUpdate: companyEthnicity });
  }

  toggleLeadership() {
    const leadershipGender = numeral(this.state.genderData[1].Female).value();
    this.setState({ genderUpdate: leadershipGender });

    const companyEthnicity = numeral(this.state.ethnicityData).value();
    this.setState({ ethnicityUpdate: companyEthnicity });
  }

  toggleTech() {

    const techGender = numeral(this.state.genderData[2].Female).value();
    this.setState({ genderUpdate: techGender });

    const companyEthnicity = numeral(this.state.ethnicityData).value();
    this.setState({ ethnicityUpdate: companyEthnicity });
  }

  toggleCreative() {
    const creativeGender = numeral(this.state.genderData[3].Female).value();
    this.setState({ genderUpdate: creativeGender });

    const companyEthnicity = numeral(this.state.ethnicityData).value();
    this.setState({ ethnicityUpdate: companyEthnicity });
  }



  render(props) {

    return (
      <div>
        <button onClick={this.toggleCompany}>Company</button>
        <button onClick={this.toggleLeadership}>Leadership</button>
        <button onClick={this.toggleTech}>Tech</button>
        <button onClick={this.toggleCreative}>Creative</button>
        <div style={divStyle}>
          <div style={data}>
            <div style={center}>
              <div style={labelContainer}>
                <svg style={dot}>
                  <circle cx={10} cy={10} r={10} fill="#E80000" />
                </svg>
                <h3 style={label}>
                  Women
                </h3>
              </div>
              <div style={gender}>
                <GenderText
                  genderData={this.state.genderUpdate}
                  id="female-data"
                  height={50}
                  width={100}
                  />
              </div>
            </div>
            <div>
              <div style={center}>
              <div style={labelContainer}>
                <svg style={dot}>
                  <circle cx={10} cy={10} r={10} fill="#E6E6E6" />
                </svg>
                <h3 style={label}>
                  Men
                </h3>
              </div>
              <GenderText
                genderData={1 - this.state.genderUpdate}
                id="male-data"
                height={50}
                width={100}
                />
            </div>
          </div>
        </div>

            <GenderArc
              text="Gender"
              height={300}
              width={300}
              innerRadius={100}
              outerRadius={125}
              id="gender-arc"
              backgroundColor="#E6E6E6"
              foregroundColor="#E80000"
              genderUpdate={this.state.genderUpdate}
              duration={2000}
              data
            />



          { this.state.ethnicityData &&<EthnicityArc
              text="Ethnicity"
              height={300}
              width={300}
              color={color}
              innerRadius={100}
              outerRadius={125}
              id="ethnicity-arc"
              backgroundColor="#E6E6E6"
              ethnicityUpdate={this.state.ethnicityUpdate}
              duration={2000}
              data={this.state.ethnicityData[0]}
            /> }


        </div>
      </div>
    );
  }
}


export default App;
