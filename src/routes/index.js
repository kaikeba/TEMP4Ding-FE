import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import la from './loadableComponent'

const Activity = () => import('views/Activity/loadable')
const Home = () => import('views/Home')
const Demo = () => import('views/Demo/Rematch')
const Sataff = () => import('views/Sataff')
const Admin = () => import('views/Admin')
const Familys = () => import('views/Familys')
const AddFamilys = () => import('views/AddFamilys')
const Promised = () => import('views/Promised')

export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/home" />} exact key="first" />
    <Route path="/activity" component={la(Activity)} key="activity" exact />
    <Route path="/home" component={la(Home)} key="home" exact />
    <Route path="/demo" component={la(Demo)} key="demo" exact />
    <Route path="/staff" component={la(Sataff)} key="Sataff" exact />
    <Route path="/admin" component={la(Admin)} key="Admin" exact />
    <Route path="/familys" component={la(Familys)} key="Familys" exact />
    <Route path="/promised" component={la(Promised)} key="Promised" exact />
    <Route
      path="/addfamilys"
      component={la(AddFamilys)}
      key="AddFamilys"
      exact
    />
  </Switch>
)
