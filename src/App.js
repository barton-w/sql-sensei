import React, {Component} from "react"
import Account from "./components/account.js"
import TrainingSelector from "./components/trainingSelector.js"
import "./App.css"

class App extends Component {
  state = {
    userId: null,
    username: null,
    session: null
  }
  setSession = (data) => {
    this.setState({
      userId: data.user_id,
      username: data.username,
      session: data.token
    })
    localStorage.setItem("userId", this.state.userId)
    localStorage.setItem("username", this.state.username)
    localStorage.setItem("session", this.state.session)
  }
  componentDidMount() {
    if (localStorage.getItem("session") !== null) {
      this.setState({
        userId: localStorage.getItem("userId"),
        username: localStorage.getItem("username"),
        session: localStorage.getItem("session")
      })
    }
  }
  render() {
    return (
      <>
      <div className="log-in">
        <h1>SQL SENSEI</h1>
      </div>
      {
        this.state.session === null ?
        <Account
          setSession={this.setSession}
        />
        :
        <TrainingSelector
          userId={this.state.userId}
          username={this.state.username}
          session={this.state.session}
        />
      }
      </>
    )
  }
}

export default App
