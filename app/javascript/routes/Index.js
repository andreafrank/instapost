import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Posts from "../components/Posts";
import Post from "../components/Post";
import NewPost from '../components/NewPost';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/posts" exact component={Posts} />
      <Route path='/post/:id' exact component={Post} />
      <Route path="/post" exact component={NewPost} />
      <Route path="/user_session" exact component={SignIn} />
      <Route path="/user_registration" exact component={SignUp} /> 
    </Switch>
  </Router>
);