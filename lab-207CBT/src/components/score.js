import { Fragment } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";



const ScoreCard = (props) => {
  console.log(props)
 
    return (
        <Fragment>
        <NavBar />
        <div className="d-flex flex-row-reverse">
        <Link to="/feedback">
        <button
          type="submit"
          className="btn btn-primary m-2"
        >
          Your feedback
        </button>
        </Link>
        </div>
        <div className=" d-flex align-items-center justify-content-center" style={{height: "80vh"}}>
            <div class="card w-25 h-25  text-center shadow rounded">
                <div class="card-body">
                    <h3 class="card-title py-3">Your Score</h3>
                    <h5 class="card-text">{props.location.state.score}</h5>
                </div>
            </div>
        </div>
        
        </Fragment>
    );
  }

export default ScoreCard;
