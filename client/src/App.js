import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import sname from "./components/topbar/Topbar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Topbar from "./components/topbar/Topbar";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Login /> : <Redirect to="/" />}</Route>
        
        <Route path="/register">
           <Register /> 
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/logout">
            {/* {user ? <Login /> : <Redirect to="/register" />} */}
            {user ? <Login to="/login" /> : <Redirect to="/login" />}
          
          </Route>
          
          
      </Switch>
    </Router>
  );
}

export default App;
