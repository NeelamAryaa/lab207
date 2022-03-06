import  { Fragment, useEffect } from "react";
import NavBar from "./navbar";

const ScoreCard = (props) =>  {

  useEffect(() => {
  console.log(props)
    
  });
 
    
    return (
        <Fragment>
        <NavBar />

        <div className=" d-flex align-items-center justify-content-center" style={{height: "90vh"}}>
            <div class="card w-50 h-25 text-center shadow rounded">
                <div class="card-body">
                    <h3 class="card-title py-3">Your Score</h3>
                    <h5 class="card-text">10</h5>
                </div>
            </div>
        </div>
        </Fragment>
    );
  
}

export default ScoreCard;
