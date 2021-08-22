import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Order from './Containers/Orders/Order'
export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/orders" component={Order}  />
          <Route path="/checkout" component={Checkout}  />
          <Route path="/" exact component={BurgerBuilder}  />
        </Layout>
      </div>
    )
  }
}

export default App
