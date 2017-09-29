import React, { Component } from "react";
import * as d3 from "d3";


class GenderArc extends Component {
  constructor(props) {
   super(props);
   this.state = {};
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
    this.setForeground(context);
    this.updatePercent(context);
    this.setText(context);
  }

  updatePercent(context) {
    return this.setForeground(context)
      .transition()
      .duration(this.props.duration)
      .call(this.arcTween, this.tau * this.props.genderUpdate, this.arc());
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
    const context = d3.select("#gender-arc");
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

  setBackground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.tau })
      .style("fill", this.props.backgroundColor)
      .attr("d", this.arc());
  }

  setForeground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.props.genderUpdate * this.tau})
      .style("fill", this.props.foregroundColor)
      .attr("d", this.arc());
  }

  tau = Math.PI * -2;

  arc() {
    return d3
      .arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(0)


  }

  render() {
    return <div ref="arc" />;
  }
}

export default GenderArc;
