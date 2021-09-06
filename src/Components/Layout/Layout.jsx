import React, { Component } from "react";

import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
  state = {
    showSideDrawer: false,
    width : 0
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideBarHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  }
  handleDimension = () =>{
    this.setState({width : window.innerWidth}, () => {
      if (this.state.width >= 500) {
        this.setState({showSideDrawer : false})
      }
    })
  };
  componentDidMount (){
    window.addEventListener('resize', this.handleDimension)
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleDimension)

  }
  render() {
    return (
      <div>
        <SideDrawer 
        show={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}
        />
        <Toolbar sideBarHandler={this.sideBarHandler}/>
        <main style={{paddingTop : '70px'}}> {this.props.children} </main>
      </div>
    );
  }
}

export default Layout;
