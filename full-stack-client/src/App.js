
import React, {createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddProducts from "./components/AddProducts/AddProducts";
import CheckOut from "./components/CheckOut/CheckOut";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import './App.css';
import ReviewProducts from "./components/ReviewProducts/ReviewProducts";
export const UserContext = createContext();

 function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart, setCart] = useState([]);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, cart, setCart]}>
      <p>Name:{loggedInUser.name}</p>
    <Router>
      <div>
        <ul className="container nav" style={{display: 'flex'}}>
          <li  style={{marginRight:'20px'}}>
            <Link to="/">Home</Link>
          </li>
          <li  style={{marginRight:'20px'}}>
            <Link to="/AddProducts">Admin</Link>
          </li>
          <li  style={{marginRight:'20px'}}>
            <Link to="/Orders">Orders</Link>
          </li>
          <li  style={{marginRight:'20px'}}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/AddProducts">
            <AddProducts></AddProducts>
          </Route>
          <PrivateRoute path="/CheckOut/:_id">
            <CheckOut></CheckOut>
          </PrivateRoute>
          <Route path="/Orders">
            <Orders></Orders>
          </Route>
          <Route path="/ReviewProducts">
            <ReviewProducts></ReviewProducts>
          </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;