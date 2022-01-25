import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FilesUploadComponent from "./components/files-upload-component";

const styles = {
  container: {
    // // marginTop: "20%",
    textAlign: "center",
  },
};

class App extends Component {
  render() {
    return (
      <div className="App" styles={styles}>
        <FilesUploadComponent />
      </div>
    );
  }
}

export default App;
