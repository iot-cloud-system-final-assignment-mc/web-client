import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SettingsPage from "./settings";
import ProjectsPage from "./projects";
import MembersPage from "./members";
import AboutPage from "./about";
import TeamsPage from "./teams";
import HomePage from "./home";
import LoginPage from "./login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const renderPublicRoutes = () => {
  return (
    <Switch>
        <Route path="/">
          <LoginPage />
        </Route>
        <Redirect to="/" />
      </Switch>
  );
}

const renderPrivateRoutes = () => {
  return (
    <Switch>
        <Route path="/about/members">
          <MembersPage />
        </Route>
        <Route path="/about/projects">
          <ProjectsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/another/teams">
          <TeamsPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
  );
}

const Routes = (props) => {
  return (
    <BrowserRouter>
      {props.modality === "private" ? renderPrivateRoutes() : renderPublicRoutes()}
    </BrowserRouter>
  );
};

export default Routes;