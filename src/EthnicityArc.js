import React, { Component } from "react";
import * as d3 from "d3";

class EthnicityArc extends Component {
  constructor(props) {
   super(props);
   this.state = {};
 }

 convertData = (context) => {
   Object.keys(this.props.data, this.props.color).reduce((a, b) => {
     if (b !== "title") {
       this.setForeground(context, {
         label: b,
         value: parseInt(this.props.data[b]),
         startValue: a,
         color: this.props.color[b],
       });
     }

     return b !== "Title" ? a + parseInt(this.props.data[b]) : 0;
   }, 0);
 }


  componentDidMount() {
    this.drawArc();
  }

  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);

    this.convertData(context);
    // this.setForeground(context);

    this.setText(context);
    this.dataText(context);
  }

  updatePercent(context) {
    return this.setForeground(context)
      .transition()
      .duration(this.props.duration)
      .call(this.arcTween, this.tau * this.props.ethnicityUpdate, this.arc());
  }

  arcTween(transition, newAngle, arc) {
    transition.attrTween("d", d => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      const newArc = d;
      return t => {
        newArc.endAngle = interpolate(t);
        return arc(newArc);
      };
    });
  }

  redrawArc() {
    const context = d3.select("#ethnicity-arc");
    context.remove();
    this.drawArc();
  }

  setContext() {
    const { height, width, id } = this.props;
    return d3
      .select(this.refs.arc)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("id", id)
      .append("g")
      .attr("transform", `translate(${height / 2}, ${width / 2})`);
  }

  setText(context) {
    return context
      .append("text")
        .text(this.props.text)
        .attr("x", -40)
        .attr("y", 10)
          .style("font-family", "Gotham")
          .style("font-size", 18)
          .style("text-transform", "uppercase");
  }

  dataText(context) {
    return context
      .append("text")
        .text(this.props.dataText)
        .attr("x", -100)
        .attr("y", 10)
          .style("font-family", "Gotham")
          .style("font-size", 18)
          .style("text-transform", "uppercase");
  }

  setBackground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.tau })
      .style("fill", this.props.backgroundColor)
      .attr("d", this.arc());
  }

  setForeground(context, data, color) {
    const value = parseFloat((data.value) / 100).toFixed(2);
    const startValue = parseFloat((data.startValue) / 100).toFixed(2);
    return context
      .append("path")
      .datum({ endAngle: startValue * this.tau})
      .style("fill", data.color)
      .attr("d", this.arc(value));
  }

  tau = - Math.PI * 2;

  arc(value) {
    return d3
      .arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(value)
  }

  render() {
    return <div ref="arc" />;
  }
}

export default EthnicityArc;
