import "../App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import NavBar from "./navbar";

const FeedbackForm = () => {
  const [feedback, setFeedback]=useState({
      first_name:"",
      last_name: "", 
      city: "", 
      score: "", 
      level: "" 
    })
  const [allFeedback, setAllFeedback] = useState([]);


  const retrieveFeedbacks = async () => {
    const response = await axios.get("http://localhost:3000/feedbacks");
    return response.data;
  };

  useEffect(() => {
    const getAllfeedbacks = async () => {
      const allFeedbacks = await retrieveFeedbacks();
      if (allFeedbacks) setAllFeedback(allFeedbacks);
    };

    getAllfeedbacks();
    console.log(allFeedback)
    
  }, []);
  
    const handleReset = () => {
        setFeedback({first_name:"", last_name: "", city: "", score: "", level: ""})
    }

    const handleChange = (e) => {
    //   console.log(e.target.value, e.target.name)
      setFeedback({...feedback, [e.target.name]: e.target.value})
      console.log(feedback)  
    }
    
    const addCommentInDb = async () => {
      try {
        const req ={
        id: uuidv4(),
        ...feedback
      }
        const response = await axios.post(`http://localhost:3000/feedbacks`, req)
        console.log(response)
        setAllFeedback([...allFeedback, response.data] )
      }
      catch(error) {
        console.log(error)
      }
    }

    const deleteFeedback = async (fbd) => {
      await axios.delete(`http://localhost:3000/feedbacks/${fbd.id}`);
      console.log(allFeedback)
      const filterfeedback = allFeedback.filter((feedback)=>{
        return feedback.id !== fbd.id 
        
      })
      console.log(filterfeedback)
      setAllFeedback(filterfeedback)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
        addCommentInDb()
        handleReset()
    
  }
  
    return (
      <>
      <NavBar/>
      <div className='feedback'>
  
      <div className="container">
      
        <form className="form" onSubmit={handleSubmit}>
        <h3 className="text-center">Your Feedback</h3>
          
          <label className="label" >First Name</label>
          <input type="text" name="first_name" id="firstName" maxLength="30" value={feedback.first_name} onChange={handleChange} className="text-capitalize" required/>
          
          <label className="label" >Last Name</label>
          <input type="text" name="last_name" id="lastName" maxLength="30" value={feedback.last_name} onChange={handleChange} className="text-capitalize" required/>

          <label className="label" >Your City</label>
          <input type="text" name="city"  maxLength="30" value={feedback.city} onChange={handleChange} className="text-capitalize" required/>

          <label className="label" >Your Score</label>
          <input type="number" name="score"  maxLength="30" value={feedback.score} onChange={handleChange} className="text-capitalize" required/>

          <label className="label" >Level of Paper</label>
          <input type="text" name="level"  maxLength="30" value={feedback.level} onChange={handleChange} className="text-capitalize" required/>
  
          
  
          <div className="d-flex m-auto my-2">
            
            
            <input type="submit" value="Submit" className="btn btn-primary" />
            <input type="reset" value="Reset" className="btn btn-primary" onClick={handleReset}/>
          </div>
        </form>
        
        <div className='card-container'><h4>Reviews</h4>
        {allFeedback ? allFeedback.slice(-4).reverse().map((fdb,idx) => 
            <div className='card mx-auto' key={idx}>
            <div className='card-header name-header d-flex justify-content-between'> 
              <div className="text-center" style={{width: "90%"}}>{fdb.first_name} {fdb.last_name} says... </div>
              <div><i class="bi bi-x-circle-fill" onClick={() => deleteFeedback(fdb)}></i></div></div>
            <div className='card-body'>Paper level : {fdb.level}</div>
          </div>)  : null}
        
      </div> 
      </div>  
      </div> 
      </>
    );

  }
  
  export default FeedbackForm;