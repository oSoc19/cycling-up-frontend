import React, { Component } from "react";
import "fullpage.js/vendors/scrolloverflow";
import ReactFullpage from "@fullpage/react-fullpage";

import Map from "../components/Map/";
import Chart from "../components/Charts/index";

import styles from "./../../css/home.module.css";
class FullpageWrapper extends Component {
  render() {
    return (
      <ReactFullpage
        navigation
        sectionsColor={["#FFF", "#FFF", "#FFF"]}
        render={() => {
          return (
            <div>
              <section className="section">
                <div className={styles.image} />
              </section>
              <section className="section">
                <Map />
              </section>
              <section className="section">
                <Chart />
              </section>
            </div>
          );
        }}
      />
    );
  }
}

export default FullpageWrapper;
