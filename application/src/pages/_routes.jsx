import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SettingsPage from "./settings";
import ProjectsPage from "./projects";
import MembersPage from "./members";
import ProductsPage from "./products";
import UpsertProductPage from "./upsertProduct";
import AboutPage from "./about";
import TeamsPage from "./teams";
import HomePage from "./home";
import LoginPage from "./login";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import OrdersPage from "./orders";
import UpsertOrderPage from "./upsertOrder";

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

const renderPrivateRoutes = (isAdmin) => {
  return (
    <Switch>
        {/* <Route path="/about/members">
          <MembersPage />
        </Route>
        <Route path="/about/projects">
          <ProjectsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route> */}
        <Route path="/products">
          <ProductsPage />
        </Route>
        isAdmin && <Route path="/product/add">
          <UpsertProductPage mode="add" />
        </Route>
        isAdmin && <Route path="/product/:id">
          <UpsertProductPage mode="edit" />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/order/add">
          <UpsertOrderPage mode="add" />
        </Route>
        isAdmin && <Route path="/order/:id">
          <UpsertOrderPage mode="edit" />
        </Route>
        {/* <Route path="/another/teams">
          <TeamsPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route> */}
        <Route path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
  );
}

const Routes = (props) => {
  const isAdmin = props.modality === "private" && props.isAdmin;
  return (
    <BrowserRouter>
      {props.modality === "private" ? renderPrivateRoutes(isAdmin) : renderPublicRoutes()}
    </BrowserRouter>
  );
};

export default Routes;
