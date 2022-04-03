import React, { Component, Fragment } from "react";
import Card from "./card";
import NavBar from "./navbar";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="bg-light py-4 px-5" style={{ minHeight: "90vh" }}>
          <Card />
          <Card />
          <Card />
        </div>
    </Fragment>
      
    );
  }
}

export default HomePage;
