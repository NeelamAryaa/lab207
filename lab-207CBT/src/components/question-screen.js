import React, { Component, Fragment } from "react";
import "../App.css";

const questions = [
  {
    section: "mathematics",
    question:
      "How many words starting with letter D can be formed by taking all letters from word DELHI, so that the letters are not repeated?",
    option: [24, 46, 28, 30],
  },
  {
    section: "analitical-reasoning",
    question:
      "Sum of ages of Anu and Bhanu is 10 years more than sum of ages of Bhanu, Chanu and Dhanu. Average age of Chanu and Dhanu is 19 years. Find the average age of Anu and Dhanu if Dhanu is 10 years elder than Chanu.",
    option: [25, 36, 31, 30],
  },
  {
    section: "computer",
    question:
      "The memory unit which directly communicates with the CPU is known as",
    option: [
      "primary memory",
      "secondary memory",
      "cache memory",
      "shared memory",
    ],
  },
  {
    section: "english",
    question: "Choose the correct expression of approval:",
    option: ["super", "damn", "rotten", "hell"],
  },
  {
    section: "english",
    question: "Choose the incorrect expression of approval:",
    option: ["super", "damn", "rotten", "hell"],
  },
  {
    section: "english",
    question: "Choose the correct expression of not approval:",
    option: ["super", "damn", "rotten", "hell"],
  },
];

class QuestionsScreen extends Component {
  state = {
    currentIndex: 0,
    questions: questions,
    checked: -1,
    answerArray: new Array(6).fill(-1),

    //new code 
    active: ""


  };

  componentDidMount() {
    let array = [...this.state.questions];
    for (let i = 0; i < 6; i++) {
      array[i].isVisited = i === 0;
      array[i].isReviewed = false;
      array[i].isAnswered = false;
    }
    this.setState(() => ({ questions: array }));
  }

  nextquestion = () => {
    const quesArray = [...this.state.questions];
    if (this.state.currentIndex === questions.length - 1) {
      this.setState((state) => ({
        currentIndex: state.currentIndex,
      }));
    } else {
      quesArray[this.state.currentIndex + 1].isVisited = true;
      this.setState((state) => ({
        currentIndex: state.currentIndex + 1,
        questions: quesArray,
        checked: -1,
      }));
    }

    // this.setState((state) => ({
    //   checked: -1,
    // }));

    let answerArray = [...this.state.answerArray];
    answerArray[this.state.currentIndex] = this.state.checked;
    this.setState((state) => ({
      answerArray: state.answerArray,
    }));

    if (answerArray[this.state.currentIndex] !== -1) {
      quesArray[this.state.currentIndex].isAnswered = true;
      this.setState(() => ({ questions: quesArray }));
    }

    console.log(answerArray);
    console.log(this.state.currentIndex);
  };

  unChecked = () => {
    const quesArray = [...this.state.questions];
    quesArray[this.state.currentIndex].isAnswered = false;

    let answerArray = [...this.state.answerArray];
    answerArray[this.state.currentIndex] = -1;

    this.setState(() => ({
      checked: -1,
      questions: quesArray,
      answerArray: answerArray,
    }));
  };

  handleChange = (idx) => {
    if (this.state.checked !== idx) {
      this.setState({
        checked: idx,
      });
    }
  };

  changeQuestionHandler = (idx) => {
    const quesArray = [...this.state.questions];
    quesArray[idx].isVisited = true;
    this.setState(() => ({ currentIndex: idx, questions: quesArray }));
    console.log(this.state.currentIndex);

    if (this.state.checked !== idx) {
      this.setState((state) => ({
        checked: state.answerArray[idx],
      }));
    }

    // let answerArray = [...this.state.answerArray];
    // answerArray[this.state.currentIndex] = this.state.checked;
    // this.setState((state) => ({
    //   answerArray: answerArray,
    // }));
  };

  markForReview = () => {
    const quesArray = [...this.state.questions];
    quesArray[this.state.currentIndex].isReviewed = true;
    this.setState(() => ({ questions: quesArray, checked: -1 }));
  };



//new work here
 handleSectionButton = (e) => {
   this.setState({active: e.target.name})
 }


