import React, { Component } from "react";
import { Polar } from "react-chartjs-2";

import css from "./../../../css/chart.module.css";

const data = {
    datasets: [{
      data: [
        11,
        16,
        7,
        3,
        14
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB'
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ]
};

class Chart extends Component {
  render() {
    return (
      <div className={css.splitScreen}>
        <div className={css.image} />
        <article
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "10rem",
            marginRight: "10rem"
          }}>
          <h2 className={css.h2}>
            Would you consider commuting to work by bike?
          </h2>
        </article>
        <article className={css.stats}>
          <div className={css.intro}>
            <h2>Evolution of bike usage.</h2>
            <p className={css.subtitle}>TO COMMUTE TO WORK</p>
          </div>
          <div>
            <Polar data={data} />
          </div>
        </article>
      </div>
    );
  }
}

export default Chart;