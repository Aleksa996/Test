import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Home" exact>
          <Home />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
