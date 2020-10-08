import React, { Component } from "react";
import "./App.css";
import Main from "./components/main/Main";
import SideBar from "./components/sideBar/SideBar";

class App extends Component {
  state = {
    id: null,
  };

  _handleGetId = (id) => {
    this.setState({ id });
  };

  render() {
    return (
      <div className="App">
         <div>
          <Main id={this.state.id} />
          <SideBar onGetId={this._handleGetId} />
        </div> 
      </div>
    );
  }
}

export default App;
