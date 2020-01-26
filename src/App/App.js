import React from "react";
import { Route, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import UploadFile from "../UploadFile";
import ErrorBoundary from "../ErrorHandlers/ErrorBoundary";
import "./App.css";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      files:[],
      errorBoundaryKey: 0
    };
  }

  handleBackButton = () => {
    this.setState(
      prevState => ({
        errorBoundaryKey: prevState.errorBoundaryKey + 1
      }),
      console.clear()
    );
  };

  handleUploadFile = file => {
    this.setState({
      files: [...this.state.files, file]
    });
  };



  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/upload-file" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <ErrorBoundary key={this.state.errorBoundaryKey}>
          <Route path="/note/:noteId" component={NotePageMain} />
        </ErrorBoundary>
        <Route path="/upload-file" component={UploadFile} />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      toggle: this.state.toggle,
      toggleErrors: this.handleErrorToggle,
      addNote: this.handleAddNote,
      uploadFile: this.handleUploadFile,
      addFolder: this.handleAddFolder,
      deleteNote: this.handleDeleteNote,
      deleteFolder: this.handleDeleteFolder,
      back: this.handleBackButton
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
