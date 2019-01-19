import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Search from "./components/Search";
import Saved from "./components/Saved";
import NotFound from "./components/notFound";
import NavBar from "./components/NavBar";
import "./App.css";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <section class="hero-is-fullheight">
        <div className="head-head">
          <NavBar />
        </div>
        <div className="head-body">
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/saved" component={Saved} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/search" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <div className="head-foot">
          <Footer />
        </div>
      </section>
    );
  }
}

export default App;
