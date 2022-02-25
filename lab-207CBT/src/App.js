import "./App.css";
import HomePage from "./components/homepage";
import Instructions from "./components/instructions";
import ExamSummary from "./components/exam-summary"
import QuestionsScreen from "./components/question-screen"
import { Fragment } from "react";



function App() {
  return (
    <Fragment>
    {/*<HomePage/>
    <Instructions/>
    <ExamSummary />*/}
    <QuestionsScreen />
    </Fragment>
  );
}

export default App;
