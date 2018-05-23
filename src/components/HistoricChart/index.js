import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";

class HistoricChart extends Component {
  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { labels, data, chartTitle, titleFontSize } = this.props;
    return (
      <div className="mt-5 card text-center" style={{ width: "100%" }}>
        <select
          onChange={this.onChange.bind(this)}
          className="form-control col-md-3 m-1"
        >
          <option value="noValue">Choose value</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <Line
          width={50}
          height={20}
          data={{
            labels,
            datasets: [
              {
                label: "BTC",
                data
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: chartTitle,
              fontSize: titleFontSize,
              fontWeight: "lighter",
              fontColor: "grey"
            },
            layout: {
              padding: "300px",
              width: "500px",
              height: "300px"
            },
            legend: {
              display: true,
              position: "bottom",
              text: "BTC"
            }
          }}
        />
      </div>
    );
  }
}

export default HistoricChart;
