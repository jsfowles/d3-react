import React, { Component } from "react";
import * as d3 from "d3";


class GenderData extends Component {
  constructor(props) {
   super(props);
   this.state = {};
 }

  componentDidMount() {
    this.drawData();
  }

  componentDidUpdate() {
    this.redrawData();
  }

  drawData() {
    const context = this.setContext();
    this.setData(context);
  }

  redrawData() {
   const context = d3.select(`#${this.props.id}`);
   context.remove();
   this.drawData();
  }

  setContext() {
    const { height, width, id } = this.props;
    return d3
      .select(this.refs.genderData)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("id", id)
      .append("g")
      .attr("transform", `translate(${height / 50}, ${width / 3})`);
  }


  setData(context) {
    const genderData = parseFloat((this.props.genderData) * 100).toFixed(0);

    return context
      .append("text")
        .text(`${genderData}%`)
        .attr("x", 30)
        .attr("y", 0)
          .style("font-family", "Gotham")
          .style("font-size", 28)
          .style("fill", '#979797')
          .style("text-transform", "uppercase");
  }



  render() {
    return <div ref="genderData" />;
  }
}

export default GenderData;