  render() {
    const currentIndex = this.state.currentIndex;
    const currentQuestion = questions[currentIndex];
    // console.log(questions[6]);


   


    return (
      <Fragment>
        <nav
          className="navbar 
         bg-dark py-0 px-3"
          style={{ color: "yellow" }}
        >
          NIMCET - 2021
        </nav>
        <div className="row  mx-0">
          <div className="col-9 px-0">
            <div className=" mx-0">
              <div
                className="row w-75 text-primary text-center"
                style={{ fontSize: "16px" }}
              >
                <button type="button" name="1" className={`col btn ${this.state.active==="1" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                  Mathematics
                </button>
                <button type="button" name="2" className={`col btn ${this.state.active==="2" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                Analitical Reasoning
                </button>
                <button type="button" name="3" className={`col btn ${this.state.active==="3" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                Computer
                </button>
                <button type="button" name="4" className={`col btn ${this.state.active==="4" ? "btn-primary": ""}`} onClick={this.handleSectionButton}>
                English
                </button>
              </div>
            </div>
            <hr className="m-0" />
            <div class="row px-3">
              <div class="col text-start text-danger">Question type : MCQ</div>
              <div class="col text-end">Time left : 01:23:44</div>
            </div>
            <hr className="m-0" />
            <div className="col-4 px-3 fs-4 rounded bg-primary text-white">
              Mathematics
            </div>
            <hr className="m-0" />
            {currentQuestion !== undefined ? (
              <div style={{ height: "70vh" }}>
                <div>
                  <div className="bg-primary text-white px-3">
                    Question no. - {currentIndex + 1}
                  </div>
                  <div className="px-3">{currentQuestion.question}</div>
                  {currentQuestion.option.map((opt, idx) => (
                    <div className="form-check mx-3" key={idx}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={idx}
                        // value={this.state.answerArray[idx]}
                        onClick={(e) => this.handleChange(idx)}
                        checked={
                          idx === this.state.checked
                          // idx === this.state.answerArray[idx]
                        }
                      />
                      <label className="form-check-label" for={idx}>
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>{currentIndex}</div>
            )}

            <div className="w-100 d-inline-flex justify-content-between">
              <div className="flex px-3 ">
                <button
                  type="button"
                  className="btn btn-primary me-4 "
                  onClick={this.markForReview}
                >
                  Mark for review and Next
                </button>
                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={this.unChecked}
                >
                  Clear response
                </button>
              </div>
              <div className="flex px-3">
                {
                  <button
                    type="button"
                    className={`btn btn-success ${
                      this.state.currentIndex === 6 ? "disabled" : null
                    } `}
                    onClick={this.nextquestion}
                  >
                    Save and Next
                  </button>
                }
              </div>
            </div>
          </div>
          <div className="col-3 p-0 border-start">
            <div className="row mx-0 text-primary">
              <div className="col ps-3">
                <u>Question paper</u>
              </div>
              <div className="col">
                <u>Instruction</u>
              </div>
            </div>
            <hr className="m-0" />
            <div className="row py-2 mx-0">
              <div className="col">Photo</div>
              <div className="col border-start">
                <div className="row">Name : Neelam</div>
                <div className="row">Roll no.: 20218833</div>
              </div>
            </div>
            <hr className="m-0" />

            <div className="container" style={{ fontSize: "13px" }}>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-3">
                      <i
                        className="fa fa-circle fs-4"
                        style={{ color: "green" }}
                      />
                    </div>
                    <div className="col">Answered</div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-3">
                      <i
                        className="fa fa-circle fs-4"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col">Not answered</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-3">
                      <i
                        className="fa fa-circle fs-4"
                        style={{ color: "purple" }}
                      />
                    </div>
                    <div className="col">Marked for review</div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-3">
                      <i
                        className="fa fa-circle fs-4"
                        style={{ color: "gray" }}
                      />
                    </div>
                    <div className="col">Not visit</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-2">
                      <i
                        className="fa fa-check-circle fs-4"
                        style={{ color: "purple" }}
                      />
                    </div>
                    <div className="col ps-0">Answered & marked for review</div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="m-0" />
            <div className="px-3 fs-5 bg-primary text-white">Mathematics</div>
            <hr className="m-0" />
            <div
              className="container border"
              style={{ height: "320px", background: "#a8e4f0" }}
            >
              <div className="row">
                {questions.map((ques, idx) => (
                  <div
                    role="button"
                    className={`col-2 border bg-secondary  text-white px-0 py-1 m-1 d-flex justify-content-center align-items-center 
                    ${
                      this.state.questions[idx].isAnswered
                        ? "bg-success"
                        : this.state.questions[idx].isReviewed
                        ? "bg-warning"
                        : this.state.questions[idx].isVisited
                        ? "bg-danger"
                        : null
                    }
                      `}
                    key={idx}
                    onClick={() => this.changeQuestionHandler(idx)}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="container-fluid text-center">
              
                <button type="button" className="btn btn-success my-3">
                  Submit
                </button>
              
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default QuestionsScreen;
 