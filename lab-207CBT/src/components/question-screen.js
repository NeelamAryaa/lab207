import React, { Component, Fragment } from "react";
import "../App.css";

const questions = {
  "mathematics" : [
  {
    id:1,
    section: "mathematics",
    question:
      "How many words starting with letter D can be formed by taking all letters from word DELHI, so that the letters are not repeated?",
    option: [24, 46, 28, 30],
  },
  {
    id:2,
    section: "mathematics",
    question:
      "How many words starting with letter D can be formed ?",
    option: [2, 6, 8, 30],
  }

],
  
"analitical-reasoning" : [{
    id:1,
    section: "analitical-reasoning",
    question:
      "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu. Average age of Chanu and Dhanu is 19 years. Find the average age of Anu and Dhanu if Dhanu is 10 years elder than Chanu.",
    option: [25, 36, 31, 30],
  }],
  "computer" : [
  {
    id:1,
    section: "computer",
    question:
      "The memory unit which directly communicates with the CPU is known as",
    option: [
      "primary memory",
      "secondary memory",
      "cache memory",
      "shared memory",
    ],
  }],
  "english" : [
  {
    id:1,
    section: "english",
    question: "Choose the correct expression of approval:",
    option: ["super", "damn", "rotten", "hell"],
  },
  {
    id:2,
    section: "english",
    question: "Choose the incorrect expression of approval:",
    option: ["super", "damn", "rotten", "hell"],
  },
  {
    id:3,
    section: "english",
    question: "Choose the correct expression of not approval:",
    option: ["super", "damn", "rotten", "hell"],
  }],
};

class QuestionsScreen extends Component {
  state = {
    sections: [],
    currentSection: "mathematics",
    questions: [],
    quesNum: 0,
    ques: questions.mathematics[0],
    secIdx : 1,
    checkedOption: -1,
    answer: [],
    submit: false
  };


  componentDidMount() {
    this.setState((state) => ({questions: questions[state.currentSection]}))
    this.setState({sections: Object.keys(questions)})
  }
  
  
  handleSectionButton = (e) => {
    this.setState({quesNum: 0})
    this.setState({currentSection: e.target.name})
    this.setState((state) => ({questions: questions[state.currentSection]}))
    this.setState((state) => ({ques: questions[state.currentSection][state.quesNum]}))

    this.setState((state)=> ({secIdx: state.sections.indexOf(state.currentSection)+1}))


  }

  nextQuestion = () => {
console.log(this.state.sections.slice(-1)[0])

    

 
    // if(questions.length === this.state.answer.length){

    // }
    this.setState((state) => ({answer: [...state.answer,state.checkedOption]}))
    this.setState({checkedOption: -1})

    
    // if(this.state.secIdx === this.state.sections.length ){
    //   this.setState({secIdx: 0})
    // }

    if (this.state.questions.length === this.state.quesNum+1 ){
      this.setState({quesNum: 0})
      if(this.state.currentSection!==this.state.sections.slice(-1)[0] )
      {this.setState((state) => ({currentSection: state.sections[state.secIdx]}))
      this.setState((state) => ({questions: questions[state.currentSection]}))
      this.setState((state) => ({ques: questions[state.currentSection][state.quesNum]}))
      this.setState((state)=> ({secIdx: state.secIdx+1}))
}
      if(this.state.currentSection===this.state.sections.slice(-1)[0] ){
        this.setState({submit: true})
      }

      }
    
      else {
        
        this.setState((state) => ({quesNum: state.quesNum+1}))
        this.setState((state) => ({ques: questions[state.currentSection][state.quesNum]}))
      }
  }

  handleCheckedOption = (idx) => {
    console.log(idx)
    this.setState({checkedOption: idx})
  }

  
  render() { 
    // const question = this.state.questions 
    const ques = this.state.ques 

    // console.log(question.map(q => (q.question))) 
    return (
      <Fragment>
        <nav
          className="navbar 
         bg-dark py-0 px-3"
          style={{ color: "yellow" }}
        >
          NIMCET - 2021
        </nav>
        
        <div className="row  mx-0 px=0">
          <div className="col-12 px-0">
            <div className=" mx-0">
              <div
                className="row text-primary w-75"
                style={{ fontSize: "16px" }}
              >
                <button type="button" name="mathematics" className={`col px-0 btn ${this.state.currentSection==="mathematics" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                  Mathematics
                </button>
                <button type="button" name="analitical-reasoning" className={`col btn ${this.state.currentSection==="analitical-reasoning" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                Analitical Reasoning
                </button>
                <button type="button" name="computer" className={`col btn ${this.state.currentSection==="computer" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                Computer
                </button>
                <button type="button" name="english" className={`col btn ${this.state.currentSection==="english" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                English
                </button>
              </div>
            </div>
            <hr className="m-0" />
            <div className="row w-75">
              <div className="col text-start text-danger">Question type : MCQ</div>
              <div className="col text-end">Time left : 01:23:44</div>
            </div>
            <hr className="m-0" />
            <div className="col-3 px-2 fs-4 rounded bg-primary text-white text-center  text-capitalize">
              {this.state.currentSection}
            </div>
            <hr className="m-0" />
            {ques ? 
              <div style={{ height: "70vh" }}>
                <div>
                  <div className="bg-primary text-white px-3">
                    Question no. - {ques.id}
                  </div>
                  <div className="px-3">{ques.question}</div>
                  {ques.option.map((opt, idx) => (
                    <div className="form-check mx-3" key={idx}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"                       
                        onClick={() => this.handleCheckedOption(idx)}
                        checked={
                          idx === this.state.checkedOption 
                          
                        }
                      />
                      <label className="form-check-label" for={idx}>
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              : null}

            <div className="w-100 d-inline-flex justify-content-between">
                  {/*I will implememt this feature*/}

              {/*<div className="flex px-3 ">
                
                <button
                  type="button"
                  className="btn btn-primary "
                  // onClick={this.unChecked}
                >
                  Clear response
                </button>
                  </div>*/}
              <div className="flex px-3">
                
                  <button
                    type="button"
                    className={`btn btn-success ${
                      this.state.submit ? "disabled" : null
                    } `}
                    onClick={this.nextQuestion}
                  >
                    Save and Next
                  </button>

                  {this.state.submit ?
                    <button
                    type="button"
                    className="btn btn-success mx-5"
                    onClick={this.submitHandle}
                  >
                    Submit
                  </button> : null}
                
              </div>
            </div>
          </div>
          
        </div>
      </Fragment>
    );
  }
}

export default QuestionsScreen;
 