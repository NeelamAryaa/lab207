import React, { Component, Fragment } from "react";
import "../App.css";
import axios from "axios";



class QuestionsScreen extends Component {
  state = {
    all_questions: {},
    sections: [],
    currentSection: "mathematics",
    questions: {},
    quesNum: 0,
    ques: null,
    secIdx : 1,
    checkedOption: -1,
    answer: [],
    submit: false,
    answerKey: [],
    score: 0,
    counter: 180

  };

  

  counter = () => {
    this.setState((state) => ({counter: state.counter+1}), () => console.log(this.state.counter))
  }

  componentDidMount() {
    console.log("compdidmount")
    axios.get("http://localhost:3000/questions")
        .then(res => { 
          console.log(res)
          let all_questions = res.data;
          let sections = Object.keys(all_questions);
          let questions = all_questions[this.state.currentSection]
          let ques = questions[0]

          this.setState(
            {
              all_questions : res.data,
              sections : sections,
              questions : questions,
              ques : ques
          })
        })
        .catch(error => console.log(error))

 

    setInterval(() => this.setState((state) => ({counter: state.counter-1})), 1000);

     
  }

  

  
  
  nextQuestion = () => {    

    let all_questions=this.state.all_questions

    this.setState((state) => ({answer: [...state.answer,state.checkedOption], checkedOption: -1}))
    // this.setState({checkedOption: -1})

    
    if (this.state.questions.length === this.state.quesNum+1 ){
      this.setState({quesNum: 0})
      if(this.state.currentSection!==this.state.sections.slice(-1)[0]){
        this.setState((state) => ({currentSection: state.sections[state.secIdx]}))
        this.setState((state) => ({questions: all_questions[state.currentSection]}))
        this.setState((state) => ({ques: state.questions[state.quesNum]}))
        this.setState((state)=> ({secIdx: state.secIdx+1}))
      }
      if(this.state.currentSection===this.state.sections.slice(-1)[0] ){
        this.setState({submit: true})
      }

    }
    
    else {
      this.setState((state) => ({quesNum: state.quesNum+1}))
      this.setState((state) => ({ques: state.questions[state.quesNum]}))
    }

      
  }

  handleCheckedOption = (idx) => {
    console.log(idx)
    this.setState({checkedOption: idx})
  }

  submitHandle = () => {
    axios.get("http://localhost:3000/answerKey")
        .then(res => 
          {
            let scr =0
            let answerKey=res.data
            let answer = this.state.answer
            for(let i=0; i<answerKey.length; i++){
              if(answer[i]===answerKey[i]){
                scr=scr+1
              }
            }

            this.setState({answerKey: answerKey ,score: scr},() => {this.props.history.push({pathname: '/score', state: {score: this.state.score} })})
          }
        )

        // console.log(this.props)

  }

  
  render() { 
    const ques = this.state.ques 
    return (
      <Fragment>
        <nav
          className="navbar 
         bg-dark py-0 px-3"
          style={{ color: "yellow" }}
        >
          NIMCET - 2021
        </nav>
        
        <div className="row  mx-0 px-0 " style={{fontSize: "18px"}}>
          <div className="col-12 px-0">
            <div className=" mx-0">
              <div
                className="row text-primary w-75"
              >
              {
                this.state.sections ? this.state.sections.map((sec,idx) => (<button key = {idx} type="button" name="mathematics" className={`col fs-5 m-0  px-0 btn text-capitalize ${sec === this.state.currentSection ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                  {sec}
                </button>)) : null}
                
              </div>
            </div>
            <hr className="m-0" />
            <div className="row  w-75">
              <div className="col  text-start text-danger">Question type : MCQ</div>
              <div className="col text-end text-danger">Time left : {this.state.counter} sec</div>
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
                  </button>
                   : null}
                
              </div>
            </div>
          </div>
          
        </div>
      </Fragment>
    );
  }
}

export default QuestionsScreen;
 