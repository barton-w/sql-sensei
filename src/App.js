import React, {Component} from "react"
import { BrowserRouter as Router, Route, Link} from "react-router-dom"
import Account from "./components/account.js"
import TrainingSelector from "./components/trainingSelector.js"
import NinjaMoves from "./components/ninjaMoves.js"
import "./css/normalize.css"
import "./css/skeleton.css"
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
  logOut = () => {
    localStorage.clear()
    this.setState({
      userId: null,
      username: null,
      session: null
    })
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
      <div className="app">
          <h1 id="title">SQL SENSEI</h1>
        {
          this.state.session === null ?
          <Account
            setSession={this.setSession}
          />
          :
          <Router>
            <nav>
              <Link id="link-cta1" to="/">Train with The Sensei!</Link>
              <Link id="link-cta2" to="/ninjamoves">View Saved Ninja Moves</Link>
              <a id="link"
                onClick={this.logOut}
                href="/">{this.state.username} | Log Out</a>
            </nav>
            <Route path="/" exact
              render={(props) => <TrainingSelector {...props} userId={this.state.userId} username={this.state.username} session={this.state.session}
              />}
            />
            <Route path="/ninjamoves"
              render={(props) => <NinjaMoves {...props} userId={this.state.userId} username={this.state.username} session={this.state.session}
              />}
            />
          </Router>
        }
      </div>
    )
  }
}

export default App
