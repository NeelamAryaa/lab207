import "./App.css";
import HomePage from "./components/homepage";
import Instructions from "./components/instructions";
import QuestionsScreen from "./components/question-screen"
import ScoreCard from "./components/score"
import {Switch, Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
    <Switch>
        <Route path="/" component={<HomePage/>} />
        <Route path="instruction" component={<Instructions/>} />
        <Route path="questionsscreen" component={<QuestionsScreen />} />
        <Route path="score" component={<ScoreCard />} />    
    </Switch>
    </div>    
  );
}

export default App;
