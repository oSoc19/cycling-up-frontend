import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import css from "./../../../css/chart.module.css";

const data = {
  labels: ["2005", "2011", "2014"],
  datasets: [
    {
      label: "Evolution",
      data: [1.2, 1.9, 3],
      backgroundColor: ["#FAB646", "#FAB646", "#FAB646"],
      hoverBackgroundColor: ["#FAB646", "#FAB646", "#FAB646"]
    }
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
          }}
        >
          <h2 className={css.h2}>
            Would you consider commuting to work by bike?
          </h2>
          <p className={css.description}>
            Citizens using bikes to commute to work within Brussels city
            increased from 2005 (1.2%) till 2014 (3%). This rise shows an
            augmentation in the demand for sustainable solutions when moving
            from home to work. Hence, the melioration of bikes infrastructures
            within the Brussels region enhance this steady increase. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </article>
        <article className={css.stats}>
          <div className={css.intro}>
            <h2>Evolution of bike usage.</h2>
            <p className={css.subtitle}>TO COMMUTE TO WORK</p>
          </div>
          <div>
            <Bar
              data={data}
              width={100}
              height={250}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        </article>
      </div>
    );
  }
}

export default Chart;
