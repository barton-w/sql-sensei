import React, {Component} from "react"
import {base_url} from "../functions/constants.js"

class Account extends Component {
  state = {
    showButtons: true,
    action: null,
    username: "",
    pword: "",
    confpword: "",
    error: null
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let endpoint = base_url
    let requestBody = {}
    if (this.state.action === "create") {
      endpoint += "/users"
      requestBody = {
        username: this.state.username,
        password: this.state.pword,
        password_confirmation: this.state.confpword
      }
    } else {
      endpoint += "/users/login"
      requestBody = {
        username: this.state.username,
        password: this.state.pword
      }
    }
    fetch(endpoint, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(response => response.json())
    .then(json => this.handleResponse(json))
    .catch(error => console.log(error))
  }
  handleResponse = (data) => {
    if (data.password) {
      this.setState({
        error: "Please check your password and try again"
      })
    } else if (data.message) {
      this.setState({
        error: data.message
      })
    } else if (data.username[0] === "has already been taken") {
      this.setState({
        error: "That username has already been taken. Try another one!"
      })
    } else if (data.user_id) {
      this.setState({
        showButtons: true,
        action: null,
        username: "",
        pword: "",
        confpword: "",
        error: null
      })
      this.props.setSession(data)
    }
  }
  render() {
    return (
      <div className="account">
        <h2>Create an Account or Log In to train with The Sensei</h2>
        {
          this.state.showButtons ?
          <div className="account-actions">
            <button onClick={() => {
              this.setState({
                action: "create",
                showButtons: false})
            }}>Create Account</button>
            <button onClick={() => {
              this.setState({
                action: "login",
                showButtons: false})
            }}>Log In</button>
          </div>
          : null
        }
        {
          this.state.action === "create" ?
          <div className="create-account">
            <form onSubmit={this.handleSubmit}>
              <input
                id="username"
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.handleChange}
              />
              <input
                id="pword"
                type="password"
                value={this.state.pword}
                placeholder="password"
                onChange={this.handleChange}
              />
              <input
                id="confpword"
                type="password"
                value={this.state.confpword}
                placeholder="confirm password"
                onChange={this.handleChange}
              />
              <input
                type="submit"
                value="Create Account"
              />
            </form>
            {
              this.state.error !== "" ?
              <p>{this.state.error}</p>
              : null
            }
            <p onClick={() => {
              this.setState({
                action: "login",
                showButtons: false
              })
            }}>Log In to an existing account</p>
          </div>
          : null
        }
        {
          this.state.action === "login" ?
          <div className="log-in">
            <form onSubmit={this.handleSubmit}>
              <input
                id="username"
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.handleChange}
              />
              <input
                id="pword"
                type="password"
                value={this.state.pword}
                placeholder="password"
                onChange={this.handleChange}
              />
              <input
                type="submit"
                value="Log In"
              />
            </form>
            {
              this.state.error !== "" ?
              <p>{this.state.error}</p>
              : null
            }
            <p onClick={() => {
              this.setState({
                action: "create",
                showButtons: false
              })
            }}>Can't Log In? Create an Account</p>
          </div>
          : null
        }
      </div>
    )
  }
}

export default Account
