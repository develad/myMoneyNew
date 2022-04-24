import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import NavBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
