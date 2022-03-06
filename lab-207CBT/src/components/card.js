import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div class="card w-75 mx-auto my-5 text-start shadow bg-white rounded">
      <h5 class="card-header text-white" style={{ background: "#8a8b8c" }}>
        Mock Test - 1
      </h5>
      <div class="card-body">
        <h5 class="card-title">NIMCET 2021</h5>
        <div class="card-text w-50 d-flex justify-content-between">
          <div>Questions : 120</div>
          <div>Marks : 480</div>
          <div>Time : 120 mintues</div>
        </div>
        <Link to="/instruction">
          <button class="btn btn-primary mt-3">
          Start Test
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Card;
