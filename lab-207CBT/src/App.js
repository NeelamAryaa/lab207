import "./App.css";
import HomePage from "./components/homepage";
import Instructions from "./components/instructions";
import QuestionsScreen from "./components/question-screen"
import ScoreCard from "./components/score"
import {BrowserRouter, Switch, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/instruction" component={Instructions} />
        <Route path="/quesScreen" component={QuestionsScreen}/>
        <Route path="/score" component={ScoreCard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
